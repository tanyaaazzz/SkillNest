import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../context/AppContext'
import { useParams } from 'react-router-dom'
import { assets } from '../../assets/assets'
import humanizeDuration from 'humanize-duration'
import YouTube from 'react-youtube'
import Footer from '../../components/student/Footer'

function Player() {
  const { enrolledCourses, calculateChapterTime } = useContext(AppContext)
  const { courseId } = useParams()

  const [courseData, setCourseData] = useState(null)
  const [openSections, setOpenSections] = useState({})
  const [playerData, setPlayerData] = useState(null)
  const [progressData, setProgressData] = useState([])

  const getCourseData = () => {
    const foundCourse = enrolledCourses.find(course => course._id === courseId)
    if (foundCourse) {
      setCourseData(foundCourse)
    }
  }

  useEffect(() => {
    if (enrolledCourses.length > 0) {
      getCourseData()
    }
  }, [enrolledCourses, courseId])

  const toggleSection = (index) => {
    setOpenSections(prev => ({
      ...prev,
      [index]: !prev[index],
    }))
  }

  const markLectureCompleted = (lectureId) => {
    if (!progressData.includes(lectureId)) {
      setProgressData(prev => [...prev, lectureId])
    }
  }

  if (!courseData) {
    return <p className="text-center mt-20 text-gray-500">Loading course...</p>
  }

  return (
    <>
      <div className="flex flex-col lg:flex-row min-h-[calc(100vh-80px)] bg-gray-50">

        {/* LEFT */}
        <div className="lg:w-1/3 w-full p-4 bg-white border-r shadow-md">

          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Course Structure
          </h2>

          <div className="space-y-3 border rounded-xl p-3 bg-gray-50">
            {courseData.courseContent.map((chapter, index) => (
              <div key={index} className="bg-white rounded-lg border shadow-sm">

                <button
                  onClick={() => toggleSection(index)}
                  className="w-full flex justify-between p-4"
                >
                  <div className="text-left">
                    <p className="font-semibold">{chapter.chapterTitle}</p>
                    <p className="text-sm text-gray-500">
                      {chapter.chapterContent.length} lectures • {calculateChapterTime(chapter)}
                    </p>
                  </div>

                  <img
                    src={assets.down_arrow_icon}
                    className={`w-5 transition ${openSections[index] ? 'rotate-180' : ''}`}
                    alt=""
                  />
                </button>

                {openSections[index] && (
                  <div className="border-t bg-gray-50 p-3 space-y-2">
                    {chapter.chapterContent.map((lecture, i) => (
                      <div key={i} className="flex gap-3 p-2 hover:bg-white rounded">

                        <img
                          src={
                            progressData.includes(lecture.lectureId)
                              ? assets.blue_tick_icon
                              : assets.play_icon
                          }
                          className="w-5"
                          alt=""
                        />

                        <div className="flex-1">
                          <p>{lecture.lectureTitle}</p>

                          <div className="text-sm text-gray-500 flex gap-3 mt-1">
                            {lecture.lectureUrl && (
                              <span
                                onClick={() =>
                                  setPlayerData({
                                    ...lecture,
                                    chapter: index + 1,
                                    lecture: i + 1,
                                  })
                                }
                                className="text-green-600 cursor-pointer hover:underline"
                              >
                                Watch
                              </span>
                            )}

                            <span>
                              {humanizeDuration(lecture.lectureDuration * 60 * 1000)}
                            </span>
                          </div>
                        </div>

                      </div>
                    ))}
                  </div>
                )}

              </div>
            ))}
          </div>

        </div>

        {/* RIGHT */}
        <div className="flex-1 p-6 min-h-[80vh]">

          {playerData ? (
            <>
              <div className="aspect-video rounded overflow-hidden shadow">
                <YouTube
                  videoId={playerData.lectureUrl.split('/').pop()}
                  iframeClassName="w-full h-full"
                />
              </div>

              <p className="mt-3 font-semibold">
                {playerData.chapter}.{playerData.lecture} - {playerData.lectureTitle}
              </p>

              <button
                onClick={() => markLectureCompleted(playerData.lectureId)}
                className="mt-3 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
              >
                {progressData.includes(playerData.lectureId)
                  ? 'Completed'
                  : 'Mark as Completed'}
              </button>
            </>
          ) : (
            <div className="flex justify-center items-center h-full">
              <img
                src={courseData.courseThumbnail}
                className="rounded shadow max-h-100"
                alt=""
              />
            </div>
          )}

        </div>
      </div>

      <Footer />
    </>
  )
}

export default Player