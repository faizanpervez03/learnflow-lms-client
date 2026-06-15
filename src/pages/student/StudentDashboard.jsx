import React from "react"
import ContinueLearning from "../../components/studentDashboardComponents/ContinueLearning"
import EnrolledCourses from "../../components/studentDashboardComponents/EnrolledCourses"
import DayStreak from "../../components/studentDashboardComponents/DayStreak"
import UpcomingQuiz from "../../components/studentDashboardComponents/UpcomingQuiz"
import ConnectMentors from "../../components/studentDashboardComponents/ConnectMentors"


const StudentDashboard = () => {
  return (
    <div className="flex flex-col gap-6">

      {/* Greeting */}
      <div>
        <h1 className="text-2xl font-extrabold text-gray-900">
          Good morning, Faizan 👋
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