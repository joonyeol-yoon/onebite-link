"use client";

import { useRef, useTransition } from "react";
import { usePathname, useRouter } from "next/navigation";
import type { Folder } from "@/lib/types";
import { deleteFolder } from "@/lib/actions";
import { TrashIcon } from "@/components/icons";
import Modal from "@/components/modal";

type Props = {
  folder: Folder;
  count: number;
};

export default function DeleteFolderButton({ folder, count }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [pending, startTransition] = useTransition();
  const pathname = usePathname();
  const router = useRouter();
  const titleId = `delete-folder-title-${folder.id}`;

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

      <Modal ref={dialogRef} labelledBy={titleId} onClose={close}>
        <div className="flex flex-col gap-5 p-8">
          <div className="flex flex-col gap-3">
            <h2
              id={titleId}
              className="text-[24px] leading-[1.2] font-semibold tracking-[-0.3px] text-[var(--text)]"
            >
              폴더를 삭제할까요?
            </h2>
            <p className="text-[17px] leading-[1.5] text-[var(--text-sub)]">
              <strong className="font-semibold text-[var(--text)]">{folder.name}</strong> 폴더를
              삭제합니다.
              {count > 0 && ` 폴더 안의 링크 ${count}개도 함께 삭제돼요.`} 삭제한 뒤에는 되돌릴 수
              없어요.
            </p>
          </div>

          <div className="mt-3 flex items-center justify-end gap-6">
            <button
              type="button"
              onClick={close}
              autoFocus
              className="btn-secondary text-[17px] text-[var(--accent)]"
            >
              취소
            </button>
            <button
              type="button"
              onClick={confirm}
              disabled={pending}
              className="btn-danger rounded-full bg-[var(--error)] px-6 py-3 text-[17px] text-white disabled:cursor-not-allowed disabled:opacity-30"
            >
              {pending ? "삭제 중…" : "삭제"}
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}
