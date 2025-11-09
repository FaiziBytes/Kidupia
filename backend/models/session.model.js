import mongoose from "mongoose";

const sessionSchema =new mongoose.Schema({
      user_id:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true,
      }
})

const sessionModel = mongoose.model("Session",sessionSchema);
export default sessionModel;