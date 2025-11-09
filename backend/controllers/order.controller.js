import orderModel from "../models/order.model.js";
import productModel from "../models/product.model.js";
import userModel from "../models/user.model.js";

// Create a new order
export const createOrder = async (req, res) => {
  try {
    const { userId, orderItems, shippingAddress, paymentMethod } = req.body;

    if (!userId || !orderItems || orderItems.length === 0 || !shippingAddress) {
      return res.status(400).json({
        success: false,
        message: "User, order items, and shipping address are required",
      });
    }

    // Validate user exists
    const user = await userModel.findById(userId);
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid user ID" });
    }

    // Calculate total price and check stock
    let totalPrice = 0;
    for (const item of orderItems) {
      const product = await productModel.findById(item.productId);
      if (!product) {
        return res
          .status(400)
          .json({
            success: false,
            message: `Product not found: ${item.productId}`,
          });
      }

      // Find the variant if exists
      let variant = null;
      if (item.variantAttributes && product.variants.length > 0) {
        variant = product.variants.find((v) =>
          Object.entries(item.variantAttributes).every(
            ([key, value]) => v.attributes[key] === value
          )
        );
        if (!variant) {
          return res
            .status(400)
            .json({
              success: false,
              message: `Variant not found for product: ${product.title}`,
            });
        }
        if (variant.stock < item.quantity) {
          return res
            .status(400)
            .json({
              success: false,
              message: `Insufficient stock for variant of product: ${product.title}`,
            });
        }
        // Deduct stock
        variant.stock -= item.quantity;
        await product.save();
        totalPrice += variant.price * item.quantity;
      } else {
        // No variant, use product price
        if (product.quantity < item.quantity) {
          return res
            .status(400)
            .json({
              success: false,
              message: `Insufficient stock for product: ${product.title}`,
            });
        }
        product.quantity -= item.quantity;
        await product.save();
        totalPrice += product.price * item.quantity;
      }
    }

    const order = await orderModel.create({
      user: userId,
      orderItems,
      shippingAddress,
      paymentMethod,
      totalPrice,
      status: "Processing",
    });

    res
      .status(201)
      .json({ success: true, message: "Order placed successfully", order });
  } catch (error) {
    console.error("Error creating order:", error);
    res
      .status(500)
      .json({
        success: false,
        message: "Internal server error",
        error: error.message,
      });
  }
};

// Get all orders (admin)
export const getAllOrders = async (req, res) => {
  try {
    const orders = await orderModel
      .find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });
    res.status(200).json({ success: true, orders });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res
      .status(500)
      .json({
        success: false,
        message: "Internal server error",
        error: error.message,
      });
  }
};

// Get orders for a specific user
export const getUserOrders = async (req, res) => {
  try {
    const { userId } = req.params;
    const orders = await orderModel
      .find({ user: userId })
      .sort({ createdAt: -1 });
    res.status(200).json({ success: true, orders });
  } catch (error) {
    console.error("Error fetching user orders:", error);
    res
      .status(500)
      .json({
        success: false,
        message: "Internal server error",
        error: error.message,
      });
  }
};

// Update order status (admin)
export const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const order = await orderModel.findById(id);
    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }

    order.status = status;
    await order.save();

    res
      .status(200)
      .json({ success: true, message: "Order status updated", order });
  } catch (error) {
    console.error("Error updating order status:", error);
    res
      .status(500)
      .json({
        success: false,
        message: "Internal server error",
        error: error.message,
      });
  }
};

// Delete an order
export const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await orderModel.findByIdAndDelete(id);
    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }
    res
      .status(200)
      .json({ success: true, message: "Order deleted successfully" });
  } catch (error) {
    console.error("Error deleting order:", error);
    res
      .status(500)
      .json({
        success: false,
        message: "Internal server error",
        error: error.message,
      });
  }
};
