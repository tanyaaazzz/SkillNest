import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../context/AppContext'
import SearchBar from '../../components/student/SearchBar'
import { useNavigate, useSearchParams } from 'react-router-dom'
import CourseCard from '../../components/student/CourseCard'
import { assets } from '../../assets/assets'
import Footer from '../../components/student/Footer'

const CoursesList = () => {
  const { allCourses } = useContext(AppContext)
  const navigate = useNavigate()

  const [searchParams] = useSearchParams()
  const input = searchParams.get("search") || ""

  const [filteredCourse, setFilteredCourse] = useState([])

  useEffect(() => {
    if (allCourses && allCourses.length > 0) {
      const tempCourses = allCourses.slice()

      if (input) {
        setFilteredCourse(
          tempCourses.filter(item =>
            item.courseTitle.toLowerCase().includes(input.toLowerCase())
          )
        )
      } else {
        setFilteredCourse(tempCourses)
      }
    }
  }, [allCourses, input])

  return (
    <>
      <div className='relative md:px-36 px-6 pt-20 text-left'>

        {/* Header */}
        <div className='flex md:flex-row flex-col gap-6 items-start justify-between w-full'>
          <div>
            <h1 className='text-4xl md:text-5xl font-semibold text-gray-800 tracking-tight'>
              Course List
            </h1>

            <p className='text-gray-500 mt-2'>
              <span 
                className='text-blue-600 cursor-pointer hover:underline transition'
                onClick={() => navigate('/')}
              >
                Home
              </span> 
              <span className='mx-2'>/</span>
              <span className='text-gray-700'>Course List</span>
            </p>
          </div>

          <SearchBar data={input} />
        </div>

        {/* Search Tag */}
        {input && (
          <div className='inline-flex items-center gap-3 px-5 py-2 border mt-8 mb-6 text-gray-700 bg-gray-50 rounded-full shadow-sm hover:shadow-md transition'>
            <p className='text-sm font-medium'>{input}</p>
            <img 
              src={assets.cross_icon} 
              alt="clear" 
              className='cursor-pointer w-4 hover:rotate-90 hover:scale-110 transition duration-300'
              onClick={() => navigate('/course-list')}
            />
          </div>
        )}

        {/* Courses */}
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 my-12 gap-8'>
          {filteredCourse.map((course, index) => (
            <CourseCard key={index} course={course} />
          ))}
        </div>

      </div>

      <Footer />
    </>
  )
}

export default CoursesList