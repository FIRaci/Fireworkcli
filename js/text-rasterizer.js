/**
 * Text & Geometric Shape Rasterizer
 * Converts words, phrases, and mathematical shapes into particle coordinate arrays
 */

import { ShapeCatalog } from './shape-catalog.js';

export class ShapeRasterizer {
  static rasterizeText(text, fontSize = 28, density = 4) {
    const offscreen = document.createElement('canvas');
    const ctx = offscreen.getContext('2d');
    
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
          points.push({
            dx: (x - centerX) * 0.8,
            dy: (y - centerY) * 0.8,
            char: text[Math.floor(Math.random() * text.length)] || '*'
          });
        }
      }
    }
    
    return points.length > 0 ? points : ShapeCatalog.generateSphere(60);
  }

  /**
   * Splits a phrase by spaces into separate rockets distributed across X axis
   */
  static splitPhraseToRockets(phrase, defaultAltitude = 0.75) {
    const words = phrase.trim().split(/\s+/).filter(w => w.length > 0);
    if (words.length <= 1) {
      return [{ word: phrase, xFraction: 0.5, altitude: defaultAltitude }];
    }

    const rockets = [];
    const step = 0.7 / Math.max(1, words.length - 1);
    const startX = 0.15;

    words.forEach((word, i) => {
      rockets.push({
        word: word,
        xFraction: startX + (i * step),
        altitude: defaultAltitude + (Math.sin((i / (words.length - 1)) * Math.PI) * 0.08)
      });
    });

    return rockets;
  }

  static getShapeVectors(shapeType, customText = '', count = 75, speed = 4) {
    switch (shapeType) {
      case 'text':
        return this.rasterizeText(customText || 'I love you ♡');
      case 'heart':
        return ShapeCatalog.generateHeart(count);
      case 'star':
      case 'star5':
        return ShapeCatalog.generateStar5(count, speed);
      case 'star8':
        return ShapeCatalog.generateStar8(count, speed);
      case 'willow':
        return ShapeCatalog.generateWillow(count, speed);
      case 'spiral':
        return ShapeCatalog.generateSpiral(count);
      case 'saturn':
        return ShapeCatalog.generateSaturn(count, speed);
      case 'double_ring':
        return ShapeCatalog.generateDoubleRing(count, speed);
      case 'butterfly':
        return ShapeCatalog.generateButterfly(count);
      case 'diamond':
        return ShapeCatalog.generateDiamond(count, speed);
      case 'clover':
        return ShapeCatalog.generateClover(count, speed);
      case 'infinity':
        return ShapeCatalog.generateInfinity(count, speed);
      case 'crown':
        return ShapeCatalog.generateCrown(count, speed);
      case 'smiley':
        return ShapeCatalog.generateSmiley(count, speed);
      case 'chrysanthemum':
        return ShapeCatalog.generateChrysanthemum(count, speed);
      case 'sphere':
      default:
        return ShapeCatalog.generateSphere(count, speed);
    }
  }
}
