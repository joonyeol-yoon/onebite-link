import { ArrowUpRightIcon } from "@/components/icons";

type Props = {
  pending?: boolean;
};

/** 페이지 CTA: 높이 64px pill, 텍스트 좌측 · 화살표 우측 (가이드의 기본 버튼 원형 그대로) */
export default function SaveButton({ pending = false }: Props) {
  return (
    <button
      type="submit"
      disabled={pending}
      className="btn-primary flex h-16 w-full items-center justify-between gap-6 rounded-full bg-[var(--accent)] pr-[35px] pl-[43px] text-[17px] font-medium text-[var(--on-accent)] disabled:cursor-not-allowed disabled:opacity-40 sm:w-auto sm:min-w-[280px] sm:self-end"
    >
      <span>{pending ? "링크 정보를 가져오는 중…" : "링크 저장"}</span>
      <ArrowUpRightIcon className="size-5 rotate-45" />
    </button>
  );
}
