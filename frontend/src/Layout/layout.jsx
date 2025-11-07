
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Navbar2 from "../components/Navbar2";
import Newsletter from "../components/newsletter";

const Layout = () => {
  return (
    <>
      <Navbar />
      <Navbar2 />
      <Outlet />         {/* 👈 This is where Home or Shop will appear */}
      <Newsletter />
      <Footer />
    </>
  );
};

export default Layout;
