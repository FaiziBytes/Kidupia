import jwt from "jsonwebtoken";

export const AuthorizeUser = async(req,res,next)=>{
      const authHeader = req.headers.authorization;

      if(!authHeader || !authHeader.startsWith("Bearer ")){
            return res.status(401).json({message:"no token is provided"});
      }

      const token = authHeader.split(" ")[1];
      try {
            const decoded = jwt.verify(token,process.env.JWT_SECRET)
            req.user = decoded;
            next();
      } catch (error) {
            res.status(403).json({message:"invalid or expired token"});
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
