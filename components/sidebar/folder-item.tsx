import type { Folder } from "@/lib/types";
import { FolderIcon } from "@/components/icons";
import NavLink from "./nav-link";
import EditFolderButton from "./edit-folder-button";
import DeleteFolderButton from "./delete-folder-button";

type Props = {
  folder: Folder;
  count: number;
};

export default function FolderItem({ folder, count }: Props) {
  return (
    // 링크 안에 버튼을 중첩할 수 없으므로 수정·삭제 버튼은 형제로 두고 우측에 겹쳐 배치한다.
    // 마우스를 올리면(또는 키보드 포커스가 들어오면) 개수 대신 버튼이 보인다.
    <li className="group/folder relative shrink-0 md:shrink">
      <NavLink
        href={`/folder/${folder.id}`}
        count={count}
        icon={<FolderIcon />}
        className="md:group-focus-within/folder:pr-17 md:group-hover/folder:pr-17"
        countClassName="md:group-focus-within/folder:hidden md:group-hover/folder:hidden"
      >
        {folder.name}
      </NavLink>
      {/* 숨김 처리는 각 버튼에 둔다. 래퍼에 opacity/hidden을 주면 안에 든 모달까지 영향을 받는다. */}
      <div className="absolute top-1/2 right-1.5 flex -translate-y-1/2 items-center gap-0.5">
        <EditFolderButton folder={folder} />
        <DeleteFolderButton folder={folder} count={count} />
      </div>
    </li>
  );
}
