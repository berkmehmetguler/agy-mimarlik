import { v2 as cloudinary } from 'cloudinary';

console.log('🔑 Environment Variables Check:', {
  CLOUDINARY_URL: process.env.CLOUDINARY_URL ? '✅ Set' : '❌ Not set',
  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME ? '✅ Set' : '❌ Not set',
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY ? '✅ Set' : '❌ Not set',
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET ? '✅ Set' : '❌ Not set'
});

// Check if CLOUDINARY_URL is provided (alternative format)
if (process.env.CLOUDINARY_URL) {
  console.log('🚀 Using CLOUDINARY_URL format');
  cloudinary.config(process.env.CLOUDINARY_URL);
} else if (process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_API_SECRET) {
  console.log('🚀 Using separate environment variables');
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
} else {
  console.error('❌ No Cloudinary configuration found!');
  throw new Error('Cloudinary configuration is missing. Please set CLOUDINARY_URL or individual environment variables.');
}

console.log('✅ Cloudinary configured successfully');

export default cloudinary;


// Eğer tipleri de kullanmak istersen:
export type { UploadApiResponse, UploadApiErrorResponse } from "cloudinary";
