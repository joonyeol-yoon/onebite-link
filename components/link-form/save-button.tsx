export default function SaveButton() {
  return (
    <button
      type="submit"
      className="btn-primary rounded-full bg-[var(--accent)] px-6 py-3 text-[17px] text-white disabled:cursor-not-allowed disabled:opacity-30 sm:self-end"
    >
      저장
    </button>
  );
}
