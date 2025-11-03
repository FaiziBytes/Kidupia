import mongoose from "mongoose";

const connectDb = async()=>{
      try {
            let connection = await mongoose.connect(process.env.URI);
            console.log("successfully connected to the database");
      } catch (error) {
            res.status(401).json({message:error.message,success:false})
      }
}
export default connectDb;