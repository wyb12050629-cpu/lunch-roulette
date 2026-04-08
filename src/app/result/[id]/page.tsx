"use client";

import { use, useState } from "react";
import { restaurants } from "@/data/restaurants";
import { getVotes, vote } from "@/lib/supabase";

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
      <div className="flex flex-col items-center justify-center min-h-full px-4 py-16">
        <span className="text-5xl mb-4">😅</span>
        <h1 className="text-2xl font-extrabold mb-2">식당을 찾을 수 없어요</h1>
        <a
          href="/"
          className="mt-4 px-6 py-3 rounded-2xl bg-primary text-white font-bold hover:bg-primary-hover transition"
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
    <div className="flex flex-col items-center min-h-full px-4 py-8 sm:py-12">
      {/* Header */}
      <header className="text-center mb-8">
        <div className="text-5xl mb-2 animate-float">🍽️</div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
          오늘 뭐 먹지?
        </h1>
        <p className="mt-2 text-sm sm:text-base text-zinc-400 font-medium">
          친구가 추천한 점심 메뉴!
        </p>
      </header>

      <div className="w-full max-w-md animate-bounce-in">
        {/* Card */}
        <div className="bg-white rounded-3xl border-2 border-orange-200 p-6 sm:p-8 shadow-lg shadow-orange-100/50">
          <div className="text-center mb-1">
            <span className="text-3xl">🎉</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-center mb-2">
            {restaurant.name}
          </h2>

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
        </div>

        {/* Go to main */}
        <a
          href="/"
          className="block text-center mt-4 py-3.5 rounded-2xl bg-primary text-white font-bold hover:bg-primary-hover transition"
        >
          🎰 나도 뽑아보기
        </a>
      </div>

      <footer className="mt-auto pt-8 text-center text-xs text-zinc-300">
        🍽️ 종각역 점심 룰렛 v2.0
      </footer>
    </div>
  );
}
