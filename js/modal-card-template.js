/**
 * Modal Wave Card HTML Template & Input Deserializer
 * Progressive Disclosure & Vector SVG Icons
 */

import { Icons } from './icons.js';

export class ModalCardTemplate {
  static createWaveCardHTML(wave, idx, totalWaves) {
    return `
      <div class="wave-card-header">
        <div class="wave-badge">
          <span class="wave-num-badge">#${idx + 1}</span>
          <input type="text" class="form-control wave-name-input" data-idx="${idx}" value="${wave.name || `Đợt ${idx + 1}`}" style="width: 220px; font-weight: 500;">
        </div>
        <div class="wave-actions">
          <button class="btn btn-ghost test-wave-btn" data-idx="${idx}" title="Bắn thử riêng đợt này">
            ${Icons.target} <span>Bắn thử</span>
          </button>
          <button class="btn btn-danger delete-wave-btn" data-idx="${idx}" ${totalWaves <= 1 ? 'disabled' : ''} title="Xóa đợt này">
            ${Icons.trash} <span>Xóa</span>
          </button>
        </div>
      </div>

      <!-- Section 1: Timing & Launch -->
      <div class="form-section-title">1. Khung thời gian & Phóng pháo</div>
      <div class="form-grid-3">
        <div class="form-group">
          <label class="form-label">
            <span>Độ trễ tới đợt này</span>
            <span class="value-badge">${wave.delayBefore}s</span>
          </label>
          <input type="range" min="0" max="8" step="0.2" class="wave-delay-input" data-idx="${idx}" value="${wave.delayBefore}">
        </div>

        <div class="form-group">
          <label class="form-label">
            <span>Số lượng quả pháo</span>
            <span class="value-badge">${wave.rocketCount}</span>
          </label>
          <input type="range" min="1" max="8" step="1" class="wave-count-input" data-idx="${idx}" value="${wave.rocketCount}">
        </div>

        <div class="form-group">
          <label class="form-label">
            <span>Giãn cách bắn giữa các quả</span>
            <span class="value-badge">${wave.stagger}s</span>
          </label>
          <input type="range" min="0" max="1.5" step="0.05" class="wave-stagger-input" data-idx="${idx}" value="${wave.stagger}">
        </div>
      </div>

      <!-- Section 2: Multi-Stage Detonation & Physics -->
      <div class="form-section-title">2. Cơ chế nổ đa tầng (Lượt nổ)</div>
      <div class="form-grid-3">
        <div class="form-group">
          <label class="form-label">
            <span>Số LƯỢT nổ (Stages)</span>
            <span class="value-badge">${wave.stages} lượt</span>
          </label>
          <select class="form-control wave-stages-select" data-idx="${idx}">
            <option value="1" ${wave.stages === 1 ? 'selected' : ''}>1 Lượt (Nổ đơn tiêu chuẩn)</option>
            <option value="2" ${wave.stages === 2 ? 'selected' : ''}>2 Lượt (Nổ chùm sao phụ)</option>
            <option value="3" ${wave.stages === 3 ? 'selected' : ''}>3 Lượt (Đa tầng)</option>
          </select>
        </div>

        <div class="form-group">
          <label class="form-label">
            <span>Delay nổ Lượt 2</span>
            <span class="value-badge">${wave.stage2Delay}s</span>
          </label>
          <input type="range" min="0.3" max="2.5" step="0.1" class="wave-stage2-delay-input" data-idx="${idx}" value="${wave.stage2Delay}">
        </div>

        <div class="form-group">
          <label class="form-label">
            <span>Thời gian lơ lửng trên trời</span>
            <span class="value-badge">${wave.hangTime}s</span>
          </label>
          <input type="range" min="0.8" max="5.0" step="0.2" class="wave-hang-input" data-idx="${idx}" value="${wave.hangTime}">
        </div>
      </div>

      <!-- Section 3: Visuals & Shape -->
      <div class="form-section-title">3. Kiểu hình, Bắn chữ & Màu sắc</div>
      <div class="form-grid-3">
        <div class="form-group">
          <label class="form-label">Kiểu hình pháo</label>
          <select class="form-control wave-shape-select" data-idx="${idx}">
            <option value="sphere" ${wave.shape === 'sphere' ? 'selected' : ''}>Cầu tròn (Sphere)</option>
            <option value="heart" ${wave.shape === 'heart' ? 'selected' : ''}>Trái tim ♡ (Heart)</option>
            <option value="star" ${wave.shape === 'star' ? 'selected' : ''}>Ngôi sao ★ (Star)</option>
            <option value="willow" ${wave.shape === 'willow' ? 'selected' : ''}>Hoa liễu rủ (Willow)</option>
            <option value="spiral" ${wave.shape === 'spiral' ? 'selected' : ''}>Xoắn ốc (Spiral)</option>
            <option value="text" ${wave.shape === 'text' ? 'selected' : ''}>Bắn cụm chữ (Custom Text)</option>
          </select>
        </div>

        <div class="form-group">
          <label class="form-label">Nội dung chữ (nếu chọn Bắn chữ)</label>
          <input type="text" class="form-control wave-text-input" data-idx="${idx}" value="${wave.customText || 'I love you ♡'}" placeholder="vd: I love you ♡">
        </div>

        <div class="form-group">
          <label class="form-label">Bảng màu êm dịu</label>
          <select class="form-control wave-palette-select" data-idx="${idx}">
            <option value="monochrome" ${wave.colorPalette === 'monochrome' ? 'selected' : ''}>Monochrome Silver & White</option>
            <option value="soft_rose" ${wave.colorPalette === 'soft_rose' ? 'selected' : ''}>Soft Rose & Blush Pink</option>
            <option value="champagne" ${wave.colorPalette === 'champagne' ? 'selected' : ''}>Champagne Warm Amber</option>
            <option value="nordic_slate" ${wave.colorPalette === 'nordic_slate' ? 'selected' : ''}>Nordic Slate & Ice Blue</option>
            <option value="sage" ${wave.colorPalette === 'sage' ? 'selected' : ''}>Soft Sage Green</option>
          </select>
        </div>
      </div>

      <div class="form-group">
        <label class="form-label">Tập ký tự Terminal sử dụng</label>
        <input type="text" class="form-control wave-chars-input" data-idx="${idx}" value="${wave.characters || '0 . : * @ # % + ~ ^ ! &'}">
      </div>
    `;
  }

  static readCardValues(card, wave) {
    if (!card || !wave) return;
    wave.name = card.querySelector('.wave-name-input').value;
    wave.delayBefore = parseFloat(card.querySelector('.wave-delay-input').value);
    wave.rocketCount = parseInt(card.querySelector('.wave-count-input').value, 10);
    wave.stagger = parseFloat(card.querySelector('.wave-stagger-input').value);
    wave.stages = parseInt(card.querySelector('.wave-stages-select').value, 10);
    wave.stage2Delay = parseFloat(card.querySelector('.wave-stage2-delay-input').value);
    wave.hangTime = parseFloat(card.querySelector('.wave-hang-input').value);
    wave.shape = card.querySelector('.wave-shape-select').value;
    wave.customText = card.querySelector('.wave-text-input').value;
    wave.colorPalette = card.querySelector('.wave-palette-select').value;
    wave.characters = card.querySelector('.wave-chars-input').value;
  }
}
