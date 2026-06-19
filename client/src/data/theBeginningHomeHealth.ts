import type {
  Approval,
  Client,
  ClientDocument,
  ClientProject,
  ClientTask,
  ClientWorkspace,
  ComplianceItem,
  Deliverable,
  Meeting,
} from "@/types/clientWorkspace";

const CLIENT_ID = "client_tbhh";
const PROJECT_ID = "proj_tbhh_buildout";

const today = "2026-06-19";

const client: Client = {
  id: CLIENT_ID,
  company_name: "The Beginning Home Health",
  slug: "the-beginning-home-health",
  industry: "Home Health / Healthcare Services",
  service_type: "Healthcare Operations Buildout",
  status: "Controlled Client Pilot",
  current_phase: "PLAN",
  primary_contact_name: "Primary Contact (Pending Confirmation)",
  primary_contact_email: "contact@thebeginninghomehealth.example",
  phone: "(Pending)",
  website: "https://thebeginninghomehealth.example",
  created_at: today,
  updated_at: today,
};

const project: ClientProject = {
  id: PROJECT_ID,
  client_id: CLIENT_ID,
  project_name: "The Beginning Home Health Business Operations Buildout",
  package_name: "BECS Healthcare Operations Buildout",
  status: "Pre-Kickoff / Pending Contract",
  start_date: null,
  target_completion_date: null,
  contract_status: "Pending Signature",
  payment_status: "Deposit Required",
  scope_summary:
    "PLAN phase discovery, compliance readiness review, workflow mapping, document collection, and operations buildout preparation.",
  internal_notes:
    "Controlled client pilot. Use this engagement to validate the BECS Healthcare Operations Buildout package, refine compliance intake, and stress-test the BECS OS workspace. Do not collect PHI through BECS OS.",
};

const becsTaskTitles: Array<Pick<ClientTask, "title" | "priority" | "status">> = [
  { title: "Finalize service agreement", priority: "High", status: "In Progress" },
  { title: "Finalize scope of work", priority: "High", status: "In Progress" },
  { title: "Prepare invoice / payment link", priority: "High", status: "Not Started" },
  { title: "Build client workspace", priority: "High", status: "In Progress" },
  { title: "Load intake checklist", priority: "Medium", status: "Not Started" },
  { title: "Load compliance tracker", priority: "Medium", status: "Not Started" },
  { title: "Prepare kickoff agenda", priority: "Medium", status: "Not Started" },
  { title: "Prepare document request list", priority: "Medium", status: "Not Started" },
  { title: "Review digital presence", priority: "Low", status: "Not Started" },
  { title: "Draft workflow map", priority: "Medium", status: "Not Started" },
];

const clientTaskTitles: Array<Pick<ClientTask, "title" | "priority" | "status">> = [
  { title: "Review and sign agreement", priority: "High", status: "Waiting" },
  { title: "Submit initial business intake", priority: "High", status: "Not Started" },
  { title: "Upload business registration", priority: "High", status: "Not Started" },
  { title: "Upload EIN confirmation", priority: "High", status: "Not Started" },
  { title: "Upload insurance documents", priority: "High", status: "Not Started" },
  {
    title: "Upload licensing documents, if available",
    priority: "Medium",
    status: "Not Started",
  },
  { title: "Submit current tools/software list", priority: "Medium", status: "Not Started" },
  { title: "Submit current staffing structure", priority: "Medium", status: "Not Started" },
  { title: "Submit current service list", priority: "Medium", status: "Not Started" },
  { title: "Confirm kickoff meeting availability", priority: "High", status: "Not Started" },
];

