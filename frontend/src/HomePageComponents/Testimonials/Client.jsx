import client1 from '../../images/01-1.png';

const ClientReview = () => {
  return (
       <div className=' bg-white px-3 sm:px-7 py-6 rounded-[5px]'>
                              <h1 className='font-medium text-[18px]'>Quality, Relaibility, Impressive</h1>
                              <p className='pt-2 text-[#858585]'>

                                    Lorem Ipsum is simply dummy text of the printing and type setting industry lorem Ipsum has been the industry standard dummy text ever since that took
                                    it to make a type specimen book.
                              </p>
                              <div className="pt-4 flex items-center gap-4">
                                    <img src={client1} alt="" />
                                    <div>
                                          <h1 className="font-medium text-xl">Lawrence N. Jones</h1>
                                          <p className="text-[#858585]">Designer</p>
                                    </div>
                              </div>
                        </div>
  )
}

export default ClientReview;