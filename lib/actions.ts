"use server";

import { revalidatePath } from "next/cache";
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
