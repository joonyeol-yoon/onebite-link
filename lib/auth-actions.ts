"use server";

import { revalidatePath } from "next/cache";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

/**
 * 로그인한 계정이 바뀐 뒤(로그인·회원가입·로그아웃 등) 이동한다.
 * 브라우저에 남은 이전 계정의 페이지 데이터(라우터 캐시)를 모두 버려, 이동한 뒤 데이터를 처음부터 다시 불러오게 한다.
 * redirect는 내부적으로 예외를 던지므로 try/catch 밖에서 호출한다.
 */
function redirectAfterAccountChange(path: string): never {
  revalidatePath("/", "layout");
  redirect(path);
}

export type SignupInput = {
  email: string;
  password: string;
  passwordConfirm: string;
};

/** 인증 액션의 실패 결과. 성공하면 반환하지 않고 페이지를 이동한다. */
export type AuthResult = { error: string };
export type SignupResult = AuthResult;

/** Supabase 인증 오류 코드를 사용자에게 보여 줄 한국어 메시지로 바꾼다. */
function toKoreanSignupError(code: string | undefined) {
  switch (code) {
    case "user_already_exists":
    case "email_exists":
      return "이미 가입된 이메일이에요.";
    case "email_address_invalid":
    case "validation_failed":
      return "올바른 이메일 주소를 입력해 주세요.";
    case "weak_password":
      return "비밀번호가 너무 약해요. 6자 이상으로 더 복잡하게 입력해 주세요.";
    case "over_email_send_rate_limit":
    case "over_request_rate_limit":
      return "요청이 너무 많아요. 잠시 후 다시 시도해 주세요.";
    case "signup_disabled":
    case "email_provider_disabled":
      return "지금은 회원가입을 할 수 없어요.";
    default:
      return "회원가입에 실패했어요. 잠시 후 다시 시도해 주세요.";
  }
}

export type LoginInput = {
  email: string;
  password: string;
};

/** Supabase 로그인 오류 코드를 사용자에게 보여 줄 한국어 메시지로 바꾼다. */
function toKoreanLoginError(code: string | undefined) {
  switch (code) {
    case "invalid_credentials":
      return "이메일 또는 비밀번호가 올바르지 않아요.";
    case "email_not_confirmed":
      return "이메일 인증을 완료한 뒤 로그인해 주세요.";
    case "email_address_invalid":
    case "validation_failed":
      return "올바른 이메일 주소를 입력해 주세요.";
    case "user_banned":
      return "이용이 제한된 계정이에요.";
    case "over_request_rate_limit":
      return "요청이 너무 많아요. 잠시 후 다시 시도해 주세요.";
    default:
      return "로그인에 실패했어요. 잠시 후 다시 시도해 주세요.";
  }
}

/** 이메일·비밀번호로 로그인한다. 성공하면 인덱스 페이지로 이동하고, 실패하면 오류 메시지를 반환한다. */
export async function login(input: LoginInput): Promise<AuthResult> {
  const email = String(input?.email ?? "").trim();
  const password = String(input?.password ?? "");

  if (!email || !password) {
    return { error: "이메일과 비밀번호를 모두 입력해 주세요." };
  }

  const supabase = createClient(await cookies());
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) return { error: toKoreanLoginError(error.code) };

  redirectAfterAccountChange("/");
}

/** 현재 요청의 사이트 주소(예: http://localhost:3000). 인증 후 돌아올 주소를 만들 때 쓴다. */
async function getOrigin() {
  const headerList = await headers();
  return (
    headerList.get("origin") ??
    `${headerList.get("x-forwarded-proto") ?? "http"}://${headerList.get("host")}`
  );
}

/** 카카오 로그인 화면으로 보낸다. 로그인을 마치면 /auth/callback을 거쳐 인덱스 페이지로 돌아온다. */
export async function loginWithKakao() {
  const origin = await getOrigin();
  const supabase = createClient(await cookies());
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "kakao",
    options: { redirectTo: `${origin}/auth/callback?next=/` },
  });

  if (error || !data.url) redirect("/login?error=oauth");
  redirect(data.url);
}

