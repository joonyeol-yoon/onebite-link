"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { BlockedUrlError, fetchOpenGraph, parseHttpUrl, type OpenGraph } from "./og";
import { bookmarks, folders } from "./mock-data";
import { FOLDER_NAME_MAX_LENGTH, type FolderNameState } from "./folder-name";

/** 폴더 이름을 검증한다. 문제가 있으면 에러 메시지를, 없으면 null을 반환한다. */
function validateFolderName(name: string, excludeId?: number) {
  if (!name) return "폴더 이름을 입력해 주세요.";
  if (name.length > FOLDER_NAME_MAX_LENGTH) {
    return `폴더 이름은 ${FOLDER_NAME_MAX_LENGTH}자 이내로 입력해 주세요.`;
  }
  if (folders.some((folder) => folder.id !== excludeId && folder.name === name)) {
    return "같은 이름의 폴더가 이미 있어요.";
  }
  return null;
}

export async function createFolder(
  _prevState: FolderNameState,
  formData: FormData,
): Promise<FolderNameState> {
  const name = String(formData.get("name") ?? "").trim();
  const error = validateFolderName(name);
  if (error) return { ok: false, name, error };

  const id = folders.reduce((max, folder) => Math.max(max, folder.id), 0) + 1;
  folders.push({ id, name });

  revalidatePath("/", "layout");
  return { ok: true, name: "" };
}

export async function updateFolder(
  id: number,
  _prevState: FolderNameState,
  formData: FormData,
): Promise<FolderNameState> {
  const name = String(formData.get("name") ?? "").trim();
  const folder = folders.find((f) => f.id === id);
  if (!folder) return { ok: false, name, error: "폴더를 찾을 수 없어요." };

  const error = validateFolderName(name, id);
  if (error) return { ok: false, name, error };

  folder.name = name;

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
  if (!folders.some((folder) => folder.id === folderId)) {
    return { ...state, error: "폴더를 선택해 주세요." };
  }

  let og: OpenGraph;
  try {
    og = await fetchOpenGraph(url.href);
  } catch (error) {
    if (error instanceof BlockedUrlError) return { ...state, error: error.message };
    og = { url: url.href, title: url.hostname.replace(/^www\./, ""), description: "", image: null };
  }

  const id = bookmarks.reduce((max, bookmark) => Math.max(max, bookmark.id), 0) + 1;
  bookmarks.unshift({
    id,
    folderId,
    url: og.url,
    title: og.title,
    description: og.description,
    image: og.image,
  });

  revalidatePath("/", "layout");
  redirect(`/folder/${folderId}`);
}

/** 폴더와 그 폴더에 담긴 링크를 함께 삭제한다. */
export async function deleteFolder(id: number) {
  const index = folders.findIndex((folder) => folder.id === id);
  if (index === -1) return;
  folders.splice(index, 1);

  for (let i = bookmarks.length - 1; i >= 0; i--) {
    if (bookmarks[i].folderId === id) bookmarks.splice(i, 1);
  }

  revalidatePath("/", "layout");
}
