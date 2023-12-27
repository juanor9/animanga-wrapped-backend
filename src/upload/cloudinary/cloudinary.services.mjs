import { v2 as cloudinary } from 'cloudinary'
import * as dotenv from 'dotenv';
dotenv.config();

const cloudName = process.env.CLOUDINARY_NAME
const apiKey = process.env.CLOUDINARY_API_KEY
const apiSecret = process.env.CLOUDINARY_API_SECRET

cloudinary.config({ 
  cloud_name: cloudName, 
  api_key: apiKey, 
  api_secret: apiSecret,
  secure: true
});

export async function uploadImage(data) {
  const {path, imageName, username} = data;
  const imageNameWithoutExtension = imageName.split('.').slice(0, -1).join('.');
  try {
    const result = await cloudinary.uploader.upload(path, {
      folder: `animanga-wrapped/${username}`,
      public_id: imageNameWithoutExtension, 
      use_filename: true,
      unique_filename: false,
    })
    return result;
  } catch (error) {
    throw new Error(error)
  }
}
