import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { becomeInstructor } from "../services/user.service"
import { useAuth } from "../context/AuthContext"

const BecomeInstructor = () => {
    const navigate = useNavigate()
    const { login } = useAuth()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    const handleApply = async () => {
  setError("")
  setLoading(true)
  try {
    const res = await becomeInstructor()
    const updatedUser = res.data.user

    const accessToken = localStorage.getItem("accessToken")
    const refreshToken = localStorage.getItem("refreshToken")

    localStorage.setItem("accessToken", accessToken)
    localStorage.setItem("refreshToken", refreshToken)
    localStorage.setItem("user", JSON.stringify(updatedUser))

    window.location.href = "/instructordashboard"
  } catch (err) {
    setError(err.message || "Something went wrong")
    setLoading(false)
  }
}
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="max-w-md w-full bg-white rounded-2xl border border-gray-100 p-8 text-center">
                <h1 className="text-xl font-bold text-gray-900 mb-2">Become an Instructor</h1>
                <p className="text-sm text-gray-500 mb-6">
                    Share your knowledge with thousands of students. Create courses, track earnings, and grow your teaching brand on LearnFlow.
                </p>

                {error && (
                    <div className="mb-4 text-sm text-red-600 bg-red-50 border border-red-100 rounded-md px-3 py-2">
                        {error}
                    </div>
                )}

                <button
                    onClick={handleApply}
                    disabled={loading}
                    className="w-full bg-indigo-600 text-white py-2.5 rounded-lg text-sm font-medium hover:bg-indigo-700 transition disabled:opacity-60 cursor-pointer"
                >
                    {loading ? "Processing..." : "Apply to Teach"}
                </button>
            </div>
        </div>
    )
}

export default BecomeInstructor