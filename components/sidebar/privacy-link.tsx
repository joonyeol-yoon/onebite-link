import Link from "next/link";

/** 사이드바 로그아웃 버튼 아래에 회색으로 두는 개인정보 처리방침 링크 */
export default function PrivacyLink() {
  return (
    <Link
      href="/privacy"
      className="link-hover shrink-0 self-center px-3 py-2.5 text-[13px] text-[var(--text-sub)] md:-mt-6 md:self-start md:py-0"
    >
      개인정보 처리방침
    </Link>
  );
}
