// // import { createContext, useState, useEffect } from "react";
// // import axios from "axios";
// // import { toast, ToastContainer } from "react-toastify";

// // export const CartContext = createContext();

// // export function CartProvider({ children }) {
// //   const [cart, setCart] = useState(null);
// //   const [loadingProducts, setLoadingProducts] = useState({});

// //   const user = JSON.parse(localStorage.getItem("user"));
// //   const token = localStorage.getItem("token");

// //   // Fetch cart for current user
// //   const fetchCart = async () => {
// //     const user = JSON.parse(localStorage.getItem("user"));
// //     const token = localStorage.getItem("token");
// //     if (!user || !token) {
// //       setCart(null);
// //       return;
// //     }

// //     try {
// //       const res = await axios.get(`http://localhost:3000/api/cart/${user._id}`, {
// //         headers: { Authorization: `Bearer ${token}` },
// //       });
// //       setCart(res.data.cart);
// //     } catch (err) {
// //       console.error("Error fetching cart:", err);
// //       setCart(null);
// //     }
// //   };

// //   // Add item to cart
// //   const addToCart = async (product) => {
// //     if (!user) {
// //       toast("Please login to add items to cart");
// //       <ToastContainer />
// //       return;
// //     }

// //     setLoadingProducts((prev) => ({ ...prev, [product._id]: true }));

// //     try {
// //       await axios.post(
// //         `http://localhost:3000/api/cart/add`,
// //         {
// //           userId: user._id,
// //           productId: product._id,
// //           quantity: 1,
// //         },
// //         { headers: { Authorization: `Bearer ${token}` } }
// //       );
// //       await fetchCart();
// //     } catch (err) {
// //       console.error("Error adding to cart:", err);
// //     } finally {
// //       setLoadingProducts((prev) => ({ ...prev, [product._id]: false }));
// //     }
// //   };

// //   // Remove item from cart
// //   const removeFromCart = async (productId) => {
// //     const user = JSON.parse(localStorage.getItem("user"));
// //     const token = localStorage.getItem("token");
// //     console.log("Removing product with ID:", productId);
// //     if (!user) return;

// //     try {
// //       await axios.delete(
// //         `http://localhost:3000/api/cart/remove`,
// //         { userId: user._id, productId },
// //         { headers: { Authorization: `Bearer ${token}` } }
// //       );
// //       await fetchCart();
// //     } catch (err) {
// //       console.error("Error removing from cart:", err);
// //     }
// //   };

// //   // Clear cart when user logs out
// //   const clearCart = () => {
// //     setCart(null);
// //   };

// //   useEffect(() => {
// //     fetchCart();
// //   }, []);

// //   return (
// //     <CartContext.Provider
// //       value={{ cart, addToCart, removeFromCart, fetchCart, loadingProducts, clearCart }}
// //     >
// //       {children}
// //     </CartContext.Provider>
// //   );
// // }


// import { createContext, useState, useEffect } from "react";
// import axios from "axios";
// import { toast, ToastContainer } from "react-toastify";

// export const CartContext = createContext();

// export function CartProvider({ children }) {
//   const [cart, setCart] = useState(null);
//   const [loadingProducts, setLoadingProducts] = useState({});

//   const user = JSON.parse(localStorage.getItem("user"));
//   const token = localStorage.getItem("token");

//   // Fetch cart for current user
//   const fetchCart = async () => {
//     const user = JSON.parse(localStorage.getItem("user"));
//     const token = localStorage.getItem("token");
//     if (!user || !token) {
//       setCart(null);
//       return;
//     }

//     try {
//       const res = await axios.get(`http://localhost:3000/api/cart/${user._id}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setCart(res.data.cart);
//     } catch (err) {
//       console.error("Error fetching cart:", err);
//       setCart(null);
//     }
//   };

//   // Add item to cart
//   const addToCart = async (product) => {
//     if (!user) {
//       toast("Please login to add items to cart");
//       return;
//     }

