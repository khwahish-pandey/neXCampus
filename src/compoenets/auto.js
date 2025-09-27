import React from 'react';
import './auto.css'; // We'll create this new CSS file

// --- ⚙️ YOUR DATA GOES HERE ---
// Simply replace this data with your own images, names, and links.
// The structure is an array of objects.
const scrollerData = [
  {
    id: 1,
    name: 'DSCE global climate research',
    imageUrl: '/photos/nnn.jpg',
    link: 'https://react.dev/',
  },
  {
    id: 2,
    name: 'latest upadte on DSCE campus',
    imageUrl: '/photos/IMG_20250927_000622.jpg',
    link: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
  },
  {
    id: 3,
    name: 'Trinada from DSCE secured 1st rank inter college competition',
    imageUrl: '/photos/IMG_20250927_000302.jpg',
    link: 'https://developer.mozilla.org/en-US/docs/Web/CSS',
  },
  {
    id: 4,
    name: 'HTML5',
    imageUrl: '/photos/dayananda-sagar-college-of-engineering1-gallery-image-968.jpg',
    link: 'https://developer.mozilla.org/en-US/docs/Web/HTML',
  },
  {
    id: 5,
    name: 'Node.js',
    imageUrl: '/photos/IMG_20250927_000504.jpg',
    link: 'https://nodejs.org/',
  },
  {
    id: 6,
    name: 'Vite',
    imageUrl: '/photos/IMG_20250927_000606.jpg',
    link: 'https://vitejs.dev/',
  },
];

const AutoScroller = () => {
  // ✨ The magic trick: duplicate the data for a seamless loop
  const duplicatedData = [...scrollerData, ...scrollerData];

  return (
    <div className="scroller-section">
      <h2 className="scroller-title">My Tech Stack</h2>
      <div className="scroller">
        <div className="scroller-inner">
          {duplicatedData.map((item) => (
            <a href={item.link} key={item.id} target="_blank" rel="noopener noreferrer" className="scroller-card-link">
              <div className="scroller-card">
                <img src={item.imageUrl} alt={item.name} className="card-image" />
                <p className="card-name">{item.name}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AutoScroller;