import React from 'react';
import { Link } from 'react-router-dom';
import './update.css'; // The new CSS file for this component

// --- Icon Components for visual clarity ---
const ProgressIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 1.5m1-1.5l1 1.5m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6" />
    </svg>
);
const TasksIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);
const UpdatesIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
    </svg>
);


const AboutSection = ({ studentName, semesterProgress, pendingTasks, updatedPortion }) => {
    return (
        <div className="about-section-wrapper">
            <div className="about-section-container">
                <h2 className="about-header">
                    Hey {studentName}, ready to continue your journey?
                </h2>
                <div className="overview-grid">
                    {/* Card 1: Semester Progress */}
                    <Link to="/progress" className="overview-card">
                        <div className="overview-card-icon icon-blue">
                            <ProgressIcon />
                        </div>
                        <div className="overview-card-content">
                            <h3>Semester Progress</h3>
                            <p className="overview-data">{semesterProgress}%</p>
                        </div>
                        <span className="overview-cta">View Details &rarr;</span>
                    </Link>

                    {/* Card 2: Pending Tasks */}
                    <Link to="/tasks" className="overview-card">
                        <div className="overview-card-icon icon-red">
                            <TasksIcon />
                        </div>
                        <div className="overview-card-content">
                            <h3>Pending Tasks</h3>
                            <p className="overview-data">{pendingTasks}</p>
                        </div>
                        <span className="overview-cta">View Tasks &rarr;</span>
                    </Link>

                    {/* Card 3: Updated Portion */}
                    <Link to="/materials" className="overview-card">
                        <div className="overview-card-icon icon-green">
                            <UpdatesIcon />
                        </div>
                        <div className="overview-card-content">
                            <h3>New Materials</h3>
                            <p className="overview-data">{updatedPortion}</p>
                        </div>
                        <span className="overview-cta">View Content &rarr;</span>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default AboutSection;