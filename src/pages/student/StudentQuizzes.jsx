import React, { useState, useEffect } from "react"
import { RiArrowLeftSLine, RiArrowRightSLine, RiTimeLine, RiCheckboxCircleLine } from "react-icons/ri"
import { useNavigate } from "react-router-dom"

const quizData = {
    title: "Module 1 Assessment",
    totalQuestions: 10,
    questions: [
        {
            id: 1,
            question: "Which of the following is a key metric for Largest Contentful Paint?",
            options: [
                "Render time of the largest image or text block visible within the viewport.",
                "The time it takes for the browser to receive the first byte of data.",
                "Total cumulative score of all unexpected layout shifts during the page load.",
                "The amount of time between a user's first interaction and the response.",
            ],
            correct: 0,
        },
        {
            id: 2,
            question: "What does the acronym 'LMS' stand for in the context of education technology?",
            options: [
                "Learning Management System",
                "Learner Monitoring Software",
                "Learning Module Structure",
                "Lecture Management Suite",
            ],
            correct: 0,
        },
        {
            id: 3,
            question: "Which CSS property is used to create a flexible box layout?",
            options: [
                "display: block",
                "display: flex",
                "display: grid",
                "display: inline",
            ],
            correct: 1,
        },
        {
            id: 4,
            question: "What is the primary purpose of a REST API?",
            options: [
                "To style web pages with CSS",
                "To manage databases directly",
                "To enable communication between client and server over HTTP",
                "To compile JavaScript code",
            ],
            correct: 2,
        },
        {
            id: 5,
            question: "Which hook in React is used to manage component state?",
            options: [
                "useEffect",
                "useContext",
                "useRef",
                "useState",
            ],
            correct: 3,
        },
        {
            id: 6,
            question: "What does 'UX' stand for in design?",
            options: [
                "User Experience",
                "Universal Exchange",
                "Unified Extension",
                "User Execution",
            ],
            correct: 0,
        },
        {
            id: 7,
            question: "Which of the following is NOT a JavaScript data type?",
            options: [
                "String",
                "Boolean",
                "Float",
                "Symbol",
            ],
            correct: 2,
        },
        {
            id: 8,
            question: "What is the default port for a React development server?",
            options: [
                "8080",
                "3000",
                "5173",
                "4000",
            ],
            correct: 1,
        },
        {
            id: 9,
            question: "Which of these is a NoSQL database?",
            options: [
                "PostgreSQL",
                "MySQL",
                "MongoDB",
                "SQLite",
            ],
            correct: 2,
        },
        {
            id: 10,
            question: "What does 'API' stand for?",
            options: [
                "Application Programming Interface",
                "Automated Process Integration",
                "Applied Program Instruction",
                "Application Process Interaction",
            ],
            correct: 0,
        },
    ],
}

const TIMER_START = 12 * 60 // 12 minutes in seconds

