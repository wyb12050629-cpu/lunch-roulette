"use client";

import { useEffect, useState } from "react";

interface Petal {
  id: number;
  left: number;
  size: number;
  opacity: number;
  duration: number;
  delay: number;
  swayAmount: number;
}

export default function CherryBlossoms() {
  const [petals, setPetals] = useState<Petal[]>([]);

  useEffect(() => {
    const generated: Petal[] = Array.from({ length: 13 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: 16 + Math.random() * 14,
      opacity: 0.55 + Math.random() * 0.25,
      duration: 8 + Math.random() * 10,
      delay: Math.random() * 12,
      swayAmount: 30 + Math.random() * 60,
    }));
    setPetals(generated);
  }, []);

  if (petals.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
      {petals.map((p) => (
        <span
          key={p.id}
          className="absolute select-none"
          style={{
            left: `${p.left}%`,
            top: "-30px",
            fontSize: `${p.size}px`,
            opacity: p.opacity,
            animation: `petal-fall ${p.duration}s linear ${p.delay}s infinite`,
            ["--sway" as string]: `${p.swayAmount}px`,
          }}
        >
          🍃
        </span>
      ))}
    </div>
  );
}
