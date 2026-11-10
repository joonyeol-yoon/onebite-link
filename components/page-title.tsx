type Props = {
  children: React.ReactNode;
  description?: string;
};

export default function PageTitle({ children, description }: Props) {
  return (
    <div className="mb-6 flex flex-col gap-1">
      <h1 className="text-2xl font-bold tracking-tight text-balance text-ink">{children}</h1>
      {description && <p className="text-sm text-ink-muted">{description}</p>}
    </div>
  );
}
