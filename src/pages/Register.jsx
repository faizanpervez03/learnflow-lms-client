import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { registerUser } from "../services/auth.service"
import { useAuth } from "../context/AuthContext"
import { FcGoogle } from "react-icons/fc"

function Register() {
  const navigate = useNavigate()
  const { login } = useAuth()

  const [form, setForm] = useState({ fullName: "", email: "", password: "" })
  const [agreed, setAgreed] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")

    if (!agreed) {
      setError("Please agree to the Terms of Service and Privacy Policy")
      return
    }

    setLoading(true)

    try {
      const res = await registerUser(form)

      // apiRequest already unwraps response.data once,
      // so res IS the ApiResponse body -> res.data holds { user, accessToken, refreshToken }
      const { user, accessToken, refreshToken } = res.data

      login(user, accessToken, refreshToken)
      navigate("/studentdashboard")
    } catch (err) {
    console.log("FULL ERROR OBJECT:", err)
    console.log("ERROR MESSAGE:", err.message)
    console.log("ERROR ERRORS ARRAY:", err.errors)
    console.log("ERROR STATUS CODE:", err.statusCode)

    setError(err.message || "Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-200 via-gray-50 to-white flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-md bg-white border border-gray-100 rounded-xl shadow-sm p-6 mt-4 mb-4">

        <div className="text-center mb-5">
          <h2 className="text-sm font-semibold text-indigo-600 flex items-center justify-center gap-1 mb-4">
            <img src="./logo1.png" className="w-28" alt="" />
          </h2>
          <h1 className="text-xl font-bold text-slate-900">Create your account</h1>
          <p className="text-indigo-500 text-xs mt-1">Join the professional learning community</p>
        </div>

        {error && (
          <div className="mb-4 rounded-lg bg-red-50 border border-red-200 p-3 text-sm text-red-600">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              placeholder="Full Name"
              className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="user@gmail.com"
              className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
              minLength={8}
            />
          </div>

          <label className="flex items-start gap-2 text-xs text-slate-500">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="mt-0.5 cursor-pointer"
            />
            <span>
              I agree to the{" "}
              <Link to="/terms" className="text-indigo-600 font-medium hover:underline">Terms of Service</Link>{" "}
              and{" "}
              <Link to="/privacy" className="text-indigo-600 font-medium hover:underline">Privacy Policy</Link>.
            </span>
          </label>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-2.5 rounded-lg text-sm font-medium hover:bg-indigo-700 transition disabled:opacity-70 cursor-pointer"
          >
            {loading ? "Creating Account..." : "Sign Up"}
          </button>
        </form>

        <div className="my-5 flex items-center">
          <div className="flex-1 border-t"></div>
          <span className="px-3 text-[11px] text-slate-400 uppercase tracking-wide">or continue with</span>
          <div className="flex-1 border-t"></div>
        </div>

        <button
          type="button"
          className="w-full border border-slate-300 rounded-lg py-2.5 text-sm font-medium hover:bg-slate-50 transition flex items-center justify-center gap-2 cursor-pointer"
        >
          <FcGoogle className="text-base" />
          Google
        </button>

        <p className="text-center text-sm mt-6 text-slate-600">
          Already have an account?{" "}
          <Link to="/login" className="text-indigo-600 font-medium hover:underline">Log in</Link>
        </p>
      </div>
    </div>
  )
}

export default Register