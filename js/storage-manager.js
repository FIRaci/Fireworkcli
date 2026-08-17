/**
 * LocalStorage Persistence & Slot Manager
 */

export class StorageManager {
  static STORAGE_KEY_ACTIVE = 'fireworks_ascii_active_v3';
  static STORAGE_KEY_SLOTS = 'fireworks_ascii_slots_v3';

  static saveActive(config) {
    try {
      localStorage.setItem(this.STORAGE_KEY_ACTIVE, JSON.stringify(config));
      return true;
    } catch (e) {
      console.warn('LocalStorage save failed:', e);
      return false;
    }
  }

  static loadActive() {
    try {
      const data = localStorage.getItem(this.STORAGE_KEY_ACTIVE);
      return data ? JSON.parse(data) : null;
    } catch (e) {
      return null;
    }
  }

  static saveSlot(slotName, config) {
    try {
      const slots = this.getSlots();
      slots[slotName] = {
        name: slotName,
        savedAt: new Date().toISOString(),
        config: config
      };
      localStorage.setItem(this.STORAGE_KEY_SLOTS, JSON.stringify(slots));
      return true;
    } catch (e) {
      return false;
    }
  }

  static loadSlot(slotName) {
    const slots = this.getSlots();
    return slots[slotName] ? slots[slotName].config : null;
  }

  static getSlots() {
    try {
      const data = localStorage.getItem(this.STORAGE_KEY_SLOTS);
      return data ? JSON.parse(data) : {};
    } catch (e) {
      return {};
    }
  }

  static clearStorage() {
    try {
      localStorage.removeItem(this.STORAGE_KEY_ACTIVE);
      localStorage.removeItem(this.STORAGE_KEY_SLOTS);
      return true;
    } catch (e) {
      return false;
    }
  }
}
