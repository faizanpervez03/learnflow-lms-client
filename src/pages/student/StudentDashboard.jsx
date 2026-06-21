import React from "react"
import ContinueLearning from "../../components/studentDashboardComponents/ContinueLearning"
import EnrolledCourses from "../../components/studentDashboardComponents/EnrolledCourses"
import DayStreak from "../../components/studentDashboardComponents/DayStreak"
import UpcomingQuiz from "../../components/studentDashboardComponents/UpcomingQuiz"
import ConnectMentors from "../../components/studentDashboardComponents/ConnectMentors"
import { useAuth } from "../../context/AuthContext"

const StudentDashboard = () => {
  const { user } = useAuth()

  const firstName = user?.name?.split(" ")[0] || "Student"

  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return "Good morning"
    if (hour < 17) return "Good afternoon"
    return "Good evening"
  }

  return (
    <div className="flex flex-col gap-6">

      {/* Greeting */}
      <div>
        <h1 className="text-2xl font-extrabold text-gray-900">
          {getGreeting()}, {firstName} 👋
        </h1>
        <p className="text-sm text-gray-400 mt-1">
          You've completed 12% of your weekly goal. Keep it up!
        </p>
      </div>

      {/* Main grid — left content + right widgets */}
      <div className="flex flex-col lg:flex-row gap-6">

        {/* LEFT — main content */}
        <div className="flex flex-col gap-6 flex-1 min-w-0">
          <ContinueLearning />
          <EnrolledCourses />
        </div>

        {/* RIGHT — widgets */}
        <div className="flex flex-col gap-5 w-full lg:w-[280px] flex-shrink-0">
          <DayStreak />
          <UpcomingQuiz />
          <ConnectMentors />
        </div>

      </div>

    </div>
  )
}

export default StudentDashboard