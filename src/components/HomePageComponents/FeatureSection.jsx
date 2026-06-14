import React from "react"

const features = [
    {
        icon: (
            <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
                <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"
                    fill="#3525d7" />
            </svg>
        ),
        title: "Expert-Led",
        desc: "Learn directly from industry leaders who have built world class products and systems at top companies.",
    },
    {
        icon: (
            <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
                <rect x="3" y="4" width="18" height="16" rx="2" stroke="#3525d7" strokeWidth="2" />
                <path d="M3 9h18" stroke="#3525d7" strokeWidth="2" />
                <path d="M8 2v4M16 2v4" stroke="#3525d7" strokeWidth="2" strokeLinecap="round" />
                <path d="M7 13h4M7 16h6" stroke="#3525d7" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
        ),
        title: "Flexible Learning",
        desc: "Our modular course structure allows you to learn at your own pace, on any device, whenever you have time.",
    },
    {
        icon: (
            <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="9" stroke="#3525d7" strokeWidth="2" />
                <path d="M2 12h20M12 2c-3 3-4 6-4 10s1 7 4 10M12 2c3 3 4 6 4 10s-1 7-4 10"
                    stroke="#3525d7" strokeWidth="2" strokeLinecap="round" />
            </svg>
        ),
        title: "Global Community",
        desc: "Connect with thousands of learners worldwide. Share insights, collaborate on projects, and grow your network.",
    },
]

const FeaturesSection = () => {
    return (
        <section className="bg-[#f0effa] py-20 px-6 md:px-16">
            <div className="w-full mx-auto flex flex-col items-center gap-14">

                {/* Heading */}
                <div className="text-center max-w-xl">
                    <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-3">
                        Everything you need to grow
                    </h2>
                    <p className="text-gray-500 text-sm md:text-base leading-relaxed">
                        Focus on mastering new skills while we handle the complexity of tracking and
                        curriculum management.
                    </p>
                </div>

                {/* Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
                    {features.map((f, i) => (
                        <div
                            key={i}
                            className="bg-white rounded-xl p-8 flex flex-col gap-8 shadow-sm hover:shadow-md transition-shadow duration-300 border border-2 border-gray-400 " 
                        >
                            {/* Icon box */}
                            <div className="w-11 h-11 rounded-xl bg-indigo-50 flex items-center justify-center">
                                {f.icon}
                            </div>

                            <div className="flex flex-col gap-2">
                                <h3 className="text-base font-bold text-gray-900">{f.title}</h3>
                                <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    )
}

export default FeaturesSection