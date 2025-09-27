import Navbar from "./compoenets/navbar";
import StudentDashboard from "./compoenets/studentdashboard";// Update the import name
import DashboardWidgets from "./compoenets/progressbar";
import InfoGrid from "./compoenets/info";
import StudentCommunities from "./compoenets/community";
import Login from './pages/login'
import Signup from './pages/signup'
import Chatbox from './compoenets/chatbox'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
function App() {
  const studentData = {
  name: 'Alex Doe',
  usn: '1DS23ET057',
  // ... other student data
  imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80'
};

// Data for the new progress section
const progressData = {
  attendance: 85,
  courseCompletion: 62,
  exams: 76
};
 return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <Chatbox />
              <StudentDashboard
                name="John Doe"
                usn="1MS20CS001"
                branch="Computer Science"
                year="3rd Year"
                section="A"
                imageUrl="https://randomuser.me/api/portraits"
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
      </Routes>
    </Router>
  );
}

export default App;