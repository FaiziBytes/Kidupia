import HeroImage from "../images/main-banner-2.jpg";

const Hero = () => {
  return (
    <div className="px-4">
      <div
        style={{ backgroundImage: `url(${HeroImage})` }}
        className="w-full aspect-[16/7] rounded-[5px] bg-no-repeat bg-cover bg-[center_left_30%] flex items-center justify-end"
      >
        <div className="w-[40%] py-8 flex flex-col items-start">
          <h1 className="font-medium tracking-widest text-[1.8vw] sm:text-[2vw] uppercase mb-[2vh]">
            The Creative World
          </h1>

          <div className="flex flex-col gap-[0.3vh] mb-[3vh]">
            <h1 className="text-[3.6vw] font-bold leading-[1.1]">
              Girls Party Dress
            </h1>
            <h1 className="text-[3.6vw] font-bold leading-[1.1]">
              White Lace Dress
            </h1>
            <h1 className="text-[3.6vw] font-bold leading-[1.1]">
              Bohemian Dress
            </h1>
          </div>

          <button className="text-[1.7vw] md:text-[1.2vw] font-semibold uppercase tracking-wider text-white px-[2vw] py-[1vh] bg-[#E94A85] hover:bg-[#d43e74] transition-all rounded-md">
            Shop Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;