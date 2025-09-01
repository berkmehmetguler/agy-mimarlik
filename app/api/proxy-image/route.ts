import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const url = req.nextUrl.searchParams.get("url");
    if (!url) return NextResponse.json({ error: "URL eksik" }, { status: 400 });

    const response = await fetch(url);
    if (!response.ok) throw new Error("Resim alınamadı");

    const blob = await response.arrayBuffer();
    return new NextResponse(blob, {
      headers: {
        "Content-Type": "image/png",
        "Content-Disposition": "attachment; filename=tasarim.png",
      },
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
