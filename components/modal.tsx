"use client";

type Props = {
  ref: React.Ref<HTMLDialogElement>;
  labelledBy: string;
  onClose: () => void;
  children: React.ReactNode;
};

/** 화면 가운데 뜨는 모달. 열기는 ref로 `showModal()`을 호출한다. */
export default function Modal({ ref, labelledBy, onClose, children }: Props) {
  return (
    <dialog
      ref={ref}
      aria-labelledby={labelledBy}
      onClick={(e) => {
        // 바깥(backdrop) 클릭 시 닫기
        if (e.target === e.currentTarget) onClose();
      }}
      className="m-auto w-[calc(100%-2.5rem)] max-w-[480px] rounded-3xl bg-[var(--bg)] p-0 text-[var(--text)] backdrop:bg-[var(--overlay)] backdrop:backdrop-blur-[10px]"
    >
      {children}
    </dialog>
  );
}
