import App from "../images/app.png";
import Google from "../images/google.png";
import payment from "../images/payment.png";
import { IoLocationOutline } from "react-icons/io5";
import { MdOutlinePhone } from "react-icons/md";
import { CgMail } from "react-icons/cg";
import { FaFacebookF } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa6";
import { FaPinterestSquare } from "react-icons/fa";
import { IoLogoYoutube } from "react-icons/io";

const Footer = () => {
  const quickLinks = ["About Us", "Redeem Voucher", "Contact Us", "Latest News", "Shipping", "Payment"];
  const yourAccount = ["Product Support", "Checkout", "License Policy", "Affiliate", "Locality", "Order Tracking"];
  const usefulLinks = ["Contact Us", "Shipping", "Sitemap", "FAQs", "Store Us", "About Us"];

  return (
    <footer className="w-full bg-[#F9F9F9] text-[#333]">
      {/* TOP SECTION */}
      <div className="max-w-[1300px] mx-auto px-6 py-10 flex flex-col md:flex-row md:justify-between gap-10">
        {/* LEFT SIDE (About + Links) */}
        <div className="flex flex-col md:flex-row md:w-[70%] gap-8">
          {/* About */}
          <div className="md:w-[35%]">
            <h1 className="text-[20px] font-semibold mb-2">About Our Store</h1>
            <p className="text-[15px] leading-6 text-gray-600">
              Welcome to our store, where we pride ourselves on providing exceptional products
              and unparalleled customer service. Our store is a haven for those who appreciate
              quality, style, and innovation.
            </p>
            <div className="py-4 flex flex-col lg:flex-row gap-3">
              <img src={App} alt="App Store" className="w-[120px]" />
              <img src={Google} alt="Google Play" className="w-[120px]" />
            </div>
          </div>

          {/* Links */}
          <div className="flex flex-wrap md:flex-nowrap md:w-[65%] gap-8 md:gap-12">
            {/* Quick Links */}
            <div>
              <h1 className="text-[20px] font-semibold mb-2">Quick Links</h1>
              {quickLinks.map((link, index) => (
                <p key={index} className="text-[16px] py-1 cursor-pointer hover:text-gray-500">
                  {link}
                </p>
              ))}
            </div>

            {/* Your Account */}
            <div>
              <h1 className="text-[20px] font-semibold mb-2">Your Account</h1>
              {yourAccount.map((link, index) => (
                <p key={index} className="text-[16px] py-1 cursor-pointer hover:text-gray-500">
                  {link}
                </p>
              ))}
            </div>

            {/* Useful Links */}
            <div>
              <h1 className="text-[20px] font-semibold mb-2">Useful Links</h1>
              {usefulLinks.map((link, index) => (
                <p key={index} className="text-[16px] py-1 cursor-pointer hover:text-gray-500">
                  {link}
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT SIDE (Contact Info) */}
        <div className="md:w-[30%] order-last md:order-none flex flex-col gap-4">
          <div className="flex items-start gap-3">
            <IoLocationOutline className="text-[22px] mt-[3px]" />
            <p className="text-[16px] leading-6">
              60 29th Street, San Francisco, 94110 <br />
              507-Union Trade Center, USA
            </p>
          </div>
          <div className="flex items-center gap-3">
            <MdOutlinePhone className="text-[22px]" />
            <p className="text-[16px]">+92 309 44 14138</p>
          </div>
          <div className="flex items-center gap-3">
            <CgMail className="text-[22px]" />
            <p className="text-[16px]">support@kidupia.com</p>
          </div>
        </div>
      </div>

      <hr className="border-gray-300" />

      {/* BOTTOM SECTION */}
      <div className="max-w-[1300px] mx-auto flex flex-col md:flex-row justify-between items-center px-6 py-6 gap-6 md:gap-0">
        {/* Social Icons */}
        <div className="flex gap-3">
          {[FaFacebookF, FaXTwitter, FaInstagram, FaPinterestSquare, IoLogoYoutube].map((Icon, index) => (
            <div key={index} className="bg-[#F5F5F5] p-3 rounded-full hover:bg-gray-200 transition">
              <Icon className="text-[18px]" />
            </div>
          ))}
        </div>

        {/* Center Text */}
        <div className="text-center text-[15px] text-gray-700">
          <p>© 2025 Kidupia Demo - Theme by</p>
          <p className="font-medium">Faizan, Babar, Junaid</p>
        </div>

        {/* Payment */}
        <div>
          <img src={payment} alt="Payment Methods" className="w-[220px]" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
