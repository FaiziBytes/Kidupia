import cartModel from "../models/cartItem.model.js";
import productModel from "../models/product.model.js";

// // Add item to cart
// export const addToCart = async (req, res) => {
//   try {
//     const { userId, productId, quantity, variantAttributes } = req.body;

//     if (!userId || !productId || !quantity) {
//       return res.status(400).json({
//         success: false,
//         message: "User, product, and quantity are required",
//       });
//     }

//     const product = await productModel.findById(productId);
//     if (!product)
//       return res.status(404).json({ success: false, message: "Product not found" });

//     const finalPrice = product.discountPrice || product.price; // Secure price

//     let cart = await cartModel.findOne({ user: userId });
//     if (!cart) {
//       cart = await cartModel.create({ user: userId, items: [] });
//     }

//     // Find existing product + variant match
//     const existingItemIndex = cart.items.findIndex(
//       (item) =>
//         item.product.toString() === productId &&
//         JSON.stringify(item.variantAttributes) === JSON.stringify(variantAttributes || {})
//     );

//     if (existingItemIndex > -1) {
//       cart.items[existingItemIndex].quantity += quantity;
//     } else {
//       cart.items.push({
//         product: productId,
//         quantity,
//         variantAttributes: variantAttributes || {},
//         price: finalPrice,
//       });
//     }

//     // Recalculate total price
//     cart.totalPrice = cart.items.reduce(
//       (total, item) => total + item.price * item.quantity,
//       0
//     );

//     await cart.save();

//     res.status(200).json({ success: true, message: "Item added to cart", cart });
//   } catch (error) {
//     console.error("Error adding to cart:", error);
//     res.status(500).json({
//       success: false,
//       message: "Internal server error",
//       error: error.message,
//     });
//   }
// };

// // Update cart item quantity
// export const updateCartItem = async (req, res) => {
//   try {
//     const { userId, productId, price, quantity, variantAttributes } = req.body;

//     const cart = await cartModel.findOne({ user: userId });
//     if (!cart)
//       return res
//         .status(404)
//         .json({ success: false, message: "Cart not found" });

//     const itemIndex = cart.items.findIndex(
//       (item) =>
//         item.product.toString() === productId &&
//         JSON.stringify(item.variantAttributes || {}) ===
//           JSON.stringify(variantAttributes || {})
//     );

//     if (itemIndex === -1) {
//       return res
//         .status(404)
//         .json({ success: false, message: "Item not found in cart" });
//     }

//     if (quantity <= 0) {
//       cart.items.splice(itemIndex, 1); // Remove item if quantity 0
//     } else {
//       cart.items[itemIndex].quantity = quantity;
//       cart.items[itemIndex].price = price;
//     }

//     await cart.save();

//     res.status(200).json({ success: true, message: "Cart updated", cart });
//   } catch (error) {
//     console.error("Error updating cart:", error);
//     res
//       .status(500)
//       .json({
//         success: false,
//         message: "Internal server error",
//         error: error.message,
//       });
//   }
// };

// // Remove item from cart
// // where to adjust price
// export const removeCartItem = async (req, res) => {
//   try {
//     const { userId, productId, price, variantAttributes } = req.body;

//     const cart = await cartModel.findOne({ user: userId });
//     if (!cart)
//       return res
//         .status(404)
//         .json({ success: false, message: "Cart not found" });

//     cart.items = cart.items.filter(
//       (item) =>
//         !(
//           item.product.toString() === productId &&
//           JSON.stringify(item.variantAttributes || {}) ===
//           JSON.stringify(variantAttributes || {})
//         )
//     );

//     await cart.save();

//     res
//       .status(200)
//       .json({ success: true, message: "Item removed from cart", cart });
//   } catch (error) {
//     console.error("Error removing cart item:", error);
//     res
//       .status(500)
//       .json({
//         success: false,
//         message: "Internal server error",
//         error: error.message,
//       });
//   }
// };

// // Get user cart
// export const getUserCart = async (req, res) => {
//   try {

//     const { userId } = req.params;
//     const cart = await cartModel
//       .findOne({ user: userId })
//       .populate("items.product", "title price images variants");
//     if (!cart)
//       return res
//         .status(404)
//         .json({ success: false, message: "Cart not found" });

//     res.status(200).json({ success: true, cart });
//   } catch (error) {
//     console.error("Error fetching cart:", error);
//     res
//       .status(500)
//       .json({
//         success: false,
//         message: "Internal server error",
//         error: error.message,
//       });
//   }
// };

// // Clear cart
// export const clearCart = async (req, res) => {
//   try {
//     const { userId } = req.params;

//     const cart = await cartModel.findOne({ user: userId });
//     if (!cart)
//       return res
//         .status(404)
//         .json({ success: false, message: "Cart not found" });

//     cart.items = [];
//     await cart.save();

//     res.status(200).json({ success: true, message: "Cart cleared", cart });
//   } catch (error) {
//     console.error("Error clearing cart:", error);
//     res
//       .status(500)
//       .json({
//         success: false,
//         message: "Internal server error",
//         error: error.message,
//       });
//   }
// };




