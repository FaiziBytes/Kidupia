import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
      username:{
            type:String,
            required:true
      },
      email:{
            type:String,
            required:true,
            unique:true
      },
      password:{
            type:String,
            required:true
      },
      isVerified:{
            type:Boolean,
            default:false
      },
      isLoggedIn:{
            type:Boolean,
            default:false,
      },
      token:{
            type:String,
            default:null
      },
      otp:{
            type:String,

      },
      otpExpiry:{
            type:Date,
            default:null
      },
      role:{
            
      }
},{
      timestamps:true
});

const user = mongoose.model("User",userSchema);
export default user;