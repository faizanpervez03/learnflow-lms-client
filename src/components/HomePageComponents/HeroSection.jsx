import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

const courses = [
    { name: "Character Creation", done: true },
    { name: "Vehicle Draw", done: false },
    { name: "Architectural Stylization", done: false },
]

const progress = [
    { name: "Great Artist Mastery", value: 85 },
    { name: "Foundational Animation", value: 70 },
    { name: "Natural Body Creation", value: 0, empty: true },
]

const HeroSection = () => {
    const [float, setFloat] = useState(false)

    useEffect(() => {
        const interval = setInterval(() => setFloat(f => !f), 1800)
        return () => clearInterval(interval)
    }, [])

    const navigate = useNavigate()

    return (
        <section className="min-h-screen bg-[#f3f3f8] flex items-center overflow-hidden px-6 md:px-16 py-16">
            <div className="max-w-7xl mx-auto w-full flex flex-col md:flex-row items-center gap-16">

                {/* LEFT */}
                <div className="flex-1 flex flex-col gap-6">
                    <span className="flex items-center gap-2 text-xs font-semibold bg-gray-300 w-50 py-1 px-1
                     rounded-xl text-[#3525d7] tracking-widest uppercase">
                        <span className="w-2 h-2 rounded-full bg-[#3525d7] inline-block"></span>
                        New Courses Available
                    </span>

                    <h1 className="lg:text-4xl font-extrabold text-gray-900 leading-tight">
                        Learn Without Limits
                    </h1>

                    <p className="text-gray-500 text-base md:text-lg  leading-relaxed">
                        Unlock your potential with expert-led courses designed for the modern professional.
                        Access world-class education from anywhere, at any time.
                    </p>

                    <div className="flex items-center gap-6 mt-2">
                        <button className="bg-[#3525d7] hover:bg-[#2a1fb0] transition-all text-white font-semibold px-7 py-3 rounded-lg text-sm shadow-lg shadow-indigo-300 pointer cursor-pointer">
                            Get Started Free
                        </button>
                        <button className="text-gray-700 font-semibold text-sm flex items-center gap-1 hover:text-[#3525d7] transition cursor-pointer" 
                        onClick={() => navigate("/catalog")}
                        >
                            See Courses <span className="text-lg">→</span>
                        </button>
                    </div>
                </div>

                {/* RIGHT */}
                <div className="flex-1 flex justify-center relative">

                    {/* Floating badge - top right, animated up/down */}
                    <div
                        className="absolute   top-2 right-24 sm:-top-8 md:-right-14 z-20 flex items-center gap-3 bg-white  rounded-lg shadow-xl px-4 py-3 transition-all duration-[1800ms] ease-in-out"
                        style={{ transform: float ? "translateY(-10px)" : "translateY(0px)" }}
                    >
                        <div className="w-9 h-9 rounded-xl bg-indigo-100 flex items-center justify-center text-[#3525d7]">
                            <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                                    fill="#3525d7" />
                            </svg>
                        </div>
                        <div>
                            <p className="text-xs font-bold text-gray-800">Course Completed</p>
                            <p className="text-xs text-gray-400">UX Design Fundamentals</p>
                        </div>
                    </div>

                    {/* Main card */}
                    <div className="bg-gray-200 border border-white border-4 rounded-lg    w-xl flex justify-center items-center pb-6">
                        <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-sm mt-8">

                            {/* Card header */}
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-sm font-bold text-gray-800">Courses</span>
                                <div className="w-6 h-6 grid grid-cols-2 gap-0.5 opacity-40">
                                    <span className="bg-gray-600 rounded-sm"></span>
                                    <span className="bg-gray-600 rounded-sm"></span>
                                    <span className="bg-gray-600 rounded-sm"></span>
                                    <span className="bg-gray-600 rounded-sm"></span>
                                </div>
                            </div>

                            {/* Course list */}
                            <div className="space-y-3 mb-5">
                                {courses.map((c, i) => (
                                    <div key={i} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                                        <span className={`text-sm ${c.done ? "text-gray-800 font-medium" : "text-gray-400"}`}>
                                            {c.name}
                                        </span>
                                        {c.done ? (
                                            <span className="w-5 h-5 rounded-full bg-[#3525d7] flex items-center justify-center">
                                                <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                                                    <path d="M2 6l3 3 5-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            </span>
                                        ) : (
                                            <span className="w-5 h-5 rounded-full border-2 border-gray-200"></span>
                                        )}
                                    </div>
                                ))}
                            </div>

                            {/* Progress bars */}
                            <div className="space-y-4">
                                {progress.map((p, i) => (
                                    <div key={i}>
                                        <div className="flex items-center justify-between mb-1">
                                            <span className="text-xs text-gray-500">{p.name}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="flex-1 h-2.5 bg-gray-100 rounded-full overflow-hidden">
                                                <div
                                                    className="h-full rounded-full bg-gradient-to-r from-[#3525d7] to-[#6c5ce7] transition-all duration-700"
                                                    style={{ width: `${p.value}%` }}
                                                ></div>
                                            </div>
                                            {p.value > 0 && (
                                                <span className="w-5 h-5 rounded-full bg-[#3525d7] flex items-center justify-center flex-shrink-0">
                                                    <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                                                        <path d="M2 6l3 3 5-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                    </svg>
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>

                        </div>
                    </div>
                </div>

            </div>
        </section>
    )
}

export default HeroSection