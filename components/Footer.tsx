'use client';

type Props = { onNavigate?: (path: string) => void };

export function Footer({ onNavigate }: Props) {
  const go = (path: string) => {
    if (onNavigate) onNavigate(path);
    else window.location.href = path; // Header'da router.push kullanıyoruz; burada opsiyonel.
  };

  return (
    <footer id="contact" className="bg-[#2D2D2D] text-gray-300">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          <div>
            <h3 className="text-3xl font-serif font-bold text-white mb-4">AGY</h3>
            <p className="max-w-xs mx-auto md:mx-0">
              Hayalinizdeki mekanı tasarlamak için buradayız. Bize ulaşın.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Hızlı Bağlantılar</h4>
            <ul>
              <li className="mb-2"><button onClick={() => go('/')} className="hover:text-[#C0A062]">Ana Sayfa</button></li>
              <li className="mb-2"><button onClick={() => go('/projects')} className="hover:text-[#C0A062]">Projeler</button></li>
              <li className="mb-2"><button onClick={() => go('/atolye')} className="hover:text-[#C0A062]">Atolye AI</button></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">İletişim</h4>
            <p className="mb-2">Yetkili: Ahmet Güngör Yılmaz</p>
            <p>+90 532 739 16 48</p>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-700 pt-8 text-center text-gray-500">
          &copy; {new Date().getFullYear()} AGY Mobilya &amp; Dekorasyon. Tüm Hakları Saklıdır.
        </div>
      </div>
    </footer>
  );
}
