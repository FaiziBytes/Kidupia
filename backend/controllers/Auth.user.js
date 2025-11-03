import userModel from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const AuthenticateUser = async (req, res) => {
      try {
            const { email, password } = req.body;
            //it check for the missing fields
            if (!email || !password) {
                  return res.status(400).json({
                        success: false,
                        message: "Email and password are required",
                  });
            }
            // it check whether the user exists     
            const user = await userModel.findOne({ email });
            if (!user) {
                  return res.status(404).json({
                        success: false,
                        message: "User not found",
                  });
            }

            // Comparing the  passwords
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                  return res.status(401).json({
                        success: false,
                        message: "Invalid credentials",
                  });
            }

            const token = jwt.sign({
                  id: user._id,
                  email: user.email,
                  role: user.role,
            },
                  process.env.JWT_SECRET,
            {
                  expiresIn: "1h"
            }
            )
            // Remove password before sending response
            const { password: _, ...safeUser } = user.toObject();

            // if Success
            return res.status(200).json({
                  success: true,
                  message: "Login successful",
                  token,
                  user: safeUser,
            });

      } catch (error) {
            console.error("Error logging in:", error);
            return res.status(500).json({
                  success: false,
                  message: "Internal server error",
                  error: error.message,
            });
      }
};

export { AuthenticateUser };