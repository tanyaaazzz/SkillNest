import React, { useContext, useState } from 'react'
import { AppContext } from '../../context/AppContext'
import Footer from '../../components/student/Footer'

const MyEnrollments = () => {

  const { enrolledCourses, calculateCourseDuration, navigate } = useContext(AppContext)

  // Progress Data (dummy)
  const [progressArray] = useState([
    { lectureCompleted: 2, totalLectures: 4 },
    { lectureCompleted: 1, totalLectures: 5 },
    { lectureCompleted: 3, totalLectures: 6 },
    { lectureCompleted: 4, totalLectures: 4 },
    { lectureCompleted: 0, totalLectures: 3 },
    { lectureCompleted: 5, totalLectures: 7 },
    { lectureCompleted: 6, totalLectures: 8 },
    { lectureCompleted: 2, totalLectures: 6 },
    { lectureCompleted: 4, totalLectures: 10 },
    { lectureCompleted: 3, totalLectures: 5 },
    { lectureCompleted: 7, totalLectures: 7 },
    { lectureCompleted: 1, totalLectures: 4 },
    { lectureCompleted: 0, totalLectures: 2 },
    { lectureCompleted: 5, totalLectures: 5 }
  ])

  return (
    <div className="flex flex-col min-h-screen">

      {/* MAIN CONTENT */}
      <div className='md:px-36 px-6 pt-10 flex-1'>

        {/* Heading */}
        <h1 className='text-2xl md:text-3xl font-semibold text-gray-800 mb-6'>
          My Enrollments
        </h1>

        {/* Table */}
        <div className='overflow-x-auto'>
          <table className='w-full border border-gray-200 rounded-lg overflow-hidden'>

            {/* Header */}
            <thead className='bg-gray-100 text-gray-700 text-sm'>
              <tr>
                <th className='text-left px-4 py-3'>Course</th>
                <th className='text-left px-4 py-3'>Duration</th>
                <th className='text-left px-4 py-3'>Progress</th>
                <th className='text-left px-4 py-3'>Status</th>
              </tr>
            </thead>

            {/* Body */}
            <tbody>
              {enrolledCourses.map((course, index) => {

                const progress = progressArray[index] || { lectureCompleted: 0, totalLectures: 1 }

                const percent = Math.floor(
                  (progress.lectureCompleted / progress.totalLectures) * 100
                )

                const isCompleted = percent === 100

                return (
                  <tr key={index} className='border-t hover:bg-gray-50 transition'>

                    {/* Course */}
                    <td className='flex items-center gap-3 px-4 py-4'>
                      <img 
                        src={course.courseThumbnail} 
                        alt='' 
                        className='w-16 h-12 object-cover rounded'
                      />
                      <p className='text-sm font-medium text-gray-800'>
                        {course.courseTitle}
                      </p>
                    </td>

                    {/* Duration */}
                    <td className='px-4 py-4 text-sm text-gray-600'>
                      {calculateCourseDuration(course)}
                    </td>

                    {/* Progress */}
                    <td className='px-4 py-4'>
                      <div className='flex flex-col gap-1'>
                        <p className='text-xs text-gray-500'>
                          {progress.lectureCompleted}/{progress.totalLectures} Lectures
                        </p>

                        <div className='w-full bg-gray-200 h-2 rounded-full overflow-hidden'>
                          <div 
                            className='bg-blue-600 h-2 transition-all duration-500'
                            style={{ width: `${percent}%` }}
                          ></div>
                        </div>
                      </div>
                    </td>

                    {/* Status */}
                    <td className='px-4 py-4'>
                      <button 
                        onClick={() => navigate('/player/' + course._id)}
                        className={`px-4 py-1 text-xs font-medium rounded-full transition
                          ${isCompleted 
                            ? 'bg-green-100 text-green-700 hover:bg-green-200' 
                            : 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
                          }`}
                      >
                        {isCompleted ? 'Completed' : 'Ongoing'}
                      </button>
                    </td>

                  </tr>
                )
              })}
            </tbody>

          </table>
        </div>

      </div>

      {/* FOOTER */}
      <Footer />

    </div>
  )
}

export default MyEnrollments