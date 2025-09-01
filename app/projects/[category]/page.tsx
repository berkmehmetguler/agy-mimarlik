import { projectsData } from "@/lib/projectsData";
import { ProjectGallery } from "@/components/ProjectGallery";
import { notFound } from "next/navigation";

interface Category {
  title: string;
  category: string;
  coverImage: string;
  galleryDescription: string;
  sections: Array<{
    id: string;
    title: string;
    images: Array<{
      src: string;
      alt: string;
      ref?: string;
    }>;
  }>;
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const categoryData = (projectsData as Record<string, Category>)[category];
  if (!categoryData) return notFound();
  return <ProjectGallery category={categoryData} />;
}