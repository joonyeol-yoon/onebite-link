type Props = {
  pending?: boolean;
};

export default function SaveButton({ pending = false }: Props) {
  return (
    <button
      type="submit"
      disabled={pending}
      className="btn-primary rounded-full bg-[var(--accent)] px-6 py-3 text-[17px] text-white disabled:cursor-not-allowed disabled:opacity-30 sm:self-end"
    >
      {pending ? "링크 정보를 가져오는 중…" : "저장"}
    </button>
  );
}
