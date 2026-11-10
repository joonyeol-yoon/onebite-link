import { INPUT_CLASS, LABEL_CLASS } from "@/lib/ui";

type Props = {
  defaultValue?: string;
  error?: string;
};

export default function UrlInput({ defaultValue = "", error }: Props) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="url" className={LABEL_CLASS}>
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
        className={INPUT_CLASS}
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
