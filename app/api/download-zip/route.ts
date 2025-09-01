import JSZip from "jszip";
import { NextResponse } from "next/server";
import { addWatermark } from "@/lib/watermark";
import { toast } from "react-toastify";

export async function POST(request: Request) {
  const { urls } = await request.json();
  if (!urls || !urls.length)
    return NextResponse.json({ error: "URL yok" }, { status: 400 });

  try {
    const zip = new JSZip();

    for (let i = 0; i < urls.length; i++) {
      const url = urls[i];
      const res = await fetch(url);
      const buffer = await res.arrayBuffer();

      const dataUrl = `data:image/png;base64,${Buffer.from(buffer).toString("base64")}`;
      const watermarked = await addWatermark(dataUrl);
      const base64Data = watermarked.split(",")[1];

      zip.file(`tasarim_${i + 1}.png`, Buffer.from(base64Data, "base64"));
      toast.success(`Resim ${i + 1} zip'e eklendi.`);
        console.log(`Resim ${i + 1} zip'e eklendi.`);
    }

    // ArrayBuffer tipinde üretim
    const zipContent = await zip.generateAsync({ type: "arraybuffer" });

    return new NextResponse(zipContent, {
      headers: {
        "Content-Type": "application/zip",
        "Content-Disposition": `attachment; filename="tasarimlar_${Date.now()}.zip"`,
      },
    });
  } catch (error) {
    console.error("Toplu indirme hatası:", error);
    return NextResponse.json({ error: "Toplu indirme başarısız" }, { status: 500 });
  }
}
