export type Phase = "PLAN" | "EVOLVE" | "SUCCEED";

export type EngagementStatus =
  | "Prospect"
  | "Controlled Client Pilot"
  | "Active"
  | "Maintenance"
  | "Paused"
  | "Completed";

export interface Client {
  id: string;
  company_name: string;
  slug: string;
  industry: string;
  service_type: string;
  status: EngagementStatus;
  current_phase: Phase;
  primary_contact_name: string;
  primary_contact_email: string;
  phone: string;
  website: string;
  created_at: string;
  updated_at: string;
}

export type ContractStatus =
  | "Not Started"
  | "Drafting"
  | "Pending Signature"
  | "Signed"
  | "Renewal Due";

export type PaymentStatus =
  | "Not Invoiced"
  | "Deposit Required"
  | "Deposit Received"
  | "Invoiced"
  | "Paid"
  | "Past Due";

export type ProjectStatus =
  | "Pre-Kickoff / Pending Contract"
  | "Kickoff Scheduled"
  | "In Progress"
  | "On Hold"
  | "Complete";

export interface ClientProject {
  id: string;
  client_id: string;
  project_name: string;
  package_name: string;
  status: ProjectStatus;
  start_date: string | null;
  target_completion_date: string | null;
  contract_status: ContractStatus;
  payment_status: PaymentStatus;
  scope_summary: string;
  internal_notes: string;
}

export type OwnerType = "BECS" | "Client";
export type Priority = "High" | "Medium" | "Low";
export type TaskStatus = "Not Started" | "In Progress" | "Waiting" | "Complete";

export interface ClientTask {
  id: string;
  client_id: string;
  project_id: string;
  title: string;
  description?: string;
  owner_type: OwnerType;
  assigned_to: string;
  phase: Phase;
  priority: Priority;
  status: TaskStatus;
  due_date: string | null;
  internal_only: boolean;
}

export type DocumentCategory =
  | "Legal"
  | "HIPAA"
  | "Licensing"
  | "Insurance"
  | "Staffing"
  | "Operations"
  | "Marketing";

export type DocumentRequestedFrom = "Client" | "BECS";

export type DocumentStatus =
  | "Needed"
  | "Requested"
  | "Uploaded"
  | "Reviewed"
  | "Missing";

export interface ClientDocument {
  id: string;
  client_id: string;
  document_name: string;
  category: DocumentCategory;
  requested_from: DocumentRequestedFrom;
  status: DocumentStatus;
  file_url: string | null;
  notes: string;
  internal_only: boolean;
}

export type ComplianceCategory =
  | "Legal"
  | "HIPAA / Privacy"
  | "Licensing"
  | "Insurance"
  | "Staffing"
  | "Operations";

export type ComplianceStatus =
  | "Needed"
  | "Requested"
  | "Received"
  | "Reviewed"
  | "Complete";

export type ResponsibleParty =
  | "Client"
  | "BECS"
  | "Attorney"
  | "CPA"
  | "Compliance Partner";

export type RiskLevel = "High" | "Medium" | "Low";

export interface ComplianceItem {
  id: string;
  client_id: string;
  category: ComplianceCategory;
  item_name: string;
  status: ComplianceStatus;
  responsible_party: ResponsibleParty;
  risk_level: RiskLevel;
  notes: string;
  due_date: string | null;
}

export type DeliverableStatus =
  | "Not Started"
  | "Draft"
  | "Review"
  | "Approved"
  | "Delivered";

export interface Deliverable {
  id: string;
  client_id: string;
  project_id: string;
  deliverable_name: string;
  phase: Phase;
  status: DeliverableStatus;
  approval_required: boolean;
  approved_by: string | null;
  approved_at: string | null;
  file_url: string | null;
  internal_only: boolean;
}

export interface Meeting {
  id: string;
  client_id: string;
  title: string;
  meeting_date: string;
  summary: string;
  decisions: string[];
  next_steps: string[];
  internal_notes: string;
  client_visible: boolean;
}

export type ApprovalRelatedType =
  | "Deliverable"
  | "Milestone"
  | "Scope"
  | "Document";

export type ApprovalStatus = "Pending" | "Approved" | "Revision Requested";

export interface Approval {
  id: string;
  client_id: string;
  related_type: ApprovalRelatedType;
  related_id: string;
  related_label: string;
  approval_status: ApprovalStatus;
  client_comment: string;
  approved_by: string | null;
  approved_at: string | null;
}

export interface ClientWorkspace {
  client: Client;
  project: ClientProject;
  tasks: ClientTask[];
  documents: ClientDocument[];
  compliance: ComplianceItem[];
  deliverables: Deliverable[];
  meetings: Meeting[];
  approvals: Approval[];
}

export type Visibility = "client" | "admin";

export interface HasInternalOnly {
  internal_only?: boolean;
}

export function isVisibleTo<T extends HasInternalOnly>(
  item: T,
  view: Visibility,
): boolean {
  if (view === "admin") return true;
  return !item.internal_only;
}
