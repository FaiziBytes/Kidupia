import toddlerToy from "../images/todler-toy.jpg"
import toddlerBedding from "../images/todler-bedding.jpg";
import casualShoes from "../images/casual-shoes.jpg";
import babyToys from "../images/baby-toys.jpg";
import oatsImage from "../images/oats.jpg";
import babyTruck from "../images/baby-truck.jpg";
import babygirldress from "../images/baby-girl-dress.jpg"
import jersey from "../images/jersey.jpg";
import redShoes from "../images/shoes.jpg";
import pants from "../images/super-pants.jpg";
import elephant from "../images/elephant-toy.jpg";
const Topdeals = ({showDropdownForTopDeals}) => {
    const items = [
      {image:toddlerToy,description:"Toddler Toy"},
      {image:toddlerBedding, description:"Toddler Bedding"},
      {image:casualShoes,description:"Casual Shoes"},
      {image:babyToys,description:"Baby Toys"},
      {image:oatsImage,description:"Oats"},
      {image:babyTruck,description:"Baby Truck"},
      {image:babygirldress,description:"Baby Dresses"},
      {image:jersey,description:"Casual Dress"},
    ];
    const topRatedItems = [
      {image:casualShoes,description:"Attractive cloy shoes Indoor and outdoor for children"},
      {image:toddlerBedding,description:"Baby first blocks ABCD Learning shape pieces"},
      {image:redShoes,description:"Batman lace running shoes for boys and girls"},
      {image:pants,description:"Cuddles super pants style diaper"},
      {image:elephant,description:"Cute stuffed soft toys for kids,girls,babies&children"}
    ]
      return(
          <div
      className={`absolute mx-auto w-[97.5%]  rounded-md shadow-[0_0_25px_rgba(0,0,0,0.1)] transition-all duration-300 z-40 ${
        showDropdownForTopDeals ? "opacity-100 visible" : "opacity-0 invisible"
      }`}
    >
     <div className='w-full flex'>
      <div className='w-[55%] bg-white'>
            <h1 className='text-center font-semibold text-[20px] py-2'>Shop By</h1>
            <div className="grid grid-cols-4 px-4 py-5 gap-5">
                  {
                        items.map((item)=>(
                              <div className="w-full">
                                    <img src={item.image} alt={item.description + " image"}
                                     className="rounded-[50%] border-4 hover:border-[#E94A85] border-[#F5F5F5]" />
                                    <p className="text-center py-2 font-medium">{item.description}</p>
                              </div>
                        ))
                  }
            </div>
      </div>
      <div className='w-[45%] bg-[#F5F5F5] px-5 pb-10'>
       <h1 className='text-center font-semibold text-[21px] py-4'>Top Rated</h1>
       <div className="flex flex-col gap-2">
       {
            topRatedItems.map((item)=>(
                  <div className="flex items-center bg-white">
                        <img width={"77px"} src={item.image} alt="image" />
                        <div>
                              {item.description}
                              <p className="text-[#E94A85] font-semibold text-[18px]">$20</p>
                        </div>
                  </div>
            ))
       }
       </div>
      </div>
     </div>
    </div>
  )
}

export default Topdeals;