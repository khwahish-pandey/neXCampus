import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { announcementsData } from './data';
import './anouncement.css';

const AnnouncementDetail = () => {
  const { id } = useParams();
  const announcement = announcementsData.find(ann => ann.id.toString() === id);

  if (!announcement) {
    return (
      <div className="announcement-detail">
        <h2>Announcement Not Found</h2>
        <Link to="/" className="back-link">
          &larr; Back to all announcements
        </Link>
      </div>
    );
  }

  return (
    <article className="announcement-detail">
      <div className="card-header">
        <h3>
          {announcement.tag && <span className="tag" style={{ backgroundColor: announcement.tagColor }}>{announcement.tag}</span>}
          {announcement.title}
        </h3>
        <p className="metadata">
          <strong>From:</strong> {announcement.department} | <strong>Posted:</strong> {announcement.date}
        </p>
      </div>
      <div className="card-content" dangerouslySetInnerHTML={{ __html: announcement.content }} />
      <Link to="/" className="back-link">
        &larr; Back to all announcements
      </Link>
    </article>
  );
};

export default AnnouncementDetail;
