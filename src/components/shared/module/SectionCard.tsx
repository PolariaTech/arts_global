type SectionCardProps = {
  title: string;
  action?: React.ReactNode;
  children: React.ReactNode;
  padded?: boolean;
};

export function SectionCard({ title, action, children, padded = false }: SectionCardProps) {
  return (
    <section className="overflow-hidden rounded-[5px] border border-[#E0E4EA] bg-white shadow-[0_1px_2px_rgba(15,30,51,.04)]">
      <div className="flex flex-wrap items-baseline justify-between gap-4 border-b border-[#F0F2F6] px-6 pt-5 pb-4">
        <h2 className="m-0 text-[11.5px] font-semibold tracking-[0.1em] text-[#8A93A1] uppercase">
          {title}
        </h2>
        {action}
      </div>
      {padded ? <div className="px-6 py-6">{children}</div> : children}
    </section>
  );
}
