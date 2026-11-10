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
        <div className="flex h-dvh flex-col">
          <Header />
          <div className="flex min-h-0 flex-1 flex-col md:flex-row">
            <Sidebar folders={folders} bookmarks={bookmarks} />
            <main className="flex-1 overflow-y-auto px-4 py-6 md:px-8 md:py-8">
              <div className="mx-auto max-w-7xl">{children}</div>
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
