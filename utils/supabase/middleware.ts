import { createServerClient } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

// Refreshes the Supabase auth session cookies. Called from the root proxy.ts.
export const updateSession = async (request: NextRequest) => {
  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(supabaseUrl!, supabaseKey!, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        supabaseResponse = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) =>
          supabaseResponse.cookies.set(name, value, options),
        );
      },
    },
  });

  // Do not remove: this call triggers the token refresh and cookie write.
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // 로그인하지 않은 사용자가 보호된 페이지에 오면 로그인 페이지로 보낸다.
  if (!user && isProtectedPath(request.nextUrl.pathname)) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = "/login";
    loginUrl.search = "";

    // 갱신된 세션 쿠키(만료 쿠키 삭제 포함)가 사라지지 않도록 리다이렉트 응답에 옮겨 담는다.
    const redirectResponse = NextResponse.redirect(loginUrl);
    supabaseResponse.cookies.getAll().forEach((cookie) => redirectResponse.cookies.set(cookie));
    return redirectResponse;
  }

  return supabaseResponse;
};

/**
 * 로그인한 사용자만 들어갈 수 있는 페이지: 인덱스, 폴더별 페이지, 새 링크 페이지
 * 여기에 없는 경로(로그인·회원가입, /privacy 개인정보 처리방침 등)는 누구나 접근할 수 있다.
 */
function isProtectedPath(pathname: string) {
  return (
    pathname === "/" ||
    pathname === "/new" ||
    pathname.startsWith("/new/") ||
    pathname === "/folder" ||
    pathname.startsWith("/folder/")
  );
}
