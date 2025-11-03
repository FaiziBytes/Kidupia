import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
      name:{
            type:String,
            required:true,
      },
      description:{
            type:String,
      },
      price:Number,
      stock:Number,
      rating:{
            type:Number,
            default:0
      }
},
{
      timestamps:true
}
);

const productModel = mongoose.model("Product",productSchema);