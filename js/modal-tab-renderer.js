/**
 * Modal Tab HTML Renderers for Click, Display, Presets & Guide (<150 lines)
 */

import { GUIDE_SECTIONS } from './guide-content.js';
import { Icons } from './icons.js';
import { PRESETS } from './presets-catalog.js';
import { configStore } from './config.js';

export class ModalTabRenderer {
  static renderClickSettings(container) {
    if (!container) return;
    const cs = configStore.clickSettings;
    container.innerHTML = `
      <div class="form-grid-3">
        <div class="form-group">
          <label class="form-label">Kiểu hình khi click chuột</label>
          <select class="form-control" id="clickShapeSelect">
            <option value="random" ${cs.shape === 'random' ? 'selected' : ''}>Ngẫu nhiên (Random 16+ shapes)</option>
            <option value="heart" ${cs.shape === 'heart' ? 'selected' : ''}>Trái tim ♡ (Heart)</option>
            <option value="star5" ${cs.shape === 'star5' ? 'selected' : ''}>Ngôi sao 5 cánh ★</option>
            <option value="star8" ${cs.shape === 'star8' ? 'selected' : ''}>Ngôi sao 8 cánh ✦</option>
            <option value="saturn" ${cs.shape === 'saturn' ? 'selected' : ''}>Vành đai Sao Thổ 🪐</option>
            <option value="butterfly" ${cs.shape === 'butterfly' ? 'selected' : ''}>Cánh bướm 🦋</option>
            <option value="infinity" ${cs.shape === 'infinity' ? 'selected' : ''}>Vô cực ∞</option>
            <option value="clover" ${cs.shape === 'clover' ? 'selected' : ''}>Cỏ 4 lá ☘</option>
            <option value="chrysanthemum" ${cs.shape === 'chrysanthemum' ? 'selected' : ''}>Hoa cúc 🌸</option>
            <option value="text" ${cs.shape === 'text' ? 'selected' : ''}>Bắn câu chữ</option>
          </select>
        </div>
        <div class="form-group">
          <label class="form-label">Chữ khi click</label>
          <input type="text" class="form-control" id="clickTextInput" value="${cs.customText || 'I love you ♡'}">
        </div>
        <div class="form-group">
          <label class="form-label">Số Lượt nổ</label>
          <select class="form-control" id="clickStagesSelect">
            <option value="1" ${cs.stages === 1 ? 'selected' : ''}>1 Lượt</option>
            <option value="2" ${cs.stages === 2 ? 'selected' : ''}>2 Lượt</option>
            <option value="3" ${cs.stages === 3 ? 'selected' : ''}>3 Lượt</option>
          </select>
        </div>
      </div>
      <div class="form-grid-3" style="margin-top: 10px;">
        <div class="form-group">
          <label class="form-label">Bảng màu</label>
          <select class="form-control" id="clickPaletteSelect">
            <option value="soft_rose" ${cs.colorPalette === 'soft_rose' ? 'selected' : ''}>Soft Rose & Blush</option>
            <option value="monochrome" ${cs.colorPalette === 'monochrome' ? 'selected' : ''}>Monochrome Silver</option>
            <option value="champagne" ${cs.colorPalette === 'champagne' ? 'selected' : ''}>Champagne Gold</option>
            <option value="cosmic_violet" ${cs.colorPalette === 'cosmic_violet' ? 'selected' : ''}>Cosmic Violet</option>
            <option value="aurora_teal" ${cs.colorPalette === 'aurora_teal' ? 'selected' : ''}>Aurora Teal</option>
            <option value="rainbow_pastel" ${cs.colorPalette === 'rainbow_pastel' ? 'selected' : ''}>Pastel Rainbow</option>
          </select>
        </div>
        <div class="form-group">
          <label class="form-label"><span>Bán kính nổ</span><span class="value-badge">${cs.spread}x</span></label>
          <input type="range" min="0.5" max="3.0" step="0.1" id="clickSpreadInput" value="${cs.spread || 1.3}">
        </div>
        <div class="form-group">
          <label class="form-label"><span>Thời gian lơ lửng</span><span class="value-badge">${cs.hangTime}s</span></label>
          <input type="range" min="0.8" max="6.0" step="0.2" id="clickHangInput" value="${cs.hangTime || 2.5}">
        </div>
      </div>
    `;
  }

