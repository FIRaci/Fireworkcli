/**
 * Canvas ASCII Rendering Engine
 * High-performance 60fps render loop with subtle motion blur, calm background, and click-to-launch
 */

import { FireworkRocket } from './firework.js';
import { WaveScheduler } from './wave-scheduler.js';

export class FireworksEngine {
  constructor(canvasElement) {
    this.canvas = canvasElement;
    this.ctx = this.canvas.getContext('2d');
    this.rockets = [];
    this.scheduler = new WaveScheduler(this);
    
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
    this.ctx.scale(dpr, dpr);
  }

  bindEvents() {
    window.addEventListener('resize', () => this.initCanvas());

    this.canvas.addEventListener('pointerdown', (e) => {
      if (e.target !== this.canvas) return;

      const rect = this.canvas.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;

      this.launchRocket({
        startX: clickX + (Math.random() - 0.5) * 40,
        startY: this.height,
        targetX: clickX,
        targetY: clickY,
        stages: Math.random() > 0.4 ? 2 : 1,
        stage2Delay: 0.75,
        shape: ['sphere', 'star', 'heart', 'spiral'][Math.floor(Math.random() * 4)],
        colorPalette: 'monochrome',
        spread: 1.2,
        hangTime: 2.2
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
      if (this.rockets[i].isDead) {
        this.rockets.splice(i, 1);
      }
    }
  }

  render() {
    // Subtle charcoal clear creates a clean, elegant motion blur
    this.ctx.fillStyle = 'rgba(12, 13, 17, 0.28)';
    this.ctx.fillRect(0, 0, this.width, this.height);

    for (const rocket of this.rockets) {
      rocket.draw(this.ctx);
    }
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
