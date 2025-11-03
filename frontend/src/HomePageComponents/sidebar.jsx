import { IoClose } from "react-icons/io5";
import logo from "../assets/logo.svg"
const Sidebar = ({ isOpen, onClose }) => {
  return (
    <div
      className={`fixed top-0 left-0 h-full w-[60%] bg-white shadow-lg z-50 transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-300 ease-in-out`}
    >
      {/* Header */}
      <div className="flex justify-between items-center px-4 py-5 border-b border-b-[#DEDEDE]">
        <img src={logo} width={"150px"} alt="" />
        <IoClose onClick={onClose} className="text-2xl cursor-pointer" />
      </div>

      {/* Menu Items */}
      <ul className="p-4 space-y-3 font-normal text-[17px]">
        <li className="cursor-pointer hover:text-blue-600">Home</li>
        <li className="cursor-pointer hover:text-blue-600">Shop</li>
        <li className="cursor-pointer hover:text-blue-600">Categories</li>
        <li className="cursor-pointer hover:text-blue-600">Contact</li>
      </ul>
    </div>
  );
};

export default Sidebar;
