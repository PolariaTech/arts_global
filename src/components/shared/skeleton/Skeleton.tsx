type SkeletonProps = {
  className?: string;
  style?: React.CSSProperties;
};

/** Bloque base con pulse — usar para barras, celdas y cards. */
export function Skeleton({ className = '', style }: SkeletonProps) {
  return (
    <span
      aria-hidden="true"
      className={`arts-skeleton inline-block rounded-[3px] bg-[#E4E8EE] ${className}`}
      style={style}
    />
  );
}

export function SkeletonCircle({
  size = 32,
  className = '',
}: {
  size?: number;
  className?: string;
}) {
  return (
    <Skeleton
      className={`rounded-full ${className}`}
      style={{ width: size, height: size }}
    />
  );
}
