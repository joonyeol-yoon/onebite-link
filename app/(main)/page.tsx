import { Suspense } from "react";
import PageTitle from "@/components/page-title";
import LinkGrid from "@/components/link/link-grid";
import { getFolders, getLinks } from "@/lib/data";

/** links 테이블의 모든 링크를 불러와 보여준다. */
async function AllLinks() {
  const [bookmarks, folders] = await Promise.all([getLinks(), getFolders()]);
  return (
    <>
      <PageTitle description={`저장한 링크 ${bookmarks.length}개`}>All</PageTitle>
      <LinkGrid bookmarks={bookmarks} folders={folders} />
    </>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<PageTitle>All</PageTitle>}>
      <AllLinks />
    </Suspense>
  );
}
