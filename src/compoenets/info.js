import React from 'react';
import { Link } from 'react-router-dom';
import './info.css'; // The new CSS file for this component

// --- Custom SVG Icons (designed to match the image) ---

const LmsIcon = () => (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
    </svg>
);
const AssessmentIcon = () => (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C6.095 4.01 5.25 4.973 5.25 6.108V18.75c0 1.243.87 2.25 1.969 2.25H13.5A2.25 2.25 0 0015.75 18.75v-2.25m-5.8 0h5.8" />
    </svg>
);
const ExamScheduleIcon = () => (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" >
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0h18M9.75 12.75h.008v.008H9.75v-.008zM9.75 15.75h.008v.008H9.75v-.008zM12 12.75h.008v.008H12v-.008zM12 15.75h.008v.008H12v-.008zM14.25 12.75h.008v.008h-.008v-.008zM14.25 15.75h.008v.008h-.008v-.008z" />
    </svg>
);
const ResultsIcon = () => (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
    </svg>
);
const FeesIcon = () => (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h6m3-5.25l-3.5 3.5m0 0l3.5 3.5m-3.5-3.5h9.75m-9.75 0h9.75" />
    </svg>
);
const AnnouncementsIcon = () => (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.34 15.84c-.688 0-1.25-.562-1.25-1.25s.562-1.25 1.25-1.25h3.32c.688 0 1.25.562 1.25 1.25s-.562 1.25-1.25 1.25h-3.32zM9 19.5v-4.5m0 0h6m-6 0a2.25 2.25 0 01-2.25-2.25V7.5A2.25 2.25 0 019 5.25h6.75A2.25 2.25 0 0118 7.5v5.25a2.25 2.25 0 01-2.25 2.25m-9-4.5h10.5" />
    </svg>
);
const OthersIcon = () => (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
    </svg>
);

const InfoGrid = () => {
    // Array of items to be displayed in the grid
    const gridItems = [
        { label: 'LMS', icon: LmsIcon, path: '/lms', colorClass: 'color-red' },
        { label: 'Internal Assessment', icon: AssessmentIcon, path: '/assessment', colorClass: 'color-red' },
        { label: 'Exam Schedule', icon: ExamScheduleIcon, path: '/schedule', colorClass: 'color-blue' },
        { label: 'Results', icon: ResultsIcon, path: '/results', colorClass: 'color-red' },
        { label: 'Fees', icon: FeesIcon, path: '/fees', colorClass: 'color-green' },
        { label: 'Announcements', icon: AnnouncementsIcon, path: '/announcements', colorClass: 'color-blue' },
        { label: 'Others', icon: OthersIcon, path: '/others', colorClass: 'color-gray' },
    ];

    return (
        <div className="info-grid-container">
            <div className="info-icon-grid">
                {gridItems.map((item, index) => (
                    <Link to={item.path} key={index} className={`info-card ${item.colorClass}`}>
                        <div className="info-card-icon">
                            <item.icon />
                        </div>
                        <span className="info-card-label">{item.label}</span>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default InfoGrid;