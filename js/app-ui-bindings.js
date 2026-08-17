/**
 * UI & Keyboard Shortcut Bindings Helper
 * Minimalist interaction handlers & SVG Icons
 */

import { soundFx } from './audio.js';
import { Icons } from './icons.js';

export class AppUiBindings {
  static bindToolbar(app) {
    const startBtn = document.getElementById('startShowBtn');
    if (startBtn) startBtn.addEventListener('click', () => app.startShow());

    const configBtn = document.getElementById('configModalBtn');
    if (configBtn) configBtn.addEventListener('click', () => app.toggleModal());

    const guideBtn = document.getElementById('guideBtn');
    if (guideBtn) guideBtn.addEventListener('click', () => app.openGuide());

    const soundBtn = document.getElementById('soundToggleBtn');
    if (soundBtn) {
      soundBtn.addEventListener('click', () => {
        const state = soundFx.toggleSound();
        soundBtn.innerHTML = `
          ${state ? Icons.volume : Icons.volumeX}
          <span>Audio: ${state ? 'On' : 'Off'}</span>
        `;
        app.terminal.log(`Âm thanh: ${state ? 'Bật' : 'Tắt'}`, 'info');
      });
    }

    const themeSelect = document.getElementById('themeSelect');
    if (themeSelect) {
      themeSelect.addEventListener('change', (e) => app.setTheme(e.target.value));
    }

    const clearBtn = document.getElementById('clearBtn');
    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        app.clearCanvas();
        app.terminal.log('Đã xóa sạch màn hình.', 'info');
      });
    }
  }

  static bindKeyboardShortcuts(app) {
    window.addEventListener('keydown', (e) => {
      if (e.altKey && (e.key === 'q' || e.key === 'Q')) {
        e.preventDefault();
        app.toggleModal();
      }

      if (e.key === 'Escape') {
        app.toggleModal(false);
      }

      if (e.code === 'Space' && document.activeElement.tagName !== 'INPUT') {
        e.preventDefault();
        app.fireRandomRocket();
      }
    });
  }
}
