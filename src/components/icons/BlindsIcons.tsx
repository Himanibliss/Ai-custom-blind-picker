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
    <line x1="2" y1="3" x2="22" y2="3" />
    {/* Left curtain - elegant drape */}
    <path d="M4 3 C4 8, 3 10, 4 14 Q5 16, 4 21" />
    <path d="M7 3 C7 6, 6 9, 7 12 Q8 14, 5 16" />
    {/* Right curtain - elegant drape */}
    <path d="M20 3 C20 8, 21 10, 20 14 Q19 16, 20 21" />
    <path d="M17 3 C17 6, 18 9, 17 12 Q16 14, 19 16" />
    {/* Tie-backs */}
    <ellipse cx="5.5" cy="14" rx="1.5" ry="0.8" />
    <ellipse cx="18.5" cy="14" rx="1.5" ry="0.8" />
  </svg>
);
