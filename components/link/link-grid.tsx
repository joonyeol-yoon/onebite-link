import type { Bookmark } from "@/lib/types";
import LinkCard from "./link-card";

type Props = {
  bookmarks: Bookmark[];
};

export default function LinkGrid({ bookmarks }: Props) {
  if (bookmarks.length === 0) {
    return (
      <p className="py-20 text-center text-sm text-zinc-400">등록된 링크가 없습니다.</p>
    );
  }

  return (
    <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {bookmarks.map((bookmark) => (
        <li key={bookmark.id}>
          <LinkCard bookmark={bookmark} />
        </li>
      ))}
    </ul>
  );
}
