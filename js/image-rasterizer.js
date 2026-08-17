/**
 * PNG / Image to Fireworks ASCII Rasterizer (<120 lines)
 * Converts any uploaded PNG/JPG into ASCII particle coordinate vectors with original colors
 */

export class ImageRasterizer {
  static customImageVectors = null;
  static customImagePreviewUrl = null;

  static processImageFile(file, callback) {
    if (!file || !file.type.startsWith('image/')) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const vectors = this.rasterizeImage(img);
        this.customImageVectors = vectors;
        this.customImagePreviewUrl = e.target.result;
        if (callback) callback(vectors, this.customImagePreviewUrl);
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  }

  static rasterizeImage(img, maxDim = 42, density = 2) {
    const offscreen = document.createElement('canvas');
    const ctx = offscreen.getContext('2d');

    let w = img.width;
    let h = img.height;
    if (w > maxDim || h > maxDim) {
      if (w > h) {
        h = Math.round((h * maxDim) / w);
        w = maxDim;
      } else {
        w = Math.round((w * maxDim) / h);
        h = maxDim;
      }
    }

    offscreen.width = w;
    offscreen.height = h;
    ctx.drawImage(img, 0, 0, w, h);

    const imgData = ctx.getImageData(0, 0, w, h).data;
    const points = [];
    const centerX = w / 2;
    const centerY = h / 2;

    const asciiRamp = '@%#*+=-:. ';

    for (let y = 0; y < h; y += density) {
      for (let x = 0; x < w; x += density) {
        const idx = (y * w + x) * 4;
        const r = imgData[idx];
        const g = imgData[idx + 1];
        const b = imgData[idx + 2];
        const a = imgData[idx + 3];

        if (a > 30) {
          const brightness = (r * 0.299 + g * 0.587 + b * 0.114) / 255;
          const charIdx = Math.floor((1 - brightness) * (asciiRamp.length - 1));
          const hex = `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;

          points.push({
            dx: (x - centerX) * 1.1,
            dy: (y - centerY) * 1.1,
            char: asciiRamp[charIdx] || '*',
            color: hex,
            hasCustomColor: true
          });
        }
      }
    }

    return points;
  }
}
