import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-semibold ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm hover:shadow-md active:scale-[0.98]",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border-2 border-secondary bg-transparent text-primary hover:bg-secondary/10 hover:border-primary",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 shadow-sm",
        ghost: "hover:bg-secondary/20 hover:text-primary",
        link: "text-primary underline-offset-4 hover:underline",
        // SelectBlinds specific variants
        peach: "bg-secondary text-primary-foreground hover:bg-secondary/90 shadow-sm hover:shadow-md active:scale-[0.98]",
        peachOutline: "border-2 border-secondary bg-card text-primary hover:bg-secondary/10",
        hero: "bg-primary text-primary-foreground px-8 py-4 text-base hover:bg-primary/90 shadow-md hover:shadow-lg active:scale-[0.98] rounded-xl",
        heroLight: "bg-card text-primary border-2 border-secondary px-8 py-4 text-base hover:bg-secondary/10 shadow-sm hover:shadow-md rounded-xl",
        ai: "bg-gradient-to-r from-primary to-primary/80 text-primary-foreground shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] rounded-xl",
        close: "rounded-full p-2 hover:bg-secondary/20 text-primary",
        nav: "text-primary hover:text-secondary font-medium",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-12 rounded-xl px-8 text-base",
        xl: "h-14 rounded-xl px-10 text-lg",
        icon: "h-10 w-10",
        iconSm: "h-8 w-8",
        iconLg: "h-12 w-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
