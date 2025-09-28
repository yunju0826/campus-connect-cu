import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import Splash from "./pages/Splash";
import CampusMap from "./pages/CampusMap";
import ReportIssue from "./pages/ReportIssue";
import ReportStatus from "./pages/ReportStatus";
import Notices from "./pages/Notices";
import Contact from "./pages/Contact";
import QuickLinks from "./pages/QuickLinks";
import StudentResources from "./pages/StudentResources";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="min-h-screen bg-background">
          <Routes>
            <Route path="/splash" element={<Splash />} />
            <Route path="/" element={
              <>
                {/* Redirect to splash on first visit */}
                <div style={{ display: 'none' }}>
                  {window.location.pathname === '/' && !sessionStorage.getItem('visited') && (
                    (() => {
                      sessionStorage.setItem('visited', 'true');
                      window.location.href = '/splash';
                      return null;
                    })()
                  )}
                </div>
                <Navigation />
                <CampusMap />
              </>
            } />
            <Route path="/report" element={
              <>
                <Navigation />
                <ReportIssue />
              </>
            } />
            <Route path="/reports" element={
              <>
                <Navigation />
                <ReportStatus />
              </>
            } />
            <Route path="/notices" element={
              <>
                <Navigation />
                <Notices />
              </>
            } />
            <Route path="/contact" element={
              <>
                <Navigation />
                <Contact />
              </>
            } />
            <Route path="/links" element={
              <>
                <Navigation />
                <QuickLinks />
              </>
            } />
            <Route path="/resources" element={
              <>
                <Navigation />
                <StudentResources />
              </>
            } />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
