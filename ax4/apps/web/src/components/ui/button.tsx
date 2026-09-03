import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ink)] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-[var(--ink)] text-white hover:bg-black hover:-translate-y-0.5",
        lime: "bg-[var(--lime)] text-[var(--ink)] hover:bg-[#c7f832] hover:-translate-y-0.5",
        outline: "border border-[var(--line)] bg-white text-[var(--ink)] hover:border-[var(--ink)]",
        ghost: "text-[var(--ink)] hover:bg-black/5",
      },
      size: { default: "h-11 px-5", sm: "h-9 px-4 text-xs", lg: "h-14 px-7 text-base", icon: "size-10 p-0" },
    },
    defaultVariants: { variant: "default", size: "default" },
  },
);

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {}

export function Button({ className, variant, size, ...props }: ButtonProps) {
  return <button className={cn(buttonVariants({ variant, size, className }))} {...props} />;
}

export { buttonVariants };
