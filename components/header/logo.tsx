import Link from "next/link";
import { LinkIcon } from "@/components/icons";

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2.5 rounded-md">
      <span className="grid size-8 place-items-center rounded-lg bg-accent text-white">
        <LinkIcon className="size-[18px]" />
      </span>
      <span className="text-lg font-bold tracking-tight text-ink">한입 링크</span>
    </Link>
  );
}
