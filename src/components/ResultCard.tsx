"use client";

import { useState } from "react";
import type { Restaurant } from "@/data/restaurants";
import { getVotes, vote } from "@/lib/supabase";

interface ResultCardProps {
  restaurant: Restaurant;
  onRetry: () => void;
  onBack: () => void;
  isTeam?: boolean;
}

export default function ResultCard({ restaurant, onRetry, onBack, isTeam }: ResultCardProps) {
  const [votes, setVotes] = useState({ up_count: 0, down_count: 0 });
  const [voted, setVoted] = useState<"up" | "down" | null>(null);
  const [loaded, setLoaded] = useState(false);

  if (!loaded) {
    getVotes(restaurant.id).then((v) => {
      setVotes(v);
      setLoaded(true);
    });
  }

  const handleVote = async (type: "up" | "down") => {
    if (voted) return;
    setVoted(type);
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

  return (
    <div className="animate-bounce-in">
      {/* Card */}
      <div className="bg-white rounded-3xl border-2 border-orange-200 p-6 sm:p-8 shadow-lg shadow-orange-100/50">
        {/* Restaurant name */}
        <div className="text-center mb-1">
          <span className="text-3xl">🎉</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-center mb-2">
          {restaurant.name}
        </h2>

        {/* Menu */}
        <div className="bg-orange-50 rounded-2xl p-4 mb-5">
          <div className="flex items-start gap-2">
            <span className="shrink-0 text-lg">🍴</span>
            <span className="text-zinc-700 font-medium">{restaurant.menu}</span>
          </div>
        </div>

        {/* Naver Link */}
        {restaurant.url ? (
          <a
            href={restaurant.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-3 rounded-2xl bg-naver text-white font-bold hover:brightness-110 transition mb-3"
          >
            <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor">
              <path d="M13.5 10.5L6.2 0H0v20h6.5V9.5L13.8 20H20V0h-6.5z" />
            </svg>
            네이버 지도에서 보기
          </a>
        ) : (
          <div className="flex items-center justify-center gap-2 w-full py-3 rounded-2xl bg-zinc-100 text-zinc-400 font-medium mb-3">
            🗺️ 지도 링크 준비중
          </div>
        )}

        {/* Vote */}
        <div className="flex items-center justify-center gap-4 mb-3">
          <button
            onClick={() => handleVote("up")}
            disabled={voted !== null}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl font-bold transition-all ${
              voted === "up"
                ? "bg-blue-100 text-blue-600 scale-110"
                : voted
                  ? "bg-zinc-50 text-zinc-300 cursor-not-allowed"
                  : "bg-zinc-100 hover:bg-blue-50 text-zinc-700 cursor-pointer active:scale-95"
            }`}
          >
            <span className="text-xl">👍</span>
            <span>{votes.up_count}</span>
          </button>
          <button
            onClick={() => handleVote("down")}
            disabled={voted !== null}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl font-bold transition-all ${
              voted === "down"
                ? "bg-red-100 text-red-600 scale-110"
                : voted
                  ? "bg-zinc-50 text-zinc-300 cursor-not-allowed"
                  : "bg-zinc-100 hover:bg-red-50 text-zinc-700 cursor-pointer active:scale-95"
            }`}
          >
            <span className="text-xl">👎</span>
            <span>{votes.down_count}</span>
          </button>
        </div>

        {/* Share */}
        <button
          onClick={handleShare}
          className="w-full py-3 rounded-2xl bg-kakao text-[#3C1E1E] font-bold hover:brightness-95 transition flex items-center justify-center gap-2 cursor-pointer"
        >
          💬 카카오톡 공유하기
        </button>
      </div>

      {/* Team lunch encouragement */}
      {isTeam && (
        <p className="text-center mt-3 text-sm text-orange-400 font-semibold animate-wiggle">
          💪 막내 화이팅! 예약 전화는 네가 하는 거야~
        </p>
      )}

      {/* Action buttons */}
      <div className="flex gap-3 mt-4">
        <button
          onClick={onRetry}
          className="flex-1 py-3.5 rounded-2xl bg-primary text-white font-bold hover:bg-primary-hover transition cursor-pointer active:scale-95"
        >
          🎰 다시 뽑기
        </button>
        <button
          onClick={onBack}
          className="flex-1 py-3.5 rounded-2xl border-2 border-zinc-200 bg-white text-zinc-600 font-bold hover:bg-zinc-50 transition cursor-pointer active:scale-95"
        >
          ← 처음으로
        </button>
      </div>
    </div>
  );
}
