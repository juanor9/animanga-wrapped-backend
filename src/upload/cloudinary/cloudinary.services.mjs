import { v2 as cloudinary } from 'cloudinary'
import * as dotenv from 'dotenv';
dotenv.config();

const cloudName = process.env.CLOUDINARY_NAME
const apiKey = process.env.CLOUDINARY_API_KEY
console.log("🚀 ~ file: cloudinary.services.mjs:5 ~ apiKey:", apiKey)
const apiSecret = process.env.CLOUDINARY_API_SECRET

cloudinary.config({ 
  cloud_name: cloudName, 
  api_key: apiKey, 
  api_secret: apiSecret,
  secure: true
});

export async function uploadImage(image) {
  try {
    const result = await cloudinary.uploader.upload(image, {
      folder: 'animanga-wrapped', 
      use_filename: true,
      unique_filename: false,
    })
    return result;
  } catch (error) {
    throw new Error(error)
  }
}
