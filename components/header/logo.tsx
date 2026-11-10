import Link from "next/link";
import { LinkIcon } from "@/components/icons";

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 rounded-md text-[var(--title)]">
      <span className="grid size-8 place-items-center rounded-full bg-[var(--title)] text-[var(--bg)]">
        <LinkIcon className="size-4" />
      </span>
      <span className="text-[20px] font-bold tracking-[-0.015em]">한입 링크</span>
    </Link>
  );
}
