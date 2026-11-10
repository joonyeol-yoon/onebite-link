"use client";

import { useRef, useTransition } from "react";
import { usePathname, useRouter } from "next/navigation";
import type { Folder } from "@/lib/types";
import { deleteFolder } from "@/lib/actions";
import { TrashIcon } from "@/components/icons";
import ConfirmModal from "@/components/confirm-modal";

type Props = {
  folder: Folder;
  count: number;
};

export default function DeleteFolderButton({ folder, count }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [pending, startTransition] = useTransition();
  const pathname = usePathname();
  const router = useRouter();

  const close = () => dialogRef.current?.close();

  const confirm = () => {
    startTransition(async () => {
      await deleteFolder(folder.id);
      close();
      // 지금 보고 있는 폴더를 지웠다면 전체 목록으로 이동
      if (pathname === `/folder/${folder.id}`) router.replace("/");
    });
  };

  return (
    <>
      <button
        type="button"
        onClick={() => dialogRef.current?.showModal()}
        aria-label={`${folder.name} 폴더 삭제`}
        className="folder-action icon-btn icon-btn-danger hidden size-7 place-items-center rounded-full text-[var(--text-sub)] md:grid"
      >
        <TrashIcon className="size-4" />
      </button>

      <ConfirmModal
        ref={dialogRef}
        titleId={`delete-folder-title-${folder.id}`}
        title="폴더를 삭제할까요?"
        confirmLabel="삭제"
        pendingLabel="삭제 중…"
        pending={pending}
        onConfirm={confirm}
        onClose={close}
      >
        <strong className="font-semibold text-[var(--title)]">{folder.name}</strong> 폴더를
        삭제합니다.
        {count > 0 && ` 폴더 안의 링크 ${count}개도 함께 삭제돼요.`} 삭제한 뒤에는 되돌릴 수 없어요.
      </ConfirmModal>
    </>
  );
}
