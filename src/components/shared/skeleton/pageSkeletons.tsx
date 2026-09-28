import { Skeleton, SkeletonCircle } from './Skeleton';
import {
  SkeletonFilters,
  SkeletonMain,
  SkeletonPageHeader,
  SkeletonSectionCard,
  SkeletonStatGrid,
} from './SkeletonBlocks';

export function DashboardSkeleton({
  stats = 3,
  countryCards = false,
}: {
  stats?: number;
  countryCards?: boolean;
}) {
  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <SkeletonPageHeader maxWidth={countryCards ? 'min(1568px, 94vw)' : undefined} />
      <SkeletonMain maxWidth={countryCards ? 'min(1568px, 94vw)' : undefined}>
        {countryCards ? (
          <div className="grid grid-cols-[repeat(auto-fit,minmax(232px,1fr))] gap-3.5">
            {Array.from({ length: 8 }, (_, i) => (
              <div
                key={i}
                className="flex flex-col gap-3.5 rounded-[5px] border border-[#E0E4EA] border-t-[3px] border-t-[#E0E4EA] bg-white px-5 pt-[18px] pb-5"
              >
                <div className="flex justify-between gap-2">
                  <Skeleton className="h-3.5 w-24" />
                  <Skeleton className="h-3 w-8" />
                </div>
                <Skeleton className="h-8 w-14" />
                <div className="border-t border-[#F0F2F6] pt-3">
                  <Skeleton className="mb-2 h-4 w-28" />
                  <Skeleton className="h-3 w-36" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <SkeletonStatGrid count={stats} />
        )}
        {countryCards ? (
          <section className="rounded-[5px] border border-[#E0E4EA] bg-white px-6 py-6">
            <div className="mb-5 flex justify-between">
              <Skeleton className="h-3 w-44" />
              <Skeleton className="h-4 w-28" />
            </div>
            <div className="flex h-[160px] items-end gap-2.5">
              {Array.from({ length: 9 }, (_, i) => (
                <div key={i} className="flex flex-1 flex-col items-center gap-2">
                  <Skeleton className="h-3 w-8" />
                  <Skeleton
                    className="w-full max-w-9 rounded-t-[2px]"
                    style={{ height: `${40 + ((i * 17) % 90)}px` }}
                  />
                </div>
              ))}
            </div>
          </section>
        ) : null}
        <SkeletonSectionCard rows={countryCards ? 5 : 5} columns={countryCards ? 5 : 4} />
        {!countryCards ? <SkeletonSectionCard rows={3} columns={3} /> : null}
      </SkeletonMain>
    </div>
  );
}

export function ListPageSkeleton({
  titleWidth = 200,
  filterCount = 5,
  columns = 6,
  rows = 8,
  maxWidth = 'min(1680px, 94vw)',
}: {
  titleWidth?: number;
  filterCount?: number;
  columns?: number;
  rows?: number;
  maxWidth?: string;
}) {
  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <SkeletonPageHeader maxWidth={maxWidth} />
      <SkeletonMain maxWidth={maxWidth}>
        <SkeletonFilters count={filterCount} />
        <SkeletonSectionCard rows={rows} columns={columns} />
      </SkeletonMain>
    </div>
  );
}

export function ReportsSkeleton() {
  return (
    <div className="flex h-[100vh] min-h-0 flex-col overflow-hidden bg-white">
      <div className="flex-none border-b border-[#E4E8EE] bg-white px-6 py-5">
        <div className="mx-auto grid max-w-[min(1300px,94vw)] grid-cols-[repeat(auto-fit,minmax(190px,1fr))] gap-3.5">
          {Array.from({ length: 4 }, (_, i) => (
            <div
              key={i}
              className="flex flex-col gap-2 rounded-[5px] border border-[#E0E4EA] border-t-[3px] border-t-[#E0E4EA] bg-white px-[17px] py-[15px]"
            >
              <Skeleton className="h-6 w-20" />
              <Skeleton className="h-3.5 w-28" />
              <Skeleton className="h-3 w-32" />
            </div>
          ))}
        </div>
      </div>
      <div className="min-h-0 flex-1 overflow-hidden bg-[#F7F8FA] px-6 pt-6">
        <div className="mx-auto flex max-w-[min(1300px,94vw)] flex-col gap-5">
          <div className="flex justify-end">
            <div className="flex items-start gap-3">
              <Skeleton className="h-[52px] w-[280px] rounded-[4px]" />
              <SkeletonCircle size={30} />
            </div>
          </div>
          <div className="flex items-start gap-3">
            <SkeletonCircle size={30} />
            <div className="flex min-w-0 flex-1 flex-col gap-3">
              <Skeleton className="h-3.5 w-[90%] max-w-[520px]" />
              <Skeleton className="h-3.5 w-[70%] max-w-[400px]" />
              <Skeleton className="h-[160px] w-full max-w-[640px] rounded-[5px]" />
            </div>
          </div>
        </div>
      </div>
      <div className="flex-none border-t border-[#E4E8EE] bg-white px-6 pt-4 pb-5">
        <div className="mx-auto flex max-w-[min(1300px,94vw)] flex-col gap-3">
          <div className="flex flex-wrap gap-2">
            <Skeleton className="h-[34px] w-20 rounded-full" />
            <Skeleton className="h-[34px] w-40 rounded-full" />
            <Skeleton className="h-[34px] w-36 rounded-full" />
          </div>
          <div className="flex gap-3">
            <Skeleton className="h-[50px] flex-1" />
            <Skeleton className="h-[50px] w-[116px]" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function PolicyDetailSkeleton() {
  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="shrink-0 border-b border-[#E4E8EE] bg-white px-6 py-5">
        <div className="mx-auto max-w-[min(1568px,94vw)]">
          <Skeleton className="mb-3 h-3 w-40" />
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="flex flex-col gap-2">
              <Skeleton className="h-7 w-[280px] max-w-full" />
              <Skeleton className="h-3.5 w-[200px]" />
            </div>
            <div className="flex gap-2">
              <Skeleton className="h-9 w-24" />
              <Skeleton className="h-9 w-24" />
              <Skeleton className="h-9 w-24" />
            </div>
          </div>
        </div>
      </div>
      <SkeletonMain maxWidth="min(1568px, 94vw)">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1.4fr)_minmax(280px,0.7fr)]">
          <div className="flex flex-col gap-4">
            {Array.from({ length: 3 }, (_, i) => (
              <section
                key={i}
                className="overflow-hidden rounded-[5px] border border-[#E0E4EA] bg-white"
              >
                <div className="border-b border-[#F0F2F6] px-6 py-4">
                  <Skeleton className="h-3 w-28" />
                </div>
                <div className="grid grid-cols-2 gap-4 px-6 py-5">
                  {Array.from({ length: 6 }, (_, j) => (
                    <div key={j} className="flex flex-col gap-2">
                      <Skeleton className="h-2.5 w-16" />
                      <Skeleton className="h-3.5 w-[80%]" />
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </div>
          <div className="flex flex-col gap-4">
            <section className="rounded-[5px] border border-[#E0E4EA] bg-white p-5">
              <Skeleton className="mb-4 h-3 w-24" />
              <Skeleton className="mb-2 h-8 w-32" />
              <Skeleton className="h-3 w-40" />
            </section>
            <section className="rounded-[5px] border border-[#E0E4EA] bg-white p-5">
              <Skeleton className="mb-4 h-3 w-28" />
              {Array.from({ length: 4 }, (_, i) => (
                <div key={i} className="mb-3 flex justify-between gap-3 last:mb-0">
                  <Skeleton className="h-3.5 w-[55%]" />
                  <Skeleton className="h-3.5 w-16" />
                </div>
              ))}
            </section>
          </div>
        </div>
      </SkeletonMain>
    </div>
  );
}

export function CountryConfigSkeleton() {
  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <SkeletonPageHeader maxWidth="min(1200px, 94vw)" />
      <SkeletonMain maxWidth="min(1200px, 94vw)">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {Array.from({ length: 3 }, (_, i) => (
            <div
              key={i}
              className="rounded-[5px] border border-[#E0E4EA] bg-white px-5 py-4"
            >
              <Skeleton className="mb-2 h-2.5 w-20" />
              <Skeleton className="h-9 w-full" />
            </div>
          ))}
        </div>
        <SkeletonSectionCard rows={8} columns={3} />
      </SkeletonMain>
    </div>
  );
}

export function QuoteWizardSkeleton() {
  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="shrink-0 border-b border-[#E4E8EE] bg-white px-6 py-4">
        <div className="mx-auto flex max-w-[min(1340px,94vw)] flex-wrap items-center justify-between gap-4">
          <Skeleton className="h-4 w-40" />
          <div className="flex flex-wrap gap-2">
            {Array.from({ length: 5 }, (_, i) => (
              <Skeleton key={i} className="h-8 w-[88px] rounded-full" />
            ))}
          </div>
        </div>
      </div>
      <main className="flex-1 bg-[#F7F8FA] px-6 pt-7 pb-[120px]">
        <div className="mx-auto flex max-w-[min(1340px,94vw)] flex-col gap-5">
          <section className="rounded-[5px] border border-[#E0E4EA] bg-white px-[26px] pt-[26px] pb-7">
            <Skeleton className="mb-2 h-4 w-32" />
            <Skeleton className="mb-6 h-3 w-64" />
            <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-x-5 gap-y-[18px]">
              {Array.from({ length: 8 }, (_, i) => (
                <div key={i} className="flex flex-col gap-2">
                  <Skeleton className="h-2.5 w-24" />
                  <Skeleton className="h-10 w-full" />
                </div>
              ))}
            </div>
          </section>
          <div className="flex justify-end gap-3">
            <Skeleton className="h-11 w-28" />
            <Skeleton className="h-11 w-36" />
          </div>
        </div>
      </main>
    </div>
  );
}

export function QuoteResultSkeleton() {
  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <SkeletonPageHeader />
      <SkeletonMain>
        <section className="rounded-[5px] border border-[#E0E4EA] bg-white px-6 py-[22px]">
          <Skeleton className="mb-[18px] h-3 w-40" />
          <div className="grid grid-cols-[repeat(auto-fit,minmax(190px,1fr))] gap-6">
            {Array.from({ length: 6 }, (_, i) => (
              <div key={i} className="flex flex-col gap-2">
                <Skeleton className="h-2.5 w-20" />
                <Skeleton className="h-4 w-[80%]" />
              </div>
            ))}
          </div>
        </section>
        <section className="rounded-[5px] border border-[#E0E4EA] bg-white px-6 py-6">
          <Skeleton className="mb-4 h-3 w-36" />
          <Skeleton className="mb-2 h-10 w-40" />
          <Skeleton className="h-3.5 w-56" />
        </section>
        <SkeletonSectionCard rows={4} columns={3} />
      </SkeletonMain>
    </div>
  );
}

export function LoginSkeleton() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <div className="flex items-center justify-between border-b border-[#E4E8EE] px-6 py-4">
        <Skeleton className="h-5 w-32" />
        <Skeleton className="h-8 w-20" />
      </div>
      <main className="flex flex-1 items-center justify-center px-6 py-16">
        <div className="w-full max-w-[428px] rounded-[5px] border border-[#DFE3E9] px-8 py-10 sm:px-11">
          <Skeleton className="mb-2 h-6 w-40" />
          <Skeleton className="mb-8 h-3.5 w-64 max-w-full" />
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Skeleton className="h-2.5 w-16" />
              <Skeleton className="h-11 w-full" />
            </div>
            <div className="flex flex-col gap-2">
              <Skeleton className="h-2.5 w-20" />
              <Skeleton className="h-11 w-full" />
            </div>
            <Skeleton className="mt-2 h-12 w-full" />
          </div>
        </div>
      </main>
    </div>
  );
}

export function ProfileSkeleton() {
  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <SkeletonPageHeader hasAction />
      <SkeletonMain>
        <section className="overflow-hidden rounded-[5px] border border-[#E0E4EA] bg-white">
          <div className="border-b border-[#F0F2F6] px-6 pt-5 pb-4">
            <Skeleton className="h-3 w-20" />
          </div>
          {Array.from({ length: 5 }, (_, i) => (
            <div
              key={i}
              className="grid grid-cols-1 gap-2 border-b border-[#F0F2F6] px-6 py-4 last:border-b-0 sm:grid-cols-[160px_1fr]"
            >
              <Skeleton className="h-3 w-16" />
              <Skeleton className="h-3.5 w-48 max-w-full" />
            </div>
          ))}
        </section>
      </SkeletonMain>
    </div>
  );
}

export function ShellAuthSkeleton() {
  return (
    <div className="flex min-h-screen bg-white">
      <aside className="hidden h-screen w-[230px] flex-none flex-col border-r-2 border-[#C9A24A] bg-[#0F1E33] sm:flex">
        <div className="border-b border-[#2A3B54] px-[18px] py-[18px]">
          <Skeleton className="h-6 w-28 bg-[#2A3B54]" />
        </div>
        <div className="flex items-center gap-2.5 border-b border-[#2A3B54] px-[18px] py-3.5">
          <SkeletonCircle size={32} className="bg-[#2A3B54]" />
          <div className="flex flex-col gap-1.5">
            <Skeleton className="h-3 w-20 bg-[#2A3B54]" />
            <Skeleton className="h-2.5 w-24 bg-[#2A3B54]" />
          </div>
        </div>
        <div className="flex flex-col gap-1 px-3 pt-4">
          {Array.from({ length: 5 }, (_, i) => (
            <Skeleton key={i} className="h-9 w-full bg-[#2A3B54]" />
          ))}
        </div>
      </aside>
      <div className="flex min-w-0 flex-1 flex-col">
        <DashboardSkeleton />
      </div>
    </div>
  );
}
