/**
 * Wave Sequence Scheduler ("Đợt Nổ" Sequencer)
 * Supports multi-rocket salvos, phrase word splitting, and custom X-Y distribution
 */

import { ShapeRasterizer } from './text-rasterizer.js';

export class WaveScheduler {
  constructor(engine) {
    this.engine = engine;
    this.isRunning = false;
    this.currentWaveIndex = 0;
    this.activeTimeouts = [];
    this.onWaveStart = null;
    this.onShowComplete = null;
  }

  startShow(showConfig) {
    this.stopShow();
    if (!showConfig || !showConfig.waves || showConfig.waves.length === 0) return;

    this.isRunning = true;
    this.currentWaveIndex = 0;
    this.showConfig = showConfig;

    this.scheduleNextWave(0);
  }

  scheduleNextWave(waveIndex) {
    if (!this.isRunning) return;

    if (waveIndex >= this.showConfig.waves.length) {
      if (this.showConfig.loop) {
        const loopTimer = setTimeout(() => {
          this.scheduleNextWave(0);
        }, 2500);
        this.activeTimeouts.push(loopTimer);
      } else {
        this.isRunning = false;
        if (this.onShowComplete) this.onShowComplete();
      }
      return;
    }

    const wave = this.showConfig.waves[waveIndex];
    this.currentWaveIndex = waveIndex;
    const delay = (wave.delayBefore || 0) * 1000;

    const waveTimer = setTimeout(() => {
      if (!this.isRunning) return;

      if (this.onWaveStart) {
        this.onWaveStart(waveIndex + 1, this.showConfig.waves.length, wave);
      }

      this.executeWave(wave);
      this.scheduleNextWave(waveIndex + 1);
    }, delay);

    this.activeTimeouts.push(waveTimer);
  }

  executeWave(wave) {
    const canvasWidth = window.innerWidth;
    const canvasHeight = window.innerHeight;
    const stagger = (wave.stagger || 0.2) * 1000;

    // Word Splitting Mode
    if (wave.shape === 'text' && wave.splitWords && wave.customText) {
      const splitRockets = ShapeRasterizer.splitPhraseToRockets(wave.customText, wave.altitude || 0.75);
      splitRockets.forEach((r, i) => {
        const timer = setTimeout(() => {
          if (!this.isRunning) return;
          const targetX = canvasWidth * r.xFraction;
          const targetY = canvasHeight * (1 - r.altitude);

          this.engine.launchRocket({
            ...wave,
            startX: targetX,
            startY: canvasHeight,
            targetX: targetX,
            targetY: targetY,
            customText: r.word
          });
        }, i * stagger);
        this.activeTimeouts.push(timer);
      });
      return;
    }

    // Standard Multi-Rocket Distribution
    const count = wave.rocketCount || 1;
    const customXList = this.parseCustomX(wave.customXPositions, count);

    for (let i = 0; i < count; i++) {
      const rocketTimer = setTimeout(() => {
        if (!this.isRunning) return;

        let xFraction;
        if (customXList && customXList[i] !== undefined) {
          xFraction = customXList[i];
        } else if (count === 1) {
          xFraction = 0.5 + (Math.random() - 0.5) * 0.1;
        } else {
          xFraction = 0.15 + (i * (0.7 / Math.max(1, count - 1)));
        }

        const targetX = canvasWidth * xFraction + (Math.random() - 0.5) * 30;
        const targetY = canvasHeight * (1 - (wave.altitude || 0.75)) + (Math.random() - 0.5) * 40;
        const startX = targetX + (Math.random() - 0.5) * 60;

        this.engine.launchRocket({
          ...wave,
          startX: startX,
          startY: canvasHeight,
          targetX: targetX,
          targetY: targetY
        });
      }, i * stagger);

      this.activeTimeouts.push(rocketTimer);
    }
  }

  parseCustomX(str, count) {
    if (!str || typeof str !== 'string') return null;
    const parts = str.split(/[,;\s]+/).map(p => parseFloat(p)).filter(n => !isNaN(n));
    if (parts.length === 0) return null;
    return parts.map(val => val > 1 ? val / 100 : val);
  }

  stopShow() {
    this.isRunning = false;
    this.activeTimeouts.forEach(t => clearTimeout(t));
    this.activeTimeouts = [];
  }
}
