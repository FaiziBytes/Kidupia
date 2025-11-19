// import React, { useContext, useState } from "react";
// import { CartContext } from "../contexts/CartContext";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const Checkout = () => {
//   const { cart, clearCart } = useContext(CartContext);
//   const navigate = useNavigate();

//   // Get user from localStorage
//   const storedUser = JSON.parse(localStorage.getItem("user"));
//   const token = localStorage.getItem("token");
//   const [form, setForm] = useState({
//     name: "",
//     phone: "",
//     address: "",
//     city: "",
//   });

//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   // Handle form input change
//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   // Place order API call
//   const placeOrder = async (e) => {
//     console.log(token);
//     console.log(storedUser);
//     e.preventDefault();

//     if (!storedUser || !token) {
//       alert("Please login first to place an order.");
//       navigate("/login");
//       return;
//     }

//     if (!cart?.items || cart.items.length === 0) {
//       alert("Your cart is empty!");
//       return;
//     }

//     setLoading(true);
//     setError("");

//     try {
//      cart.items.map((item) => {
//   console.log(item);
// });
//       const orderData = {
//         userId: storedUser._id,
//         orderItems: cart.items.map((item) => ({
//         product: item.product._id,
//         quantity: item.quantity,
//         price: item.price,
//         variantAttributes: item.variantAttributes || {},
//         })),
//         shippingAddress: form,
//         paymentMethod: "COD",
//         totalPrice:
//           (cart.totalPrice || 0) - (cart.discount || 0) + (cart.shipping || 2),
//       };

//       const response = await axios.post("http://localhost:3000/api/orders/", orderData, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//       });

//       console.log("Order Placed:", response.data);
//       clearCart(); // Clear cart after successful order
//       navigate(`/order-success/${response.data.order._id}`);
//     } catch (err) {
//       console.error(err);
//       setError(err.response?.data?.message || "Something went wrong");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="w-full bg-gray-50 py-10">
//       <div className="max-w-5xl mx-auto px-4 grid md:grid-cols-3 gap-8">
//         {/* LEFT: SHIPPING FORM */}
//         <form
//           onSubmit={placeOrder}
//           className="md:col-span-2 bg-white shadow-lg rounded-2xl p-6"
//         >
//           <h2 className="text-2xl font-semibold mb-4 text-pink-600">
//             Shipping Information
//           </h2>

//           <div className="space-y-4">
//             {["name", "phone", "address", "city"].map((field) => (
//               <div key={field}>
//                 <label className="text-gray-600 text-sm capitalize">
//                   {field === "name"
//                     ? "Full Name"
//                     : field === "phone"
//                       ? "Phone Number"
//                       : field === "address"
//                         ? "Address"
//                         : "City"}
//                 </label>
//                 {field === "address" ? (
//                   <textarea
//                     name={field}
//                     value={form[field]}
//                     onChange={handleChange}
//                     placeholder="Enter your details"
//                     required
//                     rows={3}
//                     className="w-full mt-1 px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-400"
//                   ></textarea>
//                 ) : (
//                   <input
//                     type="text"
//                     name={field}
//                     value={form[field]}
//                     onChange={handleChange}
//                     placeholder={`Enter your ${field}`}
//                     required
//                     className="w-full mt-1 px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-400"
//                   />
//                 )}
//               </div>
//             ))}
//           </div>

//           {error && (
//             <p className="text-red-500 mt-2 font-medium">{error}</p>
//           )}

//           <button
//             type="submit"
//             disabled={loading}
//             className={`w-full mt-6 bg-pink-500 hover:bg-pink-600 text-white py-3 rounded-xl font-semibold shadow-md transition ${loading ? "opacity-50 cursor-not-allowed" : ""
//               }`}
//           >
//             {loading ? "Placing Order..." : "Place Order"}
//           </button>
//         </form>

//         {/* RIGHT: ORDER SUMMARY */}
//         <div className="bg-white shadow-lg rounded-2xl p-6">
//           <h2 className="text-2xl font-semibold text-pink-600 mb-4">
//             Order Summary
//           </h2>

//           <div className="space-y-3 border-b pb-4">
//             <div className="flex justify-between text-gray-700">
//               <span>Subtotal</span>
//               <span>${cart?.totalPrice || 0}</span>
//             </div>
//             <div className="flex justify-between text-gray-700">
//               <span>Shipping</span>
//               <span>${cart?.shipping || 2}</span>
//             </div>
//             <div className="flex justify-between text-gray-700">
//               <span>Discount</span>
//               <span>${cart?.discount || 0}</span>
//             </div>
//           </div>