const tasks: ClientTask[] = [
  ...becsTaskTitles.map<ClientTask>((t, idx) => ({
    id: `task_becs_${idx + 1}`,
    client_id: CLIENT_ID,
    project_id: PROJECT_ID,
    title: t.title,
    description: "",
    owner_type: "BECS",
    assigned_to: "BECS Team",
    phase: "PLAN",
    priority: t.priority,
    status: t.status,
    due_date: null,
    internal_only: false,
  })),
  ...clientTaskTitles.map<ClientTask>((t, idx) => ({
    id: `task_client_${idx + 1}`,
    client_id: CLIENT_ID,
    project_id: PROJECT_ID,
    title: t.title,
    description: "",
    owner_type: "Client",
    assigned_to: "The Beginning Home Health",
    phase: "PLAN",
    priority: t.priority,
    status: t.status,
    due_date: null,
    internal_only: false,
  })),
  {
    id: "task_becs_internal_1",
    client_id: CLIENT_ID,
    project_id: PROJECT_ID,
    title: "Confirm internal pricing + margin for pilot",
    description: "Pilot pricing review — internal only.",
    owner_type: "BECS",
    assigned_to: "BECS Leadership",
    phase: "PLAN",
    priority: "High",
    status: "Not Started",
    due_date: null,
    internal_only: true,
  },
  {
    id: "task_becs_internal_2",
    client_id: CLIENT_ID,
    project_id: PROJECT_ID,
    title: "Document pilot learnings for productized offer",
    description:
      "Capture friction, scope drift signals, and reusable assets for the productized Healthcare Operations Buildout.",
    owner_type: "BECS",
    assigned_to: "BECS Leadership",
    phase: "PLAN",
    priority: "Medium",
    status: "Not Started",
    due_date: null,
    internal_only: true,
  },
];

type SeedDoc = Omit<ClientDocument, "id" | "client_id" | "internal_only"> & {
  internal_only?: boolean;
};

