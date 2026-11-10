import Link from "next/link";
import { PlusIcon } from "@/components/icons";

export default function NewLinkButton() {
  return (
    <Link
      href="/new"
      className="btn-primary flex items-center gap-1 rounded-full bg-[var(--accent)] px-4 py-1.5 text-[14px] font-medium text-white"
    >
      <PlusIcon className="size-4" />
      새 링크
    </Link>
  );
}
