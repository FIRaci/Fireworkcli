/**
 * Main Application Orchestrator
 * Integrates Canvas Engine, CLI Terminal, Alt+Q Modal, Sound FX, and Global Keyboard Bindings
 */

import { FireworksEngine } from './engine.js';
import { TerminalCLI } from './terminal.js';
import { ModalController } from './modal-controller.js';
import { soundFx } from './audio.js';
import { configStore, COLOR_PALETTES } from './config.js';
import { AppUiBindings } from './app-ui-bindings.js';

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
    this.terminal.log(`▶ Bắt đầu kịch bản: ${configStore.activeShow.name} (${configStore.activeShow.waves.length} đợt)`, 'log-text');
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
      stage2Delay: 1.2
    });
  }

  fireShape(shape) {
    soundFx.ensureContext();
    this.engine.launchRocket({
      startX: window.innerWidth * (0.3 + Math.random() * 0.4),
      startY: window.innerHeight,
      targetX: window.innerWidth * (0.3 + Math.random() * 0.4),
      targetY: window.innerHeight * 0.28,
      shape: shape,
      colorPalette: shape === 'heart' ? 'soft_rose' : 'monochrome',
      spread: 1.3,
      hangTime: 2.5,
      stages: 2,
      stage2Delay: 0.8
    });
  }

  fireRandomRocket() {
    soundFx.ensureContext();
    const shapes = ['sphere', 'star', 'heart', 'willow', 'spiral'];
    const palettes = Object.keys(COLOR_PALETTES);
    
    this.engine.launchRocket({
      startX: window.innerWidth * (0.2 + Math.random() * 0.6),
      startY: window.innerHeight,
      targetX: window.innerWidth * (0.2 + Math.random() * 0.6),
      targetY: window.innerHeight * (0.2 + Math.random() * 0.35),
      shape: shapes[Math.floor(Math.random() * shapes.length)],
      colorPalette: palettes[Math.floor(Math.random() * palettes.length)],
      spread: 1.2,
      hangTime: 2.2,
      stages: Math.random() > 0.5 ? 2 : 1,
      stage2Delay: 0.75
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
      this.terminal.log('Hoàn thành kịch bản pháo hoa.', 'log-text');
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

// Initialize on DOM load
window.addEventListener('DOMContentLoaded', () => {
  window.app = new AppController();
});
