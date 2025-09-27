import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Using Link for better navigation

const Navbar = () => {
  const navigate=useNavigate()
  // A helper function to manage class names for nav links
  const linkClasses = "text-indigo-100 text-base font-medium rounded-full px-4 py-2 transition-all duration-300 ease-in-out hover:bg-indigo-500/40 hover:text-white hover:scale-105";
  const handleLogout=async(e)=>{
      e.preventDefault();
  localStorage.removeItem('token');

  navigate('/login')
  }

  return (
    <nav className="sticky top-0 z-50 bg-blue-950 backdrop-blur-lg border-b border-indigo-500/30 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex  justify-between py-4">
          
          {/* Website Name / Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-white text-3xl font-bold tracking-tight">
              NeXCampus
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-6">
              <Link to="/" className={linkClasses}>
                Dashboard
              </Link>
              <Link to="/about" className={linkClasses}>
                About
              </Link>
              <Link to="/announcements" className={linkClasses}>
                Announcements
              </Link>
              <Link to="/others" className={linkClasses}>
                Others
              </Link>
              <Link to="/canteen" className={linkClasses}>
                Canteen
              </Link>
              <button
              onClick={handleLogout}
              className={linkClasses}
              >
                Log Out
              </button>

            </div>
          </div>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;