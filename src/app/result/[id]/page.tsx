"use client";

import { use, useState } from "react";
import { restaurants } from "@/data/restaurants";
import { getVotes, vote } from "@/lib/supabase";

const confettiEmojis = ["🎊", "✨", "🎉", "🥳", "🎈"];

export default function ResultPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const restaurant = restaurants.find((r) => r.id === id);

  const [votes, setVotes] = useState({ up_count: 0, down_count: 0 });
  const [voted, setVoted] = useState<"up" | "down" | null>(null);
  const [loaded, setLoaded] = useState(false);

  if (restaurant && !loaded) {
    getVotes(restaurant.id).then((v) => {
      setVotes(v);
      setLoaded(true);
    });
  }

  if (!restaurant) {
    return (
      <div className="flex flex-col items-center justify-center min-h-full px-5 py-16">
        <span className="text-6xl mb-4">😅</span>
        <h1 className="text-2xl font-extrabold mb-2 text-warm-text">식당을 찾을 수 없어요</h1>
        <a
          href="/"
          className="btn-bouncy mt-5 px-8 py-4 rounded-[16px] bg-primary text-white font-bold"
        >
          처음으로 돌아가기
        </a>
      </div>
    );
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

  return (
    <div className="flex flex-col items-center min-h-full px-5 py-10 sm:py-14">
      {/* Header */}
      <header className="text-center mb-10">
        <div className="text-6xl mb-3 animate-float">🍽️</div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-warm-text">
          오늘 뭐 먹지?
        </h1>
        <p className="mt-2 text-sm sm:text-base text-warm-text/60 font-medium">
          친구가 추천한 점심 메뉴!
        </p>
      </header>

      <div className="w-full max-w-md animate-bounce-in">
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
        <div className="bg-card rounded-[24px] doodle-border p-7 sm:p-9 shadow-xl shadow-primary/8 relative overflow-hidden">
          <div className="absolute top-3 right-4 text-2xl opacity-20 rotate-12">🌸</div>
          <div className="absolute bottom-4 left-4 text-xl opacity-15 -rotate-12">🍃</div>

          <div className="text-center mb-2">
            <span className="text-4xl animate-jelly inline-block">🎉</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-center mb-3 text-warm-text">
            {restaurant.name}
          </h2>

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
          <div className="flex items-center justify-center gap-4 mb-3">
            <button
              onClick={() => handleVote("up")}
              disabled={voted !== null}
              className={`btn-bouncy flex items-center gap-2 px-6 py-3 rounded-[16px] font-bold ${
                voted === "up"
                  ? "bg-blue-100 text-blue-600 scale-110"
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
              className={`btn-bouncy flex items-center gap-2 px-6 py-3 rounded-[16px] font-bold ${
                voted === "down"
                  ? "bg-red-100 text-red-600 scale-110"
                  : voted
                    ? "bg-warm-bg text-warm-text/30 cursor-not-allowed"
                    : "bg-warm-bg text-warm-text cursor-pointer hover:bg-red-50"
              }`}
            >
              <span className="text-2xl">👎</span>
              <span>{votes.down_count}</span>
            </button>
          </div>
        </div>

        {/* Go to main */}
        <a
          href="/"
          className="btn-bouncy block text-center mt-5 py-4 rounded-[16px] bg-primary text-white font-bold text-base"
        >
          🎰 나도 뽑아보기
        </a>
      </div>

      <footer className="mt-auto pt-10 text-center text-xs text-warm-text/30 font-medium">
        🍽️ 종각역 점심 룰렛 v2.0
      </footer>
    </div>
  );
}
