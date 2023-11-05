import fs from 'fs';
import { uploadImage } from './cloudinary.services.mjs';

const handleUploadSingleImage = async(
  req, res
) => {
  const {path, size} = req.file;
  const maxSize = 1080 *1080*2;

  if(size > maxSize){
      fs.unlinkSync(path);
      return res.status(400).json({message: "File is too large"});
  }
  try {
      const result = await uploadImage(path);
      res.json(result);
  } catch (error) {
      return res.status(500).json({message: error.message});
  } finally{
      fs.unlinkSync(path);
  }
}

export default handleUploadSingleImage;