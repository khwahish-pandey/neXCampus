import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // <-- Import the router
import './index.css';
import './App.css'
import App from './App';
import { GoogleOAuthProvider } from "@react-oauth/google";
const root = ReactDOM.createRoot(document.getElementById('root'));
console.log(process.env.REACT_APP_GOOGLE_CLIENT_ID)
root.render(
  <React.StrictMode>
   <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
>
      <App />
    </GoogleOAuthProvider>
  </React.StrictMode>
);