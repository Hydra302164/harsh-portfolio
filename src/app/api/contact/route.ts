/**
 * Contact form endpoint. Sends the enquiry to Harsh by email via Resend.
 *
 * Needs these environment variables (set them in Vercel → Settings → Environment Variables):
 *   RESEND_API_KEY   — from resend.com (free tier is enough)
 *   CONTACT_TO       — where enquiries go (defaults to the portfolio email)
 *   CONTACT_FROM     — optional verified sender; defaults to Resend's test sender
 */
import { site } from "@/data/projects";

const TOPICS = new Set(["Internship", "Freelance website", "Collaboration", "Website samples", "Something else"]);
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  const str = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");
  const name = str(body.name, 80);
  const email = str(body.email, 120);
  const message = str(body.message, 2000);
  const topic = TOPICS.has(str(body.topic, 40)) ? str(body.topic, 40) : "Something else";

  // Honeypot filled in: pretend it worked, send nothing.
  if (str(body.company, 100)) return Response.json({ ok: true });

  if (!name || !EMAIL_RE.test(email) || message.length < 10) {
    return Response.json({ error: "Please add your name, a valid email and a short message." }, { status: 400 });
  }

  const key = process.env.RESEND_API_KEY;
  if (!key) {
    return Response.json({ error: "The form isn't connected yet." }, { status: 503 });
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM || "Portfolio <onboarding@resend.dev>",
      to: [process.env.CONTACT_TO || site.email],
      reply_to: email,
      subject: `Portfolio enquiry: ${topic} — ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nTopic: ${topic}\n\n${message}`,
    }),
  });

  if (!res.ok) {
    return Response.json({ error: "Couldn't send right now." }, { status: 502 });
  }
  return Response.json({ ok: true });
}
