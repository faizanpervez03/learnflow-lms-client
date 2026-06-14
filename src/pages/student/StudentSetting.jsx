import React, { useState, useRef, useEffect } from 'react'
import {
    FiUser, FiSettings, FiLock, FiBell, FiCreditCard,
    FiCamera, FiTrash2, FiSave, FiX, FiEye, FiEyeOff,
    FiCheck, FiMenu, FiChevronRight, FiPhone, FiGlobe,
} from 'react-icons/fi'
import { BsStarFill } from 'react-icons/bs'

const NAV_ITEMS = [
    { key: 'profile', label: 'Profile', Icon: FiUser },
    { key: 'account', label: 'Account', Icon: FiSettings },
    { key: 'password', label: 'Password', Icon: FiLock },
    { key: 'notifications', label: 'Notifications', Icon: FiBell },
    { key: 'billing', label: 'Billing', Icon: FiCreditCard },
]

const LANGUAGES = ['English', 'Urdu', 'Arabic', 'French', 'Spanish', 'German']

const NOTIFICATION_ROWS = [
    { key: 'courseUpdates', label: 'Course Updates', desc: 'When new lessons or modules are added' },
    { key: 'quizReminders', label: 'Quiz Reminders', desc: 'Reminders before quiz deadlines' },
    { key: 'newMessages', label: 'New Messages', desc: 'When a mentor sends you a message' },
    { key: 'weeklyDigest', label: 'Weekly Digest', desc: 'A weekly summary of your progress' },
    { key: 'promotions', label: 'Promotions & Offers', desc: 'Discounts and special offers' },
    { key: 'browserPush', label: 'Browser Push', desc: 'Real-time push notifications in browser' },
]

