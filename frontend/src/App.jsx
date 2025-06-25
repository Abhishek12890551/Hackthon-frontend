import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard";
import NewScan from "./pages/NewScan";
import ScanProgress from "./pages/ScanProgress";
import Reports from "./pages/Reports";
import Patching from "./pages/Patching";
import AIAssistant from "./pages/AIAssistant";
import Settings from "./pages/Settings";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-purple-900/20">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/app" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="new-scan" element={<NewScan />} />
            <Route path="scan-progress/:scanId" element={<ScanProgress />} />
            <Route path="reports" element={<Reports />} />
            <Route path="patching" element={<Patching />} />
            <Route path="ai-assistant" element={<AIAssistant />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
