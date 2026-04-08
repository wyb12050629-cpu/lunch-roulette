import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "오늘 뭐 먹지? 🍽️ 직장인 점심 룰렛",
  description: "점심 메뉴 고민 끝! 카테고리와 예산으로 딱 맞는 식당 추천",
  openGraph: {
    title: "오늘 뭐 먹지? 🍽️",
    description: "점심 메뉴 고민 끝! 카테고리와 예산으로 딱 맞는 식당 추천",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
