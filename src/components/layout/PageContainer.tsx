import * as React from 'react';
import { cn } from '@/lib/cn';

export function PageContainer({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <main className={cn('mx-auto max-w-6xl px-4 py-6', className)}>{children}</main>
  );
}
