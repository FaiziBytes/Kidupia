import orderModel from "../models/order.model.js";
import cartModel from "../models/cartItem.model.js";
import productModel from "../models/product.model.js";
import userModel from "../models/user.model.js";

// Create a new order from cart
export const createOrder = async (req, res) => {
  try {
    const { userId, shippingAddress, paymentMethod } = req.body;

    if (!userId || !shippingAddress || !paymentMethod) {
      return res.status(400).json({
        success: false,
        message: "User, shipping address, and payment method are required",
      });
    }

    // Validate user exists
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: "User not found" 
      });
    }

    // Validate shipping address fields
    const requiredFields = ["name", "phone", "address", "city"];
    for (const field of requiredFields) {
      if (!shippingAddress[field]) {
        return res.status(400).json({
          success: false,
          message: `${field} is required in shipping address`,
        });
      }
    }

    // Get user's cart with populated products
    const cart = await cartModel.findOne({ user: userId }).populate("items.product");

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Cart is empty",
      });
    }

    // Validate stock and prepare order items
    const orderItems = [];
    let totalPrice = 0;

    for (const item of cart.items) {
      const product = await productModel.findById(item.product._id);

      if (!product) {
        return res.status(404).json({
          success: false,
          message: `Product not found`,
        });
      }

      // Check if product has enough stock
      if (product.stock < item.quantity) {
        return res.status(400).json({
          success: false,
          message: `Insufficient stock for ${product.title}. Available: ${product.stock}`,
        });
      }

      // Convert variantAttributes object to Map for MongoDB
      const variantMap = new Map(Object.entries(item.variantAttributes || {}));

      orderItems.push({
        product: product._id,
        variant: variantMap,
        quantity: item.quantity,
        price: item.price,
      });

      totalPrice += item.price * item.quantity;

      // Update product stock
      product.stock -= item.quantity;
      await product.save();
    }

    // Create order
    const order = await orderModel.create({
      user: userId,
      orderItems,
      shippingAddress,
      paymentMethod: paymentMethod || "COD",
      paymentStatus: paymentMethod === "COD" ? "pending" : "paid",
      totalPrice,
    });

    // Clear cart after successful order
    cart.items = [];
    cart.totalPrice = 0;
    await cart.save();

    // Populate order details for response
    await order.populate("user", "name email");
    await order.populate("orderItems.product", "title images category price");

    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      order,
    });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// Get all orders (admin)
export const getAllOrders = async (req, res) => {
  try {
    const { status, page = 1, limit = 10 } = req.query;

    const query = status ? { orderStatus: status } : {};

    const orders = await orderModel
      .find(query)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .populate("user", "name email")
      .populate("orderItems.product", "title images category");

    const count = await orderModel.countDocuments(query);

    res.status(200).json({
      success: true,
      orders,
      totalPages: Math.ceil(count / limit),
      currentPage: parseInt(page),
      totalOrders: count,
    });
  } catch (error) {
    console.error("Error fetching all orders:", error);
    res.status(500).json({
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
      .sort({ createdAt: -1 })
      .populate("orderItems.product", "title images category price");

    res.status(200).json({ 
      success: true, 
      orders 
    });
  } catch (error) {
    console.error("Error fetching user orders:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// Get single order by ID
export const getOrderById = async (req, res) => {
  try {
    const { orderId } = req.params;

    const order = await orderModel
      .findById(orderId)
      .populate("user", "name email")
      .populate("orderItems.product", "title images category price");

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    console.error("Error fetching order:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// Update order status (admin)
export const updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { orderStatus, paymentStatus } = req.body;

    const order = await orderModel.findById(orderId);
    
    if (!order) {
      return res.status(404).json({ 
        success: false, 
        message: "Order not found" 
      });
    }

    if (orderStatus) {
      // Validate status
      const validStatuses = ["pending", "processing", "shipped", "delivered", "cancelled"];
      if (!validStatuses.includes(orderStatus)) {
        return res.status(400).json({
          success: false,
          message: "Invalid order status",
        });
      }
      order.orderStatus = orderStatus;
    }

    if (paymentStatus) {
      // Validate payment status
      const validPaymentStatuses = ["pending", "paid", "failed"];
      if (!validPaymentStatuses.includes(paymentStatus)) {
        return res.status(400).json({
          success: false,
          message: "Invalid payment status",
        });
      }
      order.paymentStatus = paymentStatus;
    }

    await order.save();

    await order.populate("user", "name email");
    await order.populate("orderItems.product", "title images category");

    res.status(200).json({
      success: true,
      message: "Order status updated successfully",
      order,
    });
  } catch (error) {
    console.error("Error updating order status:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// Cancel order (user)
export const cancelOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { userId } = req.body;

    const order = await orderModel.findById(orderId);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    // Check if user owns this order
    if (order.user.toString() !== userId) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized to cancel this order",
      });
    }

    // Can only cancel pending or processing orders
    if (!["pending", "processing"].includes(order.orderStatus)) {
      return res.status(400).json({
        success: false,
        message: `Cannot cancel order with status: ${order.orderStatus}`,
      });
    }

    // Restore product stock
    for (const item of order.orderItems) {
      await productModel.findByIdAndUpdate(item.product, {
        $inc: { stock: item.quantity },
      });
    }

    order.orderStatus = "cancelled";
    await order.save();

    await order.populate("orderItems.product", "title images category");

    res.status(200).json({
      success: true,
      message: "Order cancelled successfully",
      order,
    });
  } catch (error) {
    console.error("Error cancelling order:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// Delete an order (admin only)
export const deleteOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    
    const order = await orderModel.findById(orderId);
    
    if (!order) {
      return res.status(404).json({ 
        success: false, 
        message: "Order not found" 
      });
    }

    // Restore product stock when deleting order
    for (const item of order.orderItems) {
      await productModel.findByIdAndUpdate(item.product, {
        $inc: { stock: item.quantity },
      });
    }

    await orderModel.findByIdAndDelete(orderId);

    res.status(200).json({ 
      success: true, 
      message: "Order deleted successfully" 
    });
  } catch (error) {
    console.error("Error deleting order:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};