import React from 'react';
import { Routes, Route } from 'react-router-dom';
import CommunityChatPage from './components/CommunityChatPage';
import CommunitySidebar from './components/CommunitySidebar'; 
import './App.css';

function App() {
  return (
    <div className="app-layout">
      <CommunitySidebar /> 
      <main>
        <Routes>
          <Route path="/community/:communityId" element={<CommunityChatPage />} />
          <Route path="/" element={<h2>Welcome! Select a community to start chatting.</h2>} />
        </Routes>
      </main>
    </div>
  );
}

export default App;