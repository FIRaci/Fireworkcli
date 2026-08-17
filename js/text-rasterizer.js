/**
 * Text & Geometric Shape Master Rasterizer (<170 lines)
 */

import { ShapeCatalog } from './shape-catalog.js';
import { ImageRasterizer } from './image-rasterizer.js';
import { DoodleCanvas } from './doodle-canvas.js';

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
        if (imgData[index + 3] > 128) {
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

  static getShapeVectors(shapeType, customText = '', count = 80, speed = 4) {
    switch (shapeType) {
      case 'custom_image':
        return ImageRasterizer.customImageVectors || ShapeCatalog.generateHeart(count);
      case 'custom_doodle':
        return DoodleCanvas.customDoodleVectors || ShapeCatalog.generateStar5(count, speed);
      case 'text':
        return this.rasterizeText(customText || 'I LOVE YOU ♡');
      case 'heart': return ShapeCatalog.generateHeart(count);
      case 'star':
      case 'star5': return ShapeCatalog.generateStar5(count, speed);
      case 'star6': return ShapeCatalog.generateStar6(count, speed);
      case 'star8': return ShapeCatalog.generateStar8(count, speed);
      case 'star12': return ShapeCatalog.generateStar12(count, speed);
      case 'square': return ShapeCatalog.generateSquare(count, speed);
      case 'circle': return ShapeCatalog.generateCircle(count, speed);
      case 'triangle': return ShapeCatalog.generateTriangle(count, speed);
      case 'hexagon': return ShapeCatalog.generateHexagon(count, speed);
      case 'octagon': return ShapeCatalog.generateOctagon(count, speed);
      case 'rose': return ShapeCatalog.generateRose(count, speed);
      case 'lotus': return ShapeCatalog.generateLotus(count, speed);
      case 'sunflower': return ShapeCatalog.generateSunflower(count, speed);
      case 'sakura': return ShapeCatalog.generateSakura(count, speed);
      case 'tulip': return ShapeCatalog.generateTulip(count, speed);
      case 'dandelion': return ShapeCatalog.generateDandelion(count, speed);
      case 'moon': return ShapeCatalog.generateMoon(count, speed);
      case 'sun': return ShapeCatalog.generateSun(count, speed);
      case 'music_note': return ShapeCatalog.generateMusicNote(count, speed);
      case 'snowflake': return ShapeCatalog.generateSnowflake(count, speed);
      case 'tree': return ShapeCatalog.generateTree(count, speed);
      case 'willow': return ShapeCatalog.generateWillow(count, speed);
      case 'spiral': return ShapeCatalog.generateSpiral(count);
      case 'saturn': return ShapeCatalog.generateSaturn(count, speed);
      case 'double_ring': return ShapeCatalog.generateDoubleRing(count, speed);
      case 'butterfly': return ShapeCatalog.generateButterfly(count);
      case 'diamond': return ShapeCatalog.generateDiamond(count, speed);
      case 'clover': return ShapeCatalog.generateClover(count, speed);
      case 'infinity': return ShapeCatalog.generateInfinity(count, speed);
      case 'crown': return ShapeCatalog.generateCrown(count, speed);
      case 'smiley': return ShapeCatalog.generateSmiley(count, speed);
      case 'chrysanthemum': return ShapeCatalog.generateChrysanthemum(count, speed);
      case 'sphere':
      default:
        return ShapeCatalog.generateSphere(count, speed);
    }
  }
}
