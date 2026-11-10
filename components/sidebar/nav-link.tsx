"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = {
  href: string;
  count: number;
  children: React.ReactNode;
};

export default function NavLink({ href, count, children }: Props) {
  const active = usePathname() === href;

  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={`flex w-full items-center justify-between gap-2 rounded-lg px-3 py-2 text-sm transition-colors ${
        active ? "bg-zinc-900 text-white" : "text-zinc-600 hover:bg-zinc-100"
      }`}
    >
      <span className="flex min-w-0 items-center gap-2">{children}</span>
      <span className={active ? "text-zinc-300" : "text-zinc-400"}>{count}</span>
    </Link>
  );
}
