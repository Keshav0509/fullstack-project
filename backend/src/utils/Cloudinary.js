import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;
    //upload file to cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    //file uploaded successfully
    console.log(`File uploaded to cloudinary: ${response.url}`);
    await fs.unlinkSync(localFilePath); //remove file from local storage
    return response;
  } catch (err) {
    console.error(err);
    fs.unlinkSync(localFilePath); //remove file from local storage
    return null;
  }
};

export { uploadOnCloudinary };
