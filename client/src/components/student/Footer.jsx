import React, { useState } from 'react'
import { assets } from '../../assets/assets'

const Footer = () => {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = () => {
    if (email) {
      setSubscribed(true)
      setEmail('')
      setTimeout(() => setSubscribed(false), 3000)
    }
  }

  return (
    <footer className='bg-gray-900 md:px-36 text-left w-full mt-10'>
      <div className='flex flex-col md:flex-row items-start px-8 md:px-0 justify-between gap-10 md:gap-16 py-14 border-b border-white/10'>
        
        {/* Logo & Description */}
        <div className='flex flex-col md:items-start items-center w-full md:max-w-xs'>
          <img src={assets.logo_dark} alt="logo" className='w-32'/>
          <p className='mt-5 text-center md:text-left text-sm text-white/60 leading-relaxed'>
            SkillNest connects passionate learners with expert educators. Master new skills, advance your career, and learn at your own pace — anytime, anywhere.
          </p>
        </div>

        {/* Company Links */}
        <div className='flex flex-col md:items-start items-center w-full'>
          <h2 className='text-white font-semibold text-base mb-5'>Company</h2>
          <ul className='flex flex-col gap-3'>
            {['Home', 'About Us', 'Contact Us', 'Privacy & Policy'].map((item, i) => (
              <li key={i}>
                <a 
                  href='#' 
                  className='text-white/60 text-sm hover:text-white hover:translate-x-1 inline-block transition-all duration-200'
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Newsletter */}
        <div className='flex flex-col md:items-start items-center w-full md:max-w-sm'>
          <h2 className='text-white font-semibold text-base mb-2'>Subscribe to our newsletter</h2>
          <p className='text-white/60 text-sm mb-5 leading-relaxed'>
            The latest news, articles, and resources, sent to your inbox weekly.
          </p>
          <div className='flex w-full gap-2'>
            <input
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='Enter your email'
              className='flex-1 bg-white/10 border border-white/20 text-white text-sm placeholder-white/40 px-4 py-2.5 rounded-md focus:outline-none focus:border-blue-500 transition-colors duration-200'
            />
            <button
              onClick={handleSubscribe}
              className='bg-blue-600 text-white text-sm px-5 py-2.5 rounded-md hover:bg-blue-500 hover:scale-105 active:scale-95 transition-all duration-200 whitespace-nowrap'
            >
              {subscribed ? '✓ Done!' : 'Subscribe'}
            </button>
          </div>
        </div>

      </div>

      {/* Bottom */}
      <p className='py-5 text-center text-xs md:text-sm text-white/40'>
        Copyright 2026 © SkillNest. All Rights Reserved.
      </p>
    </footer>
  )
}

export default Footer