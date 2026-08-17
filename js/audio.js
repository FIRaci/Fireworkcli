/**
 * Web Audio API Sound FX Synthesizer
 * Procedural retro/terminal sounds: launch whoosh, explosive boom, sparkle crackle, chime
 */

class SoundSynthesizer {
  constructor() {
    this.ctx = null;
    this.enabled = true;
    this.masterVolume = 0.6;
    this.isInitialized = false;
  }

  init() {
    if (this.isInitialized) return;
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.ctx = new AudioContext();
        this.isInitialized = true;
      }
    } catch (e) {
      console.warn('Web Audio API not supported or blocked:', e);
    }
  }

  ensureContext() {
    this.init();
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  toggleSound(enable = null) {
    this.enabled = enable !== null ? enable : !this.enabled;
    return this.enabled;
  }

  setVolume(val) {
    this.masterVolume = Math.max(0, Math.min(1, val));
  }

  /**
   * Launch Whistle / Whoosh Sound
   */
  playLaunch(pitch = 1.0) {
    if (!this.enabled) return;
    this.ensureContext();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(150 * pitch, now);
      osc.frequency.exponentialRampToValueAtTime(700 * pitch, now + 0.45);

      gain.gain.setValueAtTime(0.01, now);
      gain.gain.linearRampToValueAtTime(0.18 * this.masterVolume, now + 0.1);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.55);
    } catch (e) {
      // Audio error fallback
    }
  }

  /**
   * Explosion Bass Boom
   */
  playExplosion(intensity = 1.0, isSecondary = false) {
    if (!this.enabled) return;
    this.ensureContext();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const duration = isSecondary ? 0.4 : 0.8;

      // 1. Noise Buffer for the explosive burst
      const bufferSize = Math.floor(this.ctx.sampleRate * duration);
      const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }

      const whiteNoise = this.ctx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;

      // Filter noise for low-end thud
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(isSecondary ? 600 : 350, now);
      filter.frequency.exponentialRampToValueAtTime(50, now + duration);

      const noiseGain = this.ctx.createGain();
      const vol = (isSecondary ? 0.15 : 0.35) * this.masterVolume * intensity;
      noiseGain.gain.setValueAtTime(vol, now);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, now + duration);

      whiteNoise.connect(filter);
      filter.connect(noiseGain);
      noiseGain.connect(this.ctx.destination);

      // 2. Sub-bass sine oscillator for body resonance
      const osc = this.ctx.createOscillator();
      const oscGain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(isSecondary ? 120 : 90, now);
      osc.frequency.exponentialRampToValueAtTime(30, now + (duration * 0.7));

      oscGain.gain.setValueAtTime(vol * 0.8, now);
      oscGain.gain.exponentialRampToValueAtTime(0.001, now + (duration * 0.7));

      osc.connect(oscGain);
      oscGain.connect(this.ctx.destination);

      whiteNoise.start(now);
      osc.start(now);
      whiteNoise.stop(now + duration);
      osc.stop(now + duration);

      // Play crackles
      if (!isSecondary) {
        this.playCrackle(now + 0.15, 6);
      }
    } catch (e) {}
  }

  /**
   * Sparkle / Crackle micro-clicks
   */
  playCrackle(startTime, count = 5) {
    if (!this.enabled || !this.ctx) return;
    try {
      for (let i = 0; i < count; i++) {
        const clickTime = startTime + Math.random() * 0.4;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'square';
        osc.frequency.setValueAtTime(800 + Math.random() * 1200, clickTime);

        gain.gain.setValueAtTime(0.05 * this.masterVolume, clickTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, clickTime + 0.03);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(clickTime);
        osc.stop(clickTime + 0.04);
      }
    } catch (e) {}
  }

  /**
   * Chime Chord (e.g. for Text / Romantic Love Bursts)
   */
  playChimeChord() {
    if (!this.enabled) return;
    this.ensureContext();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6 (Bright Chord)

      notes.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const noteTime = now + idx * 0.08;

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, noteTime);

        gain.gain.setValueAtTime(0.12 * this.masterVolume, noteTime);
        gain.gain.exponentialRampToValueAtTime(0.001, noteTime + 1.2);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(noteTime);
        osc.stop(noteTime + 1.3);
      });
    } catch (e) {}
  }
}

export const soundFx = new SoundSynthesizer();
