import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from "@/components/ui/toaster";
import { MainLayout } from '@/components/layout/MainLayout';
import { HomePage } from '@/pages/HomePage';
import { DoctorPage } from '@/pages/DoctorPage';
import { ResourcesPage } from '@/pages/ResourcesPage';
import { AboutPage } from '@/pages/AboutPage';
import HealthRecordsPage from '@/pages/HealthRecordsPage.jsx';
import EmergencyPage from '@/pages/EmergencyPage';
// import EmergencyPage from '@/pages/EmergencyPage'; // Uncomment if you have this page

function App() {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/doctors" element={<DoctorPage />} />
          <Route path="/resources" element={<ResourcesPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/health-records" element={<HealthRecordsPage />} />
          <Route path="/emergency" element={<EmergencyPage />} />
          {/* <Route path="/emergency" element={<EmergencyPage />} /> */}
        </Routes>
        <Toaster />
      </MainLayout>
    </Router>
  );
}

export default App;