import type { Folder } from "@/lib/types";
import { FolderIcon } from "@/components/icons";
import NavLink from "./nav-link";
import DeleteFolderButton from "./delete-folder-button";

type Props = {
  folder: Folder;
  count: number;
};

export default function FolderItem({ folder, count }: Props) {
  return (
    // 링크 안에 버튼을 중첩할 수 없으므로 삭제 버튼은 형제로 두고 우측에 겹쳐 배치한다.
    <li className="group/folder relative shrink-0 md:shrink">
      <NavLink
        href={`/folder/${folder.id}`}
        count={count}
        icon={<FolderIcon />}
        countClassName="md:group-hover/folder:invisible md:group-focus-within/folder:invisible"
      >
        {folder.name}
      </NavLink>
      <DeleteFolderButton folder={folder} count={count} />
    </li>
  );
}
