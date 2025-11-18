import React, { useContext, useEffect } from "react";
import { CartContext } from "../contexts/CartContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function CartSideBar({ isOpen, onClose }) {
  const { cart, fetchCart, removeFromCart } = useContext(CartContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (isOpen) fetchCart();
  }, [isOpen]);

  return (
    <>
      {isOpen && <div className="fixed inset-0 z-40" onClick={onClose} />}
      <aside
        className={`fixed top-0 right-0 h-full w-80 bg-white shadow-xl z-50 
          transform transition-transform duration-300 
          flex flex-col
          ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex justify-between p-4 border-b flex-shrink-0">
          <h2 className="text-lg font-semibold">Your Cart</h2>
          <button onClick={onClose} className="text-xl">
            ×
          </button>
        </div>

        <div className="p-5 flex-grow overflow-y-auto">
          {!cart?.items?.length ? (
            <p className="text-gray-500 text-center mt-10">Your cart is empty.</p>
          ) : (
            cart.items.map((item, index) => (
              <div key={item._id} className="border-b py-3 flex items-center gap-4">
                <img
                  src={item.product.images[0] || "https://via.placeholder.com/64"}
                  alt={item.product.title}
                  className="w-16 h-16 object-cover rounded"
                />
                <div className="flex-grow min-w-0">
                  <p className="font-medium truncate">{item.product.title}</p>
                  <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                </div>
                <button
                  onClick={() => removeFromCart(item.product._id)}
                  className="text-red-600 hover:text-red-800 font-semibold whitespace-nowrap ml-2"
                >
                  Remove
                </button>
              </div>
            ))
          )}
        </div>

        <div className="border-t p-5 bg-white flex-shrink-0">
          <div className="pb-4">
            <p className="font-semibold text-lg">
              Subtotal: <span className="text-pink-500">${cart?.totalPrice || 0}</span>
            </p>
            <p className="text-sm text-gray-500">Shipping & taxes calculated at checkout.</p>
          </div>

          <button
            className="w-full bg-pink-500 text-white py-3 font-medium rounded"
            onClick={() => {
              onClose();
              navigate("/checkout");
            }}
          >
            Proceed to Checkout
          </button>
        </div>
      </aside>
    </>
  );
}
