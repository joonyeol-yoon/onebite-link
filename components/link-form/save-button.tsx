export default function SaveButton() {
  return (
    <button
      type="submit"
      className="h-11 rounded-lg bg-accent px-6 text-sm font-semibold text-white shadow-[0_1px_2px_rgb(27_29_41/0.12)] transition-colors hover:bg-accent-hover active:translate-y-px disabled:cursor-not-allowed disabled:opacity-50 sm:self-end"
    >
      저장
    </button>
  );
}
