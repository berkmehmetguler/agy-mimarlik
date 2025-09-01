import { NextRequest, NextResponse } from "next/server";
import fetch from "node-fetch";

export async function POST(req: NextRequest) {
  try {
    const { url } = await req.json();

    if (!url) return NextResponse.json({ message: "URL eksik" }, { status: 400 });

    if (url.startsWith("data:")) {
      const base64Data = url.split(",")[1];
      const buffer = Buffer.from(base64Data, "base64");

      return new NextResponse(buffer, {
        status: 200,
        headers: {
          "Content-Type": "image/jpeg",
          "Content-Disposition": `attachment; filename=tasarim.jpg`,
        },
      });
    } else {
      const response = await fetch(url);
      const arrayBuffer = await response.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      return new NextResponse(buffer, {
        status: 200,
        headers: {
          "Content-Type": response.headers.get("content-type") || "image/jpeg",
          "Content-Disposition": `attachment; filename=tasarim.jpg`,
        },
      });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "İndirme sırasında hata oluştu" }, { status: 500 });
  }
}
