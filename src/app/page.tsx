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
    <div className="flex flex-col items-center min-h-full px-5 py-10 sm:py-14 pb-28">
      {/* Header */}
      <header className="text-center mb-10 sm:mb-12">
        <div className="text-6xl mb-3 animate-float">🍽️</div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-warm-text">
          오늘 뭐 먹지?
        </h1>
        <p className="mt-2 text-sm sm:text-base text-warm-text/60 font-medium">
          점심 메뉴 고민 끝! 돌려돌려~ 🎰
        </p>
        <p className="mt-1 text-sm sm:text-base text-warm-text/60 font-medium">
          🍁 단풍이가 뚝딱뚝딱 만들었어요
        </p>
      </header>

      <div className="w-full max-w-md">
        {/* Step indicator */}
        {step !== "result" && (
          <div className="flex items-center justify-center gap-3 mb-7 animate-fade-in">
            <span className={`h-3 rounded-full transition-all duration-300 ${step === "category" ? "bg-primary w-8" : "bg-card-border w-3"}`} />
            <span className={`h-3 rounded-full transition-all duration-300 ${step === "budget" ? "bg-primary w-8" : "bg-card-border w-3"}`} />
          </div>
        )}

        {/* Step 1: Category */}
        {step === "category" && (
          <div className="animate-slide-up">
            <p className="text-center text-lg font-bold mb-6 text-warm-text">
              오늘 뭐 땡겨요? 🤔
            </p>
            <div className="grid grid-cols-2 gap-4">
              {categoryButtons.map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleCategorySelect(cat)}
                  className="btn-bouncy flex flex-col items-center gap-2 p-6 rounded-[20px] bg-card border-2 border-card-border/60 hover:border-primary hover:shadow-lg hover:shadow-primary/10 cursor-pointer"
                >
                  <span className="text-4xl">{foodCategoryLabels[cat].split(" ")[0]}</span>
                  <span className="font-bold text-warm-text">{foodCategoryLabels[cat].split(" ")[1]}</span>
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
              className="text-sm text-warm-text/50 hover:text-warm-text transition mb-5 cursor-pointer font-medium"
            >
              ← 다시 고르기
            </button>
            <p className="text-center text-lg font-bold mb-2 text-warm-text">
              예산이 어떻게 되세요? 💸
            </p>
            <p className="text-center text-xs text-warm-text/50 mb-6">
              {foodCategoryLabels[selectedCategory!]} 선택 완료!
            </p>
            <div className="flex flex-col gap-4">
              {budgetOptions.map((opt) => (
                <button
                  key={opt.tier}
                  onClick={() => handleBudgetSelect(opt.tier)}
                  className="btn-bouncy flex items-center gap-4 p-5 rounded-[20px] bg-card border-2 border-card-border/60 hover:border-primary hover:shadow-lg hover:shadow-primary/10 cursor-pointer"
                >
                  <span className="text-4xl">{opt.emoji}</span>
                  <p className="font-bold text-warm-text">{opt.label}</p>
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
        className="btn-bouncy fixed bottom-6 right-6 px-5 py-4 rounded-full bg-card border-2 border-card-border shadow-lg shadow-primary/10 font-bold text-sm cursor-pointer z-40 text-warm-text"
      >
        🏢 팀점/회식이세요?
      </button>

      {/* Team Modal */}
      <TeamModal open={teamModalOpen} onClose={() => setTeamModalOpen(false)} />

      {/* Footer */}
      <footer className="mt-auto pt-10 text-center text-xs text-warm-text/30 font-medium">
        🍽️ 종각역 점심 룰렛 v2.0
      </footer>
    </div>
  );
}
