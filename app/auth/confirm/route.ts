import type { EmailOtpType } from "@supabase/supabase-js";
import { cookies } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";
import { safeNextPath } from "@/lib/safe-next-path";
import { createClient } from "@/utils/supabase/server";

/**
 * 인증 메일(비밀번호 재설정 등)의 링크가 도착하는 곳.
 * 링크에 담긴 code(기본 메일 템플릿) 또는 token_hash(커스텀 템플릿)로 세션을 만든 뒤 next 경로로 보낸다.
 */
export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const code = searchParams.get("code");
  const tokenHash = searchParams.get("token_hash");
  const type = searchParams.get("type") as EmailOtpType | null;
  const next = safeNextPath(searchParams.get("next"));

  const supabase = createClient(await cookies());

  let ok = false;
  if (code) {
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    ok = !error;
  } else if (tokenHash && type) {
    const { error } = await supabase.auth.verifyOtp({ token_hash: tokenHash, type });
    ok = !error;
  }

  const target = request.nextUrl.clone();
  target.search = "";
  if (ok) {
    target.pathname = next;
  } else {
    // 링크가 만료됐거나 다른 브라우저에서 열린 경우
    target.pathname = "/forgot-password";
    target.searchParams.set("error", "invalid_link");
  }
  return NextResponse.redirect(target);
}
