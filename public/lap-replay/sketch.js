// Lap Replay — Hamilton vs Verstappen, fastest laps ever at Singapore
// Stage 1: draw the track from real position data
// Stage 2: animate both cars at true speed, with playback controls
//
// How the smooth motion works:
//   - Position data only arrives ~4 times a second, so moving the dot from
//     point to point looks jerky.
//   - Instead, each car's points are turned into a smooth, dense racing line
//     (Catmull-Rom curve, ~16 sub-points between every real point).
//   - Speed data is added up over time to get "how far along the lap is the
//     car right now". The dot is placed that far along the smooth line.
//   Result: the dot glides, slows into corners and accelerates out exactly
//   like the real car did.

const DATA_FILE = 'data/singapore-fastest-ever.json';
const SPEEDS = [0.5, 1, 2, 4];   // keys 1–4
const TRAIL_SECONDS = 1.2;       // length of the fading tail behind each car
const SUBDIV = 16;               // smooth-path points between each real point
const PANEL_W = 300;             // width of the telemetry panel on the right
const MIN_W = 760, MIN_H = 560;  // smaller screens get the whole sketch scaled down
const COMPACT_BELOW = 1000;      // narrower than this: no side panel, compact readouts
const RPM_MAX = 12500;           // top of the rev-light bar
const GREY = [165, 165, 180];    // secondary text — bright enough to read on dark

// Stage 4: speed heatmap colours, slow → fast
const HEAT = ['#3b4cc0', '#1fb6c9', '#f2e14c', '#f2552c'];
// Track colour modes: 0 = plain, 1 = first driver's speed, 2 = second driver's
// speed, 3 = who's faster in each mini-sector (Stage 5)
let colourMode = 3;
const MODES = 4;
const MINI = 25;      // number of mini-sectors the lap is split into
let h2h;              // head-to-head data, built once in setup
let vLow, vHigh;      // speed range shared by both drivers, so colours compare fairly
let legendCols;       // pre-computed colours for the legend bar
let heatLayer;        // off-screen layer the heatmap is painted onto
let heat = { mode: -1, idx: 0 };   // which mode the layer shows and how far it's painted

let data;
let drivers;
let bounds;            // min/max of the real-world X/Y coordinates
let t = 0;             // current time in the lap, in seconds
let playing = false;
let speedIndex = 1;
let lapEnd;            // the slower lap time — when the replay stops
let scrubbing = false;

function preload() {
  data = loadJSON(DATA_FILE);
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  fitCanvas();
  textFont('Arial');
  drivers = data.drivers;
  for (const d of drivers) prepareDriver(d);
  lapEnd = max(drivers.map(d => d.lapTime));
  const lapSpeeds = drivers.flatMap(d => d.telemetry.filter(p => p.t >= 0 && p.t <= d.lapTime).map(p => p.speed));
  vLow = min(lapSpeeds);
  vHigh = max(lapSpeeds);

  // Work out every heatmap colour once now, not 60 times a second
  // (32 shades is smooth to the eye, and lets same-shade stretches draw as one line)
  const shades = Array.from({ length: 32 }, (_, i) => heatColour(lerp(vLow, vHigh, i / 31)).toString('#rrggbb'));
  for (const d of drivers) for (const p of d.path) {
    p.col = shades[round(constrain((p.v - vLow) / (vHigh - vLow), 0, 1) * 31)];
  }
  legendCols = Array.from({ length: 180 }, (_, i) => heatColour(lerp(vLow, vHigh, i / 180)).toString('#rrggbb'));

  computeHeadToHead();

  // Find the edges of the track so we can fit it on screen
  const all = drivers.flatMap(d => d.path);
  bounds = {
    minX: min(all.map(p => p.x)), maxX: max(all.map(p => p.x)),
    minY: min(all.map(p => p.y)), maxY: max(all.map(p => p.y)),
  };
}

function draw() {
  background(13, 13, 16);

  if (playing && !scrubbing) {
    // cap the step so a laggy frame doesn't make the cars jump
    t += min(deltaTime, 50) / 1000 * SPEEDS[speedIndex];
    if (t >= lapEnd) { t = lapEnd; playing = false; }
  }

  drawTrack();
  drawHeatmap();
  drawStartLine();
  drawGainTags();
  for (const d of drivers) drawCar(d);
  drawHUD();
  drawGapGraph();
  drawTimeline();
}

