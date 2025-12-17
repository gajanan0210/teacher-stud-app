import { useState } from 'react';
import { HiPlus, HiX, HiTrash, HiBookOpen, HiAcademicCap } from 'react-icons/hi';
import toast from 'react-hot-toast';
import ConfirmDialog from '../components/ConfirmDialog';

function Courses({ courses, setCourses, teachers }) {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    credits: 3,
    teacherId: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const newCourse = {
      id: Date.now(),
      ...formData,
      teacherId: formData.teacherId ? parseInt(formData.teacherId) : null
    };
    setCourses([...courses, newCourse]);
    setFormData({ name: '', code: '', credits: 3, teacherId: '' });
    setShowForm(false);
    toast.success(`Course ${formData.name} added successfully!`);
  };

  const handleDelete = (id) => {
    const course = courses.find(c => c.id === id);
    if (window.confirm(`Are you sure you want to delete ${course?.name}?`)) {
      setCourses(courses.filter(c => c.id !== id));
      toast.success(`Course ${course?.name} deleted successfully!`);
    }
  };

  const handleAssignTeacher = (courseId, teacherId) => {
    const course = courses.find(c => c.id === courseId);
    const teacher = teachers.find(t => t.id === parseInt(teacherId));
    setCourses(courses.map(c => 
      c.id === courseId 
        ? { ...c, teacherId: teacherId ? parseInt(teacherId) : null }
        : c
    ));
    if (teacherId) {
      toast.success(`${teacher?.name} assigned to ${course?.name}!`);
    } else {
      toast.success(`Teacher removed from ${course?.name}!`);
    }
  };

  const getTeacherName = (teacherId) => {
    const teacher = teachers.find(t => t.id === teacherId);
    return teacher ? teacher.name : 'Not Assigned';
  };

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Courses</h1>
        <p className="page-subtitle">Manage courses and assign teachers</p>
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <button 
          className="btn btn-primary"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? <HiX /> : <HiPlus />}
          {showForm ? 'Cancel' : 'Add Course'}
        </button>
      </div>

      {showForm && (
        <div className="form-section">
          <h2>Add New Course</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Course Name</label>
              <input
                type="text"
                className="form-control"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                placeholder="e.g., Advanced Mathematics"
              />
            </div>
            <div className="form-group">
              <label>Course Code</label>
              <input
                type="text"
                className="form-control"
                value={formData.code}
                onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                required
                placeholder="e.g., MATH301"
              />
            </div>
            <div className="form-group">
              <label>Credits</label>
              <input
                type="number"
                className="form-control"
                value={formData.credits}
                onChange={(e) => setFormData({ ...formData, credits: parseInt(e.target.value) })}
                required
                min="1"
                max="6"
              />
            </div>
            <div className="form-group">
              <label>Assign Teacher (Optional)</label>
              <select
                className="form-control"
                value={formData.teacherId}
                onChange={(e) => setFormData({ ...formData, teacherId: e.target.value })}
              >
                <option value="">Select a teacher</option>
                {teachers.map(teacher => (
                  <option key={teacher.id} value={teacher.id}>
                    {teacher.name} - {teacher.subject}
                  </option>
                ))}
              </select>
            </div>
            <button type="submit" className="btn btn-primary">
              <HiPlus /> Add Course
            </button>
          </form>
        </div>
      )}

      {courses.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">
            <HiBookOpen />
          </div>
          <h3>No courses yet</h3>
          <p>Add your first course to get started</p>
        </div>
      ) : (
        <div className="cards-grid">
          {courses.map((course) => (
            <div key={course.id} className="card">
              <div className="card-header">
                <div className="card-avatar">
                  <HiBookOpen />
                </div>
                <div className="card-info">
                  <h3>{course.name}</h3>
                  <p>{course.code}</p>
                </div>
              </div>
              <div className="card-details">
                <div className="detail-row">
                  <span className="detail-label">Credits</span>
                  <span className="badge badge-warning">{course.credits}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Teacher</span>
                  <span className="detail-value" style={{ fontSize: '0.9rem' }}>
                    {getTeacherName(course.teacherId)}
                  </span>
                </div>
              </div>
              <div style={{ marginTop: '1rem' }}>
                <div className="form-group" style={{ marginBottom: '0.75rem' }}>
                  <label style={{ fontSize: '0.9rem' }}>Assign/Change Teacher</label>
                  <select
                    className="form-control"
                    value={course.teacherId || ''}
                    onChange={(e) => handleAssignTeacher(course.id, e.target.value)}
                  >
                    <option value="">No teacher assigned</option>
                    {teachers.map(teacher => (
                      <option key={teacher.id} value={teacher.id}>
                        {teacher.name}
                      </option>
                    ))}
                  </select>
                </div>
                <button 
                  className="btn btn-danger"
                  onClick={() => handleDelete(course.id)}
                  style={{ width: '100%' }}
                >
                  <HiTrash /> Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Courses;