/** 비밀번호 재설정 메일 발송 오류를 한국어 메시지로 바꾼다. */
function toKoreanResetEmailError(code: string | undefined) {
  switch (code) {
    case "email_address_invalid":
    case "validation_failed":
      return "올바른 이메일 주소를 입력해 주세요.";
    case "over_email_send_rate_limit":
    case "over_request_rate_limit":
      return "메일 발송 요청이 너무 많아요. 잠시 후 다시 시도해 주세요.";
    default:
      return "재설정 메일을 보내지 못했어요. 잠시 후 다시 시도해 주세요.";
  }
}

/** 입력한 이메일로 비밀번호 재설정 링크를 보낸다. 성공하면 undefined, 실패하면 오류 메시지를 반환한다. */
export async function sendPasswordResetEmail(input: { email: string }): Promise<AuthResult | undefined> {
  const email = String(input?.email ?? "").trim();
  if (!email) return { error: "이메일을 입력해 주세요." };

  // 메일의 링크를 누르면 /auth/confirm에서 세션을 만든 뒤 재설정 페이지로 이동한다.
  const origin = await getOrigin();
  const supabase = createClient(await cookies());
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${origin}/auth/confirm?next=/reset-password`,
  });
  if (error) return { error: toKoreanResetEmailError(error.code) };
}

/** 새 비밀번호 저장 오류를 한국어 메시지로 바꾼다. */
function toKoreanUpdatePasswordError(code: string | undefined) {
  switch (code) {
    case "same_password":
      return "기존 비밀번호와 다른 비밀번호를 입력해 주세요.";
    case "weak_password":
      return "비밀번호가 너무 약해요. 6자 이상으로 더 복잡하게 입력해 주세요.";
    case "session_not_found":
    case "session_expired":
      return "재설정 링크가 만료되었어요. 비밀번호 찾기를 다시 진행해 주세요.";
    default:
      return "비밀번호를 바꾸지 못했어요. 잠시 후 다시 시도해 주세요.";
  }
}

/** 재설정 링크로 만든 세션에서 새 비밀번호를 저장한다. 성공하면 인덱스 페이지로 이동한다. */
export async function updatePassword(input: {
  password: string;
  passwordConfirm: string;
}): Promise<AuthResult> {
  const password = String(input?.password ?? "");
  const passwordConfirm = String(input?.passwordConfirm ?? "");

  if (!password || !passwordConfirm) return { error: "새 비밀번호를 모두 입력해 주세요." };
  if (password !== passwordConfirm) return { error: "비밀번호가 일치하지 않아요." };

  const supabase = createClient(await cookies());
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "재설정 링크가 만료되었어요. 비밀번호 찾기를 다시 진행해 주세요." };

  const { error } = await supabase.auth.updateUser({ password });
  if (error) return { error: toKoreanUpdatePasswordError(error.code) };

  // 재설정 링크로 다른 계정에 로그인했을 수 있으므로 데이터를 다시 불러온다.
  redirectAfterAccountChange("/");
}

/** 로그아웃한 뒤 로그인 페이지로 이동한다. */
export async function logout() {
  const supabase = createClient(await cookies());
  // 서버 쪽 세션 폐기가 실패해도 세션 쿠키는 지워지므로 그대로 로그인 페이지로 보낸다.
  await supabase.auth.signOut();
  redirectAfterAccountChange("/login");
}

/** 이메일·비밀번호로 회원가입한다. 성공하면 인덱스 페이지로 이동하고, 실패하면 오류 메시지를 반환한다. */
export async function signup(input: SignupInput): Promise<SignupResult> {
  const email = String(input?.email ?? "").trim();
  const password = String(input?.password ?? "");
  const passwordConfirm = String(input?.passwordConfirm ?? "");

  if (!email || !password || !passwordConfirm) {
    return { error: "이메일과 비밀번호를 모두 입력해 주세요." };
  }
  if (password !== passwordConfirm) {
    return { error: "비밀번호가 일치하지 않아요." };
  }

  const supabase = createClient(await cookies());
  const { error } = await supabase.auth.signUp({ email, password });
  if (error) return { error: toKoreanSignupError(error.code) };

  redirectAfterAccountChange("/");
}
