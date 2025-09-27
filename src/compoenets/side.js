import React, { useState } from 'react';

// --- Helper Icon Components (using inline SVG for portability) ---
const HomeIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
);

const BuildingIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="16" height="20" x="4" y="2" rx="2" ry="2"></rect><path d="M9 22v-4h6v4"></path><path d="M8 6h.01"></path><path d="M16 6h.01"></path><path d="M12 6h.01"></path><path d="M12 10h.01"></path><path d="M12 14h.01"></path><path d="M16 10h.01"></path><path d="M8 10h.01"></path><path d="M8 14h.01"></path><path d="M16 14h.01"></path></svg>
);

const UsersIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
);

const UtensilsIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"></path><path d="M7 2v20"></path><path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3z"></path></svg>
);

const LibraryIcon = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Z"></path><path d="M16 2v20"></path><path d="M12 11h-2"></path></svg>
);

const CalendarIcon = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="18" height="18" x="3" y="4" rx="2" ry="2"></rect><line x1="16" x2="16" y1="2" y2="6"></line><line x1="8" x2="8" y1="2" y2="6"></line><line x1="3" x2="21" y1="10" y2="10"></line></svg>
);

const MenuIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="4" x2="20" y1="12" y2="12"></line><line x1="4" x2="20" y1="6" y2="6"></line><line x1="4" x2="20" y1="18" y2="18"></line></svg>
);

// --- Sidebar Item Component ---
const SidebarItem = ({ icon, text, active, alert, onClick }) => {
  return (
    <li
      onClick={onClick}
      className={`
        relative flex items-center py-3 px-4 my-1
        font-medium rounded-lg cursor-pointer
        transition-colors group
        ${active
          ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800"
          : "hover:bg-indigo-50 text-gray-600"
        }
    `}
    >
      {icon}
      <span className="ml-4">{text}</span>
      {alert && (
        <div className="absolute right-2 w-2 h-2 rounded bg-indigo-400" />
      )}
    </li>
  );
};


// --- The Main Sidebar Component ---
function Sidebar() {
  const [activeItem, setActiveItem] = useState("About College");

  const menuItems = [
    { text: "About College", icon: <BuildingIcon className="w-5 h-5" /> },
    { text: "About Clubs", icon: <UsersIcon className="w-5 h-5" /> },
    { text: "Canteen", icon: <UtensilsIcon className="w-5 h-5" /> },
    { text: "Library", icon: <LibraryIcon className="w-5 h-5" /> },
    { text: "Events", icon: <CalendarIcon className="w-5 h-5" />, alert: true },
  ];

  return (
    <aside className="h-screen w-64 fixed top-0 left-0 bg-white border-r border-gray-200 shadow-sm">
      <nav className="flex flex-col p-4">
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-gray-200">
            <div className="flex items-center">
                 <HomeIcon className="w-8 h-8 text-indigo-600" />
                <h1 className="text-xl font-bold text-gray-800 ml-3">MyCollege</h1>
            </div>
        </div>
        
        <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 px-4">Explore More</h2>
        
        <ul className="flex-1 px-0">
          {menuItems.map((item) => (
            <SidebarItem
              key={item.text}
              icon={item.icon}
              text={item.text}
              alert={item.alert}
              active={activeItem === item.text}
              onClick={() => setActiveItem(item.text)}
            />
          ))}
        </ul>
      </nav>
    </aside>
  );
}

// --- Main App Component to display the sidebar ---
export default function Sid() {
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);

  return (
    <div className="bg-gray-50 font-sans text-gray-900">
      {/* This component will only show the sidebar. 
          In a real app, you would have your main content next to it. */}
      
      {/* Sidebar - positioned fixed */}
      <div className={`transition-transform duration-300 ${isSidebarVisible ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
         <Sidebar />
      </div>

      {/* Main Content Area */}
      <main className="md:ml-64 transition-all duration-300">
         <div className="p-4 md:p-8">
            {/* Mobile Header */}
            <header className="md:hidden flex items-center justify-between mb-6">
                <div className="flex items-center">
                    <HomeIcon className="w-8 h-8 text-indigo-600" />
                    <h1 className="text-xl font-bold text-gray-800 ml-3">MyCollege</h1>
                </div>
                <button onClick={() => setIsSidebarVisible(!isSidebarVisible)} className="p-2 rounded-lg hover:bg-gray-200">
                    <MenuIcon className="h-6 w-6"/>
                </button>
            </header>
            
            <h1 className="text-3xl font-bold mb-4">Main Content Area</h1>
            <p className="text-gray-600">
              Your website's main content would go here. The sidebar will remain fixed on the left on desktop screens.
              On mobile screens, you can toggle it by clicking the menu icon that appears.
            </p>
            {/* Example content */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="font-semibold text-lg mb-2">Welcome!</h2>
                    <p className="text-sm text-gray-500">This is a sample card to show how your content would be laid out.</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="font-semibold text-lg mb-2">Academics</h2>
                    <p className="text-sm text-gray-500">Information about courses and departments.</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="font-semibold text-lg mb-2">Student Life</h2>
                    <p className="text-sm text-gray-500">Details about campus activities and resources.</p>
                </div>
            </div>
         </div>
      </main>

      {/* Overlay for mobile when sidebar is open */}
      {isSidebarVisible && (
        <div 
          className="md:hidden fixed inset-0 bg-black/30 z-0"
          onClick={() => setIsSidebarVisible(false)}
        ></div>
      )}
    </div>
  );
}