const documentSeeds: SeedDoc[] = [
  // Legal
  {
    document_name: "Business registration",
    category: "Legal",
    requested_from: "Client",
    status: "Needed",
    file_url: null,
    notes: "State filing / formation documents.",
  },
  {
    document_name: "EIN confirmation",
    category: "Legal",
    requested_from: "Client",
    status: "Needed",
    file_url: null,
    notes: "IRS EIN confirmation letter (CP 575 or 147C).",
  },
  {
    document_name: "Operating agreement / ownership structure",
    category: "Legal",
    requested_from: "Client",
    status: "Needed",
    file_url: null,
    notes: "Identify all owners and ownership percentages.",
  },
  {
    document_name: "Service agreement template",
    category: "Legal",
    requested_from: "Client",
    status: "Needed",
    file_url: null,
    notes: "Existing client-facing service agreement, if any.",
  },
  {
    document_name: "Client consent forms",
    category: "Legal",
    requested_from: "Client",
    status: "Needed",
    file_url: null,
    notes: "Care consent, financial responsibility, etc.",
  },
  {
    document_name: "Vendor agreements",
    category: "Legal",
    requested_from: "Client",
    status: "Needed",
    file_url: null,
    notes: "EHR, scheduling, billing, background check vendors.",
  },
  {
    document_name: "Contractor / employee agreements",
    category: "Legal",
    requested_from: "Client",
    status: "Needed",
    file_url: null,
    notes: "Current W-2 and 1099 templates in use.",
  },

  // HIPAA / Privacy
  {
    document_name: "HIPAA privacy policy",
    category: "HIPAA",
    requested_from: "Client",
    status: "Needed",
    file_url: null,
    notes: "Reviewed annually; identify Privacy Officer.",
  },
  {
    document_name: "HIPAA security policy",
    category: "HIPAA",
    requested_from: "Client",
    status: "Needed",
    file_url: null,
    notes: "Administrative, physical, and technical safeguards.",
  },
  {
    document_name: "Business Associate Agreement process",
    category: "HIPAA",
    requested_from: "Client",
    status: "Needed",
    file_url: null,
    notes: "BAA tracker and template.",
  },
  {
    document_name: "PHI handling process",
    category: "HIPAA",
    requested_from: "Client",
    status: "Needed",
    file_url: null,
    notes: "How PHI is created, received, stored, transmitted, destroyed.",
  },
  {
    document_name: "Email / document sharing process",
    category: "HIPAA",
    requested_from: "Client",
    status: "Needed",
    file_url: null,
    notes: "Secure email + file transfer mechanism.",
  },
  {
    document_name: "Staff HIPAA training records",
    category: "HIPAA",
    requested_from: "Client",
    status: "Needed",
    file_url: null,
    notes: "Annual training logs.",
  },
  {
    document_name: "Incident reporting process",
    category: "HIPAA",
    requested_from: "Client",
    status: "Needed",
    file_url: null,
    notes: "Breach assessment + notification workflow.",
  },

  // Licensing
  {
    document_name: "State home health license status",
    category: "Licensing",
    requested_from: "Client",
    status: "Needed",
    file_url: null,
    notes: "License number, status, renewal date.",
  },
  {
    document_name: "Local business licensing",
    category: "Licensing",
    requested_from: "Client",
    status: "Needed",
    file_url: null,
    notes: "City / county business license.",
  },
  {
    document_name: "Medicaid / Medicare participation status",
    category: "Licensing",
    requested_from: "Client",
    status: "Needed",
    file_url: null,
    notes: "Applicable if billing federal payors.",
  },
  {
    document_name: "Accreditation status",
    category: "Licensing",
    requested_from: "Client",
    status: "Needed",
    file_url: null,
    notes: "ACHC, CHAP, Joint Commission, if applicable.",
  },
  {
    document_name: "Caregiver credential tracking",
    category: "Licensing",
    requested_from: "Client",
    status: "Needed",
    file_url: null,
    notes: "Current credentialing log per caregiver.",
  },

  // Insurance
  {
    document_name: "General liability",
    category: "Insurance",
    requested_from: "Client",
    status: "Needed",
    file_url: null,
    notes: "COI with limits.",
  },
  {
    document_name: "Professional liability",
    category: "Insurance",
    requested_from: "Client",
    status: "Needed",
    file_url: null,
    notes: "Per-occurrence + aggregate limits.",
  },
  {
    document_name: "Workers' compensation",
    category: "Insurance",
    requested_from: "Client",
    status: "Needed",
    file_url: null,
    notes: "Required if W-2 employees.",
  },
  {
    document_name: "Bonding",
    category: "Insurance",
    requested_from: "Client",
    status: "Needed",
    file_url: null,
    notes: "Often required for in-home care staff.",
  },
  {
    document_name: "Cyber / privacy coverage",
    category: "Insurance",
    requested_from: "Client",
    status: "Needed",
    file_url: null,
    notes: "Recommended given PHI exposure.",
  },

  // Staffing
  {
    document_name: "Hiring process",
    category: "Staffing",
    requested_from: "Client",
    status: "Needed",
    file_url: null,
    notes: "Sourcing, interview, offer, onboarding flow.",
  },
  {
    document_name: "Background check process",
    category: "Staffing",
    requested_from: "Client",
    status: "Needed",
    file_url: null,
    notes: "Vendor + checks performed.",
  },
  {
    document_name: "Credential verification",
    category: "Staffing",
    requested_from: "Client",
    status: "Needed",
    file_url: null,
    notes: "License, CPR, TB, etc. verification process.",
  },
  {
    document_name: "Staff onboarding",
    category: "Staffing",
    requested_from: "Client",
    status: "Needed",
    file_url: null,
    notes: "Onboarding checklist + first-shift readiness.",
  },
  {
    document_name: "Training records",
    category: "Staffing",
    requested_from: "Client",
    status: "Needed",
    file_url: null,
    notes: "Annual + role-specific training.",
  },
  {
    document_name: "Scheduling process",
    category: "Staffing",
    requested_from: "Client",
    status: "Needed",
    file_url: null,
    notes: "Tooling, on-call rotation, callout coverage.",
  },
  {
    document_name: "Payroll classification review",
    category: "Staffing",
    requested_from: "Client",
    status: "Needed",
    file_url: null,
    notes: "W-2 vs 1099 classification review with CPA.",
  },

  // BECS internal
  {
    document_name: "Internal pilot pricing memo",
    category: "Operations",
    requested_from: "BECS",
    status: "Needed",
    file_url: null,
    notes: "Internal: pricing assumptions, margins, pilot terms.",
    internal_only: true,
  },
];

const documents: ClientDocument[] = documentSeeds.map((d, idx) => ({
  id: `doc_${idx + 1}`,
  client_id: CLIENT_ID,
  internal_only: d.internal_only ?? false,
  document_name: d.document_name,
  category: d.category,
  requested_from: d.requested_from,
  status: d.status,
  file_url: d.file_url,
  notes: d.notes,
}));

type SeedCompliance = Omit<ComplianceItem, "id" | "client_id">;

