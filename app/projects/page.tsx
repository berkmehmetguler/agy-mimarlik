"use client";

import { useMemo } from "react";
import { projectsData } from "@/lib/projectsData";
import { ProjectCard } from "@/components/ProjectCard";
import { useRouter } from "next/navigation";
import { IoSparklesSharp, IoArrowForwardSharp } from "react-icons/io5";
import { RiStarFill, RiGridFill } from "react-icons/ri";

interface ProjectData {
  title: string;
  category: string;
  coverImage: string;
  sections?: Array<{
    id: string;
    title: string;
    images: Array<{
      src: string;
      alt: string;
      ref?: string;
    }>;
  }>;
}

export default function ProjectsPage() {
  const router = useRouter();
  const allProjects = useMemo(() => Object.entries(projectsData as Record<string, ProjectData>), []);

  const totalImages = useMemo(() => {
    return allProjects.reduce((total, [_, project]) => {
      if (project.sections) {
        return total + project.sections.reduce((sectionTotal, section) => sectionTotal + (section.images?.length || 0), 0);
      }
      return total;
    }, 0);
  }, [allProjects]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5F1E8] via-white to-[#F8F5F0] relative overflow-hidden">

      {/* Background Elements */}
      <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-br from-[#C0A062]/8 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-tl from-[#D4B876]/6 to-transparent rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-[#C0A062]/5 to-[#D4B876]/5 rounded-full blur-3xl" />

      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_24px,#C0A062_25px,#C0A062_26px,_transparent_27px,_transparent_74px,#C0A062_75px,_#C0A062_76px,_transparent_77px),_linear-gradient(#C0A062_1px,_transparent_1px)] bg-[length:75px_75px]" />
      </div>

      <div className="container mx-auto px-6 lg:px-12 pt-32 pb-24 relative z-10">

        {/* Page Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm text-[#2D2D2D] px-6 py-3 rounded-full mb-8 shadow-lg border border-[#C0A062]/20">
            <RiGridFill className="text-[#C0A062]" size={16} />
            <span className="font-semibold text-sm tracking-wide uppercase">Tüm Kategoriler</span>
            <IoSparklesSharp className="text-[#D4B876]" size={14} />
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-serif font-bold text-[#2D2D2D] mb-6 leading-tight">
            <span className="block">Proje</span>
            <span className="bg-gradient-to-r from-[#C0A062] to-[#D4B876] bg-clip-text text-transparent">
              Portföyümüz
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed font-light mb-12">
            Zanaatkar ustalığımızın ve yaratıcılığımızın izlerini taşıyan, 
            <span className="text-[#C0A062] font-medium"> size özel tasarımlarla yaratılan</span> tüm 
            kategorilerimizi keşfedin ve ilham alın.
          </p>

          <div className="flex flex-wrap justify-center items-center gap-8 mb-16">
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-[#C0A062] mb-1">{allProjects.length}</div>
              <div className="text-sm text-gray-600 uppercase tracking-wide">Kategori</div>
            </div>
            <div className="w-px h-12 bg-gray-300 hidden sm:block" />
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-[#C0A062] mb-1">{totalImages}+</div>
              <div className="text-sm text-gray-600 uppercase tracking-wide">Tasarım</div>
            </div>
            <div className="w-px h-12 bg-gray-300 hidden sm:block" />
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-[#C0A062] mb-1">15+</div>
              <div className="text-sm text-gray-600 uppercase tracking-wide">Yıl Deneyim</div>
            </div>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
          {allProjects.map(([key, project], index) => (
            <div key={key} className="group">
              <div className="relative overflow-hidden rounded-2xl bg-white shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 border border-[#C0A062]/10">
                
                <div className="absolute top-4 left-4 z-20 flex flex-col gap-2 pointer-events-none">
                  <div className="bg-gradient-to-r from-[#C0A062] to-[#D4B876] text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shadow-lg">
                    {index + 1}
                  </div>
                  {project.sections && (
                    <div className="bg-white/90 backdrop-blur-sm text-[#2D2D2D] px-2 py-1 rounded-full text-xs font-semibold shadow-lg border border-[#C0A062]/20">
                      {project.sections.length > 1 
                        ? `${project.sections.length} Bölüm` 
                        : `${project.sections.reduce((total, section) => total + (section.images?.length || 0), 0)} Resim`
                      }
                    </div>
                  )}
                </div>

                <div className="relative h-64 sm:h-72 lg:h-80">
                  <ProjectCard
                    title={project.title}
                    category={project.category}
                    imageUrl={project.coverImage}
                    onSelect={() => router.push(`/projects/${key}`)}
                    className="h-full cursor-pointer rounded-2xl border-0 shadow-none"
                  />
                </div>

                <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-4 group-hover:translate-x-0 z-20 pointer-events-none">
                  <div className="bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg border border-[#C0A062]/20">
                    <IoArrowForwardSharp className="text-[#C0A062]" size={16} />
                  </div>
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-[#C0A062]/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl pointer-events-none" />
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-20">
          <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 lg:p-12 shadow-2xl border border-[#C0A062]/10 max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#C0A062] to-[#D4B876] text-white px-6 py-3 rounded-full mb-6 shadow-lg">
              <RiStarFill size={16} />
              <span className="font-semibold text-sm tracking-wide uppercase">Premium Hizmet</span>
              <IoSparklesSharp size={14} />
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-[#2D2D2D] mb-4">
              Size Özel Tasarım Hazır
            </h2>
            
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Gördüğünüz tasarımlardan ilham alın ve kendi projenizi 
              <span className="text-[#C0A062] font-medium"> yapay zeka destekli atölyemizde</span> oluşturun.
            </p>

            <button
              onClick={() => router.push('/atolye')}
              className="group relative bg-gradient-to-r from-[#C0A062] to-[#D4B876] text-white font-bold py-4 px-8 rounded-2xl text-lg hover:from-[#D4B876] hover:to-[#C0A062] transition-all duration-500 transform hover:scale-105 shadow-2xl hover:shadow-[#C0A062]/25 inline-flex items-center gap-3"
            >
              <div className="absolute inset-0 bg-white/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative flex items-center gap-3">
                <IoSparklesSharp className="group-hover:rotate-12 transition-transform duration-300" size={20} />
                Atolye AI&apos;ye Git
                <IoArrowForwardSharp className="group-hover:translate-x-1 transition-transform duration-300" size={20} />
              </span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
