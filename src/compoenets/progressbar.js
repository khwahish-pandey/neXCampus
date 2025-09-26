import React from 'react';
import { Link } from 'react-router-dom';
import './progressbar.css'; // We will create this new CSS file

// A reusable component for the circular progress bars
const CircularProgress = ({ percentage, label }) => {
  // Use a CSS custom property to dynamically set the gradient
  const style = { '--percentage': `${percentage}%` };

  return (
    <div className="progress-card">
      <div className="progress-circle" style={style}>
        <div className="progress-inner-circle">
          <span className="progress-percentage">{percentage}%</span>
        </div>
      </div>
      <p className="progress-label">{label}</p>
    </div>
  );
};

const DashboardWidgets = ({ attendance, courseCompletion, exams }) => {
  return (
    <div className="widgets-container">
      {/* --- Left Side: Semester Progress --- */}
      <div className="progress-section glass-panel">
        <h2 className="widget-title">Semester Progress</h2>
        <div className="progress-grid">
          <CircularProgress percentage={attendance} label="Attendance" />
          <CircularProgress percentage={courseCompletion} label="Course Content" />
          <CircularProgress percentage={exams} label="Exams" />
        </div>
      </div>

      {/* --- Right Side: Latest Notifications --- */}
      <div className="notifications-section glass-panel">
        <h2 className="widget-title">Latest Notifications</h2>
        <ul className="notifications-list">
          <li className="notification-item">
            <div className="notification-dot new"></div>
            <div className="notification-content">
              <p>Your mid-term exam schedule has been updated.</p>
              <span className="notification-time">2 hours ago</span>
            </div>
          </li>
          <li className="notification-item">
            <div className="notification-dot"></div>
            <div className="notification-content">
              <p>Assignment #3 for CS101 has been graded.</p>
              <span className="notification-time">1 day ago</span>
            </div>
          </li>
          <li className="notification-item">
            <div className="notification-dot"></div>
            <div className="notification-content">
              <p>Upcoming workshop: "Intro to Machine Learning".</p>
              <span className="notification-time">3 days ago</span>
            </div>
          </li>
        </ul>
        <Link to="/notifications" className="view-all-link">
          View All
        </Link>
      </div>
    </div>
  );
};

export default DashboardWidgets;