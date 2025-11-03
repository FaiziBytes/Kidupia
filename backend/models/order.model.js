import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
      user_id:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true,
      },
      total_amount:Number,
      discount_amount:Number,
      paymentStatus:{
            type:String,
            enum:["pending","paid","failed"],
            default:"pending",
      }
},{
      timestamps:true
})

const orderModel = mongoose.model("Order", orderSchema);
export default orderModel;