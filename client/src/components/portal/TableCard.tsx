import type { ReactNode } from "react";

interface TableCardProps {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
}

export default function TableCard({
  title,
  subtitle,
  actions,
  children,
  footer,
}: TableCardProps) {
  return (
    <div className="becs-card overflow-hidden">
      <div className="flex items-start justify-between gap-3 px-5 py-4 border-b border-slate-100">
        <div>
          <h3 className="text-base font-semibold text-becs-navy">{title}</h3>
          {subtitle ? (
            <p className="mt-0.5 text-xs text-slate-500">{subtitle}</p>
          ) : null}
        </div>
        {actions}
      </div>
      <div className="overflow-x-auto">{children}</div>
      {footer ? (
        <div className="px-5 py-3 border-t border-slate-100 bg-slate-50 text-xs text-slate-500">
          {footer}
        </div>
      ) : null}
    </div>
  );
}

interface EmptyStateProps {
  message: string;
}

export function EmptyState({ message }: EmptyStateProps) {
  return (
    <div className="px-5 py-10 text-center text-sm text-slate-500">{message}</div>
  );
}
