/**
 * Flower Botanics Parametric Generators (<160 lines)
 * Rose, Lotus, Sunflower, Sakura, Tulip, Dandelion, Chrysanthemum
 */

export class ShapeCatalogFlowers {
  static generateRose(count = 85, scale = 3.6) {
    const points = [];
    for (let i = 0; i < count; i++) {
      const theta = (i / count) * Math.PI * 4;
      // Maurer Rose curve: r = sin(4 * theta)
      const r = Math.sin(4 * theta) * scale;
      points.push({ dx: r * Math.cos(theta), dy: r * Math.sin(theta) });
    }
    return points;
  }

  static generateLotus(count = 85, scale = 3.8) {
    const points = [];
    const petals = 8;
    for (let i = 0; i < count; i++) {
      const theta = (i / count) * Math.PI * 2;
      const r = Math.abs(Math.sin(petals * theta * 0.5)) * scale + 0.5;
      const yOffset = -Math.cos(theta) * 0.4;
      points.push({ dx: r * Math.cos(theta), dy: (r * Math.sin(theta)) * 0.75 + yOffset });
    }
    return points;
  }

  static generateSunflower(count = 90, scale = 3.8) {
    const points = [];
    const coreCount = Math.floor(count * 0.35);
    const rayCount = count - coreCount;
    // Core seed center
    for (let i = 0; i < coreCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const r = Math.random() * scale * 0.4;
      points.push({ dx: Math.cos(angle) * r, dy: Math.sin(angle) * r });
    }
    // Radiating petals
    const petals = 16;
    for (let i = 0; i < rayCount; i++) {
      const t = (i / rayCount) * Math.PI * 2;
      const r = (scale * 0.45) + Math.abs(Math.sin(petals * t * 0.5)) * (scale * 0.6);
      points.push({ dx: r * Math.cos(t), dy: r * Math.sin(t) });
    }
    return points;
  }

  static generateSakura(count = 80, scale = 3.6) {
    const points = [];
    const petals = 5;
    for (let i = 0; i < count; i++) {
      const theta = (i / count) * Math.PI * 2;
      // 5-petaled cherry blossom with notch
      const r = Math.abs(Math.cos(petals * theta * 0.5)) * scale * (1 - 0.2 * Math.abs(Math.sin(petals * theta)));
      points.push({ dx: r * Math.cos(theta), dy: r * Math.sin(theta) });
    }
    return points;
  }

  static generateTulip(count = 75, scale = 3.5) {
    const points = [];
    for (let i = 0; i < count; i++) {
      const t = (i / count) * Math.PI * 2;
      const x = Math.sin(t) * scale * 0.8;
      const y = (-Math.cos(t) * scale) + (Math.abs(Math.sin(3 * t)) * scale * 0.3);
      points.push({ dx: x, dy: y });
    }
    return points;
  }

  static generateDandelion(count = 90, scale = 4.0) {
    const points = [];
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const dist = (0.4 + Math.random() * 0.6) * scale;
      points.push({
        dx: Math.cos(angle) * dist,
        dy: Math.sin(angle) * dist - 0.5,
        isWillow: true
      });
    }
    return points;
  }
}
