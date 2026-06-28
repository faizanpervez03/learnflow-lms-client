import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { loginUser } from "../services/auth.service"
import { useAuth } from "../context/AuthContext"
import { FiMail, FiLock } from "react-icons/fi"
import { FcGoogle } from "react-icons/fc"

function Login() {
  const navigate = useNavigate()
  const { login } = useAuth()

  const [form, setForm] = useState({ email: "", password: "" })
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const res = await loginUser(form)

      // apiRequest already unwraps response.data once,
      // so res IS the ApiResponse body -> res.data holds { user, accessToken, refreshToken }
      const { user, accessToken, refreshToken } = res.data

      login(user, accessToken, refreshToken)
     navigate(user.role === "instructor" ? "/instructordashboard" : "/studentdashboard")
    } catch (err) {
      // ApiClientError already has a clean .message
      setError(err.message || "Invalid email or password")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-200 via-gray-50 to-white flex flex-col items-center justify-center px-4">

      <div className="mb-2">
        <h2 className="text-sm font-semibold text-indigo-600 flex items-center gap-1">
          <img src="./logo1.png" className="w-28" alt="" />
        </h2>
      </div>

      <div className="text-center mb-4">
        <h1 className="text-2xl font-bold text-slate-900">Welcome back</h1>
        <p className="text-slate-500 text-sm mt-1">Please enter your details to sign in.</p>
      </div>

      <div className="w-full max-w-md bg-white border border-gray-100 rounded-xl shadow-sm p-6">
        {error && (
          <div className="mb-4 rounded-lg bg-red-50 border border-red-200 p-3 text-sm text-red-600">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Email</label>
            <div className="relative">
              <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="user@gmail.com"
                className="w-full pl-9 rounded-lg border border-slate-300 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>
          </div>

          <div className="mb-2 flex items-center justify-between">
            <label className="text-sm font-medium text-slate-700">Password</label>
            <button type="button" className="text-xs text-indigo-600 hover:underline">
              Forgot password?
            </button>
          </div>

          <div className="relative mb-5">
            <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
            <input
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              placeholder="••••••••"
              className="w-full pl-9 rounded-lg border border-slate-300 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-indigo-600 py-2.5 text-white text-sm font-medium hover:bg-indigo-700 transition disabled:opacity-70 cursor-pointer"
          >
            {loading ? "Logging in..." : "Login →"}
          </button>
        </form>

        <div className="my-5 flex items-center">
          <div className="flex-1 border-t"></div>
          <span className="px-3 text-[11px] text-slate-400 uppercase tracking-wide">Or continue with</span>
          <div className="flex-1 border-t"></div>
        </div>

        <button
          type="button"
          className="w-full border border-slate-300 rounded-lg py-2.5 text-sm font-medium hover:bg-slate-50 transition flex items-center justify-center gap-2 cursor-pointer"
        >
          <FcGoogle className="text-base" />
          Sign in with Google
        </button>
      </div>

      <p className="mt-6 text-sm text-slate-600">
        New to LearnFlow?{" "}
        <Link to="/register" className="font-semibold text-indigo-600 hover:underline">
          Create an account
        </Link>
      </p>
    </div>
  )
}

export default Login