import { useState } from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('student'); // Default to student
  const navigate=useNavigate();
  const API_BASE_URL = 'your-api-base-url'; // Replace with your actual API base URL

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Different API endpoints based on user type
      const endpoint = userType === 'teacher' 
        ? `http://localhost:5000/api/auth/teacher/login`
        : `http://localhost:5000/api/auth/student/login`;

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      
      console.log(response);
      const data = await response.json();
      
      if (response.status === 404) {
        alert(`${userType === 'teacher' ? 'Teacher' : 'Student'} not found`);
      } else if (response.status === 401) {
        alert("Invalid credentials");
      } else if (response.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('userType', userType); // Store user type for future use
        
        window.dispatchEvent(new Event("loginStatusChanged")); 
        console.log(userType);
        //alert(`Login successful as ${userType}!`);
        if(userType==="student"){
          navigate('/dashboard')
        }else if(userType==="teacher"){
          navigate("/teacher/dashboard")
        }
      } else {
        alert("Login failed. Please try again.");
      }

    } catch (error) {
      console.error("Error logging in:", error);
      alert("Network error. Please check your connection.");
    }  
  };

  const handleGoogleSubmit = useGoogleLogin({
    onSuccess: async (tokenResponse) => {  
      try {
        // Different Google auth endpoints based on user type
        const endpoint = userType === 'teacher' 
          ? `${API_BASE_URL}/api/auth/teacher/googleAuth`
          : `${API_BASE_URL}/api/auth/student/googleAuth`;

        const response = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ 
            access_token: tokenResponse.access_token,
            userType: userType 
          }),
        });
        
        console.log(response);
        
        if (!response.ok) {
          alert("Google login failed. Please try again.");
          return;
        }
        
        const data = await response.json();
        
        if (response.ok) {
          localStorage.setItem("token", data.token);
          localStorage.setItem('userType', userType);
          window.dispatchEvent(new Event("loginStatusChanged")); 
          // navigate("/"); // Uncomment when using with router
          alert(`Google login successful as ${userType}!`);
        } else {
          alert("Server error during Google authentication");
        }
      } catch (error) {
        console.error("Google login error:", error);
        alert("Network error during Google login");
      }
    },
    onError: (err) => console.log("Google Login Failed", err),
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1e293b] p-2">
      <div className="w-full max-w-sm sm:max-w-md bg-white border-2 border-blue-600 rounded-lg shadow-lg p-4 sm:p-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-[#1e293b] mb-4 sm:mb-6">Login</h2>
        
        {/* User Type Selection */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-[#1e293b] mb-3">Login as:</label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setUserType('student')}
              className={`py-3 px-4 rounded-md font-semibold transition-all duration-200 border-2 ${
                userType === 'student' 
                  ? 'bg-blue-600 text-white border-blue-600 shadow-md transform scale-105' 
                  : 'bg-white text-[#1e293b] border-blue-300 hover:border-blue-500 hover:bg-blue-50'
              }`}
            >
              👨‍🎓 Student
            </button>
            <button
              type="button"
              onClick={() => setUserType('teacher')}
              className={`py-3 px-4 rounded-md font-semibold transition-all duration-200 border-2 ${
                userType === 'teacher' 
                  ? 'bg-blue-600 text-white border-blue-600 shadow-md transform scale-105' 
                  : 'bg-white text-[#1e293b] border-blue-300 hover:border-blue-500 hover:bg-blue-50'
              }`}
            >
              👩‍🏫 Teacher
            </button>
          </div>
        </div>

        <form onSubmit={handleLogin} className="space-y-3 sm:space-y-4">
          <div>
            <label className="block text-sm font-medium text-[#1e293b] mb-2">Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 sm:py-3 border-2 border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-[#1e293b] placeholder-gray-500 text-sm sm:text-base"
              placeholder={`Enter your ${userType} email`}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#1e293b] mb-2">Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 sm:py-3 border-2 border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-[#1e293b] placeholder-gray-500 text-sm sm:text-base"
              placeholder="Enter your password"
            />
          </div>
          <button 
            type="submit" 
            className="w-full py-2 sm:py-3 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors text-sm sm:text-base"
          >
            Login as {userType === 'teacher' ? 'Teacher' : 'Student'}
          </button>
        </form>

        <div className="flex items-center justify-center mt-3 sm:mt-4 space-x-2">
          <span className="text-[#1e293b] text-sm">Don't have an account?</span>
          <button 
            className="text-blue-700 hover:text-blue-800 font-medium underline text-sm" 
            onClick={() => window.location.href='/signup'}
          >
            Sign Up
          </button>
        </div>

        <div className="flex items-center my-3 sm:my-4">
          <div className="flex-1 border-t border-blue-300"></div>
          <span className="px-3 text-gray-500 text-sm">OR</span>
          <div className="flex-1 border-t border-blue-300"></div>
        </div>

        <div>
          <button 
            className="w-full flex items-center justify-center px-4 py-2 sm:py-3 border-2 border-blue-300 rounded-md bg-white hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors text-sm sm:text-base" 
            type="button"
            onClick={handleGoogleSubmit}
          >
            <svg className="w-5 h-5 mr-3" viewBox="0 0 48 48">
              <g>
                <path fill="#4285F4" d="M44.5 20H24v8.5h11.7C34.7 33.1 29.8 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c2.7 0 5.2.9 7.2 2.5l6.4-6.4C33.5 5.1 28.1 3 24 3 12.4 3 3 12.4 3 24s9.4 21 21 21c10.5 0 20-8.1 20-21 0-1.3-.1-2.7-.5-4z"/>
                <path fill="#34A853" d="M6.3 14.7l7 5.1C15.5 16.1 19.4 13 24 13c2.7 0 5.2.9 7.2 2.5l6.4-6.4C33.5 5.1 28.1 3 24 3c-7.2 0-13.4 3.1-17.7 8.1z"/>
                <path fill="#FBBC05" d="M24 44c5.6 0 10.7-1.9 14.7-5.1l-6.8-5.6C29.8 38 27 39 24 39c-5.7 0-10.5-3.7-12.2-8.8l-7 5.4C7.9 40.7 15.4 44 24 44z"/>
                <path fill="#EA4335" d="M44.5 20H24v8.5h11.7c-1.2 3.2-4.7 7.5-11.7 7.5-6.6 0-12-5.4-12-12s5.4-12 12-12c2.7 0 5.2.9 7.2 2.5l6.4-6.4C33.5 5.1 28.1 3 24 3c-7.2 0-13.4 3.1-17.7 8.1z"/>
              </g>
            </svg>
            Continue with Google as {userType === 'teacher' ? 'Teacher' : 'Student'}
          </button>
        </div>

        {/* Role indication at bottom */}
        <div className="mt-3 p-2 bg-blue-50 rounded-md">
          <p className="text-xs text-blue-700 text-center">
            Currently selected: <span className="font-semibold text-blue-700">
              {userType === 'teacher' ? '👩‍🏫 Teacher' : '👨‍🎓 Student'}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}