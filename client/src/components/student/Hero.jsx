import React from 'react'
import { assets } from '../../assets/assets'
import SearchBar from './SearchBar'

const Hero = () => {
  return (
    <div className='flex flex-col items-center justify-center w-full md:pt-24 pt-12 px-7 md:px-0 space-y-5 text-center bg-linear-to-b from-cyan-100/70'>

      <h1 className='md:text-5xl text-3xl leading-tight font-bold text-gray-800 max-w-3xl mx-auto relative'>
        Empower your future with courses designed to
        <span className='text-blue-600'> fit your passion.</span>

        <img 
          src={assets.sketch} 
          alt="sketch" 
          className='md:block hidden absolute -bottom-7 right-0'
        />
      </h1>

      <p className='text-gray-500 max-w-2xl mx-auto text-base md:text-lg'>
        We bring together world-class instructors, interactive content, and a supportive
        community to help you achieve your personal and professional goals.
      </p>
      
      <SearchBar />

    </div>
  )
}

export default Hero