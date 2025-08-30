'use client';

import { useEffect, useState } from "react";
import { addWatermark } from "@/lib/watermark";
import { fileToBase64 } from "@/lib/fileToBase64";
import { BeforeAfterSlider } from "./BeforeAfterSlider";
import { QuoteRequestModal } from "./QuoteRequestModal";

interface Dimensions {
  w: string;
  h: string;
  d: string;
}

export function AtolyeAI() {
  const [workflow, setWorkflow] = useState<"text" | "sketch" | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState("");
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [prompt, setPrompt] = useState("");
  const [dimensions, setDimensions] = useState<Dimensions>({ w: "", h: "", d: "" });
  const [material, setMaterial] = useState("Ceviz");
  const [sketchFile, setSketchFile] = useState<File | null>(null);
  const [sketchPreviewUrl, setSketchPreviewUrl] = useState<string | null>(null);
  const [sketchPrompt, setSketchPrompt] = useState("");
  const [isQuoteModalOpen, setQuoteModalOpen] = useState(false);

  useEffect(() => {
    return () => {
      if (sketchPreviewUrl) URL.revokeObjectURL(sketchPreviewUrl);
    };
  }, [sketchPreviewUrl]);

  const getSafeImageSrc = (src?: string | null) => {
    if (!src) return null;
    if (src.startsWith("http")) return src;
    return null;
  };

  const genFromText = async () => {
    if (!prompt) {
      setError("Lütfen bir açıklama yazın.");
      return;
    }
    setIsLoading(true);
    setError("");
    setGeneratedImageUrl(null);

    try {
      setLoadingStep("Fikriniz ilham panomuza ekleniyor...");
      const r = await fetch("/api/generate-text", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, material, dimensions }),
      });
      const { dataUrl, error } = await r.json();
      if (error) throw new Error(error);

      setLoadingStep("Son dokunuşlar yapılıyor...");
      const safeUrl = getSafeImageSrc(dataUrl);
      if (safeUrl) setGeneratedImageUrl(await addWatermark(safeUrl));
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Hata oluştu.");
    } finally {
      setIsLoading(false);
      setLoadingStep("");
    }
  };

  const genFromSketch = async () => {
    if (!sketchFile) {
      setError("Lütfen bir eskiz dosyası yükleyin.");
      return;
    }
    setIsLoading(true);
    setError("");
    setGeneratedImageUrl(null);

    try {
      const { mimeType, data } = await fileToBase64(sketchFile);
      setLoadingStep("Eskiziniz yorumlanıyor...");
      const r = await fetch("/api/generate-sketch", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mimeType, base64: data, notes: sketchPrompt }),
      });
      const { dataUrl, error } = await r.json();
      if (error) throw new Error(error);

      setLoadingStep("Son dokunuşlar yapılıyor...");
      const safeUrl = getSafeImageSrc(dataUrl);
      if (safeUrl) setGeneratedImageUrl(await addWatermark(safeUrl));
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Hata oluştu.");
    } finally {
      setIsLoading(false);
      setLoadingStep("");
    }
  };

  const workspace = (isSketchMode = false) => (
    <div className="w-full max-w-7xl mx-auto bg-white/50 shadow-2xl rounded-2xl backdrop-blur-lg p-4 sm:p-8">
      <QuoteRequestModal
        isOpen={isQuoteModalOpen}
        onClose={() => setQuoteModalOpen(false)}
        imageUrl={generatedImageUrl || ""}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Sol panel */}
        <div className="p-4 lg:p-8 rounded-lg space-y-6 h-full">
          <h3 className="text-3xl font-serif font-bold text-center lg:text-left">
            {isSketchMode ? "Eskizden Tasarım" : "Yazıdan Tasarım"}
          </h3>

          {isSketchMode ? (
            <>
              <div>
                <label className="font-bold text-lg mb-2 block">1. Eskiz Dosyanızı Yükleyin</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    setSketchFile(f || null);
                    if (sketchPreviewUrl) URL.revokeObjectURL(sketchPreviewUrl);
                    if (f) setSketchPreviewUrl(URL.createObjectURL(f));
                  }}
                  className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#C0A062]/20 file:text-[#C0A062] hover:file:bg-[#C0A062]/30"
                />
                {sketchPreviewUrl && (
                  <img
                    src={getSafeImageSrc(sketchPreviewUrl) || undefined}
                    alt="Eskiz"
                    className="mt-4 rounded-md max-h-32 shadow-md"
                  />
                )}
              </div>
              <div>
                <label className="font-bold text-lg mb-2 block">
                  2. Ek Notlar <span className="text-gray-500 font-normal">(Opsiyonel)</span>
                </label>
                <textarea
                  value={sketchPrompt}
                  onChange={(e) => setSketchPrompt(e.target.value)}
                  className="w-full p-3 border rounded-md h-24 bg-transparent"
                />
              </div>
            </>
          ) : (
            <>
              <div>
                <label className="font-bold text-lg mb-2 block">1. Mobilyanızı Tarif Edin</label>
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="w-full p-3 border rounded-md h-32 bg-transparent"
                  placeholder="Örn: 'İskandinav tarzı, 3 çekmeceli, masif ahşap bir TV ünitesi.'"
                />
              </div>
              <div>
                <label className="font-bold text-lg mb-2 block">2. Malzeme Seçin</label>
                <select
                  value={material}
                  onChange={(e) => setMaterial(e.target.value)}
                  className="w-full p-3 border rounded-md bg-white/80"
                >
                  <option>Ceviz</option>
                  <option>Meşe</option>
                  <option>Gürgen</option>
                  <option>Kiraz</option>
                  <option>MDF Lake</option>
                </select>
              </div>
              <div>
                <label className="font-bold text-lg mb-2 block">3. Ölçüler (cm)</label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={dimensions.w}
                    onChange={(e) => setDimensions({ ...dimensions, w: e.target.value })}
                    placeholder="Genişlik"
                    className="w-1/3 p-3 border rounded-md bg-transparent"
                  />
                  <input
                    type="number"
                    value={dimensions.h}
                    onChange={(e) => setDimensions({ ...dimensions, h: e.target.value })}
                    placeholder="Yükseklik"
                    className="w-1/3 p-3 border rounded-md bg-transparent"
                  />
                  <input
                    type="number"
                    value={dimensions.d}
                    onChange={(e) => setDimensions({ ...dimensions, d: e.target.value })}
                    placeholder="Derinlik"
                    className="w-1/3 p-3 border rounded-md bg-transparent"
                  />
                </div>
              </div>
            </>
          )}

          <button
            onClick={isSketchMode ? genFromSketch : genFromText}
            disabled={isLoading}
            className="w-full bg-[#2D2D2D] text-white font-bold py-4 px-8 rounded-full text-lg hover:bg-opacity-90 disabled:bg-gray-400"
          >
            {isLoading ? "Oluşturuluyor..." : "TASARIMI HAYATA GEÇİR"}
          </button>
          {error && <p className="text-red-500 text-center">{error}</p>}
        </div>

        {/* Sağ panel */}
        <div className="bg-gray-100 rounded-lg shadow-inner min-h-[500px] p-4 flex items-center justify-center">
          {isLoading ? (
            <div className="text-center">
              <div className="animate-spin h-10 w-10 mx-auto text-[#C0A062] border-4 border-gray-300 border-t-[#C0A062] rounded-full" />
              <p className="mt-4 font-semibold">{loadingStep || "Tasarımınız hazırlanıyor..."}</p>
            </div>
          ) : generatedImageUrl ? (
            <div className="w-full">
              {isSketchMode && sketchPreviewUrl ? (
                <BeforeAfterSlider
                  beforeImage={getSafeImageSrc(sketchPreviewUrl)!}
                  afterImage={getSafeImageSrc(generatedImageUrl)!}
                />
              ) : (
                <img
                height={800}
                width={800}
                  src={generatedImageUrl}
                  alt="Generated"
                  className="rounded-lg shadow-xl w-full h-full object-contain"
                />
              )}
              <button
                onClick={() => setQuoteModalOpen(true)}
                className="w-full mt-4 bg-[#C0A062] text-[#2D2D2D] font-bold py-3 px-8 rounded-full text-lg hover:bg-opacity-90"
              >
                Fiyat Teklifi Al
              </button>
            </div>
          ) : (
            <div className="text-center text-gray-500 p-8">
              <h4 className="font-serif text-2xl mb-2">Hayalinizdeki Tasarım Alanı</h4>
              <p>Sol paneli kullanarak fikrinizi hayata geçirin. Oluşturulan tasarım burada görünecek.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <section className="bg-[#F3F0E9] py-20 min-h-screen pt-24 md:pt-32 flex flex-col justify-center">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-serif font-bold">ATOLYE AI</h2>
          <p className="text-lg text-gray-600 mt-2">{workflow ? "Tasarım masanız hazır." : "Bir yöntem seçin."}</p>
        </div>
        {workspace(workflow === "sketch")}
      </div>
    </section>
  );
}
