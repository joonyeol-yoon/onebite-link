import Logo from "./logo";
import NewLinkButton from "./new-link-button";

export default function Header() {
  return (
    <header className="flex h-16 shrink-0 items-center justify-between border-b border-line bg-surface px-4 md:px-6">
      <Logo />
      <NewLinkButton />
    </header>
  );
}
