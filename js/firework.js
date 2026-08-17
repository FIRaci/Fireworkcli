/**
 * Firework Rocket & Multi-Stage Detonation Controller
 * Clean, subtle ASCII ascent trails, primary burst, and secondary multi-stage explosions
 */

import { AsciiParticle } from './particle.js';
import { ShapeRasterizer } from './text-rasterizer.js';
import { soundFx } from './audio.js';
import { COLOR_PALETTES } from './config.js';

export class FireworkRocket {
  constructor(options = {}) {
    this.startX = options.startX || window.innerWidth / 2;
    this.startY = options.startY || window.innerHeight;
    this.targetX = options.targetX || this.startX + (Math.random() - 0.5) * 180;
    this.targetY = options.targetY || window.innerHeight * 0.28;

    this.x = this.startX;
    this.y = this.startY;
    
    const dx = this.targetX - this.startX;
    const dy = this.targetY - this.startY;
    const distance = Math.hypot(dx, dy);
    this.speed = options.speed || 11.5;
    this.vx = (dx / distance) * this.speed;
    this.vy = (dy / distance) * this.speed;

    this.stages = options.stages || 1;
    this.stage2Delay = options.stage2Delay || 0.8;
    this.stage3Delay = options.stage3Delay || 1.4;
    this.shape = options.shape || 'sphere';
    this.customText = options.customText || '';
    this.paletteName = options.colorPalette || 'monochrome';
    this.palette = COLOR_PALETTES[this.paletteName] || COLOR_PALETTES.monochrome;
    this.spread = options.spread || 1.2;
    this.hangTime = options.hangTime || 2.2;
    
    const charStr = options.characters || '0 . : * @ # % + ~ ^ ! &';
    this.charPool = charStr.split(/\s+/).filter(c => c.length > 0);

    this.isExploded = false;
    this.isDead = false;
    this.particles = [];
    this.trailParticles = [];
    this.trailChar = '^';

    soundFx.playLaunch(0.95 + Math.random() * 0.2);
  }

  update(dt = 1) {
    if (!this.isExploded) {
      this.x += this.vx;
      this.y += this.vy;

      // Subtle ascent trail
      if (Math.random() < 0.6) {
        const trailChars = ['|', '!', ':', '.', 'o', '0'];
        this.trailParticles.push(new AsciiParticle({
          x: this.x + (Math.random() - 0.5) * 3,
          y: this.y + (Math.random() - 0.5) * 3,
          vx: (Math.random() - 0.5) * 0.4,
          vy: Math.random() * 0.6 + 0.4,
          color: '#d4d4d8',
          char: trailChars[Math.floor(Math.random() * trailChars.length)],
          maxLife: 16 + Math.random() * 8,
          size: 10,
          friction: 0.93
        }));
      }

      if (this.vy < 0 && this.y <= this.targetY) {
        this.explode();
      }
    }

    for (let i = this.trailParticles.length - 1; i >= 0; i--) {
      this.trailParticles[i].update(dt);
      if (this.trailParticles[i].isDead) {
        this.trailParticles.splice(i, 1);
      }
    }

    for (let i = this.particles.length - 1; i >= 0; i--) {
      this.particles[i].update(dt);
      if (this.particles[i].isDead) {
        this.particles.splice(i, 1);
      }
    }

    if (this.isExploded && this.particles.length === 0 && this.trailParticles.length === 0) {
      this.isDead = true;
    }
  }

  explode() {
    this.isExploded = true;

    if (this.shape === 'text' || this.shape === 'heart') {
      soundFx.playChimeChord();
      soundFx.playExplosion(0.9);
    } else {
      soundFx.playExplosion(1.0);
    }

    const vectors = ShapeRasterizer.getShapeVectors(
      this.shape,
      this.customText,
      Math.floor(65 * this.spread),
      4.2 * this.spread
    );

    const primaryParticles = [];

    vectors.forEach((v) => {
      const color = this.palette[Math.floor(Math.random() * this.palette.length)];
      const char = v.char || this.charPool[Math.floor(Math.random() * this.charPool.length)] || '*';

      const p = new AsciiParticle({
        x: this.x,
        y: this.y,
        vx: v.dx * (this.shape === 'text' ? 0.35 : 1.0),
        vy: v.dy * (this.shape === 'text' ? 0.35 : 1.0),
        color: color,
        char: char,
        charPool: this.charPool,
        hangTime: this.hangTime,
        isWillow: v.isWillow || false,
        size: this.shape === 'text' ? 12 : 13
      });

      this.particles.push(p);
      primaryParticles.push(p);
    });

    if (this.stages >= 2) {
      setTimeout(() => {
        this.triggerSecondaryBurst(primaryParticles);
      }, this.stage2Delay * 1000);
    }
  }

  triggerSecondaryBurst(sourceParticles) {
    if (this.isDead) return;

    soundFx.playExplosion(0.75, true);

    const sampleSize = Math.min(16, Math.floor(sourceParticles.length * 0.35));
    for (let i = 0; i < sampleSize; i++) {
      const src = sourceParticles[Math.floor(Math.random() * sourceParticles.length)];
      if (!src || src.isDead) continue;

      const subCount = 6;
      const subPalette = COLOR_PALETTES.monochrome;

      for (let j = 0; j < subCount; j++) {
        const angle = (j / subCount) * Math.PI * 2;
        const speed = 1.2 + Math.random() * 1.2;
        const color = subPalette[Math.floor(Math.random() * subPalette.length)];

        this.particles.push(new AsciiParticle({
          x: src.x,
          y: src.y,
          vx: Math.cos(angle) * speed + src.vx * 0.2,
          vy: Math.sin(angle) * speed + src.vy * 0.2,
          color: color,
          char: Math.random() > 0.5 ? '.' : ':',
          charPool: ['.', ':', '*', '0'],
          hangTime: this.hangTime * 0.8,
          isSecondary: true,
          size: 10
        }));
      }
    }
  }

  draw(ctx) {
    if (!this.isExploded) {
      ctx.save();
      ctx.font = '500 13px "JetBrains Mono", monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = '#ededed';
      ctx.fillText(this.trailChar, this.x, this.y);
      ctx.restore();
    }

    for (const tp of this.trailParticles) {
      tp.draw(ctx);
    }

    for (const p of this.particles) {
      p.draw(ctx);
    }
  }
}
