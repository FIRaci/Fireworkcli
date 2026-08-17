/**
 * Geometric Shapes Parametric Generators (<150 lines)
 * Square, Perfect Circle, Triangle, Hexagon, Octagon, Stars (5, 6, 12 point)
 */

export class ShapeCatalogGeometry {
  static generateSquare(count = 76, size = 3.6) {
    const points = [];
    const perSide = Math.floor(count / 4);
    for (let i = 0; i < count; i++) {
      const side = Math.floor(i / perSide);
      const t = (i % perSide) / perSide;
      let x = 0, y = 0;
      if (side === 0) { x = -size + t * 2 * size; y = -size; }
      else if (side === 1) { x = size; y = -size + t * 2 * size; }
      else if (side === 2) { x = size - t * 2 * size; y = size; }
      else { x = -size; y = size - t * 2 * size; }
      points.push({ dx: x + (Math.random() - 0.5) * 0.2, dy: y + (Math.random() - 0.5) * 0.2 });
    }
    return points;
  }

  static generateCircle(count = 80, radius = 3.8) {
    const points = [];
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      points.push({ dx: Math.cos(angle) * radius, dy: Math.sin(angle) * radius });
    }
    return points;
  }

  static generateTriangle(count = 75, size = 4.2) {
    const points = [];
    const perSide = Math.floor(count / 3);
    const v1 = { x: 0, y: -size };
    const v2 = { x: size * 0.866, y: size * 0.5 };
    const v3 = { x: -size * 0.866, y: size * 0.5 };
    for (let i = 0; i < count; i++) {
      const side = Math.floor(i / perSide);
      const t = (i % perSide) / perSide;
      let p1 = v1, p2 = v2;
      if (side === 1) { p1 = v2; p2 = v3; }
      else if (side === 2) { p1 = v3; p2 = v1; }
      points.push({
        dx: p1.x + (p2.x - p1.x) * t + (Math.random() - 0.5) * 0.2,
        dy: p1.y + (p2.y - p1.y) * t + (Math.random() - 0.5) * 0.2
      });
    }
    return points;
  }

  static generatePolygon(sides = 6, count = 78, radius = 3.8) {
    const points = [];
    const perSide = Math.floor(count / sides);
    for (let s = 0; s < sides; s++) {
      const a1 = (s / sides) * Math.PI * 2 - Math.PI / 2;
      const a2 = ((s + 1) / sides) * Math.PI * 2 - Math.PI / 2;
      const x1 = Math.cos(a1) * radius, y1 = Math.sin(a1) * radius;
      const x2 = Math.cos(a2) * radius, y2 = Math.sin(a2) * radius;
      for (let i = 0; i < perSide; i++) {
        const t = i / perSide;
        points.push({ dx: x1 + (x2 - x1) * t, dy: y1 + (y2 - y1) * t });
      }
    }
    return points;
  }

  static generateStar(arms = 5, count = 80, outerR = 4.0, innerR = 1.8) {
    const points = [];
    const totalV = arms * 2;
    const perSide = Math.floor(count / totalV);
    for (let i = 0; i < totalV; i++) {
      const r1 = i % 2 === 0 ? outerR : innerR;
      const r2 = (i + 1) % 2 === 0 ? outerR : innerR;
      const a1 = (i / totalV) * Math.PI * 2 - Math.PI / 2;
      const a2 = ((i + 1) / totalV) * Math.PI * 2 - Math.PI / 2;
      const x1 = Math.cos(a1) * r1, y1 = Math.sin(a1) * r1;
      const x2 = Math.cos(a2) * r2, y2 = Math.sin(a2) * r2;
      for (let j = 0; j < perSide; j++) {
        const t = j / perSide;
        points.push({ dx: x1 + (x2 - x1) * t, dy: y1 + (y2 - y1) * t });
      }
    }
    return points;
  }
}
