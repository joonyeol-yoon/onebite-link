"use client";

import { useRef, useTransition } from "react";
import type { Bookmark } from "@/lib/types";
import { deleteBookmark } from "@/lib/actions";
import { TrashIcon } from "@/components/icons";
import ConfirmModal from "@/components/confirm-modal";

type Props = {
  bookmark: Bookmark;
};

export default function DeleteLinkButton({ bookmark }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [pending, startTransition] = useTransition();

  const close = () => dialogRef.current?.close();

  const confirm = () => {
    startTransition(async () => {
      await deleteBookmark(bookmark.id);
      close();
    });
  };

  return (
    <>
      <button
        type="button"
        onClick={() => dialogRef.current?.showModal()}
        aria-label={`${bookmark.title} 링크 삭제`}
        className="link-action icon-btn icon-btn-danger grid size-8 place-items-center rounded-full bg-[var(--glass-bg)] text-[var(--title)] backdrop-blur-[10px]"
      >
        <TrashIcon className="size-4" />
      </button>

      <ConfirmModal
        ref={dialogRef}
        titleId={`delete-link-title-${bookmark.id}`}
        title="링크를 삭제할까요?"
        confirmLabel="삭제"
        pendingLabel="삭제 중…"
        pending={pending}
        onConfirm={confirm}
        onClose={close}
      >
        <strong className="font-semibold text-[var(--title)]">{bookmark.title}</strong> 링크를
        삭제합니다. 삭제한 뒤에는 되돌릴 수 없어요.
      </ConfirmModal>
    </>
  );
}
