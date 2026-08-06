import { cva, type VariantProps } from "class-variance-authority";
import React, { type ButtonHTMLAttributes } from "react";

import { cn } from "@/shared/lib/cn";

const buttonVariants = cva("uiButton", {
  variants: {
    variant: {
      primary: "uiButtonPrimary",
      secondary: "uiButtonSecondary",
      ghost: "uiButtonGhost",
    },
    size: {
      sm: "uiButtonSm",
      md: "uiButtonMd",
    },
  },
  defaultVariants: {
    variant: "secondary",
    size: "md",
  },
});

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export function Button({ className, variant, size, type = "button", ...props }: ButtonProps) {
  return (
    <button className={cn(buttonVariants({ variant, size }), className)} type={type} {...props} />
  );
}
