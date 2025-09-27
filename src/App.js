import Navbar from "./compoenets/navbar";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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

const progressData = {
  attendance: 85,
  courseCompletion: 62,
  exams: 76
};

function App() {
  const studentData = {
  name: 'Alex Doe',
  usn: '1DS23ET057',
  // ... other student data
  imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80'
};

// Data for the new progress section

const studentOverview = {
  name: 'Alex',
  semesterProgress: 68,
  pendingTasks: 5,
  updatedPortion: 3 // e.g., 3 new documents or modules
};
  return (
    <Router>
      <Navbar />
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
        <Route path="/admin-canteen" element={<AdminCanteen />} />
        {/* Add other routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;