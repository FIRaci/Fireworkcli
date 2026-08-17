/**
 * Basic Parametric Shape Vectors
 */

export class ShapeCatalogBasic {
  static generateSphere(count = 70, speed = 4) {
    const points = [];
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const velocity = (0.2 + Math.random() * 0.8) * speed;
      points.push({ dx: Math.cos(angle) * velocity, dy: Math.sin(angle) * velocity });
    }
    return points;
  }

  static generateHeart(count = 80, scale = 0.26) {
    const points = [];
    for (let i = 0; i < count; i++) {
      const t = (i / count) * Math.PI * 2;
      const x = 16 * Math.pow(Math.sin(t), 3);
      const y = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
      const speed = (0.8 + Math.random() * 0.4);
      points.push({ dx: x * scale * speed, dy: y * scale * speed });
    }
    return points;
  }

  static generateStar5(count = 75, scale = 4.0) {
    const points = [];
    const arms = 5;
    for (let i = 0; i < count; i++) {
      const armIdx = i % arms;
      const angle = (armIdx * 2 * Math.PI / arms) - (Math.PI / 2);
      const dist = (0.3 + Math.random() * 0.7) * scale;
      points.push({
        dx: Math.cos(angle) * dist + (Math.random() - 0.5) * 0.4,
        dy: Math.sin(angle) * dist + (Math.random() - 0.5) * 0.4
      });
    }
    return points;
  }

  static generateStar8(count = 85, scale = 4.2) {
    const points = [];
    const arms = 8;
    for (let i = 0; i < count; i++) {
      const armIdx = i % arms;
      const angle = (armIdx * 2 * Math.PI / arms);
      const dist = (0.3 + Math.random() * 0.7) * scale;
      points.push({
        dx: Math.cos(angle) * dist + (Math.random() - 0.5) * 0.3,
        dy: Math.sin(angle) * dist + (Math.random() - 0.5) * 0.3
      });
    }
    return points;
  }

  static generateWillow(count = 90, speed = 3.5) {
    const points = [];
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const velocity = (0.3 + Math.random() * 0.7) * speed;
      points.push({ dx: Math.cos(angle) * velocity, dy: (Math.sin(angle) * velocity) - 1.2, isWillow: true });
    }
    return points;
  }

  static generateSpiral(count = 80, scale = 0.08) {
    const points = [];
    for (let i = 0; i < count; i++) {
      const theta = i * 0.25;
      const r = theta * scale * (2 + Math.random() * 0.5);
      points.push({ dx: r * Math.cos(theta), dy: r * Math.sin(theta) });
    }
    return points;
  }

  static generateDoubleRing(count = 80, speed = 4.0) {
    const points = [];
    const half = Math.floor(count / 2);
    for (let i = 0; i < half; i++) {
      const angle = (i / half) * Math.PI * 2;
      points.push({ dx: Math.cos(angle) * speed * 0.6, dy: Math.sin(angle) * speed * 0.6 });
    }
    for (let i = 0; i < half; i++) {
      const angle = (i / half) * Math.PI * 2;
      points.push({ dx: Math.cos(angle) * speed * 1.15, dy: Math.sin(angle) * speed * 1.15 });
    }
    return points;
  }

  static generateDiamond(count = 70, scale = 4.0) {
    const points = [];
    for (let i = 0; i < count; i++) {
      const side = Math.floor(i / (count / 4));
      const progress = (i % (count / 4)) / (count / 4);
      let x = 0, y = 0;
      if (side === 0) { x = progress; y = -(1 - progress); }
      else if (side === 1) { x = 1 - progress; y = progress; }
      else if (side === 2) { x = -progress; y = 1 - progress; }
      else { x = -(1 - progress); y = -progress; }
      const noise = 0.85 + Math.random() * 0.3;
      points.push({ dx: x * scale * noise, dy: y * scale * noise });
    }
    return points;
  }
}
