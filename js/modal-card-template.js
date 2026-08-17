/**
 * Modal Wave Card HTML Template & Input Deserializer v3.0
 * Extended to 5 stages, 16+ shapes, word splitting, and custom X axis positions
 */

import { Icons } from './icons.js';

export class ModalCardTemplate {
  static createWaveCardHTML(wave, idx, totalWaves) {
    const stageColors = wave.stageColors || ['#ffffff', '#f472b6', '#fde68a', '#38bdf8', '#86efac'];

    return `
      <div class="wave-card-header">
        <div class="wave-badge">
          <span class="wave-num-badge">#${idx + 1}</span>
          <input type="text" class="form-control wave-name-input" data-idx="${idx}" value="${wave.name || `Đợt ${idx + 1}`}" style="width: 200px; font-weight: 500;">
        </div>
        <div class="wave-actions">
          <button class="btn btn-ghost test-wave-btn" data-idx="${idx}" title="Bắn thử riêng đợt này">
            ${Icons.target} <span>Bắn thử</span>
          </button>
          <button class="btn btn-danger delete-wave-btn" data-idx="${idx}" ${totalWaves <= 1 ? 'disabled' : ''} title="Xóa đợt">
            ${Icons.trash} <span>Xóa</span>
          </button>
        </div>
      </div>

      <!-- Section 1: Timing & Launch & X-Axis -->
      <div class="form-section-title">1. Thời gian, Số lượng & Tọa độ trục X</div>
      <div class="form-grid-3">
        <div class="form-group">
          <label class="form-label">
            <span>Độ trễ tới đợt (s)</span>
            <span class="value-badge">${wave.delayBefore}s</span>
          </label>
          <input type="range" min="0" max="15" step="0.2" class="wave-delay-input" data-idx="${idx}" value="${wave.delayBefore}">
        </div>

        <div class="form-group">
          <label class="form-label">
            <span>Số quả pháo</span>
            <span class="value-badge">${wave.rocketCount}</span>
          </label>
          <input type="range" min="1" max="16" step="1" class="wave-count-input" data-idx="${idx}" value="${wave.rocketCount}">
        </div>

        <div class="form-group">
          <label class="form-label">
            <span>Giãn cách bắn (s)</span>
            <span class="value-badge">${wave.stagger}s</span>
          </label>
          <input type="range" min="0" max="1.5" step="0.05" class="wave-stagger-input" data-idx="${idx}" value="${wave.stagger}">
        </div>
      </div>

      <div class="form-grid-2" style="margin-top: 6px;">
        <div class="form-group">
          <label class="form-label">Tọa độ trục X (%) (vd: 20, 40, 60, 80 hoặc để trống tự dàn)</label>
          <input type="text" class="form-control wave-x-input" data-idx="${idx}" value="${wave.customXPositions || ''}" placeholder="vd: 20, 40, 60, 80">
        </div>
        <div class="form-group">
          <label class="form-label">
            <span>Độ cao nổ (Trục Y)</span>
            <span class="value-badge">${Math.round((wave.altitude || 0.75) * 100)}%</span>
          </label>
          <input type="range" min="0.2" max="0.95" step="0.02" class="wave-altitude-input" data-idx="${idx}" value="${wave.altitude || 0.75}">
        </div>
      </div>

      <!-- Section 2: Multi-Stage Detonation (Up to 5 Stages) -->
      <div class="form-section-title">2. Cơ chế nổ đa tầng (Tối đa 5 Lượt)</div>
      <div class="form-grid-3">
        <div class="form-group">
          <label class="form-label">
            <span>Số LƯỢT nổ (Stages)</span>
            <span class="value-badge">${wave.stages} lượt</span>
          </label>
          <select class="form-control wave-stages-select" data-idx="${idx}">
            <option value="1" ${wave.stages === 1 ? 'selected' : ''}>1 Lượt (Nổ đơn)</option>
            <option value="2" ${wave.stages === 2 ? 'selected' : ''}>2 Lượt (Nổ phụ tầng 2)</option>
            <option value="3" ${wave.stages === 3 ? 'selected' : ''}>3 Lượt (Đa tầng 3 pha)</option>
            <option value="4" ${wave.stages === 4 ? 'selected' : ''}>4 Lượt (Đa tầng 4 pha)</option>
            <option value="5" ${wave.stages === 5 ? 'selected' : ''}>5 Lượt (Đại tiệc 5 pha)</option>
          </select>
        </div>

        <div class="form-group">
          <label class="form-label">
            <span>Bán kính nổ (Spread)</span>
            <span class="value-badge">${wave.spread}x</span>
          </label>
          <input type="range" min="0.5" max="3.0" step="0.1" class="wave-spread-input" data-idx="${idx}" value="${wave.spread || 1.2}">
        </div>

        <div class="form-group">
          <label class="form-label">
            <span>Thời gian lơ lửng</span>
            <span class="value-badge">${wave.hangTime}s</span>
          </label>
          <input type="range" min="0.8" max="8.0" step="0.2" class="wave-hang-input" data-idx="${idx}" value="${wave.hangTime}">
        </div>
      </div>

      <!-- Section 3: 16+ Shapes, Word Splitting & Colors -->
      <div class="form-section-title">3. Hình dạng (16+ Shapes), Bắn chữ & Màu sắc từng lượt</div>
      <div class="form-grid-3">
        <div class="form-group">
          <label class="form-label">Kiểu hình pháo</label>
          <select class="form-control wave-shape-select" data-idx="${idx}">
            <option value="sphere" ${wave.shape === 'sphere' ? 'selected' : ''}>Cầu tròn (Sphere)</option>
            <option value="heart" ${wave.shape === 'heart' ? 'selected' : ''}>Trái tim ♡ (Heart)</option>
            <option value="star5" ${wave.shape === 'star5' || wave.shape === 'star' ? 'selected' : ''}>Ngôi sao 5 cánh ★ (Star 5)</option>
            <option value="star8" ${wave.shape === 'star8' ? 'selected' : ''}>Ngôi sao 8 cánh ✦ (Star 8)</option>
            <option value="saturn" ${wave.shape === 'saturn' ? 'selected' : ''}>Vành đai Sao Thổ 🪐 (Saturn)</option>
            <option value="double_ring" ${wave.shape === 'double_ring' ? 'selected' : ''}>Vòng tròn đôi ⭕ (Double Ring)</option>
            <option value="butterfly" ${wave.shape === 'butterfly' ? 'selected' : ''}>Cánh bướm 🦋 (Butterfly)</option>
            <option value="chrysanthemum" ${wave.shape === 'chrysanthemum' ? 'selected' : ''}>Hoa cúc đại đóa 🌸 (Chrysanthemum)</option>
            <option value="willow" ${wave.shape === 'willow' ? 'selected' : ''}>Hoa liễu rủ 🌾 (Willow)</option>
            <option value="spiral" ${wave.shape === 'spiral' ? 'selected' : ''}>Xoắn ốc Galaxy 🌀 (Spiral)</option>
            <option value="diamond" ${wave.shape === 'diamond' ? 'selected' : ''}>Kim cương ◆ (Diamond)</option>
            <option value="clover" ${wave.shape === 'clover' ? 'selected' : ''}>Cỏ 4 lá ☘ (Clover)</option>
            <option value="infinity" ${wave.shape === 'infinity' ? 'selected' : ''}>Vô cực ∞ (Infinity)</option>
            <option value="crown" ${wave.shape === 'crown' ? 'selected' : ''}>Vương miện 👑 (Crown)</option>
            <option value="smiley" ${wave.shape === 'smiley' ? 'selected' : ''}>Mặt cười :) (Smiley)</option>
            <option value="text" ${wave.shape === 'text' ? 'selected' : ''}>Bắn câu chữ (Custom Text)</option>
          </select>
        </div>

        <div class="form-group">
          <label class="form-label">Nội dung chữ (nếu chọn Bắn chữ)</label>
          <input type="text" class="form-control wave-text-input" data-idx="${idx}" value="${wave.customText || 'I love you ♡'}" placeholder="vd: I LOVE YOU ♡">
        </div>

        <div class="form-group">
          <label class="form-label">Bảng màu chủ đạo</label>
          <select class="form-control wave-palette-select" data-idx="${idx}">
            <option value="monochrome" ${wave.colorPalette === 'monochrome' ? 'selected' : ''}>Monochrome Silver & White</option>
            <option value="soft_rose" ${wave.colorPalette === 'soft_rose' ? 'selected' : ''}>Soft Rose & Blush Pink</option>
            <option value="champagne" ${wave.colorPalette === 'champagne' ? 'selected' : ''}>Champagne Warm Amber</option>
            <option value="nordic_slate" ${wave.colorPalette === 'nordic_slate' ? 'selected' : ''}>Nordic Slate & Ice</option>
            <option value="sage" ${wave.colorPalette === 'sage' ? 'selected' : ''}>Soft Sage Green</option>
            <option value="sunset" ${wave.colorPalette === 'sunset' ? 'selected' : ''}>Sunset Coral & Gold</option>
            <option value="cosmic_violet" ${wave.colorPalette === 'cosmic_violet' ? 'selected' : ''}>Cosmic Violet & Indigo</option>
            <option value="aurora_teal" ${wave.colorPalette === 'aurora_teal' ? 'selected' : ''}>Aurora Teal & Mint</option>
            <option value="rainbow_pastel" ${wave.colorPalette === 'rainbow_pastel' ? 'selected' : ''}>Pastel Rainbow Mix</option>
          </select>
        </div>
      </div>

      <div class="form-grid-2" style="margin-top: 6px;">
        <label class="checkbox-label" style="display: flex; align-items: center; gap: 8px; font-size: 11.5px; color: var(--text-secondary); cursor: pointer;">
          <input type="checkbox" class="wave-split-words-input" data-idx="${idx}" ${wave.splitWords ? 'checked' : ''}>
          <span>Tách cụm từ thành nhiều tên lửa riêng biệt theo trục X (Space-split)</span>
        </label>
        <div class="form-group">
          <label class="form-label">Màu riêng từng lượt (vd: #ffffff, #f472b6, #fde68a...)</label>
          <input type="text" class="form-control wave-stage-colors-input" data-idx="${idx}" value="${stageColors.join(', ')}">
        </div>
      </div>
    `;
  }

