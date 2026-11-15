"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

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

  // redirect는 내부적으로 예외를 던지므로 try/catch 밖에서 호출한다.
  redirect("/");
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

  // redirect는 내부적으로 예외를 던지므로 try/catch 밖에서 호출한다.
  redirect("/");
}
