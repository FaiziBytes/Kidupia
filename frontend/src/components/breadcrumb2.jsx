import bgImage from "../images/breadcumb-bkg.jpg"
import { useEffect } from "react";
const BreadcrumbBanner2 = ({ category, title }) => {
      useEffect(() => {
            window.scrollTo(0, 0);
      }, []);

      return (
            <div
                  className="py-7 sm:py-11 md:py-20 px-6 bg-cover bg-center rounded-md"
                  style={{
                        backgroundImage: `url(${bgImage})`, // USE VARIABLE
                  }}
            >
                  <nav className="text-center text-lg font-medium">
                        Home / Shop / {category} / {title}
                  </nav>
            </div>
      );
};

export default BreadcrumbBanner2;
