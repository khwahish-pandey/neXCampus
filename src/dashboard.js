import React, { useEffect, useState } from 'react'
import { jwtDecode } from 'jwt-decode'
import StudentDashboard from './compoenets/studentdashboard'
import DashboardWidgets from './compoenets/progressbar'
import InfoGrid from './compoenets/info'
import StudentCommunities from './compoenets/community'
import ChatBox from './compoenets/chatbox'
function Dashboard() {

  const [student, setStudent] = useState({
    name: '',
    usn: '',
    branch: '',
    year: '',
    section: '',
  })

  const progressData = {
    attendance: 85,
    courseCompletion: 62,
    exams: 76,
  }

 useEffect(() => {
  const token = localStorage.getItem('token');
  if (token) {
    try {
      const decoded = jwtDecode(token);
      console.log("Decoded:", decoded);
      
      if (decoded.userId) {
        console.log(decoded.userId)
        fetch(`http://localhost:5000/api/auth/getDetails/${decoded.userId}`)
          .then((res) => res.json())
          .then((data) => {
            setStudent({
              name: data.name || 'Unknown',
              usn: data.usn || 'N/A',
              branch: data.branch || 'Computer Science',
              year: data.year || '3rd Year',
              section: data.section || 'A',
            });
          })
          .catch((err) => console.error("Error fetching user details:", err));
      }
    } catch (err) {
      console.error("Invalid token:", err);
    }
  }
}, []);

  return (
    <div>
      <StudentDashboard
        name={student.name}
        usn={student.usn}
        branch={student.branch}
        year={student.year}
        section={student.section}
        imageUrl="/photos/ChatGPT Image Sep 27, 2025, 09_34_29 AM.png"
      />
      <DashboardWidgets
        attendance={progressData.attendance}
        courseCompletion={progressData.courseCompletion}
        exams={progressData.exams}
      />
      <InfoGrid />
      <StudentCommunities />
      <ChatBox/>
    </div>
  )
}

export default Dashboard
