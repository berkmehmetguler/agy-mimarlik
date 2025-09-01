"use client";

import { useEffect, useState } from "react";

import { addWatermark } from "@/lib/watermark";
import { fileToBase64 } from "@/lib/fileToBase64";
import JSZip from "jszip";
import { saveAs } from "file-saver";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { BeforeAfterSlider } from "./BeforeAfterSlider";
import { QuoteRequestModal } from "./QuoteRequestModal";

import { FcMultipleInputs } from "react-icons/fc";
import { MdOutlineFileDownload } from "react-icons/md";

import Image from "next/image";
import Link from "next/link";
import { toast } from "react-toastify";

const MATERIALS = [
  { name: "Ceviz", img: "/materials/ceviz.png" },
  { name: "Meşe", img: "/materials/mese.png" },
  { name: "Gürgen", img: "/materials/gurgen.png" },
  { name: "Kiraz", img: "/materials/kiraz.png" },
  { name: "Çam", img: "/materials/cam.png" },
  { name: "Bambu", img: "/materials/bambu.png" },
  { name: "Akça", img: "/materials/akcaagac.png" },
  { name: "Suntalam", img: "/materials/suntalam.png" },
  { name: "MDF", img: "/materials/mdf.png" },
];

type RecentImage = {
  generatedProxyUrl?: string;
  generatedImageUrl?: string;
};

interface Dimensions {
  w: string;
  h: string;
  d: string;
}

