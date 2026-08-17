/**
 * Main Application Orchestrator v3.0
 * Integrates Engine, CLI Terminal, 5-Tab Modal, Audio, and UI Bindings
 */

import { FireworksEngine } from './engine.js';
import { TerminalCLI } from './terminal.js';
import { ModalController } from './modal-controller.js';
import { soundFx } from './audio.js';
import { configStore } from './config.js';
import { AppUiBindings } from './app-ui-bindings.js';
import { ShapeRasterizer } from './text-rasterizer.js';

class AppController {
  constructor() {
    this.canvas = document.getElementById('fireworksCanvas');
    this.cliInput = document.getElementById('cliInput');
    this.terminalLogs = document.getElementById('terminalLogs');
    this.modalBackdrop = document.getElementById('configModal');

    this.engine = new FireworksEngine(this.canvas);
    this.terminal = new TerminalCLI(this.cliInput, this.terminalLogs, this);
    this.modal = new ModalController(this.modalBackdrop, this);

    AppUiBindings.bindToolbar(this);
    AppUiBindings.bindKeyboardShortcuts(this);
    this.startStatMonitor();
    this.hookSchedulerEvents();
  }

  startShow() {
    soundFx.ensureContext();
    this.engine.startShow(configStore.activeShow);
    this.terminal.log(`▶ Bắt đầu kịch bản: ${configStore.activeShow.name} (${configStore.activeShow.waves.length} đợt)`, 'info');
  }

  stopShow() {
    this.engine.stopShow();
  }

  toggleModal(open = null, initialTab = null) {
    this.modal.toggle(open, initialTab);
  }

  openGuide() {
    this.toggleModal(true, 'guide');
  }

  fireText(text) {
    soundFx.ensureContext();
    const words = text.trim().split(/\s+/);
    if (words.length > 1) {
      const splitRockets = ShapeRasterizer.splitPhraseToRockets(text);
      splitRockets.forEach((r, i) => {
        setTimeout(() => {
          this.engine.launchRocket({
            startX: window.innerWidth * r.xFraction,
            startY: window.innerHeight,
            targetX: window.innerWidth * r.xFraction,
            targetY: window.innerHeight * (1 - r.altitude),
            shape: 'text',
            customText: r.word,
            colorPalette: 'soft_rose',
            spread: 1.3,
            hangTime: 3.5,
            stages: 2,
            stageDelays: [0, 0.9]
          });
        }, i * 200);
      });
    } else {
      this.engine.launchRocket({
        startX: window.innerWidth / 2,
        startY: window.innerHeight,
        targetX: window.innerWidth / 2,
        targetY: window.innerHeight * 0.3,
        shape: 'text',
        customText: text,
        colorPalette: 'soft_rose',
        spread: 1.3,
        hangTime: 3.5,
        stages: 2,
        stageDelays: [0, 0.9]
      });
    }
  }

  fireShape(shape) {
    soundFx.ensureContext();
    this.engine.launchRocket({
      startX: window.innerWidth * (0.3 + Math.random() * 0.4),
      startY: window.innerHeight,
      targetX: window.innerWidth * (0.3 + Math.random() * 0.4),
      targetY: window.innerHeight * 0.28,
      shape: shape,
      colorPalette: shape === 'heart' ? 'soft_rose' : 'champagne',
      spread: 1.3,
      hangTime: 2.8,
      stages: 3,
      stageDelays: [0, 0.75, 1.4]
    });
  }

  loadPreset(key) {
    const success = configStore.loadPreset(key);
    if (success) {
      this.modal.renderWaves();
      const preset = configStore.activeShow;
      if (preset.theme) this.setTheme(preset.theme);
    }
    return success;
  }

  setTheme(theme) {
    document.body.setAttribute('data-theme', theme);
    configStore.currentTheme = theme;
    const themeSelect = document.getElementById('themeSelect');
    if (themeSelect) themeSelect.value = theme;
  }

  toggleSound(enable = null) {
    return soundFx.toggleSound(enable);
  }

  clearCanvas() {
    this.engine.clear();
  }

  hookSchedulerEvents() {
    this.engine.scheduler.onWaveStart = (waveNum, totalWaves, waveData) => {
      this.terminal.log(`[Đợt ${waveNum}/${totalWaves}] Phóng ${waveData.rocketCount} quả (${waveData.stages} lượt nổ - ${waveData.shape})`, 'info');
    };

    this.engine.scheduler.onShowComplete = () => {
      this.terminal.log('Hoàn thành kịch bản pháo hoa.', 'info');
    };
  }

  startStatMonitor() {
    const fpsVal = document.getElementById('fpsValue');
    const particlesVal = document.getElementById('particlesValue');
    const rocketsVal = document.getElementById('rocketsValue');

    setInterval(() => {
      const stats = this.engine.getStats();
      if (fpsVal) fpsVal.textContent = stats.fps;
      if (particlesVal) particlesVal.textContent = stats.activeParticles;
      if (rocketsVal) rocketsVal.textContent = stats.activeRockets;
    }, 250);
  }
}

window.addEventListener('DOMContentLoaded', () => {
  window.app = new AppController();
});
