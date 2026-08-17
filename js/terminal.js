/**
 * Interactive Terminal CLI Engine v3.0
 * Command line parser, command history, autocompletion, and system logger
 */

export class TerminalCLI {
  constructor(inputElement, logsElement, appController) {
    this.input = inputElement;
    this.logs = logsElement;
    this.app = appController;
    
    this.history = [];
    this.historyIndex = -1;
    this.commands = [
      'start', 'stop', 'config', 'guide', 'text', 'heart', 'star', 'star8', 
      'saturn', 'butterfly', 'infinity', 'clover', 'crown', 'diamond', 'smiley', 
      'chrysanthemum', 'spiral', 'willow', 'double_ring', 'preset', 'theme', 'sound', 'clear', 'help'
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
    if (match) {
      this.input.value = match + ' ';
    }
  }

  log(message, type = 'info') {
    const entry = document.createElement('div');
    entry.className = 'log-entry';
    
    const now = new Date();
    const timeStr = `[${now.toTimeString().split(' ')[0]}]`;
    
    entry.innerHTML = `
      <span class="log-time">${timeStr}</span>
      <span class="log-${type}">${message}</span>
    `;

    this.logs.appendChild(entry);
    this.logs.scrollTop = this.logs.scrollHeight;

    while (this.logs.children.length > 35) {
      this.logs.removeChild(this.logs.firstChild);
    }
  }

  executeCommand(rawCmd) {
    this.log(`$ ${rawCmd}`, 'text');
    const parts = rawCmd.split(/\s+/);
    const cmd = parts[0].toLowerCase();
    const args = parts.slice(1);

    switch (cmd) {
      case 'start':
      case 'run':
      case 'launch':
        this.app.startShow();
        this.log('Kích hoạt pháo hoa theo kịch bản.', 'info');
        break;

      case 'stop':
        this.app.stopShow();
        this.log('Đã dừng pháo hoa.', 'warn');
        break;

      case 'config':
      case 'settings':
        this.app.toggleModal(true);
        this.log('Mở bảng cấu hình tùy biến chuyên sâu (Alt + Q)...', 'info');
        break;

      case 'guide':
      case 'glossary':
        this.app.openGuide();
        this.log('Mở tài liệu Hướng dẫn & 16+ Kiểu hình...', 'info');
        break;

      case 'text':
        const msg = args.join(' ') || 'I LOVE YOU ♡';
        this.app.fireText(msg);
        this.log(`Bắn cụm chữ: "${msg}"`, 'info');
        break;

      case 'heart':
      case 'star':
      case 'star8':
      case 'saturn':
      case 'butterfly':
      case 'infinity':
      case 'clover':
      case 'crown':
      case 'diamond':
      case 'smiley':
      case 'chrysanthemum':
      case 'spiral':
      case 'willow':
      case 'double_ring':
        this.app.fireShape(cmd);
        this.log(`Bắn pháo hoa hình [${cmd}]`, 'info');
        break;

      case 'preset':
        const presetKey = (args[0] || '').toLowerCase();
        if (this.app.loadPreset(presetKey)) {
          this.log(`Đã nạp preset [${presetKey}]`, 'info');
        } else {
          this.log('Preset: romantic_salvo, cosmic_spectrum', 'error');
        }
        break;

      case 'theme':
        const themeName = (args[0] || '').toLowerCase();
        if (['monochrome', 'slate', 'warm'].includes(themeName)) {
          this.app.setTheme(themeName);
          this.log(`Đã chuyển theme sang [${themeName}]`, 'info');
        } else {
          this.log('Theme: monochrome, slate, warm', 'warn');
        }
        break;

      case 'sound':
        const mode = args[0];
        const enabled = mode === 'off' ? false : (mode === 'on' ? true : null);
        const state = this.app.toggleSound(enabled);
        this.log(`Âm thanh: ${state ? 'Bật' : 'Tắt'}`, 'info');
        break;

      case 'clear':
      case 'cls':
        this.logs.innerHTML = '';
        this.app.clearCanvas();
        this.log('Đã xóa màn hình.', 'info');
        break;

      case 'help':
        this.printHelp();
        break;

      default:
        this.log(`Lệnh không xác định: "${cmd}". Gõ 'help' để xem danh sách lệnh.`, 'error');
    }
  }

  printWelcome() {
    this.log('Terminal ASCII Fireworks v3.0. Press [Alt + Q] for Ultra Customizer.', 'info');
    this.log('Commands: start, text <msg>, saturn, butterfly, heart, star, clover, guide, help.', 'info');
  }

  printHelp() {
    this.log('Commands: start, stop, config, guide, text <msg>, heart, star, saturn, butterfly, infinity, clover, crown, preset <name>, theme, sound, clear, help', 'info');
  }
}
