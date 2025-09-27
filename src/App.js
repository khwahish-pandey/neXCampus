import Navbar from "./compoenets/navbar";
import { Routes, Route } from 'react-router-dom';
import AnnouncementList from "./compoenets/announcementlist"; 
import AnnouncementDetail from "./compoenets/announcementdata";
import './App.css';
import AutoScroller from "./compoenets/auto";
import Sidebar from "./compoenets/side";
import Dashboard from "./dashboard";
import About from "./about";
import Announcement from "./announcement";
import Others from "./others";

function App() {
  
  return (
    // Example with a background image to really see the transparent effect
   <>
      
      <Navbar/>
       <Routes>
        <Route path="/dashboard" element={<Dashboard/>} />
          <Route path="/about" element={<About/>} />
           <Route path="/announcement" element={<Announcement/>} />
          <Route path="/others" element={<Others/>} />
       </Routes>
     
      {/* <Sidebar/> */}
    
     </> 
     
    
    
  );
}

export default App;