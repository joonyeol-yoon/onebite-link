import type { Bookmark } from "@/lib/types";

type Props = {
  bookmark: Bookmark;
};

export default function LinkCard({ bookmark }: Props) {
  const { hostname } = new URL(bookmark.url);

  return (
    <a
      href={bookmark.url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex h-full flex-col gap-2 rounded-xl border border-zinc-200 bg-white p-5 transition-shadow hover:shadow-md"
    >
      <h3 className="truncate font-semibold text-zinc-900">{bookmark.title}</h3>
      <p className="line-clamp-2 text-sm text-zinc-500">{bookmark.description}</p>
      <span className="mt-auto truncate pt-2 text-xs text-zinc-400">{hostname}</span>
    </a>
  );
}
