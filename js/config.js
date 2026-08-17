/**
 * Configuration & Presets Store
 * Soft, elegant, minimalist color palettes & default sequences
 */

export const DEFAULT_CHARACTERS = ['0', '.', ':', '*', '@', '#', '%', '+', '~', '^', '!', '&', 'x', 'o', 'O', '◆', '★', '✧', '¤'];

export const COLOR_PALETTES = {
  monochrome: ['#ffffff', '#f4f4f5', '#e4e4e7', '#d4d4d8', '#a1a1aa'],
  champagne: ['#fffbeb', '#fef3c7', '#fde68a', '#fcd34d', '#f59e0b'],
  soft_rose: ['#fff1f2', '#ffe4e6', '#fecdd3', '#fda4af', '#f472b6'],
  nordic_slate: ['#f8fafc', '#f1f5f9', '#e2e8f0', '#cbd5e1', '#94a3b8'],
  sage: ['#f0fdf4', '#dcfce7', '#bbf7d0', '#86efac', '#cbd5e1']
};

export const PRESETS = {
  romantic: {
    name: 'Muted Rose Romance ("I love you ♡")',
    desc: 'Pháo hoa ánh hồng phấn nhẹ nhàng, kết thúc bằng cụm chữ "I love you ♡" và trái tim thanh thoát.',
    loop: false,
    theme: 'monochrome',
    waves: [
      {
        id: 'wave-1',
        name: 'Đợt 1: Loạt hạt mịn mở màn',
        delayBefore: 0,
        rocketCount: 3,
        stagger: 0.25,
        stages: 2,
        stage2Delay: 0.8,
        shape: 'sphere',
        customText: '',
        colorPalette: 'soft_rose',
        altitude: 0.75,
        spread: 1.1,
        hangTime: 2.0,
        characters: '0 . : * ♡'
      },
      {
        id: 'wave-2',
        name: 'Đợt 2: Trái tim thanh thoát',
        delayBefore: 2.0,
        rocketCount: 2,
        stagger: 0.4,
        stages: 1,
        stage2Delay: 1.0,
        shape: 'heart',
        customText: '',
        colorPalette: 'soft_rose',
        altitude: 0.8,
        spread: 1.3,
        hangTime: 2.5,
        characters: '♡ * 0 .'
      },
      {
        id: 'wave-3',
        name: 'Đợt 3: Bắn chữ "I love you ♡"',
        delayBefore: 1.8,
        rocketCount: 1,
        stagger: 0,
        stages: 2,
        stage2Delay: 1.2,
        shape: 'text',
        customText: 'I love you ♡',
        colorPalette: 'soft_rose',
        altitude: 0.7,
        spread: 1.4,
        hangTime: 3.5,
        characters: 'I l o v e y u ♡ ★'
      }
    ]
  },

  monochrome_minimal: {
    name: 'Monochrome Silver Cascade',
    desc: 'Phong cách đen trắng tối giản tuyệt đối, mô phỏng terminal thuần túy với các hạt ánh bạc.',
    loop: false,
    theme: 'monochrome',
    waves: [
      {
        id: 'wave-1',
        name: 'Đợt 1: Khởi động ánh bạc',
        delayBefore: 0,
        rocketCount: 3,
        stagger: 0.25,
        stages: 2,
        stage2Delay: 0.75,
        shape: 'sphere',
        customText: '',
        colorPalette: 'monochrome',
        altitude: 0.75,
        spread: 1.2,
        hangTime: 2.2,
        characters: '0 . : * @ #'
      },
      {
        id: 'wave-2',
        name: 'Đợt 2: Hoa liễu bạc rủ nhẹ',
        delayBefore: 2.0,
        rocketCount: 2,
        stagger: 0.35,
        stages: 2,
        stage2Delay: 0.85,
        shape: 'willow',
        customText: '',
        colorPalette: 'monochrome',
        altitude: 0.82,
        spread: 1.5,
        hangTime: 3.0,
        characters: '* . : ✧ 0'
      }
    ]
  },

  champagne_finale: {
    name: 'Champagne Warm Starlight',
    desc: 'Sắc vàng champagne ấm áp, tinh tế và dễ chịu cho mắt với 3 đợt pháo hoa đa tầng.',
    loop: false,
    theme: 'warm',
    waves: [
      {
        id: 'wave-1',
        name: 'Đợt 1: Cánh quạt ánh ấm',
        delayBefore: 0,
        rocketCount: 3,
        stagger: 0.2,
        stages: 2,
        stage2Delay: 0.7,
        shape: 'sphere',
        customText: '',
        colorPalette: 'champagne',
        altitude: 0.72,
        spread: 1.2,
        hangTime: 2.0,
        characters: '0 . : * + ~'
      },
      {
        id: 'wave-2',
        name: 'Đợt 2: Hoa liễu champagne',
        delayBefore: 2.0,
        rocketCount: 2,
        stagger: 0.3,
        stages: 2,
        stage2Delay: 0.9,
        shape: 'willow',
        customText: '',
        colorPalette: 'champagne',
        altitude: 0.8,
        spread: 1.6,
        hangTime: 2.8,
        characters: '* . : ✧ ¤'
      },
      {
        id: 'wave-3',
        name: 'Đợt 3: Bão sao lơ lửng',
        delayBefore: 1.5,
        rocketCount: 4,
        stagger: 0.2,
        stages: 2,
        stage2Delay: 0.6,
        shape: 'star',
        customText: '',
        colorPalette: 'champagne',
        altitude: 0.75,
        spread: 1.4,
        hangTime: 2.5,
        characters: '★ ✦ 0 . : *'
      }
    ]
  }
};

class ConfigStore {
  constructor() {
    this.currentTheme = 'monochrome';
    this.soundEnabled = true;
    this.soundVolume = 0.5;
    this.isLooping = false;
    
    // Active Show Configuration
    this.activeShow = JSON.parse(JSON.stringify(PRESETS.romantic));
  }

  loadPreset(presetKey) {
    if (PRESETS[presetKey]) {
      this.activeShow = JSON.parse(JSON.stringify(PRESETS[presetKey]));
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
      rocketCount: 2,
      stagger: 0.25,
      stages: 2,
      stage2Delay: 0.8,
      shape: 'sphere',
      customText: '',
      colorPalette: 'monochrome',
      altitude: 0.75,
      spread: 1.2,
      hangTime: 2.0,
      characters: '0 . : * @ # + ~'
    };
    this.activeShow.waves.push(newWave);
    return newWave;
  }

  removeWave(index) {
    if (this.activeShow.waves.length > 1) {
      this.activeShow.waves.splice(index, 1);
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
        return true;
      }
    } catch (e) {
      console.error('Invalid JSON imported:', e);
    }
    return false;
  }
}

export const configStore = new ConfigStore();
