"use client";

import { useState, useRef, useCallback } from "react";
import type { Restaurant } from "@/data/restaurants";
import { getVotes, vote } from "@/lib/supabase";

interface ResultCardProps {
  restaurant: Restaurant;
  onRetry: () => void;
  onBack: () => void;
  isTeam?: boolean;
}

const confettiEmojis = ["🎊", "✨", "🎉", "🥳", "🎈"];

interface Particle {
  id: number;
  emoji: string;
  x: number;
  y: number;
}

const upParticles = ["💖", "❤️", "🧡", "💛", "✨", "⭐"];
const downParticles = ["💔", "😢", "🥲", "😅", "💧", "🫠"];

export default function ResultCard({ restaurant, onRetry, onBack, isTeam }: ResultCardProps) {
  const [votes, setVotes] = useState({ up_count: 0, down_count: 0 });
  const [voted, setVoted] = useState<"up" | "down" | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [retrySpinning, setRetrySpinning] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);
  const particleId = useRef(0);
  const voteAreaRef = useRef<HTMLDivElement>(null);

  if (!loaded) {
    getVotes(restaurant.id).then((v) => {
      setVotes(v);
      setLoaded(true);
    });
  }

  const spawnParticles = useCallback((type: "up" | "down") => {
    const emojis = type === "up" ? upParticles : downParticles;
    const newParticles: Particle[] = Array.from({ length: 8 }, () => {
      const angle = Math.random() * Math.PI * 2;
      const distance = 40 + Math.random() * 50;
      return {
        id: ++particleId.current,
        emoji: emojis[Math.floor(Math.random() * emojis.length)],
        x: Math.cos(angle) * distance,
        y: Math.sin(angle) * distance,
      };
    });
    setParticles(newParticles);
    setTimeout(() => setParticles([]), 700);
  }, []);

  const handleVote = async (type: "up" | "down") => {
    if (voted) return;
    setVoted(type);
    spawnParticles(type);
    const result = await vote(restaurant.id, type);
    if (result) {
      setVotes(result);
    } else {
      setVotes((prev) => ({
        up_count: type === "up" ? prev.up_count + 1 : prev.up_count,
        down_count: type === "down" ? prev.down_count + 1 : prev.down_count,
      }));
    }
  };

  const handleShare = () => {
    const shareUrl = `${window.location.origin}/result/${restaurant.id}`;
    const text = `🍽️ 오늘 점심 여기 어때?\n\n📍 ${restaurant.name}\n🍴 ${restaurant.menu}`;

    if (navigator.share) {
      navigator.share({ title: "오늘 뭐 먹지?", text, url: shareUrl });
    } else {
      navigator.clipboard.writeText(`${text}\n\n${shareUrl}`);
      alert("복사 완료! 카카오톡에 붙여넣기 해주세요 😋");
    }
  };

  const handleRetry = () => {
    setRetrySpinning(true);
    setTimeout(() => setRetrySpinning(false), 600);
    onRetry();
  };

  return (
    <div className="animate-slide-up">
      {/* Confetti decoration */}
      <div className="flex justify-center gap-3 mb-2">
        {confettiEmojis.map((emoji, i) => (
          <span
            key={i}
            className="text-2xl animate-confetti"
            style={{ animationDelay: `${i * 0.08}s` }}
          >
            {emoji}
          </span>
        ))}
      </div>

      {/* Card */}
      <div className="bg-card rounded-[24px] doodle-border p-7 sm:p-9 shadow-xl shadow-primary/8 relative overflow-hidden animate-bounce-in">
        {/* Background decoration */}
        <div className="absolute top-3 right-4 text-2xl opacity-20 rotate-12">🌸</div>
        <div className="absolute bottom-4 left-4 text-xl opacity-15 -rotate-12">🍃</div>

        {/* Badge */}
        {restaurant.badge && (
          <div className="text-center mb-2 badge-bounce">
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gradient-to-r from-orange-100 to-amber-100 border border-amber-200 text-sm font-bold">
              <span className="badge-shimmer">단풍 추천!</span>
              <span className="badge-star text-base">⭐</span>
            </span>
          </div>
        )}

        {/* Restaurant name */}
        <div className="text-center mb-2">
          <span className="text-4xl animate-jelly inline-block">🎉</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-center mb-3 text-warm-text">
          {restaurant.name}
        </h2>

        {/* Menu */}
        <div className="bg-warm-bg rounded-[16px] p-4 mb-6 border border-card-border/40">
          <div className="flex items-start gap-2">
            <span className="shrink-0 text-xl">🍴</span>
            <span className="text-warm-text font-semibold">{restaurant.menu}</span>
          </div>
        </div>

        {/* Naver Link */}
        {restaurant.url ? (
          <a
            href={restaurant.url}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-bouncy flex items-center justify-center gap-2 w-full py-3.5 rounded-[16px] bg-naver text-white font-bold mb-3"
          >
            <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor">
              <path d="M13.5 10.5L6.2 0H0v20h6.5V9.5L13.8 20H20V0h-6.5z" />
            </svg>
            네이버 지도에서 보기
          </a>
        ) : (
          <div className="flex items-center justify-center gap-2 w-full py-3.5 rounded-[16px] bg-warm-bg text-warm-text/40 font-medium mb-3 border border-card-border/30">
            🗺️ 지도 링크 준비중
          </div>
        )}

        {/* Vote */}
        <div ref={voteAreaRef} className="relative flex items-center justify-center gap-4 mb-4">
          {/* Particles */}
          {particles.map((p) => (
            <span
              key={p.id}
              className="absolute text-lg pointer-events-none"
              style={{
                left: "50%",
                top: "50%",
                animation: "particle-burst 0.65s ease-out forwards",
                transform: `translate(${p.x}px, ${p.y}px)`,
                ["--tx" as string]: `${p.x}px`,
                ["--ty" as string]: `${p.y}px`,
              }}
            >
              {p.emoji}
            </span>
          ))}

          <button
            onClick={() => handleVote("up")}
            disabled={voted !== null}
            className={`btn-bouncy flex items-center gap-2 px-6 py-3 rounded-[16px] font-bold transition-all ${
              voted === "up"
                ? "bg-blue-100 text-blue-600 scale-110 animate-jelly"
                : voted
                  ? "bg-warm-bg text-warm-text/30 cursor-not-allowed"
                  : "bg-warm-bg text-warm-text cursor-pointer hover:bg-blue-50"
            }`}
          >
            <span className="text-2xl">👍</span>
            <span>{votes.up_count}</span>
          </button>
          <button
            onClick={() => handleVote("down")}
            disabled={voted !== null}
            className={`btn-bouncy flex items-center gap-2 px-6 py-3 rounded-[16px] font-bold transition-all ${
              voted === "down"
                ? "bg-red-100 text-red-600 scale-110 animate-jelly"
                : voted
                  ? "bg-warm-bg text-warm-text/30 cursor-not-allowed"
                  : "bg-warm-bg text-warm-text cursor-pointer hover:bg-red-50"
            }`}
          >
            <span className="text-2xl">👎</span>
            <span>{votes.down_count}</span>
          </button>
        </div>

        {/* Share */}
        <button
          onClick={handleShare}
          className="btn-bouncy w-full py-3.5 rounded-[16px] bg-kakao text-[#3C1E1E] font-bold flex items-center justify-center gap-2 cursor-pointer"
        >
          💬 카카오톡 공유하기
        </button>
      </div>

      {/* Team lunch encouragement */}
      {isTeam && (
        <p className="text-center mt-4 text-sm text-primary font-bold animate-wiggle">
          💪 막내 화이팅! 예약 전화는 네가 하는 거야~
        </p>
      )}

      {/* Action buttons */}
      <div className="flex gap-3 mt-5">
        <button
          onClick={handleRetry}
          className={`btn-bouncy flex-1 py-4 rounded-[16px] bg-primary text-white font-bold cursor-pointer text-base ${
            retrySpinning ? "animate-spin-bounce" : ""
          }`}
        >
          🎰 다시 뽑기
        </button>
        <button
          onClick={onBack}
          className="btn-bouncy flex-1 py-4 rounded-[16px] bg-card border-2 border-card-border text-warm-text font-bold cursor-pointer text-base"
        >
          ← 처음으로
        </button>
      </div>
    </div>
  );
}
