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
      className={`nav-item flex shrink-0 items-center gap-2.5 rounded-[10px] px-3 py-2 text-[14px] md:w-full ${
        active
          ? "bg-[var(--hover-bg)] font-semibold text-[var(--text)]"
          : "text-[var(--text-sub)]"
      } ${className}`}
    >
      <span className={active ? "text-[var(--text)]" : "text-[var(--text-sub)]"}>{icon}</span>
      <span className="truncate md:flex-1">{children}</span>
      <span
        className={`min-w-6 rounded-full px-2 py-0.5 text-center text-[13px] leading-none tabular-nums ${
          active ? "bg-[var(--bg)] text-[var(--text)]" : "bg-[var(--badge-bg)] text-[var(--text-sub)]"
        } ${countClassName}`}
      >
        {count}
      </span>
    </Link>
  );
}
