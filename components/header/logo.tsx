import Link from "next/link";
import { LinkIcon } from "@/components/icons";

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 rounded-md text-[var(--text)]">
      <LinkIcon className="size-[18px]" />
      <span className="text-[17px] font-semibold tracking-[-0.2px]">한입 링크</span>
    </Link>
  );
}
