/**
 * Modal Input Synchronizer v4.0 (<70 lines)
 */

import { configStore } from './config.js';
import { ModalCardTemplate } from './modal-card-template.js';

export class ModalSyncHelper {
  static syncAll(modal, app) {
    const wavesContainer = modal.querySelector('#wavesContainer');
    if (wavesContainer) {
      const cards = wavesContainer.querySelectorAll('.wave-card');
      cards.forEach((card, idx) => {
        const wave = configStore.activeShow.waves[idx];
        ModalCardTemplate.readCardValues(card, wave);
      });
    }

    const clickContainer = modal.querySelector('#clickContainer');
    if (clickContainer) {
      const cs = configStore.clickSettings;
      const shapeSel = clickContainer.querySelector('#clickShapeSelect');
      const textInp = clickContainer.querySelector('#clickTextInput');
      const stagesInp = clickContainer.querySelector('#clickStagesInput');
      const palSel = clickContainer.querySelector('#clickPaletteSelect');
      const spreadInp = clickContainer.querySelector('#clickSpreadInput');
      const hangInp = clickContainer.querySelector('#clickHangInput');

      if (shapeSel) cs.shape = shapeSel.value;
      if (textInp) cs.customText = textInp.value;
      if (stagesInp) cs.stages = Math.max(1, parseInt(stagesInp.value, 10) || 1);
      if (palSel) cs.colorPalette = palSel.value;
      if (spreadInp) cs.spread = parseFloat(spreadInp.value);
      if (hangInp) cs.hangTime = parseFloat(hangInp.value);
    }

    const displayContainer = modal.querySelector('#displayContainer');
    if (displayContainer) {
      const ds = configStore.displaySettings;
      const scaleSel = displayContainer.querySelector('#displayScaleSelect');
      const hudSel = displayContainer.querySelector('#displayHudSelect');

      if (scaleSel) {
        ds.scale = parseFloat(scaleSel.value);
        app.engine.setScale(ds.scale);
      }
      if (hudSel) {
        ds.showHud = hudSel.value === 'true';
        app.engine.hud.toggle(ds.showHud);
      }
    }
  }
}
