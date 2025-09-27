import Navbar from "./compoenets/navbar";
import { Routes, Route } from 'react-router-dom';
import AnnouncementList from "./compoenets/announcementlist"; 
import AnnouncementDetail from "./compoenets/announcementdata";
import './App.css';
import AutoScroller from "./compoenets/auto";

function App() {
  
  return (
    // Example with a background image to really see the transparent effect
   <>
      
      <Navbar/>
      {/* <Announcements/> */}
       <Routes>
        <Route path="/" element={<AnnouncementList />} />
        {/* This route is no longer used by the UI but remains here as requested */ }
        <Route path="/announcements-list" element={<AnnouncementList />} />
        <Route path="/announcement/:id" element={<AnnouncementDetail />} />
      </Routes>
      <AutoScroller/>
    
     </> 
     
    
    
  );
}

export default App;