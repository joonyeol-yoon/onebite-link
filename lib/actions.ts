"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { BlockedUrlError, fetchOpenGraph, parseHttpUrl, type OpenGraph } from "./og";
import { bookmarks } from "./mock-data";
import { FOLDER_NAME_MAX_LENGTH, type FolderNameState } from "./folder-name";

/** 폴더 이름의 형식(빈 값, 길이)을 검증한다. 문제가 있으면 에러 메시지를, 없으면 null을 반환한다. */
function validateFolderNameFormat(name: string) {
  if (!name) return "폴더 이름을 입력해 주세요.";
  if (name.length > FOLDER_NAME_MAX_LENGTH) {
    return `폴더 이름은 ${FOLDER_NAME_MAX_LENGTH}자 이내로 입력해 주세요.`;
  }
  return null;
}

/** 새 폴더를 folders 테이블에 추가한다. */
export async function createFolder(
  _prevState: FolderNameState,
  formData: FormData,
): Promise<FolderNameState> {
  const name = String(formData.get("name") ?? "").trim();
  const formatError = validateFolderNameFormat(name);
  if (formatError) return { ok: false, name, error: formatError };

  const supabase = createClient(await cookies());

  const { data: existing, error: selectError } = await supabase
    .from("folders")
    .select("id")
    .eq("name", name)
    .limit(1);
  if (selectError) return { ok: false, name, error: "폴더를 추가하지 못했어요. 다시 시도해 주세요." };
  if (existing.length > 0) return { ok: false, name, error: "같은 이름의 폴더가 이미 있어요." };

  const { error: insertError } = await supabase.from("folders").insert({ name });
  if (insertError) return { ok: false, name, error: "폴더를 추가하지 못했어요. 다시 시도해 주세요." };

  revalidatePath("/", "layout");
  return { ok: true, name: "" };
}

/** folders 테이블에서 폴더 이름을 수정한다. */
export async function updateFolder(
  id: number,
  _prevState: FolderNameState,
  formData: FormData,
): Promise<FolderNameState> {
  const name = String(formData.get("name") ?? "").trim();
  const formatError = validateFolderNameFormat(name);
  if (formatError) return { ok: false, name, error: formatError };

  const supabase = createClient(await cookies());

  const { data: existing, error: selectError } = await supabase
    .from("folders")
    .select("id")
    .eq("name", name)
    .neq("id", id)
    .limit(1);
  if (selectError) return { ok: false, name, error: "폴더 이름을 수정하지 못했어요. 다시 시도해 주세요." };
  if (existing.length > 0) return { ok: false, name, error: "같은 이름의 폴더가 이미 있어요." };

  const { data: updated, error: updateError } = await supabase
    .from("folders")
    .update({ name })
    .eq("id", id)
    .select("id");
  if (updateError) return { ok: false, name, error: "폴더 이름을 수정하지 못했어요. 다시 시도해 주세요." };
  if (updated.length === 0) return { ok: false, name, error: "폴더를 찾을 수 없어요." };

  revalidatePath("/", "layout");
  return { ok: true, name };
}

export type CreateBookmarkState = {
  url: string;
  folderId: string;
  error?: string;
};

/**
 * 링크를 저장한다. 오픈 그래프 API와 같은 추출기(lib/og)로 제목·설명·썸네일·주소를 수집한다.
 * 페이지 정보를 가져오지 못해도(타임아웃, 차단 등) 주소만으로 저장한다. 내부망 주소는 거부한다.
 */
