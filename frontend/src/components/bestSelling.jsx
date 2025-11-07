import shoes from "../images/shoes.jpg";
import { FaStar } from "react-icons/fa";
const BestSelling = () => {
  const array = ["","","","","","","",""]
  return (
    <div className='px-5 bg-[#F5F5F5] pt-[6%] pb-[3%]'>
     <div>
       <h1 className='font-medium uppercase text-center underline text-[#E94A85]'>Best Selling Products</h1>
      <h1 className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl  font-normal text-center pt-4 pb-1'>Browsing Our Trending Items</h1>    
     </div>
     <div className="gap-7 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  justify-center py-8">
     {
      array.map(()=>{
        return <div className="bg-white rounded-[5px]">
      <img className="" src={shoes} alt="" />
      <div className="px-5">
      <h1 className="text-[18px]">Batman Lace Running Shoes For Boys & Girls (Red)</h1>
      <div className="flex mt-2 text-[17px] gap-1 text-[#FFAB00]" >
        <FaStar />
        <FaStar />
        <FaStar />
        <FaStar />
        <FaStar />
      </div>
      <div className="mt-2 text-[18px] font-semibold flex gap-1">
              <h1 className="line-through font-medium text-[#B2B2B2] ">$50</h1>
              <h1 className=" text-[#E94A85]">$40</h1>
      </div>
      <button className="bg-[#F0F0F0] px-5 rounded-[5px] py-2 my-5">
        ADD TO CART
      </button>
      </div> 
      </div>
      })
     }
     </div>
    </div>
  )
}

export default BestSelling;