/**
 * Interactive Terminal CLI Engine v4.0 (<195 lines)
 * 35+ Shapes routing, PNG & Doodle commands, command history, and system logger
 */

export class TerminalCLI {
  constructor(inputElement, logsElement, appController) {
    this.input = inputElement;
    this.logs = logsElement;
    this.app = appController;
    
    this.history = [];
    this.historyIndex = -1;
    this.commands = [
      'start', 'stop', 'config', 'guide', 'text', 'rose', 'lotus', 'sunflower', 
      'sakura', 'tulip', 'dandelion', 'square', 'circle', 'triangle', 'hexagon', 
      'octagon', 'star', 'star6', 'star8', 'star12', 'moon', 'sun', 'music', 
      'snow', 'tree', 'saturn', 'butterfly', 'heart', 'infinity', 'crown', 'diamond', 
      'preset', 'theme', 'sound', 'clear', 'help'
    ];

    this.bindEvents();
    this.printWelcome();
  }

  bindEvents() {
    this.input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const cmd = this.input.value.trim();
        if (cmd) {
          this.executeCommand(cmd);
          this.history.push(cmd);
          this.historyIndex = this.history.length;
          this.input.value = '';
        }
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (this.historyIndex > 0) {
          this.historyIndex--;
          this.input.value = this.history[this.historyIndex];
        }
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (this.historyIndex < this.history.length - 1) {
          this.historyIndex++;
          this.input.value = this.history[this.historyIndex];
        } else {
          this.historyIndex = this.history.length;
          this.input.value = '';
        }
      } else if (e.key === 'Tab') {
        e.preventDefault();
        this.autocomplete();
      }
    });
  }

  autocomplete() {
    const val = this.input.value.trim().toLowerCase();
    if (!val) return;
    const match = this.commands.find(c => c.startsWith(val));
    if (match) this.input.value = match + ' ';
  }

  log(message, type = 'info') {
    const entry = document.createElement('div');
    entry.className = 'log-entry';
    const now = new Date();
    const timeStr = `[${now.toTimeString().split(' ')[0]}]`;
    entry.innerHTML = `<span class="log-time">${timeStr}</span><span class="log-${type}">${message}</span>`;
    this.logs.appendChild(entry);
    this.logs.scrollTop = this.logs.scrollHeight;
    while (this.logs.children.length > 35) this.logs.removeChild(this.logs.firstChild);
  }

  executeCommand(rawCmd) {
    this.log(`$ ${rawCmd}`, 'text');
    const parts = rawCmd.split(/\s+/);
    const cmd = parts[0].toLowerCase();
    const args = parts.slice(1);

    switch (cmd) {
      case 'start':
      case 'run':
        this.app.startShow();
        this.log('Kích hoạt pháo hoa theo kịch bản.', 'info');
        break;

      case 'stop':
        this.app.stopShow();
        this.log('Đã dừng pháo hoa.', 'warn');
        break;

      case 'config':
        this.app.toggleModal(true);
        this.log('Mở bảng cấu hình tùy biến chuyên sâu (Alt + Q)...', 'info');
        break;

      case 'guide':
        this.app.openGuide();
        this.log('Mở tài liệu Hướng dẫn & 35+ Kiểu hình...', 'info');
        break;

      case 'text':
        const msg = args.join(' ') || 'I LOVE YOU ♡';
        this.app.fireText(msg);
        this.log(`Bắn cụm chữ: "${msg}"`, 'info');
        break;

      // 35+ Shapes
      case 'rose': case 'lotus': case 'sunflower': case 'sakura': case 'tulip': case 'dandelion':
      case 'square': case 'circle': case 'triangle': case 'hexagon': case 'octagon':
      case 'star': case 'star5': case 'star6': case 'star8': case 'star12': case 'diamond':
      case 'moon': case 'sun': case 'music': case 'music_note': case 'snow': case 'snowflake': case 'tree':
      case 'saturn': case 'butterfly': case 'heart': case 'infinity': case 'crown': case 'smiley':
      case 'chrysanthemum': case 'spiral': case 'willow': case 'double_ring':
        const mappedShape = cmd === 'music' ? 'music_note' : (cmd === 'snow' ? 'snowflake' : cmd);
        this.app.fireShape(mappedShape);
        this.log(`Bắn pháo hoa hình [${cmd}]`, 'info');
        break;

      case 'preset':
        const presetKey = (args[0] || '').toLowerCase();
        if (this.app.loadPreset(presetKey)) this.log(`Đã nạp preset [${presetKey}]`, 'info');
        else this.log('Preset: romantic_salvo, cosmic_spectrum', 'error');
        break;

      case 'theme':
        const themeName = (args[0] || '').toLowerCase();
        if (['monochrome', 'slate', 'warm'].includes(themeName)) {
          this.app.setTheme(themeName);
          this.log(`Theme chuyển sang [${themeName}]`, 'info');
        } else this.log('Theme: monochrome, slate, warm', 'warn');
        break;

      case 'sound':
        const mode = args[0];
        const state = this.app.toggleSound(mode === 'off' ? false : (mode === 'on' ? true : null));
        this.log(`Âm thanh: ${state ? 'Bật' : 'Tắt'}`, 'info');
        break;

      case 'clear':
        this.logs.innerHTML = '';
        this.app.clearCanvas();
        this.log('Đã xóa màn hình.', 'info');
        break;

      case 'help':
        this.log('Lệnh: start, stop, config, guide, text <msg>, rose, lotus, sunflower, square, circle, star12, moon, sun, help', 'info');
        break;

      default:
        this.log(`Lệnh không xác định: "${cmd}". Gõ 'help' để xem danh sách.`, 'error');
    }
  }

  printWelcome() {
    this.log('Terminal ASCII Fireworks v4.0. Press [Alt + Q] for Studio & PNG uploader.', 'info');
    this.log('Shapes: rose, lotus, sunflower, sakura, square, circle, star12, moon, sun, butterfly, saturn...', 'info');
  }
}
