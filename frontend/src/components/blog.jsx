import React from 'react'
import laptopImage from "../images/laptop.jpg";
const Blog = () => {
      const posts = ["","",""];
  return (
    <div className='py-15'>
      <h1 className='text-[#E94A85] text-[18px] underline text-center font-medium pt-4'>FROM THE BLOG</h1>
      <h1 className='text-5xl text-center font-normal py-5'>Our Latest Blog</h1>
<div className='grid md:grid-cols-2 lg:grid-cols-3 justify-center gap-6 px-5'>
{
      posts.map(()=>{
            return  <div className=''>
            <img src={laptopImage} className='w-full rounded-[10px]' alt="" />
            <h1 className='text-[15px] font-semibold text-[#E94A85] mt-4'>FEBURARY 9, 2024 BY EDITOR</h1>
            <p className='text-[22px] font-medium'>How to write a blog to your readers...</p>
            <p className='mt-2 text-[17px] text-[#666666]'>Why the world would end without travel coupons.
                  The 16 worst song about the spa deals. How...
            </p>
            <p className='underline font-semibold mt-1'>READ MORE</p>
      </div>
      })
}
</div>
    </div>
  ) 
}

export default Blog