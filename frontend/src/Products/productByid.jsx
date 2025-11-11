
import React, { useState } from 'react';
import BreadcrumbBanner from '../components/breadcrumb';
import casualshoes1 from "../images/casualshoes-01-13.jpg";
import casualshoes2 from "../images/casual-shoes-02-15.jpg";
import casualshoes3 from "../images/casualshoes-03-13.jpg";
import casualshoes4 from "../images/casual-shoes-04-11.jpg";
import { FaShieldAlt } from "react-icons/fa";
import { FaCoins } from "react-icons/fa6";
import { FaTruckFast } from "react-icons/fa6";


const ProductByid = () => {
  const images = [casualshoes1, casualshoes2, casualshoes3, casualshoes4];
  const [centerImage, setCenterImage] = useState(casualshoes1);
  const [quantity, setQuantity] = useState(1);

  return (
    <div>
      <BreadcrumbBanner />

      <div className='flex mt-10 w-full'>
        {/* Thumbnail Images */}
        <div className='w-[13%] px-3'>
          {images.map((img, index) => (
            <img
              key={index}
              onClick={() => setCenterImage(img)}
              src={img}
              alt="Casual shoes"
              loading='lazy'
              width="140px"
              className='border rounded-[5px] my-2 border-[#E5E5E5] hover:border-[#E94A85] transition-transform duration-500 ease-in-out hover:scale-90 cursor-pointer'
            />
          ))}
        </div>

        {/* Main Image */}
        <div className='w-[46%]'>
          <img
            src={centerImage}
            alt="Main product"
            loading='lazy'
            className='rounded-[5px] my-2 border border-[#E5E5E5]'
          />
        </div>

        {/* Product Details */}
        <div className='w-[41%] px-5'>
          <p className='text-[#666666] text-[20px] font-medium'>
            Brand: <span className='text-[#E94A85]'>MegaMart</span>
          </p>

          <p className='text-3xl font-medium my-2'>
            Cuddles - Super Pants Pant Style Diaper - M
          </p>

          <div className='flex items-center gap-3 mb-3'>
            <p className='text-[20px] font-semibold'>18$</p>
            <p className='text-[20px] font-semibold'>10%</p>
            <p>⭐⭐⭐⭐⭐</p>
            <p className='text-[#E94A85]'>(1 review)</p>
          </div>

          <p className='mb-3'>🔥 10 products sold here in just 16 hours</p>

          <p className='mb-3'>
            Quick Max Absorption technology to provide quick absorption and long-lasting
            dryness. The Diaper pants provide Super Comfort, Super Dryness, and Super
            Protection to the baby.
          </p>

          <div className='px-2 bg-[#E6F7E6] w-fit py-1 rounded-[3px] mb-2'>
            <p className='text-[#00B517] font-medium'>399 in stock</p>
          </div>

          {/* Quantity Selector */}
          <div className='flex items-center gap-4 my-5'>
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className='w-10 h-10 border border-[#E5E5E5] rounded-md hover:border-[#E94A85] transition-colors'
            >
              −
            </button>
            <input
              type="number"
              value={quantity}
              onChange={(e) =>
                setQuantity(Math.max(1, parseInt(e.target.value) || 1))
              }
              className='w-16 h-10 text-center border border-[#E5E5E5] rounded-md'
            />
            <button
              onClick={() => setQuantity(quantity + 1)}
              className='w-10 h-10 border border-[#E5E5E5] rounded-md hover:border-[#E94A85] transition-colors'
            >
              +
            </button>
          </div>

          {/* Action Buttons */}
          <button className='w-full bg-[#E94A85] text-white py-3 rounded-md font-medium text-lg hover:bg-[#d43970] transition-colors mb-3'>
            ADD TO CART
          </button>
          <button className='w-full bg-black text-white py-3 rounded-md font-medium text-lg hover:bg-[#333] transition-colors mb-5'>
            BUY NOW
          </button>

          {/* Quick Actions */}
          <div className='flex gap-4 mb-5'>
            <button className='flex items-center gap-2 text-[#666]'>
              <svg
                className='w-5 h-5'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2'
                />
              </svg>
              COMPARE
            </button>
            <button className='flex items-center gap-2 text-[#666]'>
              <svg
                className='w-5 h-5'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z'
                />
              </svg>
              BROWSE WISHLIST
            </button>
          </div>

          {/* Viewing Info */}
          <div className='flex items-center gap-2 mb-4 text-[#666]'>
            <svg
              className='w-5 h-5'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
              />
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z'
              />
            </svg>
            <span className='font-medium'>28</span> people are viewing this right now
          </div>
        </div>
      </div>
      <div className='w-[60%] grid grid-cols-3 bg-[#F3F4FC] border-1 mx-3'>
        <div className='py-3 flex justify-center items-center gap-1 border-r-1'>
           <FaShieldAlt />
        <p>101% original</p>
          
        </div>
        <div className='py-3 flex justify-center items-center gap-1 border-r-1'>
          <FaCoins />
          <p>lowest pricing</p>
        </div>
        <div className='py-3 flex justify-center items-center gap-1'>
          <FaTruckFast />
          <p> free shipping </p>
        </div>
      </div>
    </div>
  );
};

export default ProductByid;
