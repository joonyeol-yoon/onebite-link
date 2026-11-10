import Link from "next/link";
import { PlusIcon } from "@/components/icons";
import { BUTTON_SMALL } from "@/lib/ui";

export default function NewLinkButton() {
  return (
    <Link
      href="/new"
      className={`btn-outline-accent ${BUTTON_SMALL} border-[var(--accent)] text-[var(--accent)]`}
    >
      <PlusIcon className="size-3.5" />
      새 링크
    </Link>
  );
}
