type ArtsLogoProps = {
  size?: number;
};

/** Marca del mockup: triángulo blanco + arco dorado. */
export function ArtsLogo({ size = 24 }: ArtsLogoProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 34 34" aria-hidden="true">
      <path d="M17 3 L31 31 L23.4 31 L17 17.4 L10.6 31 L3 31 Z" fill="#FFFFFF" />
      <path
        d="M7.5 15.5 C13 11.2, 21 11.2, 26.5 15.5"
        stroke="#C9A24A"
        strokeWidth="2.6"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}