const StudentSetting = () => {

    // ── Navigation ───────────────────────────────────────────
    const [activeTab, setActiveTab] = useState('profile')
    const [sidebarOpen, setSidebarOpen] = useState(false)

    // ── Profile ───────────────────────────────────────────────
    const fileInputRef = useRef(null)
    const [avatar, setAvatar] = useState(null)
    const [savedAvatar, setSavedAvatar] = useState(null)
    const [profileDirty, setProfileDirty] = useState(false)
    const [profileToast, setProfileToast] = useState(null)
    const [profile, setProfile] = useState({
        firstName: 'Faizan',
        lastName: 'pervez',
        email: 'faizanpervez@learnflow.edu',
        phone: '+1 (555) 000-0000',
        website: 'https://faizanpervez.dev',
        bio: 'Aspiring UI/UX designer and full-stack developer. Currently mastering Advanced React and Data Visualization on LearnFlow.',
    })
    const [savedProfile, setSavedProfile] = useState({ ...profile })

    // ── Account ───────────────────────────────────────────────
    const [username, setUsername] = useState('faizan.pervez')
    const [language, setLanguage] = useState('English')
    const [accountDirty, setAccountDirty] = useState(false)
    const [accountToast, setAccountToast] = useState(null)

    // ── Password ──────────────────────────────────────────────
    const [pwFields, setPwFields] = useState({ current: '', newPass: '', confirm: '' })
    const [pwShow, setPwShow] = useState({ current: false, newPass: false, confirm: false })
    const [pwToast, setPwToast] = useState(null)

    // ── Notifications ─────────────────────────────────────────
    const [notifPrefs, setNotifPrefs] = useState({
        courseUpdates: true,
        quizReminders: true,
        newMessages: false,
        weeklyDigest: true,
        promotions: false,
        browserPush: false,
    })
    const [notifToast, setNotifToast] = useState(null)

    // ── Billing ───────────────────────────────────────────────
    const [billingToast, setBillingToast] = useState(null)

    // ── Toast auto-dismiss ────────────────────────────────────
    useEffect(() => { if (!profileToast) return; const t = setTimeout(() => setProfileToast(null), 3000); return () => clearTimeout(t) }, [profileToast])
    useEffect(() => { if (!accountToast) return; const t = setTimeout(() => setAccountToast(null), 3000); return () => clearTimeout(t) }, [accountToast])
    useEffect(() => { if (!pwToast) return; const t = setTimeout(() => setPwToast(null), 3000); return () => clearTimeout(t) }, [pwToast])
    useEffect(() => { if (!notifToast) return; const t = setTimeout(() => setNotifToast(null), 3000); return () => clearTimeout(t) }, [notifToast])
    useEffect(() => { if (!billingToast) return; const t = setTimeout(() => setBillingToast(null), 3000); return () => clearTimeout(t) }, [billingToast])

    // ── Profile handlers ──────────────────────────────────────
    const handleProfileChange = (field) => (e) => {
        setProfile((prev) => ({ ...prev, [field]: e.target.value }))
        setProfileDirty(true)
    }

    const handlePhotoChange = (e) => {
        const file = e.target.files?.[0]
        if (!file) return
        if (file.size > 5 * 1024 * 1024) { setProfileToast({ message: 'Image must be under 5 MB.', type: 'error' }); return }
        const reader = new FileReader()
        reader.onload = () => { setAvatar(reader.result); setProfileDirty(true) }
        reader.readAsDataURL(file)
    }

    const handleRemovePhoto = () => { setAvatar(null); setProfileDirty(true) }

    const handleProfileSave = () => {
        if (!profile.firstName.trim() || !profile.lastName.trim()) {
            setProfileToast({ message: 'First and Last name are required.', type: 'error' }); return
        }
        setSavedProfile({ ...profile })
        setSavedAvatar(avatar)
        setProfileDirty(false)
        setProfileToast({ message: 'Profile saved successfully!', type: 'success' })
        // MERN → PUT /api/users/profile  body: { ...profile, avatar }
    }

    const handleProfileCancel = () => {
        setProfile({ ...savedProfile })
        setAvatar(savedAvatar)
        setProfileDirty(false)
    }

    // ── Account handlers ──────────────────────────────────────
    const handleAccountSave = () => {
        setAccountDirty(false)
        setAccountToast({ message: 'Account settings updated!', type: 'success' })
        // MERN → PUT /api/users/account  body: { username, language }
    }

    // ── Password handlers ─────────────────────────────────────
    const handlePwChange = (key) => (e) => setPwFields((p) => ({ ...p, [key]: e.target.value }))
    const handlePwToggle = (key) => setPwShow((p) => ({ ...p, [key]: !p[key] }))

    const passwordStrength = (() => {
        const p = pwFields.newPass
        if (!p) return 0
        let s = 0
        if (p.length >= 8) s++
        if (/[A-Z]/.test(p)) s++
        if (/[0-9]/.test(p)) s++
        if (/[^A-Za-z0-9]/.test(p)) s++
        return s
    })()

    const strengthMeta = [
        null,
        { label: 'Weak', barColor: 'bg-red-400', textColor: 'text-red-400' },
        { label: 'Fair', barColor: 'bg-amber-400', textColor: 'text-amber-500' },
        { label: 'Good', barColor: 'bg-blue-400', textColor: 'text-blue-500' },
        { label: 'Strong', barColor: 'bg-green-500', textColor: 'text-green-600' },
    ][passwordStrength]

    const handlePasswordSave = () => {
        if (!pwFields.current) { setPwToast({ message: 'Enter your current password.', type: 'error' }); return }
        if (pwFields.newPass.length < 8) { setPwToast({ message: 'New password must be at least 8 characters.', type: 'error' }); return }
        if (pwFields.newPass !== pwFields.confirm) { setPwToast({ message: 'Passwords do not match.', type: 'error' }); return }
        setPwFields({ current: '', newPass: '', confirm: '' })
        setPwToast({ message: 'Password changed successfully!', type: 'success' })
        // MERN → PUT /api/users/password  body: { currentPassword, newPassword }
    }

    // ── Notification handlers ─────────────────────────────────
    const handleNotifToggle = (key) => setNotifPrefs((p) => ({ ...p, [key]: !p[key] }))
    const handleNotifSave = () => {
        setNotifToast({ message: 'Notification preferences saved!', type: 'success' })
        // MERN → PUT /api/users/notifications  body: { ...notifPrefs }
    }

    // ── Derived values ────────────────────────────────────────
    const initials = `${profile.firstName?.[0] ?? ''}${profile.lastName?.[0] ?? ''}`.toUpperCase()
    const activeToast = [profileToast, accountToast, pwToast, notifToast, billingToast].find(Boolean)

    // ─────────────────────────────────────────────────────────
    return (
        <div className='min-h-screen bg-slate-100 font-sans -mt-4'>

            <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .toast-anim { animation: slideUp 0.2s ease-out; }
      `}</style>

            {/* ── Toast ── */}
            {activeToast && (
                <div className={`toast-anim fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-5 py-3.5 rounded-xl shadow-xl text-sm font-semibold ${activeToast.type === 'success' ? 'bg-green-600 text-white' : 'bg-red-500 text-white'}`}>
                    {activeToast.type === 'success' ? <FiCheck className='text-base flex-shrink-0' /> : <FiX className='text-base flex-shrink-0' />}
                    {activeToast.message}
                </div>
            )}

            {/* ── Page wrapper ── */}
            <div className='max-w-5xl mx-auto px-4 py-8 sm:py-10'>

                {/* ── Page title ── */}
                <div className='flex items-center justify-between mb-6 -mt-8'>
                    <div>
                        <h1 className='text-2xl sm:text-3xl font-extrabold text-slate-800'>Settings</h1>
                        <p className='text-[13px] text-slate-400 mt-1'>Manage your account preferences and learning environment.</p>
                    </div>
                    <button
                        onClick={() => setSidebarOpen(true)}
                        className='sm:hidden flex items-center gap-2 border border-slate-200 bg-white text-slate-600 text-sm font-medium px-3 py-2 rounded-lg shadow-sm'
                    >
                        <FiMenu /> Menu
                    </button>
                </div>

                {/* ── Two-column layout ── */}
                <div className='flex gap-6 items-start'>

                    {/* ── Sidebar ── */}
                    <aside className={`fixed sm:static inset-y-0 left-0 z-40 w-60 sm:w-52 lg:w-56 flex-shrink-0 bg-white rounded-none sm:rounded-2xl shadow-2xl sm:shadow-md overflow-hidden transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} sm:translate-x-0`}>

                        <div className='flex items-center justify-between px-4 pt-5 pb-2 sm:hidden'>
                            <span className='text-sm font-bold text-slate-700'>Settings Menu</span>
                            <button onClick={() => setSidebarOpen(false)} className='text-slate-400 hover:text-slate-700'>
                                <FiX className='text-lg' />
                            </button>
                        </div>

                        <nav className='flex flex-col gap-1 p-3 sm:p-2.5 sm:pt-4'>
                            {NAV_ITEMS.map(({ key, label, Icon }) => (
                                <button
                                    key={key}
                                    onClick={() => { setActiveTab(key); setSidebarOpen(false) }}
                                    className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold text-left w-full transition-all duration-150 group ${activeTab === key ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-800'}`}
                                >
                                    <Icon className={`text-base flex-shrink-0 ${activeTab === key ? 'text-white' : 'text-slate-400 group-hover:text-slate-600'}`} />
                                    <span className='flex-1'>{label}</span>
                                    {activeTab === key && <FiChevronRight className='text-white/70 text-sm' />}
                                </button>
                            ))}
                        </nav>
                    </aside>

                    {/* Mobile backdrop */}
                    {sidebarOpen && (
                        <div className='fixed inset-0 z-30 bg-black/30 sm:hidden' onClick={() => setSidebarOpen(false)} />
                    )}

                    {/* ── Right content panel ── */}
                    <main className='flex-1 bg-white rounded-2xl shadow-md p-6 sm:p-8 min-w-0'>

                        {/* ══ PROFILE TAB ══ */}
                        {activeTab === 'profile' && (
                            <div>
                                <h2 className='text-base font-bold text-slate-800 mb-1'>Profile Information</h2>
                                <p className='text-[13px] text-slate-500 mb-6'>Update your photo and personal details. This will be visible to your mentors and peers.</p>

                                {/* Avatar row */}
                                <div className='flex items-center gap-4 mb-7 flex-wrap'>
                                    <div className='relative flex-shrink-0'>
                                        {avatar
                                            ? <img src={avatar} alt='Avatar' className='w-20 h-20 rounded-full object-cover ring-4 ring-indigo-100' />
                                            : <div className='w-20 h-20 rounded-full bg-indigo-600 flex items-center justify-center ring-4 ring-indigo-100'>
                                                <span className='text-2xl font-bold text-white'>{initials}</span>
                                            </div>
                                        }
                                        <button onClick={() => fileInputRef.current?.click()} className='absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-indigo-600 flex items-center justify-center shadow-md hover:bg-indigo-700 transition-colors'>
                                            <FiCamera className='text-white text-xs' />
                                        </button>
                                    </div>

                                    <input ref={fileInputRef} type='file' accept='image/*' className='hidden' onChange={handlePhotoChange} />

                                    <div className='flex gap-2.5 flex-wrap'>
                                        <button onClick={() => fileInputRef.current?.click()} className='flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white text-xs font-semibold px-4 py-2 rounded-lg shadow-sm shadow-indigo-200 transition-all duration-150'>
                                            <FiCamera className='text-sm' /> Change Photo
                                        </button>
                                        <button onClick={handleRemovePhoto} className='flex items-center gap-2 border border-slate-200 hover:border-red-300 hover:bg-red-50 text-slate-500 hover:text-red-500 text-xs font-semibold px-4 py-2 rounded-lg transition-all duration-150'>
                                            <FiTrash2 className='text-sm' /> Remove
                                        </button>
                                    </div>
                                </div>

                                {/* First Name + Last Name */}
                                <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4'>
                                    <div className='flex flex-col gap-1.5'>
                                        <label className='text-[13px] font-medium text-slate-600'>First Name</label>
                                        <input type='text' value={profile.firstName} onChange={handleProfileChange('firstName')} placeholder='First name' className='w-full border border-slate-200 rounded-lg px-3.5 py-2.5 text-sm text-slate-800 placeholder-slate-400 outline-none bg-white hover:border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all' />
                                    </div>
                                    <div className='flex flex-col gap-1.5'>
                                        <label className='text-[13px] font-medium text-slate-600'>Last Name</label>
                                        <input type='text' value={profile.lastName} onChange={handleProfileChange('lastName')} placeholder='Last name' className='w-full border border-slate-200 rounded-lg px-3.5 py-2.5 text-sm text-slate-800 placeholder-slate-400 outline-none bg-white hover:border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all' />
                                    </div>
                                </div>

                                {/* Email + Phone */}
                                <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4'>
                                    <div className='flex flex-col gap-1.5'>
                                        <label className='text-[13px] font-medium text-slate-600'>Email Address</label>
                                        <input type='email' value={profile.email} onChange={handleProfileChange('email')} placeholder='email@example.com' className='w-full border border-slate-200 rounded-lg px-3.5 py-2.5 text-sm text-slate-800 placeholder-slate-400 outline-none bg-white hover:border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all' />
                                    </div>
                                    <div className='flex flex-col gap-1.5'>
                                        <label className='flex items-center gap-1 text-[13px] font-medium text-slate-600'><FiPhone className='text-slate-400 text-sm' /> Phone Number</label>
                                        <input type='tel' value={profile.phone} onChange={handleProfileChange('phone')} placeholder='+1 (555) 000-0000' className='w-full border border-slate-200 rounded-lg px-3.5 py-2.5 text-sm text-slate-800 placeholder-slate-400 outline-none bg-white hover:border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all' />
                                    </div>
                                </div>

                                {/* Website */}
                                <div className='flex flex-col gap-1.5 mb-4'>
                                    <label className='flex items-center gap-1 text-[13px] font-medium text-slate-600'><FiGlobe className='text-slate-400 text-sm' /> Website</label>
                                    <input type='url' value={profile.website} onChange={handleProfileChange('website')} placeholder='https://yourwebsite.com' className='w-full border border-slate-200 rounded-lg px-3.5 py-2.5 text-sm text-slate-800 placeholder-slate-400 outline-none bg-white hover:border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all' />
                                </div>

                                {/* Bio */}
                                <div className='flex flex-col gap-1.5 mb-7'>
                                    <label className='text-[13px] font-medium text-slate-600'>Bio</label>
                                    <textarea rows={4} maxLength={300} value={profile.bio} onChange={handleProfileChange('bio')} placeholder='Tell your mentors and peers about yourself...' className='w-full border border-slate-200 rounded-lg px-3.5 py-2.5 text-sm text-slate-800 placeholder-slate-400 outline-none resize-none bg-white hover:border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all' />
                                    <p className='text-[11px] text-slate-400 text-right'>{profile.bio.length} / 300</p>
                                </div>

                                {/* Footer */}
                                <div className='flex items-center justify-end gap-3 pt-5 border-t border-slate-100'>
                                    <button onClick={handleProfileCancel} disabled={!profileDirty} className='text-sm font-semibold text-slate-500 hover:text-slate-700 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed px-5 py-2.5 rounded-lg transition-all'>
                                        Cancel
                                    </button>
                                    <button onClick={handleProfileSave} disabled={!profileDirty} className='flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-bold px-6 py-2.5 rounded-lg shadow-md shadow-indigo-200 transition-all'>
                                        <FiSave className='text-base' /> Save Changes
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* ══ ACCOUNT TAB ══ */}
                        {activeTab === 'account' && (
                            <div>
                                <h2 className='text-base font-bold text-slate-800 mb-1'>Account Settings</h2>
                                <p className='text-[13px] text-slate-500 mb-6'>Manage your account preferences and username.</p>

                                <div className='flex flex-col gap-1.5 mb-4'>
                                    <label className='text-[13px] font-medium text-slate-600'>Username</label>
                                    <input type='text' value={username} onChange={(e) => { setUsername(e.target.value); setAccountDirty(true) }} placeholder='your.username' className='w-full border border-slate-200 rounded-lg px-3.5 py-2.5 text-sm text-slate-800 placeholder-slate-400 outline-none bg-white hover:border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all' />
                                </div>

                                <div className='flex flex-col gap-1.5 mb-7'>
                                    <label className='text-[13px] font-medium text-slate-600'>Language</label>
                                    <select value={language} onChange={(e) => { setLanguage(e.target.value); setAccountDirty(true) }} className='w-full border border-slate-200 rounded-lg px-3.5 py-2.5 text-sm text-slate-800 outline-none bg-white hover:border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all'>
                                        {LANGUAGES.map((l) => <option key={l}>{l}</option>)}
                                    </select>
                                </div>

                                <div className='border border-red-100 bg-red-50 rounded-xl p-4 mb-7'>
                                    <p className='text-sm font-semibold text-red-600 mb-1'>Danger Zone</p>
                                    <p className='text-[13px] text-slate-500 mb-3'>Deleting your account is permanent and cannot be undone.</p>
                                    <button className='text-xs font-bold text-red-600 border border-red-300 hover:bg-red-100 px-4 py-2 rounded-lg transition-colors'>
                                        Delete My Account
                                    </button>
                                </div>

                                <div className='flex justify-end pt-5 border-t border-slate-100'>
                                    <button onClick={handleAccountSave} disabled={!accountDirty} className='flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-bold px-6 py-2.5 rounded-lg shadow-md shadow-indigo-200 transition-all'>
                                        <FiSave className='text-base' /> Save Changes
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* ══ PASSWORD TAB ══ */}
                        {activeTab === 'password' && (
                            <div>
                                <h2 className='text-base font-bold text-slate-800 mb-1'>Change Password</h2>
                                <p className='text-[13px] text-slate-500 mb-6'>Choose a strong password to keep your account secure.</p>

                                {/* Current password */}
                                <div className='flex flex-col gap-1.5 mb-4'>
                                    <label className='text-[13px] font-medium text-slate-600'>Current Password</label>
                                    <div className='relative'>
                                        <input type={pwShow.current ? 'text' : 'password'} value={pwFields.current} onChange={handlePwChange('current')} placeholder='••••••••' className='w-full border border-slate-200 rounded-lg px-3.5 py-2.5 pr-10 text-sm text-slate-800 placeholder-slate-400 outline-none bg-white hover:border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all' />
                                        <button type='button' onClick={() => handlePwToggle('current')} className='absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600'>
                                            {pwShow.current ? <FiEyeOff /> : <FiEye />}
                                        </button>
                                    </div>
                                </div>

                                {/* New password */}
                                <div className='flex flex-col gap-1.5 mb-3'>
                                    <label className='text-[13px] font-medium text-slate-600'>New Password</label>
                                    <div className='relative'>
                                        <input type={pwShow.newPass ? 'text' : 'password'} value={pwFields.newPass} onChange={handlePwChange('newPass')} placeholder='••••••••' className='w-full border border-slate-200 rounded-lg px-3.5 py-2.5 pr-10 text-sm text-slate-800 placeholder-slate-400 outline-none bg-white hover:border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all' />
                                        <button type='button' onClick={() => handlePwToggle('newPass')} className='absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600'>
                                            {pwShow.newPass ? <FiEyeOff /> : <FiEye />}
                                        </button>
                                    </div>
                                </div>

                                {/* Strength meter */}
                                {pwFields.newPass && (
                                    <div className='mb-4'>
                                        <div className='flex gap-1 mb-1'>
                                            {[1, 2, 3, 4].map((i) => (
                                                <div key={i} className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${i <= passwordStrength ? strengthMeta.barColor : 'bg-slate-100'}`} />
                                            ))}
                                        </div>
                                        <p className={`text-[11px] font-semibold ${strengthMeta.textColor}`}>{strengthMeta.label}</p>
                                    </div>
                                )}

                                {/* Confirm password */}
                                <div className='flex flex-col gap-1.5 mb-7'>
                                    <label className='text-[13px] font-medium text-slate-600'>Confirm New Password</label>
                                    <div className='relative'>
                                        <input type={pwShow.confirm ? 'text' : 'password'} value={pwFields.confirm} onChange={handlePwChange('confirm')} placeholder='••••••••' className='w-full border border-slate-200 rounded-lg px-3.5 py-2.5 pr-10 text-sm text-slate-800 placeholder-slate-400 outline-none bg-white hover:border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all' />
                                        <button type='button' onClick={() => handlePwToggle('confirm')} className='absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600'>
                                            {pwShow.confirm ? <FiEyeOff /> : <FiEye />}
                                        </button>
                                    </div>
                                </div>

                                <div className='flex justify-end pt-5 border-t border-slate-100'>
                                    <button onClick={handlePasswordSave} className='flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white text-sm font-bold px-6 py-2.5 rounded-lg shadow-md shadow-indigo-200 transition-all'>
                                        <FiLock className='text-base' /> Update Password
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* ══ NOTIFICATIONS TAB ══ */}
                        {activeTab === 'notifications' && (
                            <div>
                                <h2 className='text-base font-bold text-slate-800 mb-1'>Notification Preferences</h2>
                                <p className='text-[13px] text-slate-500 mb-6'>Choose which notifications you'd like to receive.</p>

                                <div className='flex flex-col divide-y divide-slate-100 mb-7'>
                                    {NOTIFICATION_ROWS.map(({ key, label, desc }) => (
                                        <div key={key} className='flex items-center justify-between gap-4 py-3.5'>
                                            <div>
                                                <p className='text-sm font-medium text-slate-700'>{label}</p>
                                                <p className='text-[12px] text-slate-400'>{desc}</p>
                                            </div>
                                            <button
                                                onClick={() => handleNotifToggle(key)}
                                                className={`relative w-10 h-5 rounded-full flex-shrink-0 transition-colors duration-200 ${notifPrefs[key] ? 'bg-indigo-600' : 'bg-slate-200'}`}
                                            >
                                                <span className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow-sm transition-transform duration-200 ${notifPrefs[key] ? 'translate-x-5' : 'translate-x-0'}`} />
                                            </button>
                                        </div>
                                    ))}
                                </div>

                                <div className='flex justify-end pt-5 border-t border-slate-100'>
                                    <button onClick={handleNotifSave} className='flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white text-sm font-bold px-6 py-2.5 rounded-lg shadow-md shadow-indigo-200 transition-all'>
                                        <FiSave className='text-base' /> Save Preferences
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* ══ BILLING TAB ══ */}
                        {activeTab === 'billing' && (
                            <div>
                                <h2 className='text-base font-bold text-slate-800 mb-1'>Billing & Subscription</h2>
                                <p className='text-[13px] text-slate-500 mb-6'>Manage your plan and payment methods.</p>

                                <div className='border border-indigo-100 bg-indigo-50 rounded-xl p-4 flex items-center justify-between gap-4 flex-wrap mb-5'>
                                    <div className='flex items-center gap-3'>
                                        <BsStarFill className='text-indigo-500 text-xl flex-shrink-0' />
                                        <div>
                                            <p className='text-sm font-bold text-indigo-700'>Pro Plan</p>
                                            <p className='text-[12px] text-indigo-400'>$19 / month · Renews Jan 1, 2025</p>
                                        </div>
                                    </div>
                                    <span className='text-[11px] font-bold bg-indigo-600 text-white px-3 py-1 rounded-full'>Active</span>
                                </div>

                                <div className='border border-slate-200 rounded-xl p-4 flex items-center justify-between gap-4 flex-wrap mb-7'>
                                    <div className='flex items-center gap-3'>
                                        <div className='w-10 h-7 bg-slate-800 rounded-md flex items-center justify-center flex-shrink-0'>
                                            <FiCreditCard className='text-white text-sm' />
                                        </div>
                                        <div>
                                            <p className='text-sm font-semibold text-slate-700'>•••• •••• •••• 4242</p>
                                            <p className='text-[12px] text-slate-400'>Expires 09 / 27</p>
                                        </div>
                                    </div>
                                    <button onClick={() => setBillingToast({ message: 'Card update coming soon.', type: 'success' })} className='text-xs font-semibold text-indigo-600 hover:underline'>
                                        Update
                                    </button>
                                </div>

                                <div className='flex flex-wrap gap-3'>
                                    <button onClick={() => setBillingToast({ message: 'Invoice downloaded!', type: 'success' })} className='text-xs font-semibold border border-slate-200 hover:bg-slate-100 text-slate-600 px-4 py-2 rounded-lg transition-colors'>
                                        Download Invoice
                                    </button>
                                    <button onClick={() => setBillingToast({ message: 'Subscription cancelled.', type: 'error' })} className='text-xs font-semibold border border-red-200 hover:bg-red-50 text-red-500 px-4 py-2 rounded-lg transition-colors'>
                                        Cancel Subscription
                                    </button>
                                </div>
                            </div>
                        )}

                    </main>
                </div>
            </div>
        </div>
    )
}

export default StudentSetting