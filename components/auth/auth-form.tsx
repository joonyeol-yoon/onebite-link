"use client";

import Link from "next/link";
import { useCallback, useState, useTransition } from "react";
import Toast from "@/components/toast";
import { BUTTON_PRIMARY, INPUT_CLASS, LABEL_CLASS } from "@/lib/ui";

export type AuthField = {
  name: string;
  label: string;
  type: "email" | "password";
  placeholder: string;
  autoComplete: string;
};

export type AuthValues = Record<string, string>;

type Props = {
  title: string;
  description: string;
  fields: AuthField[];
  submitLabel: string;
  pendingLabel?: string;
  footerText: string;
  footerLinkLabel: string;
  footerHref: string;
  /** 제출 처리. 실패하면 토스트로 보여 줄 오류 메시지를 반환한다. 없으면 제출해도 아무 일도 하지 않는다. */
  onSubmit?: (values: AuthValues) => Promise<string | undefined>;
  /** 하단 안내 문구 위에 두는 보조 링크 (예: 비밀번호 찾기) */
  secondaryLink?: { href: string; label: string };
  /** 페이지를 열자마자 토스트로 보여 줄 오류 메시지 */
  initialError?: string;
  /** 제출 버튼 바로 아래에 보여 줄 요소 (예: 소셜 로그인 버튼) */
  belowSubmit?: React.ReactNode;
};

/** 로그인·회원가입이 함께 쓰는 폼 UI. 모든 칸을 채워야 제출 버튼이 활성화된다. */
export default function AuthForm({
  title,
  description,
  fields,
  submitLabel,
  pendingLabel = submitLabel,
  footerText,
  footerLinkLabel,
  footerHref,
  onSubmit,
  secondaryLink,
  initialError,
  belowSubmit,
}: Props) {
  const [values, setValues] = useState<AuthValues>(() =>
    Object.fromEntries(fields.map((field) => [field.name, ""])),
  );
  // 같은 메시지가 연달아 나와도 토스트가 다시 뜨도록 id를 함께 둔다.
  const [toast, setToast] = useState<{ id: number; message: string } | null>(
    initialError ? { id: 0, message: initialError } : null,
  );
  const [pending, startTransition] = useTransition();

  const closeToast = useCallback(() => setToast(null), []);
  const allFilled = fields.every((field) => values[field.name].trim() !== "");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    // 페이지 새로고침과 입력값의 주소 노출을 막는다.
    e.preventDefault();
    if (!onSubmit || !allFilled || pending) return;

    startTransition(async () => {
      const error = await onSubmit(values);
      if (error) setToast({ id: Date.now(), message: error });
    });
  }

  return (
    <div className="flex w-full flex-col gap-8">
      {toast && <Toast key={toast.id} message={toast.message} onClose={closeToast} />}

      <div className="flex flex-col gap-3 text-center">
        <h1 className="text-[32px] leading-[1.2] font-semibold tracking-[-0.015em] text-[var(--title)]">
          {title}
        </h1>
        <p className="text-[16px] text-[var(--text-sub)]">{description}</p>
      </div>

      <div className="flex flex-col gap-3">
        <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
          {fields.map((field) => (
            <div key={field.name} className="flex flex-col gap-2">
              <label htmlFor={field.name} className={LABEL_CLASS}>
                {field.label}
              </label>
              <input
                id={field.name}
                name={field.name}
                type={field.type}
                required
                value={values[field.name]}
                onChange={(e) => setValues((prev) => ({ ...prev, [field.name]: e.target.value }))}
                placeholder={field.placeholder}
                autoComplete={field.autoComplete}
                className={INPUT_CLASS}
              />
            </div>
          ))}

          <button
            type="submit"
            disabled={!allFilled || pending}
            className={`${BUTTON_PRIMARY} mt-3 w-full`}
          >
            {pending ? pendingLabel : submitLabel}
          </button>
        </form>

        {/* 제출 버튼 바로 아래에 두는 추가 동작 (예: 소셜 로그인). 폼 안에 폼을 둘 수 없어 바깥에 둔다. */}
        {belowSubmit}
      </div>

      <div className="flex flex-col items-center gap-3">
        {secondaryLink && (
          <Link href={secondaryLink.href} className="link-hover text-[14px] text-[var(--text-sub)]">
            {secondaryLink.label}
          </Link>
        )}
        <p className="text-center text-[14px] text-[var(--text-sub)]">
        {footerText}{" "}
        <Link href={footerHref} className="link-hover font-medium text-[var(--title)] underline underline-offset-4">
          {footerLinkLabel}
        </Link>
        </p>
      </div>
    </div>
  );
}
