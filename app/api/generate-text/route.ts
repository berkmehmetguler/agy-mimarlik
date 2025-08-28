import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

interface GenerateTextRequest {
  prompt: string;
  material: string;
  dimensions: {
    w: string;
    h: string;
    d: string;
  };
}

interface GeminiResponse {
  text: string;
}

interface ImageResponse {
  generatedImages: Array<{
    image: {
      imageBytes: string;
    };
  }>;
}

export async function POST(req: Request) {
  try {
    const { prompt, material, dimensions }: GenerateTextRequest = await req.json();
    
    if (!prompt) {
      return NextResponse.json(
        { error: "Prompt is required" },
        { status: 400 }
      );
    }

    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });
    
    const translationPrompt = `You are a world-class interior design assistant. Translate the following Turkish furniture description into a detailed, evocative, and photorealistic English prompt for an image generation AI. Combine all details into a cohesive sentence. Description: "${prompt}", Material: "${material}", Dimensions: "Width ${dimensions?.w}cm, Height ${dimensions?.h}cm, Depth ${dimensions?.d}cm". The final image must be a premium, studio-quality photograph of the single furniture piece against a neutral background, emphasizing its craftsmanship and materials.`;
    
    const tr = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: translationPrompt,
    });
    
    const finalPrompt = (tr as GeminiResponse).text ?? prompt;
    
    const image = await ai.models.generateImages({
      model: "imagen-4.0-generate-001",
      prompt: finalPrompt,
      config: {
        numberOfImages: 1,
        outputMimeType: "image/jpeg",
        aspectRatio: "1:1",
      },
    });
    
    const base64 = (image as ImageResponse).generatedImages?.[0]?.image?.imageBytes;
    
    if (!base64) {
      return NextResponse.json({ error: "No image" }, { status: 500 });
    }
    
    return NextResponse.json({
      dataUrl: `data:image/jpeg;base64,${base64}`,
    });
  } catch (e: unknown) {
    const errorMessage = e instanceof Error ? e.message : "Server error";
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
