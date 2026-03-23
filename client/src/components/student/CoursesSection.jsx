import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AppContext } from '../../context/AppContext'
import CourseCard from './CourseCard'

const CoursesSection = () => {
  const { allCourses } = useContext(AppContext)

  return (
    <div className='py-16 md:px-40 px-8 text-center'>

      <h2 className='text-3xl font-medium text-gray-800'>
        Learn from the best
      </h2>

      <p className='text-sm md:text-base text-gray-500 mt-3 max-w-2xl mx-auto'>
        Discover our top-rated courses across various categories. From coding and design 
        to business and wellness, our courses are crafted to deliver results.
      </p>
      

      {/* Courses */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10'>
        {allCourses.slice(0, 4).map((course, index) => (
          <CourseCard key={index} course={course} />
        ))}
      </div>

      <Link 
        to="/course-list" 
        onClick={() => scrollTo(0, 0)} 
        className='inline-block mt-10 text-gray-600 border border-gray-300 px-8 py-3 hover:bg-gray-100 transition'
      >
        Show all courses
      </Link>

    </div>
  )
}

export default CoursesSection