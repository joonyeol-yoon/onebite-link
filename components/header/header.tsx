import Logo from "./logo";
import NewFolderButton from "./new-folder-button";
import NewLinkButton from "./new-link-button";

export default function Header() {
  return (
    <header className="sticky top-0 z-20 flex h-12 items-center justify-between border-b border-[var(--divider)] bg-[var(--nav-bg)] px-6 backdrop-blur-[20px] backdrop-saturate-[180%]">
      <Logo />
      <div className="flex items-center gap-4">
        <NewFolderButton />
        <NewLinkButton />
      </div>
    </header>
  );
}
