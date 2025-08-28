export const generateWatermarkPattern = (text = 'AGYMİMARLIK') => {
  // Server-side rendering kontrolü
  if (typeof document === 'undefined') return '';
  
  const patternCanvas = document.createElement('canvas');
  const patternCtx = patternCanvas.getContext('2d');
  if (!patternCtx) return '';
  
  const patternSize = 400;
  const fontSize = 20;
  patternCanvas.width = patternSize;
  patternCanvas.height = patternSize;
  
  patternCtx.font = `${fontSize}px 'Playfair Display', serif`;
  patternCtx.fillStyle = 'rgba(0,0,0,0.06)';
  patternCtx.translate(patternSize/2, patternSize/2);
  patternCtx.rotate(-Math.PI/6);
  
  const textWidth = patternCtx.measureText(text).width;
  
  for (let y = -patternSize; y < patternSize; y += 120) {
    for (let x = -patternSize; x < patternSize; x += (textWidth + 100)) {
      patternCtx.fillText(text, x, y);
    }
  }
  
  return patternCanvas.toDataURL();
};

export const addWatermark = async (imageUrl: string): Promise<string> => {
  // Server-side rendering kontrolü
  if (typeof document === 'undefined') return imageUrl;
  
  return new Promise<string>((resolve) => {
    const img = new Image();
    if (!imageUrl.startsWith('data:')) {
      img.crossOrigin = 'Anonymous';
    }
    
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) return resolve(imageUrl);
      
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      
      const patternUrl = generateWatermarkPattern();
      const patternImg = new Image();
      patternImg.src = patternUrl;
      
      patternImg.onload = () => {
        const pattern = ctx.createPattern(patternImg, 'repeat');
        if (pattern) {
          ctx.fillStyle = pattern;
          ctx.fillRect(0, 0, canvas.width, canvas.height);
        }
        resolve(canvas.toDataURL('image/jpeg'));
      };
      
      patternImg.onerror = () => resolve(imageUrl);
    };
    
    img.onerror = () => resolve(imageUrl);
    img.src = imageUrl;
  });
};
