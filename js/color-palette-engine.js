/**
 * Advanced Color Palette Engine
 * Generates 256 ANSI colors, pre-curated designer palettes, and per-stage color resolvers
 */

export class ColorPaletteEngine {
  /**
   * Generates standard ANSI 256 color list
   */
  static generateAnsi256() {
    const colors = [];
    // 16 standard/bright colors
    const standard16 = [
      '#000000', '#800000', '#008000', '#808000', '#000080', '#800080', '#008080', '#c0c0c0',
      '#808080', '#ff0000', '#00ff00', '#ffff00', '#0000ff', '#ff00ff', '#00ffff', '#ffffff'
    ];
    colors.push(...standard16);

    // 216 color cube (6x6x6)
    const steps = [0, 95, 135, 175, 215, 255];
    for (let r = 0; r < 6; r++) {
      for (let g = 0; g < 6; g++) {
        for (let b = 0; b < 6; b++) {
          const hex = `#${steps[r].toString(16).padStart(2, '0')}${steps[g].toString(16).padStart(2, '0')}${steps[b].toString(16).padStart(2, '0')}`;
          colors.push(hex);
        }
      }
    }

    // 24 grayscale levels
    for (let i = 0; i < 24; i++) {
      const v = 8 + i * 10;
      const hex = `#${v.toString(16).padStart(2, '0')}${v.toString(16).padStart(2, '0')}${v.toString(16).padStart(2, '0')}`;
      colors.push(hex);
    }

    return colors;
  }

  static getBuiltinPalettes() {
    return {
      monochrome: {
        name: 'Monochrome Silver',
        colors: ['#ffffff', '#f4f4f5', '#e4e4e7', '#d4d4d8', '#a1a1aa']
      },
      soft_rose: {
        name: 'Soft Rose & Blush',
        colors: ['#fff1f2', '#ffe4e6', '#fecdd3', '#fda4af', '#f472b6']
      },
      champagne: {
        name: 'Champagne Warm Amber',
        colors: ['#fffbeb', '#fef3c7', '#fde68a', '#fcd34d', '#f59e0b']
      },
      nordic_slate: {
        name: 'Nordic Slate & Ice',
        colors: ['#f8fafc', '#f1f5f9', '#e2e8f0', '#cbd5e1', '#94a3b8']
      },
      sage: {
        name: 'Soft Sage Green',
        colors: ['#f0fdf4', '#dcfce7', '#bbf7d0', '#86efac', '#cbd5e1']
      },
      sunset: {
        name: 'Sunset Coral & Gold',
        colors: ['#ffedd5', '#fed7aa', '#fb923c', '#f43f5e', '#fbbf24']
      },
      cosmic_violet: {
        name: 'Cosmic Violet & Indigo',
        colors: ['#f5f3ff', '#ede9fe', '#ddd6fe', '#c084fc', '#818cf8']
      },
      aurora_teal: {
        name: 'Aurora Teal & Mint',
        colors: ['#f0fdfa', '#ccfbf1', '#99f6e4', '#2dd4bf', '#38bdf8']
      },
      rainbow_pastel: {
        name: 'Pastel Rainbow Mix',
        colors: ['#fca5a5', '#fdba74', '#fde047', '#86efac', '#93c5fd', '#c084fc']
      }
    };
  }

  /**
   * Resolves the color for a specific stage (Stage 1..5)
   */
  static resolveStageColor(stageIndex, waveConfig) {
    // If stage-specific colors are defined (e.g. stageColors: ['#ffffff', '#f472b6', '#f59e0b', ...])
    if (waveConfig.stageColors && Array.isArray(waveConfig.stageColors) && waveConfig.stageColors[stageIndex]) {
      const val = waveConfig.stageColors[stageIndex];
      if (Array.isArray(val) && val.length > 0) {
        return val[Math.floor(Math.random() * val.length)];
      } else if (typeof val === 'string' && val.startsWith('#')) {
        return val;
      }
    }

    // Fallback to palette
    const palettes = this.getBuiltinPalettes();
    const palette = palettes[waveConfig.colorPalette] || palettes.monochrome;
    return palette.colors[Math.floor(Math.random() * palette.colors.length)];
  }
}