const StudentQuizzes = () => {
        const navigate = useNavigate()
    const [currentIndex, setCurrentIndex] = useState(0)
    const [selected, setSelected] = useState({})
    const [submitted, setSubmitted] = useState(false)
    const [timeLeft, setTimeLeft] = useState(TIMER_START)

    const currentQ = quizData.questions[currentIndex]
    const totalQ = quizData.totalQuestions

    // Timer countdown
    useEffect(() => {
        if (submitted) return
        const interval = setInterval(() => {
            setTimeLeft(t => {
                if (t <= 1) { clearInterval(interval); setSubmitted(true); return 0 }
                return t - 1
            })
        }, 1000)
        return () => clearInterval(interval)
    }, [submitted])

    const formatTime = (secs) => {
        const m = String(Math.floor(secs / 60)).padStart(2, "0")
        const s = String(secs % 60).padStart(2, "0")
        return `${m}:${s}`
    }

    const progressPct = ((currentIndex + 1) / totalQ) * 100

    const handleSelect = (optionIndex) => {
        if (submitted) return
        setSelected(prev => ({ ...prev, [currentIndex]: optionIndex }))
    }

    const handleNext = () => {
        if (currentIndex < totalQ - 1) setCurrentIndex(i => i + 1)
        else setSubmitted(true)
    }

    const handlePrev = () => {
        if (currentIndex > 0) setCurrentIndex(i => i - 1)
    }

    const score = submitted
        ? quizData.questions.filter((q, i) => selected[i] === q.correct).length
        : 0

    // ── Result screen ──
    if (submitted) {
        const pct = Math.round((score / totalQ) * 100)
        const passed = pct >= 70
        return (
            <div className="flex items-center justify-center min-h-[70vh]">
                <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-10 max-w-md w-full flex flex-col items-center gap-6 text-center">
                    <div className={`w-20 h-20 rounded-full flex items-center justify-center text-4xl
            ${passed ? "bg-green-50" : "bg-red-50"}`}>
                        {passed ? "🎉" : "📚"}
                    </div>
                    <div>
                        <h2 className="text-2xl font-extrabold text-gray-900">
                            {passed ? "Congratulations!" : "Keep Practicing!"}
                        </h2>
                        <p className="text-sm text-gray-400 mt-2">
                            {passed
                                ? "You passed the assessment. Great work!"
                                : "You didn't pass this time. Review and try again."}
                        </p>
                    </div>

                    <div className={`text-5xl font-extrabold ${passed ? "text-green-500" : "text-red-500"}`}>
                        {pct}%
                    </div>

                    <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                        <div
                            className={`h-full rounded-full transition-all duration-700 ${passed ? "bg-green-500" : "bg-red-400"}`}
                            style={{ width: `${pct}%` }}
                        />
                    </div>

                    <p className="text-sm text-gray-500">
                        You answered <span className="font-bold text-gray-900">{score}</span> out of{" "}
                        <span className="font-bold text-gray-900">{totalQ}</span> questions correctly.
                    </p>

                    <div className="flex items-center gap-3 w-full">
                        <button
                            onClick={() => { setCurrentIndex(0); setSelected({}); setSubmitted(false); setTimeLeft(TIMER_START) }}
                            className="flex-1 border border-[#3525d7] text-[#3525d7] font-semibold text-sm py-3 rounded-xl hover:bg-indigo-50 transition"
                        >
                            Retry Quiz
                        </button>
                        <button 
                        onClick={() => navigate('/studentdashboard')}
                        
                        className="flex-1 bg-[#3525d7] text-white font-semibold text-sm py-3 rounded-xl hover:bg-[#2a1fb0] transition">
                            Back to Dashboard
                        </button>
                    </div>
                </div>
            </div>
        )
    }


    // ── Quiz screen ──
    return (
        <div className="flex items-start justify-center min-h-[70vh]">
            <div className="w-full max-w-2xl flex flex-col gap-6">

                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-xl font-extrabold text-gray-900">{quizData.title}</h1>
                        <p className="text-sm text-gray-400 mt-0.5">
                            Question <span className="font-bold text-[#3525d7]">{currentIndex + 1}</span> of{" "}
                            <span className="font-bold text-gray-700">{totalQ}</span>
                        </p>
                    </div>

                    {/* Timer */}
                    <div className={`flex items-center gap-2 px-4 py-2 rounded-xl border font-bold text-sm
            ${timeLeft < 60
                            ? "bg-red-50 border-red-200 text-red-500"
                            : "bg-indigo-50 border-indigo-100 text-[#3525d7]"}`}>
                        <RiTimeLine size={16} />
                        {formatTime(timeLeft)}
                    </div>
                </div>

                {/* Progress bar */}
                <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-[#3525d7] rounded-full transition-all duration-500"
                        style={{ width: `${progressPct}%` }}
                    />
                </div>

                {/* Question card */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 flex flex-col gap-6">

                    {/* Question */}
                    <h2 className="text-base font-bold text-gray-900 leading-relaxed">
                        {currentQ.question}
                    </h2>

                    {/* Options */}
                    <div className="flex flex-col gap-3">
                        {currentQ.options.map((option, i) => {
                            const isSelected = selected[currentIndex] === i
                            const label = ["A", "B", "C", "D"][i]

                            return (
                                <button
                                    key={i}
                                    onClick={() => handleSelect(i)}
                                    className={`flex items-center gap-4 w-full text-left px-5 py-4 rounded-xl border transition-all duration-200
                    ${isSelected
                                            ? "border-[#3525d7] bg-indigo-50 shadow-sm shadow-indigo-100"
                                            : "border-gray-200 hover:border-indigo-200 hover:bg-indigo-50/50"
                                        }`}
                                >
                                    <span className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 transition-all duration-200
                    ${isSelected
                                            ? "bg-[#3525d7] text-white"
                                            : "border-2 border-gray-200 text-gray-500"
                                        }`}>
                                        {label}
                                    </span>
                                    <span className={`text-sm leading-relaxed ${isSelected ? "text-[#3525d7] font-semibold" : "text-gray-600"}`}>
                                        {option}
                                    </span>
                                    {isSelected && (
                                        <RiCheckboxCircleLine size={18} className="text-[#3525d7] ml-auto shrink-0" />
                                    )}
                                </button>
                            )
                        })}
                    </div>
                </div>

                {/* Navigation */}
                <div className="flex items-center justify-between">
                    <button
                        onClick={handlePrev}
                        disabled={currentIndex === 0}
                        className="flex items-center gap-1.5 text-sm font-semibold text-gray-500 hover:text-[#3525d7] transition disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                        <RiArrowLeftSLine size={18} /> Previous
                    </button>

                    {/* Dot indicators */}
                    <div className="hidden sm:flex items-center gap-1.5">
                        {quizData.questions.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setCurrentIndex(i)}
                                className={`rounded-full transition-all duration-200
                  ${i === currentIndex
                                        ? "w-4 h-2.5 bg-[#3525d7]"
                                        : selected[i] !== undefined
                                            ? "w-2.5 h-2.5 bg-indigo-300"
                                            : "w-2.5 h-2.5 bg-gray-200"
                                    }`}
                            />
                        ))}
                    </div>

                    <button
                        onClick={handleNext}
                        disabled={selected[currentIndex] === undefined}
                        className="flex items-center gap-1.5 bg-[#3525d7] hover:bg-[#2a1fb0] transition text-white text-sm font-semibold px-6 py-2.5 rounded-xl shadow-md shadow-indigo-200 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-[#3525d7]"
                    >
                        {currentIndex === totalQ - 1 ? "Submit Quiz" : "Next Question"}
                        <RiArrowRightSLine size={18} />
                    </button>
                </div>

            </div>
        </div>
    )
}

export default StudentQuizzes