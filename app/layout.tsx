import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import Header from "@/components/header/header";
import Sidebar from "@/components/sidebar/sidebar";
import { bookmarks, folders } from "@/lib/mock-data";
import "./globals.css";

// 영문·숫자는 Poppins, 한글은 Pretendard(CDN)로 표시한다.
const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "한입 링크",
  description: "나만의 북마크를 폴더별로 정리하는 서비스",
};

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
      <body className="min-h-full">
        <Header />
        <div className="md:flex">
          <Sidebar folders={folders} bookmarks={bookmarks} />
          <main className="min-w-0 flex-1 px-5 pt-[60px] pb-[100px] md:px-[30px] md:pt-20">
            <div className="mx-auto max-w-[1320px]">{children}</div>
          </main>
        </div>
      </body>
    </html>
  );
}
