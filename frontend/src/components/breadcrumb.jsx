import React from "react";
import { useLocation } from "react-router-dom";
import bgimage from "../images/breadcumb-bkg.jpg";

const BreadcrumbBanner = () => {
  
  const location = useLocation();
  const pathArray = location.pathname.split("/").filter((item) => item);
  const breadcrumb = pathArray.join(" / ").toUpperCase() || "HOME";
  const pageTitle = pathArray.at(-1)
    ? pathArray.at(-1).charAt(0).toUpperCase() + pathArray.at(-1).slice(1)
    : "Home";

  return (
    <div
      className="w-full flex justify-center items-center bg-no-repeat bg-cover bg-center aspect-[16/3] sm:aspect-[16/2.5] md:aspect-[16/2] lg:aspect-[16/2.3]"
      style={{ backgroundImage: `url(${bgimage})` }}
    >
      <div className="text-center px-4 sm:px-8">
        {/* Breadcrumb path */}
        <p className="text-sm sm:text-base mb-2 font-medium tracking-wide">
          {breadcrumb}
        </p>

        {/* Page title */}
        <h1 className="text-xl sm:text-2xl md:text-4xl font-medium">
          {pageTitle}
        </h1>
      </div>
    </div>
  );
};

export default BreadcrumbBanner;