const complianceSeeds: SeedCompliance[] = [
  {
    category: "Legal",
    item_name: "Entity formation + good standing",
    status: "Needed",
    responsible_party: "Client",
    risk_level: "High",
    notes: "Verify with Secretary of State.",
    due_date: null,
  },
  {
    category: "Legal",
    item_name: "Client service agreement reviewed by attorney",
    status: "Needed",
    responsible_party: "Attorney",
    risk_level: "High",
    notes: "Independent legal review required.",
    due_date: null,
  },
  {
    category: "HIPAA / Privacy",
    item_name: "HIPAA privacy + security policies in place",
    status: "Needed",
    responsible_party: "Compliance Partner",
    risk_level: "High",
    notes: "Required before handling PHI.",
    due_date: null,
  },
  {
    category: "HIPAA / Privacy",
    item_name: "Workforce HIPAA training completed",
    status: "Needed",
    responsible_party: "Client",
    risk_level: "High",
    notes: "Annual cadence; log per employee.",
    due_date: null,
  },
  {
    category: "HIPAA / Privacy",
    item_name: "Business Associate Agreements with all vendors",
    status: "Needed",
    responsible_party: "Compliance Partner",
    risk_level: "High",
    notes: "Track BAA execution for every vendor touching PHI.",
    due_date: null,
  },
  {
    category: "Licensing",
    item_name: "State home health license current",
    status: "Needed",
    responsible_party: "Client",
    risk_level: "High",
    notes: "Confirm renewal cadence.",
    due_date: null,
  },
  {
    category: "Licensing",
    item_name: "Local business licensing current",
    status: "Needed",
    responsible_party: "Client",
    risk_level: "Medium",
    notes: "City / county licensing.",
    due_date: null,
  },
  {
    category: "Insurance",
    item_name: "General + professional liability active",
    status: "Needed",
    responsible_party: "Client",
    risk_level: "High",
    notes: "Provide certificates of insurance.",
    due_date: null,
  },
  {
    category: "Insurance",
    item_name: "Workers' compensation active (if W-2 staff)",
    status: "Needed",
    responsible_party: "Client",
    risk_level: "High",
    notes: "Required by most states.",
    due_date: null,
  },
  {
    category: "Staffing",
    item_name: "Background checks on file for all caregivers",
    status: "Needed",
    responsible_party: "Client",
    risk_level: "High",
    notes: "State + federal as required.",
    due_date: null,
  },
  {
    category: "Staffing",
    item_name: "Caregiver credentials verified + tracked",
    status: "Needed",
    responsible_party: "Client",
    risk_level: "High",
    notes: "Re-verify on renewal cadence.",
    due_date: null,
  },
  {
    category: "Staffing",
    item_name: "Payroll classification reviewed (W-2 vs 1099)",
    status: "Needed",
    responsible_party: "CPA",
    risk_level: "Medium",
    notes: "CPA must opine on classification risk.",
    due_date: null,
  },
  {
    category: "Operations",
    item_name: "Incident reporting workflow documented",
    status: "Needed",
    responsible_party: "BECS",
    risk_level: "Medium",
    notes: "BECS will draft, client to ratify.",
    due_date: null,
  },
  {
    category: "Operations",
    item_name: "Secure document sharing workflow",
    status: "Needed",
    responsible_party: "BECS",
    risk_level: "Medium",
    notes: "Define which tools may receive PHI vs operational data.",
    due_date: null,
  },
];

const compliance: ComplianceItem[] = complianceSeeds.map((c, idx) => ({
  id: `cmp_${idx + 1}`,
  client_id: CLIENT_ID,
  ...c,
}));

type SeedDeliverable = {
  deliverable_name: string;
  phase: "PLAN" | "EVOLVE" | "SUCCEED";
  approval_required: boolean;
  status?: "Not Started" | "Draft" | "Review" | "Approved" | "Delivered";
};

