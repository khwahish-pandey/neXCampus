import React, { useState } from 'react';
import './community.css'; // This will point to our updated CSS

// --- Popup Modal Component (This remains the same) ---
const JoinPopup = ({ communityName, onClose }) => {
    // ... (same as before)
    return (
        <div className="popup-overlay" onClick={onClose}>
            <div className="popup-content" onClick={(e) => e.stopPropagation()}>
                <button className="popup-close-btn" onClick={onClose}>&times;</button>
                <div className="popup-icon-container">
                    <svg className="popup-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                </div>
                <h2 className="popup-title">Success!</h2>
                <p className="popup-message">
                    You have joined the <strong>"{communityName}"</strong> community.
                </p>
            </div>
        </div>
    );
};

// --- Main Student Communities Component ---
const StudentCommunities = () => {
    const [isPopupVisible, setPopupVisible] = useState(false);
    const [selectedCommunity, setSelectedCommunity] = useState('');
    const [joinedCommunities, setJoinedCommunities] = useState(new Set());

    const handleJoinClick = (communityName) => {
        setJoinedCommunities(prev => new Set(prev).add(communityName));
        setSelectedCommunity(communityName);
        setPopupVisible(true);
    };

    const handleClosePopup = () => {
        setPopupVisible(false);
        setSelectedCommunity('');
    };

    const communities = [
        { name: 'Web Development', description: 'Code, create, and collaborate on web projects.' },
        { name: 'Machine Learning', description: 'Explore AI, data models, and neural networks.' },
        { name: '3rd Year Students', description: 'Connect with peers in your academic year.' },
        { name: 'DSI Community', description: 'For students passionate about Data Science & AI.' },
        { name: 'Point Blank', description: 'The official community for campus gamers.' },
        { name: 'Hackathons', description: 'Team up for competitive coding events.' },
        { name: 'Exam Preps', description: 'Form study groups and share resources.' },
        { name: 'Creative Corner', description: 'A space for artists, writers, and designers.' },
        { name: 'Photography Club', description: 'Capture moments and learn new techniques.' },
        { name: 'Finance & Investing', description: 'Discuss markets, strategies, and economics.' },
    ];

    return (
        // 1. This new outer container acts as the "page"
        <div className="communities-page-container">
            <h2 className="communities-section-title">Join Student Communities</h2>
            
            {/* 2. This inner container will be the scrollable area */}
            <div className="communities-scroll-area">
                {communities.map((community, index) => {
                    const isJoined = joinedCommunities.has(community.name);
                    return (
                        <div key={index} className="community-card">
                            <div className="community-card-content">
                                <h3 className="community-name">{community.name}</h3>
                                <p className="community-description">{community.description}</p>
                            </div>
                            {isJoined ? (
                                <button className="join-button joined" disabled>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                    </svg>
                                </button>
                            ) : (
                                <button className="join-button" onClick={() => handleJoinClick(community.name)} title={`Join ${community.name}`}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                    </svg>
                                </button>
                            )}
                        </div>
                    );
                })}
            </div>

            {isPopupVisible && <JoinPopup communityName={selectedCommunity} onClose={handleClosePopup} />}
        </div>
    );
};

export default StudentCommunities;