export function AtolyeAI() {
  const [workflow, setWorkflow] = useState<"text" | "sketch" | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState("");
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(
    null
  );
  const [generatedProxyUrl, setGeneratedProxyUrl] = useState<string | null>(
    null
  );

  const [error, setError] = useState("");
  const [prompt, setPrompt] = useState("");
  const [dimensions, setDimensions] = useState<Dimensions>({
    w: "",
    h: "",
    d: "",
  });
  const [material, setMaterial] = useState("Ceviz");
  const [sketchFile, setSketchFile] = useState<File | null>(null);
  const [sketchPreviewUrl, setSketchPreviewUrl] = useState<string | null>(null);
  const [sketchPrompt, setSketchPrompt] = useState("");
  const [isQuoteModalOpen, setQuoteModalOpen] = useState(false);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [loading, _setLoading] = useState(false);
  const [imageLoadError, setImageLoadError] = useState<string | null>(null);

  const [isImageVisible, setIsImageVisible] = useState(true);
  const [recentImages, setRecentImages] = useState<string[]>([]); // Son oluşturulan görseller
  // Eskiz önizleme URL'si değiştiğinde eski URL'yi temizle

  useEffect(() => {
    console.log("🔍 Recent Images Debug:", {
      resultUrl,
      recentImages: recentImages.length,
      adding: !!resultUrl,
    });

    if (resultUrl) {
      setRecentImages((prev) => {
        if (prev.includes(resultUrl)) return prev;
        return [resultUrl, ...prev.slice(0, 9)];
      });
    }
  }, [resultUrl]);

  // Yeni resim geldiğinde görünürlüğü resetle
  useEffect(() => {
    if (generatedImageUrl) setIsImageVisible(true);
  }, [generatedImageUrl]);

  const getSafeImageSrc = (src?: string | null) => {
    if (!src) {
      console.log("🔍 getSafeImageSrc: src is null/undefined");
      return null;
    }

    if (src.startsWith("http://") || src.startsWith("https://")) {
      console.log("🔍 getSafeImageSrc: HTTP/HTTPS URL valid");
      return src;
    }

    if (src.startsWith("data:image/")) {
      console.log("🔍 getSafeImageSrc: Base64 image valid");
      return src;
    }

    if (src.startsWith("blob:")) {
      console.log("🔍 getSafeImageSrc: Blob URL valid");
      return src;
    }

    console.log(
      "🔍 getSafeImageSrc: Invalid URL format:",
      src.substring(0, 50)
    );
    return null;
  };

  const validateAndSetImage = async (imageUrl: string) => {
    try {
      setImageLoadError(null);

      // URL formatını kontrol et
      const safeUrl = getSafeImageSrc(imageUrl);
      if (!safeUrl) {
        throw new Error("Geçersiz resim URL formatı");
      }

      // Resmin yüklenebilir olup olmadığını kontrol et
      const img = new window.Image();
      img.crossOrigin = "anonymous";

      return new Promise<string>((resolve, reject) => {
        img.onload = () => {
          console.log("✅ Resim başarıyla yüklendi:", safeUrl);
          resolve(safeUrl);
        };

        img.onerror = () => {
          console.error("❌ Resim yüklenemedi:", safeUrl);
          reject(new Error("Resim yüklenemedi. URL geçersiz olabilir."));
        };

        // Timeout ekle (10 saniye)
        setTimeout(() => {
          reject(new Error("Resim yükleme zaman aşımı"));
        }, 10000);

        img.src = safeUrl;
      });
    } catch (error) {
      const errorMsg =
        error instanceof Error ? error.message : "Resim doğrulama hatası";
      setImageLoadError(errorMsg);
      throw error;
    }
  };

  const genFromText = async () => {
    if (!prompt) {
      setError("Lütfen bir açıklama yazın.");
      return;
    }

    setIsLoading(true);
    setError("");
    setImageLoadError(null);
    setGeneratedImageUrl(null);
    setGeneratedProxyUrl(null);

    try {
      setLoadingStep("Fikriniz ilham panomuza ekleniyor...");
      const r = await fetch("/api/generate-text", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, material, dimensions }),
      });

      if (!r.ok) {
        throw new Error(`API hatası: ${r.status} ${r.statusText}`);
      }

      const { dataUrl, error } = await r.json();
      if (error) throw new Error(error);

      if (!dataUrl) {
        throw new Error("API'den resim URL'si alınamadı");
      }

      setLoadingStep("Resim doğrulanıyor...");

      // URL'yi doğrula ve resmin yüklenebilir olduğunu kontrol et
      const validatedUrl = await validateAndSetImage(dataUrl);

      setLoadingStep("Son dokunuşlar yapılıyor...");

      // Watermark ekle
      const watermarkedUrl = await addWatermark(validatedUrl);

      // State'leri güncelle
      setGeneratedImageUrl(watermarkedUrl);
      setResultUrl(dataUrl); // Orijinal URL'yi recent images için sakla

      console.log("✅ Text-to-image işlemi başarıyla tamamlandı");
      console.log("🔗 Generated Image URL:", watermarkedUrl);
      console.log("🔗 Result URL for recent images:", dataUrl);
    } catch (e: unknown) {
      const errorMessage =
        e instanceof Error ? e.message : "Bilinmeyen hata oluştu";
      console.error("❌ Text generation error:", errorMessage);
      setError(`Tasarım oluşturulurken hata: ${errorMessage}`);
      setGeneratedImageUrl(null);
      setGeneratedProxyUrl(null);
    } finally {
      setIsLoading(false);
      setLoadingStep("");
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [aspectRatio, _setAspectRatio] = useState("1:1");

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [sketchStrength, _setSketchStrength] = useState(0.5);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [sketchGuidanceScale, _setSketchGuidanceScale] = useState(7.5);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [sketchSteps, _setSketchSteps] = useState(30);

  // ------------------- genFromSketch -------------------
  const genFromSketch = async () => {
    if (!sketchFile) {
      setError("Lütfen bir eskiz dosyası yükleyin.");
      return;
    }
    if (!sketchPrompt.trim()) {
      setError("Lütfen tasarım açıklaması yazın.");
      return;
    }

    setIsLoading(true);
    setError("");
    setImageLoadError(null);
    setGeneratedImageUrl(null);
    setGeneratedProxyUrl(null);

    try {
      const { mimeType, data } = await fileToBase64(sketchFile);
      setLoadingStep("Eskiziniz AI ile işleniyor...");

      const r = await fetch("/api/generate-sketch", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mimeType,
          base64: data,
          notes: sketchPrompt,
          aspectRatio,
          strength: sketchStrength,
          guidanceScale: sketchGuidanceScale,
          numInferenceSteps: sketchSteps,
        }),
      });

      if (!r.ok) throw new Error(`API hatası: ${r.status} ${r.statusText}`);

      const resp = await r.json();
      if (resp.error) throw new Error(resp.error);

      // 🔹 Proxy varsa onu, yoksa fallback dataUrl kullan
      const finalUrl = resp.proxy_links?.[0] || resp.dataUrl || null;
      if (!finalUrl) throw new Error("Resim oluşturulamadı");

      setLoadingStep("Son dokunuşlar yapılıyor...");

      // 🔹 Watermark ekleme
      const watermarkedUrl = await addWatermark(finalUrl);

      // 🔹 State'leri güncelle
      setGeneratedImageUrl(watermarkedUrl);
      setGeneratedProxyUrl(resp.proxy_links?.[0] || null); // Proxy hâlâ orijinal olarak saklanabilir
      setResultUrl(finalUrl); // Recent images için orijinal URL sakla

      console.log("✅ Watermarklı Image ready", { watermarkedUrl });
    } catch (e: unknown) {
      const errorMessage =
        e instanceof Error ? e.message : "Bilinmeyen hata oluştu";
      console.error("❌ Sketch generation error:", errorMessage);
      setError(`Tasarım oluşturulurken hata: ${errorMessage}`);
      setImageLoadError(errorMessage);
    } finally {
      setIsLoading(false);
      setLoadingStep("");
    }
  };
