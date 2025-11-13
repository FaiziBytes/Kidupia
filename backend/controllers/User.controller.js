import UserModel from "../models/user.model.js";
import verifyEmail from "../utlis/nodemailer.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt";
import "dotenv/config";
import sessionModel from "../models/session.model.js";
import { sendOtpMail } from "../utlis/sentOtp.js";
export const registerUser = async (req, res) => {
      try {
            let { username, email, password,role} = req.body;
            if (!username || !email || !password) {
                  return res.status(400).json({
                        success: false,
                        message: "All the fields are required"
                  });
            }
            let existingUser = await UserModel.findOne({ email });
            if (existingUser) {
                  return res.status(400).json({
                        success: false,
                        message: "User already exists"
                  })
            }
            let hashedPassword = await bcrypt.hash(password, 10);
            let newUser = await UserModel.create({ username, email, password: hashedPassword,role });

            // Generate token
            let token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: "10m" })

            // Update the user in the database with the token
            newUser.token = token;
            await newUser.save(); // ✅ Save the token to database

            // Send verification email
            verifyEmail(token, email, username);

            return res.status(201).json({
                  success: true,
                  message: "User Registered Successfully",
                  data: newUser,
            })
      } catch (error) {
            return res.status(500).json({
                  success: false,
                  message: error.message
            })
      }
}



export const verification = async (req, res) => {
      try {
            let authHeader = req.headers.authorization;
            if (!authHeader || !authHeader.startsWith("Bearer ")) {
                  return res.status(401).json({
                        success: false,
                        message: "Authorization token is missing or invalid"
                  })
            }
            const token = authHeader.split(" ")[1];
            let decoded;
            try {
                  decoded = jwt.verify(token, process.env.JWT_SECRET);
            } catch (error) {
                  if (error.name === "TokenExpiredError") {
                        return res.status(400).json({
                              success: false,
                              message: "The Registation token has expired"
                        })
                  }
                  return res.status(400).json({
                        success: false,
                        message: "Token Verification failed"
                  })

            }
            const user = await UserModel.findOne(decoded._id);
            if (!user) {
                  return res.status(400).json({
                        success: false,
                        message: "User not found"
                  })
            }
            user.token = null,
                  user.isVerified = true;
            await user.save();
            return res.status(200).json({
                  success: true,
                  message: "Email verified successfully"
            })
      } catch (error) {
            return res.status(500).json({
                  success: false,
                  message: error.message
            })
      }
}

export const loginUser = async (req, res) => {
      try {
            const { email, password } = req.body;
            if (!email || !password) {
                  return res.status(400).json({
                        success: false,
                        message: "All fields are required"
                  })
            }
            const user = await UserModel.findOne({ email })
            if (!user) {
                  return res.status(401).json({
                        success: false,
                        message: "Unauthorized Access"
                  })
            }
            const passwordCheck = await bcrypt.compare(password, user.password);
            if (!passwordCheck) {
                  return res.status(401).json({
                        success: false,
                        message: "Incorrect Password"
                  })
            }
            if (user.isVerified !== true) {
                  return res.status(403).json({
                        success: false,
                        message: "Verify your account than login"
                  })
            }
            
            // ✅ FIXED: Changed userId to user_id (matches schema)
            const existingSession = await sessionModel.findOne({ user_id: user._id });
            if (existingSession) {
                  // ✅ FIXED: Changed user_Id to user_id
                  await sessionModel.deleteOne({ user_id: user._id })
            }
            
            // ✅ FIXED: Changed userId to user_id
            await sessionModel.create({ user_id: user._id });
            
            const accessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "10d" });
            const refreshToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "30d" });
            
            user.isLoggedIn = true;
            await user.save();
            
            return res.status(200).json({
                  success: true,
                  message: `Welcome back ${user.username}`,
                  accessToken,
                  refreshToken,
                  user
            })
      } catch (error) {
            return res.status(500).json({
                  success: false,
                  message: error.message
            })
      }
}

export const logoutUser = async(req, res) => {
      try {
            const userId = req.userId;
            
            // ✅ This one is already correct
            await sessionModel.deleteMany({user_id: userId});
            await UserModel.findByIdAndUpdate(userId, {isLoggedIn: false});
            
            return res.status(201).json({
                  success: true,
                  message: "User logged out successfully"
            });
      } catch (error) {
            return res.status(500).json({
                  success: false,
                  message: error.message
            })
      }
}

export const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await UserModel.findOne({ email })
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const expiry = new Date(Date.now() + 10 * 60 * 1000)

        user.otp = otp;
        user.otpExpiry = expiry;
        await user.save()
        await sendOtpMail(email, otp);
        return res.status(200).json({
            success:true,
            message:"OTP sent successfully"
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const verifyOTP = async (req, res)=>{
    const {otp} = req.body
    const email = req.params.email

    if(!otp){
        return res.status(400).json({
            success:false,
            message:"OTP is requried"
        })
    }

    try {
        const user = await UserModel.findOne({email})
        if(!user){
            return res.status(404).json({
                success:false,
                message:"User not found"
            })
        }
        if(!user.otp || !user.otpExpiry){
            return res.status(400).json({
                success:false,
                message:"OTP not generated or already verified"
            })
        }
        if (user.otpExpiry < new Date()){
            return res.status(400).json({
                success:false,
                message:"OTP has expired. Please request a new one"
            })
        }
        if(otp !== user.otp){
            return res.status(400).json({
                success:false,
                message:"Invalid OTP"
            })
        }

        user.otp = null
        user.otpExpiry = null
        await user.save()

        return res.status(200).json({
            success:true,
            message:"OTP verified successfully"
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Internal server error"
        })
    }
}

export const changePassword = async (req, res)=>{
    const {newPassword, confirmPassword} = req.body
    const email = req.params.email
    
    if(!newPassword || !confirmPassword){
        return res.status(400).json({
            success:false,
            message:"All fields are required"
        })
    }

    if(newPassword !== confirmPassword) {
        return res.status(400).json({
            success:false,
            message:"Password do not match"
        })
    }

    try {
        const user = await UserModel.findOne({email})
        if(!user){
            return res.status(404).json({
                success:false,
                message:"User not found"
            })
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10)
        user.password = hashedPassword
        await user.save()

        return res.status(200).json({
            success:true,
            message:"Password changed successsfully"
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Internal server error"
        })
    }
}

export const getAllUsers = async (req, res) => {
      try {
            const users = await UserModel.find();
            return res.status(200).json({
                  success: true,
                  data: users
            })
      } catch (error) {
            return res.status(500).json({
                  success: false,
                  message: error.message
            })
      }
}