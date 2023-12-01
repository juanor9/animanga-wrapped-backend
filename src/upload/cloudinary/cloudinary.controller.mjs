import fs from 'fs';
import { uploadImage } from './cloudinary.services.mjs';

const handleUploadSingleImage = async(
  req, res
) => {
  // console.log("🚀 ~ file: cloudinary.controller.mjs:7 ~ req:", req);
  const {path, size} = req.file;
  const {imageName, username} = req.body;
  const maxSize = 1080 *1080*10;

  if(size > maxSize){
      fs.unlinkSync(path);
      return res.status(400).json({message: "File is too large"});
  }
  try {
      const result = await uploadImage({path, imageName, username});
      res.json(result);
  } catch (error) {
      return res.status(500).json({message: error.message});
  } finally{
      fs.unlinkSync(path);
  }
}

export default handleUploadSingleImage;