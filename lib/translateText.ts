// Simple and reliable Turkish to English translation for furniture terms
export async function translateTurkishToEnglish(text: string): Promise<string> {
  // If text is already in English or very short, return as is
  if (!text || text.length < 3) return text;
  
  // Check if text contains Turkish characters
  const turkishChars = /[çğıöşüÇĞIİÖŞÜ]/;
  const commonTurkishWords = /\b(ve|ile|için|olan|bir|bu|şu|o|yatak|odası|masa|sandalye|dolap|koltuk|mobilya|tasarım|modern|klasik|renk|siyah|beyaz|mavi|kırmızı|yeşil|sarı|turuncu|mor|pembe|gri|kahverengi|gamer|oyuncu|led|rgb|parlak|koyu|açık)\b/i;
  
  // If no Turkish indicators, return original text
  if (!turkishChars.test(text) && !commonTurkishWords.test(text)) {
    console.log('🔤 Text appears to be English, returning as is:', text);
    return text;
  }
  
  console.log('🌐 Translating Turkish text:', text);
  
  // Try Google Translate API first (more reliable)
  try {
    const response = await fetch('https://translate.googleapis.com/translate_a/single?client=gtx&sl=tr&tl=en&dt=t&q=' + encodeURIComponent(text));
    
    if (response.ok) {
      const result = await response.json();
      if (result && result[0] && result[0][0] && result[0][0][0]) {
        const translatedText = result[0][0][0];
        console.log('✅ Google Translate successful:', translatedText);
        return translatedText;
      }
    }
  } catch (error) {
    console.warn('⚠️ Google Translate failed:', error);
  }
  
  // Fallback to local translation
  console.log('🔄 Using local translation fallback');
  return translateWithFallback(text);
}

