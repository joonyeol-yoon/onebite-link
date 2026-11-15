import type { Metadata } from "next";
import { Suspense } from "react";
import PageTitle from "@/components/page-title";
import LinkForm from "@/components/link-form/link-form";
import { getFolders } from "@/lib/data";

export const metadata: Metadata = {
  title: "새 링크 | 한입 링크",
};

/** 폴더 선택지를 folders 테이블에서 불러온다. (links.folder_id가 folders.id를 참조하므로) */
async function NewLinkForm() {
  const folders = await getFolders();
  return <LinkForm folders={folders} />;
}

export default function NewLinkPage() {
  return (
    <>
      <PageTitle description="저장할 주소와 넣어 둘 폴더를 골라 주세요.">새 링크</PageTitle>
      <Suspense fallback={null}>
        <NewLinkForm />
      </Suspense>
    </>
  );
}
