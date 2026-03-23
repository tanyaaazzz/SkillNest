import React, { useState } from 'react'
import { assets } from '../../assets/assets'
import { Link, useLocation } from 'react-router-dom'

const Navbar = () => {
  const location = useLocation()
  const isCourseListPage = location.pathname.includes('/course-list')
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className={`flex items-center justify-between px-4 sm:px-10 md:px-14 lg:px-36 border-b border-gray-500 py-4 ${isCourseListPage ? 'bg-white' : 'bg-cyan-100/70'}`}>
      
      {/* Logo */}
      <img src={assets.logo} alt='Logo' className='w-28 lg:w-32 cursor-pointer'/>

      {/* Desktop Menu */}
      <div className='hidden md:flex items-center gap-5 text-gray-500'>
        <div className='flex items-center gap-5'>
          <button>Become Educator</button>
          <Link to='/my-enrollments'>My Enrollments</Link>
        </div>
        <button className='bg-blue-600 text-white px-5 py-2 rounded-full'>Create Account</button>
      </div>

      {/* Mobile Menu Button */}
      <div className='md:hidden flex items-center gap-3 text-gray-500'>
        <button onClick={() => setMenuOpen(!menuOpen)}>
          <img src={menuOpen ? assets.cross_icon : assets.user_icon} alt='menu' className='w-6 h-6'/>
        </button>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className={`md:hidden absolute top-16 left-0 right-0 z-50 flex flex-col items-start gap-4 px-6 py-5 shadow-md ${isCourseListPage ? 'bg-white' : 'bg-cyan-100'}`}>
          <button onClick={() => setMenuOpen(false)}>Become Educator</button>
          <Link to='/my-enrollments' onClick={() => setMenuOpen(false)}>My Enrollments</Link>
          <button className='bg-blue-600 text-white px-5 py-2 rounded-full'>Create Account</button>
        </div>
      )}

    </div>
  )
}

export default Navbar