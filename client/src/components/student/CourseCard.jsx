import React, { useContext } from 'react'
import { assets } from '../../assets/assets'
import { AppContext } from '../../context/AppContext'
import { Link } from 'react-router-dom'

const CourseCard = ({ course }) => {
  const { currency,calculateRating } = useContext(AppContext)

  const discountedPrice = (
    course.coursePrice - (course.discount * course.coursePrice) / 100
  ).toFixed(2)

  return (
    <Link
      to={'/course/' + course._id}
      onClick={() => scrollTo(0, 0)}
      className='group bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-2 hover:border-blue-300 transition-all duration-300 cursor-pointer'
    >

      {/* Image */}
      <div className='overflow-hidden'>
        <img
          src={course.courseThumbnail}
          alt=""
          className='w-full h-40 object-cover group-hover:scale-110 transition-transform duration-500'
        />
      </div>

      {/* Content */}
      <div className='p-4 text-left'>
        <h3 className='text-sm font-semibold text-gray-800 line-clamp-2 group-hover:text-blue-600 transition-colors duration-200'>
          {course.courseTitle}
        </h3>

        <p className='text-xs text-gray-500 mt-1'>
          {course.educator.name}
        </p>

        {/* Rating */}
        <div className='flex items-center gap-1 mt-2'>
          <p className='text-sm font-medium'>{calculateRating(course)}</p>
          <div className='flex'>
            {[...Array(5)].map((_, i) => (
              <img key={i} src={i<Math.floor(calculateRating(course))? assets.star : assets.star_blank} alt='' className='w-3'/>
            ))}
          </div>
          <p className='text-xs text-gray-500'>
  ({course.courseRatings?.length})
</p>
        </div>

        {/* Price */}
        <p className='text-lg font-semibold text-gray-800 mt-2 group-hover:text-blue-600 transition-colors duration-200'>
          {currency}{discountedPrice}
        </p>
      </div>

    </Link>
  )
}

export default CourseCard