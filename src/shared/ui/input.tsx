import type { InputHTMLAttributes } from "react";

import { cn } from "@/shared/lib/cn";

export type InputProps = InputHTMLAttributes<HTMLInputElement>;

export function Input({ className, ...props }: InputProps) {
  return <input className={cn("uiInput", className)} {...props} />;
}