//           <div className="flex justify-between text-lg font-bold text-gray-900 mt-4">
//             <span>Total</span>
//             <span>
//               $
//               {(cart?.totalPrice || 0) -
//                 (cart?.discount || 0) +
//                 (cart?.shipping || 2)}
//             </span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Checkout;


import React, { useContext, useState, useEffect } from "react";
import { CartContext } from "../contexts/CartContext";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

const Checkout = () => {
  const { cart, clearCart, addToCart } = useContext(CartContext);
  const navigate = useNavigate();
  const location = useLocation();

  const storedUser = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  const [form, setForm] = useState({ name: "", phone: "", address: "", city: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Buy Now product (from Product page)
  const buyNowProduct = location.state?.buyNowProduct;
  const buyNowQuantity = location.state?.buyNowQuantity || 1;

  // If Buy Now, overwrite cart items temporarily
  const [checkoutItems, setCheckoutItems] = useState([]);

  useEffect(() => {
    if (buyNowProduct) {
      setCheckoutItems([{ product: buyNowProduct, quantity: buyNowQuantity, price: buyNowProduct.price }]);
    } else {
      setCheckoutItems(cart.items || []);
    }
  }, [buyNowProduct, buyNowQuantity, cart]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const placeOrder = async (e) => {
    e.preventDefault();

    if (!storedUser || !token) {
      alert("Please login first to place an order.");
      navigate("/login");
      return;
    }

    if (!checkoutItems || checkoutItems.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const orderData = {
        userId: storedUser._id,
        orderItems: checkoutItems.map((item) => ({
          product: item.product._id,
          quantity: item.quantity,
          price: item.price,
          variantAttributes: item.variantAttributes || {},
        })),
        shippingAddress: form,
        paymentMethod: "COD",
        totalPrice:
          checkoutItems.reduce((sum, item) => sum + item.price * item.quantity, 0) + 2, // + shipping
      };

      const response = await axios.post("http://localhost:3000/api/orders/", orderData, {
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      });

      console.log("Order Placed:", response.data);

      if (!buyNowProduct) clearCart(); // Clear cart only if regular cart checkout
      navigate(`/order-success/${response.data.order._id}`);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full bg-gray-50 py-10">
      <div className="max-w-5xl mx-auto px-4 grid md:grid-cols-3 gap-8">

        {/* LEFT: Shipping Form */}
        <form onSubmit={placeOrder} className="md:col-span-2 bg-white shadow-lg rounded-2xl p-6">
          <h2 className="text-2xl font-semibold mb-4 text-pink-600">Shipping Information</h2>

          <div className="space-y-4">
            {["name", "phone", "address", "city"].map((field) => (
              <div key={field}>
                <label className="text-gray-600 text-sm capitalize">{field === "name" ? "Full Name" : field === "phone" ? "Phone Number" : field === "address" ? "Address" : "City"}</label>
                {field === "address" ? (
                  <textarea
                    name={field}
                    value={form[field]}
                    onChange={handleChange}
                    placeholder="Enter your details"
                    required
                    rows={3}
                    className="w-full mt-1 px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-400"
                  />
                ) : (
                  <input
                    type="text"
                    name={field}
                    value={form[field]}
                    onChange={handleChange}
                    placeholder={`Enter your ${field}`}
                    required
                    className="w-full mt-1 px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-400"
                  />
                )}
              </div>
            ))}
          </div>

          {error && <p className="text-red-500 mt-2 font-medium">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className={`w-full mt-6 bg-pink-500 hover:bg-pink-600 text-white py-3 rounded-xl font-semibold shadow-md transition ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            {loading ? "Placing Order..." : "Place Order"}
          </button>
        </form>

        {/* RIGHT: Order Summary */}
        <div className="bg-white shadow-lg rounded-2xl p-6">
          <h2 className="text-2xl font-semibold text-pink-600 mb-4">Order Summary</h2>

          <div className="space-y-3 border-b pb-4">
            {checkoutItems.map((item, idx) => (
              <div key={idx} className="flex justify-between text-gray-700">
                <span>{item.product.title} x {item.quantity}</span>
                <span>${item.price * item.quantity}</span>
              </div>
            ))}
          </div>

          <div className="flex justify-between text-lg font-bold text-gray-900 mt-4">
            <span>Total</span>
            <span>${checkoutItems.reduce((sum, item) => sum + item.price * item.quantity, 0) + 2}</span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Checkout;
