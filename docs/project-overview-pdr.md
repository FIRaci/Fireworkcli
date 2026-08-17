# Project Overview: Terminal ASCII Fireworks

## 1. Mục tiêu Dự án
Xây dựng ứng dụng web giả lập Terminal phong cách Retro-Cyberpunk/Hacker với hiệu ứng pháo hoa ASCII, nổ thành các ký tự dấu câu và ký tự đặc biệt (`0`, `.`, `:`, `*`, `@`, `#`, `~`, `^`, `!`, `&`, v.v.), hỗ trợ bảng điều khiển tùy biến đa tầng kích hoạt qua phím tắt **Alt + Q**.

## 2. Các tính năng cốt lõi
- **Màn hình CRT Terminal**: Hiệu ứng quét dòng CRT scanlines, flicker, phông chữ Monospace `JetBrains Mono`, 5 Theme màu.
- **Pháo hoa Đa Tầng (Multi-Stage Bursts / Lượt nổ)**: Nổ 1 lượt đơn hoặc nhiều lượt (Lượt 2 nổ chùm sao thứ cấp lấp lánh sau x giây tùy chỉnh).
- **Trình điều phối Đợt nổ (Waves Sequencer)**: Thiết lập nhiều đợt bắn nối tiếp nhau với thời gian delay tùy ý giữa các đợt.
- **Bắn chữ tùy chỉnh & Hình học ("I love you ♡")**: Vector rasterizer chuyển đổi câu chữ hoặc biểu tượng thành ma trận hạt pháo hoa ASCII lơ lửng trên không trung.
- **Bảng điều khiển Alt + Q**: Tùy biến toàn bộ thông số, nạp Presets, xuất/nhập cấu hình JSON, bắn thử nghiệm trực tiếp.
- **Web Audio FX Synthesizer**: Âm thanh lập trình thủ tục không phụ thuộc tài nguyên bên ngoài.
- **Dòng lệnh CLI tương tác**: Hỗ trợ nhập lệnh trực tiếp vào terminal (`start`, `config`, `text`, `preset`, `theme`, `clear`, `help`).
