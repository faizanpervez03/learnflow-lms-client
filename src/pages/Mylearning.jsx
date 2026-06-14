import React, { useState } from "react"
import { Link } from "react-router-dom"
import {
  RiCodeSSlashLine,
  RiPenNibLine,
  RiBarChartBoxLine,
  RiSmartphoneLine,
  RiCloudLine,
  RiShieldKeyholeLine,
  RiCompassLine,
  RiBookOpenLine,
  RiToolsLine,
  RiAwardLine,
  RiAddLine,
  RiSubtractLine,
  RiArrowRightLine,
  RiGroupLine,
  RiStarLine,
  RiTimeLine,
} from "react-icons/ri"

const stats = [
  { value: "50K+", label: "Active Learners" },
  { value: "1,200+", label: "Expert Courses" },
  { value: "98%", label: "Satisfaction Rate" },
  { value: "40+", label: "Career Paths" },
]

const paths = [
  {
    icon: RiCodeSSlashLine,
    title: "Web Development",
    desc: "Master frontend, backend, and full-stack development with real-world projects.",
    courses: 120,
    color: "bg-blue-50 border-blue-100",
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
  },
  {
    icon: RiPenNibLine,
    title: "UI/UX Design",
    desc: "Learn design thinking, Figma, prototyping, and user research from industry pros.",
    courses: 85,
    color: "bg-purple-50 border-purple-100",
    iconBg: "bg-purple-100",
    iconColor: "text-purple-600",
  },
  {
    icon: RiBarChartBoxLine,
    title: "Data Science",
    desc: "From Python basics to machine learning — build models that solve real problems.",
    courses: 95,
    color: "bg-green-50 border-green-100",
    iconBg: "bg-green-100",
    iconColor: "text-green-600",
  },
  {
    icon: RiSmartphoneLine,
    title: "Mobile Development",
    desc: "Build iOS and Android apps using React Native, Flutter, and Swift.",
    courses: 70,
    color: "bg-orange-50 border-orange-100",
    iconBg: "bg-orange-100",
    iconColor: "text-orange-600",
  },
  {
    icon: RiCloudLine,
    title: "Cloud & DevOps",
    desc: "AWS, Docker, Kubernetes — deploy and scale apps like a pro engineer.",
    courses: 60,
    color: "bg-cyan-50 border-cyan-100",
    iconBg: "bg-cyan-100",
    iconColor: "text-cyan-600",
  },
  {
    icon: RiShieldKeyholeLine,
    title: "Cybersecurity",
    desc: "Ethical hacking, penetration testing, and security fundamentals.",
    courses: 45,
    color: "bg-red-50 border-red-100",
    iconBg: "bg-red-100",
    iconColor: "text-red-600",
  },
]

const howItWorks = [
  {
    step: "01",
    icon: RiCompassLine,
    title: "Choose Your Path",
    desc: "Browse 1,200+ courses across 40+ career paths. Filter by skill level, topic, or duration.",
  },
  {
    step: "02",
    icon: RiBookOpenLine,
    title: "Learn at Your Pace",
    desc: "Watch lessons on any device, pause and resume anytime. No deadlines, no pressure.",
  },
  {
    step: "03",
    icon: RiToolsLine,
    title: "Practice & Build",
    desc: "Complete hands-on projects, quizzes, and coding challenges to solidify your skills.",
  },
  {
    step: "04",
    icon: RiAwardLine,
    title: "Get Certified",
    desc: "Earn verified certificates to showcase your skills to employers worldwide.",
  },
]

const testimonials = [
  {
    name: "Aisha Kamara",
    role: "Frontend Developer at Stripe",
    avatar: "https://randomuser.me/api/portraits/women/32.jpg",
    quote: "LearnFlow took me from zero coding knowledge to a full-time developer job in 8 months. The structured paths are incredible.",
  },
  {
    name: "David Osei",
    role: "Product Designer at Figma",
    avatar: "https://randomuser.me/api/portraits/men/45.jpg",
    quote: "The UI/UX path is the most comprehensive I've found. The mentor feedback on my projects was a game changer.",
  },
  {
    name: "Priya Mehta",
    role: "Data Scientist at Google",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    quote: "I switched careers from finance to data science in 6 months. The projects here are what made my portfolio stand out.",
  },
]

const faqs = [
  { q: "Do I need prior experience to start?", a: "No. Every path starts from the absolute basics and gradually builds up to advanced topics." },
  { q: "Can I access courses on mobile?", a: "Yes. LearnFlow is fully responsive and we have iOS and Android apps for learning on the go." },
  { q: "What happens after I complete a course?", a: "You earn a verified certificate that you can add to your LinkedIn and share with employers." },
  { q: "Is there a free plan?", a: "Yes! The free plan gives access to 10 introductory courses. Upgrade to Pro for unlimited access." },
]

