'use client';

import { IoSparklesSharp, IoCallSharp, IoMailSharp, IoLocationSharp } from "react-icons/io5";
import { RiStarFill } from "react-icons/ri";

type Props = { onNavigate?: (path: string) => void };

export function Footer({ onNavigate }: Props) {
  const go = (path: string) => {
    if (onNavigate) onNavigate(path);
    else window.location.href = path;
  };

  return (
    <footer className="relative bg-gradient-to-br from-[#2D2D2D] via-[#3A3A3A] to-[#2D2D2D] text-gray-300 overflow-hidden">
      
      {/* Premium Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-[#C0A062]/5 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-gradient-to-tl from-[#D4B876]/5 to-transparent rounded-full blur-3xl" />
      </div>

      {/* Subtle Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_24px,#C0A062_25px,#C0A062_26px,_transparent_27px,_transparent_74px,#C0A062_75px,_#C0A062_76px,_transparent_77px),_linear-gradient(#C0A062_1px,_transparent_1px)] bg-[length:75px_75px]" />
      </div>

      <div className="container mx-auto px-6 py-16 lg:py-20 relative z-10">
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              {/* <div className="bg-gradient-to-r from-[#C0A062] to-[#D4B876] p-3 rounded-2xl shadow-lg">
                <RiStarFill className="text-white" size={24} />
              </div> */}
              <h3 className="text-4xl md:text-6xl font-serif font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                AGY
              </h3>
            </div>
            
            <p className="text-gray-400 text-lg leading-relaxed mb-8 max-w-md">
              Hayalinizdeki mekanı tasarlamak için buradayız. 
              <span className="text-[#C0A062] font-medium"> Premium kalitede</span> mobilya 
              ve dekorasyon çözümleri sunuyoruz.
            </p>

            {/* Premium Badge */}
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#C0A062]/20 to-[#D4B876]/20 backdrop-blur-sm border border-[#C0A062]/30 text-[#C0A062] px-4 py-2 rounded-full text-sm font-semibold">
              <IoSparklesSharp size={14} />
              <span>30+ Yıl Deneyim</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xl font-serif font-bold text-white mb-6 flex items-center gap-2">
              <div className="w-1 h-6 bg-gradient-to-b from-[#C0A062] to-[#D4B876] rounded-full"></div>
              Hızlı Bağlantılar
            </h4>
            <ul className="space-y-3">
              <li>
                <button 
                  onClick={() => go('/')} 
                  className="group flex items-center gap-2 text-gray-400 hover:text-[#C0A062] transition-all duration-300 text-base"
                >
                  <div className="w-1 h-1 bg-[#C0A062] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  Ana Sayfa
                </button>
              </li>
              <li>
                <button 
                  onClick={() => go('/projects')} 
                  className="group flex items-center gap-2 text-gray-400 hover:text-[#C0A062] transition-all duration-300 text-base"
                >
                  <div className="w-1 h-1 bg-[#C0A062] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  Projeler
                </button>
              </li>
              <li>
                <button 
                  onClick={() => go('/atolye')} 
                  className="group flex items-center gap-2 text-gray-400 hover:text-[#C0A062] transition-all duration-300 text-base"
                >
                  <div className="w-1 h-1 bg-[#C0A062] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  Atolye AI
                </button>
              </li>
              <li>
                <button 
                  onClick={() => go('/contact')} 
                  className="group flex items-center gap-2 text-gray-400 hover:text-[#C0A062] transition-all duration-300 text-base"
                >
                  <div className="w-1 h-1 bg-[#C0A062] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  İletişim
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-xl font-serif font-bold text-white mb-6 flex items-center gap-2">
              <div className="w-1 h-6 bg-gradient-to-b from-[#C0A062] to-[#D4B876] rounded-full"></div>
              İletişim
            </h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="bg-[#C0A062]/20 p-2 rounded-lg border border-[#C0A062]/30 mt-1">
                  <IoCallSharp className="text-[#C0A062]" size={16} />
                </div>
                <div>
                  <p className="text-gray-400 text-sm mb-1">Yetkili</p>
                  <p className="text-white font-medium">Ahmet Güngör Yılmaz</p>
                  <p className="text-[#C0A062] font-medium">+90 532 739 16 48</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="bg-[#C0A062]/20 p-2 rounded-lg border border-[#C0A062]/30">
                  <IoMailSharp className="text-[#C0A062]" size={16} />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">E-posta</p>
                  <p className="text-white">info@agy.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="my-12 border-t border-gradient-to-r from-transparent via-[#C0A062]/20 to-transparent"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-gray-500 text-center md:text-left">
            &copy; {new Date().getFullYear()} AGY Mobilya &amp; Dekorasyon. 
            <span className="text-[#C0A062]"> Tüm Hakları Saklıdır.</span>
          </div>
          
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <span>Tasarım ile güçlendirildi</span>
            <div className="flex items-center gap-1 text-[#C0A062]">
              <IoSparklesSharp size={14} />
              <span className="font-medium">Premium UI</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}