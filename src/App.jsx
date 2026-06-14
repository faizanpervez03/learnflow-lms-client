import React from 'react'
import { Route, Routes } from 'react-router-dom'

// Layouts
import LandingLayout from './components/layout/LandingLayout'
import StudentLayout from './components/layout/StudentLayout'

// Landing pages
import Home from './pages/Home'
import Catalog from './pages/Catalog'
import Mylearning from './pages/Mylearning'
import Mentors from './pages/Mentors'
import Resources from './pages/Resources'

// Student pages
import StudentDashboard from './pages/student/StudentDashboard'
import StudentCatalog from './pages/student/studentCatalog'
import StudentMyCourses from './pages/student/StudentMyCourses'
import StudentQuizzes from './pages/student/StudentQuizzes'
import StudentProgress from './pages/student/StudentProgress'
import StudentCertificates from './pages/student/StudentCertificates'
import StudentSetting from './pages/student/StudentSetting'

const App = () => {
  return (
    <Routes>

      {/* Landing pages — Navbar + Footer */}
      <Route element={<LandingLayout />}>
        <Route path='/'           element={<Home />}       />
        <Route path='/catalog'    element={<Catalog />}    />
        <Route path='/mylearning' element={<Mylearning />} />
        <Route path='/mentors'    element={<Mentors />}    />
        <Route path='/resources'  element={<Resources />}  />
      </Route>

      {/* Student dashboard — Sidebar + Topbar only */}
        <Route path='/studentdashboard' element={<StudentLayout />}>
          <Route index element={<StudentDashboard />} />
          <Route path='dashboard' element={<StudentDashboard />} />
          <Route path='catalog' element={<StudentCatalog />} />
          <Route path='mycourses' element={<StudentMyCourses />} />
          <Route path='quizzes' element={<StudentQuizzes />} />
          <Route path='progress' element={<StudentProgress />} />
          <Route path='certificates' element={<StudentCertificates />} />
          <Route path='settings' element={<StudentSetting />} />
          
        </Route>


    </Routes>
  )
}

export default App