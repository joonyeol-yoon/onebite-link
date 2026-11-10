"use server";

import { revalidatePath } from "next/cache";
import { folders } from "./mock-data";

export type CreateFolderState = {
  ok: boolean;
  name: string;
  error?: string;
};

const MAX_NAME_LENGTH = 20;

export async function createFolder(
  _prevState: CreateFolderState,
  formData: FormData,
): Promise<CreateFolderState> {
  const name = String(formData.get("name") ?? "").trim();

  if (!name) {
    return { ok: false, name, error: "폴더 이름을 입력해 주세요." };
  }
  if (name.length > MAX_NAME_LENGTH) {
    return { ok: false, name, error: `폴더 이름은 ${MAX_NAME_LENGTH}자 이내로 입력해 주세요.` };
  }
  if (folders.some((folder) => folder.name === name)) {
    return { ok: false, name, error: "같은 이름의 폴더가 이미 있어요." };
  }

  const id = folders.reduce((max, folder) => Math.max(max, folder.id), 0) + 1;
  folders.push({ id, name });

  revalidatePath("/", "layout");
  return { ok: true, name: "" };
}