// ---------- Preparing the smooth path for each driver ----------

function prepareDriver(d) {
  // 1. Dense smooth racing line, each point knows its time and arc length
  // Skip samples that arrive almost on top of the previous one (< 0.1 s apart):
  // they make the curve wobble and the dot stutter.
  const P = d.position.filter((p, i, arr) => i === 0 || p.t - arr[i - 1].t >= 0.1);
  d.path = [];
  for (let i = 0; i < P.length - 1; i++) {
    const p0 = P[max(i - 1, 0)], p1 = P[i], p2 = P[i + 1], p3 = P[min(i + 2, P.length - 1)];
    for (let k = 0; k < SUBDIV; k++) {
      const u = k / SUBDIV;
      d.path.push({
        x: curvePoint(p0.x, p1.x, p2.x, p3.x, u),
        y: curvePoint(p0.y, p1.y, p2.y, p3.y, u),
        t: lerp(p1.t, p2.t, u),
      });
    }
  }
  d.path.push({ ...P[P.length - 1] });
  d.path[0].s = 0;
  for (let i = 1; i < d.path.length; i++) {
    const a = d.path[i - 1], b = d.path[i];
    b.s = a.s + Math.hypot(b.x - a.x, b.y - a.y);
  }

  // 2. Distance travelled over time, by adding up the speed readings (km/h → m/s)
  const T = d.telemetry;
  d.dist = [{ t: T[0].t, m: 0 }];
  for (let i = 1; i < T.length; i++) {
    const dt = T[i].t - T[i - 1].t;
    const v = (T[i].speed + T[i - 1].speed) / 2 / 3.6;
    d.dist.push({ t: T[i].t, m: d.dist[i - 1].m + v * dt });
  }

  // 2b. Speed at every point of the smooth path (used for the heatmap)
  for (const p of d.path) p.v = valueAt(d.telemetry, p.t, 'speed');

  // 3. Where the lap starts and ends, both on the path and in metres
  d.s0 = valueAt(d.path, 0, 's');
  d.s1 = valueAt(d.path, d.lapTime, 's');
  d.m0 = valueAt(d.dist, 0, 'm');
  d.m1 = valueAt(d.dist, d.lapTime, 'm');
}

// Linear lookup: value of `field` at time `time` in an array sorted by t
function valueAt(arr, time, field) {
  if (time <= arr[0].t) return arr[0][field];
  if (time >= arr[arr.length - 1].t) return arr[arr.length - 1][field];
  let lo = 0, hi = arr.length - 1;
  while (hi - lo > 1) {
    const mid = (lo + hi) >> 1;
    if (arr[mid].t < time) lo = mid; else hi = mid;
  }
  const a = arr[lo], b = arr[hi];
  return lerp(a[field], b[field], (time - a.t) / (b.t - a.t));
}

// Point on the smooth path at arc length s
function pointAtArc(path, s) {
  s = constrain(s, 0, path[path.length - 1].s);
  let lo = 0, hi = path.length - 1;
  while (hi - lo > 1) {
    const mid = (lo + hi) >> 1;
    if (path[mid].s < s) lo = mid; else hi = mid;
  }
  const a = path[lo], b = path[hi];
  const k = b.s === a.s ? 0 : (s - a.s) / (b.s - a.s);
  return { x: lerp(a.x, b.x, k), y: lerp(a.y, b.y, k) };
}

// Where is the car at time `time`? Speed-driven, so motion is perfectly smooth.
function carAt(d, time) {
  const frac = (valueAt(d.dist, time, 'm') - d.m0) / (d.m1 - d.m0);
  return pointAtArc(d.path, d.s0 + frac * (d.s1 - d.s0));
}

function speedAt(d, time) {
  return valueAt(d.telemetry, time, 'speed');
}

// For values that jump instead of blending (gear, brake on/off):
// take the last reading at or before `time`.
function stepAt(arr, time, field) {
  let v = arr[0][field];
  for (const p of arr) { if (p.t > time) break; v = p[field]; }
  return v;
}

