import reviewModel from "../models/review.model.js";
import productModel from "../models/product.model.js";

// Add or update a review
export const addOrUpdateReview = async (req, res) => {
  try {
    const { userId, productId, rating, comment } = req.body;

    if (!userId || !productId || rating == null) {
      return res.status(400).json({
        success: false,
        message: "User, product, and rating are required",
      });
    }

    const product = await productModel.findById(productId);
    if (!product)
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });

    // Check if the user already reviewed this product
    let review = await reviewModel.findOne({
      user: userId,
      product: productId,
    });

    if (review) {
      // Update existing review
      review.rating = rating;
      review.comment = comment || review.comment;
      await review.save();
    } else {
      // Create new review
      review = await reviewModel.create({
        user: userId,
        product: productId,
        rating,
        comment,
      });
    }

    // Recalculate product rating and numReviews
    const allReviews = await reviewModel.find({ product: productId });
    const numReviews = allReviews.length;
    const avgRating =
      allReviews.reduce((sum, r) => sum + r.rating, 0) / numReviews;

    product.numReviews = numReviews;
    product.rating = avgRating.toFixed(1);
    await product.save();

    res
      .status(200)
      .json({ success: true, message: "Review submitted", review });
  } catch (error) {
    console.error("Error adding/updating review:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// Get all reviews for a product
export const getProductReviews = async (req, res) => {
  try {
    const { productId } = req.params;

    const reviews = await reviewModel
      .find({ product: productId })
      .populate("user", "name");
    res.status(200).json({ success: true, reviews });
  } catch (error) {
    console.error("Error fetching reviews:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// Delete a review
export const deleteReview = async (req, res) => {
  try {
    const { reviewId } = req.params;

    const review = await reviewModel.findByIdAndDelete(reviewId);
    if (!review)
      return res
        .status(404)
        .json({ success: false, message: "Review not found" });

    // Recalculate product rating and numReviews
    const product = await productModel.findById(review.product);
    const allReviews = await reviewModel.find({ product: product._id });
    const numReviews = allReviews.length;
    const avgRating =
      numReviews > 0
        ? allReviews.reduce((sum, r) => sum + r.rating, 0) / numReviews
        : 0;

    product.numReviews = numReviews;
    product.rating = avgRating.toFixed(1);
    await product.save();

    res.status(200).json({ success: true, message: "Review deleted" });
  } catch (error) {
    console.error("Error deleting review:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};
