# 🚀 Quick Start Guide

## Getting Started in 3 Steps

### 1. Install Dependencies
```bash
cd student-teacher-app
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

### 3. Open in Browser
Navigate to: **http://localhost:5173**

---

## 📱 Features Overview

### 🎨 Theme Toggle
- Click the sun/moon icon in the top-right corner
- Switch between Light (default) and Dark themes
- Your preference is saved automatically

### 👨‍🎓 Students Management
1. Click **"+ Add Student"** button
2. Fill in the form (name, email, phone, address, grade)
3. Click **"Add Student"** to save
4. **Click any student card** to view full profile
5. In profile modal:
   - View all personal information
   - Click **"Edit"** to update details
   - See all enrolled courses
   - Unenroll from courses
6. Click **"Remove"** to delete a student

### 👨‍🏫 Teachers Management
1. Click **"+ Add Teacher"** button
2. Fill in name, subject, and email
3. Click **"Add Teacher"** to save
4. Click **"Remove"** to delete a teacher

### 📚 Courses Management
1. Click **"+ Add Course"** button
2. Fill in course name, code, credits
3. Optionally assign a teacher
4. Click **"Add Course"** to save
5. Use dropdown to assign/change teacher
6. Click **"Remove"** to delete a course

### 📝 Enrollments
1. Select a student from dropdown
2. Select a course from dropdown
3. Click **"Enroll Student"**
4. View enrollments grouped by course
5. View all enrollments in table
6. Click **"Unenroll"** to remove enrollment

---

## 📱 Mobile Experience

### On Mobile Devices (< 768px width):
- **Bottom Navigation Bar**: Fixed at bottom with icons
- **Mobile Header**: Shows brand and theme toggle
- **Single Column Layout**: Cards stack vertically
- **Touch-Optimized**: Larger buttons and spacing

### To Test Mobile View:
1. Open browser DevTools (F12)
2. Click "Toggle Device Toolbar" (Ctrl+Shift+M)
3. Select a mobile device or set custom width < 768px

---

## 🔔 Notifications

All operations show toast notifications:

### Success Notifications (Green ✓)
- Student/Teacher/Course added
- Information updated
- Enrollment successful
- Teacher assigned

### Error Notifications (Red ✗)
- Duplicate enrollment attempt
- Validation errors

### Confirmation Dialogs
- Delete operations require confirmation
- Unenroll operations require confirmation

---

## 🎯 Tips & Tricks

### Student Profile
- **Click any student card** to open detailed profile
- Edit mode allows updating all information
- View enrolled courses with teacher names
- Unenroll directly from profile

### Quick Actions
- Use keyboard shortcuts: Tab to navigate, Enter to submit
- Confirmation dialogs prevent accidental deletions
- Toast notifications confirm all actions

### Theme
- Light theme: Clean neomorphic design (default)
- Dark theme: Professional dark blue theme
- Theme persists across sessions

### Responsive Design
- Desktop: Top navigation with full layout
- Tablet: Adaptive grid layout
- Mobile: Bottom navigation bar

---

## 🐛 Troubleshooting

### Blank Screen?
1. Check browser console (F12) for errors
2. Refresh page (Ctrl+R or Cmd+R)
3. Clear cache and reload (Ctrl+Shift+R)

### Notifications Not Showing?
1. Check that react-hot-toast is installed
2. Refresh the page
3. Check browser console for errors

### Theme Not Switching?
1. Clear browser's local storage
2. Refresh the page
3. Try a different browser

### More Help?
See **TROUBLESHOOTING.md** for detailed solutions

---

## 📚 Documentation

- **README.md**: Project overview and setup
- **FEATURES.md**: Complete feature list
- **TROUBLESHOOTING.md**: Detailed troubleshooting guide
- **CHANGELOG.md**: Recent updates and fixes

---

## 🎉 You're Ready!

Start by:
1. Adding a few teachers
2. Creating some courses
3. Adding students
4. Enrolling students in courses
5. Clicking student cards to view profiles

Enjoy using EduHub! 🎓
