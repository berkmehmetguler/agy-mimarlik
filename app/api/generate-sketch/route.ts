import { NextResponse } from "next/server";
import { GoogleGenAI, Modality } from "@google/genai";

interface GenerateSketchRequest {
  mimeType: string;
  base64: string;
  notes?: string;
}

interface GenerateSketchResponse {
  dataUrl?: string;
  error?: string;
}

interface GeminiPart {
  inlineData?: {
    mimeType: string;
    data: string;
  };
  text?: string;
}

interface GeminiContent {
  candidates: Array<{
    content: {
      parts: GeminiPart[];
    };
  }>;
}

export async function POST(req: Request): Promise<NextResponse<GenerateSketchResponse>> {
  try {
    const { mimeType, base64, notes }: GenerateSketchRequest = await req.json();

    if (!mimeType || !base64) {
      return NextResponse.json(
        { error: "Sketch is required" }, 
        { status: 400 }
      );
    }

    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

    const parts: GeminiPart[] = [
      { inlineData: { mimeType, data: base64 } },
      {
        text: `Render this sketch into a photorealistic, studio-quality image of a single piece of furniture against a neutral background. The style should be modern, clean, and emphasize high-quality craftsmanship.`,
      },
    ];

    if (notes) {
      parts.push({ text: `Additional user notes to incorporate: "${notes}"` });
    }

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-image-preview",
      contents: { parts },
      config: { responseModalities: [Modality.IMAGE, Modality.TEXT] },
    });

    const content = (response as GeminiContent).candidates?.[0]?.content?.parts || [];
    const inline = content.find((p: GeminiPart) => p.inlineData);

    if (!inline) {
      return NextResponse.json(
        { error: "No image generated" }, 
        { status: 500 }
      );
    }

    return NextResponse.json({
      dataUrl: `data:${inline.inlineData!.mimeType};base64,${inline.inlineData!.data}`,
    });
  } catch (e: unknown) {
    const errorMessage = e instanceof Error ? e.message : "Server error";
    return NextResponse.json(
      { error: errorMessage }, 
      { status: 500 }
    );
  }
}
