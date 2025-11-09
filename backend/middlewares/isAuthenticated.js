import jwt from 'jsonwebtoken'
import User from '../models/user.model.js';

export const isAuthenticated = async(req, res, next) =>{
    try {
        const authHeader = req.headers.authorization;

        if(!authHeader || !authHeader.startsWith('Bearer ')){
            return res.status(401).json({
                success:false,
                message:'Access token is missing or invalid'
            })
        }

        const token = authHeader.split(" ")[1]

        jwt.verify(token, process.env.JWT_SECRET, async (err, decoded)=>{
            if(err){
                if(err.name === "TokenExpiredError"){
                    return res.status(400).json({
                        success:false,
                        message:"Access Token has expired, use refreshtoken to generate again"
                    })
                }
                return res.status(400).json({
                    success:false,
                    message:"Access token is missing or invalid"
                })
            }
            const {id} = decoded;

            const user = await User.findById(id)
            if(!user){
                return res.status(404).json({
                    success:false,
                    message:"user not found"
                })
            }
            
            req.user = user
            req.userId = user._id  
            next()
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

export const AuthorizeRole = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Access denied: insufficient permissions" });
    }
  next();
  }
}































// import jwt from "jsonwebtoken";

// export const AuthorizeUser = async(req,res,next)=>{
//       const authHeader = req.headers.authorization;

//       if(!authHeader || !authHeader.startsWith("Bearer ")){
//             return res.status(401).json({message:"no token is provided"});
//       }

//       const token = authHeader.split(" ")[1];
//       try {
//             const decoded = jwt.verify(token,process.env.JWT_SECRET)
//             req.user = decoded;
//             next();
//       } catch (error) {
//             res.status(403).json({message:"invalid or expired token"});
//       }
// }


