import Router from 'express';
import multer from 'multer';
import handleUploadSingleImage from './cloudinary.controller.mjs';

const router = Router();

const upload = multer({ dest: './temp'});

router.post('/image', upload.single('image'), handleUploadSingleImage);

export default router;