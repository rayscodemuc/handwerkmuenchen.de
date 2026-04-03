/** Max. 1920px längste Seite, JPEG 0.82 – gleiche Logik wie im Admin-Dashboard. */
export function compressImageForUpload(file: File): Promise<Blob> {
  return new Promise((resolve) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      URL.revokeObjectURL(url);
      const MAX_SIZE = 1920;
      let { width, height } = img;
      if (width > MAX_SIZE || height > MAX_SIZE) {
        if (width >= height) {
          height = Math.round((height * MAX_SIZE) / width);
          width = MAX_SIZE;
        } else {
          width = Math.round((width * MAX_SIZE) / height);
          height = MAX_SIZE;
        }
      }
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        resolve(file as unknown as Blob);
        return;
      }
      ctx.drawImage(img, 0, 0, width, height);
      canvas.toBlob(
        (blob) => (blob ? resolve(blob) : resolve(file as unknown as Blob)),
        "image/jpeg",
        0.82
      );
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      resolve(file as unknown as Blob);
    };
    img.src = url;
  });
}
