export default function UrlInput() {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="url" className="text-[14px] font-medium text-[var(--text)]">
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
        className="rounded-[10px] border border-[var(--border)] bg-[var(--bg)] px-4 py-3 text-[17px] text-[var(--text)] transition-[border-color,box-shadow] duration-300 ease-[ease] placeholder:text-[var(--placeholder)] focus:border-[var(--accent)] focus:shadow-[0_0_0_3px_var(--focus-ring)] focus:outline-none"
      />
      <p id="url-hint" className="text-[14px] leading-[1.4] text-[var(--text-sub)]">
        https:// 로 시작하는 전체 주소를 붙여 넣어 주세요.
      </p>
    </div>
  );
}
