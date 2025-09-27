import React from 'react';
import { Link } from 'react-router-dom';
import { announcementsData } from './data';
import './anouncement.css';

// A helper function to create a short, plain-text preview
const createPreview = (htmlContent, maxLength) => {
  const plainText = htmlContent.replace(/<[^>]*>/g, ''); // Remove HTML tags
  if (plainText.length <= maxLength) {
    return plainText;
  }
  return plainText.substring(0, maxLength) + '...';
};

const AnnouncementList = () => {
  const sortedAnnouncements = [...announcementsData].sort((a, b) => b.id - a.id);

  return (
    <section className="announcement-container">
      <div className="header-wrapper">
        <h2>Campus Announcements & Notices</h2>
      </div>
      <div className="announcements-list">
        {sortedAnnouncements.map(announcement => (
          <article key={announcement.id} className="announcement-card">
            <div className="card-header">
              <h3>
                {announcement.tag && <span className="tag" style={{ backgroundColor: announcement.tagColor }}>{announcement.tag}</span>}
                {announcement.title}
              </h3>
              <p className="metadata">
                <strong>From:</strong> {announcement.department} | <strong>Posted:</strong> {announcement.date}
              </p>
            </div>
            <div className="card-content-preview">
              <p>{createPreview(announcement.content, 120)}</p>
            </div>
            <Link to={`/announcement/${announcement.id}`} className="read-more-btn">
              Read More
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
};

export default AnnouncementList;
