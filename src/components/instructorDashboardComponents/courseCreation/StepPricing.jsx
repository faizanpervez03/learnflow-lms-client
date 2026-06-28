import React, { useState } from "react"
import { FiCheck, FiDollarSign, FiGift, FiPlus, FiX } from "react-icons/fi"
import { updatePricing } from "../../../services/course.service"

const StepPricing = ({ course, onNext, onBack }) => {
  const initial = course.pricing || { type: "free", currency: "USD", amount: 0, valueProps: [], earlyBirdDiscount: { enabled: false, percentage: 0 } }
  const [type, setType] = useState(initial.type)
  const [currency, setCurrency] = useState(initial.currency)
  const [amount, setAmount] = useState(initial.amount)
  const [valueProps, setValueProps] = useState(initial.valueProps?.length ? initial.valueProps : ["Lifetime access"])
  const [earlyBird, setEarlyBird] = useState(initial.earlyBirdDiscount?.enabled || false)
  const [discountPct, setDiscountPct] = useState(initial.earlyBirdDiscount?.percentage || 0)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const updateProp = (i, value) => setValueProps(valueProps.map((p, idx) => (idx === i ? value : p)))
  const addProp = () => setValueProps([...valueProps, ""])
  const removeProp = (i) => setValueProps(valueProps.filter((_, idx) => idx !== i))

  const saveStep = async ({ advance }) => {
    setError("")
    if (type === "paid" && Number(amount) <= 0) {
      setError("Set an amount greater than 0 for a paid course")
      return
    }
    setLoading(true)
    try {
      const pricing = {
        type,
        currency,
        amount: type === "free" ? 0 : Number(amount),
        valueProps: valueProps.filter((p) => p.trim() !== ""),
        earlyBirdDiscount: { enabled: earlyBird, percentage: earlyBird ? Number(discountPct) : 0 },
      }
      const res = await updatePricing(course._id, pricing)
      if (advance) onNext(res.data)
    } catch (err) {
      setError(err.message || "Failed to save pricing")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-4 sm:p-6 flex flex-col gap-5">
      <div>
        <h2 className="text-lg font-bold text-gray-900">Set Course Pricing</h2>
        <p className="text-sm text-gray-400 mt-0.5">Define how much students will pay and what they get in return.</p>
      </div>

      {error && (
        <div className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-4 py-3">{error}</div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="flex flex-col gap-4">
          <label className="text-sm font-semibold text-gray-700">Choose Pricing Model</label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setType("free")}
              className={`text-left p-3 rounded-xl border-2 transition cursor-pointer ${type === "free" ? "border-indigo-500 bg-indigo-50" : "border-gray-100"}`}
            >
              <span className="text-xs font-semibold text-gray-800">Free</span>
              <p className="text-xs text-gray-400 mt-1">Great for lead generation and building audience.</p>
            </button>
            <button
              type="button"
              onClick={() => setType("paid")}
              className={`text-left p-3 rounded-xl border-2 transition cursor-pointer ${type === "paid" ? "border-indigo-500 bg-indigo-50" : "border-gray-100"}`}
            >
              <span className="text-xs font-semibold text-gray-800">Paid</span>
              <p className="text-xs text-gray-400 mt-1">Monetize your expertise with a one-time payment.</p>
            </button>
          </div>

          {type === "paid" && (
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-medium text-gray-600 block mb-1">Currency</label>
                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="USD">USD - US Dollar</option>
                  <option value="PKR">PKR - Pakistani Rupee</option>
                  <option value="EUR">EUR - Euro</option>
                  <option value="GBP">GBP - British Pound</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-medium text-gray-600 block mb-1">Amount</label>
                <div className="relative">
                  <FiDollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                  <input
                    type="number"
                    min={0}
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>
            </div>
          )}

          {type === "paid" && (
            <label className="flex items-center justify-between bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 cursor-pointer">
              <div className="flex items-center gap-2">
                <FiGift className="text-indigo-500" size={15} />
                <div>
                  <p className="text-sm font-medium text-gray-700">Enable Early Bird Discount</p>
                  <p className="text-xs text-gray-400">Apply a limited-time reduction.</p>
                </div>
              </div>
              <input type="checkbox" checked={earlyBird} onChange={(e) => setEarlyBird(e.target.checked)} className="w-4 h-4 accent-indigo-600" />
            </label>
          )}

          {type === "paid" && earlyBird && (
            <div>
              <label className="text-xs font-medium text-gray-600 block mb-1">Discount Percentage</label>
              <input
                type="number"
                min={0}
                max={100}
                value={discountPct}
                onChange={(e) => setDiscountPct(e.target.value)}
                className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          )}
        </div>

        <div>
          <label className="text-sm font-semibold text-gray-700 block mb-3">Course Value Props</label>
          <p className="text-xs text-gray-400 mb-3">Let students know the benefits they'll receive to justify the investment.</p>
          <div className="flex flex-col gap-2">
            {valueProps.map((p, i) => (
              <div key={i} className="flex items-center gap-2">
                <FiCheck className="text-green-500 shrink-0" size={14} />
                <input
                  value={p}
                  onChange={(e) => updateProp(i, e.target.value)}
                  placeholder={`Value ${i + 1}`}
                  className="flex-1 text-sm border-b border-gray-100 focus:border-indigo-300 focus:outline-none py-1"
                />
                {valueProps.length > 1 && (
                  <button type="button" onClick={() => removeProp(i)} className="text-gray-400 hover:text-red-500 cursor-pointer">
                    <FiX size={14} />
                  </button>
                )}
              </div>
            ))}
            <button type="button" onClick={addProp} className="flex items-center gap-1.5 text-sm text-indigo-600 font-medium hover:underline cursor-pointer mt-1">
              <FiPlus size={14} /> Add another item
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-between gap-3 pt-2 border-t border-gray-100">
        <div className="flex gap-3">
          <button type="button" onClick={onBack} className="px-4 py-2.5 text-sm font-medium text-gray-600 hover:underline cursor-pointer">
            ← Back to Curriculum
          </button>
          <button
            type="button"
            disabled={loading}
            onClick={() => saveStep({ advance: false })}
            className="px-4 py-2.5 text-sm font-medium text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition disabled:opacity-60 cursor-pointer"
          >
            Save Draft
          </button>
        </div>
        <button
          type="button"
          disabled={loading}
          onClick={() => saveStep({ advance: true })}
          className="px-5 py-2.5 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition disabled:opacity-60 cursor-pointer"
        >
          {loading ? "Saving..." : "Review & Publish →"}
        </button>
      </div>
    </div>
  )
}

export default StepPricing