import { ToastContainer } from 'react-toastify';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './pages/Login';
import Protected from './components/Protected';
import Dashboard from './pages/Dashboard';
import Drives from './pages/Drives';
import Students from './pages/Students';
import VaxUpdate from './pages/VaxStatus';
import Report from './pages/Report';

function App() {





  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Protected component={<Dashboard />} />} />
          <Route path="/drives" element={<Protected component={<Drives />} />} />
          <Route path="/students" element={<Protected component={<Students />} />} />
          <Route path="/vaccination-update" element={<Protected component={<VaxUpdate />} />} />
          <Route path="/report" element={<Protected component={<Report />} />} />
        </Routes>
      </Router>
      <ToastContainer className="z-[9999999]" />
    </div>
  );
}

export default App;
