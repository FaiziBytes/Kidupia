// TodaySaleSidebar.jsx
import React, { useState } from "react";// optional: install @heroicons/react
import { XMarkIcon } from "@heroicons/react/24/solid"; 
const TodaySaleSidebar = ({ isOpen, onClose }) => {
  return (
    // Overlay
    <div
      className={`fixed inset-0 z-50 transition-all duration-300 ${
        isOpen ? "visible opacity-100" : "invisible opacity-0"
      }`}
    >
      {/* Semi-transparent background */}
      <div
        className="absolute inset-0 bg-opacity-40"
        onClick={onClose}
      ></div>

      {/* Sidebar */}
      <div
        className={`absolute top-0 right-0 h-full w-80 sm:w-96 bg-white shadow-lg p-6 flex flex-col transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold">Today's Sale</h2>
          <button onClick={onClose}>
            <XMarkIcon className="hover:cursor-pointer h-6 w-6 text-gray-700" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {/* Example Image on right side */}
          <img
            src="/your-image.png" // replace with the path to your uploaded image
            alt="Sale"
            className="w-full rounded-md mb-4"
          />
          {/* Example content: you can replace this with products list */}
          <ul className="space-y-4">
            <li className="flex items-center gap-4">
              <img
                src="https://via.placeholder.com/50"
                alt="Product"
                className="w-12 h-12 object-cover rounded-md"
              />
              <div>
                <p className="font-medium text-sm">Product Name</p>
                <p className="text-pink-500 text-sm font-semibold">$13</p>
              </div>
            </li>
            <li className="flex items-center gap-4">
              <img
                src="https://via.placeholder.com/50"
                alt="Product"
                className="w-12 h-12 object-cover rounded-md"
              />
              <div>
                <p className="font-medium text-sm">Product Name 2</p>
                <p className="text-pink-500 text-sm font-semibold">$22</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TodaySaleSidebar;
