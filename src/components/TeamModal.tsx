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
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

      {/* Modal */}
      <div
        className="relative bg-[#FFF8F0] rounded-3xl w-full max-w-md max-h-[85vh] overflow-y-auto p-6 animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-zinc-100 text-zinc-500 hover:bg-zinc-200 transition cursor-pointer"
        >
          ✕
        </button>

        <div className="text-center mb-6">
          <span className="text-4xl">🏢</span>
          <h2 className="text-xl font-extrabold mt-2">팀점심 / 회식</h2>
          <p className="text-sm text-zinc-500 mt-1">단체로 가기 좋은 식당을 뽑아드려요!</p>
        </div>

        {!picked ? (
          <button
            onClick={pickRandom}
            className="w-full py-4 rounded-2xl bg-primary text-white font-bold text-lg hover:bg-primary-hover transition cursor-pointer active:scale-95"
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
