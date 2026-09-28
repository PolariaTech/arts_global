import Link from 'next/link';

type GoldLinkProps = {
  href: string;
  children: React.ReactNode;
};

export function GoldLink({ href, children }: GoldLinkProps) {
  return (
    <Link
      href={href}
      className="border-b border-[#C9A24A] text-[13px] font-medium text-[#0F1E33] no-underline hover:border-[#8A6E22] hover:text-[#8A6E22]"
    >
      {children}
    </Link>
  );
}
