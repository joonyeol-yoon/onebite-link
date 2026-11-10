import Logo from "./logo";
import NewFolderButton from "./new-folder-button";
import NewLinkButton from "./new-link-button";

export default function Header() {
  return (
    <header className="sticky top-0 z-20 h-[72px] bg-[var(--nav-bg)] backdrop-blur-[30px]">
      <div className="mx-auto flex h-full max-w-[1640px] items-center justify-between px-5 md:px-[30px]">
        <Logo />
        <div className="flex items-center gap-1.5">
          <NewFolderButton />
          <NewLinkButton />
        </div>
      </div>
    </header>
  );
}
