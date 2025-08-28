"use client";

import { useMemo } from "react";
import { projectsData } from "@/lib/projectsData";
import { ProjectCard } from "./ProjectCard";
import { useRouter } from "next/navigation";

interface ProjectData {
  title: string;
  category: string;
  coverImage: string;
}

export function FeaturedProjects() {
  const router = useRouter();
  const keys = useMemo(() => Object.keys(projectsData).slice(0, 5), []);

  if (keys.length === 0) return null;

  const first = (projectsData as Record<string, ProjectData>)[keys[0]];
  const others = keys.slice(1, 5);

  return (
    <section id="projects" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        {/* Başlık */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-serif font-bold">Popüler Kategoriler</h2>
          <p className="text-lg text-gray-600 mt-2">
            Mutfaklardan giyinme odalarına, en çok talep gören çözümlerimiz.
          </p>
        </div>

        {/* Grid Yapısı */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* İlk büyük kart */}
          {first && (
            <ProjectCard
              title={first.title}
              category={first.category}
              imageUrl={first.coverImage}
              onSelect={() => router.push(`/projects/${keys[0]}`)}
              className="h-96 lg:h-full"
            />
          )}

          {/* Diğer kartlar */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {others.map((k) => {
              const p = (projectsData as Record<string, ProjectData>)[k];
              if (!p) return null;
              return (
                <ProjectCard
                  key={k}
                  title={p.title}
                  category={p.category}
                  imageUrl={p.coverImage}
                  onSelect={() => router.push(`/projects/${k}`)}
                  className="h-64 sm:h-auto sm:aspect-square"
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
