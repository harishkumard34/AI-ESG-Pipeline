import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Splash from './pages/Splash';
import Login from './pages/Login';
import Layout from './components/Layout';
import DashboardHome from './pages/DashboardHome';
import UploadPage from './pages/UploadPage';
import RecordsPage from './pages/RecordsPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Splash />} />
        <Route path="/login" element={<Login />} />
        
        <Route path="/dashboard" element={<Layout />}>
          <Route index element={<DashboardHome />} />
          <Route path="upload" element={<UploadPage />} />
          <Route path="records" element={<RecordsPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
