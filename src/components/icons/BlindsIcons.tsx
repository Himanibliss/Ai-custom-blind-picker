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
    <line x1="3" y1="3" x2="21" y2="3" />
    {/* Rod end caps */}
    <rect x="2" y="2" width="2" height="2" rx="0.3" />
    <rect x="20" y="2" width="2" height="2" rx="0.3" />
    {/* Left drape - tied back curtain */}
    <path d="M4 4 C4 6, 3 8, 3 10 C3 12, 4 13, 5 14 L5 14 C5 12, 4 10, 4 8 C4 6, 5 5, 5 4" />
    <path d="M5 4 C6 6, 7 8, 7 10 C7 11, 6 12, 5 13" />
    <path d="M5 13 L5 14 C5 14, 4 14, 4 14.5 C4 15, 5 15, 5 15" />
    <path d="M4 15 C4 17, 3 19, 3 21" />
    <path d="M6 15 C6 17, 7 19, 8 21" />
    {/* Right drape - tied back curtain */}
    <path d="M20 4 C20 6, 21 8, 21 10 C21 12, 20 13, 19 14 L19 14 C19 12, 20 10, 20 8 C20 6, 19 5, 19 4" />
    <path d="M19 4 C18 6, 17 8, 17 10 C17 11, 18 12, 19 13" />
    <path d="M19 13 L19 14 C19 14, 20 14, 20 14.5 C20 15, 19 15, 19 15" />
    <path d="M20 15 C20 17, 21 19, 21 21" />
    <path d="M18 15 C18 17, 17 19, 16 21" />
    {/* Tie-backs */}
    <rect x="4" y="14" width="2" height="1.5" rx="0.3" />
    <rect x="18" y="14" width="2" height="1.5" rx="0.3" />
  </svg>
);
