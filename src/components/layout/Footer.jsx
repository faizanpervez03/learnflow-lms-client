import React from "react"
import { Link } from "react-router-dom"

const footerLinks = [
  {
    heading: "Platform",
    links: ["Catalog", "Mentors", "Pricing", "Certifications"],
  },
  {
    heading: "Company",
    links: ["About Us", "Careers", "Blog", "Support"],
  },
  {
    heading: "Legal",
    links: ["Privacy Policy", "Terms of Service", "Cookie Policy", "Contact"],
  },
]

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200">

      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-6 md:px-16 py-14 grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* Brand column */}
        <div className="flex flex-col gap-4">
          
          <Link to="/" className="text-xl font-extrabold text-gray-900 -mt-2">
            <img src="/logo1.png" className="w-32" alt="" />
          </Link>
          <p className="text-sm text-gray-400 leading-relaxed max-w-50">
            Building the world's most accessible and effective learning platform for the next generation of tech talent.
          </p>
        </div>

        {/* Link columns */}
        {footerLinks.map((col, i) => (
          <div key={i} className="flex flex-col gap-4">
            <h4 className="text-sm font-bold text-gray-900">{col.heading}</h4>
            <ul className="flex flex-col gap-3">
              {col.links.map((link, j) => (
                <li key={j}>
                  <Link
                    to="#"
                    className="text-sm text-gray-500 hover:text-[#3525d7] transition-colors duration-200"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-100 px-6 md:px-16 py-5 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-xs text-gray-400">
          © 2024 LearnFlow LMS. All rights reserved.
        </p>

        {/* Icons */}
        <div className="flex items-center gap-4">
          {/* Globe */}
          <button className="text-gray-400 hover:text-[#3525d7] transition-colors duration-200">
            <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
              <path d="M2 12h20M12 2c-3 3-4 6-4 10s1 7 4 10M12 2c3 3 4 6 4 10s-1 7-4 10"
                stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </button>

          {/* People / Community */}
          <button className="text-gray-400 hover:text-[#3525d7] transition-colors duration-200">
            <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="1.8" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </button>

          {/* Mail */}
          <button className="text-gray-400 hover:text-[#3525d7] transition-colors duration-200">
            <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
              <rect x="2" y="4" width="20" height="16" rx="2" stroke="currentColor" strokeWidth="1.8" />
              <path d="M2 7l10 7 10-7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </div>

    </footer>
  )
}

export default Footer