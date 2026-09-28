type PageMainProps = {
  children: React.ReactNode;
  maxWidth?: string;
};

export function PageMain({ children, maxWidth = 'min(1344px, 94vw)' }: PageMainProps) {
  return (
    <main className="flex-1 bg-[#F7F8FA] px-6 pt-6 pb-24">
      <div className="mx-auto flex flex-col gap-[22px]" style={{ maxWidth }}>
        {children}
      </div>
    </main>
  );
}
