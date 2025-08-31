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

// Rate limiting
const requestTracker = new Map<string, { count: number; lastRequest: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 3;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const tracker = requestTracker.get(ip) || { count: 0, lastRequest: 0 };
  if (now - tracker.lastRequest > RATE_LIMIT_WINDOW) tracker.count = 0;
  tracker.count++;
  tracker.lastRequest = now;
  requestTracker.set(ip, tracker);
  return tracker.count <= MAX_REQUESTS_PER_WINDOW;
}

// Helper to select final image URL
function selectFinalImageUrl(data: any): string | null {
  if (data.proxy_links && data.proxy_links.length > 0) return data.proxy_links[0];
  if (data.output && data.output.length > 0) return data.output[0];
  if (data.images && data.images.length > 0) return data.images[0];
  if (data.url) return data.url;
  if (data.image) return data.image;
  return null;
}

export async function POST(req: Request): Promise<NextResponse<GenerateSketchResponse>> {
  try {
    console.log('🚀 Generate sketch API called');

    const forwarded = req.headers.get('x-forwarded-for');
    const ip = forwarded ? forwarded.split(',')[0] : 'unknown';

    if (!checkRateLimit(ip)) {
      console.log('🚫 Rate limit exceeded for IP:', ip);
      return NextResponse.json({ error: "Çok fazla istek gönderdiniz. Lütfen 1 dakika bekleyip tekrar deneyin." }, { status: 429 });
    }

    const { mimeType, base64, notes, aspectRatio = "1:1", strength = "0.45", guidanceScale = "7.5", numInferenceSteps = "31" }: GenerateSketchRequest = await req.json();
    if (!mimeType || !base64) return NextResponse.json({ error: "Sketch is required" }, { status: 400 });

    const originalPrompt = notes || "Create a photorealistic furniture design";
    const translatedPrompt = await translateTurkishToEnglish(originalPrompt);
    console.log('🌐 Translation Details:', { originalPrompt, translatedPrompt });

    // Upload sketch
    let uploadedImageUrl: string | undefined;
    try {
      const baseUrl = process.env.NODE_ENV === 'production' 
        ? (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'https://your-domain.com')
        : 'http://localhost:3000';
        
      const uploadResponse = await fetch(`${baseUrl}/api/upload-sketch`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mimeType, base64 })
      });
      
      if (!uploadResponse.ok) {
        const errorData = await uploadResponse.json().catch(() => ({}));
        throw new Error(errorData.error || uploadResponse.statusText);
      }
      const uploadData = await uploadResponse.json();
      uploadedImageUrl = uploadData.url;
      console.log('✅ Sketch uploaded successfully:', uploadedImageUrl);
    } catch (uploadError) {
      console.error('❌ Sketch upload failed:', uploadError);
      return NextResponse.json({ error: "Sketch upload failed. Lütfen tekrar deneyin." }, { status: 500 });
    }

    // Sketch rendering request
    const sketchApiBody = {
      init_image: uploadedImageUrl,
      strength: parseFloat(strength),
      prompt: translatedPrompt,
      guidance_scale: parseFloat(guidanceScale),
      num_inference_steps: parseInt(numInferenceSteps)
    };
    console.log('📤 Sketch API Request Body:', sketchApiBody);

    const response = await fetch('https://modelslab.com/api/v6/interior/sketch_rendering', {
      method: 'POST',
      headers: {
        'key': process.env.MODELSLAB_API_KEY || "YOUR_API_KEY",
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(sketchApiBody)
    });

    const responseText = await response.text();
    console.log('📄 Sketch Rendering API Raw Response:', responseText);

    let data: any;
    try {
      data = JSON.parse(responseText);
      console.log('✅ Parsed JSON Response:', JSON.stringify(data, null, 2));
    } catch (parseError) {
      console.error('❌ Failed to parse JSON response:', parseError);
      throw new Error('Invalid JSON response from API');
    }

    let generatedImageUrl: string | null = null;

    if (data.status === "success") {
      generatedImageUrl = selectFinalImageUrl(data);
      console.log('✅ Image ready:', generatedImageUrl);
    } else if (data.status === "processing" && data.fetch_result) {
      console.log('⏳ Image processing, waiting for completion...');
      const maxAttempts = 12;
      let attempts = 0;
      let consecutiveFailures = 0;

      while (attempts < maxAttempts) {
        const waitTime = data.eta || 20;
        console.log(`🔄 Attempt ${attempts + 1}/${maxAttempts} - Waiting ${waitTime}s`);
        await new Promise(res => setTimeout(res, waitTime * 1000));

        const fetchResp = await fetch(data.fetch_result, {
          method: 'POST',
          headers: { 
            'key': process.env.MODELSLAB_API_KEY || "YOUR_API_KEY",
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({})
        });

        if (fetchResp.ok) {
          const fetchData = await fetchResp.json();
          console.log('📡 Fetch API Response:', fetchData);

          if (fetchData.status === "success") {
            generatedImageUrl = selectFinalImageUrl(fetchData);
            console.log('✅ Image ready from fetch_result:', generatedImageUrl);
            break;
          } else {
            consecutiveFailures++;
            console.log('⏳ Still processing or error, consecutive failures:', consecutiveFailures);
          }
        } else {
          consecutiveFailures++;
          console.error('⚠️ Fetch API failed, consecutive failures:', consecutiveFailures);
        }

        attempts++;
      }

      if (!generatedImageUrl) {
        return NextResponse.json({ error: "İşlem tamamlanamadı. Lütfen tekrar deneyin." }, { status: 408 });
      }
    } else {
      console.error('❌ Unexpected API status:', data.status);
      return NextResponse.json({ error: "No image generated" }, { status: 500 });
    }

    return NextResponse.json({ dataUrl: generatedImageUrl as string });

  } catch (e: unknown) {
    const errorMessage = e instanceof Error ? e.message : "Server error";
    console.error('❌ Sketch generation error:', errorMessage);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
