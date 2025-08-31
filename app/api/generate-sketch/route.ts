import { NextResponse } from "next/server";
import { translateTurkishToEnglish } from '@/lib/translateText';

interface GenerateSketchRequest {
  mimeType: string;
  base64: string;
  notes?: string;
  aspectRatio?: string;
  strength?: string;
  guidanceScale?: string;
  numInferenceSteps?: string;
}

interface GenerateSketchResponse {
  dataUrl?: string;
  error?: string;
}

// Helper function to process text-to-image API response
async function processTextToImageResponse(response: Response): Promise<NextResponse<GenerateSketchResponse>> {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    console.error('❌ ModelsLab API Error:', errorData);
    throw new Error(errorData.error || `API request failed with status ${response.status}`);
  }

  const responseText = await response.text();
  console.log('📄 ModelsLab API Raw Response:', responseText);
  
  let data;
  try {
    data = JSON.parse(responseText);
    console.log('✅ Parsed JSON Response:', JSON.stringify(data, null, 2));
  } catch (parseError) {
    console.error('❌ Failed to parse JSON response:', parseError);
    throw new Error('Invalid JSON response from API');
  }
  
  // Check for different possible response formats
  let imageUrl;
  if (data.output && data.output.length > 0) {
    imageUrl = data.output[0];
    console.log('✅ Found image URL in output array:', imageUrl);
  } else if (data.images && data.images.length > 0) {
    imageUrl = data.images[0];
    console.log('✅ Found image URL in images array:', imageUrl);
  } else if (data.url) {
    imageUrl = data.url;
    console.log('✅ Found image URL in url field:', imageUrl);
  } else if (data.image) {
    imageUrl = data.image;
    console.log('✅ Found image URL in image field:', imageUrl);
  } else {
    console.error('❌ No image URL found in response. Available fields:', Object.keys(data));
    console.error('❌ Full response:', JSON.stringify(data, null, 2));
    return NextResponse.json({ error: "No image generated" }, { status: 500 });
  }
  
  // Return the image URL directly
  console.log('✅ Returning fallback image URL:', imageUrl);
  
  return NextResponse.json({
    dataUrl: imageUrl,
  });
}

// Simple in-memory rate limiting (for production, use Redis or database)
const requestTracker = new Map<string, { count: number; lastRequest: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 3; // Max 3 requests per minute per IP

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const tracker = requestTracker.get(ip) || { count: 0, lastRequest: 0 };
  
  // Reset counter if window has passed
  if (now - tracker.lastRequest > RATE_LIMIT_WINDOW) {
    tracker.count = 0;
  }
  
  tracker.count++;
  tracker.lastRequest = now;
  requestTracker.set(ip, tracker);
  
  return tracker.count <= MAX_REQUESTS_PER_WINDOW;
}

