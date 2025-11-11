import React from 'react'
import product2 from "../images/products-banner-2.jpg"
const ProductDescription = () => {
      const lists = [
            "Upto 12 hours absorption protection helps in uninterrupted sleep for your baby and you",
            "ADL technology spreads fluid evenly and prevents heaviness",
            "Wetness indicator turns from yellow to blue indicating it is time to change diaper",
            "Trickle side cuffs act as leakage guard",
            "Breathable material and wetness indicator helps keep skin dry to reduce the chance of rashes",
            "Cottonsoft pants helps your baby feel comfortable",
            "Front side indicator ensures correct fitment"];
      return (
            <div>
                  <h1 className='text-3xl font-medium'>About this item</h1>
                  <ul className='dotted pl-3 mt-2'>
                        {
                              lists.map((list,i) => {
                                    return <li className='text-[17px]'>{i+1}. {list}</li>
                              })
                        }
                  </ul>
                  <p className='text-[17px] mt-4'>
                        Little's Comfy Baby Pants are pant style pull up diapers. These diapers help in
                        quick absorption and come with perfect fitment to help keep your baby active
                        during the day time and upto 12 hour absorption protection ensures long lasting
                        dryness to help your baby have uninterrupted sleep during the night.
                  </p>
                  <img src={product2} alt="there is an image" className='mt-2' />
                  
            </div>
      )
}

export default ProductDescription;