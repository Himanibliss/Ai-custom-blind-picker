import { LucideProps } from "lucide-react";

export const ShuttersIcon = ({ size = 24, className, ...props }: LucideProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    {/* Outer frame */}
    <rect x="3" y="3" width="18" height="18" rx="1" />
    {/* Center divider */}
    <line x1="12" y1="3" x2="12" y2="21" />
    {/* Left panel slats */}
    <line x1="5" y1="6" x2="10" y2="6" />
    <line x1="5" y1="9" x2="10" y2="9" />
    <line x1="5" y1="12" x2="10" y2="12" />
    <line x1="5" y1="15" x2="10" y2="15" />
    <line x1="5" y1="18" x2="10" y2="18" />
    {/* Right panel slats */}
    <line x1="14" y1="6" x2="19" y2="6" />
    <line x1="14" y1="9" x2="19" y2="9" />
    <line x1="14" y1="12" x2="19" y2="12" />
    <line x1="14" y1="15" x2="19" y2="15" />
    <line x1="14" y1="18" x2="19" y2="18" />
  </svg>
);

export const DrapesIcon = ({ size = 24, className, ...props }: LucideProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    {/* Curtain rod */}
    <line x1="2" y1="4" x2="22" y2="4" />
    {/* Rod rings */}
    <circle cx="5" cy="4" r="1" />
    <circle cx="9" cy="4" r="1" />
    <circle cx="15" cy="4" r="1" />
    <circle cx="19" cy="4" r="1" />
    {/* Left drape */}
    <path d="M5 5 C5 8, 3 12, 4 16 C5 18, 6 20, 7 21 L8 21 C7 18, 9 14, 10 10 C10 8, 10 6, 9 5" />
    {/* Right drape */}
    <path d="M19 5 C19 8, 21 12, 20 16 C19 18, 18 20, 17 21 L16 21 C17 18, 15 14, 14 10 C14 8, 14 6, 15 5" />
  </svg>
);
