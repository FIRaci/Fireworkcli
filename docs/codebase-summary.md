# Codebase Summary: Terminal ASCII Fireworks

## Tóm tắt tệp mã nguồn

| Đường dẫn | Mô tả |
|---|---|
| `index.html` | Cấu trúc DOM chính, hiệu ứng màn hình CRT, thanh điều khiển, CLI prompt và Modal Alt+Q. |
| `README.md` | Tài liệu giới thiệu, hướng dẫn sử dụng và bảng phím tắt. |
| `css/terminal.css` | Giao diện nền đen CRT, hiệu ứng quét dòng, định nghĩa 5 theme màu. |
| `css/components.css` | Giao diện thanh công cụ, ô nhập lệnh CLI, badge trạng thái và nút bấm. |
| `css/modal.css` | Giao diện Modal tùy biến Alt+Q, danh sách đợt nổ và thanh trượt thông số. |
| `js/app.js` | Điều phối khởi tạo ứng dụng, kết nối Engine, CLI, Modal và Audio. |
| `js/app-ui-bindings.js` | Đăng ký sự kiện các nút trên thanh công cụ và phím tắt toàn cục (Alt+Q, Space, Esc). |
| `js/config.js` | Quản lý trạng thái cấu hình hiện tại, danh sách Preset và xuất/nhập JSON. |
| `js/audio.js` | Trình tổng hợp âm thanh thủ tục Web Audio API (không cần file âm thanh ngoài). |
| `js/text-rasterizer.js` | Chuyển đổi câu chữ ("I love you ♡") và hình học thành tọa độ hạt ASCII. |
| `js/particle.js` | Lớp hạt ký tự ASCII với hiệu ứng lơ lửng (Hang time), trọng lực và đổi ký tự. |
| `js/firework.js` | Quả pháo phóng từ đáy màn hình, nổ đa tầng (Lượt 1 và Lượt 2). |
| `js/wave-scheduler.js` | Trình lên lịch các đợt nổ (Waves) với khoảng delay tùy chỉnh giữa các đợt. |
| `js/engine.js` | Vòng lặp Canvas 60 FPS, vẽ vệt mờ chuyển động và quản lý mảng pháo/hạt. |
| `js/terminal.js` | Bộ xử lý lệnh Terminal CLI với tính năng lịch sử (Up/Down) và Tab autocomplete. |
| `js/modal-controller.js` | Điều khiển đóng/mở và chuyển tab trong Modal Alt+Q. |
| `js/modal-card-template.js` | Tạo HTML thẻ đợt nổ và đồng bộ dữ liệu hai chiều giữa UI và Model. |
