import type { Metadata } from "next";
import { IBM_Plex_Sans_KR } from "next/font/google";
import Header from "@/components/header/header";
import Sidebar from "@/components/sidebar/sidebar";
import { bookmarks, folders } from "@/lib/mock-data";
import "./globals.css";

const plexSansKR = IBM_Plex_Sans_KR({
  variable: "--font-plex-sans-kr",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "한입 링크",
  description: "나만의 북마크를 폴더별로 정리하는 서비스",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ko"
      className={`${plexSansKR.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <div className="flex h-screen flex-col bg-zinc-50">
          <Header />
          <div className="flex min-h-0 flex-1">
            <Sidebar folders={folders} bookmarks={bookmarks} />
            <main className="flex-1 overflow-y-auto p-6">{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}
