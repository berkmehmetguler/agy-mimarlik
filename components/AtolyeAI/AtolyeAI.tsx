"use client";

import { useEffect, useState } from "react";

import { addWatermark } from "@/lib/watermark";
import { fileToBase64 } from "@/lib/fileToBase64";
import JSZip from "jszip";
import { saveAs } from "file-saver";

import { BeforeAfterSlider } from "./BeforeAfterSlider";
import { QuoteRequestModal } from "./QuoteRequestModal";

import { FcMultipleInputs } from "react-icons/fc";
import { MdOutlineFileDownload } from "react-icons/md";

import Image from "next/image";
import Link from "next/link";

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
  const [loading, setLoading] = useState(false);
  const [imageLoadError, setImageLoadError] = useState<string | null>(null);

  const [recentImages, setRecentImages] = useState<string[]>([]); // Son oluşturulan görseller
  // Eskiz önizleme URL'si değiştiğinde eski URL'yi temizle

  
  useEffect(() => {
    console.log('🔍 Recent Images Debug:', {
      resultUrl,
      recentImages: recentImages.length,
      adding: !!resultUrl
    });
    
    if (resultUrl) {
      setRecentImages((prev) => {
        const newImages = [resultUrl, ...prev.slice(0, 9)];
        console.log('✅ Updated recent images:', newImages);
        return newImages;
      });
    }
  }, [resultUrl]);

  const getSafeImageSrc = (src?: string | null) => {
    if (!src) {
      console.log('🔍 getSafeImageSrc: src is null/undefined');
      return null;
    }
    
    if (src.startsWith("http://") || src.startsWith("https://")) {
      console.log('🔍 getSafeImageSrc: HTTP/HTTPS URL valid');
      return src;
    }
    
    if (src.startsWith("data:image/")) {
      console.log('🔍 getSafeImageSrc: Base64 image valid');
      return src;
    }
    
    if (src.startsWith("blob:")) {
      console.log('🔍 getSafeImageSrc: Blob URL valid');
      return src;
    }
    
    console.log('🔍 getSafeImageSrc: Invalid URL format:', src.substring(0, 50));
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
      const errorMsg = error instanceof Error ? error.message : "Resim doğrulama hatası";
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
        throw new Error('API\'den resim URL\'si alınamadı');
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
      
      console.log('✅ Text-to-image işlemi başarıyla tamamlandı');
      console.log('🔗 Generated Image URL:', watermarkedUrl);
      console.log('🔗 Result URL for recent images:', dataUrl);
      
    } catch (e: unknown) {
      const errorMessage = e instanceof Error ? e.message : "Bilinmeyen hata oluştu";
      console.error('❌ Text generation error:', errorMessage);
      setError(`Tasarım oluşturulurken hata: ${errorMessage}`);
      setGeneratedImageUrl(null);
    } finally {
      setIsLoading(false);
      setLoadingStep("");
    }
  };

  const [aspectRatio, setAspectRatio] = useState('1:1');
  const [sketchStrength, setSketchStrength] = useState('0.45');
  const [sketchGuidanceScale, setSketchGuidanceScale] = useState('7.5');
  const [sketchSteps, setSketchSteps] = useState('31');


  const genFromSketch = async () => {
    if (!sketchFile) { 
      setError('Lütfen bir eskiz dosyası yükleyin.'); 
      return; 
    }
    if (!sketchPrompt.trim()) { 
      setError('Lütfen tasarım açıklaması yazın.'); 
      return; 
    }
    
    setIsLoading(true); 
    setError(''); 
    setImageLoadError(null);
    setGeneratedImageUrl(null);
    
    try {
      const { mimeType, data } = await fileToBase64(sketchFile);
      setLoadingStep('Eskiziniz AI ile işleniyor...');
      
      const r = await fetch('/api/generate-sketch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          mimeType, 
          base64: data, 
          notes: sketchPrompt, 
          aspectRatio,
          strength: sketchStrength,
          guidanceScale: sketchGuidanceScale,
          numInferenceSteps: sketchSteps
        })
      });
      
      if (!r.ok) {
        throw new Error(`API hatası: ${r.status} ${r.statusText}`);
      }
      
      const { dataUrl, error } = await r.json();
      if (error) throw new Error(error);
      
      if (!dataUrl) {
        throw new Error('API\'den resim URL\'si alınamadı');
      }
      
      console.log('🔗 API\'den dönen URL:', dataUrl);
      
      setLoadingStep('Resim doğrulanıyor...');
      
      // URL'yi doğrula ve resmin yüklenebilir olduğunu kontrol et
      const validatedUrl = await validateAndSetImage(dataUrl);
      
      setLoadingStep('Son dokunuşlar yapılıyor...');
      
      // Watermark ekle
      const watermarkedUrl = await addWatermark(validatedUrl);
      
      // State'leri güncelle
      setGeneratedImageUrl(watermarkedUrl);
      setResultUrl(dataUrl); // Orijinal URL'yi recent images için sakla
      
      console.log('✅ Sketch-to-render işlemi başarıyla tamamlandı');
      console.log('🔗 Generated Image URL:', watermarkedUrl);
      console.log('🔗 Result URL for recent images:', dataUrl);
      
    } catch (e: unknown) {
      const errorMessage = e instanceof Error ? e.message : 'Bilinmeyen hata oluştu';
      console.error('❌ Sketch generation error:', errorMessage);
      
      // Check different error types and provide appropriate messages
      if (errorMessage.includes('Çok fazla istek')) {
        setError(`🚫 ${errorMessage}\n\n⏰ Sistem koruması aktif. Lütfen bekleyin ve tekrar deneyin.`);
      } else if (errorMessage.includes('API servisi yoğun durumda')) {
        setError(`🔄 ${errorMessage}\n\n💡 İpucu: Yoğun saatlerde işlem süresi uzayabilir. Sabırsızlık göstermeyin!`);
      } else if (errorMessage.includes('İşlem tamamlanamadı')) {
        setError(`⏱️ ${errorMessage}\n\n🎯 Öneriler:\n• Daha basit bir eskiz deneyin\n• Prompt'u daha açık yazın\n• Birkaç dakika sonra tekrar deneyin`);
      } else if (errorMessage.includes('API hatası: 429')) {
        setError(`🚫 Çok fazla istek gönderildi.\n\n⏰ Lütfen 1 dakika bekleyip tekrar deneyin.\n\n💡 Bu sistem koruması sayesinde herkes adil şekilde hizmet alabilir.`);
      } else {
        setError(`Tasarım oluşturulurken hata: ${errorMessage}`);
      }
      
      // Hata durumunda state'leri temizle
      setGeneratedImageUrl(null);
      setResultUrl(null);
    } finally {
      setIsLoading(false); 
      setLoadingStep('');
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
                      console.log('📁 Sketch file selected:', {
                        fileName: f.name,
                        fileSize: f.size,
                        previewUrl: newPreviewUrl
                      });
                    } else {
                      setSketchPreviewUrl(null);
                      console.log('📁 Sketch file cleared');
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
                  onClick={() => setError('')}
                  className="mt-2 px-3 py-1 text-xs bg-red-100 hover:bg-red-200 text-red-700 rounded-full transition"
                >
                  Kapat
                </button>
              </div>
            </div>
          )}
          
          {/* Development debug panel */}
          {process.env.NODE_ENV === 'development' && (
            <div className="mt-4 p-3 bg-gray-50 rounded-lg text-xs text-gray-600">
              <details>
                <summary className="cursor-pointer font-semibold">🔧 Debug Bilgileri</summary>
                <div className="mt-2 space-y-1">
                  <div>Generated URL: {generatedImageUrl || 'null'}</div>
                  <div>Result URL: {resultUrl || 'null'}</div>
                  <div>Image Load Error: {imageLoadError || 'null'}</div>
                  <div>Loading: {isLoading ? 'true' : 'false'}</div>
                  <div>Loading Step: {loadingStep || 'null'}</div>
                </div>
              </details>
            </div>
          )}
        </div>

        {/* Sağ panel */}
        <div className="bg-gray-100 rounded-lg shadow-inner min-h-[500px] md:min-h-full p-4 flex items-center justify-center">
          {isLoading ? (
            <div className="text-center max-w-md">
              <div className="animate-spin h-12 w-12 mx-auto text-[#C0A062] border-4 border-gray-300 border-t-[#C0A062] rounded-full" />
              <p className="mt-4 font-semibold text-lg">
                {loadingStep || "Tasarımınız hazırlanıyor..."}
              </p>
              {loadingStep.includes('işleniyor') && (
                <div className="mt-3 text-sm text-gray-600 bg-blue-50 p-3 rounded-lg border border-blue-200">
                  <p className="font-medium text-blue-800">💡 Bilgi:</p>
                  <p>AI modelimiz eskizinizi analiz ediyor ve tasarım oluşturuyor.</p>
                  <p>Bu işlem 20-60 saniye sürebilir.</p>
                </div>
              )}
              {loadingStep.includes('doğrulanıyor') && (
                <div className="mt-3 text-sm text-gray-600">
                  <p>🔍 Oluşturulan görsel kontrol ediliyor...</p>
                </div>
              )}
            </div>
          ) : imageLoadError ? (
            <div className="text-center text-red-500 p-8">
              <div className="text-6xl mb-4">⚠️</div>
              <h4 className="font-bold text-xl mb-2">Resim Yükleme Hatası</h4>
              <p className="mb-4">{imageLoadError}</p>
              <button
                onClick={() => {
                  setImageLoadError(null);
                  setError('');
                }}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                Tekrar Dene
              </button>
            </div>
          ) : generatedImageUrl ? (
            <div className="w-full">
              {(() => {
                const beforeSafe = getSafeImageSrc(sketchPreviewUrl);
                const afterSafe = getSafeImageSrc(generatedImageUrl);
                
                console.log('🔍 BeforeAfter Debug:', {
                  workflow,
                  isSketchMode,
                  sketchPreviewUrl: sketchPreviewUrl ? 'EXISTS' : 'NULL',
                  sketchPreviewUrlLength: sketchPreviewUrl?.length || 0,
                  generatedImageUrl: generatedImageUrl ? 'EXISTS' : 'NULL', 
                  generatedImageUrlLength: generatedImageUrl?.length || 0,
                  beforeSafe: beforeSafe ? 'VALID' : 'INVALID',
                  afterSafe: afterSafe ? 'VALID' : 'INVALID',
                  allConditionsMet: isSketchMode && sketchPreviewUrl && beforeSafe && afterSafe,
                  conditions: {
                    isSketchMode: !!isSketchMode,
                    hasSketchPreview: !!sketchPreviewUrl,
                    beforeSafeValid: !!beforeSafe,
                    afterSafeValid: !!afterSafe
                  }
                });
                
                if (isSketchMode && sketchPreviewUrl && beforeSafe && afterSafe) {
                  return (
                    <BeforeAfterSlider
                      beforeImage={beforeSafe}
                      afterImage={afterSafe}
                    />
                  );
                } else {
                  return (
                    <div className="relative">
                      <Image
                        src={generatedImageUrl!}
                        alt="Oluşturulan Tasarım"
                        width={800}
                        height={800}
                        className="w-full h-auto object-contain rounded-lg shadow-xl"
                        unoptimized
                        onError={() => {
                          console.error('❌ Resim görüntülenirken hata oluştu');
                          setImageLoadError('Resim görüntülenemiyor. Lütfen tekrar deneyin.');
                          setGeneratedImageUrl(null);
                        }}
                        onLoad={() => {
                          console.log('✅ Resim başarıyla görüntülendi');
                        }}
                      />
                      {/* URL debug info (development only) */}
                      {process.env.NODE_ENV === 'development' && (
                        <div className="absolute top-2 left-2 bg-black/70 text-white text-xs p-2 rounded max-w-xs overflow-hidden">
                          <div className="truncate">URL: {generatedImageUrl}</div>
                        </div>
                      )}
                    </div>
                  );
                }
              })()}
              
              {generatedImageUrl && (
                <div className="mt-4 md:flex justify-center text-center gap-5">
                  <Link
                    href={generatedImageUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    download
                    className="w-full mt-4 font-bold py-3 px-4 rounded-full text-lg inline-block text-center hover:bg-opacity-90 bg-[#2D2D2D] text-white hover:bg-gray-100 hover:text-black outline-1 hover:outline-black cursor-pointer"
                  >
                    <MdOutlineFileDownload
                      size={23}
                      className="inline mr-2 -mt-1"
                    />
                    Tasarımı İndir
                  </Link>
                  <Link
                    href={"https://www.instagram.com/agy_mimarlik/"}
                    onClick={() => setQuoteModalOpen(true)}
                    className="w-full mt-4 bg-[#C0A062] text-[#2D2D2D] font-bold py-3 px-4 rounded-full text-lg inline-block text-center hover:bg-opacity-90"
                  >
                    Fiyat Teklifi Al
                  </Link>
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

        {/* Buraya en son oluşturulanlar gelsin */}
        {/* Son Üretilenler Alanı */}
        <div className="lg:col-span-2 w-full mt-8 bg-gray-100 p-4 rounded-lg shadow-inner">
          <h2 className="text-xl font-bold mb-3 ml-1">
            Son Üretilenler 
            {process.env.NODE_ENV === 'development' && (
              <span className="text-xs text-gray-500 ml-2">({recentImages.length} adet)</span>
            )}
          </h2>
          <div
            className="flex gap-4 overflow-x-auto pb-3 px-1"
            style={{ maxWidth: "100%" }}
          >
            {[...Array(Math.max(10, recentImages.length))].map((_, i) => {
              const img = recentImages[i];
              return (
                <div
                  key={i}
                  className="relative flex-shrink-0 w-24 h-24 bg-white rounded-lg shadow border overflow-hidden aspect-square flex items-center justify-center"
                  style={{ aspectRatio: "1 / 1" }}
                  title={img ? `Oluşturulan #${i + 1}` : "Henüz görsel yok"}
                >
                  {/* Silme butonu */}
                  {img && (
                    <button
                      onClick={() => {
                        setRecentImages((prev) =>
                          prev.filter((_, idx) => idx !== i)
                        );
                      }}
                      className="absolute top-1 right-1 bg-red-500 hover:bg-red-700 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs shadow"
                      title="Sil"
                      tabIndex={0}
                    >
                      ×
                    </button>
                  )}
                  {/* Görsel veya boş */}
                  {img ? (
                    <>
                      <Image
                        src={img}
                        alt={`Oluşturulan #${i + 1}`}
                        width={96}
                        height={96}
                        className="object-cover w-full h-full"
                        unoptimized
                        onError={(e) => {
                          console.error('❌ Recent image failed to load:', img);
                          // Temporarily disabled auto-removal due to SSL issues
                          // setRecentImages((prev) => prev.filter((_, idx) => idx !== i));
                        }}
                        onLoad={() => {
                          console.log('✅ Recent image loaded successfully:', img);
                        }}
                      />
                      {/* İndir butonu */}
                      <Link
                        href={img}
                        download={`tasarim_${i + 1}.jpg`}
                        className="absolute bottom-1 right-1  bg-[#C0A062] hover:bg-[#A18E4A] text-white rounded-full w-6 h-6 flex items-center justify-center text-xs shadow"
                        title="İndir"
                        tabIndex={0}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <MdOutlineFileDownload size={16} />
                      </Link>
                    </>
                  ) : (
                    <span className="text-gray-300 text-xs text-center">
                      Boş
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
        <div className="flex gap-2 justify-end w-full lg:col-span-2">
          {/* Toplu indir butonu */}
          <button
            onClick={async () => {
              try {
                const zip = new JSZip();
                const validImages = recentImages.filter(img => img); // Filter out null/undefined
                
                if (validImages.length === 0) {
                  alert('İndirilecek görsel bulunamadı.');
                  return;
                }
                
                console.log('📦 Starting bulk download for', validImages.length, 'images');
                
                // Her görseli fetch ile indirip zip'e ekle
                await Promise.all(
                  validImages.map(async (img, i) => {
                    try {
                      console.log('⬇️ Downloading image', i + 1, ':', img);
                      const response = await fetch(img);
                      if (!response.ok) {
                        throw new Error(`HTTP ${response.status}`);
                      }
                      const blob = await response.blob();
                      zip.file(`tasarim_${i + 1}.jpg`, blob);
                      console.log('✅ Image', i + 1, 'added to zip');
                    } catch (error) {
                      console.error('❌ Failed to download image', i + 1, ':', error);
                      // Continue with other images even if one fails
                    }
                  })
                );
                
                const content = await zip.generateAsync({ type: "blob" });
                saveAs(content, "son_uretilenler.zip");
                console.log('✅ Bulk download completed');
              } catch (error) {
                console.error('❌ Bulk download failed:', error);
                alert('Toplu indirme sırasında hata oluştu. Lütfen tekrar deneyin.');
              }
            }}
            className="px-3 py-2 rounded-full text-sm font-semibold hover:bg-opacity-80 bg-[#2D2D2D]  text-white hover:bg-gray-100 hover:text-black outline-1 hover:outline-black cursor-pointer transition"
            title="Tümünü indir"
          >
            <FcMultipleInputs size={23} className="inline mr-2 -mt-1" />
            Tümünü İndir
          </button>
          {/* Excel olarak indir butonu */}
          <button
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
          </button>
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
    <section className="bg-[#F3F0E9] py-20 min-h-screen pt-24 md:pt-32 flex flex-col justify-center">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-serif font-bold">ATOLYE AI</h2>
          <p className="text-lg text-gray-600 mt-2">
            {workflow ? "Tasarım masanız hazır." : "Bir yöntem seçin."}
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