// Simple fallback translation for common furniture terms
function translateWithFallback(text: string): string {
  const quickTranslations: { [key: string]: string } = {
    // Room types - En yaygın oda tipleri
    'yatak odası': 'bedroom',
    'yatakodası': 'bedroom', 
    'oturma odası': 'living room',
    'yemek odası': 'dining room',
    'çalışma odası': 'study room',
    'çocuk odası': 'children room',
    'genç odası': 'teen room',
    'gamer odası': 'gaming room',
    'oyuncu odası': 'gaming room',
    'mutfak': 'kitchen',
    'banyo': 'bathroom',
    'salon': 'living room',
    'hol': 'hallway',
    'koridor': 'corridor',
    'balkon': 'balcony',
    'teras': 'terrace',
    'ofis': 'office',
    'atölye': 'workshop',
    
    // Colors - Renkler
    'siyah': 'black',
    'beyaz': 'white', 
    'mavi': 'blue',
    'kırmızı': 'red',
    'yeşil': 'green',
    'sarı': 'yellow',
    'turuncu': 'orange',
    'mor': 'purple',
    'pembe': 'pink',
    'gri': 'gray',
    'kahverengi': 'brown',
    'parlak': 'bright',
    'koyu': 'dark',
    'açık': 'light',
    'mat': 'matte',
    'metalik': 'metallic',
    'altın': 'gold',
    'gümüş': 'silver',
    'bronz': 'bronze',
    'bakır': 'copper',
    'bej': 'beige',
    'krem': 'cream',
    'lacivert': 'navy blue',
    'turkuaz': 'turquoise',
    'bordo': 'burgundy',
    
    // Furniture - Mobilyalar
    'koltuk': 'sofa',
    'kanepe': 'couch',
    'masa': 'table', 
    'sandalye': 'chair',
    'yatak': 'bed',
    'dolap': 'cabinet',
    'kitaplık': 'bookshelf',
    'tv ünitesi': 'TV unit',
    'tv sehpası': 'TV stand',
    'sehpa': 'coffee table',
    'gardırop': 'wardrobe',
    'komodin': 'nightstand',
    'çalışma masası': 'desk',
    'yemek masası': 'dining table',
    'berjer': 'armchair',
    'puf': 'ottoman',
    'vitrin': 'display cabinet',
    'konsol': 'console table',
    'dresuar': 'sideboard',
    'ayna': 'mirror',
    'lamba': 'lamp',
    'avize': 'chandelier',
    'halı': 'carpet',
    'kilim': 'rug',
    'perde': 'curtain',
    
    // Design Styles - Tasarım Stilleri
    'modern': 'modern',
    'çağdaş': 'contemporary',
    'klasik': 'classic',
    'minimalist': 'minimalist',
    'vintage': 'vintage',
    'retro': 'retro',
    'endüstriyel': 'industrial',
    'skandinav': 'scandinavian',
    'bohem': 'bohemian',
    'rustik': 'rustic',
    'loft': 'loft style',
    'art deco': 'art deco',
    'bauhaus': 'bauhaus',
    'zen': 'zen',
    'japon': 'japanese',
    'akdeniz': 'mediterranean',
    'tropikal': 'tropical',
    
    // Materials - Malzemeler
    'ahşap': 'wood',
    'masif ahşap': 'solid wood',
    'metal': 'metal',
    'cam': 'glass',
    'deri': 'leather',
    'kumaş': 'fabric',
    'mermer': 'marble',
    'granit': 'granite',
    'seramik': 'ceramic',
    'plastik': 'plastic',
    'akrilik': 'acrylic',
    'çelik': 'steel',
    'alüminyum': 'aluminum',
    'demir': 'iron',
    'ceviz': 'walnut',
    'meşe': 'oak',
    'çam': 'pine',
    'kayın': 'beech',
    'mdf': 'MDF',
    'laminat': 'laminate',
    'parke': 'parquet',
    
    // Gaming & Tech - Oyun ve Teknoloji
    'gamer': 'gaming',
    'oyuncu': 'gamer',
    'rgb': 'RGB',
    'led': 'LED',
    'neon': 'neon',
    'setup': 'setup',
    'bilgisayar': 'computer',
    'teknolojik': 'high-tech',
    'futuristik': 'futuristic',
    'dijital': 'digital',
    'akıllı': 'smart',
    'otomatik': 'automatic',
    'kablosuz': 'wireless',
    'bluetooth': 'Bluetooth',
    
    // Adjectives - Sıfatlar
    'büyük': 'large',
    'küçük': 'small',
    'orta': 'medium',
    'uzun': 'long',
    'kısa': 'short',
    'geniş': 'wide',
    'dar': 'narrow',
    'yüksek': 'high',
    'alçak': 'low',
    'derin': 'deep',
    'kalın': 'thick',
    'ince': 'thin',
    'yumuşak': 'soft',
    'sert': 'hard',
    'rahat': 'comfortable',
    'konforlu': 'cozy',
    'şık': 'elegant',
    'lüks': 'luxury',
    'ekonomik': 'budget-friendly',
    'premium': 'premium',
    'özel': 'custom',
    'benzersiz': 'unique',
    
    // Lighting - Aydınlatma
    'aydınlatma': 'lighting',
    'ışık': 'light',
    'spot': 'spotlight',
    'şerit led': 'LED strip',
    'doğal ışık': 'natural light',
    'sıcak ışık': 'warm light',
    'soğuk ışık': 'cool light',
    
    // Common words - Yaygın kelimeler
    've': 'and',
    'ile': 'with',
    'için': 'for',
    'olan': 'that is',
    'bir': 'a',
    'bu': 'this',
    'şu': 'that',
    'yeni': 'new',
    'eski': 'old',
    'güzel': 'beautiful',
    'hoş': 'nice',
    'harika': 'great',
    'mükemmel': 'perfect',
    'özellikle': 'especially',
    'tamamen': 'completely',
    'çok': 'very',
    'daha': 'more',
    'en': 'most',
    'gibi': 'like',
    'kadar': 'as much as',
    'tonlarında': 'tones',
    'renginde': 'colored',
    'tarzında': 'style',
    'stilinde': 'in style of'
  };
  
  let translatedText = text;
  
  // Sort by length (longest first) to handle compound terms
  const sortedKeys = Object.keys(quickTranslations).sort((a, b) => b.length - a.length);
  
  for (const turkish of sortedKeys) {
    const english = quickTranslations[turkish];
    const regex = new RegExp(`\\b${turkish.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'gi');
    translatedText = translatedText.replace(regex, english);
  }
  
  console.log('🔄 Fallback translation:', translatedText);
  return translatedText;
}