// ---------- Stage 5: head-to-head ----------
//
// To compare two laps fairly we compare them at the same PLACE on track,
// not the same moment in time. "Lap fraction" f goes 0 → 1 from the start
// line to the finish. For any f we can ask: when did each driver get here?
// The difference is the gap at that point.

// How far through the lap (0–1) a driver is at time `time`
function fracAt(d, time) {
  return constrain((valueAt(d.dist, time, 'm') - d.m0) / (d.m1 - d.m0), 0, 1);
}

// When a driver reached lap fraction f (the reverse of fracAt)
function timeAtFrac(d, f) {
  const m = d.m0 + f * (d.m1 - d.m0);
  const D = d.dist;
  let lo = 0, hi = D.length - 1;
  while (hi - lo > 1) {
    const mid = (lo + hi) >> 1;
    if (D[mid].m < m) lo = mid; else hi = mid;
  }
  const a = D[lo], b = D[hi];
  return b.m === a.m ? a.t : lerp(a.t, b.t, (m - a.m) / (b.m - a.m));
}

function computeHeadToHead() {
  // A = faster lap overall (the reference), B = the other driver
  const [A, B] = [...drivers].sort((a, b) => a.lapTime - b.lapTime);
  h2h = { A, B, curve: [], sectors: [] };

  // gap curve: positive = A ahead at that point on track
  const N = 500;
  for (let i = 0; i <= N; i++) {
    const f = i / N;
    h2h.curve.push({ f, gap: timeAtFrac(B, f) - timeAtFrac(A, f) });
  }
  h2h.maxAbs = max(0.05, max(h2h.curve.map(c => abs(c.gap))));

  // mini-sectors: who covered each slice of the lap quicker, and by how much
  for (let k = 0; k < MINI; k++) {
    const f0 = k / MINI, f1 = (k + 1) / MINI;
    const ta = timeAtFrac(A, f1) - timeAtFrac(A, f0);
    const tb = timeAtFrac(B, f1) - timeAtFrac(B, f0);
    h2h.sectors.push({ f0, f1, winner: ta <= tb ? A : B, gain: abs(ta - tb) });
  }

  // colour the first driver's path points by the winner of their mini-sector
  const d0 = drivers[0];
  for (const p of d0.path) {
    const f = (p.s - d0.s0) / (d0.s1 - d0.s0);
    p.winCol = h2h.sectors[constrain(floor(f * MINI), 0, MINI - 1)].winner.colour;
  }
}

// Progress of whichever car is further BEHIND on track. Things are only
// revealed once both cars have passed, so we never spoil the result early.
function trailFrac() {
  return min(drivers.map(d => fracAt(d, min(t, d.lapTime))));
}

function gapAtFrac(f) {
  const i = constrain(f * (h2h.curve.length - 1), 0, h2h.curve.length - 1);
  const a = h2h.curve[floor(i)], b = h2h.curve[ceil(i)];
  return lerp(a.gap, b.gap, i - floor(i));
}

// Point on the track (screen coords) at lap fraction f
function trackPointAtFrac(f) {
  const d0 = drivers[0];
  const p = pointAtArc(d0.path, d0.s0 + f * (d0.s1 - d0.s0));
  return toScreen(p.x, p.y);
}

// Little tags on the track marking the 3 biggest time gains so far
function drawGainTags() {
  if (colourMode !== 3) return;
  const reached = trailFrac();
  const top = h2h.sectors.filter(s => s.f1 <= reached + 1e-6)
    .sort((a, b) => b.gain - a.gain).slice(0, 3);
  textSize(10);
  textStyle(BOLD);
  textAlign(CENTER, CENTER);
  for (const s of top) {
    const p = trackPointAtFrac((s.f0 + s.f1) / 2);
    const label = `${s.winner.code} −${s.gain.toFixed(3)}`;
    const w = textWidth(label) + 12;
    noStroke();
    fill(13, 13, 16, 230);
    rect(p.x - w / 2, p.y - 26, w, 17, 8);
    stroke(s.winner.colour);
    strokeWeight(1);
    noFill();
    rect(p.x - w / 2, p.y - 26, w, 17, 8);
    noStroke();
    fill(255);
    text(label, p.x, p.y - 17.5);
  }
}

function gapGraphBox() {
  return { x: 40, y: height - 170, w: width - panelW() - 175, h: 80 };
}

