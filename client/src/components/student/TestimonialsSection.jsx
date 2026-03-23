import React, { useState } from 'react'
import { dummyTestimonial, assets } from '../../assets/assets'

const TestimonialsSection = () => {
  const [expanded, setExpanded] = useState({})

  const toggleExpand = (index) => {
    setExpanded(prev => ({ ...prev, [index]: !prev[index] }))
  }

  return (
    <div className='pb-14 px-8 md:px-0 text-center'>
      <h2 className='text-3xl font-medium text-gray-800'>Testimonials</h2>
      <p className='md:text-base text-gray-500 mt-3'>
        Hear from our learners as they share their journeys of transformation, success, and how our <br /> platform has made a difference in their lives.
      </p>

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10'>
        {dummyTestimonial.map((testimonial, index) => (
          <div
            key={index}
            className='group border border-gray-200 rounded-xl text-left bg-white hover:border-blue-200 hover:-translate-y-2 hover:shadow-xl transition-all duration-300 overflow-hidden'
          >
            {/* Profile */}
            <div className='flex items-center gap-4 p-6 pb-4 border-b border-gray-100'>
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className='w-14 h-14 rounded-full object-cover ring-2 ring-transparent group-hover:ring-blue-400 transition-all duration-300'
              />
              <div>
                <h3 className='font-semibold text-gray-800 group-hover:text-blue-600 transition-colors duration-300'>
                  {testimonial.name}
                </h3>
                <p className='text-sm text-gray-500'>{testimonial.role}</p>
              </div>
            </div>

            {/* Body */}
            <div className='p-6 pt-4'>
              {/* Rating */}
              <div className='flex items-center gap-1 mb-3'>
                {[...Array(5)].map((_, i) => (
                  <img
                    key={i}
                    src={i < Math.floor(testimonial.rating) ? assets.star : assets.star_blank}
                    alt=''
                    className='w-5 group-hover:scale-110 transition-transform duration-300'
                  />
                ))}
              </div>

              {/* Feedback */}
              <p className='text-sm text-gray-600 leading-relaxed'>
                {expanded[index] ? testimonial.feedback : testimonial.feedback.slice(0, 100) + '...'}
              </p>

              {/* Read more */}
              <button
                onClick={() => toggleExpand(index)}
                className='text-blue-500 text-sm mt-3 underline hover:text-blue-700 transition-colors duration-200'
              >
                {expanded[index] ? 'Read less' : 'Read more'}
              </button>
            </div>

          </div>
        ))}
      </div>
    </div>
  )
}

export default TestimonialsSection