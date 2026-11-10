type Props = {
  children: React.ReactNode;
  description?: string;
};

export default function PageTitle({ children, description }: Props) {
  return (
    <div className="mb-12 flex flex-col gap-3">
      <h1 className="text-[40px] leading-[1.1] font-semibold tracking-[-0.5px] text-balance text-[var(--text)]">
        {children}
      </h1>
      {description && <p className="text-[17px] text-[var(--text-sub)]">{description}</p>}
    </div>
  );
}
