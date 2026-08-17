/**
 * Alt + Q Modal Interactive Controller
 * Handles Waves Timeline, Presets, JSON, and Step-by-Step Guide / Glossary
 */

import { configStore, PRESETS } from './config.js';
import { ModalCardTemplate } from './modal-card-template.js';
import { GUIDE_SECTIONS } from './guide-content.js';
import { Icons } from './icons.js';

export class ModalController {
  constructor(modalElement, appController) {
    this.modal = modalElement;
    this.app = appController;
    this.isOpen = false;

    this.bindDomElements();
    this.bindEvents();
    this.renderWaves();
    this.renderPresets();
    this.renderGuide();
  }

  bindDomElements() {
    this.tabBtns = this.modal.querySelectorAll('.tab-btn');
    this.tabPanes = this.modal.querySelectorAll('.tab-pane');
    this.wavesContainer = this.modal.querySelector('#wavesContainer');
    this.presetsContainer = this.modal.querySelector('#presetsContainer');
    this.guideContainer = this.modal.querySelector('#guideContainer');
    this.closeBtn = this.modal.querySelector('#modalCloseBtn');
    this.addWaveBtn = this.modal.querySelector('#addWaveBtn');
    this.applyBtn = this.modal.querySelector('#applyConfigBtn');
    this.testFireBtn = this.modal.querySelector('#testFireBtn');
    this.exportBtn = this.modal.querySelector('#exportJsonBtn');
    this.importBtn = this.modal.querySelector('#importJsonBtn');
    this.jsonInput = this.modal.querySelector('#jsonConfigInput');
  }

  bindEvents() {
    this.tabBtns.forEach(btn => {
      btn.addEventListener('click', () => this.switchTab(btn.dataset.tab));
    });

    this.closeBtn.addEventListener('click', () => this.toggle(false));
    this.modal.addEventListener('click', (e) => {
      if (e.target === this.modal) this.toggle(false);
    });

    this.addWaveBtn.addEventListener('click', () => {
      configStore.addWave();
      this.renderWaves();
    });

    this.testFireBtn.addEventListener('click', () => {
      this.syncFromInputs();
      this.app.startShow();
    });

    this.applyBtn.addEventListener('click', () => {
      this.syncFromInputs();
      this.toggle(false);
      this.app.terminal.log('Đã cập nhật cấu hình pháo hoa thành công.', 'info');
    });

    if (this.exportBtn) {
      this.exportBtn.addEventListener('click', () => {
        this.syncFromInputs();
        if (this.jsonInput) this.jsonInput.value = configStore.exportJSON();
      });
    }

    if (this.importBtn) {
      this.importBtn.addEventListener('click', () => {
        if (this.jsonInput && this.jsonInput.value) {
          if (configStore.importJSON(this.jsonInput.value)) {
            this.renderWaves();
            this.app.terminal.log('Đã nạp cấu hình JSON thành công.', 'info');
          }
        }
      });
    }
  }

  switchTab(tabId) {
    this.tabBtns.forEach(b => b.classList.toggle('active', b.dataset.tab === tabId));
    this.tabPanes.forEach(p => p.classList.toggle('active', p.id === `tab-${tabId}`));
  }

  toggle(open = null, initialTab = null) {
    this.isOpen = open !== null ? open : !this.isOpen;
    if (this.isOpen) {
      this.modal.classList.add('open');
      this.renderWaves();
      if (this.jsonInput) this.jsonInput.value = configStore.exportJSON();
      if (initialTab) this.switchTab(initialTab);
    } else {
      this.modal.classList.remove('open');
    }
  }

  renderWaves() {
    if (!this.wavesContainer) return;
    this.wavesContainer.innerHTML = '';
    const total = configStore.activeShow.waves.length;

    configStore.activeShow.waves.forEach((wave, idx) => {
      const card = document.createElement('div');
      card.className = 'wave-card';
      card.innerHTML = ModalCardTemplate.createWaveCardHTML(wave, idx, total);
      this.wavesContainer.appendChild(card);
    });

    this.bindWaveInputs();
  }

  bindWaveInputs() {
    this.wavesContainer.querySelectorAll('.delete-wave-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.dataset.idx, 10);
        configStore.removeWave(idx);
        this.renderWaves();
      });
    });

    this.wavesContainer.querySelectorAll('.test-wave-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.dataset.idx, 10);
        this.syncFromInputs();
        const wave = configStore.activeShow.waves[idx];
        if (wave) this.app.engine.scheduler.executeWave(wave);
      });
    });

    this.wavesContainer.querySelectorAll('input[type="range"]').forEach(input => {
      input.addEventListener('input', () => {
        const labelBadge = input.closest('.form-group').querySelector('.value-badge');
        if (labelBadge) {
          const suffix = input.className.includes('delay') || input.className.includes('hang') || input.className.includes('stagger') ? 's' : '';
          labelBadge.textContent = `${input.value}${suffix}`;
        }
      });
    });
  }

  syncFromInputs() {
    const cards = this.wavesContainer.querySelectorAll('.wave-card');
    cards.forEach((card, idx) => {
      const wave = configStore.activeShow.waves[idx];
      ModalCardTemplate.readCardValues(card, wave);
    });
  }

  renderPresets() {
    if (!this.presetsContainer) return;
    this.presetsContainer.innerHTML = '';

    Object.entries(PRESETS).forEach(([key, preset]) => {
      const card = document.createElement('div');
      card.className = 'preset-card';
      card.innerHTML = `
        <div class="preset-title">${preset.name}</div>
        <div class="preset-desc">${preset.desc}</div>
      `;

      card.addEventListener('click', () => {
        configStore.loadPreset(key);
        this.renderWaves();
        this.app.setTheme(preset.theme || 'monochrome');
        this.app.terminal.log(`Đã nạp preset: ${preset.name}`, 'info');
      });

      this.presetsContainer.appendChild(card);
    });
  }

  renderGuide() {
    if (!this.guideContainer) return;
    
    let html = `
      <div class="guide-block">
        <h4 class="guide-heading">${Icons.info} <span>Giải thích thuật ngữ cốt lõi</span></h4>
        <div class="glossary-grid">
    `;

    GUIDE_SECTIONS.glossary.forEach(item => {
      html += `
        <div class="glossary-card">
          <div class="glossary-header">
            <span class="glossary-term">${item.term}</span>
            <span class="glossary-badge">${item.badge}</span>
          </div>
          <p class="glossary-desc">${item.desc.replace(/\n/g, '<br>')}</p>
        </div>
      `;
    });

    html += `
        </div>
      </div>

      <div class="guide-block" style="margin-top: 18px;">
        <h4 class="guide-heading">${Icons.book} <span>Hướng dẫn chi tiết từng bước</span></h4>
        <div class="steps-timeline">
    `;

    GUIDE_SECTIONS.steps.forEach(item => {
      html += `
        <div class="step-item">
          <div class="step-num">${item.step}</div>
          <div class="step-content">
            <div class="step-title">${item.title}</div>
            <div class="step-desc">${item.desc}</div>
          </div>
        </div>
      `;
    });

    html += `
        </div>
      </div>
    `;

    this.guideContainer.innerHTML = html;
  }
}