export const addToCart = async (req, res) => {
  try {
    const { userId, productId, quantity, variantAttributes } = req.body;

    if (!userId || !productId || !quantity) {
      return res.status(400).json({
        success: false,
        message: "User, product, and quantity are required",
      });
    }

    const product = await productModel.findById(productId);
    if (!product)
      return res.status(404).json({ success: false, message: "Product not found" });

    const finalPrice = product.discountPrice || product.price; // Secure price

    let cart = await cartModel.findOne({ user: userId });
    if (!cart) {
      cart = await cartModel.create({ user: userId, items: [] });
    }

    // Find existing product + variant match
    const existingItemIndex = cart.items.findIndex(
      (item) =>
        item.product.toString() === productId &&
        JSON.stringify(item.variantAttributes) === JSON.stringify(variantAttributes || {})
    );

    if (existingItemIndex > -1) {
      cart.items[existingItemIndex].quantity += quantity;
    } else {
      cart.items.push({
        product: productId,
        quantity,
        variantAttributes: variantAttributes || {},
        price: finalPrice,
      });
    }

    // Recalculate total price
    cart.totalPrice = cart.items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );

    await cart.save();

    res.status(200).json({ success: true, message: "Item added to cart", cart });
  } catch (error) {
    console.error("Error adding to cart:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// Update cart item quantity
export const updateCartItem = async (req, res) => {
  try {
    const { userId, productId, quantity, variantAttributes } = req.body;

    if (!userId || !productId || quantity === undefined) {
      return res.status(400).json({
        success: false,
        message: "User, product, and quantity are required",
      });
    }

    const cart = await cartModel.findOne({ user: userId });
    if (!cart)
      return res
        .status(404)
        .json({ success: false, message: "Cart not found" });

    const itemIndex = cart.items.findIndex(
      (item) =>
        item.product.toString() === productId &&
        JSON.stringify(item.variantAttributes || {}) ===
          JSON.stringify(variantAttributes || {})
    );

    if (itemIndex === -1) {
      return res
        .status(404)
        .json({ success: false, message: "Item not found in cart" });
    }

    if (quantity <= 0) {
      cart.items.splice(itemIndex, 1); // Remove item if quantity 0
    } else {
      cart.items[itemIndex].quantity = quantity;
      // Price remains the same as when item was added
    }

    // Recalculate total price
    cart.totalPrice = cart.items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );

    await cart.save();

    // Populate product details before sending response
    await cart.populate({
      path: 'items.product',
      select: 'title price discountPrice images description category stock variants'
    });

    res.status(200).json({ success: true, message: "Cart updated", cart });
  } catch (error) {
    console.error("Error updating cart:", error);
    res
      .status(500)
      .json({
        success: false,
        message: "Internal server error",
        error: error.message,
      });
  }
};

// Remove item from cart
export const removeCartItem = async (req, res) => {
  try {
    const { userId, productId, variantAttributes } = req.body;

    if (!userId || !productId) {
      return res.status(400).json({
        success: false,
        message: "User and product are required",
      });
    }

    const cart = await cartModel.findOne({ user: userId });
    if (!cart)
      return res
        .status(404)
        .json({ success: false, message: "Cart not found" });

    cart.items = cart.items.filter(
      (item) =>
        !(
          item.product.toString() === productId &&
          JSON.stringify(item.variantAttributes || {}) ===
          JSON.stringify(variantAttributes || {})
        )
    );

    // Recalculate total price
    cart.totalPrice = cart.items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );

    await cart.save();

    // Populate product details before sending response
    await cart.populate({
      path: 'items.product',
      select: 'title price discountPrice images description category stock variants'
    });

    res
      .status(200)
      .json({ success: true, message: "Item removed from cart", cart });
  } catch (error) {
    console.error("Error removing cart item:", error);
    res
      .status(500)
      .json({
        success: false,
        message: "Internal server error",
        error: error.message,
      });
  }
};

// Get user cart
export const getUserCart = async (req, res) => {
  try {
    const { userId } = req.params;
    
    const cart = await cartModel
      .findOne({ user: userId })
      .populate({
        path: 'items.product',
        select: 'title price discountPrice images description category stock variants'
      });

    if (!cart)
      return res
        .status(404)
        .json({ success: false, message: "Cart not found" });

    res.status(200).json({ success: true, cart });
  } catch (error) {
    console.error("Error fetching cart:", error);
    res
      .status(500)
      .json({
        success: false,
        message: "Internal server error",
        error: error.message,
      });
  }
};

// Clear cart
export const clearCart = async (req, res) => {
  try {
    const { userId } = req.params;

    const cart = await cartModel.findOne({ user: userId });
    if (!cart)
      return res
        .status(404)
        .json({ success: false, message: "Cart not found" });

    cart.items = [];
    cart.totalPrice = 0;
    await cart.save();

    res.status(200).json({ success: true, message: "Cart cleared", cart });
  } catch (error) {
    console.error("Error clearing cart:", error);
    res
      .status(500)
      .json({
        success: false,
        message: "Internal server error",
        error: error.message,
      });
  }
};