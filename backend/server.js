import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import morgan from "morgan";
import dotenv from "dotenv";
import connectDb from "./config/connection.js";
import Router from "./routes/router.js";
import userRouter from "./routes/user.route.js"
const app = express();
dotenv.config();
// middlewares
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({extended:true}));
app.use(bodyParser.urlencoded({extended:true}));
app.use(morgan("dev"));
// main router of the app
app.use("/api/v1",Router);
app.use("/user",userRouter);
// database connection in the app
connectDb();

app.get("/",(req,res)=>{
      res.send("server game is on");
})

const port = process.env.PORT || 5000;

app.listen(port,()=>{
      console.log(`server is running on the ${port}`);
});
