/**
 * Modal PNG & Doodle Event Helper (<70 lines)
 */

import { ImageRasterizer } from './image-rasterizer.js';
import { DoodleCanvas } from './doodle-canvas.js';

export class ModalDoodleHelper {
  static init(modal, app, controller) {
    const doodleElem = modal.querySelector('#doodleCanvas');
    const doodle = doodleElem ? new DoodleCanvas(doodleElem) : null;

    const clearBtn = modal.querySelector('#clearDoodleBtn');
    if (clearBtn && doodle) clearBtn.addEventListener('click', () => doodle.clear());

    const colorPicker = modal.querySelector('#doodleColorPicker');
    if (colorPicker && doodle) colorPicker.addEventListener('input', (e) => doodle.color = e.target.value);

    const fireDoodleBtn = modal.querySelector('#fireDoodleBtn');
    if (fireDoodleBtn && doodle) {
      fireDoodleBtn.addEventListener('click', () => {
        doodle.extractVectors();
        controller.triggerLivePreview(() => app.fireShape('custom_doodle'));
      });
    }

    const dropzone = modal.querySelector('#pngDropzone');
    const fileInput = modal.querySelector('#pngFileInput');
    if (dropzone && fileInput) {
      dropzone.addEventListener('click', () => fileInput.click());
      fileInput.addEventListener('change', (e) => this.handleFile(modal, e.target.files[0]));
      dropzone.addEventListener('dragover', (e) => { e.preventDefault(); dropzone.style.borderColor = 'var(--border-focus)'; });
      dropzone.addEventListener('dragleave', () => { dropzone.style.borderColor = 'var(--border-medium)'; });
      dropzone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropzone.style.borderColor = 'var(--border-medium)';
        if (e.dataTransfer.files[0]) this.handleFile(modal, e.dataTransfer.files[0]);
      });
    }

    const firePngBtn = modal.querySelector('#firePngBtn');
    if (firePngBtn) {
      firePngBtn.addEventListener('click', () => {
        controller.triggerLivePreview(() => app.fireShape('custom_image'));
      });
    }
  }

  static handleFile(modal, file) {
    ImageRasterizer.processImageFile(file, (vectors, previewUrl) => {
      const wrap = modal.querySelector('#pngPreviewWrap');
      const thumb = modal.querySelector('#pngThumb');
      const stats = modal.querySelector('#pngVectorStats');
      if (wrap && thumb && stats) {
        thumb.src = previewUrl;
        stats.textContent = `${vectors.length} hạt pháo hoa ASCII`;
        wrap.style.display = 'block';
      }
    });
  }
}
