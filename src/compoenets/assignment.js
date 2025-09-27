import React, { useState, useEffect, useRef } from 'react';
import './assignment.css'; // The new CSS file for this component

// --- Reusable Countdown Timer Component ---
const Countdown = ({ dueDate }) => {
    const calculateTimeLeft = () => {
        const difference = +new Date(dueDate) - +new Date();
        let timeLeft = {};

        if (difference > 0) {
            timeLeft = {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60)
            };
        }
        return timeLeft;
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer = setTimeout(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);
        return () => clearTimeout(timer);
    });

    const isUrgent = timeLeft.days < 1 && Object.keys(timeLeft).length > 0;
    const timerComponents = [];

    Object.keys(timeLeft).forEach(interval => {
        if (!timeLeft[interval] && interval !== 'days' && timerComponents.length === 0) return;
        timerComponents.push(
            <span key={interval}>{timeLeft[interval]}{interval.charAt(0)} </span>
        );
    });

    return (
        <div className={`countdown-timer ${isUrgent ? 'urgent' : ''}`}>
            {timerComponents.length ? timerComponents : <span>Time's up!</span>}
        </div>
    );
};


// --- Reusable Success Popup Component ---
const SubmissionPopup = ({ assignmentTitle, coins, onClose }) => {
    return (
        <div className="popup-overlay" onClick={onClose}>
            <div className="popup-content" onClick={(e) => e.stopPropagation()}>
                <button className="popup-close-btn" onClick={onClose}>&times;</button>
                <div className="popup-icon-container">
                    <svg className="popup-icon" xmlns="http://www.w.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                </div>
                <h2 className="popup-title">Assignment Submitted!</h2>
                <p className="popup-message">
                    You have successfully submitted <strong>"{assignmentTitle}"</strong>.
                </p>
                {coins > 0 && (
                    <div className="coin-reward">
                        You've earned <strong>{coins} coins</strong> for submitting on time!
                    </div>
                )}
            </div>
        </div>
    );
};


// --- Main Assignments Panel Component ---
const AssignmentsPanel = () => {
    const [assignments, setAssignments] = useState([
        { id: 1, title: 'Neural Network Implementation', subject: 'Machine Learning', dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), status: 'Pending', file: null, aiRecommendation: 'This assignment is related to core ML concepts. Refer to Module 4 for foundational knowledge.' },
        { id: 2, title: 'React Hooks API Project', subject: 'Web Development', dueDate: new Date(Date.now() + 10 * 60 * 60 * 1000), status: 'Pending', file: null, aiRecommendation: 'Focus on `useState` and `useEffect`. The official React docs are a great resource for this.' },
        { id: 3, title: 'Database Schema Design', subject: 'Data Science', dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), status: 'Submitted', file: { name: 'schema_final.pdf' }, aiRecommendation: 'Review normalization forms (1NF, 2NF, 3NF) to ensure your design is efficient.' }
    ]);

    const [isPopupVisible, setPopupVisible] = useState(false);
    const [submittedAssignment, setSubmittedAssignment] = useState(null);
    const fileInputRefs = useRef({});

    const handleFileChange = (event, id) => {
        const file = event.target.files[0];
        if (file) {
            setAssignments(prev =>
                prev.map(a => a.id === id ? { ...a, file: file } : a)
            );
        }
    };

    const handleUploadClick = (id) => {
        fileInputRefs.current[id].click();
    };

    const handleSubmit = (id) => {
        const assignment = assignments.find(a => a.id === id);
        if (assignment && assignment.file) {
            setAssignments(prev =>
                prev.map(a => a.id === id ? { ...a, status: 'Submitted' } : a)
            );
            setSubmittedAssignment({ title: assignment.title, coins: 20 });
            setPopupVisible(true);
        } else {
            alert('Please select a file to submit!');
        }
    };

    return (
        <div className="assignments-panel-wrapper">
            <h2 className="assignments-panel-title">Assignments & Tasks</h2>
            <div className="assignments-list">
                {assignments.map(assignment => (
                    <div key={assignment.id} className={`assignment-card ${assignment.status.toLowerCase()}`}>
                        <div className="card-header">
                            <div className="card-title-section">
                                <h3 className="assignment-title">{assignment.title}</h3>
                                <p className="assignment-subject">{assignment.subject}</p>
                            </div>
                            <div className="card-status-section">
                                <span className={`status-badge`}>{assignment.status}</span>
                                <Countdown dueDate={assignment.dueDate} />
                            </div>
                        </div>

                        <div className="card-body">
                            <div className="ai-recommendation">
                                <strong>AI Recommendation:</strong> {assignment.aiRecommendation}
                            </div>
                        </div>

                        <div className="card-footer">
                            <input
                                type="file"
                                style={{ display: 'none' }}
                                ref={el => (fileInputRefs.current[assignment.id] = el)}
                                onChange={(e) => handleFileChange(e, assignment.id)}
                                disabled={assignment.status === 'Submitted'}
                            />
                            {assignment.status === 'Pending' ? (
                                <>
                                    <button className="upload-btn" onClick={() => handleUploadClick(assignment.id)}>
                                        {assignment.file ? `Selected: ${assignment.file.name}` : 'Upload File'}
                                    </button>
                                    <button className="submit-btn" onClick={() => handleSubmit(assignment.id)} disabled={!assignment.file}>
                                        Submit
                                    </button>
                                </>
                            ) : (
                                <p className="submitted-file-info">
                                    Submitted: {assignment.file.name}
                                </p>
                            )}
                        </div>
                    </div>
                ))}
            </div>
            {isPopupVisible && <SubmissionPopup assignmentTitle={submittedAssignment.title} coins={submittedAssignment.coins} onClose={() => setPopupVisible(false)} />}
        </div>
    );
};

export default AssignmentsPanel;