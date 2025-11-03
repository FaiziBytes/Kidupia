import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
      user_id:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true
      },
      product_id:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Product",
            required:true
      },
      Comment:String,
       rating: { type: Number, min: 1, max: 5 },
});

export default Review = mongoose.model("Review", reviewSchema);