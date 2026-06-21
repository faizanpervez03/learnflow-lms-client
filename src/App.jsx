import React from 'react'
import { Route, Routes } from 'react-router-dom'

// Layouts
import LandingLayout from './components/layout/LandingLayout'
import StudentLayout from './components/layout/StudentLayout'
import InstructorLayout from './components/layout/InstructorLayout'

// Landing pages
import Home from './pages/Home'
import Catalog from './pages/Catalog'
import Mylearning from './pages/Mylearning'
import Mentors from './pages/Mentors'
import Resources from './pages/Resources'
import CourseDetail from './pages/CourseDetail'
import Login from './pages/Login'
import Register from './pages/Register'
import BecomeInstructor from './pages/BecomeInstructor'

// Student pages
import StudentDashboard from './pages/student/StudentDashboard'
import StudentCatalog from './pages/student/StudentCatalog'
import StudentMyCourses from './pages/student/StudentMyCourses'
import StudentQuizzes from './pages/student/StudentQuizzes'
import StudentProgress from './pages/student/StudentProgress'
import StudentCertificates from './pages/student/StudentCertificates'
import StudentSetting from './pages/student/StudentSetting'
import StudentVideoLesson from './pages/student/StudentVideoLesson'

// Instructor pages
import InstructorDashboard from './pages/instructuor/InstructorDashboard'

// Routing
import ProtectedRoute from './routes/ProtectedRoute'

const App = () => {
  return (
    <Routes>

      {/* Landing pages — Navbar + Footer */}
      <Route element={<LandingLayout />}>
        <Route path='/' element={<Home />} />
        <Route path='/catalog' element={<Catalog />} />
        <Route path='/mylearning' element={<Mylearning />} />
        <Route path='/mentors' element={<Mentors />} />
        <Route path='/resources' element={<Resources />} />
        <Route path='/coursedetail' element={<CourseDetail />} />
        <Route path='/coursedetail/:id' element={<CourseDetail />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Route>

      {/* Student dashboard — restricted to role: student */}
      <Route path='/studentdashboard' element={
        <ProtectedRoute allowedRoles={["student"]}>
          <StudentLayout />
        </ProtectedRoute>
      }>
        <Route index element={<StudentDashboard />} />
        <Route path='dashboard' element={<StudentDashboard />} />
        <Route path='catalog' element={<StudentCatalog />} />
        <Route path='mycourses' element={<StudentMyCourses />} />
        <Route path='quizzes' element={<StudentQuizzes />} />
        <Route path='progress' element={<StudentProgress />} />
        <Route path='certificates' element={<StudentCertificates />} />
        <Route path='settings' element={<StudentSetting />} />
        <Route path='lesson/:id' element={<StudentVideoLesson />} />
      </Route>

      {/* Instructor dashboard — restricted to role: instructor */}
      <Route path='/instructordashboard' element={
        <ProtectedRoute allowedRoles={["instructor"]}>
          <InstructorLayout />
        </ProtectedRoute>
      }>
        <Route index element={<InstructorDashboard />} />
        <Route path='dashboard' element={<InstructorDashboard />} />
      </Route>

      {/* Become Instructor — any logged-in student can apply */}
      <Route path='/become-instructor' element={
        <ProtectedRoute allowedRoles={["student"]}>
          <BecomeInstructor />
        </ProtectedRoute>
      } />

    </Routes>
  )
}

export default App