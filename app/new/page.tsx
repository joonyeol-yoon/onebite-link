import type { Metadata } from "next";
import PageTitle from "@/components/page-title";
import LinkForm from "@/components/link-form/link-form";
import { folders } from "@/lib/mock-data";

export const metadata: Metadata = {
  title: "새 링크 | 한입 링크",
};

export default function NewLinkPage() {
  return (
    <>
      <PageTitle>새 링크</PageTitle>
      <LinkForm folders={folders} />
    </>
  );
}