const handleDownload = async (url: string) => {
  try {
    if (!url) return;

    const res = await fetch("/api/download", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url }),
    });

    const blob = await res.blob();
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `tasarim_${Date.now()}.jpg`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(link.href);

    console.log("✅ Resim indirildi:", url);
    toast.success("Resim indirildi!");
  } catch (error) {
    console.error("İndirme başarısız:", error);
  }
};


  const handleDownloadZip = async (imageUrls: string[]) => {
    if (!imageUrls || imageUrls.length === 0) return;

    try {
      const zip = new JSZip();

      for (let i = 0; i < imageUrls.length; i++) {
        const imgUrl = imageUrls[i];
        if (!imgUrl) continue;

        // 1️⃣ Resmi al
        const res = await fetch(imgUrl);
        const blob = await res.blob();

        // 2️⃣ Blob -> base64
        const dataUrl: string = await new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result as string);
          reader.onerror = reject;
          reader.readAsDataURL(blob);
        });

        // 3️⃣ Watermark ekle
        const watermarkedDataUrl = await addWatermark(dataUrl);

        // 4️⃣ Zip’e ekle (base64 olarak)
        const base64 = watermarkedDataUrl.split(",")[1];
        zip.file(`tasarim_${i + 1}.jpg`, base64, { base64: true });
      }

      // 5️⃣ Zip blob oluştur ve indir
      const zipBlob = await zip.generateAsync({ type: "blob" });
      saveAs(zipBlob, `tasarimlar_${Date.now()}.zip`);
    } catch (error) {
      console.error("Toplu indirme başarısız:", error);
      toast.error("Toplu indirme sırasında bir hata oluştu.");
    }
  };

  function downloadImage(url: string, filename: string) {
    fetch(url)
      .then((res) => res.blob())
      .then((blob) => {
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        link.remove();
      })
      .catch((err) => console.error("❌ Download failed:", err));
  }

  // ------------------- workspace -------------------

  const workspace = (isSketchMode = false) => (
    <div className="w-full max-w-7xl mx-auto bg-white/50 shadow-2xl rounded-2xl backdrop-blur-lg p-4 sm:p-8">
      <QuoteRequestModal
        isOpen={isQuoteModalOpen}
        onClose={() => setQuoteModalOpen(false)}
        imageUrl={generatedImageUrl || generatedProxyUrl || ""}
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
                <label className="font-bold text-lg mb-2 block">
                  1. Eskiz Dosyanızı Yükleyin
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    setSketchFile(f || null);
                    if (sketchPreviewUrl) URL.revokeObjectURL(sketchPreviewUrl);
                    if (f) {
                      const newPreviewUrl = URL.createObjectURL(f);
                      setSketchPreviewUrl(newPreviewUrl);
                      console.log("📁 Sketch file selected:", {
                        fileName: f.name,
                        fileSize: f.size,
                        previewUrl: newPreviewUrl,
                      });
                    } else {
                      setSketchPreviewUrl(null);
                      console.log("📁 Sketch file cleared");
                    }
                  }}
                  className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#C0A062]/20 file:text-[#C0A062] hover:file:bg-[#C0A062]/30"
                />
                {sketchPreviewUrl && (
                  <div className="mt-4 rounded-md shadow-md overflow-hidden max-w-xs">
                    <Image
                      src={sketchPreviewUrl}
                      alt="Eskiz"
                      width={400}
                      height={400}
                      className="w-full h-auto object-contain"
                    />
                  </div>
                )}
              </div>
              <div>
                <label className="font-bold text-lg mb-2 block">
                  2. Ek Notlar{" "}
                  <span className="text-gray-500 font-normal">(Opsiyonel)</span>
                </label>
                <textarea
                  value={sketchPrompt}
                  onChange={(e) => setSketchPrompt(e.target.value)}
                  className="w-full p-3 border rounded-md h-24 bg-transparent"
                />
                <div className="mt-2 text-sm text-gray-600 bg-yellow-50 border-l-4 border-yellow-400 p-2 rounded">
                  {" "}
                  <strong>İpucu:</strong> Tasarımınızı ne kadar detaylı ve
                  açıklayıcı tarif ederseniz, o kadar iyi sonuçlar elde
                  edersiniz. Örneğin; stil, renk, malzeme gibi detayları
                  ekleyebilirsiniz.{" "}
                </div>
              </div>
            </>
          ) : (
            <>
              <div>
                <label className="font-bold text-lg mb-2 block">
                  1. Mobilyanızı Tarif Edin
                </label>
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="w-full p-3 border rounded-md h-32 bg-transparent"
                  placeholder="Örn: 'İskandinav tarzı, 3 çekmeceli, masif ahşap bir TV ünitesi.'"
                />
                <div className="mt-2 text-sm text-gray-600 bg-yellow-50 border-l-4 border-yellow-400 p-2 rounded">
                  <strong>İpucu:</strong> Tasarımınızı ne kadar detaylı ve
                  açıklayıcı tarif ederseniz, o kadar iyi sonuçlar elde
                  edersiniz. Örneğin; stil, renk, malzeme, ölçü gibi detayları
                  ekleyebilirsiniz.
                </div>
              </div>
              <div>
                <label className="font-bold text-lg mb-2 block">
                  2. Malzeme Seçin{" "}
                  <span className="text-gray-500 font-normal">(Kartela)</span>
                </label>
                <div className="flex flex-row gap-2 overflow-scroll mb-4">
                  {MATERIALS.map((mat) => (
                    <button
                      key={mat.name}
                      type="button"
                      onClick={() => setMaterial(mat.name)}
                      className={`flex items-center max-w-md gap-3 p-2 mb-2 rounded-lg border transition
          ${
            material === mat.name
              ? "border-[#C0A062] bg-[#FFF8E1]"
              : "border-gray-200 bg-white/80"
          }
          hover:border-[#C0A062]`}
                    >
                      <span className="w-10 h-10 rounded-full overflow-hidden border border-gray-300 flex items-center justify-center bg-white">
                        <Image
                          src={mat.img}
                          alt={mat.name}
                          width={40}
                          height={40}
                          className="object-cover w-10 h-10"
                        />
                      </span>
                      <span className="font-semibold">{mat.name}</span>
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="font-bold text-lg mb-2 block">
                  3. Ölçüler (cm)
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={dimensions.w}
                    onChange={(e) =>
                      setDimensions({ ...dimensions, w: e.target.value })
                    }
                    placeholder="Genişlik"
                    className="w-1/3 p-3 border rounded-md bg-transparent"
                  />
                  <input
                    type="number"
                    value={dimensions.h}
                    onChange={(e) =>
                      setDimensions({ ...dimensions, h: e.target.value })
                    }
                    placeholder="Yükseklik"
                    className="w-1/3 p-3 border rounded-md bg-transparent"
                  />
                  <input
                    type="number"
                    value={dimensions.d}
                    onChange={(e) =>
                      setDimensions({ ...dimensions, d: e.target.value })
                    }
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
            className="w-full font-bold py-4 px-8 rounded-full text-lg hover:bg-opacity-90 disabled:bg-gray-400 bg-[#2D2D2D]  text-white hover:bg-gray-100 hover:text-black outline-1 hover:outline-black cursor-pointer"
          >
            {isLoading ? "Oluşturuluyor..." : "TASARIMI HAYATA GEÇİR"}
          </button>
          {error && (
            <div className="text-red-600 text-center p-4 bg-red-50 rounded-lg border border-red-200 shadow-sm">
              <div className="space-y-2">
                <p className="font-semibold text-red-700">❌ Hata Oluştu</p>
                <div className="text-sm whitespace-pre-line text-left bg-white p-3 rounded border border-red-100">
                  {error}
                </div>
                <button
                  onClick={() => setError("")}
                  className="mt-2 px-3 py-1 text-xs bg-red-100 hover:bg-red-200 text-red-700 rounded-full transition"
                >
                  Kapat
                </button>
              </div>
            </div>
          )}

          {/* Development debug panel */}
          {/* {process.env.NODE_ENV === "development" && (
            <div className="mt-4 p-3 bg-gray-50 rounded-lg text-xs text-gray-600">
              <details>
                <summary className="cursor-pointer font-semibold">
                  🔧 Debug Bilgileri
                </summary>
                <div className="mt-2 space-y-1">
                  <div>Generated URL: {generatedImageUrl || "null"}</div>
                  <div>Result URL: {resultUrl || "null"}</div>
                  <div>Image Load Error: {imageLoadError || "null"}</div>
                  <div>Loading: {isLoading ? "true" : "false"}</div>
                  <div>Loading Step: {loadingStep || "null"}</div>
                </div>
              </details>
            </div>
          )} */}
        </div>

        {/* // ------------------- Sağ panel ------------------- */}
        <div className="bg-gray-100 rounded-lg shadow-inner min-h-[500px] md:min-h-full p-4 flex items-center justify-center">
          {isLoading ? (
            <div className="text-center max-w-md">
              <div className="animate-spin h-12 w-12 mx-auto text-[#C0A062] border-4 border-gray-300 border-t-[#C0A062] rounded-full" />
              <p className="mt-4 font-semibold text-lg">
                {loadingStep || "Tasarımınız hazırlanıyor..."}
              </p>
            </div>
          ) : imageLoadError ? (
            <div className="text-center text-red-500 p-8">
              <div className="text-6xl mb-4">⚠️</div>
              <h4 className="font-bold text-xl mb-2">Resim Yükleme Hatası</h4>
              <p className="mb-4">{imageLoadError}</p>
              <button
                onClick={() => {
                  setImageLoadError(null);
                  setError("");
                }}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                Tekrar Dene
              </button>
            </div>
          ) : generatedImageUrl ? (
            <div className="w-full">
              {/* // Resim alanı */}
              {isImageVisible && (
                <div className="relative w-full">
                  {/* Çarpı butonu */}
                  <button
                    onClick={() => setIsImageVisible(false)}
                    className="absolute top-2 right-2 z-10 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-600"
                  >
                    ✕
                  </button>

                  <Image
                    src={generatedImageUrl}
                    alt="Oluşturulan Tasarım"
                    width={800}
                    height={800}
                    className="w-full h-auto object-contain rounded-lg shadow-xl"
                    onError={() =>
                      setImageLoadError(
                        "Resim görüntülenemiyor. Lütfen tekrar deneyin."
                      )
                    }
                  />
                </div>
              )}

              {/* Tasarımı İndir Butonu */}
              {isImageVisible && (generatedImageUrl || generatedProxyUrl) && (
                <div className="mt-4 md:flex justify-center text-center gap-5">
                 <button
                  onClick={() => {
                    const url = generatedImageUrl ?? generatedProxyUrl; // undefined ise diğerini al
                    if (url) handleDownload(url); // sadece url varsa indir
                  }}
                  className="w-full mt-4 font-bold py-3 px-4 rounded-full text-lg inline-block text-center bg-[#2D2D2D] text-white hover:bg-gray-100 hover:outline-1 hover:outline-gray-800 hover:text-black"
                >
                  <MdOutlineFileDownload
                    size={23}
                    className="inline mr-2 -mt-1"
                  />
                  Tasarımı İndir
                  </button>

                </div>
              )}
            </div>
          ) : (
            <div className="text-center text-gray-500 p-8 select-none h-full flex flex-col justify-center">
              <h4 className="font-serif text-2xl my-2">
                Hayalinizdeki Tasarım Alanı
              </h4>
              <p>
                Sol paneli kullanarak fikrinizi hayata geçirin. Oluşturulan
                tasarım burada görünecek.
              </p>
            </div>
          )}
        </div>

        {/* Son Üretilenler Alanı */}
        <div className="lg:col-span-2 w-full mt-8 bg-gray-100 p-4 rounded-lg shadow-inner">
          <h2 className="text-xl font-bold mb-3 ml-1">
            Son Üretilenler
            {process.env.NODE_ENV === "development" && (
              <span className="text-xs text-gray-500 ml-2">
                ({recentImages.length} adet)
              </span>
            )}
          </h2>
          <div
            className="flex gap-4 overflow-x-auto pb-3 px-1"
            style={{ maxWidth: "100%" }}
          >
            {recentImages.map((img, i) => (
              <div
                key={i}
                className="relative flex-shrink-0 w-24 h-24 bg-white rounded-lg shadow border overflow-hidden aspect-square flex items-center justify-center"
                style={{ aspectRatio: "1 / 1" }}
                title={`Oluşturulan #${i + 1}`}
              >
                {/* Silme butonu */}
                <button
                  onClick={() =>
                    setRecentImages((prev) =>
                      prev.filter((_, idx) => idx !== i)
                    )
                  }
                  className="absolute top-1 right-1 bg-red-500 hover:bg-red-700 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs shadow"
                  title="Sil"
                  tabIndex={0}
                >
                  ×
                </button>

                {/* Görsel */}
                <Image
                  src={img}
                  alt={`Oluşturulan #${i + 1}`}
                  width={96}
                  height={96}
                  className="object-cover w-full h-full"
                  unoptimized
                  onError={() =>
                    console.error("❌ Recent image failed to load:", img)
                  }
                  onLoad={() =>
                    console.log("✅ Recent image loaded successfully:", img)
                  }
                />

                {/* İndir butonu */}
                <button
                  onClick={() => handleDownload(img)}
                  className="absolute bottom-1 right-1 bg-[#C0A062] hover:bg-[#A18E4A] text-white rounded-full w-6 h-6 flex items-center justify-center text-xs shadow"
                  title="İndir"
                >
                  <MdOutlineFileDownload size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-2 justify-end w-full lg:col-span-2">
          {/* Toplu indir butonu */}
          <button
            onClick={() => handleDownloadZip(recentImages)}
            className="px-3 py-2 rounded-full text-sm font-semibold hover:bg-opacity-80 bg-[#2D2D2D]  text-white hover:bg-gray-100 hover:text-black outline-1 hover:outline-black cursor-pointer transition"
            title="Tümünü indir"
          >
            <FcMultipleInputs size={23} className="inline mr-2 -mt-1" />
            Tümünü İndir
          </button>
          {/* Excel olarak indir butonu */}
          {/* <button
            onClick={() => {
              // Basit CSV (Excel açabilir)
              const csv =
                "data:text/csv;charset=utf-8," +
                recentImages
                  .map((img, i) => `Resim ${i + 1},${img}`)
                  .join("\n");
              const encodedUri = encodeURI(csv);
              const link = document.createElement("a");
              link.setAttribute("href", encodedUri);
              link.setAttribute("download", "son_uretilenler.csv");
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
            }}
            className=" hidden bg-[#C0A062] text-[#2D2D2D] px-3 py-2 rounded-full text-sm font-semibold hover:bg-[#A18E4A] transition cursor-pointer"
            title="Excel olarak indir"
          >
            Excel Olarak Al
          </button> */}
        </div>

        {/* Alt not */}
        <div className="lg:col-span-2 text-center h-16 text-gray-900 text-sm mt-4">
          <div className="p-2 bg-yellow-100 rounded-full inline-block">
            <strong className="font-bold">Not:</strong> Oluşturulan görseller
            yapay zeka tarafından üretilmiştir ve telif hakkı AGY Mimarlığa
            aittir.
          </div>
          <div className="text-gray-600 mt-1">
            <em>© 2024 AGY Mimarlık. Tüm hakları saklıdır.</em>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <section className="bg-[#F3F0E9] text-gray-700 py-20 min-h-screen pt-24 md:pt-32 flex flex-col justify-center">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-serif font-bold text-black">
            ATOLYE AI
          </h2>
          <p className="text-lg text-gray-600 mt-2">
            {workflow ? "Tasarım hazır hazır." : "Bir yöntem seçin."}
          </p>
        </div>

        {/* Yöntem seçme butonları */}
        <div className="flex justify-center gap-4 mb-12">
          <button
            onClick={() => setWorkflow("text")}
            className={`px-6 py-3 rounded-full font-bold transition ${
              workflow === "text"
                ? "bg-[#C0A062] text-white shadow-lg"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            Yazıdan Tasarım
          </button>

          <button
            onClick={() => setWorkflow("sketch")}
            className={`px-6 py-3 rounded-full font-bold transition ${
              workflow === "sketch"
                ? "bg-[#C0A062] text-white shadow-lg"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            Eskizden Tasarım
          </button>
        </div>

        {/* Workspace */}
        {workspace(workflow === "sketch")}
      </div>
    </section>
  );
}
