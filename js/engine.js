/**
 * Canvas ASCII Rendering Engine v3.0
 * 60fps loop, HUD integration, canvas scale control, and customizable click-to-fire
 */

import { FireworkRocket } from './firework.js';
import { WaveScheduler } from './wave-scheduler.js';
import { CoordinateHUD } from './coordinate-hud.js';
import { configStore } from './config.js';

export class FireworksEngine {
  constructor(canvasElement) {
    this.canvas = canvasElement;
    this.ctx = this.canvas.getContext('2d');
    this.rockets = [];
    this.scheduler = new WaveScheduler(this);
    this.hud = new CoordinateHUD(this.canvas);
    
    this.scaleFactor = 1.0;
    this.fps = 60;
    this.lastFrameTime = performance.now();
    this.frameCount = 0;
    this.lastFpsUpdate = performance.now();
    
    this.initCanvas();
    this.bindEvents();
    this.startLoop();
  }

  initCanvas() {
    const dpr = window.devicePixelRatio || 1;
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.canvas.width = this.width * dpr;
    this.canvas.height = this.height * dpr;
    this.canvas.style.width = `${this.width}px`;
    this.canvas.style.height = `${this.height}px`;
    this.ctx.scale(dpr * this.scaleFactor, dpr * this.scaleFactor);
  }

  setScale(scale) {
    this.scaleFactor = Math.max(0.5, Math.min(2.0, scale));
    this.initCanvas();
  }

  bindEvents() {
    window.addEventListener('resize', () => this.initCanvas());

    this.canvas.addEventListener('pointerdown', (e) => {
      if (e.target !== this.canvas) return;

      const rect = this.canvas.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;

      const cs = configStore.clickSettings;
      if (!cs.enabled) return;

      const shape = cs.shape === 'random' 
        ? ['sphere', 'heart', 'star5', 'star8', 'butterfly', 'saturn', 'infinity', 'clover'][Math.floor(Math.random() * 8)]
        : cs.shape;

      this.launchRocket({
        startX: clickX + (Math.random() - 0.5) * 40,
        startY: this.height,
        targetX: clickX,
        targetY: clickY,
        stages: cs.stages || 2,
        stageDelays: cs.stageDelays || [0, 0.75, 1.35],
        stageColors: cs.stageColors,
        shape: shape,
        customText: cs.customText || 'I love you ♡',
        colorPalette: cs.colorPalette || 'soft_rose',
        spread: cs.spread || 1.3,
        hangTime: cs.hangTime || 2.5
      });
    });
  }

  launchRocket(options) {
    const rocket = new FireworkRocket(options);
    this.rockets.push(rocket);
    return rocket;
  }

  startShow(showConfig) {
    this.scheduler.startShow(showConfig);
  }

  stopShow() {
    this.scheduler.stopShow();
  }

  clear() {
    this.rockets = [];
    this.ctx.clearRect(0, 0, this.width, this.height);
  }

  startLoop() {
    const loop = (now) => {
      const dt = Math.min((now - this.lastFrameTime) / 16.667, 2.0);
      this.lastFrameTime = now;

      this.frameCount++;
      if (now - this.lastFpsUpdate >= 500) {
        this.fps = Math.round((this.frameCount * 1000) / (now - this.lastFpsUpdate));
        this.frameCount = 0;
        this.lastFpsUpdate = now;
      }

      this.update(dt);
      this.render();

      requestAnimationFrame(loop);
    };

    requestAnimationFrame(loop);
  }

  update(dt) {
    for (let i = this.rockets.length - 1; i >= 0; i--) {
      this.rockets[i].update(dt);
      if (this.rockets[i].isDead) this.rockets.splice(i, 1);
    }
  }

  render() {
    this.ctx.fillStyle = 'rgba(12, 13, 17, 0.28)';
    this.ctx.fillRect(0, 0, this.width / this.scaleFactor, this.height / this.scaleFactor);

    for (const rocket of this.rockets) {
      rocket.draw(this.ctx);
    }

    // Render HUD grid
    this.hud.draw(this.ctx, this.width / this.scaleFactor, this.height / this.scaleFactor);
  }

  getStats() {
    let particleCount = 0;
    for (const r of this.rockets) {
      particleCount += r.particles.length + r.trailParticles.length;
    }
    return {
      fps: this.fps,
      activeRockets: this.rockets.filter(r => !r.isExploded).length,
      activeParticles: particleCount,
      isWaveRunning: this.scheduler.isRunning
    };
  }
}
