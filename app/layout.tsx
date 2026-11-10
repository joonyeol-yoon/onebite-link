import type { Metadata } from "next";
import Header from "@/components/header/header";
import Sidebar from "@/components/sidebar/sidebar";
import { bookmarks, folders } from "@/lib/mock-data";
import "./globals.css";

export const metadata: Metadata = {
  title: "한입 링크",
  description: "나만의 북마크를 폴더별로 정리하는 서비스",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko" className="h-full antialiased">
      <body className="min-h-full">
        <Header />
        <div className="md:flex">
          <Sidebar folders={folders} bookmarks={bookmarks} />
          <main className="min-w-0 flex-1 px-6 pt-14 pb-24">
            <div className="mx-auto max-w-[680px]">{children}</div>
          </main>
        </div>
      </body>
    </html>
  );
}
