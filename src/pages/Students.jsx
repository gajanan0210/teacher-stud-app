import { useState } from 'react';
import { HiPlus, HiX, HiTrash, HiMail, HiAcademicCap, HiPhone, HiLocationMarker } from 'react-icons/hi';
import toast from 'react-hot-toast';
import ConfirmDialog from '../components/ConfirmDialog';
import ProfileModal from '../components/ProfileModal';

function Students({ students, setStudents, enrollments, setEnrollments, courses, teachers }) {
  const [showForm, setShowForm] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, type: '', data: null });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    grade: 'A',
    phone: '',
    address: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const newStudent = {
      id: Date.now(),
      ...formData
    };
    setStudents([...students, newStudent]);
    setFormData({ name: '', email: '', grade: 'A', phone: '', address: '' });
    setShowForm(false);
    toast.success(`Student ${formData.name} added successfully!`);
  };

  const handleDelete = (id) => {
    const student = students.find(s => s.id === id);
    setConfirmDialog({
      isOpen: true,
      type: 'delete-student',
      data: { id, name: student?.name }
    });
  };

  const confirmDelete = () => {
    const { id, name } = confirmDialog.data;
    setStudents(students.filter(s => s.id !== id));
    setEnrollments(enrollments.filter(e => e.studentId !== id));
    toast.success(`Student ${name} deleted successfully!`);
  };

  const handleUpdate = (updatedStudent) => {
    setStudents(students.map(s => s.id === updatedStudent.id ? updatedStudent : s));
    setSelectedStudent(updatedStudent);
  };

  const handleUnenroll = (enrollmentId) => {
    const enrollment = enrollments.find(e => e.id === enrollmentId);
    const course = courses.find(c => c.id === enrollment?.courseId);
    setConfirmDialog({
      isOpen: true,
      type: 'unenroll',
      data: { enrollmentId, courseName: course?.name }
    });
  };

  const confirmUnenroll = () => {
    const { enrollmentId, courseName } = confirmDialog.data;
    setEnrollments(enrollments.filter(e => e.id !== enrollmentId));
    toast.success(`Unenrolled from ${courseName} successfully!`);
  };

  const getInitials = (name) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const studentFields = [
    { name: 'name', label: 'Name', type: 'text' },
    { name: 'email', label: 'Email', type: 'email', icon: <HiMail style={{ color: 'var(--primary)' }} /> },
    { name: 'phone', label: 'Phone', type: 'tel', icon: <HiPhone style={{ color: 'var(--primary)' }} /> },
    { name: 'address', label: 'Address', type: 'text', icon: <HiLocationMarker style={{ color: 'var(--primary)' }} /> },
    { name: 'grade', label: 'Grade', type: 'select', options: ['A', 'A-', 'B+', 'B', 'B-', 'C+', 'C'] },
    { name: 'id', label: 'Student ID', type: 'text' }
  ];

  const getEnrolledCoursesContent = () => {
    if (!selectedStudent) return null;

    const studentEnrollments = enrollments.filter(e => e.studentId === selectedStudent.id);
    const enrolledCourses = studentEnrollments.map(enrollment => {
      const course = courses.find(c => c.id === enrollment.courseId);
      const teacher = course && course.teacherId ? teachers.find(t => t.id === course.teacherId) : null;
      return { enrollment, course, teacher };
    });

    return (
      <div className="enrolled-courses-section">
        <h3>Enrolled Courses ({enrolledCourses.length})</h3>
        {enrolledCourses.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-secondary)' }}>
            <HiAcademicCap style={{ fontSize: '3rem', marginBottom: '1rem', opacity: 0.5 }} />
            <p>Not enrolled in any courses yet</p>
          </div>
        ) : (
          enrolledCourses.map(({ enrollment, course, teacher }) => (
            <div key={enrollment.id} className="enrolled-course-card">
              <div className="enrolled-course-header">
                <div>
                  <h4>{course?.name || 'Unknown Course'}</h4>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                    {course?.code} • {course?.credits} Credits
                  </p>
                </div>
                <button
                  className="btn btn-danger"
                  onClick={() => handleUnenroll(enrollment.id)}
                  style={{ padding: '0.5rem 1rem' }}
                >
                  <HiX /> Unenroll
                </button>
              </div>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <span className="badge badge-primary">
                  Teacher: {teacher?.name || 'Not assigned'}
                </span>
                <span className="badge badge-warning">
                  Enrolled: {enrollment.enrolledDate}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    );
  };

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Students</h1>
        <p className="page-subtitle">Manage your student roster</p>
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <button 
          className="btn btn-primary"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? <HiX /> : <HiPlus />}
          {showForm ? 'Cancel' : 'Add Student'}
        </button>
      </div>

      {showForm && (
        <div className="form-section">
          <h2>Add New Student</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                className="form-control"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                placeholder="Enter student name"
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                className="form-control"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                placeholder="student@email.com"
              />
            </div>
            <div className="form-group">
              <label>Phone</label>
              <input
                type="tel"
                className="form-control"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                required
                placeholder="+1 234-567-8900"
              />
            </div>
            <div className="form-group">
              <label>Address</label>
              <input
                type="text"
                className="form-control"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                required
                placeholder="123 Main St, City, State"
              />
            </div>
            <div className="form-group">
              <label>Grade</label>
              <select
                className="form-control"
                value={formData.grade}
                onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
              >
                <option value="A">A</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B">B</option>
                <option value="B-">B-</option>
                <option value="C+">C+</option>
                <option value="C">C</option>
              </select>
            </div>
            <button type="submit" className="btn btn-primary">
              <HiPlus /> Add Student
            </button>
          </form>
        </div>
      )}

      {students.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">
            <HiAcademicCap />
          </div>
          <h3>No students yet</h3>
          <p>Add your first student to get started</p>
        </div>
      ) : (
        <div className="cards-grid">
          {students.map((student) => (
            <div 
              key={student.id} 
              className="card"
              onClick={() => setSelectedStudent(student)}
            >
              <div className="card-header">
                <div className="card-avatar">
                  {getInitials(student.name)}
                </div>
                <div className="card-info">
                  <h3>{student.name}</h3>
                  <p style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <HiMail style={{ fontSize: '1rem' }} />
                    {student.email}
                  </p>
                </div>
              </div>
              <div className="card-details">
                <div className="detail-row">
                  <span className="detail-label">Grade</span>
                  <span className="badge badge-success">{student.grade}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Student ID</span>
                  <span className="detail-value">#{student.id}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Enrolled Courses</span>
                  <span className="detail-value">
                    {enrollments.filter(e => e.studentId === student.id).length}
                  </span>
                </div>
              </div>
              <div style={{ marginTop: '1rem' }} onClick={(e) => e.stopPropagation()}>
                <button 
                  className="btn btn-danger"
                  onClick={() => handleDelete(student.id)}
                  style={{ width: '100%' }}
                >
                  <HiTrash /> Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedStudent && (
        <ProfileModal
          isOpen={!!selectedStudent}
          onClose={() => setSelectedStudent(null)}
          item={selectedStudent}
          onUpdate={handleUpdate}
          type="student"
          fields={studentFields}
          additionalContent={getEnrolledCoursesContent()}
        />
      )}

      <ConfirmDialog
        isOpen={confirmDialog.isOpen}
        onClose={() => setConfirmDialog({ isOpen: false, type: '', data: null })}
        onConfirm={confirmDialog.type === 'delete-student' ? confirmDelete : confirmUnenroll}
        title={confirmDialog.type === 'delete-student' ? 'Delete Student' : 'Unenroll from Course'}
        message={
          confirmDialog.type === 'delete-student'
            ? `Are you sure you want to delete ${confirmDialog.data?.name}? This action cannot be undone.`
            : `Are you sure you want to unenroll from ${confirmDialog.data?.courseName}?`
        }
        confirmText={confirmDialog.type === 'delete-student' ? 'Delete' : 'Unenroll'}
        type="danger"
      />
    </div>
  );
}

export default Students;
