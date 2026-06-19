interface BecsMarkProps {
  className?: string;
}

export default function BecsMark({ className }: BecsMarkProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
      role="img"
    >
      <rect width="64" height="64" rx="14" fill="#26296A" />
      <path
        d="M16 14h22a10 10 0 0 1 6.6 17.5A11 11 0 0 1 38 50H16V14z"
        fill="#8DC63F"
      />
      <text
        x="32"
        y="44"
        textAnchor="middle"
        fontFamily="Inter, system-ui, sans-serif"
        fontSize="12"
        fontWeight={700}
        fill="#F4F7E9"
        letterSpacing="1"
      >
        BECS
      </text>
    </svg>
  );
}
