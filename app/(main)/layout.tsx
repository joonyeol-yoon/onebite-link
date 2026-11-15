import { Suspense } from "react";
import Header from "@/components/header/header";
import Sidebar, { SidebarPlaceholder } from "@/components/sidebar/sidebar";
import AccountWatcher from "@/components/account-watcher";
import { getCurrentUserId } from "@/lib/current-user";
import { getFolders, getLinks } from "@/lib/data";

/** 현재 사용자의 폴더와 링크(폴더별 개수용)를 불러와 사이드바를 그린다. 요청마다 새로 조회한다. */
async function FolderSidebar() {
  const [folders, bookmarks, userId] = await Promise.all([
    getFolders(),
    getLinks(),
    getCurrentUserId(),
  ]);
  return (
    <>
      <Sidebar folders={folders} bookmarks={bookmarks} />
      <AccountWatcher userId={userId} />
    </>
  );
}

/** 서비스 본문 페이지: 상단 헤더 + 좌측 사이드바 */
export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <div className="md:flex">
        <Suspense fallback={<SidebarPlaceholder />}>
          <FolderSidebar />
        </Suspense>
        <main className="min-w-0 flex-1 px-5 pt-[60px] pb-[100px] md:px-[30px] md:pt-20">
          <div className="mx-auto max-w-[1320px]">{children}</div>
        </main>
      </div>
    </>
  );
}
