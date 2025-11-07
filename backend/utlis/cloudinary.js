import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
      cloud_name:"kidupia",
      api_key:"463849989382578",
      api_secret:"1E-BAdaJtIj7ekt62BdgrSJmLqY"
})

const uploadOncloudinary = async(localFilePath)=>{
      try {
            if(!localFilePath) return null;
            let response = await cloudinary.uploader.upload(localFilePath,{
                  resource_type:"auto"
            });
            console.log("file is uploaded successfully",response);
            return response;
      } catch (error) {
          fs.unlinkSync(localFilePath)
          // remove the locally saved temporary file
          return null;
      }
}