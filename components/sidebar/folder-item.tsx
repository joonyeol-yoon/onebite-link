import type { Folder } from "@/lib/types";
import NavLink from "./nav-link";

type Props = {
  folder: Folder;
  count: number;
};

export default function FolderItem({ folder, count }: Props) {
  return (
    <li>
      <NavLink href={`/folder/${folder.id}`} count={count}>
        <span aria-hidden>📁</span>
        <span className="truncate">{folder.name}</span>
      </NavLink>
    </li>
  );
}
