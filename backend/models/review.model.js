import mongoose from "mongoose";
import Product from "./product.model.js"; // 👈 import Product model

const reviewSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

// 🧮 Static method to calculate avg rating
reviewSchema.statics.calculateAverageRatings = async function (productId) {
  const result = await this.aggregate([
    { $match: { product: productId } },
    {
      $group: {
        _id: "$product",
        averageRating: { $avg: "$rating" },
        numReviews: { $sum: 1 },
      },
    },
  ]);

  if (result.length > 0) {
    await Product.findByIdAndUpdate(productId, {
      rating: result[0].averageRating,
      numReviews: result[0].numReviews,
    });
  } else {
    // if no reviews remain, reset rating
    await Product.findByIdAndUpdate(productId, {
      rating: 0,
      numReviews: 0,
    });
  }
};

// 🔁 Recalculate after each save, update, or delete
reviewSchema.post("save", function () {
  this.constructor.calculateAverageRatings(this.product);
});

reviewSchema.post("findOneAndDelete", function (doc) {
  if (doc) {
    doc.constructor.calculateAverageRatings(doc.product);
  }
});

const Review = mongoose.model("Review", reviewSchema);
export default Review;
