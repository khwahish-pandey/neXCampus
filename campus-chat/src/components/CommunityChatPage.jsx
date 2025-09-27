import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from './Header';
import MessageFeed from './MessageFeed';
import MessageInput from './MessageInput';

// "Fake Database" with all communities
const allCommunityData = {
  'web-development': {
    name: 'Web Development',
    messages: [
      { sender: 'John', text: 'Has anyone used the new React 19 features?' },
      { sender: 'You', text: 'Not yet, but I heard the compiler is amazing!' }
    ]
  },
  'machine-learning': {
    name: 'Machine Learning',
    messages: [
      { sender: 'Chloe', text: 'The new paper on diffusion models is out.' },
      { sender: 'You', text: 'Sending the link now.' }
    ]
  },
  '3rd-year-students': {
    name: '3rd Year Students',
    messages: [
      { sender: 'Katherine', text: 'Internship updates?' },
    ]
  },
  'dsi-community': {
    name: 'DSI Community',
    messages: [
      { sender: 'Issac', text: 'Meeting at 5 PM today.' },
    ]
  },
  'point-blank': {
    name: 'Point Blank',
    messages: [
      { sender: 'Issac', text: 'Anyone up for a match?' },
      { sender: 'You', text: 'Give me 10 minutes.' }
    ]
  },
  'hackathons': {
    name: 'Hackathons',
    messages: [
      { sender: 'Chloe', text: 'SIH registration is open!' },
    ]
  },
  'exam-preps': {
    name: 'Exam Preps',
    messages: [
      { sender: 'Newton', text: 'Does anyone have the notes for unit 3?' },
      { sender: 'You', text: 'I have them, I will share in a bit.' },
    ]
  },
  'creative-corner': {
    name: 'Creative Corner',
    messages: [
      { sender: 'Stephanie', text: 'Check out this new design I made.' },
    ]
  },
  'photography-club': {
    name: 'Photography Club',
    messages: [
      { sender: 'Robert', text: 'Golden hour is the best time for portraits.' },
      { sender: 'You', text: 'Totally agree.' }
    ]
  },
  'finance-investing': {
    name: 'Finance & Investing',
    messages: [
      { sender: 'John', text: 'The market is volatile this week.' },
    ]
  }
};


function CommunityChatPage() {
  const { communityId } = useParams();

  const [communityName, setCommunityName] = useState('Loading...');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const currentCommunity = allCommunityData[communityId];

    if (currentCommunity) {
      setCommunityName(currentCommunity.name);
      setMessages(currentCommunity.messages);
    } else {
      setCommunityName('Community Not Found');
      setMessages([]);
    }
  }, [communityId]);

  return (
    <div className="chat-window">
      <Header communityName={communityName} />
      <MessageFeed messages={messages} />
      <MessageInput />
    </div>
  );
}

export default CommunityChatPage;