//     setLoadingProducts((prev) => ({ ...prev, [product._id]: true }));

//     try {
//       await axios.post(
//         `http://localhost:3000/api/cart/add`,
//         {
//           userId: user._id,
//           productId: product._id,
//           quantity: 1,
//         },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       await fetchCart();
//       toast.success("Item added to cart!", { autoClose: 1000 });
//     } catch (err) {
//       console.error("Error adding to cart:", err);
//       toast.error("Failed to add item to cart");
//     } finally {
//       setLoadingProducts((prev) => ({ ...prev, [product._id]: false }));
//     }
//   };

//   // Remove item from cart
//   const removeFromCart = async (productId) => {
//     const user = JSON.parse(localStorage.getItem("user"));
//     const token = localStorage.getItem("token");
//     console.log("Removing product with ID:", productId);
//     if (!user) return;

//     try {
//       // ✅ FIXED: Data must be in the config object under 'data' key
//       await axios.delete(
//         `http://localhost:3000/api/cart/remove`,
//         {
//           headers: { Authorization: `Bearer ${token}` },
//           data: { userId: user._id, productId }
//         }
//       );
//       await fetchCart();
//       toast.success("Item removed from cart!");
//     } catch (err) {
//       console.error("Error removing from cart:", err);
//       toast.error("Failed to remove item from cart");
//     }
//   };

//   // Clear cart when user logs out
//   const clearCart = () => {
//     setCart(null);
//   };

//   useEffect(() => {
//     fetchCart();
//   }, []);

//   return (
//     <CartContext.Provider
//       value={{ cart, addToCart, removeFromCart, fetchCart, loadingProducts, clearCart }}
//     >
//       {children}
//       <ToastContainer position="top-right" autoClose={2000} />
//     </CartContext.Provider>
//   );
// }













import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify"; // ✅ Import only toast, not ToastContainer

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState(null);
  const [loadingProducts, setLoadingProducts] = useState({});

  // Fetch cart for current user
  const fetchCart = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");
    if (!user || !token) {
      setCart(null);
      return;
    }

    try {
      const res = await axios.get(`http://localhost:3000/api/cart/${user._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCart(res.data.cart);
    } catch (err) {
      console.error("Error fetching cart:", err);
      setCart(null);
    }
  };

  // Add item to cart
  const addToCart = async (product) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");
    
    if (!user) {
      toast.warning("Please login to add items to cart", { autoClose: 2000 });
      return;
    }

    setLoadingProducts((prev) => ({ ...prev, [product._id]: true }));

    try {
      await axios.post(
        `http://localhost:3000/api/cart/add`,
        {
          userId: user._id,
          productId: product._id,
          quantity: 1,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      await fetchCart();
      toast.success("Item added to cart!", { autoClose: 1500 });
    } catch (err) {
      console.error("Error adding to cart:", err);
      toast.error("Failed to add item to cart", { autoClose: 2000 });
    } finally {
      setLoadingProducts((prev) => ({ ...prev, [product._id]: false }));
    }
  };

  // Remove item from cart
  const removeFromCart = async (productId) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");
    
    if (!user) return;

    try {
      await axios.delete(
        `http://localhost:3000/api/cart/remove`,
        {
          headers: { Authorization: `Bearer ${token}` },
          data: { userId: user._id, productId }
        }
      );
      await fetchCart();
      toast.success("Item removed from cart!", { autoClose: 1500 });
    } catch (err) {
      console.error("Error removing from cart:", err);
      toast.error("Failed to remove item from cart", { autoClose: 2000 });
    }
  };

  // Clear cart when user logs out
  const clearCart = () => {
    setCart(null);
  };

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, fetchCart, loadingProducts, clearCart }}
    >
      {children}
      {/* ❌ REMOVED: ToastContainer from here */}
    </CartContext.Provider>
  );
}