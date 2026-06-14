import React, { useState, useRef } from "react"
import {
  RiDownloadLine,
  RiShareLine,
  RiLinkedinBoxFill,
  RiAwardLine,
  RiCheckboxCircleLine,
  RiArrowLeftLine,
  RiCloseLine,
  RiFileCopyLine,
} from "react-icons/ri"

const certificates = [
  {
    id: "LF-8820-UIX",
    course: "Advanced UI Design",
    instructor: "Sarah Chen",
    date: "October 24, 2025",
    student: "Faizan Pervez",
  },
  {
    id: "LF-4421-WEB",
    course: "Full-Stack Web Dev with Next.js 14",
    instructor: "Jordan Jenkins",
    date: "August 10, 2025",
    student: "Faizan Pervez",
  },
  {
    id: "LF-3310-PYT",
    course: "Python for Data Science",
    instructor: "Alex Kim",
    date: "June 5, 2026",
    student: "Faizan Pervez",
  },
]

// Certificate SVG component — renders the actual certificate
const CertificateCard = ({ cert, forwardRef }) => (
  <div
    ref={forwardRef}
    className="bg-white rounded-2xl border-2 border-gray-100 shadow-sm overflow-hidden"
    style={{ fontFamily: "Georgia, serif" }}
  >
    {/* Top indigo bar */}
    <div className="h-2 bg-[#3525d7] w-full" />

    <div className="px-10 py-10 flex flex-col items-center text-center gap-4">

      {/* Logo */}
      <div className="flex items-center gap-2">
        <RiAwardLine size={18} className="text-[#3525d7]" />
        <span style={{ fontFamily: "sans-serif" }} className="text-sm font-extrabold text-[#3525d7] tracking-widest">
          LearnFlow
        </span>
      </div>

      {/* Certificate of Completion */}
      <div className="flex flex-col items-center gap-1 mt-2">
        <p style={{ fontFamily: "sans-serif" }} className="text-[10px] font-semibold tracking-[0.25em] text-gray-400 uppercase">
          Certificate of Completion
        </p>
        <p style={{ fontFamily: "sans-serif" }} className="text-xs text-gray-400">
          This is to certify that
        </p>
      </div>

      {/* Student name */}
      <h1 className="text-4xl font-bold text-gray-900 mt-1" style={{ fontFamily: "Georgia, serif" }}>
        {cert.student}
      </h1>

      {/* Body text */}
      <p style={{ fontFamily: "sans-serif" }} className="text-xs text-gray-500 max-w-xs leading-relaxed">
        has successfully completed the online professional course
      </p>

      {/* Course name */}
      <p className="text-base font-bold text-[#3525d7]">{cert.course}</p>

      {/* Divider */}
      <div className="w-24 h-px bg-gray-200 my-2" />

      {/* Footer row */}
      <div className="w-full flex items-end justify-between mt-2">
        {/* Date issued */}
        <div className="text-left">
          <p style={{ fontFamily: "sans-serif" }} className="text-[9px] text-gray-400 uppercase tracking-widest font-semibold">
            Date Issued
          </p>
          <p style={{ fontFamily: "sans-serif" }} className="text-xs font-semibold text-gray-700 mt-0.5">
            {cert.date}
          </p>
        </div>

        {/* Instructor signature */}
        <div className="text-center">
          <p className="text-base font-bold text-gray-700" style={{ fontFamily: "'Dancing Script', cursive, Georgia, serif" }}>
            {cert.instructor}
          </p>
          <div className="h-px bg-gray-300 mt-1 mb-1" />
          <p style={{ fontFamily: "sans-serif" }} className="text-[9px] text-gray-400 uppercase tracking-widest font-semibold">
            Course Instructor
          </p>
        </div>

        {/* Certificate ID */}
        <div className="text-right">
          <p style={{ fontFamily: "sans-serif" }} className="text-[9px] text-gray-400">
            ID/ {cert.id}
          </p>
        </div>
      </div>

    </div>

    {/* Bottom indigo bar */}
    <div className="h-1 bg-[#3525d7] w-full" />
  </div>
)

