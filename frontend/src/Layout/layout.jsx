// import Footer from "../HomePageComponents/Footer";
// import Navbar from "../HomePageComponents/Navbar";
// import Navbar2 from "../HomePageComponents/Navbar2";
// import Newsletter from "../HomePageComponents/newsletter";

// const Layout = ({ children }) => {
//       return (
//             <>
//                   <Navbar />
//                   <Navbar2 />
//                   {children}
//                   <Newsletter />
//                   <Footer />
//             </>
//       );
// };

// export default Layout;


import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../HomePageComponents/Navbar";
import Navbar2 from "../HomePageComponents/Navbar2";
import Newsletter from "../HomePageComponents/newsletter";

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
