import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "@/app/layouts/Layout";
import { HomePage } from "@/app/pages/HomePage";
import { BlogIndexPage } from "@/app/pages/BlogIndexPage";
import { PrivacyPolicyPage } from "@/app/pages/PrivacyPolicyPage";
import { TermsPage } from "@/app/pages/TermsPage";
import { GtmGuidePage } from "@/app/pages/blog/GtmGuidePage";
import { Ga4SetupPage } from "@/app/pages/blog/Ga4SetupPage";
import { DxForSmallBusinessPage } from "@/app/pages/blog/DxForSmallBusinessPage";
import { NoCodeToolsPage } from "@/app/pages/blog/NoCodeToolsPage";
import { WebsiteImprovementPage } from "@/app/pages/blog/WebsiteImprovementPage";
import { MarketingFoundationPage } from "@/app/pages/blog/MarketingFoundationPage";
import { AiBusinessToolsPage } from "@/app/pages/blog/AiBusinessToolsPage";
import { SqlBasicsPage } from "@/app/pages/blog/SqlBasicsPage";
import { SlackTipsPage } from "@/app/pages/blog/SlackTipsPage";
import { ProjectManagementPage } from "@/app/pages/blog/ProjectManagementPage";
import { SpreadsheetTipsPage } from "@/app/pages/blog/SpreadsheetTipsPage";
import { AutomationStartPage } from "@/app/pages/blog/AutomationStartPage";
import { ScrollToTop } from "@/app/components/ScrollToTop";

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/blog" element={<BlogIndexPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/blog/gtm-guide" element={<GtmGuidePage />} />
          <Route path="/blog/ga4-setup" element={<Ga4SetupPage />} />
          <Route path="/blog/dx-for-small-business" element={<DxForSmallBusinessPage />} />
          <Route path="/blog/no-code-tools" element={<NoCodeToolsPage />} />
          <Route path="/blog/website-improvement" element={<WebsiteImprovementPage />} />
          <Route path="/blog/marketing-foundation" element={<MarketingFoundationPage />} />
          <Route path="/blog/ai-business-tools" element={<AiBusinessToolsPage />} />
          <Route path="/blog/sql-basics" element={<SqlBasicsPage />} />
          <Route path="/blog/slack-tips" element={<SlackTipsPage />} />
          <Route path="/blog/project-management" element={<ProjectManagementPage />} />
          <Route path="/blog/spreadsheet-tips" element={<SpreadsheetTipsPage />} />
          <Route path="/blog/automation-start" element={<AutomationStartPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
