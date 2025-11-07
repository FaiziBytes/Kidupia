import ThirtyOff from "../components/30"
import BestSelling from "../components/bestSelling"
import Blog from "../components/blog"
import Brand from "../components/brand"
import Testimonials from "../components/Testimonials";
import Categories from "../components/categories";
import Activities from "../components/Activities";
import Hero from "../components/Hero";
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