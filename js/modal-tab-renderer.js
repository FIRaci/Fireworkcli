/**
 * Modal Tab HTML Renderers v4.0 (<180 lines)
 * Click-to-Fire, Display, Presets, Guide, and PNG/Doodle Customizer
 */

import { GUIDE_SECTIONS } from './guide-content.js';
import { Icons } from './icons.js';
import { PRESETS } from './presets-catalog.js';
import { configStore } from './config.js';

export class ModalTabRenderer {
  static renderPngDoodleTab(container, app) {
    if (!container) return;
    container.innerHTML = `
      <div class="form-section-title">1. Tải ảnh PNG / JPG (PNG to Fireworks ASCII)</div>
      <div class="png-upload-dropzone" id="pngDropzone">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
        <span style="font-size: 12px; font-weight: 500;">Kéo thả file ảnh PNG/JPG vào đây hoặc bấm để chọn</span>
        <span style="font-size: 10.5px; color: var(--text-dim);">Hệ thống tự động quét alpha và tạo pháo hoa giữ nguyên màu gốc của ảnh</span>
        <input type="file" id="pngFileInput" accept="image/png, image/jpeg, image/webp" style="display: none;">
      </div>

      <div id="pngPreviewWrap" style="display: none; margin-top: 8px;">
        <div class="png-preview-box">
          <img id="pngThumb" class="png-preview-thumb" alt="Preview">
          <div style="flex: 1; display: flex; flex-direction: column; gap: 4px;">
            <span style="font-size: 11.5px; font-weight: 600; color: var(--text-primary);">Ảnh đã sẵn sàng</span>
            <span style="font-size: 10.5px; color: var(--text-dim);" id="pngVectorStats">0 hạt vector</span>
          </div>
          <button class="btn btn-primary" id="firePngBtn">${Icons.target} <span>Bắn thử ảnh này</span></button>
        </div>
      </div>

      <div class="form-section-title" style="margin-top: 14px;">2. Tự vẽ hình pháo hoa (Doodle Drawing Canvas)</div>
      <div class="doodle-container">
        <div class="doodle-canvas-wrap">
          <canvas id="doodleCanvas" width="160" height="160"></canvas>
          <span style="font-size: 10.5px; color: var(--text-dim);">Vẽ trực tiếp bằng chuột/cảm ứng</span>
        </div>
        <div class="doodle-controls">
          <div class="form-group">
            <label class="form-label">Màu nét vẽ</label>
            <input type="color" id="doodleColorPicker" value="#ededed" style="background: none; border: none; width: 40px; height: 28px; cursor: pointer;">
          </div>
          <div style="display: flex; gap: 8px;">
            <button class="btn btn-ghost" id="clearDoodleBtn">${Icons.trash} <span>Xóa vẽ lại</span></button>
            <button class="btn btn-primary" id="fireDoodleBtn">${Icons.target} <span>Bắn thử nét vẽ</span></button>
          </div>
        </div>
      </div>
    `;
  }

  static renderClickSettings(container) {
    if (!container) return;
    const cs = configStore.clickSettings;
    container.innerHTML = `
      <div class="form-grid-3">
        <div class="form-group">
          <label class="form-label">Kiểu hình khi click</label>
          <select class="form-control" id="clickShapeSelect">
            <option value="random" ${cs.shape === 'random' ? 'selected' : ''}>Ngẫu nhiên (35+ shapes)</option>
            <option value="custom_image" ${cs.shape === 'custom_image' ? 'selected' : ''}>Ảnh PNG đã tải lên</option>
            <option value="custom_doodle" ${cs.shape === 'custom_doodle' ? 'selected' : ''}>Nét vẽ Doodle</option>
            <option value="heart" ${cs.shape === 'heart' ? 'selected' : ''}>Trái tim ♡ (Heart)</option>
            <option value="rose" ${cs.shape === 'rose' ? 'selected' : ''}>Hoa hồng 🌹 (Rose)</option>
            <option value="lotus" ${cs.shape === 'lotus' ? 'selected' : ''}>Hoa sen 🪷 (Lotus)</option>
            <option value="sunflower" ${cs.shape === 'sunflower' ? 'selected' : ''}>Hoa hướng dương 🌻</option>
            <option value="sakura" ${cs.shape === 'sakura' ? 'selected' : ''}>Hoa anh đào 🌸</option>
            <option value="square" ${cs.shape === 'square' ? 'selected' : ''}>Hình vuông ⏹</option>
            <option value="circle" ${cs.shape === 'circle' ? 'selected' : ''}>Hình tròn ⭕</option>
            <option value="star5" ${cs.shape === 'star5' ? 'selected' : ''}>Ngôi sao 5 cánh ★</option>
            <option value="moon" ${cs.shape === 'moon' ? 'selected' : ''}>Mặt trăng 🌙</option>
            <option value="saturn" ${cs.shape === 'saturn' ? 'selected' : ''}>Sao Thổ 🪐</option>
            <option value="butterfly" ${cs.shape === 'butterfly' ? 'selected' : ''}>Cánh bướm 🦋</option>
            <option value="text" ${cs.shape === 'text' ? 'selected' : ''}>Bắn câu chữ</option>
          </select>
        </div>
        <div class="form-group">
          <label class="form-label">Chữ khi click</label>
          <input type="text" class="form-control" id="clickTextInput" value="${cs.customText || 'I LOVE YOU ♡'}">
        </div>
        <div class="form-group">
          <label class="form-label">Số Lượt nổ khi click</label>
          <input type="number" min="1" max="20" class="form-control" id="clickStagesInput" value="${cs.stages || 2}">
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
            <option value="rainbow_pastel" ${cs.colorPalette === 'rainbow_pastel' ? 'selected' : ''}>Pastel Rainbow</option>
          </select>
        </div>
        <div class="form-group">
          <label class="form-label"><span>Bán kính nổ</span><span class="value-badge">${cs.spread}x</span></label>
          <input type="range" min="0.5" max="3.5" step="0.1" id="clickSpreadInput" value="${cs.spread || 1.3}">
        </div>
        <div class="form-group">
          <label class="form-label"><span>Thời gian lơ lửng</span><span class="value-badge">${cs.hangTime}s</span></label>
          <input type="range" min="0.8" max="8.0" step="0.2" id="clickHangInput" value="${cs.hangTime || 2.5}">
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
          <label class="form-label">Tỉ lệ hiển thị (Canvas Scale)</label>
          <select class="form-control" id="displayScaleSelect">
            <option value="0.75" ${ds.scale === 0.75 ? 'selected' : ''}>0.75x (Thu nhỏ)</option>
            <option value="1.0" ${ds.scale === 1.0 ? 'selected' : ''}>1.0x (Mặc định)</option>
            <option value="1.25" ${ds.scale === 1.25 ? 'selected' : ''}>1.25x (Mở rộng)</option>
            <option value="1.5" ${ds.scale === 1.5 ? 'selected' : ''}>1.5x (To cực đại)</option>
          </select>
        </div>
        <div class="form-group">
          <label class="form-label">Thước đo tọa độ (HUD Grid)</label>
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
    let html = `<div class="guide-block"><h4 class="guide-heading">${Icons.info} <span>Giải thích thuật ngữ & 35+ Kiểu hình</span></h4><div class="glossary-grid">`;
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
