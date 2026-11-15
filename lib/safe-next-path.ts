/** 같은 사이트 안의 경로만 허용해 외부 주소로 보내는 open redirect를 막는다. */
export function safeNextPath(next: string | null | undefined) {
  return next && next.startsWith("/") && !next.startsWith("//") && !next.startsWith("/\\")
    ? next
    : "/";
}
