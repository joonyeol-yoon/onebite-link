type Props = {
  children: React.ReactNode;
  description?: string;
};

export default function PageTitle({ children, description }: Props) {
  return (
    <div className="mb-[60px] flex flex-col gap-4">
      <h1 className="text-[36px] leading-[1.1] font-semibold tracking-[-0.015em] text-balance text-[var(--title)] md:text-[48px]">
        {children}
      </h1>
      {description && (
        <p className="text-[16px] leading-[1.625] text-[var(--text-sub)]">{description}</p>
      )}
    </div>
  );
}
