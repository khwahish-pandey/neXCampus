import React, { useState } from 'react';
import './ai.css'; // The updated CSS file

// --- FAKE DATABASE with real, clickable links (remains the same) ---
const skillsDatabase = [
    { id: 1, name: 'React.js', description: 'Build dynamic user interfaces.', youtube: [{ title: 'React Course - Beginner\'s Tutorial', url: 'https://www.youtube.com/watch?v=bMknfKXIFA8' }], books: [{ title: 'The Road to React', author: 'Robin Wieruch', url: 'https://www.amazon.com/Road-React-Your-Journey-Learn/dp/172004399X' }] },
    { id: 2, name: 'Node.js & Express', description: 'Create powerful backend servers.', youtube: [{ title: 'Node.js and Express.js - Full Course', url: 'https://www.youtube.com/watch?v=Oe421JkE95Y' }], books: [{ title: 'Node.js Design Patterns', author: 'Mario Casciaro', url: 'https://www.amazon.com/Node-js-Design-Patterns-server-side-applications/dp/1803248819' }] },
    { id: 3, name: 'Python for Data Science', description: 'Analyze data and build models.', youtube: [{ title: 'Python for Data Science - Course for Beginners', url: 'https://www.youtube.com/watch?v=eWRfhZUzrAc' }], books: [{ title: 'Python for Data Analysis', author: 'Wes McKinney', url: 'https://www.amazon.com/Python-Data-Analysis-Wrangling-IPython/dp/1491957662' }] },
    { id: 4, name: 'Docker & Containers', description: 'Package and deploy applications.', youtube: [{ title: 'Docker Tutorial for Beginners [FULL COURSE]', url: 'https://www.youtube.com/watch?v=3c-iBn73dDE' }], books: [{ title: 'Docker Deep Dive', author: 'Nigel Poulton', url: 'https://www.amazon.com/Docker-Deep-Dive-Nigel-Poulton/dp/1521822808' }] },
    { id: 5, name: 'AWS Fundamentals', description: 'Learn the basics of cloud computing.', youtube: [{ title: 'AWS Certified Cloud Practitioner - Full Course', url: 'https://www.youtube.com/watch?v=SOTamWNgDKc' }], books: [{ title: 'AWS: The Complete Guide From Beginner to Advanced', author: 'S. K. Richmond', url: 'https://www.amazon.com/AWS-Complete-Guide-Beginner-Advanced/dp/109590302X' }] },
    { id: 6, name: 'User Experience (UX)', description: 'Design intuitive and accessible products.', youtube: [{ title: 'What is UX Design? (A Full Guide)', url: 'https://www.youtube.com/watch?v=c9L12U0sFUc' }], books: [{ title: 'Don\'t Make Me Think, Revisited', author: 'Steve Krug', url: 'https://www.amazon.com/Dont-Make-Think-Revisited-Usability/dp/0321965515' }] }
];

// --- SVG Icon Components (remain the same) ---
const PlusIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>;
const CheckIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>;


const SkillsPanel = () => {
    const [selectedSkills, setSelectedSkills] = useState(new Set());
    const [activeRecommendations, setActiveRecommendations] = useState(null);

    const handleToggleSkill = (skill) => {
        const newSelectedSkills = new Set(selectedSkills);
        if (newSelectedSkills.has(skill.id)) {
            // REMOVING a skill
            newSelectedSkills.delete(skill.id);
            // If the removed skill's recommendations were active, hide them
            if (activeRecommendations && activeRecommendations.id === skill.id) {
                setActiveRecommendations(null);
            }
        } else {
            // ADDING a skill
            newSelectedSkills.add(skill.id);
            // **IMPROVEMENT**: Immediately show recommendations for the newly added skill
            setActiveRecommendations(skill);
        }
        setSelectedSkills(newSelectedSkills);
    };

    return (
        <div className="skills-panel-wrapper">
            <h2 className="skills-panel-title">Develop Your Engineering Skills</h2>
            <p className="skills-panel-subtitle">Add or remove skills to get AI-powered learning recommendations instantly.</p>
            
            <div className="skills-grid">
                {skillsDatabase.map(skill => {
                    const isSelected = selectedSkills.has(skill.id);
                    return (
                        // The card itself is no longer clickable
                        <div key={skill.id} className={`skill-card ${isSelected ? 'selected' : ''}`}>
                            <div className="skill-info">
                                <h3 className="skill-name">{skill.name}</h3>
                                <p className="skill-description">{skill.description}</p>
                            </div>
                            <button
                                className={`action-btn ${isSelected ? 'selected' : ''}`}
                                onClick={() => handleToggleSkill(skill)}
                                title={isSelected ? 'Remove Skill' : 'Add Skill'}
                            >
                                {isSelected ? <CheckIcon /> : <PlusIcon />}
                            </button>
                        </div>
                    );
                })}
            </div>

            {/* --- AI Recommendations Section --- */}
            {activeRecommendations && (
                <div className="recommendation-display">
                    <h3>Resources for <strong>{activeRecommendations.name}</strong></h3>
                    <div className="rec-list">
                        <h4>Recommended YouTube Videos</h4>
                        {activeRecommendations.youtube.map(video => (
                            <a key={video.url} href={video.url} target="_blank" rel="noopener noreferrer" className="rec-card">
                                <span className="rec-title">{video.title}</span>
                            </a>
                        ))}
                    </div>
                    <div className="rec-list">
                        <h4>Recommended Books</h4>
                        {activeRecommendations.books.map(book => (
                            <a key={book.url} href={book.url} target="_blank" rel="noopener noreferrer" className="rec-card">
                                <span className="rec-title">{book.title}</span>
                                <span className="rec-author">by {book.author}</span>
                            </a>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default SkillsPanel;