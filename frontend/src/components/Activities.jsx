import React from 'react'
import Activity from "../images/cms-banner-1.jpg"
import Svgs1 from './svgs';

const Activities = () => {
  return (
    <div className='activity block lg:flex items-center gap-8 px-5 lg:py-20'>
      {/* Left Image */}
      <img
        src={Activity}
        className='w-full lg:w-[45%] rounded-[5px]'
        alt="Activity"
      />

      {/* Right Text Section */}
      <div className='w-full lg:w-[50%] mt-8 md:mt-0'>
        <h1 className='font-medium text-[16px] sm:text-[18px] md:text-[22px] lg:text-[18px] underline text-[#E94A85]'>
          OUR BEST ACTIVITIES
        </h1>
        <h1 className='text-3xl md:text-4xl mt-4 leading-tight'>
          Let Us Know About Reading And Cultural
        </h1>
        <p className='text-[16px] md:text-[17px] mt-4 text-[#555]'>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry lorem Ipsum has been the industry of standard dummy text ever since the type and scrambled it to make a type specimen book.
        </p>

        {/* Feature Grid */}
        <div className='flex flex-wrap justify-between mt-6 gap-y-6'>
          {[1, 2, 3, 4].map((_, i) => (
            <div key={i} className='flex items-start w-full sm:w-[48%] gap-4'>
              <div className='rounded-[5px] bg-[#F5F0E6] w-fit p-4 flex justify-center items-center'>
                <Svgs1 />
              </div>
              <div>
                <h1 className='font-medium text-[17px] md:text-[18px]'>Early Learning</h1>
                <p className='text-[15px] md:text-[16px] text-[#555]'>
                  Contrary to popular belief lorem Ipsum
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Activities
