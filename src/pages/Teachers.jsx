import { useState } from 'react';
import { HiPlus, HiX, HiTrash, HiMail, HiUserGroup } from 'react-icons/hi';
import toast from 'react-hot-toast';
import ConfirmDialog from '../components/ConfirmDialog';
import ProfileModal from '../components/ProfileModal';

function Teachers({ teachers, setTeachers }) {
  const [showForm, setShowForm] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, data: null });
  const [formData, setFormData] = useState({
    name: '',
    subject: '',
    email: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTeacher = {
      id: Date.now(),
      ...formData
    };
    setTeachers([...teachers, newTeacher]);
    setFormData({ name: '', subject: '', email: '' });
    setShowForm(false);
    toast.success(`Teacher ${formData.name} added successfully!`);
  };

  const handleDelete = (id) => {
    const teacher = teachers.find(t => t.id === id);
    setConfirmDialog({
      isOpen: true,
      data: { id, name: teacher?.name }
    });
  };

  const confirmDelete = () => {
    const { id, name } = confirmDialog.data;
    setTeachers(teachers.filter(t => t.id !== id));
    toast.success(`Teacher ${name} deleted successfully!`);
  };

  const handleUpdate = (updatedTeacher) => {
    setTeachers(teachers.map(t => t.id === updatedTeacher.id ? updatedTeacher : t));
    setSelectedTeacher(updatedTeacher);
  };

  const getInitials = (name) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const teacherFields = [
    { name: 'name', label: 'Name', type: 'text' },
    { name: 'email', label: 'Email', type: 'email', icon: <HiMail style={{ color: 'var(--primary)' }} /> },
    { name: 'subject', label: 'Subject', type: 'text' },
    { name: 'id', label: 'Teacher ID', type: 'text' }
  ];

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Teachers</h1>
        <p className="page-subtitle">Manage your teaching staff</p>
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <button 
          className="btn btn-primary"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? <HiX /> : <HiPlus />}
          {showForm ? 'Cancel' : 'Add Teacher'}
        </button>
      </div>

      {showForm && (
        <div className="form-section">
          <h2>Add New Teacher</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                className="form-control"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                placeholder="Enter teacher name"
              />
            </div>
            <div className="form-group">
              <label>Subject</label>
              <input
                type="text"
                className="form-control"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                required
                placeholder="e.g., Mathematics, Physics"
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
                placeholder="teacher@edu.com"
              />
            </div>
            <button type="submit" className="btn btn-primary">
              <HiPlus /> Add Teacher
            </button>
          </form>
        </div>
      )}

      {teachers.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">
            <HiUserGroup />
          </div>
          <h3>No teachers yet</h3>
          <p>Add your first teacher to get started</p>
        </div>
      ) : (
        <div className="cards-grid">
          {teachers.map((teacher) => (
            <div 
              key={teacher.id} 
              className="card"
              onClick={() => setSelectedTeacher(teacher)}
            >
              <div className="card-header">
                <div className="card-avatar">
                  {getInitials(teacher.name)}
                </div>
                <div className="card-info">
                  <h3>{teacher.name}</h3>
                  <p style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <HiMail style={{ fontSize: '1rem' }} />
                    {teacher.email}
                  </p>
                </div>
              </div>
              <div className="card-details">
                <div className="detail-row">
                  <span className="detail-label">Subject</span>
                  <span className="badge badge-primary">{teacher.subject}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Teacher ID</span>
                  <span className="detail-value">#{teacher.id}</span>
                </div>
              </div>
              <div style={{ marginTop: '1rem' }} onClick={(e) => e.stopPropagation()}>
                <button 
                  className="btn btn-danger"
                  onClick={() => handleDelete(teacher.id)}
                  style={{ width: '100%' }}
                >
                  <HiTrash /> Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedTeacher && (
        <ProfileModal
          isOpen={!!selectedTeacher}
          onClose={() => setSelectedTeacher(null)}
          item={selectedTeacher}
          onUpdate={handleUpdate}
          type="teacher"
          fields={teacherFields}
        />
      )}

      <ConfirmDialog
        isOpen={confirmDialog.isOpen}
        onClose={() => setConfirmDialog({ isOpen: false, data: null })}
        onConfirm={confirmDelete}
        title="Delete Teacher"
        message={`Are you sure you want to delete ${confirmDialog.data?.name}? This action cannot be undone.`}
        confirmText="Delete"
        type="danger"
      />
    </div>
  );
}

export default Teachers;
