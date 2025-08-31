// lib/fileToBase64.ts
export const fileToBase64 = (
  file: File
): Promise<{ mimeType: string; data: string }> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      // "data:image/png;base64,XXXX" → sadece "XXXX" kısmını al
      const base64 = result.split(",")[1];
      resolve({
        mimeType: file.type,
        data: base64,
      });
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
