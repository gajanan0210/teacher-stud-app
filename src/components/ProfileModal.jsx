import { useState } from 'react';
import { HiX, HiPencil } from 'react-icons/hi';
import toast from 'react-hot-toast';

function ProfileModal({ 
  isOpen, 
  onClose, 
  item, 
  onUpdate, 
  type, // 'student', 'teacher', or 'course'
  fields,
  additionalContent 
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({ ...item });

  if (!isOpen) return null;

  const getInitials = (name) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const handleSave = () => {
    onUpdate(editData);
    setIsEditing(false);
    toast.success(`${type.charAt(0).toUpperCase() + type.slice(1)} updated successfully!`);
  };

  const getTitle = () => {
    switch(type) {
      case 'student': return 'Student Profile';
      case 'teacher': return 'Teacher Profile';
      case 'course': return 'Course Details';
      default: return 'Profile';
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <h2 style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>{getTitle()}</h2>
            <p style={{ color: 'var(--text-secondary)' }}>View and manage information</p>
          </div>
          <button className="modal-close" onClick={onClose}>
            <HiX />
          </button>
        </div>
        
        <div className="modal-body">
          <div className="profile-header">
            <div className="profile-avatar-large">
              {type === 'course' ? '📚' : getInitials(item.name)}
            </div>
            <div className="profile-info">
              <h2>{item.name}</h2>
              {item.email && (
                <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>
                  {item.email}
                </p>
              )}
              {item.code && (
                <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>
                  {item.code}
                </p>
              )}
            </div>
          </div>

          <div style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ fontSize: '1.5rem', color: 'var(--text-primary)' }}>Information</h3>
            <button 
              className="btn btn-secondary"
              onClick={() => isEditing ? handleSave() : setIsEditing(true)}
            >
              {isEditing ? <><HiX /> Cancel</> : <><HiPencil /> Edit</>}
            </button>
          </div>

          {isEditing ? (
            <div className="form-section" style={{ marginBottom: '2rem' }}>
              {fields.map(field => (
                <div key={field.name} className="form-group">
                  <label>{field.label}</label>
                  {field.type === 'select' ? (
                    <select
                      className="form-control"
                      value={editData[field.name]}
                      onChange={(e) => setEditData({ ...editData, [field.name]: e.target.value })}
                    >
                      {field.options.map(opt => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  ) : field.type === 'number' ? (
                    <input
                      type="number"
                      className="form-control"
                      value={editData[field.name]}
                      onChange={(e) => setEditData({ ...editData, [field.name]: parseInt(e.target.value) })}
                      min={field.min}
                      max={field.max}
                    />
                  ) : (
                    <input
                      type={field.type || 'text'}
                      className="form-control"
                      value={editData[field.name]}
                      onChange={(e) => setEditData({ ...editData, [field.name]: e.target.value })}
                    />
                  )}
                </div>
              ))}
              <button className="btn btn-primary" onClick={handleSave}>
                Save Changes
              </button>
            </div>
          ) : (
            <div className="profile-details-grid">
              {fields.map(field => (
                <div key={field.name} className="profile-detail-item">
                  <label>{field.label}</label>
                  <div className="value">
                    {field.icon && <span style={{ marginRight: '0.5rem' }}>{field.icon}</span>}
                    {item[field.name]}
                  </div>
                </div>
              ))}
            </div>
          )}

          {additionalContent}
        </div>
      </div>
    </div>
  );
}

export default ProfileModal;
