"use client";

import { useState } from "react";
import { restaurants, type Restaurant } from "@/data/restaurants";
import ResultCard from "./ResultCard";

interface TeamModalProps {
  open: boolean;
  onClose: () => void;
}

export default function TeamModal({ open, onClose }: TeamModalProps) {
  const [picked, setPicked] = useState<Restaurant | null>(null);

  const teamRestaurants = restaurants.filter((r) => r.category === "team");

  const pickRandom = () => {
    const pick = teamRestaurants[Math.floor(Math.random() * teamRestaurants.length)];
    setPicked(pick);
  };

  const handleClose = () => {
    setPicked(null);
    onClose();
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 animate-fade-in"
      onClick={handleClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />

      {/* Modal */}
      <div
        className="relative bg-[#FFF8F0] rounded-[24px] w-full max-w-md max-h-[85vh] overflow-y-auto p-7 animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center rounded-full bg-warm-bg text-warm-text/50 hover:bg-card-border/40 transition cursor-pointer font-bold"
        >
          ✕
        </button>

        <div className="text-center mb-7">
          <span className="text-5xl">🏢</span>
          <h2 className="text-xl font-extrabold mt-3 text-warm-text">팀점심 / 회식</h2>
          <p className="text-sm text-warm-text/50 mt-1">단체로 가기 좋은 식당을 뽑아드려요!</p>
        </div>

        {!picked ? (
          <button
            onClick={pickRandom}
            className="btn-bouncy w-full py-4 rounded-[16px] bg-primary text-white font-bold text-lg cursor-pointer"
          >
            🎰 식당 뽑기!
          </button>
        ) : (
          <ResultCard
            restaurant={picked}
            onRetry={pickRandom}
            onBack={() => setPicked(null)}
            isTeam
          />
        )}
      </div>
    </div>
  );
}