// Gap graph along the lap: above the line = faster driver ahead
function drawGapGraph() {
  const { A, B, maxAbs } = h2h;
  const b = gapGraphBox();
  const reached = trailFrac();
  const midY = b.y + b.h / 2;
  const gx = f => b.x + f * b.w;
  const gy = g => midY - (g / maxAbs) * (b.h / 2);

  // live readout
  const gap = gapAtFrac(reached);
  const leader = gap >= 0 ? A : B;
  noStroke();
  textAlign(LEFT, BASELINE);
  textSize(11);
  textStyle(NORMAL);
  fill(...GREY);
  text('GAP', b.x, b.y - 12);
  textStyle(BOLD);
  textSize(15);
  if (abs(gap) < 0.0005) {
    fill(255);
    text('Level', b.x + 32, b.y - 12);
  } else {
    fill(leader.colour);
    text(`${leader.code} ahead by ${abs(gap).toFixed(3)}s`, b.x + 32, b.y - 12);
  }

  // axis + side labels
  stroke(45, 45, 54);
  strokeWeight(1);
  line(b.x, midY, b.x + b.w, midY);
  noStroke();
  textSize(9);
  textStyle(NORMAL);
  // labels sit just right of the graph, so the curve never covers them
  textAlign(LEFT, CENTER);
  fill(A.colour);
  text(`▲ ${A.code} ahead`, b.x + b.w + 10, midY - 12);
  fill(B.colour);
  text(`▼ ${B.code} ahead`, b.x + b.w + 10, midY + 12);

  // filled area, coloured by who's ahead, drawn as far as both cars have got
  const pts = h2h.curve.filter(c => c.f <= reached);
  for (let i = 1; i < pts.length; i++) {
    const p = pts[i - 1], q = pts[i];
    const c = color((p.gap + q.gap) / 2 >= 0 ? A.colour : B.colour);
    c.setAlpha(90);
    fill(c);
    quad(gx(p.f), midY, gx(p.f), gy(p.gap), gx(q.f), gy(q.gap), gx(q.f), midY);
  }
  noFill();
  stroke(230);
  strokeWeight(1.5);
  beginShape();
  for (const p of pts) vertex(gx(p.f), gy(p.gap));
  endShape();

  // playhead
  noStroke();
  fill(255);
  circle(gx(reached), gy(gap), 6);
}

// ---------- Stage 1: real coordinates → screen ----------

function toScreen(x, y) {
  const padX = 60, padTop = compact() ? 190 : 110, padBottom = 200;   // bottom room for the gap graph
  const w = width - padX * 2 - panelW() - 40;   // leave room for the panel + car labels
  const h = height - padTop - padBottom;
  const s = min(w / (bounds.maxX - bounds.minX), h / (bounds.maxY - bounds.minY));
  const offX = padX + (w - (bounds.maxX - bounds.minX) * s) / 2;
  const offY = padTop + (h - (bounds.maxY - bounds.minY) * s) / 2;
  return {
    x: offX + (x - bounds.minX) * s,
    y: offY + (bounds.maxY - y) * s,   // flip: F1 data has Y pointing up
  };
}

function drawTrack() {
  const pts = drivers[0].path.map(p => toScreen(p.x, p.y));
  noFill();
  strokeJoin(ROUND);
  strokeCap(ROUND);

  // wide dark tarmac, then a thin centre line
  for (const [col, w] of [[[38, 38, 46], 16], [[70, 70, 82], 1.5]]) {
    stroke(...col);
    strokeWeight(w);
    beginShape();
    for (const p of pts) vertex(p.x, p.y);
    endShape();
  }
}

// ---------- Stage 4: colour the racing line by speed ----------

function heatColour(v) {
  const k = constrain((v - vLow) / (vHigh - vLow), 0, 1) * (HEAT.length - 1);
  const i = min(floor(k), HEAT.length - 2);
  return lerpColor(color(HEAT[i]), color(HEAT[i + 1]), k - i);
}

