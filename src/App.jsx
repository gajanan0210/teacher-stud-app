import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { HiAcademicCap, HiUserGroup, HiBookOpen, HiClipboardList, HiMoon, HiSun } from 'react-icons/hi';
import { RiGraduationCapFill } from 'react-icons/ri';
import { Toaster } from 'react-hot-toast';
import ErrorBoundary from './components/ErrorBoundary';
import Students from './pages/Students';
import Teachers from './pages/Teachers';
import Courses from './pages/Courses';
import Enrollments from './pages/Enrollments';
import './App.css';

function Navigation({ theme, toggleTheme }) {
  const location = useLocation();
  
  const navItems = [
    { path: '/', label: 'Students', icon: HiAcademicCap },
    { path: '/teachers', label: 'Teachers', icon: HiUserGroup },
    { path: '/courses', label: 'Courses', icon: HiBookOpen },
    { path: '/enrollments', label: 'Enrollments', icon: HiClipboardList }
  ];

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="navbar desktop-nav">
        <div className="nav-brand">
          <RiGraduationCapFill className="brand-icon" />
          <span className="brand-text">EduHub</span>
        </div>
        <div className="nav-links">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
              >
                <Icon className="nav-icon" />
                <span className="nav-label">{item.label}</span>
              </Link>
            );
          })}
        </div>
        <button className="theme-toggle" onClick={toggleTheme}>
          {theme === 'dark' ? <HiSun /> : <HiMoon />}
        </button>
      </nav>

      {/* Mobile Bottom Navigation */}
      <nav className="mobile-nav">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`mobile-nav-link ${location.pathname === item.path ? 'active' : ''}`}
            >
              <Icon className="mobile-nav-icon" />
              <span className="mobile-nav-label">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Mobile Header */}
      <div className="mobile-header">
        <div className="nav-brand">
          <RiGraduationCapFill className="brand-icon" />
          <span className="brand-text">EduHub</span>
        </div>
        <button className="theme-toggle" onClick={toggleTheme}>
          {theme === 'dark' ? <HiSun /> : <HiMoon />}
        </button>
      </div>
    </>
  );
}

function App() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light';
  });

  const [students, setStudents] = useState([
    { id: 1, name: 'Emma Johnson', email: 'emma.j@email.com', grade: 'A', phone: '+1 234-567-8901', address: '123 Main St, New York, NY' },
    { id: 2, name: 'Liam Smith', email: 'liam.s@email.com', grade: 'B+', phone: '+1 234-567-8902', address: '456 Oak Ave, Boston, MA' },
    { id: 3, name: 'Olivia Brown', email: 'olivia.b@email.com', grade: 'A-', phone: '+1 234-567-8903', address: '789 Pine Rd, Chicago, IL' },
    { id: 4, name: 'Noah Davis', email: 'noah.d@email.com', grade: 'B', phone: '+1 234-567-8904', address: '321 Elm St, Seattle, WA' }
  ]);

  const [teachers, setTeachers] = useState([
    { id: 1, name: 'Dr. Sarah Williams', subject: 'Mathematics', email: 'sarah.w@edu.com' },
    { id: 2, name: 'Prof. Michael Chen', subject: 'Computer Science', email: 'michael.c@edu.com' },
    { id: 3, name: 'Dr. Emily Rodriguez', subject: 'Physics', email: 'emily.r@edu.com' }
  ]);

  const [courses, setCourses] = useState([
    { id: 1, name: 'Advanced Mathematics', code: 'MATH301', teacherId: 1, credits: 4 },
    { id: 2, name: 'Data Structures', code: 'CS201', teacherId: 2, credits: 3 },
    { id: 3, name: 'Quantum Physics', code: 'PHYS401', teacherId: 3, credits: 4 },
    { id: 4, name: 'Web Development', code: 'CS301', teacherId: 2, credits: 3 }
  ]);

  const [enrollments, setEnrollments] = useState([
    { id: 1, studentId: 1, courseId: 1, enrolledDate: '2024-01-15' },
    { id: 2, studentId: 1, courseId: 2, enrolledDate: '2024-01-16' },
    { id: 3, studentId: 2, courseId: 2, enrolledDate: '2024-01-17' },
    { id: 4, studentId: 3, courseId: 3, enrolledDate: '2024-01-18' }
  ]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <ErrorBoundary>
      <Router>
        <div className="app">
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 3000,
              style: {
                background: 'var(--bg-card)',
                color: 'var(--text-primary)',
                border: '1px solid var(--border)',
                borderRadius: '12px',
                padding: '16px',
                boxShadow: 'var(--neu-outset)',
              },
              success: {
                iconTheme: {
                  primary: 'var(--success)',
                  secondary: 'white',
                },
              },
              error: {
                iconTheme: {
                  primary: 'var(--danger)',
                  secondary: 'white',
                },
              },
            }}
          />
          <Navigation theme={theme} toggleTheme={toggleTheme} />
          <main className="main-content">
            <Routes>
              <Route 
                path="/" 
                element={
                  <Students 
                    students={students} 
                    setStudents={setStudents}
                    enrollments={enrollments}
                    setEnrollments={setEnrollments}
                    courses={courses}
                    teachers={teachers}
                  />
                } 
              />
              <Route path="/teachers" element={<Teachers teachers={teachers} setTeachers={setTeachers} courses={courses} />} />
              <Route 
                path="/courses" 
                element={
                  <Courses 
                    courses={courses} 
                    setCourses={setCourses} 
                    teachers={teachers}
                  />
                } 
              />
              <Route 
                path="/enrollments" 
                element={
                  <Enrollments 
                    enrollments={enrollments}
                    setEnrollments={setEnrollments}
                    students={students}
                    courses={courses}
                    teachers={teachers}
                  />
                } 
              />
            </Routes>
          </main>
        </div>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