export async function POST(req: Request): Promise<NextResponse<GenerateSketchResponse>> {
  try {
    console.log('🚀 Generate sketch API called');
    
    // Get client IP for rate limiting
    const forwarded = req.headers.get('x-forwarded-for');
    const ip = forwarded ? forwarded.split(',')[0] : 'unknown';
    
    // Check rate limit
    if (!checkRateLimit(ip)) {
      console.log('🚫 Rate limit exceeded for IP:', ip);
      return NextResponse.json({
        error: "Çok fazla istek gönderdiniz. Lütfen 1 dakika bekleyip tekrar deneyin."
      }, { status: 429 });
    }
    
    const { 
      mimeType, 
      base64, 
      notes, 
      aspectRatio = "1:1",
      strength = "0.45",
      guidanceScale = "7.5",
      numInferenceSteps = "31"
    }: GenerateSketchRequest = await req.json();

    if (!mimeType || !base64) {
      return NextResponse.json(
        { error: "Sketch is required" }, 
        { status: 400 }
      );
    }

    // Use user's prompt directly (notes parameter)
    let prompt = notes || "Create a photorealistic furniture design";

    // Translate Turkish to English if needed
    const originalPrompt = prompt;
    const translatedPrompt = await translateTurkishToEnglish(prompt);
    
    console.log('🌐 Translation Details:');
    console.log('📝 Original Prompt:', originalPrompt);
    console.log('🔤 Translated Prompt:', translatedPrompt);
    
    let uploadedImageUrl: string | undefined;
    
    try {
      // Use absolute URL for server-side fetch
      const baseUrl = process.env.NODE_ENV === 'production' 
        ? (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'https://your-domain.com')
        : 'http://localhost:3000';
        
      const uploadResponse = await fetch(`${baseUrl}/api/upload-sketch`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          mimeType,
          base64
        })
      });
      
      console.log('📡 Upload response status:', uploadResponse.status);
      
      if (!uploadResponse.ok) {
        const errorData = await uploadResponse.json().catch(() => ({}));
        console.error('❌ Upload failed:', errorData);
        throw new Error(`Upload failed: ${errorData.error || uploadResponse.statusText}`);
      }
      
      const uploadData = await uploadResponse.json();
      uploadedImageUrl = uploadData.url;
      console.log('✅ Sketch uploaded successfully to Cloudinary:', uploadedImageUrl);
      
    } catch (uploadError) {
      console.log('⚠️ Cloudinary upload failed, using fallback method');
      console.log('📝 Upload error:', uploadError);
      
      // Cloudinary upload failed - sketch-to-image requires uploaded sketch
      console.error('❌ Sketch upload failed - cannot proceed with sketch-to-image');
      return NextResponse.json({ 
        error: "Sketch upload failed. Please try uploading your sketch again." 
      }, { status: 500 });
    }

    // Now use the real sketch rendering API
    console.log('🚀 Using ModelsLab Sketch Rendering API');
    console.log('📝 User Prompt:', originalPrompt);
    console.log('🔤 Translated Prompt:', translatedPrompt);
    console.log('🖼️ Init Image URL:', uploadedImageUrl);
    console.log('⚙️ Parameters:', { strength, guidanceScale, numInferenceSteps });
    
    const sketchApiBody = {
      init_image: uploadedImageUrl,
      strength: parseFloat(strength),
      prompt: translatedPrompt,
      guidance_scale: parseFloat(guidanceScale),
      num_inference_steps: parseInt(numInferenceSteps)
    };
    
    console.log('📤 Sketch API Request Body:', JSON.stringify(sketchApiBody, null, 2));
    
    const response = await fetch('https://modelslab.com/api/v6/interior/sketch_rendering', {
      method: 'POST',
      headers: {
        'key': process.env.MODELSLAB_API_KEY || "ltXsVXwrp5vIQQOKyaNedQB630OSoJMstziHmxOo8ixJW1BkzO9PnahQ5BE9",
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(sketchApiBody)
    });
    
    console.log(`📡 ModelsLab Sketch Rendering API Response Status: ${response.status}`);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('❌ ModelsLab Sketch Rendering API Error:', errorData);
      throw new Error(errorData.error || `API request failed with status ${response.status}`);
    }
    
    const responseText = await response.text();
    console.log('📄 ModelsLab Sketch Rendering API Raw Response:', responseText);
    
    let data;
    try {
      data = JSON.parse(responseText);
      console.log('✅ Parsed JSON Response:', JSON.stringify(data, null, 2));
    } catch (parseError) {
      console.error('❌ Failed to parse JSON response:', parseError);
      throw new Error('Invalid JSON response from API');
    }
    
    // Check for different possible response formats from sketch rendering API
    let generatedImageUrl;
    
    if (data.status === "processing") {
      console.log('⏳ Image is processing, waiting for completion...');
      console.log('📊 ETA:', data.eta, 'seconds');
      console.log('🔗 Fetch URL:', data.fetch_result);
      
      // Enhanced retry logic with exponential backoff
      const maxAttempts = 12; // Reduced for faster timeout
      let attempts = 0;
      let consecutiveFailures = 0;
      
      while (attempts < maxAttempts) {
        const waitTime = data.eta || 30; // Increased default wait time
        console.log(`🔄 Attempt ${attempts + 1}/${maxAttempts} - Waiting ${waitTime} seconds...`);
        
        // Adaptive wait time based on API response and failures
        let adaptiveWait;
        if (consecutiveFailures > 3) {
          // If multiple failures, wait longer
          adaptiveWait = Math.min(waitTime + (consecutiveFailures * 10), 60); // Max 60s
        } else {
          // Normal progressive wait
          adaptiveWait = Math.max(waitTime, 15 + (attempts * 3)); // Start at 15s, increase by 3s
        }
        
        console.log(`⏱️ Actual wait time: ${adaptiveWait} seconds (consecutive failures: ${consecutiveFailures})`);
        await new Promise(resolve => setTimeout(resolve, adaptiveWait * 1000));
        
        // Fetch the result
        const fetchResponse = await fetch(data.fetch_result, {
          method: 'POST',
          headers: {
            'key': process.env.MODELSLAB_API_KEY || "ltXsVXwrp5vIQQOKyaNedQB630OSoJMstziHmxOo8ixJW1BkzO9PnahQ5BE9",
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({})
        });
        
        if (fetchResponse.ok) {
          const fetchData = await fetchResponse.json();
          console.log('📡 Fetch API Response:', JSON.stringify(fetchData, null, 2));
          
          if (fetchData.status === "success" && fetchData.output && fetchData.output.length > 0) {
            generatedImageUrl = fetchData.output[0];
            console.log('✅ Image ready! Found URL:', generatedImageUrl);
            consecutiveFailures = 0; // Reset failure counter on success
            break;
          } else if (fetchData.status === "processing") {
            console.log('⏳ Still processing, ETA:', fetchData.eta, 'seconds');
            data.eta = fetchData.eta || 30; // Update ETA with fallback
            consecutiveFailures++; // Increment failure counter
            
            // Check for "Try Again" message - indicates API overload
            if (fetchData.message === "Try Again") {
              console.log('🔄 API indicates overload, extending wait time...');
              consecutiveFailures += 2; // Penalize "Try Again" responses more
            }
          } else if (fetchData.status === "error") {
            console.error('❌ Processing failed with error:', fetchData.error || 'Unknown error');
            throw new Error(fetchData.error || 'Image processing failed');
          } else {
            console.log('⚠️ Unexpected fetch response status:', fetchData.status);
            console.log('⚠️ Full response:', fetchData);
            consecutiveFailures++;
          }
        } else {
          console.error('⚠️ Fetch API failed with status:', fetchResponse.status);
          const errorText = await fetchResponse.text().catch(() => 'No error details');
          console.error('⚠️ Error details:', errorText);
          consecutiveFailures++;
          
          // If fetch fails multiple times, break the loop
          if (consecutiveFailures > 6) {
            console.error('❌ Too many consecutive failures, breaking loop');
            break;
          }
        }
        
        attempts++;
      }
      
      if (!generatedImageUrl) {
        console.error('❌ Sketch processing timeout after', maxAttempts, 'attempts');
        console.error('❌ Total wait time:', attempts * 20, 'seconds approximately');
        console.error('❌ Consecutive failures:', consecutiveFailures);
        
        let errorMessage = "İşlem tamamlanamadı. ";
        if (consecutiveFailures > 6) {
          errorMessage += "API servisi yoğun durumda. Lütfen 5-10 dakika sonra tekrar deneyin.";
        } else {
          errorMessage += "Lütfen farklı bir eskiz ile tekrar deneyin veya daha sonra tekrar deneyin.";
        }
        
        return NextResponse.json({ 
          error: errorMessage,
          details: {
            attempts: attempts,
            consecutiveFailures: consecutiveFailures,
            totalWaitTime: attempts * 20,
            suggestion: consecutiveFailures > 6 ? "API_OVERLOAD" : "RETRY_LATER"
          }
        }, { status: 408 }); // 408 Request Timeout
      }
      
    } else if (data.output && data.output.length > 0) {
      generatedImageUrl = data.output[0];
      console.log('✅ Found generated image URL in output array:', generatedImageUrl);
    } else if (data.images && data.images.length > 0) {
      generatedImageUrl = data.images[0];
      console.log('✅ Found generated image URL in images array:', generatedImageUrl);
    } else if (data.url) {
      generatedImageUrl = data.url;
      console.log('✅ Found generated image URL in url field:', generatedImageUrl);
    } else if (data.image) {
      generatedImageUrl = data.image;
      console.log('✅ Found generated image URL in image field:', generatedImageUrl);
    } else {
      console.error('❌ No generated image URL found in response. Available fields:', Object.keys(data));
      console.error('❌ Full response:', JSON.stringify(data, null, 2));
      return NextResponse.json({ error: "No image generated" }, { status: 500 });
    }
    
    // Return the generated image URL directly instead of converting to base64
    console.log('✅ Returning generated image URL:', generatedImageUrl);

    return NextResponse.json({
      dataUrl: generatedImageUrl,
    });
    
  } catch (e: unknown) {
    const errorMessage = e instanceof Error ? e.message : "Server error";
    console.error('Sketch generation error:', errorMessage);
    return NextResponse.json(
      { error: errorMessage }, 
      { status: 500 }
    );
  }
}