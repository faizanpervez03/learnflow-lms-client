import React from "react"
import { Link } from "react-router-dom"

const DashboardFooter = () => {
    return (
        <footer className="border-t border-gray-100 bg-white py-4 flex flex-col sm:flex-row items-center justify-between gap-3  px-6 mt-6">

            {/* Logo */}
            <span className="text-sm font-extrabold text-gray-900">
                <img src="./logo1.png" className="w-24" alt="" />
            </span>

            {/* Copyright */}
            <p className="text-xs text-gray-400">
                © 2024 LearnFlow LMS. All rights reserved.
            </p>

            {/* Links */}
            <div className="flex items-center gap-5">
                <Link to="#" className="text-xs text-gray-400 hover:text-[#3525d7] transition">
                    Privacy Policy
                </Link>
                <Link to="#" className="text-xs text-gray-400 hover:text-[#3525d7] transition">
                    Terms of Service
                </Link>
                <Link to="#" className="text-xs text-gray-400 hover:text-[#3525d7] transition">
                    Support
                </Link>
            </div>

        </footer>
    )
}

export default DashboardFooter