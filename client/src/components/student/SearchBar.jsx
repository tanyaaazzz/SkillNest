import React, { useState } from 'react'
import { assets } from '../../assets/assets'
import { useNavigate } from 'react-router-dom'

const SearchBar = ({ data }) => {
  const navigate = useNavigate()
  const [input, setInput] = useState(data ? data : '')

  const onSearchHandler = (e) => {
    e.preventDefault()
    if (!input.trim()) return
    navigate(`/course-list?search=${input}`)
  }

  return (
    <form
      onSubmit={onSearchHandler}
      className='max-w-2xl w-full md:h-16 h-14 flex items-center bg-white border border-gray-300/40 shadow-sm hover:shadow-lg transition-all duration-300'
    >

      {/* Icon */}
      <div className='px-4'>
        <img
          src={assets.search_icon}
          alt="search icon"
          className='w-5 md:w-6 opacity-70'
        />
      </div>

      {/* Input */}
      <input
        onChange={(e) => setInput(e.target.value)}
        value={input}
        type="text"
        placeholder="Search for courses..."
        className='flex-1 h-full outline-none text-gray-700 placeholder-gray-400 text-sm md:text-base'
      />

      {/* Divider */}
      <div className='h-6 w-px bg-gray-300 mx-2'></div>

      {/* Button */}
      <button
        type="submit"
        className='bg-blue-600 text-white md:px-8 px-6 h-full hover:bg-blue-700 transition-all duration-300'
      >
        Search
      </button>

    </form>
  )
}

export default SearchBar