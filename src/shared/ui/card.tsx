import type { HTMLAttributes, PropsWithChildren } from "react";

import { cn } from "@/shared/lib/cn";

export function Card({ className, ...props }: HTMLAttributes<HTMLElement>) {
  return <article className={cn("uiCard", className)} {...props} />;
}

export function CardHeader({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("uiCardHeader", className)} {...props} />;
}

export function CardTitle({ className, ...props }: HTMLAttributes<HTMLHeadingElement>) {
  return <h2 className={cn("uiCardTitle", className)} {...props} />;
}

export function CardContent({ className, children, ...props }: PropsWithChildren<HTMLAttributes<HTMLDivElement>>) {
  return (
    <div className={cn("uiCardContent", className)} {...props}>
      {children}
    </div>
  );
}
