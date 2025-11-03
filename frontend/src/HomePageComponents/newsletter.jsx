import React from 'react'
import newsletter from "../images/footer-bkg.png";
const Newsletter = () => {
  return (
    <div 
    className='py-13 bg-no-repeat bg-cover'
    style={{
      backgroundImage:`url(${newsletter})`
    }}>
      <div>
      <h1 className='text-center font-normal text-2xl sm:text-3xl md:text-4xl lg:text-5xl'>Subscribe To Our Newsletter</h1>
      <p className='text-center text-[18px] lg:text-[20px]'>Subscribe to our latest newsletter to get news about special discount upcoming sales</p>
      </div>
      <div className='flex flex-col items-center sm:flex-row justify-center h-11 gap-2 mt-5'>
            <input type="text" placeholder='Email' className='px-3 py-1 sm:py-2 outline-none border-2 rounded-[5px] bg-white w-[75%] sm:w-[50%]' />
             <button className='bg-[#E94A85] w-fit py-2 rounded-[5px] font-normal text-white px-10 md:px-5'>Subscribe</button>
      </div>
    </div>
  )
}

export default Newsletter;