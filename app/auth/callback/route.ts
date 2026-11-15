import { cookies } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";
import { safeNextPath } from "@/lib/safe-next-path";
import { createClient } from "@/utils/supabase/server";

/**
 * 소셜 로그인(카카오)을 마치고 돌아오는 곳.
 * 받은 code로 세션을 만든 뒤 next 경로로 보내고, 실패하거나 사용자가 취소하면 로그인 페이지로 돌려보낸다.
 */
export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const code = searchParams.get("code");
  const next = safeNextPath(searchParams.get("next"));

  let ok = false;
  if (code) {
    const supabase = createClient(await cookies());
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    ok = !error;
  }

  const target = request.nextUrl.clone();
  target.search = "";
  if (ok) {
    target.pathname = next;
  } else {
    target.pathname = "/login";
    target.searchParams.set("error", "oauth");
  }
  return NextResponse.redirect(target);
}
