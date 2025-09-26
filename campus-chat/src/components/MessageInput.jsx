import React from 'react';

function MessageInput() {
  return (
    <div className="message-input">
      <input type="text" placeholder="Type a message..." />
      <button>Send</button>
    </div>
  );
}

export default MessageInput;