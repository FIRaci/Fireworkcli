/**
 * ASCII Particle Physics Engine
 * Handles character rendering, physics, hang-time float, gravity, and delicate color decay
 */

export class AsciiParticle {
  constructor(options = {}) {
    this.x = options.x || 0;
    this.y = options.y || 0;
    this.vx = options.vx || 0;
    this.vy = options.vy || 0;
    this.color = options.color || '#ededed';
    this.char = options.char || '*';
    this.charPool = options.charPool || ['0', '.', ':', '*', '@', '#'];
    
    this.life = 0;
    this.hangTime = options.hangTime || 2.0; // seconds to float/linger
    this.maxLife = options.maxLife || (this.hangTime * 60 + Math.random() * 25);
    this.alpha = 1.0;
    this.size = options.size || 13;
    this.gravity = options.isWillow ? 0.038 : 0.022;
    this.friction = options.friction || 0.96;
    this.isWillow = options.isWillow || false;
    this.isSecondary = options.isSecondary || false;
    this.isDead = false;

    // Subtle gentle shimmer
    this.twinkleRate = 0.08 + Math.random() * 0.1;
    this.twinklePhase = Math.random() * Math.PI * 2;
  }

  update(dt = 1) {
    this.life += dt;
    if (this.life >= this.maxLife) {
      this.isDead = true;
      return;
    }

    const progress = this.life / this.maxLife;
    
    // Friction deceleration
    this.vx *= this.friction;
    this.vy *= this.friction;

    // Gentle progressive gravity after hang-time
    if (this.life > (this.hangTime * 22)) {
      this.vy += this.gravity * (this.isWillow ? 1.4 : 1.0);
    }

    this.x += this.vx;
    this.y += this.vy;

    // Subtle character morphing as particle ages
    if (progress > 0.82) {
      this.char = '.';
    } else if (progress > 0.58) {
      this.char = ':';
    } else if (progress > 0.4 && this.charPool.length > 0) {
      if (Math.random() < 0.03) {
        this.char = this.charPool[Math.floor(Math.random() * this.charPool.length)];
      }
    }

    // Alpha fade calculation with gentle shimmer
    const baseAlpha = Math.max(0, 1 - Math.pow(progress, 1.6));
    const shimmer = 0.9 + 0.1 * Math.sin(this.life * this.twinkleRate + this.twinklePhase);
    this.alpha = baseAlpha * shimmer;
  }

  draw(ctx) {
    if (this.isDead || this.alpha <= 0.01) return;

    ctx.save();
    ctx.globalAlpha = this.alpha;
    ctx.font = `500 ${this.size}px "JetBrains Mono", monospace`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // Soft, delicate shadow instead of blinding radioactive glow
    ctx.shadowColor = this.color;
    ctx.shadowBlur = this.alpha > 0.6 ? 3 : 1;
    ctx.fillStyle = this.color;

    ctx.fillText(this.char, this.x, this.y);
    ctx.restore();
  }
}
