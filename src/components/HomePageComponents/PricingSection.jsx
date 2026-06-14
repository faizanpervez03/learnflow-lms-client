import React, { useState } from "react"

const plans = [
  {
    name: "Free",
    desc: "Perfect for beginners exploring new fields.",
    price: "0",
    period: "/month",
    features: [
      "Access to 10 introductory courses",
      "Community forum access",
      "Basic course materials",
    ],
    cta: "Get Started",
    popular: false,
    ctaStyle: "border border-[#3525d7] text-[#3525d7] hover:bg-indigo-50",
  },
  {
    name: "Pro",
    desc: "For professionals serious about mastering skills.",
    price: "29",
    period: "/month",
    features: [
      "Unlimited course access",
      "Direct mentor communication",
      "Verified certificates",
      "Offline viewing",
    ],
    cta: "Start 7-Day Free Trial",
    popular: true,
    ctaStyle: "bg-[#3525d7] text-white hover:bg-[#2a1fb0]",
  },
  {
    name: "Team",
    desc: "Scale learning across your entire organization.",
    price: "99",
    period: "/month",
    features: [
      "Everything in Pro",
      "Team analytics dashboard",
      "Dedicated account manager",
    ],
    cta: "Contact Sales",
    popular: false,
    ctaStyle: "border border-[#3525d7] text-[#3525d7] hover:bg-indigo-50",
  },
]

const CheckIcon = ({ filled }) => (
  <span className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${filled ? "bg-[#3525d7]" : "border-2 border-[#3525d7]"}`}>
    <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
      <path d="M2 6l3 3 5-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </span>
)

const PricingSection = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null)

  return (
    <section className="bg-[#f0effa] py-20 px-6 md:px-16">
      <div className="max-w-5xl mx-auto flex flex-col items-center gap-12">

        {/* Heading */}
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-3">
            Simple, transparent pricing
          </h2>
          <p className="text-gray-500 text-sm md:text-base">
            Choose the plan that's right for your career goals.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full items-stretch">
          {plans.map((plan, i) => {
            const isActive = hoveredIndex === i

            return (
              <div
                key={i}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={`relative bg-white rounded-2xl p-7 flex flex-col gap-6 cursor-pointer
                  
                  ${isActive
                    ? "border-2 border-[#3525d7] shadow-xl"
                    : "border border-gray-200 shadow-sm"
                  }`}
              >

                {/* Most Popular badge — show on active too */}
                {plan.popular && !isActive && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="bg-[#3525d7] text-white text-xs font-semibold px-4 py-1.5 rounded-full whitespace-nowrap">
                      Most Popular
                    </span>
                  </div>
                )}

                {/* Plan name + desc */}
                <div className="mt-2">
                  <h3 className="text-lg font-bold text-gray-900">{plan.name}</h3>
                  <p className="text-sm text-gray-400 mt-1">{plan.desc}</p>
                </div>

                {/* Price */}
                <div className="flex items-end gap-1">
                  <span className="text-4xl font-extrabold text-gray-900">${plan.price}</span>
                  <span className="text-sm text-gray-400 mb-1">{plan.period}</span>
                </div>

                {/* Features */}
                <ul className="flex flex-col gap-3">
                  {plan.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-3 text-sm text-gray-600">
                      <CheckIcon filled={isActive} />
                      {f}
                    </li>
                  ))}
                </ul>

                {/* CTA — solid blue when active, outlined when not */}
                <button
                  className={`w-full py-3 rounded-xl text-sm font-semibold transition-all duration-200 mt-auto
                    ${isActive
                      ? "bg-[#3525d7] text-white hover:bg-[#2a1fb0]"
                      : "border border-[#3525d7] text-[#3525d7] hover:bg-indigo-50"
                    }`}
                >
                  {plan.cta}
                </button>

              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}

export default PricingSection