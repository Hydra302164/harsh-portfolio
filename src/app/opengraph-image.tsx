import { ImageResponse } from "next/og";

export const alt = "Harsh Alambain, Interaction Designer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background: "#141414",
          color: "#f3f1ec",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 28, color: "#bdbab3" }}>
          <div style={{ width: 16, height: 16, borderRadius: 999, background: "#ff5b36" }} />
          Interaction Designer · Open to internships
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 120, fontWeight: 700, letterSpacing: -4, lineHeight: 1 }}>Harsh Alambain</div>
          <div style={{ marginTop: 28, fontSize: 36, color: "#bdbab3" }}>
            Interactions you can touch, play and see.
          </div>
        </div>
        <div style={{ display: "flex", fontSize: 24, color: "#8b8982" }}>
          Physical computing · Creative coding · Web design · Visual identity
        </div>
      </div>
    ),
    size,
  );
}
