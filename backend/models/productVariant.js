import mongoose from "mongoose";

const productVariantSchema = new mongoose.Schema({
    product_id:{
      type:mongoose.Schema.Types.ObjectId,
      required:true,
    },
    size:String,
    color:String,
    stock:Number, 
})

const productVariantModel = mongoose.model("ProductVariant",productVariantSchema);
export default productVariantModel;