import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from "./compoenets/navbar";
import AnnouncementList from "./compoenets/announcementlist";
import AnnouncementDetail from "./compoenets/announcementdata";
import './App.css';
import AutoScroller from "./compoenets/auto";
import Sidebar from "./compoenets/side";
import Dashboard from "./dashboard";
import About from "./about";
import Announcement from "./announcement";
import Others from "./others";
import Login from './pages/login';
import Signup from './pages/signup';
import Chatbox from './compoenets/chatbox';
import Canteen from './pages/canteen';
import AdminCanteen from './pages/adminCanteen';
import StudentDashboard from "./compoenets/studentdashboard";
import DashboardWidgets from "./compoenets/progressbar";
import InfoGrid from "./compoenets/info";
import StudentCommunities from "./compoenets/community";
import TeacherDashbaord from "./pages/teacherDashboard"
import {motion, AnimatePresence} from 'framer-motion'
const progressData = {
  attendance: 85,
  courseCompletion: 62,
  exams: 76
};

function AppContent() {
  const location = useLocation();
  const hideNavbarRoutes = ['/teacher/dashboard', '/login', '/signup', '/admin/canteen'];
  const hideNavbar = hideNavbarRoutes.includes(location.pathname);

  return (
     <AnimatePresence mode="wait">
     <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route
          path="/"
          element={
            <>
              <StudentDashboard
                name="John Doe"
                usn="1MS20CS001"
                branch="Computer Science"
                year="3rd Year"
                section="A"
                imageUrl="https://randomuser.me/api/portraits/men/1.jpg"
              />
              <DashboardWidgets
                attendance={progressData.attendance}
                courseCompletion={progressData.courseCompletion}
                exams={progressData.exams}
              />
              <InfoGrid />
              <StudentCommunities />
            </>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/announcements" element={<AnnouncementList />} />
        <Route path="/announcement/:id" element={<AnnouncementDetail />} />
        <Route path="/about" element={<About />} />
        <Route path="/others" element={<Others />} />
        <Route path="/chat" element={<Chatbox />} />
        <Route path="/canteen" element={<Canteen />} />
        <Route path="/admin/canteen" element={<AdminCanteen />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/teacher/dashboard" element={<TeacherDashbaord />} />
         
        {/* Add other routes as needed */}
      </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;