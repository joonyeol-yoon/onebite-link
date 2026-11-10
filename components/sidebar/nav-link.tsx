"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = {
  href: string;
  count: number;
  icon: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  countClassName?: string;
};

export default function NavLink({
  href,
  count,
  icon,
  children,
  className = "",
  countClassName = "",
}: Props) {
  const active = usePathname() === href;

  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={`group flex shrink-0 items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-colors md:w-full ${
        active
          ? "bg-accent-soft font-semibold text-accent"
          : "text-ink-soft hover:bg-canvas hover:text-ink"
      } ${className}`}
    >
      <span className={active ? "text-accent" : "text-ink-muted group-hover:text-ink-soft"}>
        {icon}
      </span>
      <span className="truncate md:flex-1">{children}</span>
      <span
        className={`min-w-6 rounded-full px-1.5 text-center text-xs tabular-nums ${
          active ? "bg-surface text-accent" : "text-ink-muted"
        } ${countClassName}`}
      >
        {count}
      </span>
    </Link>
  );
}
