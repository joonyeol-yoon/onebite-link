import Link from "next/link";
import { PlusIcon } from "@/components/icons";

export default function NewLinkButton() {
  return (
    <Link
      href="/new"
      className="flex items-center gap-1.5 rounded-lg bg-accent px-3.5 py-2 text-sm font-semibold text-white shadow-[0_1px_2px_rgb(27_29_41/0.12)] transition-colors hover:bg-accent-hover active:translate-y-px"
    >
      <PlusIcon className="size-4" />
      새 링크
    </Link>
  );
}
