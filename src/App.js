import Navbar from "./compoenets/navbar";
import StudentDashboard from "./compoenets/studentdashboard";// Update the import name
import DashboardWidgets from "./compoenets/progressbar";
import InfoGrid from "./compoenets/info";
import StudentCommunities from "./compoenets/community";
import AboutSection from "./compoenets/update";
import TodoList from "./compoenets/todo";
import { Link } from 'react-router-dom';
import AssignmentsPanel from "./compoenets/assignment";

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
    // Example with a background image to really see the transparent effect
   <>
      
      <Navbar/>
     
         <AboutSection 
        studentName={studentOverview.name}
        semesterProgress={studentOverview.semesterProgress}
        pendingTasks={studentOverview.pendingTasks}
        updatedPortion={studentOverview.updatedPortion}
      />
      <AssignmentsPanel />
      <TodoList/>
     </> 
    
    
  );
}

export default App;