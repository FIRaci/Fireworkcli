/**
 * Emblem & Iconic Parametric Generators (<160 lines)
 * Moon, Sun, Music Note, Skull, Snowflake, Tree
 */

export class ShapeCatalogEmblems {
  static generateMoon(count = 75, scale = 3.6) {
    const points = [];
    for (let i = 0; i < count; i++) {
      const theta = (i / count) * Math.PI * 1.5 - (Math.PI * 0.75);
      const outerX = Math.cos(theta) * scale;
      const outerY = Math.sin(theta) * scale;
      const innerX = Math.cos(theta) * (scale * 0.65) + (scale * 0.35);
      const innerY = Math.sin(theta) * (scale * 0.65);
      if (i % 2 === 0) {
        points.push({ dx: outerX, dy: outerY });
      } else {
        points.push({ dx: innerX, dy: innerY });
      }
    }
    return points;
  }

  static generateSun(count = 85, scale = 4.0) {
    const points = [];
    const coreCount = Math.floor(count * 0.5);
    const rayCount = count - coreCount;
    // Core ring
    for (let i = 0; i < coreCount; i++) {
      const angle = (i / coreCount) * Math.PI * 2;
      points.push({ dx: Math.cos(angle) * (scale * 0.45), dy: Math.sin(angle) * (scale * 0.45) });
    }
    // Sun rays
    const rays = 12;
    for (let i = 0; i < rayCount; i++) {
      const rayIdx = i % rays;
      const angle = (rayIdx / rays) * Math.PI * 2;
      const dist = (scale * 0.5) + (Math.random() * scale * 0.5);
      points.push({ dx: Math.cos(angle) * dist, dy: Math.sin(angle) * dist });
    }
    return points;
  }

  static generateMusicNote(count = 75, scale = 3.8) {
    const points = [];
    // Note head (filled tilted oval)
    const headCount = Math.floor(count * 0.45);
    for (let i = 0; i < headCount; i++) {
      const a = (i / headCount) * Math.PI * 2;
      points.push({ dx: -scale * 0.4 + Math.cos(a) * 0.8, dy: scale * 0.6 + Math.sin(a) * 0.5 });
    }
    // Stem
    const stemCount = Math.floor(count * 0.35);
    for (let i = 0; i < stemCount; i++) {
      const y = scale * 0.6 - (i / stemCount) * scale * 1.4;
      points.push({ dx: -scale * 0.4 + 0.7, dy: y });
    }
    // Flag
    const flagCount = count - headCount - stemCount;
    for (let i = 0; i < flagCount; i++) {
      const t = i / flagCount;
      points.push({ dx: -scale * 0.4 + 0.7 + t * scale * 0.8, dy: -scale * 0.8 + Math.sin(t * Math.PI) * 0.6 });
    }
    return points;
  }

  static generateSnowflake(count = 85, scale = 4.0) {
    const points = [];
    const arms = 6;
    for (let i = 0; i < count; i++) {
      const arm = i % arms;
      const angle = (arm / arms) * Math.PI * 2;
      const dist = ((i % 14) / 14) * scale;
      const x = Math.cos(angle) * dist;
      const y = Math.sin(angle) * dist;
      points.push({ dx: x, dy: y });
      if (dist > scale * 0.4 && i % 3 === 0) {
        const branchA = angle + 0.5;
        points.push({ dx: x + Math.cos(branchA) * 0.6, dy: y + Math.sin(branchA) * 0.6 });
      }
    }
    return points;
  }

  static generateTree(count = 75, scale = 3.6) {
    const points = [];
    for (let i = 0; i < count; i++) {
      const t = i / count;
      const y = -scale + t * 2 * scale;
      const widthAtY = t * scale * 0.9;
      const x = (Math.random() - 0.5) * 2 * widthAtY;
      points.push({ dx: x, dy: y });
    }
    return points;
  }
}
