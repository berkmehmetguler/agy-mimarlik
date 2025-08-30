// app/api/generate-text/route.ts
import { NextResponse } from "next/server";

interface GenerateTextRequest {
  prompt: string;
  material?: string;
  dimensions?: {
    w?: string;
    h?: string;
    d?: string;
  };
}

export async function POST(req: Request) {
  try {
    const { prompt, material, dimensions }: GenerateTextRequest = await req.json();

    if (!prompt) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
    }

    // 🔹 Prompt'u detaylı hale getiriyoruz
    const finalPrompt = `
      A premium studio-quality photograph of a furniture piece. 
      Description: "${prompt}", 
      ${material ? `Material: "${material}",` : ""}
      ${dimensions ? `Dimensions: Width ${dimensions?.w}cm, Height ${dimensions?.h}cm, Depth ${dimensions?.d}cm.` : ""}
      Neutral background, photorealistic, detailed lighting, craftsmanship emphasized.
    `;

    // 🔹 ModelsLab API çağrısı
    const response = await fetch("https://modelslab.com/api/v7/images/text-to-image", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        key: process.env.MODELSLAB_API_KEY!,
        model_id: "imagen-4.0-ultra",
        prompt: finalPrompt,
        aspect_ratio: "1:1",
        samples: "1",
      }),
    });

    if (!response.ok) {
      let errorResult;
      try {
        errorResult = await response.json();
      } catch (e) {
        errorResult = { error: { message: await response.text() } };
      }
      throw new Error(
        `API Error (${response.status}): ${errorResult.error?.message || response.statusText || "Unknown error"}`
      );
    }

    const result = await response.json();

    console.log("ModelsLab response:", result);

    // 🔹 JSON örneğine göre URL alıyoruz
    const imageUrl = result?.links?.[0] || result?.proxy_links?.[0];

    if (!imageUrl) {
      return NextResponse.json({ error: "No image generated", raw: result }, { status: 500 });
    }

    return NextResponse.json({
      dataUrl: imageUrl, // artık base64 değil, direkt URL
    });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "Server error" }, { status: 500 });
  }
}
