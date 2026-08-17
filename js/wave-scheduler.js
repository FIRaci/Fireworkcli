/**
 * Wave Sequence Scheduler ("Đợt Nổ" Sequencer)
 * Manages timeline of multiple waves, inter-wave delays, rocket staggering, and loop state
 */

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
        // Loop show after 2.5s breather
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

      // Schedule subsequent wave
      this.scheduleNextWave(waveIndex + 1);
    }, delay);

    this.activeTimeouts.push(waveTimer);
  }

  executeWave(wave) {
    const count = wave.rocketCount || 1;
    const stagger = (wave.stagger || 0.2) * 1000;
    const canvasWidth = window.innerWidth;
    const canvasHeight = window.innerHeight;

    for (let i = 0; i < count; i++) {
      const rocketTimer = setTimeout(() => {
        if (!this.isRunning) return;

        // Position rockets evenly or with slight organic distribution
        let targetX;
        if (count === 1) {
          targetX = canvasWidth * 0.5 + (Math.random() - 0.5) * 100;
        } else {
          const step = (canvasWidth * 0.7) / Math.max(1, count - 1);
          targetX = (canvasWidth * 0.15) + (i * step) + (Math.random() - 0.5) * 60;
        }

        const targetY = canvasHeight * (1 - (wave.altitude || 0.75)) + (Math.random() - 0.5) * 50;
        const startX = targetX + (Math.random() - 0.5) * 80;

        this.engine.launchRocket({
          startX: startX,
          startY: canvasHeight,
          targetX: targetX,
          targetY: targetY,
          stages: wave.stages || 1,
          stage2Delay: wave.stage2Delay || 0.8,
          shape: wave.shape || 'sphere',
          customText: wave.customText || '',
          colorPalette: wave.colorPalette || 'rainbow',
          spread: wave.spread || 1.2,
          hangTime: wave.hangTime || 2.0,
          characters: wave.characters
        });
      }, i * stagger);

      this.activeTimeouts.push(rocketTimer);
    }
  }

  stopShow() {
    this.isRunning = false;
    this.activeTimeouts.forEach(t => clearTimeout(t));
    this.activeTimeouts = [];
  }
}
