type PageHeaderProps = {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
  below?: React.ReactNode;
  maxWidth?: string;
};

export function PageHeader({
  title,
  subtitle,
  actions,
  below,
  maxWidth = 'min(1344px, 94vw)',
}: PageHeaderProps) {
  return (
    <div className="shrink-0 border-b border-[#E4E8EE] bg-white px-6 py-6">
      <div className="mx-auto flex flex-col gap-4" style={{ maxWidth }}>
        <div className="flex flex-wrap items-end justify-between gap-5">
          <div>
            <h1 className="m-0 mb-[5px] text-[22px] font-semibold tracking-tight text-[#0F1E33]">
              {title}
            </h1>
            {subtitle ? <p className="m-0 text-[13.5px] text-[#6B7483]">{subtitle}</p> : null}
          </div>
          {actions ? <div className="flex flex-wrap items-center gap-2.5">{actions}</div> : null}
        </div>
        {below}
      </div>
    </div>
  );
}
