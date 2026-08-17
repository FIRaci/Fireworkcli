/**
 * Firework Rocket Controller (<190 lines)
 * Unlimited numeric stages, PNG particle color preservation, and 35+ shape detonations
 */

import { AsciiParticle } from './particle.js';
import { ShapeRasterizer } from './text-rasterizer.js';
import { soundFx } from './audio.js';
import { ColorPaletteEngine } from './color-palette-engine.js';

export class FireworkRocket {
  constructor(options = {}) {
    this.startX = options.startX || window.innerWidth / 2;
    this.startY = options.startY || window.innerHeight;
    this.targetX = options.targetX || this.startX;
    this.targetY = options.targetY || window.innerHeight * 0.28;

    this.x = this.startX;
    this.y = this.startY;
    
    const dx = this.targetX - this.startX;
    const dy = this.targetY - this.startY;
    const distance = Math.hypot(dx, dy) || 1;
    this.speed = options.speed || 11.5;
    this.vx = (dx / distance) * this.speed;
    this.vy = (dy / distance) * this.speed;

    // Unlimited numeric stages (1 to 20+)
    this.stages = Math.max(1, parseInt(options.stages, 10) || 1);
    this.stageDelays = options.stageDelays || [];
    this.stageColors = options.stageColors || [];
    this.colorPalette = options.colorPalette || 'monochrome';
    this.waveConfig = options;

    this.shape = options.shape || 'sphere';
    this.customText = options.customText || '';
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
      if (this.trailParticles[i].isDead) this.trailParticles.splice(i, 1);
    }

    for (let i = this.particles.length - 1; i >= 0; i--) {
      this.particles[i].update(dt);
      if (this.particles[i].isDead) this.particles.splice(i, 1);
    }

    if (this.isExploded && this.particles.length === 0 && this.trailParticles.length === 0) {
      this.isDead = true;
    }
  }

  explode() {
    this.isExploded = true;
    soundFx.playExplosion(1.0);

    const vectors = ShapeRasterizer.getShapeVectors(
      this.shape,
      this.customText,
      Math.floor(75 * this.spread),
      4.2 * this.spread
    );

    const stage1Particles = [];

    vectors.forEach((v) => {
      const color = v.hasCustomColor ? v.color : ColorPaletteEngine.resolveStageColor(0, this.waveConfig);
      const char = v.char || this.charPool[Math.floor(Math.random() * this.charPool.length)] || '*';

      const isTextOrDoodle = this.shape === 'text' || this.shape === 'custom_image' || this.shape === 'custom_doodle';
      const p = new AsciiParticle({
        x: this.x,
        y: this.y,
        vx: v.dx * (isTextOrDoodle ? 0.35 : 1.0),
        vy: v.dy * (isTextOrDoodle ? 0.35 : 1.0),
        color: color,
        char: char,
        charPool: this.charPool,
        hangTime: this.hangTime,
        isWillow: v.isWillow || false,
        size: isTextOrDoodle ? 12 : 13
      });

      this.particles.push(p);
      stage1Particles.push(p);
    });

    // Schedule Dynamic Multi-Stages (Stage 2..N)
    for (let s = 2; s <= this.stages; s++) {
      const defaultDelay = (s - 1) * 0.65;
      const delay = (this.stageDelays[s - 1] !== undefined ? this.stageDelays[s - 1] : defaultDelay) * 1000;
      setTimeout(() => {
        this.triggerStageBurst(s - 1, stage1Particles);
      }, delay);
    }
  }

  triggerStageBurst(stageIdx, sourceParticles) {
    if (this.isDead) return;
    soundFx.playExplosion(0.7 + (stageIdx * 0.05), true);

    const sampleCount = Math.min(20, Math.max(4, Math.floor(sourceParticles.length * 0.3)));
    for (let i = 0; i < sampleCount; i++) {
      const src = sourceParticles[Math.floor(Math.random() * sourceParticles.length)];
      if (!src || src.isDead) continue;

      const subCount = 5;
      for (let j = 0; j < subCount; j++) {
        const angle = (j / subCount) * Math.PI * 2;
        const speed = 1.0 + Math.random() * 1.4;
        const color = ColorPaletteEngine.resolveStageColor(stageIdx, this.waveConfig);

        this.particles.push(new AsciiParticle({
          x: src.x,
          y: src.y,
          vx: Math.cos(angle) * speed + src.vx * 0.2,
          vy: Math.sin(angle) * speed + src.vy * 0.2,
          color: color,
          char: Math.random() > 0.5 ? '.' : (stageIdx >= 2 ? '✦' : ':'),
          charPool: ['.', ':', '*', '✦', '0'],
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
    for (const tp of this.trailParticles) tp.draw(ctx);
    for (const p of this.particles) p.draw(ctx);
  }
}
