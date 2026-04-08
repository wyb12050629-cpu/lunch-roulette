"use client";

import { useState, useCallback } from "react";
import {
  restaurants,
  foodCategoryLabels,
  budgetOptions,
  type CategorySelection,
  type BudgetTier,
  type Restaurant,
} from "@/data/restaurants";
import ResultCard from "@/components/ResultCard";
import TeamModal from "@/components/TeamModal";

type Step = "category" | "budget" | "result";

const categoryButtons: CategorySelection[] = ["korean", "chinese", "japanese", "western", "asian", "any"];

export default function Home() {
  const [step, setStep] = useState<Step>("category");
  const [selectedCategory, setSelectedCategory] = useState<CategorySelection | null>(null);
  const [selectedBudget, setSelectedBudget] = useState<BudgetTier | null>(null);
  const [picked, setPicked] = useState<Restaurant | null>(null);
  const [teamModalOpen, setTeamModalOpen] = useState(false);

  const pickRandom = useCallback(
    (category: CategorySelection, budget: BudgetTier) => {
      const filtered = restaurants.filter(
        (r) =>
          r.category !== "team" &&
          r.budget === budget &&
          (category === "any" || r.category === category)
      );
      if (filtered.length === 0) return null;
      return filtered[Math.floor(Math.random() * filtered.length)];
    },
    []
  );

  const handleCategorySelect = (cat: CategorySelection) => {
    setSelectedCategory(cat);
    setStep("budget");
  };

  const handleBudgetSelect = (budget: BudgetTier) => {
    if (!selectedCategory) return;
    setSelectedBudget(budget);
    const result = pickRandom(selectedCategory, budget);
    if (result) {
      setPicked(result);
      setStep("result");
    } else {
      alert("😅 해당 조건의 식당이 아직 없어요! 다른 조건을 골라보세요~");
    }
  };

  const handleRetry = () => {
    if (!selectedCategory || !selectedBudget) return;
    const result = pickRandom(selectedCategory, selectedBudget);
    if (result) setPicked(result);
  };

  const handleReset = () => {
    setStep("category");
    setSelectedCategory(null);
    setSelectedBudget(null);
    setPicked(null);
  };

  return (
    <div className="flex flex-col items-center min-h-full px-4 py-8 sm:py-12 pb-24">
      {/* Header */}
      <header className="text-center mb-8 sm:mb-10">
        <div className="text-5xl mb-2 animate-float">🍽️</div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
          오늘 뭐 먹지?
        </h1>
        <p className="mt-2 text-sm sm:text-base text-zinc-400 font-medium">
          점심 메뉴 고민 끝! 돌려돌려~ 🎰
        </p>
        <p className="mt-1 text-sm sm:text-base text-zinc-400 font-medium">
          🍁 단풍이가 뚝딱뚝딱 만들었어요
        </p>
      </header>

      <div className="w-full max-w-md">
        {/* Step indicator */}
        {step !== "result" && (
          <div className="flex items-center justify-center gap-2 mb-6 animate-fade-in">
            <span className={`w-2.5 h-2.5 rounded-full transition-all ${step === "category" ? "bg-primary w-6" : "bg-zinc-200"}`} />
            <span className={`w-2.5 h-2.5 rounded-full transition-all ${step === "budget" ? "bg-primary w-6" : "bg-zinc-200"}`} />
          </div>
        )}

        {/* Step 1: Category */}
        {step === "category" && (
          <div className="animate-slide-up">
            <p className="text-center text-lg font-bold mb-5">
              오늘 뭐 땡겨요? 🤔
            </p>
            <div className="grid grid-cols-2 gap-3">
              {categoryButtons.map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleCategorySelect(cat)}
                  className="flex flex-col items-center gap-1.5 p-5 rounded-2xl border-2 border-zinc-200 bg-white hover:border-primary hover:shadow-md hover:shadow-orange-100 transition-all active:scale-95 cursor-pointer"
                >
                  <span className="text-3xl">{foodCategoryLabels[cat].split(" ")[0]}</span>
                  <span className="font-bold text-zinc-800">{foodCategoryLabels[cat].split(" ")[1]}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Budget */}
        {step === "budget" && (
          <div className="animate-slide-up">
            <button
              onClick={() => setStep("category")}
              className="text-sm text-zinc-400 hover:text-zinc-600 transition mb-4 cursor-pointer"
            >
              ← 다시 고르기
            </button>
            <p className="text-center text-lg font-bold mb-2">
              예산이 어떻게 되세요? 💸
            </p>
            <p className="text-center text-xs text-zinc-400 mb-5">
              {foodCategoryLabels[selectedCategory!]} 선택 완료!
            </p>
            <div className="flex flex-col gap-3">
              {budgetOptions.map((opt) => (
                <button
                  key={opt.tier}
                  onClick={() => handleBudgetSelect(opt.tier)}
                  className="flex items-center gap-4 p-5 rounded-2xl border-2 border-zinc-200 bg-white hover:border-primary hover:shadow-md hover:shadow-orange-100 transition-all active:scale-95 cursor-pointer"
                >
                  <span className="text-3xl">{opt.emoji}</span>
                  <p className="font-bold text-zinc-800">{opt.label}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 3: Result */}
        {step === "result" && picked && (
          <ResultCard
            restaurant={picked}
            onRetry={handleRetry}
            onBack={handleReset}
          />
        )}
      </div>

      {/* Floating Team Button */}
      <button
        onClick={() => setTeamModalOpen(true)}
        className="fixed bottom-6 right-6 px-5 py-3.5 rounded-full bg-white border-2 border-orange-200 shadow-lg shadow-orange-100/50 font-bold text-sm hover:scale-105 hover:shadow-xl transition-all cursor-pointer active:scale-95 z-40"
      >
        🏢 팀점/회식이세요?
      </button>

      {/* Team Modal */}
      <TeamModal open={teamModalOpen} onClose={() => setTeamModalOpen(false)} />

      {/* Footer */}
      <footer className="mt-auto pt-8 text-center text-xs text-zinc-300">
        🍽️ 종각역 점심 룰렛 v2.0
      </footer>
    </div>
  );
}
