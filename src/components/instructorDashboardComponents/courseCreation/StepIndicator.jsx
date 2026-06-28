import React from "react"
import { FiCheck } from "react-icons/fi"

const StepIndicator = ({ steps, currentStep }) => {
  return (
    <div className="flex items-center w-full overflow-x-auto pb-2">
      {steps.map((label, i) => {
        const stepNum = i + 1
        const isDone = stepNum < currentStep
        const isActive = stepNum === currentStep

        return (
          <React.Fragment key={label}>
            <div className="flex flex-col items-center gap-1.5 shrink-0">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold transition
                  ${isDone ? "bg-indigo-600 text-white" : isActive ? "bg-indigo-600 text-white ring-4 ring-indigo-100" : "bg-gray-100 text-gray-400"}`}
              >
                {isDone ? <FiCheck size={14} /> : stepNum}
              </div>
              <span
                className={`text-xs font-medium whitespace-nowrap ${isActive ? "text-indigo-600" : isDone ? "text-gray-700" : "text-gray-400"}`}
              >
                {label}
              </span>
            </div>
            {stepNum !== steps.length && (
              <div className={`flex-1 h-0.5 mx-2 sm:mx-3 min-w-6 ${isDone ? "bg-indigo-600" : "bg-gray-200"}`} />
            )}
          </React.Fragment>
        )
      })}
    </div>
  )
}

export default StepIndicator