const StudentCertificates = () => {
  const [selected, setSelected] = useState(null)
  const [copied, setCopied] = useState(false)
  const [shareOpen, setShareOpen] = useState(false)
  const certRef = useRef(null)

  const cert = selected !== null ? certificates[selected] : null

  // Download as PDF using browser print
  const handleDownload = () => {
    const printContent = certRef.current?.innerHTML
    if (!printContent) return
    const win = window.open("", "_blank")
    win.document.write(`
      <html>
        <head>
          <title>Certificate - ${cert.course}</title>
          <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body { font-family: Georgia, serif; background: white; }
            .cert { padding: 60px; border: 2px solid #e5e7eb; max-width: 800px; margin: auto; }
            .bar-top { height: 8px; background: #3525d7; }
            .bar-bottom { height: 4px; background: #3525d7; }
            .inner { padding: 50px 60px; display: flex; flex-direction: column; align-items: center; text-align: center; gap: 16px; }
            .logo { display: flex; align-items: center; gap: 8px; color: #3525d7; font-size: 14px; font-family: sans-serif; font-weight: 800; letter-spacing: 3px; }
            .label { font-family: sans-serif; font-size: 10px; letter-spacing: 4px; color: #9ca3af; text-transform: uppercase; }
            .student-name { font-size: 48px; font-weight: bold; color: #111827; margin: 8px 0; }
            .course { font-size: 16px; font-weight: bold; color: #3525d7; }
            .divider { width: 80px; height: 1px; background: #e5e7eb; margin: 8px 0; }
            .footer { width: 100%; display: flex; justify-content: space-between; align-items: flex-end; margin-top: 16px; font-family: sans-serif; }
            .footer-label { font-size: 9px; color: #9ca3af; text-transform: uppercase; letter-spacing: 2px; }
            .footer-value { font-size: 12px; font-weight: 600; color: #374151; margin-top: 2px; }
            .signature { font-size: 18px; font-style: italic; font-weight: bold; color: #374151; }
          </style>
        </head>
        <body>
          <div class="cert">
            <div class="bar-top"></div>
            <div class="inner">
              <div class="logo">⭐ LearnFlow</div>
              <div>
                <div class="label">Certificate of Completion</div>
                <div style="font-size:12px;color:#9ca3af;margin-top:4px;">This is to certify that</div>
              </div>
              <div class="student-name">${cert.student}</div>
              <div style="font-size:12px;color:#6b7280;">has successfully completed the online professional course</div>
              <div class="course">${cert.course}</div>
              <div class="divider"></div>
              <div class="footer">
                <div>
                  <div class="footer-label">Date Issued</div>
                  <div class="footer-value">${cert.date}</div>
                </div>
                <div style="text-align:center;">
                  <div class="signature">${cert.instructor}</div>
                  <div style="height:1px;background:#d1d5db;margin:4px 0;"></div>
                  <div class="footer-label">Course Instructor</div>
                </div>
                <div style="text-align:right;">
                  <div class="footer-label">ID/ ${cert.id}</div>
                </div>
              </div>
            </div>
            <div class="bar-bottom"></div>
          </div>
        </body>
      </html>
    `)
    win.document.close()
    win.focus()
    setTimeout(() => { win.print(); win.close() }, 300)
  }

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`https://learnflow.app/certificate/${cert?.id}`)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleLinkedIn = () => {
    const url = `https://www.linkedin.com/profile/add?startTask=CERTIFICATION_NAME&name=${encodeURIComponent(cert?.course)}&organizationName=LearnFlow&issueYear=2023&certUrl=${encodeURIComponent(`https://learnflow.app/certificate/${cert?.id}`)}`
    window.open(url, "_blank")
  }

  // ── Certificate viewer ──
  if (selected !== null && cert) {
    return (
      <div className="flex flex-col gap-6 max-w-2xl mx-auto">

        {/* Back button */}
        <button
          onClick={() => { setSelected(null); setShareOpen(false) }}
          className="flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-[#3525d7] transition self-start"
        >
          <RiArrowLeftLine size={16} /> Back to Certificates
        </button>

        {/* Certificate */}
        <CertificateCard cert={cert} forwardRef={certRef} />

        {/* Action buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleDownload}
            className="flex-1 flex items-center justify-center gap-2 bg-[#3525d7] hover:bg-[#2a1fb0] transition text-white text-sm font-semibold py-3 rounded-xl shadow-md shadow-indigo-200"
          >
            <RiDownloadLine size={16} /> Download PDF
          </button>
          <button
            onClick={() => setShareOpen(o => !o)}
            className="flex-1 flex items-center justify-center gap-2 border border-gray-200 hover:border-[#3525d7] hover:text-[#3525d7] text-gray-600 text-sm font-semibold py-3 rounded-xl transition"
          >
            <RiShareLine size={16} /> Share
          </button>
        </div>

        {/* Share panel */}
        {shareOpen && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <p className="text-sm font-bold text-gray-900">Share Certificate</p>
              <button onClick={() => setShareOpen(false)} className="text-gray-400 hover:text-gray-600">
                <RiCloseLine size={18} />
              </button>
            </div>

            {/* Copy link */}
            <div className="flex items-center gap-2 bg-gray-50 rounded-xl px-4 py-3 border border-gray-100">
              <p className="text-xs text-gray-400 flex-1 truncate">
                https://learnflow.app/certificate/{cert.id}
              </p>
              <button
                onClick={handleCopyLink}
                className="flex items-center gap-1.5 text-xs font-bold text-[#3525d7] hover:text-[#2a1fb0] transition shrink-0"
              >
                {copied ? <RiCheckboxCircleLine size={14} /> : <RiFileCopyLine size={14} />}
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>

            {/* LinkedIn */}
            <button
              onClick={handleLinkedIn}
              className="flex items-center justify-center gap-2 bg-[#0077b5] hover:bg-[#006097] transition text-white text-sm font-semibold py-3 rounded-xl"
            >
              <RiLinkedinBoxFill size={18} /> Add to LinkedIn
            </button>

            <p className="text-xs text-gray-400 text-center">
              Add this achievement to your professional profile
            </p>
          </div>
        )}

      </div>
    )
  }

  // ── Certificates list ──
  return (
    <div className="flex flex-col gap-6">

      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-gray-900">My Certificates</h1>
        <p className="text-sm text-gray-400 mt-1">
          {certificates.length} certificates earned — keep learning to earn more.
        </p>
      </div>

      {/* Cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {certificates.map((cert, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300 cursor-pointer group"
            onClick={() => setSelected(i)}
          >
            {/* Top bar */}
            <div className="h-1.5 bg-[#3525d7]" />

            <div className="p-6 flex flex-col gap-4">
              {/* Icon */}
              <div className="w-11 h-11 rounded-xl bg-indigo-50 flex items-center justify-center">
                <RiAwardLine size={22} className="text-[#3525d7]" />
              </div>

              {/* Info */}
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-bold text-[#3525d7] uppercase tracking-widest">Certificate of Completion</span>
                <h3 className="text-sm font-bold text-gray-900 leading-snug">{cert.course}</h3>
                <p className="text-xs text-gray-400">{cert.instructor}</p>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                <div>
                  <p className="text-[10px] text-gray-400 uppercase tracking-wide font-semibold">Issued</p>
                  <p className="text-xs font-semibold text-gray-700 mt-0.5">{cert.date}</p>
                </div>
                <span className="text-[10px] text-gray-400">ID/ {cert.id}</span>
              </div>

              {/* View button */}
              <button className="w-full bg-indigo-50 hover:bg-[#3525d7] hover:text-white text-[#3525d7] text-xs font-bold py-2.5 rounded-xl transition-all duration-200 group-hover:bg-[#3525d7] group-hover:text-white">
                View Certificate
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  )
}

export default StudentCertificates