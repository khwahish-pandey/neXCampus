import React from 'react';

function MessageFeed({ messages }) {
  return (
    <div className="message-feed">
      
      {messages.map((message, index) => (
        <div
          key={index} 
          className={message.sender === 'You' ? 'message my-message' : 'message their-message'}
        >
          <span className="sender-name">{message.sender}</span>
          <p>{message.text}</p>
        </div>
      ))}
    </div>
  );
}

export default MessageFeed;