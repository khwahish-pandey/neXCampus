import React from 'react'
import StudentDashboard from './compoenets/studentdashboard'
import DashboardWidgets from './compoenets/progressbar'
import InfoGrid from './compoenets/info'
import StudentCommunities from './compoenets/community'

function Dashboard() {
    const progressData = {
  attendance: 85,
  courseCompletion: 62,
  exams: 76
};
  return (
    <div>
       <StudentDashboard
        name="Alexa"
        usn="1MS20CS001"
        branch="Computer Science"
        year="3rd Year"
        section="A"
        imageUrl="/photos/ChatGPT Image Sep 27, 2025, 09_34_29 AM.png"/>
        <DashboardWidgets
          attendance={progressData.attendance}
          courseCompletion={progressData.courseCompletion}
          exams={progressData.exams}
        />
        <InfoGrid />
        <StudentCommunities />
    </div>
  )
}

export default Dashboard
