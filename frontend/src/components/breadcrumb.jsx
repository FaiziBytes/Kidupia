import React, { useEffect, useState } from "react";
import bgimage from "../images/breadcumb-bkg.jpg";
import { useLocation } from "react-router-dom";
const BreadcrumbBanner = () => {
      const location = useLocation();
  return (
    
    <div
      className="w-full flex justify-center items-center
      bg-no-repeat bg-cover bg-[center_left_30%] aspect-[16/2.5]"
      style={{ backgroundImage: `url(${bgimage})` }}
    >
      <div>
      {
            <h1
            className="text-xl"
            >{location.pathname.split("/").filter((itetm)=>itetm).join("/")}</h1>
      }
      {
        <h1
        className="text-[25px] font-medium text-center"
        >{
             location.pathname.split("/").at(-1)
            }</h1>
      }
      </div>
    </div>
  );
};

export default BreadcrumbBanner;