// The selected driver's racing line, painted in behind their car as the lap
// plays. Scrub to the end to see the whole lap as one heatmap.
function drawHeatmap() {
  if (colourMode === 0) return;
  // speed modes paint behind that driver; "who's faster" mode paints up to
  // where both cars have reached, using the first driver's line
  const d = colourMode === 3 ? drivers[0] : drivers[colourMode - 1];
  const until = colourMode === 3 ? timeAtFrac(d, trailFrac()) : min(t, d.lapTime);
  const colKey = colourMode === 3 ? 'winCol' : 'col';

  // The heatmap lives on its own layer. Each frame we only paint the few new
  // segments since last frame, instead of redrawing thousands every frame.
  // We start the layer over if the window size, colour mode, or time went
  // backwards (scrub / restart).
  const P = d.path;
  const stale = !heatLayer || heatLayer.width !== width || heatLayer.height !== height
    || heat.mode !== colourMode || P[heat.idx].t > until;
  if (stale) {
    if (!heatLayer || heatLayer.width !== width || heatLayer.height !== height) {
      if (heatLayer) heatLayer.remove();
      heatLayer = createGraphics(width, height);
      heatLayer.pixelDensity(pixelDensity());
    }
    heatLayer.clear();
    heat = { mode: colourMode, idx: P.findIndex(p => p.t >= 0) };
  }

  // Draw with the browser's canvas directly: much faster than p5's line()
  const ctx = heatLayer.drawingContext;
  ctx.lineWidth = 6;
  ctx.lineCap = 'round';
  let i = heat.idx;
  let prev = toScreen(P[i].x, P[i].y);
  for (let j = i + 2; j < P.length && P[j].t <= until; j += 2) {
    const sp = toScreen(P[j].x, P[j].y);
    ctx.strokeStyle = P[j][colKey];
    ctx.beginPath();
    ctx.moveTo(prev.x, prev.y);
    ctx.lineTo(sp.x, sp.y);
    ctx.stroke();
    prev = sp;
    i = j;
  }
  heat.idx = i;

  image(heatLayer, 0, 0, width, height);
}

function drawLegend() {
  const x = 40, y = compact() ? 160 : 96, w = 180, h = 6;
  noStroke();
  textAlign(LEFT, BASELINE);
  textSize(11);
  textStyle(NORMAL);
  fill(...GREY);
  if (colourMode === 0) {
    text('Track colour: off  (C to change)', x, y + 4);
    return;
  }
  if (colourMode === 3) {
    text(`Track colour: who's faster  (C to change)`, x, y);
    // swatches + how many mini-sectors each driver won so far
    const reached = trailFrac();
    const done = h2h.sectors.filter(s => s.f1 <= reached + 1e-6);
    let sx = x;
    for (const d of [h2h.A, h2h.B]) {
      const won = done.filter(s => s.winner === d).length;
      fill(d.colour);
      rect(sx, y + 9, 14, 6, 2);
      fill(...GREY);
      textSize(10);
      text(`${d.code} faster · ${won}/${MINI}`, sx + 20, y + 16);
      sx += 110;
    }
    return;
  }
  const d = drivers[colourMode - 1];
  text(`Track colour: ${d.code} speed  (C to change)`, x, y);
  for (let i = 0; i < w; i++) {
    fill(legendCols[i]);
    rect(x + i, y + 8, 1.5, h);
  }
  noStroke();
  fill(...GREY);
  textSize(10);
  text(`${vLow} km/h`, x, y + 28);
  textAlign(RIGHT, BASELINE);
  text(`${vHigh} km/h`, x + w, y + 28);
}

function drawStartLine() {
  const d = drivers[0];
  const a = toScreen(...Object.values(pointAtArc(d.path, d.s0)));
  const b = toScreen(...Object.values(pointAtArc(d.path, d.s0 + 200)));
  const ang = atan2(b.y - a.y, b.x - a.x) + HALF_PI;
  stroke(255);
  strokeWeight(3);
  line(a.x - cos(ang) * 12, a.y - sin(ang) * 12, a.x + cos(ang) * 12, a.y + sin(ang) * 12);
}

// ---------- Stage 2: drawing the cars ----------

