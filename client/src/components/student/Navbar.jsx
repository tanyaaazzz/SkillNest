import React, { useContext, useState } from 'react'
import { assets } from '../../assets/assets'
import { Link, useLocation } from 'react-router-dom'
import { useClerk, UserButton, useUser } from '@clerk/react'
import { AppContext } from '../../context/AppContext'

const Navbar = () => {
  const { navigate, isEducator } = useContext(AppContext)

  const location = useLocation()
  const isCourseListPage = location.pathname.includes('/course-list')
  const { openSignIn } = useClerk()
  const { user } = useUser()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className={`flex items-center justify-between px-4 sm:px-10 md:px-14 lg:px-36 border-b border-gray-500/20 py-4 ${isCourseListPage ? 'bg-white' : 'bg-cyan-100/70'}`}>

      {/* Logo */}
      <img onClick={() => navigate('/')}
        src={assets.logo}
        alt='Logo'
        className='w-28 lg:w-40 cursor-pointer transition duration-300 hover:opacity-80'
      />

      {/* Desktop Menu */}
      <div className='hidden md:flex items-center gap-8 text-gray-600 text-sm font-medium'>
        <div className='flex items-center gap-8'>
          {user && <>
            <button onClick={() => { navigate('/educator') }} className='relative group'>
              {isEducator ? 'Educator Dashboard' : 'Become Educator'}
              <span className='absolute left-0 -bottom-1 w-0 h-[2px] bg-blue-600 transition-all duration-300 group-hover:w-full'></span>
            </button>

            <Link to='/my-enrollments' className='relative group'>
              My Enrollments
              <span className='absolute left-0 -bottom-1 w-0 h-[2px] bg-blue-600 transition-all duration-300 group-hover:w-full'></span>
            </Link>
          </>}
        </div>

        {user
          ? <UserButton />
          : <button
              onClick={() => openSignIn()}
              className='bg-blue-600 text-white px-6 py-2 text-sm font-medium hover:bg-blue-700 transition duration-300'
            >
              Get Started
            </button>
        }
      </div>

      {/* Mobile Menu */}
      <div className='md:hidden flex items-center gap-2 sm:gap-5 text-gray-600'>
        <div className='flex items-center gap-1 sm:gap-2 max-sm:text-xs'>
          {user && <>
            <button onClick={() => navigate('/educator')} className='hover:text-blue-600 transition'>
              {isEducator ? 'Educator Dashboard' : 'Become Educator'}
            </button>
            <Link to='/my-enrollments' className='hover:text-blue-600 transition'>
              My Enrollments
            </Link>
          </>}
        </div>

        {user
          ? <UserButton />
          : <button onClick={() => openSignIn()} className='transition hover:opacity-80'>
              <img src={assets.user_icon} alt='' className='w-6' />
            </button>
        }
      </div>

    </div>
  )
}

export default Navbar