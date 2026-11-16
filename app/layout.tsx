import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { createMetadata, SITE_URL } from "@/lib/metadata";

// 영문·숫자는 Poppins, 한글은 Pretendard(CDN)로 표시한다.
const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

// 파비콘은 app/favicon.ico 파일 규칙으로 Next.js가 <link rel="icon">을 자동으로 넣는다.
export const metadata: Metadata = {
  metadataBase: SITE_URL,
  ...createMetadata(),
};

/** 모든 페이지가 공유하는 html·body 뼈대. 헤더·사이드바는 (main) 그룹 레이아웃에서 그린다. */
export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko" className={`${poppins.variable} h-full antialiased`}>
      <head>
        <link
          rel="stylesheet"
          crossOrigin="anonymous"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard-dynamic-subset.min.css"
        />
      </head>
      <body className="min-h-full">{children}</body>
    </html>
  );
}
