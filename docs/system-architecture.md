# System Architecture: Terminal ASCII Fireworks

```mermaid
flowchart TD
    UI[Web Browser / UI] --> App[AppController]
    App --> Engine[FireworksEngine (60 FPS Canvas Loop)]
    App --> CLI[TerminalCLI (Command Interpreter)]
    App --> Modal[ModalController (Alt+Q Customizer)]
    App --> Audio[SoundSynthesizer (Web Audio API)]
    
    Engine --> Scheduler[WaveScheduler (Đợt Nổ Sequencer)]
    Scheduler --> Rocket[FireworkRocket]
    Rocket --> MultiStage[Multi-Stage Detonation (Lượt Nổ)]
    Rocket --> Rasterizer[ShapeRasterizer (Text & Shapes)]
    MultiStage --> Particle[AsciiParticle Physics (Hang-Time, Gravity, Color)]
    
    Modal --> Config[ConfigStore & Presets Library]
    Modal --> Template[ModalCardTemplate]
    Config --> Scheduler
```

## Module Breakdown

1. **`js/engine.js`**: Vòng lặp render Canvas 60 FPS, xử lý vệt mờ phosphor, theo dõi số lượng hạt và FPS.
2. **`js/wave-scheduler.js`**: Điều phối dòng thời gian các Đợt nổ (Waves), xử lý độ trễ liên đợt và lặp vô tận (Loop).
3. **`js/firework.js`**: Quỹ đạo phóng từ đáy lên, vệt khói ký tự, kích hoạt nổ Lượt 1 và Lượt 2 thứ cấp.
4. **`js/text-rasterizer.js`**: Quét văn bản (vd: "I love you ♡") và hình học (Trái tim, Ngôi sao, Hoa liễu, Spiral) thành mảng tọa độ hạt 2D.
5. **`js/particle.js`**: Vật lý từng hạt ký tự ASCII: lực cản không khí, thời gian lơ lửng (Hang time), chuyển biến ký tự (`*` -> `:` -> `.`), mờ dần.
6. **`js/audio.js`**: Bộ tổng hợp âm thanh Web Audio API (Whistle, Boom, Crackle, Chime).
7. **`js/terminal.js`**: Nhận lệnh gõ trực tiếp từ bàn phím, lưu lịch sử lệnh, xuất nhật ký thời gian thực.
8. **`js/modal-controller.js` & `js/modal-card-template.js`**: Quản lý giao diện tùy biến Alt + Q, đồng bộ thanh trượt và nạp Preset.
