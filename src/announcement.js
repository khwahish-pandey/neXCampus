import React from 'react'
import { Routes, Route } from 'react-router-dom';
import AnnouncementList from "./compoenets/announcementlist"; 
import AnnouncementDetail from "./compoenets/announcementdata";
import AutoScroller from "./compoenets/auto";

function Announcement() {
  return (
    <div>
       {/* <Announcements/> */}
             {/* <Routes>
              <Route path="/announcement" element={<AnnouncementList />} />
              {/* This route is no longer used by the UI but remains here as requested */ }
              {/* <Route path="/announcements-list" element={<AnnouncementList />} />
              <Route path="/announcement/:id" element={<AnnouncementDetail />} />
            </Routes> */}
            <AnnouncementList/>
            <AutoScroller/>
    </div>
  )
}

export default Announcement
