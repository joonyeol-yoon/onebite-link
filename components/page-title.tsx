type Props = {
  children: React.ReactNode;
};

export default function PageTitle({ children }: Props) {
  return <h1 className="mb-4 text-lg font-semibold text-zinc-900">{children}</h1>;
}
