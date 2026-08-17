/**
 * Interactive Coordinate HUD & Guide System
 * Renders X-axis (0-100%), Y-altitude indicators, and cursor coordinate tracker
 */

export class CoordinateHUD {
  constructor(canvas) {
    this.canvas = canvas;
    this.enabled = true;
    this.mouseX = 0;
    this.mouseY = 0;
    this.isHovering = false;

    this.bindEvents();
  }

  bindEvents() {
    this.canvas.addEventListener('pointermove', (e) => {
      const rect = this.canvas.getBoundingClientRect();
      this.mouseX = e.clientX - rect.left;
      this.mouseY = e.clientY - rect.top;
      this.isHovering = true;
    });

    this.canvas.addEventListener('pointerleave', () => {
      this.isHovering = false;
    });
  }

  toggle(enable = null) {
    this.enabled = enable !== null ? enable : !this.enabled;
    return this.enabled;
  }

  draw(ctx, width, height) {
    if (!this.enabled) return;

    ctx.save();
    ctx.font = '10px "JetBrains Mono", monospace';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.25)';
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
    ctx.lineWidth = 1;

    // 1. X-Axis Ticks (Bottom)
    const xSteps = [0.1, 0.25, 0.5, 0.75, 0.9];
    xSteps.forEach(ratio => {
      const x = width * ratio;
      ctx.beginPath();
      ctx.moveTo(x, height - 20);
      ctx.lineTo(x, height - 12);
      ctx.stroke();

      ctx.textAlign = 'center';
      ctx.textBaseline = 'bottom';
      ctx.fillText(`X:${Math.round(ratio * 100)}%`, x, height - 4);
    });

    // 2. Y-Altitude Ticks (Left & Right)
    const ySteps = [0.25, 0.5, 0.75];
    ySteps.forEach(ratio => {
      const y = height * (1 - ratio);
      ctx.beginPath();
      ctx.moveTo(10, y);
      ctx.lineTo(18, y);
      ctx.moveTo(width - 18, y);
      ctx.lineTo(width - 10, y);
      ctx.stroke();

      ctx.textAlign = 'left';
      ctx.textBaseline = 'middle';
      ctx.fillText(`Alt:${Math.round(ratio * 100)}%`, 22, y);
    });

    // 3. Live Cursor Coordinates Badge
    if (this.isHovering) {
      const xPct = Math.round((this.mouseX / width) * 100);
      const yPct = Math.round(((height - this.mouseY) / height) * 100);
      const label = `[X: ${xPct}% | Alt: ${yPct}%]`;

      ctx.fillStyle = 'rgba(18, 20, 26, 0.75)';
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
      const textWidth = ctx.measureText(label).width + 12;
      ctx.fillRect(this.mouseX + 12, this.mouseY - 18, textWidth, 16);
      ctx.strokeRect(this.mouseX + 12, this.mouseY - 18, textWidth, 16);

      ctx.fillStyle = 'rgba(255, 255, 255, 0.75)';
      ctx.textAlign = 'left';
      ctx.textBaseline = 'middle';
      ctx.fillText(label, this.mouseX + 18, this.mouseY - 10);
    }

    ctx.restore();
  }
}
