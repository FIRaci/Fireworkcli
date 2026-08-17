/**
 * Text & Geometric Shape Rasterizer
 * Converts words ("I love you ♡", "2026") and math shapes into 2D particle coordinates
 */

export class ShapeRasterizer {
  /**
   * Rasterize text into a 2D particle offset array
   */
  static rasterizeText(text, fontSize = 28, density = 4) {
    const offscreen = document.createElement('canvas');
    const ctx = offscreen.getContext('2d');
    
    // Measure text
    ctx.font = `bold ${fontSize}px "JetBrains Mono", monospace`;
    const metrics = ctx.measureText(text);
    const textWidth = Math.ceil(metrics.width) + 20;
    const textHeight = Math.ceil(fontSize * 1.5);
    
    offscreen.width = textWidth;
    offscreen.height = textHeight;
    
    ctx.fillStyle = '#ffffff';
    ctx.font = `bold ${fontSize}px "JetBrains Mono", monospace`;
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'center';
    ctx.fillText(text, textWidth / 2, textHeight / 2);
    
    const imgData = ctx.getImageData(0, 0, textWidth, textHeight).data;
    const points = [];
    const centerX = textWidth / 2;
    const centerY = textHeight / 2;
    
    for (let y = 0; y < textHeight; y += density) {
      for (let x = 0; x < textWidth; x += density) {
        const index = (y * textWidth + x) * 4;
        const alpha = imgData[index + 3];
        if (alpha > 128) {
          // Calculate normalized offsets from center
          points.push({
            dx: (x - centerX) * 0.8,
            dy: (y - centerY) * 0.8,
            char: text[Math.floor(Math.random() * text.length)] || '*'
          });
        }
      }
    }
    
    return points.length > 0 ? points : this.generateSphere(60);
  }

  /**
   * Generate Sphere Burst (Standard Firework)
   */
  static generateSphere(count = 70, speed = 4) {
    const points = [];
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const velocity = (0.2 + Math.random() * 0.8) * speed;
      points.push({
        dx: Math.cos(angle) * velocity,
        dy: Math.sin(angle) * velocity
      });
    }
    return points;
  }

  /**
   * Generate Heart Shape (♡ / ♥)
   */
  static generateHeart(count = 80, scale = 0.25) {
    const points = [];
    for (let i = 0; i < count; i++) {
      const t = (i / count) * Math.PI * 2;
      // Mathematical Heart Curve: x = 16 sin^3(t), y = -(13 cos(t) - 5 cos(2t) - 2 cos(3t) - cos(4t))
      const x = 16 * Math.pow(Math.sin(t), 3);
      const y = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
      
      const speed = (0.8 + Math.random() * 0.4);
      points.push({
        dx: x * scale * speed,
        dy: y * scale * speed
      });
    }
    return points;
  }

  /**
   * Generate 5-Pointed Star Shape (★)
   */
  static generateStar(count = 75, scale = 4.0) {
    const points = [];
    const arms = 5;
    for (let i = 0; i < count; i++) {
      const armIdx = i % arms;
      const angle = (armIdx * 2 * Math.PI / arms) - (Math.PI / 2);
      const dist = (0.3 + Math.random() * 0.7) * scale;
      points.push({
        dx: Math.cos(angle) * dist + (Math.random() - 0.5) * 0.5,
        dy: Math.sin(angle) * dist + (Math.random() - 0.5) * 0.5
      });
    }
    return points;
  }

  /**
   * Generate Golden Willow / Weeping Waterfall Cascade
   */
  static generateWillow(count = 90, speed = 3.5) {
    const points = [];
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const velocity = (0.3 + Math.random() * 0.7) * speed;
      points.push({
        dx: Math.cos(angle) * velocity,
        dy: (Math.sin(angle) * velocity) - 1.0, // slight initial upward boost before cascading
        isWillow: true
      });
    }
    return points;
  }

  /**
   * Generate Spiral / Galaxy Vortex
   */
  static generateSpiral(count = 80, scale = 0.08) {
    const points = [];
    for (let i = 0; i < count; i++) {
      const theta = i * 0.25;
      const r = theta * scale * (2 + Math.random() * 0.5);
      points.push({
        dx: r * Math.cos(theta),
        dy: r * Math.sin(theta)
      });
    }
    return points;
  }

  /**
   * Main router for shape generation
   */
  static getShapeVectors(shapeType, customText = '', count = 75, speed = 4) {
    switch (shapeType) {
      case 'text':
        return this.rasterizeText(customText || 'I love you ♡');
      case 'heart':
        return this.generateHeart(count);
      case 'star':
        return this.generateStar(count, speed);
      case 'willow':
        return this.generateWillow(count, speed);
      case 'spiral':
        return this.generateSpiral(count);
      case 'sphere':
      default:
        return this.generateSphere(count, speed);
    }
  }
}