const Mylearning = () => {
  const [openFaq, setOpenFaq] = useState(null)

  return (
    <div className="bg-white">

      {/* ── HERO ── */}
      <section className="bg-[#f0effa] py-20 px-6 md:px-16 overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">

          {/* Left */}
          <div className="flex-1 flex flex-col gap-6">
            <span className="inline-flex items-center gap-2 text-xs font-bold text-[#3525d7] tracking-widest uppercase">
              <span className="w-2 h-2 rounded-full bg-[#3525d7]" />
              Your Learning Journey Starts Here
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight">
              Learn Skills That <br />
              <span className="text-[#3525d7]">Actually Matter</span>
            </h1>
            <p className="text-gray-500 text-lg max-w-lg leading-relaxed">
              Access 1,200+ expert-led courses, follow structured career paths, and build a portfolio that gets you hired.
            </p>
            <div className="flex items-center gap-4 flex-wrap">
              <Link
                to="/catalog"
                className="bg-[#3525d7] hover:bg-[#2a1fb0] transition text-white font-bold px-8 py-3.5 rounded-xl shadow-lg shadow-indigo-200"
              >
                Browse Courses
              </Link>
              <Link
                to="/catalog"
                className="text-gray-700 font-semibold text-sm flex items-center gap-1.5 hover:text-[#3525d7] transition"
              >
                View Learning Paths <RiArrowRightLine size={14} />
              </Link>
            </div>
          </div>

          {/* Right — stats grid */}
          <div className="flex-1 grid grid-cols-2 gap-4 w-full max-w-sm">
            {stats.map((s, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 shadow-sm flex flex-col gap-1">
                <span className="text-3xl font-extrabold text-[#3525d7]">{s.value}</span>
                <span className="text-xs text-gray-500 font-medium">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CAREER PATHS ── */}
      <section className="py-20 px-6 md:px-16 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-3">
              Explore Career Paths
            </h2>
            <p className="text-gray-400 text-base max-w-xl mx-auto">
              Structured paths designed by industry experts to take you from beginner to job-ready.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {paths.map((path, i) => {
              const Icon = path.icon
              return (
              <div
                key={i}
                className={`border rounded-2xl p-6 flex flex-col gap-4 cursor-pointer hover:shadow-md transition-shadow duration-300 ${path.color}`}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${path.iconBg}`}>
                  <Icon size={22} className={path.iconColor} />
                </div>
                <div>
                  <h3 className="text-base font-bold text-gray-900 mb-1">{path.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{path.desc}</p>
                </div>
                <div className="flex items-center justify-between mt-auto pt-2 border-t border-white/60">
                  <span className="text-xs text-gray-400">{path.courses} courses</span>
                  <span className="flex items-center gap-1 text-xs font-bold text-[#3525d7]">
                    Explore <RiArrowRightLine size={12} />
                  </span>
                </div>
              </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="py-20 px-6 md:px-16 bg-[#f0effa]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-3">
              How LearnFlow Works
            </h2>
            <p className="text-gray-400 text-base max-w-xl mx-auto">
              Four simple steps to go from where you are to where you want to be.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {howItWorks.map((step, i) => {
              const Icon = step.icon
              return (
              <div key={i} className="bg-white rounded-2xl p-6 flex flex-col gap-4 shadow-sm relative overflow-hidden">
                <span className="text-6xl font-extrabold text-indigo-50 absolute -top-2 -right-2 select-none">
                  {step.step}
                </span>
                <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center">
                  <Icon size={20} className="text-[#3525d7]" />
                </div>
                <span className="text-xs font-extrabold text-[#3525d7]">{step.step}</span>
                <h3 className="text-base font-bold text-gray-900">{step.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{step.desc}</p>
              </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-20 px-6 md:px-16 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-3">
              Learners Who Made It
            </h2>
            <p className="text-gray-400 text-base">
              Real stories from real people who transformed their careers with LearnFlow.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className="border border-gray-100 rounded-2xl p-6 flex flex-col gap-5 hover:shadow-md transition-shadow duration-300">
                <div className="flex items-center gap-3">
                  <img src={t.avatar} alt={t.name} className="w-11 h-11 rounded-full object-cover" />
                  <div>
                    <p className="text-sm font-bold text-gray-900">{t.name}</p>
                    <p className="text-xs text-gray-400">{t.role}</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed italic">"{t.quote}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-20 px-6 md:px-16 bg-[#f0effa]">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-3">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-400 text-base">Everything you need to know before getting started.</p>
          </div>

          <div className="flex flex-col gap-3">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl border border-gray-100 overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-4 text-left"
                >
                  <span className="text-sm font-bold text-gray-900">{faq.q}</span>
                  {openFaq === i
                    ? <RiSubtractLine size={18} className="text-[#3525d7] shrink-0" />
                    : <RiAddLine size={18} className="text-[#3525d7] shrink-0" />
                  }
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-4">
                    <p className="text-sm text-gray-500 leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 px-6 md:px-16 bg-[#3525d7]">
        <div className="max-w-3xl mx-auto text-center flex flex-col gap-6">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white leading-tight">
            Ready to Start Learning?
          </h2>
          <p className="text-indigo-200 text-base leading-relaxed">
            Join 50,000+ learners already building their future with LearnFlow. Free to start, no credit card required.
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Link
              to="/catalog"
              className="bg-white text-[#3525d7] font-bold px-8 py-3.5 rounded-xl hover:bg-indigo-50 transition shadow-lg"
            >
              Get Started Free
            </Link>
            <Link
              to="/catalog"
              className="border border-white/40 text-white font-semibold px-8 py-3.5 rounded-xl hover:bg-white/10 transition"
            >
              Browse Courses
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}

export default Mylearning