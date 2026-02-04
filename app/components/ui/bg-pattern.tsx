// components/ui/bg-pattern.tsx
import React from "react";

export function RetroGrid({
  className = "",
  angle = 65,
}: {
  className?: string;
  angle?: number;
}) {
  return (
    <div
      className={`pointer-events-none fixed inset-0 overflow-hidden opacity-20 ${className}`}
      style={{ "--grid-angle": `${angle}deg` } as React.CSSProperties}
    >
      {/* Grid */}
      <div className="absolute inset-0" style={{ transform: "rotateX(var(--grid-angle))" }}>
        <div
          className="w-[600vw] h-[300vh] absolute -left-[50%] bg-[length:60px_60px] bg-[repeat] animate-grid"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(0,0,0,0.3) 1px, transparent 0), linear-gradient(to bottom, rgba(0,0,0,0.3) 1px, transparent 0)",
          }}
        />
      </div>

      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-white to-transparent" />
    </div>
  );
}

RetroGrid.displayName = "RetroGrid";
