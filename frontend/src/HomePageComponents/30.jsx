// import banner1 from "../images/sub-banner-1.jpg"
// const ThirtyOff = () => {
//   return (
//     <div
//     style={{backgroundImage:`url(${banner1})`}}
//     className='mx-4  w-[48%] bg-no-repeat bg-cover rounded-[10px]'>
//       <div className='flex justify-end'>
//       <div className='w-[42%]'>
//           <h1 className='mt-5 text-[17px] font-medium'>UP TO 30% OFF</h1>
//           <div className='mt-5 text-2xl font-medium'>
//             <h1>Rainbow Stacker</h1>
//             <h1>Wooden Ring</h1>
//           </div>
//           <button className='bg-[#E94A85] my-6 font-medium py-2 rounded-[5px] text-white px-6'>
// Shop Now
//           </button>
//       </div>
//       </div>
//     </div>
//   )
// }

// export default ThirtyOff;



// import banner1 from "../images/sub-banner-1.jpg"

// const ThirtyOff = () => {
//   return (
//     <div
//       style={{backgroundImage:`url(${banner1})`}}
//       className='mx-4 w-[95%] sm:w-[48%] aspect-[2/1] bg-no-repeat bg-cover bg-center rounded-[10px] flex items-center justify-end'
//     >
//       <div className='w-[40%] md:w-[40%] py-8 flex flex-col items-start'>
//         <h1 className='text-[1.2vw] font-semibold uppercase tracking-wide mb-[2vh]'>
//           UP TO 30% OFF
//         </h1>
//         <div className='flex flex-col mb-[2vh]'>
//           <h1 className='text-[2vw] font-bold leading-[1.2]'>Rainbow Stacker</h1>
//           <h1 className='text-[2vw] font-bold leading-[1.2]'>Wooden Ring</h1>
//         </div>
//         <button className='bg-[#E94A85] hover:bg-[#d43e74] transition-all font-semibold py-[0.8vh] rounded-[5px] text-white px-[1.5vw] text-[1vw] uppercase tracking-wider'>
//           Shop Now
//         </button>
//       </div>
//     </div>
//   )
// }

// export default ThirtyOff;




import banner1 from "../images/sub-banner-1.jpg"

const ThirtyOff = () => {
  return (
    <div
      style={{backgroundImage:`url(${banner1})`}}
      className=' w-[100%] sm:w-[50%] h-[30vh] sm:h-[35vh] md:h-[40vh] lg:h-[45vh] bg-no-repeat bg-cover bg-center rounded-[10px] flex items-center justify-end'
    >
      <div className='w-[40%] pr-[5%] py-8 flex flex-col items-start'>
        <h1 className='text-[2vw] md:text-[1.2vw] font-semibold uppercase tracking-wide mb-[2vh]'>
          UP TO 30% OFF
        </h1>
        <div className='flex flex-col mb-[2vh]'>
          <h1 className='text-[3.3vw] md:text-[2vw] font-bold leading-[1.2]'>Rainbow Stacker</h1>
          <h1 className='text-[3.3vw] md:text-[2vw] font-bold leading-[1.2]'>Wooden Ring</h1>
        </div>
        <button className='bg-[#E94A85] hover:bg-[#d43e74] transition-all font-semibold py-[0.8vh] rounded-[5px] text-white px-[1.5vw] text-[1.5vw] sm:text-[1.2vw] uppercase tracking-wider'>
          Shop Now
        </button>
      </div>
    </div>
  )
}

export default ThirtyOff;