const deliverableSeeds: SeedDeliverable[] = [
  // PLAN
  { deliverable_name: "Digital Presence Review", phase: "PLAN", approval_required: true, status: "Not Started" },
  { deliverable_name: "Business Model Review", phase: "PLAN", approval_required: true, status: "Not Started" },
  { deliverable_name: "Compliance Readiness Checklist", phase: "PLAN", approval_required: true, status: "Draft" },
  { deliverable_name: "Operations Workflow Map", phase: "PLAN", approval_required: true, status: "Not Started" },
  { deliverable_name: "Staffing + Role Structure", phase: "PLAN", approval_required: true, status: "Not Started" },
  { deliverable_name: "Document Gap Review", phase: "PLAN", approval_required: false, status: "Not Started" },
  { deliverable_name: "PLAN Phase Action Roadmap", phase: "PLAN", approval_required: true, status: "Not Started" },

  // EVOLVE
  { deliverable_name: "SOP Library", phase: "EVOLVE", approval_required: true },
  { deliverable_name: "Client Intake Workflow", phase: "EVOLVE", approval_required: true },
  { deliverable_name: "Staff Onboarding Workflow", phase: "EVOLVE", approval_required: true },
  { deliverable_name: "Compliance Tracker", phase: "EVOLVE", approval_required: false },
  { deliverable_name: "Internal Task Dashboard", phase: "EVOLVE", approval_required: false },
  { deliverable_name: "Client Communication Workflow", phase: "EVOLVE", approval_required: true },

  // SUCCEED
  { deliverable_name: "Monthly KPI Dashboard", phase: "SUCCEED", approval_required: false },
  { deliverable_name: "Referral Partner Tracker", phase: "SUCCEED", approval_required: false },
  { deliverable_name: "Hiring Pipeline", phase: "SUCCEED", approval_required: false },
  { deliverable_name: "Quality Assurance Review Process", phase: "SUCCEED", approval_required: true },
  { deliverable_name: "Growth Roadmap", phase: "SUCCEED", approval_required: true },
];

const deliverables: Deliverable[] = deliverableSeeds.map((d, idx) => ({
  id: `del_${idx + 1}`,
  client_id: CLIENT_ID,
  project_id: PROJECT_ID,
  deliverable_name: d.deliverable_name,
  phase: d.phase,
  status: d.status ?? "Not Started",
  approval_required: d.approval_required,
  approved_by: null,
  approved_at: null,
  file_url: null,
  internal_only: false,
}));

const meetings: Meeting[] = [
  {
    id: "mtg_1",
    client_id: CLIENT_ID,
    title: "Discovery Call — Engagement Overview",
    meeting_date: "2026-06-12",
    summary:
      "Reviewed the BECS Healthcare Operations Buildout package and confirmed The Beginning Home Health as the controlled client pilot for the PLAN → EVOLVE → SUCCEED framework.",
    decisions: [
      "Proceed under controlled client pilot terms.",
      "Begin PLAN phase activities while contract is finalized.",
      "Use BECS OS as the single workspace for delivery.",
    ],
    next_steps: [
      "BECS to finalize service agreement + invoice.",
      "Client to confirm primary contact + signatory.",
      "Schedule kickoff meeting once deposit is received.",
    ],
    internal_notes:
      "Internal: pilot pricing is below standard package; document scope creep risks. Confirm payment terms before any deliverable is released.",
    client_visible: true,
  },
];

const approvals: Approval[] = [
  {
    id: "apr_1",
    client_id: CLIENT_ID,
    related_type: "Scope",
    related_id: PROJECT_ID,
    related_label: "Scope of Work — Healthcare Operations Buildout",
    approval_status: "Pending",
    client_comment: "",
    approved_by: null,
    approved_at: null,
  },
  {
    id: "apr_2",
    client_id: CLIENT_ID,
    related_type: "Document",
    related_id: "doc_1",
    related_label: "Service Agreement",
    approval_status: "Pending",
    client_comment: "",
    approved_by: null,
    approved_at: null,
  },
  {
    id: "apr_3",
    client_id: CLIENT_ID,
    related_type: "Deliverable",
    related_id: "del_3",
    related_label: "Compliance Readiness Checklist (PLAN)",
    approval_status: "Pending",
    client_comment: "",
    approved_by: null,
    approved_at: null,
  },
];

export const theBeginningHomeHealthWorkspace: ClientWorkspace = {
  client,
  project,
  tasks,
  documents,
  compliance,
  deliverables,
  meetings,
  approvals,
};

export const allClientWorkspaces: ClientWorkspace[] = [
  theBeginningHomeHealthWorkspace,
];

export function getWorkspaceBySlug(slug: string): ClientWorkspace | undefined {
  return allClientWorkspaces.find((w) => w.client.slug === slug);
}
