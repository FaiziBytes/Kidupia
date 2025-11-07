
import Review from "../components/Review";

const Testimonials = () => {
      return (
            <div className='px-0 sm:px-5 bg-[#F5F5F5] py-15'>
                  <h1 className='text-[#E94A85] underline text-[18px] py-4 font-medium text-center'>TESTIMONIALS</h1>
                  <h1 className='font-normal text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-center pb-5'>What Our Client Say's</h1>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 px-3 sm:px-5 gap-4 justify-between pt-2">
                    <Review/>
                     <Review/>
                      <Review/>
                  </div>
            </div>
      )
}

export default Testimonials;


// event loop
// micro macrofunctions