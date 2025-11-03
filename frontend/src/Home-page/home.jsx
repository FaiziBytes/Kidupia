import ThirtyOff from "../HomePageComponents/30";
import BestSelling from "../HomePageComponents/bestSelling";
import Blog from "../HomePageComponents/blog";
import Brand from "../HomePageComponents/brand";
import Testimonials from "../HomePageComponents/Testimonials";
import Categories from "../HomePageComponents/categories";
import Activities from "../HomePageComponents/Activities";
import Hero from "../HomePageComponents/Hero";
const Home = () => {
  return (
    <div className="font-[]">
      <Hero />
      <br />
      <div className='flex flex-col gap-5 sm:flex-row sm:gap-5 px-5'>
        <ThirtyOff />
        <ThirtyOff />
      </div>
      <Categories />
      <Activities />
      <BestSelling />
      <Blog />
      <Testimonials />
      <Brand />

    </div>
  )
}

export default Home;