function drawCar(d) {
  const tt = min(t, d.lapTime);   // a car that finished waits on the line
  const c = color(d.colour);

  // fading trail — sampled finely so it's a smooth ribbon
  noFill();
  strokeCap(ROUND);
  const steps = 40;
  let prev = null;
  for (let s = 0; s <= steps; s++) {
    const ts = tt - TRAIL_SECONDS + (s / steps) * TRAIL_SECONDS;
    if (ts < 0) { prev = null; continue; }
    const p = carAt(d, ts);
    const sp = toScreen(p.x, p.y);
    if (prev) {
      c.setAlpha(map(s, 0, steps, 0, 220));
      stroke(c);
      strokeWeight(map(s, 0, steps, 1, 6));
      line(prev.x, prev.y, sp.x, sp.y);
    }
    prev = sp;
  }

  // the car
  const p = carAt(d, tt);
  const sp = toScreen(p.x, p.y);
  c.setAlpha(60);
  noStroke();
  fill(c);
  circle(sp.x, sp.y, 26);
  c.setAlpha(255);
  fill(c);
  stroke(13, 13, 16);
  strokeWeight(2);
  circle(sp.x, sp.y, 13);

  // label — first driver above the dot, second below, so they never overlap
  const above = drivers.indexOf(d) === 0;
  noStroke();
  fill(c);
  textSize(12);
  textStyle(BOLD);
  textAlign(LEFT, CENTER);
  text(d.code, sp.x + 12, sp.y + (above ? -12 : 12));
}

// ---------- On-screen info ----------

function fmt(sec) {
  sec = max(sec, 0);
  const m = floor(sec / 60);
  const s = sec - m * 60;
  return `${m}:${nf(s, 2, 3)}`;
}

function drawHUD() {
  noStroke();
  textAlign(LEFT, BASELINE);

  fill(255);
  textStyle(BOLD);
  textSize(22);
  text('Lap Replay', 40, 52);
  fill(140, 140, 155);
  textStyle(NORMAL);
  textSize(13);
  text(data.title, 40, 74);
  drawLegend();

  // Stage 3: one telemetry card per driver, stacked on the right
  if (compact()) {
    drivers.forEach((d, i) => drawCompactRow(d, 40, 108 + i * 24, width - 80));
    return;
  }
  const x = width - PANEL_W - 30;
  const top = 30;
  const cardH = min(250, (height - 130 - top) / drivers.length - 14);
  drivers.forEach((d, i) => drawCard(d, x, top + i * (cardH + 14), PANEL_W, cardH));
}

// Compact version of the telemetry card for narrow screens: one line per driver
function drawCompactRow(d, x, y, w) {
  const tt = min(t, d.lapTime);
  const fastest = min(drivers.map(o => o.lapTime));
  const done = t >= d.lapTime;
  noStroke();
  fill(d.colour);
  rect(x, y - 12, 4, 16, 2);
  textAlign(LEFT, BASELINE);
  fill(255);
  textStyle(BOLD);
  textSize(14);
  text(d.code, x + 12, y);
  fill(...GREY);
  textStyle(NORMAL);
  textSize(12);
  const gear = stepAt(d.telemetry, tt, 'gear');
  const thr = round(constrain(valueAt(d.telemetry, tt, 'throttle'), 0, 100));
  const brk = stepAt(d.telemetry, tt, 'brake') > 0;
  text(`${round(speedAt(d, tt))} km/h · gear ${gear} · ${brk ? 'BRAKE' : `throttle ${thr}%`}`, x + 52, y);
  textAlign(RIGHT, BASELINE);
  fill(done ? 255 : 210);
  textStyle(done ? BOLD : NORMAL);
  textSize(14);
  text(fmt(tt), x + w, y);
  if (done && d.lapTime > fastest) {
    const tw = textWidth(fmt(tt));
    fill(255, 120, 120);
    textSize(11);
    text(`+${(d.lapTime - fastest).toFixed(3)}`, x + w - tw - 8, y);
  }
}

// ---------- Stage 3: live telemetry card ----------

