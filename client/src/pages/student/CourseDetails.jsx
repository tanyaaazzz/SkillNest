import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AppContext } from '../../context/AppContext'
import Loading from '../../components/student/Loading'
import { assets } from '../../assets/assets'
import Footer from '../../components/student/Footer'
import YouTube from 'react-youtube'

const CourseDetails = () => {

  const { id } = useParams()
  const [courseData, setCourseData] = useState(null)
  const [openChapter, setOpenChapter] = useState(null)
  const [isAlreadyEnrolled, setIsAlreadyEnrolled] = useState(false)
  const [playerData, setPlayerData] = useState(null) // ✅ added

  const { 
    allCourses, 
    calculateChapterTime, 
    calculateCourseDuration, 
    calculateNoofLectures,
    calculateRating,
    currency
  } = useContext(AppContext)

  const fetchCourseData = () => {
    const findCourse = allCourses.find(course => course._id === id)
    setCourseData(findCourse)
  }

  useEffect(() => {
    if (allCourses.length > 0) {
      fetchCourseData()
    }
  }, [allCourses, id])

  const discountedPrice = (
    courseData?.coursePrice - 
    (courseData?.discount * courseData?.coursePrice) / 100
  ).toFixed(2)

  return courseData ? (
    <>
      <div className='flex md:flex-row flex-col-reverse gap-12 relative items-start justify-between md:px-36 px-6 md:pt-28 pt-16 text-left'>

        {/* Background */}
        <div className='absolute top-0 left-0 w-full h-section-height -z-10 bg-linear-to-b from-cyan-100/70 to-white'></div>

        {/* LEFT */}
        <div className='flex-1'>

          <h1 className='text-3xl md:text-4xl font-bold text-gray-800'>
            {courseData.courseTitle}
          </h1>

          <p 
            dangerouslySetInnerHTML={{ __html: courseData.courseDescription.slice(0, 200) }} 
            className='text-gray-600 mt-4'
          />

          <p className='text-sm mt-3'>
            <span className='text-blue-600 underline cursor-pointer hover:text-blue-700'>
              {courseData.educator?.name}
            </span>
          </p>

          {/* Course Structure */}
          <div className='pt-10'>
            <h2 className='text-xl font-semibold'>Course Structure</h2>

            <div className='pt-5 space-y-3'>
              {courseData.courseContent.map((chapter, index) => (
                <div key={index} className='border bg-white rounded-lg hover:shadow-md transition'>

                  {/* Header */}
                  <div 
                    className='flex justify-between px-4 py-3 cursor-pointer'
                    onClick={() => setOpenChapter(openChapter === index ? null : index)}
                  >
                    <div className='flex items-center gap-2'>
                      <img 
                        src={assets.down_arrow_icon} 
                        alt=""
                        className={`w-4 transition ${openChapter === index ? 'rotate-180' : ''}`}
                      />
                      <p>{chapter.chapterTitle}</p>
                    </div>

                    <p className='text-sm text-gray-500'>
                      {chapter.chapterContent.length} lectures • {calculateChapterTime(chapter)}
                    </p>
                  </div>

                  {/* Lectures */}
                  {openChapter === index && (
                    <div className='border-t bg-gray-50'>
                      {chapter.chapterContent.map((lecture, i) => (
                        <div key={i} className='flex items-center gap-3 px-4 py-2 text-sm border-b last:border-0 hover:bg-white transition'>
                          
                          <img src={assets.play_icon} alt="" className='w-4'/>

                          <p className='flex-1'>{lecture.lectureTitle}</p>

                          <div className='flex gap-3 text-xs text-gray-500'>
                            {lecture.isPreviewFree && (
                              <p 
                                onClick={() =>
                                  setPlayerData({
                                    videoId: lecture.lectureUrl.split('v=')[1]
                                  })
                                }
                                className='text-blue-500 cursor-pointer hover:underline'
                              >
                                Preview
                              </p>
                            )}
                            <span>{lecture.lectureDuration} mins</span>
                          </div>

                        </div>
                      ))}
                    </div>
                  )}

                </div>
              ))}
            </div>

            {/* Description */}
            <h3 className='text-xl font-semibold pt-8 text-gray-800'>
              Course Description
            </h3>

            <p 
              dangerouslySetInnerHTML={{ __html: courseData.courseDescription }} 
              className='text-gray-600 pt-3'
            />
          </div>
        </div>

        {/* RIGHT */}
        <div className='w-full md:w-1/3 bg-white shadow-xl rounded-xl p-5 sticky top-20 border border-gray-100'>

          {/* Video / Thumbnail */}
          <div className='relative'>
            {playerData ? (
              <YouTube 
                videoId={playerData.videoId}
                opts={{ playerVars: { autoplay: 1 } }}
                iframeClassName='w-full aspect-video rounded-lg'
              />
            ) : (
              <img 
                src={courseData.courseThumbnail} 
                alt="" 
                className='rounded-lg'
              />
            )}
          </div>

          {/* Timer */}
          <div className='flex gap-2 items-center pt-4'>
            <img className='w-3.5' src={assets.time_left_clock_icon} alt=''/>
            <p className='text-red-500 text-sm'>
              <span className='font-medium'>5 days</span> left at this price!!
            </p>
          </div>

          {/* Price */}
          <div className='flex gap-3 items-center pt-4'>
            <p className='text-3xl font-bold text-gray-800'>
              {currency}{discountedPrice}
            </p>
            <p className='text-gray-400 line-through'>
              {currency}{courseData.coursePrice}
            </p>
            <p className='text-green-600 text-sm font-medium'>
              {courseData.discount}% off
            </p>
          </div>

          {/* Stats */}
          <div className='flex items-center gap-3 pt-4 text-gray-600 text-sm'>
            <div className='flex items-center gap-1'>
              <img src={assets.star} alt='' className='w-4'/>
              <p>{calculateRating(courseData)}</p>
            </div>

            <div className='h-4 w-px bg-gray-300'></div>

            <div className='flex items-center gap-1'>
              <img className='w-3.5' src={assets.time_clock_icon} alt=''/>
              <p>{calculateCourseDuration(courseData)}</p>
            </div>

            <div className='h-4 w-px bg-gray-300'></div>

            <div className='flex items-center gap-1'>
              <img className='w-3.5' src={assets.lesson_icon} alt=''/>
              <p>{calculateNoofLectures(courseData)} lessons</p>
            </div>
          </div>

          {/* Button */}
          <button className='mt-6 w-full py-3 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 hover:scale-[1.02] transition'>
            {isAlreadyEnrolled ? 'Already Enrolled' : 'Enroll Now'}
          </button>

          {/* Includes */}
          <div className='pt-5'>
            <p className='font-medium text-gray-800'>What's in the course?</p>
            <ul className='ml-4 pt-2 text-sm list-disc text-gray-500 space-y-1'>
              <li>Lifetime access with free updates</li>
              <li>Step-by-step project guidance</li>
              <li>Downloadable resources</li>
              <li>Quizzes & practice tests</li>
              <li>Certificate of completion</li>
            </ul>
          </div>

        </div>

      </div>

      <Footer />
    </>
  ) : <Loading />
}

export default CourseDetails