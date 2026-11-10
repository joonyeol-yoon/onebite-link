"use client";

import Modal from "./modal";
import { BUTTON_DANGER, BUTTON_OUTLINE, MODAL_TITLE_CLASS } from "@/lib/ui";

type Props = {
  ref: React.Ref<HTMLDialogElement>;
  titleId: string;
  title: string;
  children: React.ReactNode;
  confirmLabel: string;
  pendingLabel: string;
  pending: boolean;
  onConfirm: () => void;
  onClose: () => void;
};

/** 삭제처럼 되돌릴 수 없는 동작을 한 번 더 확인하는 모달. 열기는 ref로 `showModal()`을 호출한다. */
export default function ConfirmModal({
  ref,
  titleId,
  title,
  children,
  confirmLabel,
  pendingLabel,
  pending,
  onConfirm,
  onClose,
}: Props) {
  return (
    <Modal ref={ref} labelledBy={titleId} onClose={onClose}>
      <div className="flex flex-col gap-5 p-8">
        <div className="flex flex-col gap-3">
          <h2 id={titleId} className={MODAL_TITLE_CLASS}>
            {title}
          </h2>
          <p className="text-[16px] leading-[1.625] text-[var(--text-sub)]">{children}</p>
        </div>

        <div className="mt-3 flex justify-end gap-2">
          <button type="button" onClick={onClose} autoFocus className={BUTTON_OUTLINE}>
            취소
          </button>
          <button type="button" onClick={onConfirm} disabled={pending} className={BUTTON_DANGER}>
            {pending ? pendingLabel : confirmLabel}
          </button>
        </div>
      </div>
    </Modal>
  );
}