function drawCard(d, x, y, w, h) {
  const tt = min(t, d.lapTime);
  const T = d.telemetry;
  const speed = valueAt(T, tt, 'speed');
  const rpm = valueAt(T, tt, 'rpm');
  const throttle = constrain(valueAt(T, tt, 'throttle'), 0, 100);
  const braking = stepAt(T, tt, 'brake') > 0;
  const gear = stepAt(T, tt, 'gear');
  const fastest = min(drivers.map(o => o.lapTime));
  const done = t >= d.lapTime;
  const pad = 16;
  const ix = x + pad, iw = w - pad * 2;

  // card background with a team-colour edge
  noStroke();
  fill(22, 22, 28);
  rect(x, y, w, h, 10);
  fill(d.colour);
  rect(x, y + 12, 3, 28, 2);

  // header: code, team/session, lap timer (+gap when finished)
  textAlign(LEFT, BASELINE);
  fill(255);
  textStyle(BOLD);
  textSize(16);
  text(d.code, ix, y + 30);
  fill(...GREY);
  textStyle(NORMAL);
  textSize(11);
  text(d.team, ix + 44, y + 29);
  text(d.session, ix, y + 48);

  textAlign(RIGHT, BASELINE);
  fill(done ? 255 : 210);
  textStyle(done ? BOLD : NORMAL);
  textSize(14);
  text(fmt(tt), ix + iw, y + 30);
  if (done && d.lapTime > fastest) {
    const tw = textWidth(fmt(tt));
    fill(255, 120, 120);
    textStyle(BOLD);
    textSize(11);
    text(`+${(d.lapTime - fastest).toFixed(3)}`, ix + iw - tw - 8, y + 30);
  }

  // big speed number + gear
  const rowY = y + 90;
  textAlign(LEFT, BASELINE);
  fill(255);
  textStyle(BOLD);
  textSize(40);
  text(round(speed), ix, rowY);
  const sw = textWidth(round(speed));
  fill(...GREY);
  textStyle(NORMAL);
  textSize(12);
  text('km/h', ix + sw + 6, rowY);

  textAlign(RIGHT, BASELINE);
  fill(...GREY);
  textSize(10);
  text('GEAR', ix + iw, rowY - 32);
  fill(255);
  textStyle(BOLD);
  textSize(34);
  text(gear === 0 ? 'N' : gear, ix + iw, rowY);

  // rev lights: 15 segments, green → red → purple near the limiter
  const segs = 15, gap = 3;
  const segW = (iw - gap * (segs - 1)) / segs;
  const lit = round(constrain(rpm / RPM_MAX, 0, 1) * segs);
  for (let s = 0; s < segs; s++) {
    let col = s < 6 ? [60, 200, 110] : s < 11 ? [235, 60, 60] : [150, 90, 255];
    if (s >= lit) col = [40, 40, 50];
    fill(...col);
    rect(ix + s * (segW + gap), rowY + 12, segW, 6, 2);
  }
  textAlign(LEFT, BASELINE);
  fill(...GREY);
  textStyle(NORMAL);
  textSize(10);
  text(`${nfc(round(rpm / 10) * 10)} rpm`, ix, rowY + 32);

  // pedals: throttle and brake bars
  drawBar('THR', throttle / 100, [60, 200, 110], ix, rowY + 44, iw);
  drawBar('BRK', braking ? 1 : 0, [235, 60, 60], ix, rowY + 62, iw);

  // speed trace for the lap so far
  const gy = rowY + 80, gh = y + h - gy - 14;
  if (gh > 20) drawSpeedTrace(d, tt, ix, gy, iw, gh);
}

function drawBar(label, value, col, x, y, w) {
  noStroke();
  fill(...GREY);
  textSize(10);
  textStyle(BOLD);
  textAlign(LEFT, CENTER);
  text(label, x, y + 3);
  const bx = x + 32, bw = w - 32;
  fill(40, 40, 50);
  rect(bx, y, bw, 7, 3);
  fill(...col);
  if (value > 0) rect(bx, y, bw * value, 7, 3);
}

// ---------- Speed trace graph ----------

