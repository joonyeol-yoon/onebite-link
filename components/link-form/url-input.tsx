type Props = {
  defaultValue?: string;
  error?: string;
};

export default function UrlInput({ defaultValue = "", error }: Props) {
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
        defaultValue={defaultValue}
        placeholder="https://example.com"
        aria-invalid={error ? true : undefined}
        aria-describedby="url-hint"
        className="rounded-[10px] border border-[var(--border)] bg-[var(--bg)] px-4 py-3 text-[17px] text-[var(--text)] transition-[border-color,box-shadow] duration-300 ease-[ease] placeholder:text-[var(--placeholder)] focus:border-[var(--accent)] focus:shadow-[0_0_0_3px_var(--focus-ring)] focus:outline-none aria-invalid:border-[var(--error)]"
      />
      {error ? (
        <p id="url-hint" aria-live="polite" className="text-[14px] leading-[1.4] text-[var(--error)]">
          {error}
        </p>
      ) : (
        <p id="url-hint" className="text-[14px] leading-[1.4] text-[var(--text-sub)]">
          저장하면 페이지의 제목, 설명, 썸네일을 자동으로 가져와요.
        </p>
      )}
    </div>
  );
}
