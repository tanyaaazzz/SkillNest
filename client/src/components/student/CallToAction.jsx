import React from 'react'
import { useNavigate } from 'react-router-dom'

const CallToAction = () => {
  const navigate = useNavigate()

  return (
    <div className='flex flex-col items-center gap-4 pt-10 pb-24 px-8 text-center'>
      
      <h2 className='text-3xl md:text-4xl font-bold text-gray-900'>
        Learn anything, anytime, anywhere
      </h2>

      <p className='text-gray-500 max-w-xl text-sm md:text-base'>
        Join thousands of learners worldwide and unlock your potential with expert-led courses designed to fit your schedule and goals.
      </p>

      <div className='flex items-center gap-6 mt-4'>
        <button
          onClick={() => navigate('/course-list')}
          className='bg-blue-600 text-white px-10 py-3 rounded-md font-medium hover:bg-blue-700 hover:scale-105 transition-all duration-300'
        >
          Get started
        </button>

        <button
          onClick={() => navigate('/course-list')}
          className='flex items-center gap-2 text-gray-800 font-medium hover:text-blue-600 hover:gap-3 transition-all duration-300'
        >
          Learn more <span>→</span>
        </button>
      </div>

    </div>
  )
}

export default CallToAction