import { Navigate, Route, Routes } from "react-router-dom";
import PortalShell from "@/components/portal/PortalShell";
import PortalHomePage from "@/pages/portal/PortalHomePage";
import ClientsPage from "@/pages/portal/ClientsPage";
import ClientWorkspaceLayout from "@/components/portal/ClientWorkspaceLayout";
import ClientWorkspacePage from "@/pages/portal/ClientWorkspacePage";
import ClientRoadmapPage from "@/pages/portal/ClientRoadmapPage";
import ClientTasksPage from "@/pages/portal/ClientTasksPage";
import ClientDocumentsPage from "@/pages/portal/ClientDocumentsPage";
import ClientCompliancePage from "@/pages/portal/ClientCompliancePage";
import ClientDeliverablesPage from "@/pages/portal/ClientDeliverablesPage";
import ClientApprovalsPage from "@/pages/portal/ClientApprovalsPage";
import ClientMeetingsPage from "@/pages/portal/ClientMeetingsPage";
import ClientAdminPage from "@/pages/portal/ClientAdminPage";
import NotFoundPage from "@/pages/NotFoundPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/portal" replace />} />

      <Route path="/portal" element={<PortalShell />}>
        <Route index element={<PortalHomePage />} />
        <Route path="clients" element={<ClientsPage />} />

        <Route path="clients/:slug" element={<ClientWorkspaceLayout />}>
          <Route index element={<ClientWorkspacePage />} />
          <Route path="roadmap" element={<ClientRoadmapPage />} />
          <Route path="tasks" element={<ClientTasksPage />} />
          <Route path="documents" element={<ClientDocumentsPage />} />
          <Route path="compliance" element={<ClientCompliancePage />} />
          <Route path="deliverables" element={<ClientDeliverablesPage />} />
          <Route path="approvals" element={<ClientApprovalsPage />} />
          <Route path="meetings" element={<ClientMeetingsPage />} />
          <Route path="admin" element={<ClientAdminPage />} />
        </Route>
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
