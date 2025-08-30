// lib/fileToBase64.ts
export const fileToBase64 = (
  file: File
): Promise<{ mimeType: string; dataUrl: string }> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string; // örn: "data:image/png;base64,AAAA..."
      const mimeType = result.split(";")[0].split(":")[1];
      resolve({ mimeType, dataUrl: result }); // 🔑 tam dataUrl dönüyoruz
    };
    reader.onerror = (err) => reject(err);
    reader.readAsDataURL(file);
  });
