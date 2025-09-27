import React from 'react'
import AboutSection from './compoenets/about1';
import AssignmentsPanel from './compoenets/assignment';
import TodoList from './compoenets/todo';
import SkillsPanel from './compoenets/ai';

function About() {
    const studentData = {
  name: 'Alex Doe',
  usn: '1DS23ET057',
  // ... other student data
  imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80'
};

// Data for the new progress section

const studentOverview = {
  name: 'Alexa',
  semesterProgress: 68,
  pendingTasks: 5,
  updatedPortion: 3 // e.g., 3 new documents or modules
};
 const progressData = {
  attendance: 85,
  courseCompletion: 62,
  exams: 76
};
  return (
    <div>
      <AboutSection
        studentName={studentOverview.name}
        semesterProgress={studentOverview.semesterProgress}
      />
      <AssignmentsPanel/>
      <TodoList/>
      <SkillsPanel/>
    </div>
  )
}

export default About
