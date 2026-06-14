import React, { useState } from "react"

const slideStyle = `
  @keyframes fadeSlideLeft {
    from { opacity: 0; transform: translateX(40px); }
    to   { opacity: 1; transform: translateX(0); }
  }
  @keyframes fadeSlideRight {
    from { opacity: 0; transform: translateX(-40px); }
    to   { opacity: 1; transform: translateX(0); }
  }
  .slide-left  { animation: fadeSlideLeft  0.4s ease forwards; }
  .slide-right { animation: fadeSlideRight 0.4s ease forwards; }
`

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Senior UX Designer",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    quote:
      '"LearnFlow completely changed my career trajectory. The UI design courses are the best I\'ve found online, with actual practical takeaways."',
  },
  {
    name: "Mark Chen",
    role: "Full-stack Developer",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    quote:
      '"The mentor support here is unparalleled. I got feedback on my code within hours, which helped me land my dream job at a top tech firm."',
  },
  {
    name: "Elena Rodriguez",
    role: "Product Manager",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    quote:
      '"As a busy PM, the flexibility of LearnFlow is what I love most. The mobile app experience is flawless, allowing me to learn during my commute."',
  },
  {
    name: "James Okafor",
    role: "Data Scientist",
    avatar: "https://randomuser.me/api/portraits/men/75.jpg",
    quote:
      '"The data science curriculum is incredibly up-to-date. I applied what I learned directly to my work projects within the first week."',
  },
  {
    name: "Aisha Patel",
    role: "Frontend Engineer",
    avatar: "https://randomuser.me/api/portraits/women/21.jpg",
    quote:
      '"LearnFlow\'s structured path helped me go from beginner to job-ready in just 4 months. The community support is second to none."',
  },
]

const VISIBLE = 3

const TestimonialSection = () => {
  const [index, setIndex] = useState(0)
  const [dir, setDir] = useState("left")

  const prev = () => {
    setDir("right")
    setIndex(i => (i === 0 ? testimonials.length - VISIBLE : i - 1))
  }
  const next = () => {
    setDir("left")
    setIndex(i => (i >= testimonials.length - VISIBLE ? 0 : i + 1))
  }

  const visible = testimonials.slice(index, index + VISIBLE)

  return (
    <section className="bg-white py-20 px-6 md:px-16">
      <style>{slideStyle}</style>
      <div className="max-w-7xl mx-auto">

        {/* Header row */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-10">
          <div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-2">
              What our students say
            </h2>
            <p className="text-gray-500 text-sm md:text-base">
              Over 50,000 professionals have transformed their careers with LearnFlow.
            </p>
          </div>

          {/* Prev / Next buttons */}
          <div className="flex items-center gap-3 self-start md:self-center">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition"
            >
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
                <path d="M15 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              onClick={next}
              className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition"
            >
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
                <path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>

        {/* Cards */}
        <div key={index} className={`grid grid-cols-1 md:grid-cols-3 gap-6 ${dir === "left" ? "slide-left" : "slide-right"}`}>
          {visible.map((t, i) => (
            <div
              key={i}
              className="border border-gray-200 rounded-2xl p-6 flex flex-col gap-5 hover:shadow-md transition-shadow duration-300"
            >
              {/* Avatar + name */}
              <div className="flex items-center gap-3">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-11 h-11 rounded-full object-cover"
                />
                <div>
                  <p className="text-sm font-bold text-gray-900">{t.name}</p>
                  <p className="text-xs text-gray-400">{t.role}</p>
                </div>
              </div>

              {/* Quote */}
              <p className="text-sm text-gray-600 leading-relaxed italic">
                {t.quote}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

export default TestimonialSection