function drawSpeedTrace(d, tt, x, y, w, h) {
  const vMin = 50, vMax = 340;
  const gx = (time) => x + (time / lapEnd) * w;
  const gyv = (v) => y + h - map(constrain(v, vMin, vMax), vMin, vMax, 0, h);

  // faint guide lines at 100 / 200 / 300 km/h
  stroke(40, 40, 50);
  strokeWeight(1);
  for (const v of [100, 200, 300]) line(x, gyv(v), x + w, gyv(v));
  noStroke();
  fill(80, 80, 95);
  textSize(9);
  textStyle(NORMAL);
  textAlign(LEFT, BOTTOM);
  text('300', x, gyv(300) - 1);
  text('100', x, gyv(100) - 1);

  // the trace itself, drawn up to the current moment
  const c = color(d.colour);
  noFill();
  stroke(c);
  strokeWeight(1.6);
  beginShape();
  for (const p of d.telemetry) {
    if (p.t < 0) continue;
    if (p.t > tt) break;
    vertex(gx(p.t), gyv(p.speed));
  }
  vertex(gx(tt), gyv(valueAt(d.telemetry, tt, 'speed')));
  endShape();

  // playhead dot
  noStroke();
  fill(c);
  circle(gx(tt), gyv(valueAt(d.telemetry, tt, 'speed')), 5);
}

function timelineBox() {
  return { x: 40, y: height - 58, w: width - 80, h: 4 };
}

function drawTimeline() {
  const b = timelineBox();
  noStroke();
  fill(45, 45, 54);
  rect(b.x, b.y, b.w, b.h, 2);
  fill(255);
  rect(b.x, b.y, b.w * (t / lapEnd), b.h, 2);
  circle(b.x + b.w * (t / lapEnd), b.y + b.h / 2, 12);

  fill(140, 140, 155);
  textSize(12);
  textStyle(NORMAL);
  textAlign(LEFT, BASELINE);
  const state = playing ? 'Playing' : (t >= lapEnd ? 'Finished' : 'Paused');
  text(`${state} · ${SPEEDS[speedIndex]}×`, b.x, b.y + 30);
  textAlign(RIGHT, BASELINE);
  text(compact() ? 'CLICK play   drag bar to scrub   C track colour'
    : 'CLICK / SPACE play   ← → skip   1–4 speed   R restart   C track colour   P save image', b.x + b.w, b.y + 30);
}

// ---------- Controls ----------

function keyPressed() {
  if (key === ' ') {
    if (t >= lapEnd) t = 0;
    playing = !playing;
  }
  if (keyCode === LEFT_ARROW) t = max(t - 1, 0);
  if (keyCode === RIGHT_ARROW) t = min(t + 1, lapEnd);
  if (key >= '1' && key <= '4') speedIndex = int(key) - 1;
  if (key === 'r' || key === 'R') { t = 0; playing = true; }
  if (key === 'c' || key === 'C') colourMode = (colourMode + 1) % MODES;
  if (key === 'p' || key === 'P') saveCanvas(`lap-replay-${nf(t, 2, 1)}s`, 'png');
  return false;
}

function scrubTo(mx) {
  const b = timelineBox();
  t = constrain((mx - b.x) / b.w, 0, 1) * lapEnd;
}

function mousePressed() {
  const b = timelineBox();
  if (mouseY > b.y - 14 && mouseY < b.y + 18) { scrubbing = true; scrubTo(mouseX); return; }
  // click / tap anywhere else = play / pause (works on phones and in embeds)
  if (mouseX >= 0 && mouseY >= 0 && mouseX <= width && mouseY <= height) {
    if (t >= lapEnd) t = 0;
    playing = !playing;
  }
}

function mouseDragged() { if (scrubbing) scrubTo(mouseX); }
function mouseReleased() { scrubbing = false; }

function windowResized() {
  fitCanvas();
}

// Draw at least 2× the screen's pixels. On a Windows laptop scaled to 125%,
// a 1× canvas gets stretched by the browser and looks blurry; drawing at 2×
// and letting the browser shrink it keeps lines and text crisp.
// ---------- Responsive layout ----------

function compact() { return width < COMPACT_BELOW; }
function panelW() { return compact() ? 0 : PANEL_W; }

// If the window is smaller than MIN_W × MIN_H, draw on a bigger canvas and
// shrink it to fit (like a video), so the layout never collapses.
function fitCanvas() {
  const sc = Math.min(1, windowWidth / MIN_W, windowHeight / MIN_H);
  resizeCanvas(Math.round(windowWidth / sc), Math.round(windowHeight / sc));
  setSharpness();
  const el = document.querySelector('canvas');
  el.style.width = windowWidth + 'px';
  el.style.height = windowHeight + 'px';
}

function setSharpness() {
  pixelDensity(Math.max(2, Math.ceil(window.devicePixelRatio || 1)));
}
