import lotion from "../images/lotion.jpg";
import pant from "../images/super-pants.jpg";
import shoes from "../images/shoes.jpg";
import doodle from "../images/doodle.jpg";
import { FaStar } from "react-icons/fa6";

const Product = ({ ShowDropdownforProducts }) => {
  const imageData = [
    {
      image: lotion,
      description: "Sebamed Baby Cleaning Bar and Sebamed Baby Wash",
      price: "$40",
    },
    {
      image: pant,
      description: "Cuddles Super Pants — Pant Style Diaper (M)",
      price: "$50",
    },
    {
      image: shoes,
      description: "Batman Lace Running Shoes for Boys & Girls (Red)",
      price: "$60",
    },
    {
      image: doodle,
      description: "Ratna Musical Doodle Roly Poly for Infants",
      price: "$70",
    },
  ];

  return (
    <div
      className={`absolute top-full left-0 w-full bg-[#F5F5F5] pb-10 rounded-md shadow-[0_0_25px_rgba(0,0,0,0.1)] transition-all duration-300 z-40 ${
        ShowDropdownforProducts ? "opacity-100 visible" : "opacity-0 invisible"
      }`}
    >
      {/* Header */}
      <div className="py-6 flex justify-center items-center gap-4 text-[19px] font-medium border-b border-gray-200">
        <h1 className="text-[#E94A85]">Toys</h1>
        <div className="h-4 bg-[#9B9B9B] w-[1.4px]"></div>
        <h1>Clothes</h1>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-4 gap-8 px-10 pt-8">
        {imageData.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-[10px] border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
          >
            <img
              src={item.image}
              alt="Product"
              className="w-full h-56 object-cover"
            />

            <div className="px-4 py-4">
              <p className="text-gray-700 text-[15px] leading-snug">
                {item.description}
              </p>

              {/* Stars */}
              <div className="flex text-[#FFAB00] gap-0.5 pt-2 pb-1">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} />
                ))}
              </div>

              {/* Price */}
              <p className="text-[#E94A85] text-[18px] font-semibold">
                {item.price}
              </p>

              {/* Button */}
              <button className="mt-3 bg-[#E5E5E5] w-full py-2 font-medium rounded-[6px] hover:bg-[#E94A85] hover:text-white transition">
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Product;
