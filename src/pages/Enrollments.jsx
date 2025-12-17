import { useState } from 'react';
import { HiCheckCircle, HiX, HiClipboardList } from 'react-icons/hi';
import toast from 'react-hot-toast';

function Enrollments({ enrollments, setEnrollments, students, courses, teachers }) {
  const [formData, setFormData] = useState({
    studentId: '',
    courseId: ''
  });

  const handleEnroll = (e) => {
    e.preventDefault();
    
    const alreadyEnrolled = enrollments.some(
      e => e.studentId === parseInt(formData.studentId) && 
           e.courseId === parseInt(formData.courseId)
    );

    if (alreadyEnrolled) {
      toast.error('Student is already enrolled in this course!');
      return;
    }

    const student = students.find(s => s.id === parseInt(formData.studentId));
    const course = courses.find(c => c.id === parseInt(formData.courseId));

    const newEnrollment = {
      id: Date.now(),
      studentId: parseInt(formData.studentId),
      courseId: parseInt(formData.courseId),
      enrolledDate: new Date().toLocaleDateString()
    };

    setEnrollments([...enrollments, newEnrollment]);
    setFormData({ studentId: '', courseId: '' });
    toast.success(`${student?.name} enrolled in ${course?.name} successfully!`);
  };

  const handleUnenroll = (id) => {
    const enrollment = enrollments.find(e => e.id === id);
    const student = students.find(s => s.id === enrollment?.studentId);
    const course = courses.find(c => c.id === enrollment?.courseId);
    
    setEnrollments(enrollments.filter(e => e.id !== id));
    toast.success(`${student?.name} unenrolled from ${course?.name}!`);
  };

  const getStudentName = (studentId) => {
    const student = students.find(s => s.id === studentId);
    return student ? student.name : 'Unknown';
  };

  const getStudentInitials = (studentId) => {
    const student = students.find(s => s.id === studentId);
    if (!student) return '?';
    return student.name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const getCourseName = (courseId) => {
    const course = courses.find(c => c.id === courseId);
    return course ? course.name : 'Unknown';
  };

  const getCourseCode = (courseId) => {
    const course = courses.find(c => c.id === courseId);
    return course ? course.code : 'N/A';
  };

  const getTeacherName = (courseId) => {
    const course = courses.find(c => c.id === courseId);
    if (!course || !course.teacherId) return 'No teacher assigned';
    const teacher = teachers.find(t => t.id === course.teacherId);
    return teacher ? teacher.name : 'Unknown';
  };

  const getEnrollmentsByCourse = () => {
    const grouped = {};
    enrollments.forEach(enrollment => {
      if (!grouped[enrollment.courseId]) {
        grouped[enrollment.courseId] = [];
      }
      grouped[enrollment.courseId].push(enrollment);
    });
    return grouped;
  };

  const enrollmentsByCourse = getEnrollmentsByCourse();

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Enrollments</h1>
        <p className="page-subtitle">Enroll students in courses and view enrollment details</p>
      </div>

      <div className="form-section">
        <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <HiClipboardList /> Enroll Student in Course
        </h2>
        <form onSubmit={handleEnroll}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label>Select Student</label>
              <select
                className="form-control"
                value={formData.studentId}
                onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
                required
              >
                <option value="">Choose a student</option>
                {students.map(student => (
                  <option key={student.id} value={student.id}>
                    {student.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Select Course</label>
              <select
                className="form-control"
                value={formData.courseId}
                onChange={(e) => setFormData({ ...formData, courseId: e.target.value })}
                required
              >
                <option value="">Choose a course</option>
                {courses.map(course => (
                  <option key={course.id} value={course.id}>
                    {course.code} - {course.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <button type="submit" className="btn btn-primary">
            <HiCheckCircle /> Enroll Student
          </button>
        </form>
      </div>

      {enrollments.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">
            <HiClipboardList />
          </div>
          <h3>No enrollments yet</h3>
          <p>Start enrolling students in courses</p>
        </div>
      ) : (
        <>
          <div style={{ marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '1.75rem', marginBottom: '1rem', fontWeight: '700' }}>
              Enrollments by Course
            </h2>
            {Object.keys(enrollmentsByCourse).length === 0 ? (
              <p style={{ color: 'var(--text-secondary)' }}>No enrollments to display</p>
            ) : (
              Object.keys(enrollmentsByCourse).map(courseId => {
                const courseEnrollments = enrollmentsByCourse[courseId];
                return (
                  <div key={courseId} className="form-section" style={{ marginBottom: '1.5rem' }}>
                    <div style={{ marginBottom: '1.5rem' }}>
                      <h3 style={{ fontSize: '1.5rem', marginBottom: '0.75rem', fontWeight: '700' }}>
                        {getCourseName(parseInt(courseId))}
                      </h3>
                      <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                        <span className="badge badge-primary">{getCourseCode(parseInt(courseId))}</span>
                        <span className="badge badge-warning">
                          {getTeacherName(parseInt(courseId))}
                        </span>
                        <span className="badge badge-success">
                          {courseEnrollments.length} student{courseEnrollments.length !== 1 ? 's' : ''}
                        </span>
                      </div>
                    </div>
                    <div className="table-container">
                      <table className="table">
                        <thead>
                          <tr>
                            <th>Student</th>
                            <th>Enrolled Date</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {courseEnrollments.map(enrollment => (
                            <tr key={enrollment.id}>
                              <td>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                  <div style={{
                                    width: '40px',
                                    height: '40px',
                                    borderRadius: '10px',
                                    backgroundColor: 'var(--primary)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: 'white',
                                    fontWeight: '700',
                                    fontSize: '0.9rem'
                                  }}>
                                    {getStudentInitials(enrollment.studentId)}
                                  </div>
                                  <span style={{ color: 'var(--text-primary)', fontWeight: '600' }}>
                                    {getStudentName(enrollment.studentId)}
                                  </span>
                                </div>
                              </td>
                              <td>{enrollment.enrolledDate}</td>
                              <td>
                                <button
                                  className="btn btn-danger"
                                  onClick={() => handleUnenroll(enrollment.id)}
                                  style={{ padding: '0.5rem 1rem' }}
                                >
                                  <HiX /> Unenroll
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          <div>
            <h2 style={{ fontSize: '1.75rem', marginBottom: '1rem', fontWeight: '700' }}>
              All Enrollments
            </h2>
            <div className="table-container">
              <table className="table">
                <thead>
                  <tr>
                    <th>Student</th>
                    <th>Course</th>
                    <th>Teacher</th>
                    <th>Enrolled Date</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {enrollments.map(enrollment => (
                    <tr key={enrollment.id}>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                          <div style={{
                            width: '40px',
                            height: '40px',
                            borderRadius: '10px',
                            backgroundColor: 'var(--primary)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                            fontWeight: '700',
                            fontSize: '0.9rem'
                          }}>
                            {getStudentInitials(enrollment.studentId)}
                          </div>
                          <span style={{ color: 'var(--text-primary)', fontWeight: '600' }}>
                            {getStudentName(enrollment.studentId)}
                          </span>
                        </div>
                      </td>
                      <td>
                        <div>
                          <div style={{ color: 'var(--text-primary)', fontWeight: '600' }}>
                            {getCourseName(enrollment.courseId)}
                          </div>
                          <div style={{ fontSize: '0.85rem' }}>
                            {getCourseCode(enrollment.courseId)}
                          </div>
                        </div>
                      </td>
                      <td>{getTeacherName(enrollment.courseId)}</td>
                      <td>{enrollment.enrolledDate}</td>
                      <td>
                        <button
                          className="btn btn-danger"
                          onClick={() => handleUnenroll(enrollment.id)}
                          style={{ padding: '0.5rem 1rem' }}
                        >
                          <HiX /> Unenroll
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Enrollments;
