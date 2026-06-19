interface StatusChipProps {
  label: string;
  tone?:
    | "neutral"
    | "info"
    | "warn"
    | "danger"
    | "success"
    | "muted"
    | "accent";
  className?: string;
}

const toneStyles: Record<NonNullable<StatusChipProps["tone"]>, string> = {
  neutral: "bg-slate-100 text-slate-700 border border-slate-200",
  info: "bg-becs-navy/10 text-becs-navy border border-becs-navy/20",
  warn: "bg-amber-50 text-amber-800 border border-amber-200",
  danger: "bg-red-50 text-red-700 border border-red-200",
  success: "bg-becs-lime/20 text-becs-navy border border-becs-lime/40",
  muted: "bg-slate-50 text-slate-500 border border-slate-200",
  accent: "bg-becs-navy text-white border border-becs-navy",
};

export default function StatusChip({
  label,
  tone = "neutral",
  className,
}: StatusChipProps) {
  return (
    <span
      className={["becs-chip", toneStyles[tone], className ?? ""].join(" ")}
    >
      {label}
    </span>
  );
}

export function taskStatusTone(status: string): NonNullable<StatusChipProps["tone"]> {
  switch (status) {
    case "Complete":
      return "success";
    case "In Progress":
      return "info";
    case "Waiting":
      return "warn";
    default:
      return "neutral";
  }
}

export function priorityTone(p: string): NonNullable<StatusChipProps["tone"]> {
  switch (p) {
    case "High":
      return "danger";
    case "Medium":
      return "warn";
    default:
      return "muted";
  }
}

export function documentStatusTone(s: string): NonNullable<StatusChipProps["tone"]> {
  switch (s) {
    case "Reviewed":
      return "success";
    case "Uploaded":
      return "info";
    case "Requested":
      return "warn";
    case "Missing":
      return "danger";
    default:
      return "neutral";
  }
}

export function complianceStatusTone(s: string): NonNullable<StatusChipProps["tone"]> {
  switch (s) {
    case "Complete":
      return "success";
    case "Reviewed":
      return "success";
    case "Received":
      return "info";
    case "Requested":
      return "warn";
    default:
      return "neutral";
  }
}

export function riskTone(r: string): NonNullable<StatusChipProps["tone"]> {
  switch (r) {
    case "High":
      return "danger";
    case "Medium":
      return "warn";
    default:
      return "muted";
  }
}

export function deliverableStatusTone(s: string): NonNullable<StatusChipProps["tone"]> {
  switch (s) {
    case "Delivered":
    case "Approved":
      return "success";
    case "Review":
      return "info";
    case "Draft":
      return "warn";
    default:
      return "neutral";
  }
}

export function approvalStatusTone(s: string): NonNullable<StatusChipProps["tone"]> {
  switch (s) {
    case "Approved":
      return "success";
    case "Revision Requested":
      return "danger";
    default:
      return "warn";
  }
}
