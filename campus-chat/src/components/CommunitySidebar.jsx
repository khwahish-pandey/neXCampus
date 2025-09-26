import React from 'react';
import { NavLink } from 'react-router-dom';

function CommunitySidebar() {
  const communities = [
    { id: 'web-development', name: 'Web Development' },
    { id: 'machine-learning', name: 'Machine Learning' },
    { id: '3rd-year-students', name: '3rd Year Students' },
    { id: 'dsi-community', name: 'DSI Community' },
    { id: 'point-blank', name: 'Point Blank' },
    { id: 'hackathons', name: 'Hackathons' },
    { id: 'exam-preps', name: 'Exam Preps' },
    { id: 'creative-corner', name: 'Creative Corner' },
    { id: 'photography-club', name: 'Photography Club' },
    { id: 'finance-investing', name: 'Finance & Investing' }
  ];

  return (
    <nav className="sidebar">
      <div className="sidebar-header">
        <h2>Communities</h2>
      </div>
      <ul>
        {communities.map(community => (
          <li key={community.id}>
            <NavLink to={`/community/${community.id}`}>
              {community.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default CommunitySidebar;