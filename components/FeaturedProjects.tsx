"use client";

import { useMemo } from "react";
import { projectsData } from "@/lib/projectsData";
import { ProjectCard } from "./ProjectCard";
import { useRouter } from "next/navigation";
import { IoSparklesSharp, IoArrowForwardSharp } from "react-icons/io5";
import { RiStarFill } from "react-icons/ri";

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
  const others = keys.slice(1, 4); // Sadece 3 diğer kart

  return (
    <section id="projects" className="py-16 sm:py-20 md:py-24 min-h-screen bg-gradient-to-br from-[#F5F1E8] via-white to-[#F8F5F0] relative overflow-hidden">
      
      {/* Background Elements */}
      <div className="absolute top-8 left-2 w-24 h-24 sm:top-16 sm:left-4 sm:w-32 sm:h-32 md:top-32 md:left-20 md:w-64 md:h-64 bg-gradient-to-br from-[#C0A062]/10 to-transparent rounded-full blur-2xl sm:blur-3xl" />
      <div className="absolute bottom-4 right-2 w-28 h-28 sm:bottom-10 sm:right-4 sm:w-40 sm:h-40 md:bottom-20 md:right-32 md:w-80 md:h-80 bg-gradient-to-tl from-[#D4B876]/8 to-transparent rounded-full blur-2xl sm:blur-3xl" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16 md:mb-20">
          <div className="inline-flex items-center gap-1.5 sm:gap-2 bg-white/90 backdrop-blur-sm text-[#2D2D2D] px-3 py-1.5 sm:px-4 sm:py-2 md:px-6 md:py-3 rounded-full mb-4 sm:mb-6 md:mb-8 shadow-lg border border-[#C0A062]/20 animate-fade-in">
            <RiStarFill className="text-[#C0A062] flex-shrink-0" size={12} />
            <span className="font-semibold text-xs sm:text-sm tracking-wide uppercase whitespace-nowrap">Portfolio Kategorileri</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-[#2D2D2D] mb-4 sm:mb-6 leading-tight animate-slide-up">
            <span className="block">Premium</span>
            <span className="bg-gradient-to-r from-[#C0A062] to-[#D4B876] bg-clip-text text-transparent">
              Kategoriler
            </span>
          </h2>

          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-sm sm:max-w-2xl lg:max-w-3xl mx-auto leading-relaxed font-light px-2 sm:px-0 animate-fade-in-delayed">
            Zanaatkar ustalığımızın izlerini taşıyan, size özel tasarımlarla yaratılan 
            <span className="text-[#C0A062] font-medium"> premium koleksiyonlarımızı</span> keşfedin.
          </p>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 md:gap-8 lg:gap-12 items-stretch">
          
          {/* Featured Main Card */}
          {first && (
            <div className="lg:col-span-7 group animate-bounce-in">
              <div className="relative overflow-hidden rounded-xl sm:rounded-2xl md:rounded-3xl bg-white shadow-xl hover:shadow-2xl transition-all duration-700 transform hover:scale-[1.02] active:scale-[0.98] border border-[#C0A062]/10 touch-manipulation">
                <div className="relative h-56 sm:h-64 md:h-80 lg:h-96 xl:h-[500px]">
                  <ProjectCard
                    title={first.title}
                    category={first.category}
                    imageUrl={first.coverImage}
                    onSelect={() => router.push(`/projects/${keys[0]}`)}
                    className="h-full cursor-pointer rounded-xl sm:rounded-2xl md:rounded-3xl border-0 shadow-none"
                  />
                </div>
                
                <div className="absolute top-2 left-2 sm:top-3 sm:left-3 md:top-6 md:left-6 z-30 pointer-events-none">
                  <div className="bg-gradient-to-r from-[#C0A062] to-[#D4B876] text-white px-2 py-1 sm:px-3 sm:py-1.5 md:px-4 md:py-2 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg">
                    <IoSparklesSharp className="inline mr-1" size={8} />
                    Featured
                  </div>
                </div>

                <div className="absolute bottom-2 right-2 sm:bottom-3 sm:right-3 md:bottom-6 md:right-6 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0 z-30 pointer-events-none">
                  <div className="bg-white/95 backdrop-blur-sm p-1.5 sm:p-2 md:p-3 rounded-full shadow-lg border border-[#C0A062]/20">
                    <IoArrowForwardSharp className="text-[#C0A062]" size={14} />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Secondary Cards */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4 sm:gap-6 lg:gap-8">
            {others.map((k, index) => {
              const p = (projectsData as Record<string, ProjectData>)[k];
              if (!p) return null;
              
              return (
                <div key={k} className="group animate-bounce-in" style={{ animationDelay: `${(index + 1) * 0.1}s` }}>
                  <div className="relative overflow-hidden rounded-xl sm:rounded-2xl bg-white shadow-lg hover:shadow-xl transition-all duration-500 transform hover:scale-105 active:scale-[0.98] border border-[#C0A062]/10 touch-manipulation">
                    <div className="relative h-40 sm:h-48 lg:h-40">
                      <ProjectCard
                        title={p.title}
                        category={p.category}
                        imageUrl={p.coverImage}
                        onSelect={() => router.push(`/projects/${k}`)}
                        className="h-full cursor-pointer rounded-xl sm:rounded-2xl border-0 shadow-none"
                      />
                    </div>
                    
                    <div className="absolute top-2 right-2 sm:top-4 sm:right-4 z-30 pointer-events-none">
                      <div className="bg-white/95 backdrop-blur-sm text-[#2D2D2D] w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold shadow-lg border border-[#C0A062]/20">
                        {index + 1}
                      </div>
                    </div>

                    <div className="absolute inset-0 bg-gradient-to-t from-[#C0A062]/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl sm:rounded-2xl pointer-events-none" />
                  </div>
                </div>
              );
            })}

            {/* View All Card */}
            <div 
              className="group cursor-pointer touch-manipulation animate-bounce-in" 
              style={{ animationDelay: `${(others.length + 1) * 0.1}s` }}
              onClick={() => router.push('/projects')}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  router.push('/projects');
                }
              }}
            >
              <div className="relative overflow-hidden rounded-xl sm:rounded-2xl bg-gradient-to-br from-[#C0A062] to-[#D4B876] shadow-lg hover:shadow-xl transition-all duration-500 transform hover:scale-105 active:scale-[0.98] h-40 sm:h-48 lg:h-40 flex items-center justify-center">
                
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_white_1px,_transparent_1px)] bg-[length:15px_15px] sm:bg-[length:20px_20px]" />
                </div>

                <div className="text-center text-white relative z-10 px-4">
                  <IoArrowForwardSharp className="mx-auto mb-2 sm:mb-3 group-hover:scale-125 transition-transform duration-300" size={24} />
                  <h3 className="font-bold text-base sm:text-lg mb-1">Tümünü Gör</h3>
                  <p className="text-white/80 text-xs sm:text-sm">Daha fazla kategori</p>
                </div>

                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl sm:rounded-2xl" />
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
