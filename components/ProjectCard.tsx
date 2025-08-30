"use client";

import { useState, useMemo } from "react";
import { generateWatermarkPattern } from "@/lib/watermark";
import Image from "next/image";


interface ProjectCardProps {
  title: string;
  category: string;
  imageUrl: string;
  onSelect: () => void;
  className?: string;
}

export function ProjectCard({
  title,
  category,
  imageUrl,
  onSelect,
  className = "",
}: ProjectCardProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const pattern = useMemo(() => generateWatermarkPattern(), []);

  return (
    <button
      onClick={onSelect}
      className={`group relative overflow-hidden rounded-lg shadow-lg text-left w-full bg-gray-200 ${
        !isLoaded ? "animate-pulse" : ""
      } ${className}`}
    >
      {/* Görsel */}
      <Image
        src={imageUrl}
        alt={title}
        width={400}
        height={300}
        onLoad={() => setIsLoaded(true)}
        className={`w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Overlay */}
      <div
        className={`absolute inset-0 transition-opacity duration-500 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
      >
        {/* Watermark */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `url(${pattern})`,
            backgroundRepeat: "repeat",
          }}
        />
        {/* Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        {/* Text */}
        <div className="absolute bottom-0 left-0 p-6">
          <h3 className="text-white text-2xl font-serif font-bold">{title}</h3>
          <p className="text-gray-300">{category}</p>
        </div>
      </div>
    </button>
  );
}
