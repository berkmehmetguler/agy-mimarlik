import { NextResponse } from "next/server";
import cloudinary, { UploadApiErrorResponse, UploadApiResponse } from "@/lib/claudinary";


interface UploadSketchRequest {
  mimeType: string;
  base64: string;
}

interface UploadSketchResponse {
  url?: string;
  error?: string;
}

export async function POST(req: Request): Promise<NextResponse<UploadSketchResponse>> {
  try {
    console.log('🚀 Upload sketch endpoint called');
    
    const { mimeType, base64 }: UploadSketchRequest = await req.json();
    console.log('📝 Request data:', { mimeType, base64Length: base64?.length || 0 });

    if (!mimeType || !base64) {
      console.log('❌ Missing required data');
      return NextResponse.json(
        { error: "File data is required" }, 
        { status: 400 }
      );
    }

    // Convert base64 to buffer
    const buffer = Buffer.from(base64, 'base64');
    console.log('📤 Uploading sketch to Cloudinary...');
    console.log('📏 File size:', buffer.length, 'bytes');
    console.log('🔑 Cloudinary config:', {
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME ? '✅ Set' : '❌ Missing',
      api_key: process.env.CLOUDINARY_API_KEY ? '✅ Set' : '❌ Missing',
      api_secret: process.env.CLOUDINARY_API_SECRET ? '✅ Set' : '❌ Missing'
    });
    
    // Upload to Cloudinary
    const result = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: 'sketches',
          resource_type: 'image',
          format: mimeType.split('/')[1] || 'png',
          transformation: [
            { width: 2048, height: 2048, crop: 'limit' } // ModelsLab max resolution
          ]
        },
        (error: UploadApiErrorResponse | undefined, result: UploadApiResponse | undefined) => {
          if (error) {
            console.error('❌ Cloudinary upload error:', error);
            reject(error);
          } else {
            console.log('✅ Cloudinary upload success:', result);
            resolve(result);
          }
        }
      );
      
      // Write buffer to stream
      uploadStream.end(buffer);
    });
    
    const uploadedImage = result as any;
    console.log('✅ Sketch uploaded successfully to Cloudinary');
    console.log('🔗 Public URL:', uploadedImage.secure_url);
    
    return NextResponse.json({
      url: uploadedImage.secure_url
    });
    
  } catch (e: unknown) {
    const errorMessage = e instanceof Error ? e.message : "Server error";
    console.error('❌ Cloudinary upload error:', errorMessage);
    console.error('❌ Full error:', e);
    return NextResponse.json(
      { error: errorMessage }, 
      { status: 500 }
    );
  }
}