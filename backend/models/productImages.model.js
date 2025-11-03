import mongoose from "mongoose";

const productImagesSchema = new mongoose.Schema({
      product_id:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Product",
            required:true
      },
      image_url:{
            type:String,
            required:true
      },

})

const productImagesModel = mongoose.model("ProductImages",productImagesSchema);
export default productImagesModel;