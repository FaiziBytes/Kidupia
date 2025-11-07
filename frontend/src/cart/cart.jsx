
import React from "react";

/**
 * 🛒 CartSideBar Component
 * ------------------------
 * A responsive and professional sidebar that slides in from the right side.
 * Used to display shopping cart items or menus.
 *
 * Props:
 *  - isOpen (boolean): Controls visibility of the sidebar
 *  - onClose (function): Closes the sidebar
 */

export default function CartSideBar({ isOpen, onClose }) {
  return (
    <>
      {/* ✅ Overlay (dark background when sidebar is open) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-opacity-40 z-1140 transition-opacity"
          onClick={onClose} // Close when clicking outside
        ></div>
      )}

      {/* ✅ Sidebar Panel (slides in from right) */}
      <aside
        className={`fixed top-0 right-0 h-full w-80 sm:w-96 bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "translate-x-full"}
        `}
      >
        {/* =========================
            🧩 Header Section
        ========================== */}
        <div className="flex items-center justify-between px-5 py-4 border-b">
          <h2 className="text-lg font-semibold text-gray-800">Your Cart</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
          >
            ×
          </button>
        </div>

        {/* =========================
            🧺 Cart Items Section
        ========================== */}
        <div className="p-5 space-y-4 overflow-y-auto h-[calc(100%-150px)]">
          {/* Example Empty Cart Message */}
          <p className="text-gray-500 text-center mt-10">
            Your cart is currently empty.
          </p>

          {/* 🔹 Example of what a cart item could look like:
          <div className="flex items-center justify-between border-b pb-3">
            <div className="flex items-center space-x-3">
              <img
                src="https://via.placeholder.com/60"
                alt="Product"
                className="w-14 h-14 object-cover rounded-md"
              />
              <div>
                <h3 className="text-gray-800 font-medium">Product Name</h3>
                <p className="text-sm text-gray-500">1 × $25</p>
              </div>
            </div>
            <span className="text-gray-800 font-semibold">$25</span>
          </div> 
          */}
        </div>

        {/* =========================
            💳 Footer Section
        ========================== */}
        <div className="absolute bottom-0 left-0 w-full border-t p-5 bg-white">
          <button
            className="w-full bg-pink-500 hover:bg-pink-600 text-white font-semibold py-3 rounded-lg transition"
            onClick={onClose}
          >
            Proceed to Checkout
          </button>
        </div>
      </aside>
    </>
  );
}
