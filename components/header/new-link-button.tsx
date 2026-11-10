import Link from "next/link";

export default function NewLinkButton() {
  return (
    <Link
      href="/new"
      className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-700"
    >
      + 새 링크
    </Link>
  );
}
