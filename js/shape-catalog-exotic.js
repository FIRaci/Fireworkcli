/**
 * Exotic & Complex Parametric Shape Vectors
 */

export class ShapeCatalogExotic {
  static generateSaturn(count = 80, speed = 3.8) {
    const points = [];
    const sphereCount = Math.floor(count * 0.45);
    const ringCount = count - sphereCount;
    for (let i = 0; i < sphereCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const r = Math.random() * (speed * 0.45);
      points.push({ dx: Math.cos(angle) * r, dy: Math.sin(angle) * r });
    }
    for (let i = 0; i < ringCount; i++) {
      const theta = (i / ringCount) * Math.PI * 2;
      const a = speed * 1.35;
      const b = speed * 0.38;
      const tilt = -0.35;
      const rx = a * Math.cos(theta);
      const ry = b * Math.sin(theta);
      points.push({
        dx: rx * Math.cos(tilt) - ry * Math.sin(tilt),
        dy: rx * Math.sin(tilt) + ry * Math.cos(tilt)
      });
    }
    return points;
  }

  static generateButterfly(count = 85, scale = 0.8) {
    const points = [];
    for (let i = 0; i < count; i++) {
      const t = (i / count) * 4 * Math.PI;
      const r = Math.exp(Math.cos(t)) - 2 * Math.cos(4 * t) + Math.pow(Math.sin(t / 12), 5);
      points.push({ dx: r * Math.sin(t) * scale, dy: -r * Math.cos(t) * scale });
    }
    return points;
  }

  static generateClover(count = 80, scale = 3.6) {
    const points = [];
    for (let i = 0; i < count; i++) {
      const theta = (i / count) * Math.PI * 2;
      const r = Math.abs(Math.cos(2 * theta)) * scale * (0.85 + Math.random() * 0.3);
      points.push({ dx: r * Math.cos(theta), dy: r * Math.sin(theta) });
    }
    return points;
  }

  static generateInfinity(count = 75, scale = 3.8) {
    const points = [];
    for (let i = 0; i < count; i++) {
      const t = (i / count) * Math.PI * 2;
      const x = Math.cos(t) * scale;
      const y = (Math.sin(2 * t) / 2) * scale * 1.5;
      points.push({ dx: x, dy: y });
    }
    return points;
  }

  static generateCrown(count = 75, scale = 3.5) {
    const points = [];
    for (let i = 0; i < count; i++) {
      const x = ((i / count) - 0.5) * 2 * scale;
      const y = -Math.abs(Math.sin(x * 1.6)) * scale * 0.8 + 0.3 * scale;
      points.push({ dx: x, dy: y });
    }
    return points;
  }

  static generateSmiley(count = 75, speed = 3.5) {
    const points = [];
    const ringCount = Math.floor(count * 0.6);
    for (let i = 0; i < ringCount; i++) {
      const angle = (i / ringCount) * Math.PI * 2;
      points.push({ dx: Math.cos(angle) * speed, dy: Math.sin(angle) * speed });
    }
    points.push({ dx: -speed * 0.35, dy: -speed * 0.35 });
    points.push({ dx: speed * 0.35, dy: -speed * 0.35 });
    const smileCount = count - ringCount - 2;
    for (let i = 0; i < smileCount; i++) {
      const t = Math.PI * 0.2 + (i / smileCount) * Math.PI * 0.6;
      points.push({ dx: Math.cos(t) * speed * 0.55, dy: Math.sin(t) * speed * 0.55 });
    }
    return points;
  }

  static generateChrysanthemum(count = 95, speed = 4.2) {
    const points = [];
    for (let i = 0; i < count; i++) {
      const layer = Math.floor(i / 15);
      const angle = (i * 2.4);
      const velocity = (0.25 + layer * 0.15) * speed;
      points.push({ dx: Math.cos(angle) * velocity, dy: Math.sin(angle) * velocity, isWillow: true });
    }
    return points;
  }
}
