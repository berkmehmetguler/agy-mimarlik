import { mimariDogramaPart1 } from './mimariDogramaPart1';
import { mimariDogramaPart2 } from './mimariDogramaPart2';

export const mimariDogramaData = {
  title: "Mimari Çözümler",
  category: "Profesyonel & Teknik Çözümler",
  coverImage: "https://ik.imagekit.io/Aifct1/mutfak/tv%20%C3%BCnitesi/mimari/21.png?updatedAt=1755892823796",
  galleryDescription: "Projelerinize kimlik katan mimari detaylar üretiyoruz. Giyotin pencere sistemleri, kış bahçeleri, özel tasarım ahşap cephe giydirmeleri ve daha fazlası için buradayız.",
  sections: [
    ...mimariDogramaPart1.sections,
    ...mimariDogramaPart2.sections,
  ]
};
