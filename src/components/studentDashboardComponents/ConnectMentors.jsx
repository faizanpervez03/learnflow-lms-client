import React from "react"
import { FiArrowRight } from "react-icons/fi"
import { useNavigate } from "react-router-dom"

const mentors = [
  {
    name: "Sara Chen",
    role: "UI/UX Designer",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    online: true,
  },
  {
    name: "James Kirk",
    role: "Frontend Dev",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    online: true,
  },
  {
    name: "Mia Lopez",
    role: "Product Manager",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    online: false,
  },
]

const ConnectMentors = () => {
  const navigate = useNavigate()

  return (
    <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">

      {/* Header */}
      <div className="flex items-center justify-between mb-1">
        <span className="text-sm font-bold text-gray-900">Connect with Mentors</span>
        <span className="text-lg">🎓</span>
      </div>

      <p className="text-xs text-gray-400 leading-relaxed mb-4">
        Get live feedback on your projects from top designers.
      </p>

      {/* Mentor list */}
      <div className="flex flex-col gap-3">
        {mentors.map((mentor, i) => (
          <div key={i} className="flex items-center gap-3">
            {/* Avatar with online dot */}
            <div className="relative flex-shrink-0">
              <img
                src={mentor.avatar}
                alt={mentor.name}
                className="w-8 h-8 rounded-full object-cover"
              />
              <span className={`absolute bottom-0 right-0 w-2 h-2 rounded-full border-2 border-white
                ${mentor.online ? "bg-green-500" : "bg-gray-300"}`}
              />
            </div>

            {/* Name + role */}
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-gray-900 truncate">{mentor.name}</p>
              <p className="text-[10px] text-gray-400 truncate">{mentor.role}</p>
            </div>

            {/* Online badge */}
            <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full flex-shrink-0
              ${mentor.online
                ? "bg-green-50 text-green-600"
                : "bg-gray-100 text-gray-400"
              }`}
            >
              {mentor.online ? "Online" : "Away"}
            </span>
          </div>
        ))}
      </div>

      {/* Browse button */}
      <button
        onClick={() => navigate("/mentors")}
        className="mt-4 flex items-center gap-1.5 text-xs font-bold text-[#3525d7] hover:underline transition"
      >
        Browse Mentors <FiArrowRight size={12} />
      </button>

    </div>
  )
}

export default ConnectMentors