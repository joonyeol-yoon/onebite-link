import NavLink from "./nav-link";

type Props = {
  count: number;
};

export default function AllButton({ count }: Props) {
  return (
    <NavLink href="/" count={count}>
      <span className="font-semibold">All</span>
    </NavLink>
  );
}
