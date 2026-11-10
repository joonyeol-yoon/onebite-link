import type { Folder } from "@/lib/types";
import { FolderIcon } from "@/components/icons";
import NavLink from "./nav-link";

type Props = {
  folder: Folder;
  count: number;
};

export default function FolderItem({ folder, count }: Props) {
  return (
    <li className="shrink-0 md:shrink">
      <NavLink href={`/folder/${folder.id}`} count={count} icon={<FolderIcon />}>
        {folder.name}
      </NavLink>
    </li>
  );
}
