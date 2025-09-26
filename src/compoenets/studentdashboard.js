import React from 'react';
import { Link } from 'react-router-dom';
import './studentdashboard.css'; // Import the corresponding CSS file

// SVG icons remain the same but are now styled via the CSS file
const CalendarIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
);

const ChartBarIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
);

const SpeakerphoneIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-2.236 9.168-5.514C18.332 18.286 15.772 21 12.082 21H7a4 4 0 01-1.564-.317z" />
    </svg>
);

const StudentDashboard = ({ name, usn, branch, year, section, imageUrl }) => {
    return (
        <div className="dashboard-container">
            <div className="dashboard-panel">
                <div className="layout-container">
                    
                    <div className="info-section">
                        <p className="welcome-text">Welcome back ,</p>
                        <h1 className="student-name">{name}</h1>
                        <div className="details-grid">
                            <div className="detail-item"><span>USN:</span> {usn}</div>
                            <div className="detail-item"><span>Branch:</span> {branch}</div>
                            <div className="detail-item"><span>Year:</span> {year}</div>
                            <div className="detail-item"><span>Section:</span> {section}</div>
                        </div>
                        <h2 className="quick-links-title">Quick Links</h2>
                        <div className="quick-links-grid">
                            <Link to="/timetable" className="quick-link">
                                <CalendarIcon />
                                <span>Timetable</span>
                            </Link>
                            <Link to="/grades" className="quick-link">
                                <ChartBarIcon />
                                <span>View Grades</span>
                            </Link>
                            <Link to="/events" className="quick-link">
                                <SpeakerphoneIcon />
                                <span>Upcoming Events</span>
                            </Link>
                        </div>
                    </div>
                    <div className="image-section">
                        <img
                            src={imageUrl}
                            alt="Student Profile"
                            className="student-image"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudentDashboard;