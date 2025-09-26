import React from 'react';
function Header({ communityName }) {
  return (
    <header className="header">
      <h1>{communityName}</h1>
      <span>15 Members</span>
    </header>
  );
}

export default Header;