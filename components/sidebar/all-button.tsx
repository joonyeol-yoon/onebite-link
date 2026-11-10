import { StackIcon } from "@/components/icons";
import NavLink from "./nav-link";

type Props = {
  count: number;
};

export default function AllButton({ count }: Props) {
  return (
    <NavLink href="/" count={count} icon={<StackIcon />}>
      All
    </NavLink>
  );
}