  static renderDisplaySettings(container, app) {
    if (!container) return;
    const ds = configStore.displaySettings;
    container.innerHTML = `
      <div class="form-grid-3">
        <div class="form-group">
          <label class="form-label">Tỉ lệ (Canvas Scale)</label>
          <select class="form-control" id="displayScaleSelect">
            <option value="0.75" ${ds.scale === 0.75 ? 'selected' : ''}>0.75x (Thu nhỏ)</option>
            <option value="1.0" ${ds.scale === 1.0 ? 'selected' : ''}>1.0x (Mặc định)</option>
            <option value="1.25" ${ds.scale === 1.25 ? 'selected' : ''}>1.25x (Mở rộng)</option>
            <option value="1.5" ${ds.scale === 1.5 ? 'selected' : ''}>1.5x (To cực đại)</option>
          </select>
        </div>
        <div class="form-group">
          <label class="form-label">Thước đo tọa độ (HUD)</label>
          <select class="form-control" id="displayHudSelect">
            <option value="true" ${ds.showHud ? 'selected' : ''}>Bật thước đo X-Y</option>
            <option value="false" ${!ds.showHud ? 'selected' : ''}>Tắt thước đo</option>
          </select>
        </div>
        <div class="form-group">
          <label class="form-label">Toàn màn hình</label>
          <button class="btn btn-ghost" id="toggleFullscreenBtn" style="margin-top: 2px;">F11 / Fullscreen</button>
        </div>
      </div>
    `;
    const fullBtn = container.querySelector('#toggleFullscreenBtn');
    if (fullBtn) {
      fullBtn.addEventListener('click', () => {
        if (!document.fullscreenElement) document.documentElement.requestFullscreen().catch(() => {});
        else document.exitFullscreen().catch(() => {});
      });
    }
  }

  static renderPresets(container, app, onSelect) {
    if (!container) return;
    container.innerHTML = '';
    Object.entries(PRESETS).forEach(([key, preset]) => {
      const card = document.createElement('div');
      card.className = 'preset-card';
      card.innerHTML = `<div class="preset-title">${preset.name}</div><div class="preset-desc">${preset.desc}</div>`;
      card.addEventListener('click', () => {
        configStore.loadPreset(key);
        if (onSelect) onSelect(preset);
      });
      container.appendChild(card);
    });
  }

  static renderGuide(container) {
    if (!container) return;
    let html = `<div class="guide-block"><h4 class="guide-heading">${Icons.info} <span>Giải thích thuật ngữ & 16+ Kiểu hình</span></h4><div class="glossary-grid">`;
    GUIDE_SECTIONS.glossary.forEach(item => {
      html += `<div class="glossary-card"><div class="glossary-header"><span class="glossary-term">${item.term}</span><span class="glossary-badge">${item.badge}</span></div><p class="glossary-desc">${item.desc.replace(/\n/g, '<br>')}</p></div>`;
    });
    html += `</div></div><div class="guide-block" style="margin-top: 18px;"><h4 class="guide-heading">${Icons.book} <span>Hướng dẫn chi tiết từng bước</span></h4><div class="steps-timeline">`;
    GUIDE_SECTIONS.steps.forEach(item => {
      html += `<div class="step-item"><div class="step-num">${item.step}</div><div class="step-content"><div class="step-title">${item.title}</div><div class="step-desc">${item.desc}</div></div></div>`;
    });
    html += `</div></div>`;
    container.innerHTML = html;
  }
}
