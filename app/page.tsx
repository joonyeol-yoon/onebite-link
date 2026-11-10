import PageTitle from "@/components/page-title";
import LinkGrid from "@/components/link/link-grid";
import { bookmarks } from "@/lib/mock-data";

export default function Home() {
  return (
    <>
      <PageTitle description={`저장한 링크 ${bookmarks.length}개`}>All</PageTitle>
      <LinkGrid bookmarks={bookmarks} />
    </>
  );
}