export async function createBookmark(
  _prevState: CreateBookmarkState,
  formData: FormData,
): Promise<CreateBookmarkState> {
  const rawUrl = String(formData.get("url") ?? "").trim();
  const folderIdRaw = String(formData.get("folderId") ?? "");
  const state = { url: rawUrl, folderId: folderIdRaw };

  const url = parseHttpUrl(rawUrl);
  if (!url) return { ...state, error: "http:// 또는 https:// 로 시작하는 주소를 입력해 주세요." };

  const folderId = Number(folderIdRaw);
  if (!Number.isInteger(folderId) || folderId <= 0) {
    return { ...state, error: "폴더를 선택해 주세요." };
  }

  const supabase = createClient(await cookies());
  const { data: folder, error: folderError } = await supabase
    .from("folders")
    .select("id")
    .eq("id", folderId)
    .maybeSingle();
  if (folderError) return { ...state, error: "링크를 저장하지 못했어요. 다시 시도해 주세요." };
  if (!folder) return { ...state, error: "폴더를 선택해 주세요." };

  let og: OpenGraph;
  try {
    og = await fetchOpenGraph(url.href);
  } catch (error) {
    if (error instanceof BlockedUrlError) return { ...state, error: error.message };
    og = { url: url.href, title: url.hostname.replace(/^www\./, ""), description: "", image: null };
  }

  const { error: insertError } = await supabase.from("links").insert({
    url: og.url,
    title: og.title,
    description: og.description || null,
    thumbnail_url: og.image,
    folder_id: folderId,
  });
  if (insertError) return { ...state, error: "링크를 저장하지 못했어요. 다시 시도해 주세요." };

  revalidatePath("/", "layout");
  redirect(`/folder/${folderId}`);
}

export type UpdateBookmarkState = {
  ok: boolean;
  folderId: string;
  title: string;
  description: string;
  error?: string;
};

const BOOKMARK_TITLE_MAX = 100;
const BOOKMARK_DESCRIPTION_MAX = 300;

/** 링크의 폴더·제목·설명을 수정한다. 주소와 썸네일은 바꾸지 않는다. */
export async function updateBookmark(
  id: number,
  _prevState: UpdateBookmarkState,
  formData: FormData,
): Promise<UpdateBookmarkState> {
  const folderIdRaw = String(formData.get("folderId") ?? "");
  const title = String(formData.get("title") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const state = { ok: false, folderId: folderIdRaw, title, description };

  const folderId = Number(folderIdRaw);
  if (!Number.isInteger(folderId) || folderId <= 0) {
    return { ...state, error: "폴더를 선택해 주세요." };
  }
  if (!title) return { ...state, error: "제목을 입력해 주세요." };
  if (title.length > BOOKMARK_TITLE_MAX) {
    return { ...state, error: `제목은 ${BOOKMARK_TITLE_MAX}자 이내로 입력해 주세요.` };
  }
  if (description.length > BOOKMARK_DESCRIPTION_MAX) {
    return { ...state, error: `설명은 ${BOOKMARK_DESCRIPTION_MAX}자 이내로 입력해 주세요.` };
  }

  const supabase = createClient(await cookies());
  const { data: folder, error: folderError } = await supabase
    .from("folders")
    .select("id")
    .eq("id", folderId)
    .maybeSingle();
  if (folderError) return { ...state, error: "링크를 수정하지 못했어요. 다시 시도해 주세요." };
  if (!folder) return { ...state, error: "폴더를 선택해 주세요." };

  const { data: updated, error: updateError } = await supabase
    .from("links")
    .update({ folder_id: folderId, title, description: description || null })
    .eq("id", id)
    .select("id");
  if (updateError) return { ...state, error: "링크를 수정하지 못했어요. 다시 시도해 주세요." };
  if (updated.length === 0) return { ...state, error: "링크를 찾을 수 없어요." };

  revalidatePath("/", "layout");
  return { ...state, ok: true };
}

/** links 테이블에서 링크를 삭제한다. */
export async function deleteBookmark(id: number) {
  const supabase = createClient(await cookies());
  const { error } = await supabase.from("links").delete().eq("id", id);
  if (error) throw new Error(`링크를 삭제하지 못했어요: ${error.message}`);

  revalidatePath("/", "layout");
}

/** folders 테이블에서 폴더를 삭제하고, 그 폴더에 담긴 링크도 함께 삭제한다. */
export async function deleteFolder(id: number) {
  const supabase = createClient(await cookies());
  const { data: deleted, error } = await supabase.from("folders").delete().eq("id", id).select("id");
  if (error) throw new Error(`폴더를 삭제하지 못했어요: ${error.message}`);
  if (deleted.length === 0) return;

  for (let i = bookmarks.length - 1; i >= 0; i--) {
    if (bookmarks[i].folderId === id) bookmarks.splice(i, 1);
  }

  revalidatePath("/", "layout");
}
