
import { v2 as cloudinary } from 'cloudinary';

export async function uploadImage({
  path, imageName, username, type,
}) {
  const imageNameWithoutExtension = imageName.split('.').slice(0, -1).join('.');

  // Lógica para imágenes de medios (portadas de anime/manga)
  if (type === 'media') {
    const public_id = imageNameWithoutExtension;
    const folder = 'animanga-wrapped/media_assets';
    const resource_public_id = `${folder}/${public_id}`;

    try {
      // 1. Verificar si el recurso ya existe
      const existingResource = await cloudinary.api.resource(resource_public_id);
      // Si existe, devuelve la URL existente sin subir de nuevo
      console.log('Image already exists, returning existing URL:', existingResource.secure_url);
      return { secure_url: existingResource.secure_url };
    } catch (error) {
      // Si el error es "not found", significa que la imagen no existe y podemos proceder a subirla.
      if (error.http_code === 404) {
        try {
          // 2. Si no existe, subir la imagen a la carpeta global
          console.log('Image not found, proceeding to upload...');
          const result = await cloudinary.uploader.upload(path, {
            folder,
            public_id,
            use_filename: false,
            unique_filename: false,
            transformation: [
              { width: 1000, height: 1000, crop: 'limit' },
              { quality: 'auto', fetch_format: 'auto' },
            ],
          });
          console.log('Upload successful:', result.secure_url);
          return result;
        } catch (uploadError) {
          console.error('Error during image upload:', uploadError);
          throw new Error(uploadError);
        }
      } else {
        // Otro tipo de error al verificar el recurso
        console.error('Error checking for existing resource:', error);
        throw new Error(error);
      }
    }
  }

  // Lógica para imágenes de estadísticas (específicas del usuario)
  if (type === 'stats') {
    try {
      const result = await cloudinary.uploader.upload(path, {
        folder: `animanga-wrapped/users/${username}`,
        public_id: imageNameWithoutExtension,
        use_filename: true,
        unique_filename: false,
      });
      return result;
    } catch (error) {
      console.error('Error uploading stats image:', error);
      throw new Error(error);
    }
  }

  // Si el tipo no es ni 'media' ni 'stats'
  throw new Error("Invalid upload type specified. Must be 'media' or 'stats'.");
}
