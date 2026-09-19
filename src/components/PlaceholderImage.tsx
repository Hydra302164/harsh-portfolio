"use me";
import React from "react";

interface PlaceholderImageProps {
  label: string;
  sublabel?: string;
  aspectRatio?: "square" | "video" | "wide" | "tall" | "auto";
  className?: string;
  interactive?: boolean;
}

export const PlaceholderImage: React.FC<PlaceholderImageProps> = ({
  label,
  sublabel,
  aspectRatio = "video",
  className = "",
  interactive = false,
}) => {
  const aspectClasses = {
    square: "aspect-square",
    video: "aspect-video",
    wide: "aspect-[21/9]",
    tall: "aspect-[4/5]",
    auto: "h-full w-full min-h-[220px]",
  }[aspectRatio];

  return (
    <div
      className={`relative w-full overflow-hidden bg-neutral-900/90 border border-neutral-800 rounded-none group transition-all duration-300 ${aspectClasses} ${
        interactive ? "hover:border-neutral-500 hover:shadow-2xl hover:shadow-white/5" : ""
      } ${className}`}
    >
      {/* Background Subtle Technical Grid */}
      <div
        className="absolute inset-0 opacity-[0.07] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, #ffffff 1px, transparent 1px),
            linear-gradient(to bottom, #ffffff 1px, transparent 1px)
          `,
          backgroundSize: "24px 24px",
        }}
      />

      {/* Technical Wireframe Corner Crosshairs */}
      <div className="absolute top-3 left-3 text-[10px] font-mono text-neutral-600 select-none tracking-wider">
        [SYS // 01]
      </div>
      <div className="absolute top-3 right-3 text-[10px] font-mono text-neutral-600 select-none">
        +
      </div>
      <div className="absolute bottom-3 left-3 text-[10px] font-mono text-neutral-600 select-none">
        +
      </div>
      <div className="absolute bottom-3 right-3 text-[10px] font-mono text-neutral-600 select-none">
        RAW_ASSET
      </div>

      {/* Centered Wireframe Label */}
      <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-10">
        <div className="flex items-center space-x-2 mb-2">
          <span className="inline-block w-2 h-2 bg-neutral-500 group-hover:bg-emerald-400 transition-colors duration-300" />
          <span className="font-mono text-xs md:text-sm tracking-widest uppercase text-neutral-300 font-medium group-hover:text-white transition-colors duration-300">
            {label}
          </span>
        </div>

        {sublabel && (
          <p className="font-mono text-[11px] text-neutral-500 max-w-[80%] uppercase tracking-wider">
            {sublabel}
          </p>
        )}
      </div>

      {/* Subtle diagonal line indicator */}
      <svg
        className="absolute inset-0 w-full h-full stroke-neutral-800/40 pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <line x1="0" y1="0" x2="100%" y2="100%" strokeWidth="1" strokeDasharray="4 4" />
        <line x1="100%" y1="0" x2="0" y2="100%" strokeWidth="1" strokeDasharray="4 4" />
      </svg>
    </div>
  );
};
