import PageTitle from "@/components/page-title";
import LinkGrid from "@/components/link/link-grid";
import { bookmarks } from "@/lib/mock-data";

export default function Home() {
  return (
    <>
      <PageTitle>All</PageTitle>
      <LinkGrid bookmarks={bookmarks} />
    </>
  );
}
