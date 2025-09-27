import React, { useState,useEffect } from 'react';
import { jwtDecode } from 'jwt-decode'
// --- SVG Icons ---
const DashboardIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 mr-3"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
);
const ClassesIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 mr-3"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
);
const TimetableIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 mr-3"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
);
const SubmissionsIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 mr-3"><path d="M15.5 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8.5L15.5 3Z"/><path d="M15 3v6h6"/></svg>
);
const SearchIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-gray-400"><circle cx="11" cy="11" r="8"/><line x1="21" x2="16.65" y1="21" y2="16.65"/></svg>
);
const BackIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 mr-2"><path d="m15 18-6-6 6-6"/></svg>
);


// --- Components ---

const Sidebar = ({ activeView, setActiveView }) => {
    const navItems = [
        { id: 'dashboard', icon: <DashboardIcon />, label: 'Dashboard' },
        { id: 'my_classes', icon: <ClassesIcon />, label: 'My Classes' },
        { id: 'my_timetable', icon: <TimetableIcon />, label: 'My Timetable' },
        { id: 'assignments', icon: <SubmissionsIcon />, label: 'Assignments' },
    ];
    return (
        <aside className="w-64 bg-indigo-800 text-white flex flex-col p-4 rounded-l-2xl shrink-0">
            <div className="text-2xl font-bold mb-10 pl-2">NeXCampus</div>
            <nav>
                <ul>
                    {navItems.map(item => (
                        <li key={item.id}>
                            <a
                               href="#"
                               onClick={(e) => { e.preventDefault(); setActiveView(item.id); }}
                               className={`flex items-center px-4 py-3 my-1 rounded-lg transition-colors duration-200 ${activeView === item.id ? 'bg-indigo-900 font-semibold' : 'hover:bg-indigo-700'}`}>
                               {item.icon} {item.label}
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>
        </aside>
    );
};

const Header = ({ title }) => (
    <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800">{title}</h2>
        <div className="flex items-center space-x-4">
            <div className="relative">
                <input type="text" placeholder="Search..." className="pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                <div className="absolute left-3 top-1/2 -translate-y-1/2">
                    <SearchIcon />
                </div>
            </div>
            <img src="https://placehold.co/40x40/A3BFFA/4A5568?text=AT" alt="Teacher" className="w-10 h-10 rounded-full" />
        </div>
    </div>
);

const MyClasses = () => {
    const classes = [
        { name: 'Design & Analysis of Algorithms', code: 'CS304', students: 62, section: 'A' },
        { name: 'Operating Systems', code: 'CS301', students: 65, section: 'B' },
        { name: 'Computer Networks', code: 'CS303', students: 63, section: 'A' },
        { name: 'Software Engineering Lab', code: 'CS305L', students: 128, section: 'A+B' },
    ];
    return (
        <div>
            <Header title="My Classes" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {classes.map(cls => (
                    <div key={cls.code} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border-l-4 border-indigo-500">
                        <h4 className="text-xl font-bold text-gray-900">{cls.name}</h4>
                        <p className="text-gray-500 text-sm mb-4">{cls.code}</p>
                        <div className="flex justify-between items-center text-gray-700">
                           <span><span className="font-bold">{cls.students}</span> Students</span>
                           <span>Section: <span className="font-bold">{cls.section}</span></span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const MyTimetable = () => {
    const schedule = [
        { time: '09:00 - 10:00', Mon: 'DAA (CS-A)', Tue: 'OS (CS-B)', Wed: 'CN (CS-A)', Thu: 'DAA (CS-B)', Fri: 'SE (CS-A)' },
        { time: '10:00 - 11:00', Mon: 'DBMS (CS-B)', Tue: 'OS (CS-A)', Wed: 'SE (CS-B)', Thu: 'CN (CS-A)', Fri: 'DAA (CS-B)' },
        { time: '11:00 - 12:00', Mon: 'Mentoring', Tue: 'DAA (CS-A)', Wed: 'DBMS (CS-A)', Thu: 'OS (CS-B)', Fri: 'Free' },
        { time: '12:00 - 01:00', Mon: 'LUNCH', Tue: 'LUNCH', Wed: 'LUNCH', Thu: 'LUNCH', Fri: 'LUNCH' },
        { time: '01:00 - 02:00', Mon: 'OS Lab (CS-A)', Tue: 'DBMS Lab (CS-B)', Wed: 'CN Lab (CS-A)', Thu: 'Free', Fri: 'Project Work' },
        { time: '02:00 - 03:00', Mon: 'OS Lab (CS-A)', Tue: 'DBMS Lab (CS-B)', Wed: 'CN Lab (CS-A)', Thu: 'Research', Fri: 'Project Work' },
    ];
    return (
        <div>
            <Header title="My Weekly Timetable" />
            <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full text-center">
                        <thead className="bg-gray-50">
                            <tr>
                                {['Time', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map(day => (
                                    <th key={day} className="px-4 py-4 text-xs font-bold text-gray-600 uppercase tracking-wider">{day}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                             {schedule.map((row) => (
                                <tr key={row.time} className="hover:bg-gray-50">
                                    <td className="px-4 py-4 text-sm font-medium text-gray-900">{row.time}</td>
                                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map(day => (
                                        <td key={day} className="px-4 py-4 text-sm text-gray-700">{row[day]}</td>
                                    ))}
                                </tr>
                             ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

const Assignments = () => {
    const [selectedAssignment, setSelectedAssignment] = useState(null);

    const createdAssignments = [
        { id: 1, title: 'Process Scheduling Algorithms', subject: 'Operating Systems', dueDate: '25-10-2025', submissions: 58, total: 62 },
        { id: 2, title: 'ER Diagram for University', subject: 'Database Systems', dueDate: '28-10-2025', submissions: 60, total: 65 },
        { id: 3, title: 'Subnetting Exercises', subject: 'Computer Networks', dueDate: '02-11-2025', submissions: 55, total: 63 },
    ];

    const allSubmissions = {
        1: [
            { student: 'Alice Johnson', usn: '1MS20CS010', submitted: '24-10-2025', status: 'Pending' },
            { student: 'Bob Williams', usn: '1MS20CS021', submitted: '23-10-2025', status: 'Graded' },
            { student: 'Diana Miller', usn: '1MS20CS045', submitted: '24-10-2025', status: 'Pending' },
        ],
        2: [
            { student: 'Charlie Brown', usn: '1MS20CS033', submitted: '27-10-2025', status: 'Pending' },
        ],
        3: [],
    };
    
    const getStatusColor = (status) => {
        if (status === 'Graded') return 'bg-green-100 text-green-800';
        return 'bg-yellow-100 text-yellow-800';
    };

    const SubmissionsList = () => {
        const submissions = allSubmissions[selectedAssignment.id] || [];
        return (
            <div>
                <button onClick={() => setSelectedAssignment(null)} className="mb-6 flex items-center text-indigo-600 hover:text-indigo-900 font-semibold">
                    <BackIcon />
                    Back to Assignments
                </button>
                 <h3 className="text-xl font-bold text-gray-800 mb-1">{selectedAssignment.title}</h3>
                 <p className="text-gray-500 mb-6">{selectedAssignment.subject} - Due: {selectedAssignment.dueDate}</p>
                 
                <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
                    <div className="overflow-x-auto">
                         <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    {['Student', 'Submitted On', 'Status', 'Action'].map(head => (
                                        <th key={head} className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">{head}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {submissions.length > 0 ? submissions.map(item => (
                                    <tr key={item.usn} className="hover:bg-gray-50">
                                        <td className="px-6 py-4">
                                            <div className="text-sm font-semibold text-gray-900">{item.student}</div>
                                            <div className="text-xs text-gray-500">{item.usn}</div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600">{item.submitted}</td>
                                        <td className="px-6 py-4 text-sm">
                                            <span className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusColor(item.status)}`}>{item.status}</span>
                                        </td>
                                        <td className="px-6 py-4 text-sm">
                                            {item.status === 'Pending' && <button className="text-indigo-600 hover:text-indigo-900 font-semibold">Grade Now</button>}
                                        </td>
                                    </tr>
                                )) : (
                                   <tr><td colSpan="4" className="text-center py-10 text-gray-500">No submissions for this assignment yet.</td></tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    };

    const AssignmentsList = () => {
        return (
            <div>
                 <Header title="Assignments" />
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {createdAssignments.map(assignment => (
                        <div key={assignment.id} className="bg-white p-6 rounded-xl shadow-md border-t-4 border-indigo-500 flex flex-col hover:shadow-lg transition-shadow">
                            <h4 className="text-lg font-bold text-gray-900">{assignment.title}</h4>
                            <p className="text-gray-600 text-sm mb-4">{assignment.subject}</p>
                            <div className="mt-auto">
                                <p className="text-sm text-gray-500 mb-2">Due: {assignment.dueDate}</p>
                                <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
                                  <div className="bg-indigo-600 h-2.5 rounded-full" style={{ width: `${(assignment.submissions / assignment.total) * 100}%` }}></div>
                                </div>
                                <p className="text-sm font-medium text-gray-700 mb-4">{assignment.submissions} / {assignment.total} Submissions</p>
                                <button onClick={() => setSelectedAssignment(assignment)} className="w-full bg-indigo-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors">
                                    View Submissions
                                </button>
                            </div>
                        </div>
                    ))}
                 </div>
            </div>
        );
    };

    return selectedAssignment ? <SubmissionsList /> : <AssignmentsList />;
};


const DashboardHome = () => {
    const [assignmentText, setAssignmentText] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [showAssignmentInput, setShowAssignmentInput] = useState(false);
    const [teacherDetails, setTeacherDetails] = useState({ name: '', email: '' });

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decoded = jwtDecode(token);
                setTeacherDetails({
                    name: decoded.name || 'Unknown',
                    email: decoded.email || 'unknown@example.com'
                });
            } catch (err) {
                console.error("Invalid token:", err);
            }
        }
    }, []);

    const handleAssignmentSubmit = async () => {
        console.log("inside handle");
        console.log("assignmentText:", assignmentText);
        console.log("teacherDetails:", teacherDetails);

        if (!assignmentText.trim()) {
            setMessage("Assignment content cannot be empty.");
            return;
        }
        setLoading(true);
        setMessage('');
        try {
            const response = await fetch("http://localhost:5000/api/assignments/create", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    content: assignmentText,
                    teacher: teacherDetails
                })
            });
            if (response.ok) {
                setMessage("Assignment created successfully!");
                setAssignmentText('');
                setShowAssignmentInput(false);
            } else {
                setMessage("Failed to create assignment.");
            }
        } catch (err) {
            console.error(err);
            setMessage("Network error.");
        }
        setLoading(false);
    };

    return (
        <div>
            <Header title="Dashboard" />
            <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-700">Welcome back, Dr. {teacherDetails.name}</h3>
                <p className="text-gray-500">Here's a quick overview of your day.</p>
            </div>
            
            {/* Top row with 3 buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow text-center cursor-pointer border-t-4 border-blue-500">
                    <h4 className="font-bold text-lg text-gray-800">View Students</h4>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow text-center cursor-pointer border-t-4 border-green-500">
                    <h4 className="font-bold text-lg text-gray-800">Upload Marks</h4>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow text-center cursor-pointer border-t-4 border-red-500 sm:col-span-2 lg:col-span-1">
                    <h4 className="font-bold text-lg text-gray-800">Announcements</h4>
                </div>
            </div>

            {/* Full width Create Assignment button */}
            <div className="mb-8">
                <div 
                    className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow text-center cursor-pointer border-t-4 border-yellow-500 w-full"
                    onClick={() => setShowAssignmentInput(true)}
                >
                    <h4 className="font-bold text-xl text-gray-800">Create Assignment</h4>
                </div>
            </div>

            {/* Assignment input form - appears below Create Assignment button */}
            {showAssignmentInput && (
                <div className="bg-white p-6 rounded-xl shadow-md border-t-4 border-yellow-500 w-full">
                    <h4 className="font-bold text-lg text-gray-800 mb-4">Create New Assignment</h4>
                    <textarea
                        className="border border-gray-300 rounded-lg px-4 py-3 w-full mb-4 min-h-[120px] focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent resize-vertical"
                        placeholder="Enter assignment details..."
                        value={assignmentText}
                        onChange={(e) => setAssignmentText(e.target.value)}
                        disabled={loading}
                    />
                    <div className="flex flex-col sm:flex-row gap-4">
                        <button
                            className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 px-8 rounded-lg transition-colors flex-1 sm:flex-none"
                            onClick={handleAssignmentSubmit}
                            disabled={loading}
                        >
                            {loading ? "Submitting..." : "Submit Assignment"}
                        </button>
                        <button
                            className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 px-8 rounded-lg transition-colors flex-1 sm:flex-none"
                            onClick={() => {
                                setShowAssignmentInput(false);
                                setAssignmentText('');
                                setMessage('');
                            }}
                            disabled={loading}
                        >
                            Cancel
                        </button>
                    </div>
                    {message && (
                        <div className={`mt-4 p-3 rounded-lg text-sm font-medium ${message.includes("success") ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                            {message}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default function App() {
    const [activeView, setActiveView] = useState('dashboard');

    const renderContent = () => {
        switch (activeView) {
            case 'dashboard':
                return <DashboardHome />;
            case 'my_classes':
                return <MyClasses />;
            case 'my_timetable':
                return <MyTimetable />;
            case 'assignments':
                return <Assignments />;
            default:
                return <DashboardHome />;
        }
    };

    return (
        <div className="bg-gray-100 min-h-screen p-4 sm:p-6 lg:p-8 flex items-center justify-center">
            <div className="w-full max-w-7xl bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl flex" style={{height: '90vh'}}>
                <Sidebar activeView={activeView} setActiveView={setActiveView} />
                <main className="flex-1 p-10 overflow-y-auto">
                    {renderContent()}
                </main>
            </div>
        </div>
    );
}