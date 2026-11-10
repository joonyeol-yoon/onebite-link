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
      className={`nav-item flex shrink-0 items-center gap-2.5 rounded-lg px-3 py-2.5 text-[15px] md:w-full ${
        active
          ? "bg-[var(--card)] font-semibold text-[var(--accent)]"
          : "font-medium text-[var(--text)]"
      } ${className}`}
    >
      <span className={`nav-icon ${active ? "text-[var(--accent)]" : "text-[var(--text-sub)]"}`}>
        {icon}
      </span>
      <span className="truncate md:flex-1">{children}</span>
      <span
        className={`min-w-6 rounded-[20px] px-2 py-1 text-center text-[13px] leading-none font-semibold tabular-nums ${
          active
            ? "bg-[var(--accent)] text-[var(--on-accent)]"
            : "bg-[var(--badge-bg)] text-[var(--title)]"
        } ${countClassName}`}
      >
        {count}
      </span>
    </Link>
  );
}
