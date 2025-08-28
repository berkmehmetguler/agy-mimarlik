"use client";

import { useEffect, useMemo, useState } from "react";
import { generateWatermarkPattern } from "@/lib/watermark";

interface ImageData {
  src: string;
  alt: string;
  ref?: string;
}

interface Section {
  id: string;
  title: string;
  images: ImageData[];
}

interface Category {
  title: string;
  galleryDescription: string;
  sections: Section[];
}

interface ProjectGalleryProps {
  category: Category;
}

export function ProjectGallery({ category }: ProjectGalleryProps) {
  const [selected, setSelected] = useState<number | null>(null);
  const [activeId, setActiveId] = useState(category.sections?.[0]?.id || "");
  const pattern = useMemo(() => generateWatermarkPattern(), []);
  const active = category.sections?.find((s: Section) => s.id === activeId);
  const images = active ? active.images : [];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [category]);

  return (
    <section className="bg-white py-20 min-h-screen pt-32">
      <div className="container mx-auto px-6">
        {/* Başlık */}
        <div className="flex justify-between items-start mb-12 flex-wrap gap-4">
          <div className="text-left">
            <h2 className="text-5xl font-serif font-bold">{category.title}</h2>
            <p className="text-lg text-gray-600 mt-4 max-w-3xl">
              {category.galleryDescription}
            </p>
          </div>
        </div>

        {/* Sekmeler */}
        {category.sections?.length > 1 && (
          <div className="flex justify-center flex-wrap gap-2 md:gap-4 mb-12">
            {category.sections.map((s: Section) => (
              <button
                key={s.id}
                onClick={() => setActiveId(s.id)}
                className={`px-5 py-2 rounded-full font-semibold text-sm ${
                  activeId === s.id
                    ? "bg-[#2D2D2D] text-white shadow-md"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {s.title}
              </button>
            ))}
          </div>
        )}

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((img: ImageData, i: number) => (
            <div
              key={i}
              className="group relative overflow-hidden rounded-lg shadow-lg cursor-pointer bg-gray-200"
              onClick={() => setSelected(i)}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-80 object-cover transform group-hover:scale-110 transition-transform duration-500"
              />
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: `url(${pattern})`,
                  backgroundRepeat: "repeat",
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selected !== null && images[selected] && (
        <div
          className="fixed inset-0 bg-black/90 z-[100] flex items-center justify-center p-4"
          onClick={() => setSelected(null)}
        >
          <button
            onClick={() => setSelected(null)}
            className="absolute top-4 right-4 text-white text-5xl"
          >
            &times;
          </button>
          <div
            className="relative text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={images[selected].src}
              alt={images[selected].alt}
              className="max-w-[90vw] max-h-[85vh] object-contain rounded-lg shadow-2xl"
            />
            <div
              className="absolute inset-0 pointer-events-none rounded-lg"
              style={{
                backgroundImage: `url(${pattern})`,
                backgroundRepeat: "repeat",
              }}
            />
            {images[selected].ref && (
              <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-center py-2 rounded-b-lg select-all">
                Referans Kodu:{" "}
                <span className="font-bold tracking-wider">
                  {images[selected].ref}
                </span>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
