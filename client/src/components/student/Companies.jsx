import React from 'react'
import { assets } from '../../assets/assets'

const Companies = () => {
  return (
    <div className='pt-10'>

      <p className='text-base md:text-lg text-gray-500 text-center'>
        Trusted by learners from
      </p>

      <div className='flex flex-wrap items-center justify-center gap-10 md:gap-20 md:mt-12 mt-6'>
        
        <img src={assets.microsoft_logo} alt="Microsoft" 
          className='w-24 md:w-32 transition-all duration-300 ease-in-out hover:scale-125 hover:-translate-y-2 hover:drop-shadow-2xl hover:brightness-110 cursor-pointer' 
        />

        <img src={assets.walmart_logo} alt="Walmart" 
          className='w-24 md:w-32 transition-all duration-300 ease-in-out hover:scale-125 hover:-translate-y-2 hover:drop-shadow-2xl hover:brightness-110 cursor-pointer' 
        />

        <img src={assets.accenture_logo} alt="Accenture" 
          className='w-24 md:w-32 transition-all duration-300 ease-in-out hover:scale-125 hover:-translate-y-2 hover:drop-shadow-2xl hover:brightness-110 cursor-pointer' 
        />

        <img src={assets.adobe_logo} alt="Adobe" 
          className='w-24 md:w-32 transition-all duration-300 ease-in-out hover:scale-125 hover:-translate-y-2 hover:drop-shadow-2xl hover:brightness-110 cursor-pointer' 
        />

        <img src={assets.paypal_logo} alt="Paypal" 
          className='w-24 md:w-32 transition-all duration-300 ease-in-out hover:scale-125 hover:-translate-y-2 hover:drop-shadow-2xl hover:brightness-110 cursor-pointer' 
        />

      </div>

    </div>
  )
}

export default Companies