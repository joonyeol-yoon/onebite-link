export default function UrlInput() {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="url" className="text-sm font-semibold text-ink">
        링크
      </label>
      <input
        id="url"
        name="url"
        type="url"
        required
        autoFocus
        placeholder="https://example.com"
        aria-describedby="url-hint"
        className="h-11 rounded-lg border border-line-strong bg-surface px-3.5 text-sm text-ink transition-[border-color,box-shadow] placeholder:text-ink-muted hover:border-ink-muted focus:border-accent focus:shadow-[0_0_0_3px_var(--color-accent-soft)] focus:outline-none"
      />
      <p id="url-hint" className="text-xs text-ink-muted">
        https:// 로 시작하는 전체 주소를 붙여 넣어 주세요.
      </p>
    </div>
  );
}