  static readCardValues(card, wave) {
    if (!card || !wave) return;
    wave.name = card.querySelector('.wave-name-input').value;
    wave.delayBefore = parseFloat(card.querySelector('.wave-delay-input').value);
    wave.rocketCount = parseInt(card.querySelector('.wave-count-input').value, 10);
    wave.stagger = parseFloat(card.querySelector('.wave-stagger-input').value);
    wave.customXPositions = card.querySelector('.wave-x-input').value;
    wave.altitude = parseFloat(card.querySelector('.wave-altitude-input').value);
    wave.stages = parseInt(card.querySelector('.wave-stages-select').value, 10);
    wave.spread = parseFloat(card.querySelector('.wave-spread-input').value);
    wave.hangTime = parseFloat(card.querySelector('.wave-hang-input').value);
    wave.shape = card.querySelector('.wave-shape-select').value;
    wave.customText = card.querySelector('.wave-text-input').value;
    wave.colorPalette = card.querySelector('.wave-palette-select').value;
    wave.splitWords = card.querySelector('.wave-split-words-input').checked;
    
    const stageColorStr = card.querySelector('.wave-stage-colors-input').value;
    if (stageColorStr) {
      wave.stageColors = stageColorStr.split(/[,;\s]+/).filter(c => c.startsWith('#'));
    }
  }
}
