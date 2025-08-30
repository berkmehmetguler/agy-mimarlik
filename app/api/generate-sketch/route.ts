// app/api/generate-sketch/route.ts
import { NextResponse } from "next/server";

interface GenerateSketchRequest {
  base64: string;
  notes?: string;
}

async function callModelslab(base64: string, notes?: string) {
  const finalPrompt = `
    A premium studio-quality furniture render, based on the uploaded sketch.
    ${notes ? `Extra notes: ${notes}` : ""}
    Neutral background, photorealistic, detailed lighting, craftsmanship emphasized.
  `;

  return await fetch("https://modelslab.com/api/v7/images/image-to-image", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      key: process.env.MODELSLAB_API_KEY!,
      model_id: "imagen-4.0-ultra",
      prompt: finalPrompt,
      init_image: base64,
      aspect_ratio: "1:1",
      samples: "1",
      strength: 0.7,
    }),
  });
}

export async function POST(req: Request) {
  try {
    const { base64, notes }: GenerateSketchRequest = await req.json();
    if (!base64) return NextResponse.json({ error: "Sketch (base64) is required" }, { status: 400 });

    let response = await callModelslab(base64, notes);

    // Retry logic (1 retries)
    if (!response.ok) {
      await new Promise((r) => setTimeout(r, 10000));
      response = await callModelslab(base64, notes);
    }

    const result = await response.json();
    console.error("ModelsLab (sketch) response:", result);

    if (!response.ok || result.status === 'error') {
      return NextResponse.json({ error: result.message || 'Server error', raw: result }, { status: 500 });
    }

    const imageUrl = result?.links?.[0] || result?.proxy_links?.[0];
    if (!imageUrl) return NextResponse.json({ error: "No image generated", raw: result }, { status: 500 });

    return NextResponse.json({ dataUrl: imageUrl });

  } catch (e: any) {
    console.error("generate-sketch handler error:", e);
    return NextResponse.json({ error: e?.message || "Server error" }, { status: 500 });
  }
}
