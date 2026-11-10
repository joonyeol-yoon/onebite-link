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
      className="m-auto w-[calc(100%-3rem)] max-w-[440px] rounded-2xl bg-[var(--bg)] p-0 text-[var(--text)] shadow-[0_20px_60px_rgba(0,0,0,0.12)] backdrop:bg-[var(--overlay)] backdrop:backdrop-blur-sm"
    >
      {children}
    </dialog>
  );
}
