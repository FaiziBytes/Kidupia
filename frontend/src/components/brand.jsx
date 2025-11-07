import logo1 from "../images/1.png"
import logo2 from "../images/2.png"
import logo3 from "../images/3.png"
import logo4 from "../images/4.png"
import logo5 from "../images/5.png"

const Brand = () => {
  return (
    <div className="brand grid justify-center items-center grid-cols-2 sm:gap-5 sm:justify-center sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 lg:gap-0  lg:py-15 py-5 border-b-1 border-b-[#E5E5E5]">
      <img src={logo1} alt="" />
      <img src={logo2} alt="" />
      <img src={logo3} alt="" />
      <img src={logo4} alt="" />
      <img src={logo5} alt="" />
    </div>
  )
}

export default Brand;