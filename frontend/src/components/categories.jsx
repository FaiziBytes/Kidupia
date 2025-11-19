import Cat from "../images/cat-01.jpg";
import Clothe from "../images/cat-04.jpg";
import babyShoes from "../images/baby-shoe.jpg";
import lotion from "../images/lotion.jpg";

const Categories = () => {
  const categories = [
    { image: Cat, name: "Kids Toys", count: 4 },
    { image: Clothe, name: "Kids Clothes", count: 7 },
    { image: babyShoes, name: "Baby Shoes", count: 5 },
    { image: lotion, name: "Baby Care", count: 3 },
  ];

  return (
    <div className='block lg:flex py-10 px-5 justify-between items-center object-contain'>
      <div className='w-[100%] lg:w-[25%]'>
        <h1 className='text-[17px] underline text-[#E94A85] font-medium'>CATEGORIES</h1>
        <div className='text-4xl font-normal mt-4'>
          <h1>Browsing Top</h1>
          <h1 className='mt-1'>Categories</h1>
        </div>
        <p className='text-[18px] mt-2'>
          Lorem Ipsum is simply dummy text of the 
          the first to showcase new gadgets and characteristic words etc.
          the first to showcase new gadgets and character words etc.
        </p>
      </div>

      <div className='w-[100%] mt-3 grid grid-cols-2 sm:grid-cols-4 gap-4 items-start'>
        {categories.map((cat, index) => (
          <div
            key={index}
            className={`
            w-[100%] h-auto border border-[#E5E5E5] rounded-[6px] hover:shadow-md transition-transform`}
          >
            <img src={cat.image} alt={cat.name} className='w-full h-auto rounded-t-[6px]' />
            <div className='p-3'>
              <h1 className='text-[18px] font-medium'>{cat.name}</h1>
              <h1>{cat.count} products</h1>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
