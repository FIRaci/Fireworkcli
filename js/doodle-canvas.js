/**
 * Interactive Doodle / Drawing Canvas (<130 lines)
 * Converts hand-drawn artwork into ASCII firework vector points
 */

export class DoodleCanvas {
  static customDoodleVectors = null;

  constructor(canvasElement) {
    this.canvas = canvasElement;
    this.ctx = this.canvas.getContext('2d');
    this.isDrawing = false;
    this.color = '#ededed';
    this.lineWidth = 4;

    this.initCanvas();
    this.bindEvents();
  }

  initCanvas() {
    this.ctx.fillStyle = '#0c0d11';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.lineCap = 'round';
    this.ctx.lineJoin = 'round';
  }

  clear() {
    this.initCanvas();
    DoodleCanvas.customDoodleVectors = null;
  }

  bindEvents() {
    const getPos = (e) => {
      const rect = this.canvas.getBoundingClientRect();
      const scaleX = this.canvas.width / rect.width;
      const scaleY = this.canvas.height / rect.height;
      return {
        x: (e.clientX - rect.left) * scaleX,
        y: (e.clientY - rect.top) * scaleY
      };
    };

    this.canvas.addEventListener('pointerdown', (e) => {
      this.isDrawing = true;
      const pos = getPos(e);
      this.ctx.beginPath();
      this.ctx.moveTo(pos.x, pos.y);
    });

    this.canvas.addEventListener('pointermove', (e) => {
      if (!this.isDrawing) return;
      const pos = getPos(e);
      this.ctx.strokeStyle = this.color;
      this.ctx.lineWidth = this.lineWidth;
      this.ctx.lineTo(pos.x, pos.y);
      this.ctx.stroke();
    });

    const stopDrawing = () => {
      if (this.isDrawing) {
        this.isDrawing = false;
        this.ctx.closePath();
        this.extractVectors();
      }
    };

    this.canvas.addEventListener('pointerup', stopDrawing);
    this.canvas.addEventListener('pointerleave', stopDrawing);
  }

  extractVectors(density = 3) {
    const w = this.canvas.width;
    const h = this.canvas.height;
    const imgData = this.ctx.getImageData(0, 0, w, h).data;
    const points = [];
    const centerX = w / 2;
    const centerY = h / 2;

    for (let y = 0; y < h; y += density) {
      for (let x = 0; x < w; x += density) {
        const idx = (y * w + x) * 4;
        const r = imgData[idx];
        const g = imgData[idx + 1];
        const b = imgData[idx + 2];

        // If drawn pixel (not background)
        if (r > 40 || g > 40 || b > 40) {
          const hex = `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
          points.push({
            dx: (x - centerX) * 0.28,
            dy: (y - centerY) * 0.28,
            char: '✦',
            color: hex,
            hasCustomColor: true
          });
        }
      }
    }

    DoodleCanvas.customDoodleVectors = points.length > 0 ? points : null;
    return DoodleCanvas.customDoodleVectors;
  }
}
