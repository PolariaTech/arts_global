import { Skeleton } from './Skeleton';

export function SkeletonPageHeader({
  maxWidth = 'min(1344px, 94vw)',
  hasAction = true,
  hasSubtitle = true,
}: {
  maxWidth?: string;
  hasAction?: boolean;
  hasSubtitle?: boolean;
}) {
  return (
    <div className="shrink-0 border-b border-[#E4E8EE] bg-white px-6 py-6">
      <div
        className="mx-auto flex flex-wrap items-end justify-between gap-5"
        style={{ maxWidth }}
      >
        <div className="flex min-w-0 flex-col gap-2.5">
          <Skeleton className="h-[26px] w-[220px] max-w-full" />
          {hasSubtitle ? <Skeleton className="h-3.5 w-[280px] max-w-full" /> : null}
        </div>
        {hasAction ? <Skeleton className="h-10 w-[128px]" /> : null}
      </div>
    </div>
  );
}

export function SkeletonStatGrid({
  count = 3,
  minWidth = 180,
}: {
  count?: number;
  minWidth?: number;
}) {
  return (
    <div
      className="grid gap-3.5"
      style={{
        gridTemplateColumns: `repeat(auto-fit, minmax(${minWidth}px, 1fr))`,
      }}
    >
      {Array.from({ length: count }, (_, i) => (
        <div
          key={i}
          className="flex flex-col gap-2.5 rounded-[5px] border border-[#E0E4EA] border-t-[3px] border-t-[#E0E4EA] bg-white px-[22px] py-5 shadow-[0_1px_2px_rgba(15,30,51,.04)]"
        >
          <Skeleton className="h-8 w-16" />
          <Skeleton className="h-3.5 w-24" />
          <Skeleton className="h-3 w-28" />
        </div>
      ))}
    </div>
  );
}

export function SkeletonSectionCard({
  rows = 5,
  columns = 4,
}: {
  rows?: number;
  columns?: number;
}) {
  return (
    <section className="overflow-hidden rounded-[5px] border border-[#E0E4EA] bg-white shadow-[0_1px_2px_rgba(15,30,51,.04)]">
      <div className="flex items-baseline justify-between gap-4 border-b border-[#F0F2F6] px-6 pt-5 pb-4">
        <Skeleton className="h-3 w-36" />
        <Skeleton className="h-3 w-16" />
      </div>
      <div className="hidden border-b border-[#F0F2F6] bg-[#FAFBFC] px-6 py-2.5 md:grid md:gap-4"
        style={{
          gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
        }}
      >
        {Array.from({ length: columns }, (_, i) => (
          <Skeleton key={i} className="h-2.5 w-16" />
        ))}
      </div>
      {Array.from({ length: rows }, (_, ri) => (
        <div
          key={ri}
          className="grid grid-cols-1 gap-3 border-b border-[#F0F2F6] px-6 py-3.5 last:border-b-0 md:gap-4"
          style={{
            gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
          }}
        >
          {Array.from({ length: columns }, (_, ci) => (
            <Skeleton
              key={ci}
              className={`h-3.5 ${ci === 0 ? 'w-[85%]' : 'w-[60%]'}`}
            />
          ))}
        </div>
      ))}
    </section>
  );
}

export function SkeletonFilters({ count = 5 }: { count?: number }) {
  return (
    <div className="flex flex-wrap gap-3">
      <Skeleton className="h-10 min-w-[200px] flex-1" />
      {Array.from({ length: count - 1 }, (_, i) => (
        <Skeleton key={i} className="h-10 w-[120px]" />
      ))}
    </div>
  );
}

export function SkeletonMain({
  children,
  maxWidth = 'min(1344px, 94vw)',
}: {
  children: React.ReactNode;
  maxWidth?: string;
}) {
  return (
    <main className="flex-1 bg-[#F7F8FA] px-6 pt-6 pb-24">
      <div className="mx-auto flex flex-col gap-[22px]" style={{ maxWidth }}>
        {children}
      </div>
    </main>
  );
}
