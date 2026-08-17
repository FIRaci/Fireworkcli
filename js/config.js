/**
 * Configuration Store v3.0 (<130 lines)
 */

import { StorageManager } from './storage-manager.js';
import { PRESETS } from './presets-catalog.js';

export { PRESETS };

export const DEFAULT_CHARACTERS = ['0', '.', ':', '*', '@', '#', '%', '+', '~', '^', '!', '&', 'x', 'o', 'O', '◆', '★', '✧', '¤'];

class ConfigStore {
  constructor() {
    this.currentTheme = 'monochrome';
    this.soundEnabled = true;
    this.soundVolume = 0.5;
    
    this.displaySettings = {
      scale: 1.0,
      showHud: true,
      viewportMode: 'full'
    };

    this.clickSettings = {
      enabled: true,
      shape: 'random',
      customText: 'I love you ♡',
      stages: 2,
      stageDelays: [0, 0.75, 1.35],
      stageColors: ['#ffffff', '#f472b6'],
      colorPalette: 'soft_rose',
      spread: 1.3,
      hangTime: 2.5,
      splitWords: false
    };

    const saved = StorageManager.loadActive();
    if (saved && saved.waves) {
      this.activeShow = saved;
    } else {
      this.activeShow = JSON.parse(JSON.stringify(PRESETS.romantic_salvo));
    }
  }

  save() {
    StorageManager.saveActive(this.activeShow);
  }

  loadPreset(presetKey) {
    if (PRESETS[presetKey]) {
      this.activeShow = JSON.parse(JSON.stringify(PRESETS[presetKey]));
      this.save();
      return true;
    }
    return false;
  }

  addWave() {
    const nextIdx = this.activeShow.waves.length + 1;
    const newWave = {
      id: `wave-${Date.now()}`,
      name: `Đợt ${nextIdx}: Pháo hoa tùy chỉnh`,
      delayBefore: 1.5,
      rocketCount: 3,
      stagger: 0.25,
      stages: 2,
      stageDelays: [0, 0.8, 1.4, 2.0, 2.6],
      stageColors: ['#ffffff', '#f472b6', '#fde68a', '#38bdf8', '#86efac'],
      shape: 'sphere',
      customText: '',
      splitWords: false,
      customXPositions: '25, 50, 75',
      colorPalette: 'monochrome',
      altitude: 0.75,
      spread: 1.2,
      hangTime: 2.2,
      characters: '0 . : * @ # + ~'
    };
    this.activeShow.waves.push(newWave);
    this.save();
    return newWave;
  }

  removeWave(index) {
    if (this.activeShow.waves.length > 1) {
      this.activeShow.waves.splice(index, 1);
      this.save();
      return true;
    }
    return false;
  }

  exportJSON() {
    return JSON.stringify(this.activeShow, null, 2);
  }

  importJSON(jsonString) {
    try {
      const parsed = JSON.parse(jsonString);
      if (parsed.waves && Array.isArray(parsed.waves)) {
        this.activeShow = parsed;
        this.save();
        return true;
      }
    } catch (e) {}
    return false;
  }
}

export const configStore = new ConfigStore();
