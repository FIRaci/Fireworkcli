# Bảng Tóm Tắt Mã Nguồn (Codebase Summary v3.0)

Dưới đây là danh mục toàn bộ các tệp mã nguồn trong dự án **Terminal ASCII Fireworks v3.0**. Tất cả các tệp đều tuân thủ nghiêm ngặt quy tắc modularization (<200 dòng/tệp).

---

## 📂 Danh mục Tệp Mã Nguồn

| Đường dẫn tệp | Số dòng | Vai trò |
|---|---|---|
| `index.html` | ~210 | Cấu trúc HTML chính, thanh Header, Toolbar, HUD canvas, và Modal 5 tabs |
| `css/terminal.css` | 154 | Giao diện tối tối giản, biến CSS theme, hiệu ứng quét và vignette |
| `css/components.css` | 7 | File tổng hợp import các module component CSS |
| `css/components-toolbar.css` | 198 | Nút bấm, thanh công cụ header và thanh action bar |
| `css/components-cli.css` | 75 | Dòng lệnh CLI Terminal ở đáy màn hình và danh sách log |
| `css/modal.css` | 8 | File tổng hợp import các module modal CSS |
| `css/modal-base.css` | 148 | Khung modal backdrop, dialog, header, tabs bar và footer |
| `css/modal-wave-cards.css` | 136 | Thẻ đợt nổ, thanh trượt range slider, các trường nhập liệu |
| `css/modal-guide-glossary.css` | 143 | Giao diện bảng thuật ngữ, hướng dẫn 5 bước và thẻ preset |
| `js/app.js` | 155 | Điều phối viên ứng dụng, kết nối UI, CLI, Audio và Engine |
| `js/app-ui-bindings.js` | 63 | Lắng nghe sự kiện phím tắt (Alt+Q, Space, Esc) và nút bấm thanh công cụ |
| `js/audio.js` | 196 | Bộ tổng hợp âm thanh procedural sound qua Web Audio API |
| `js/color-palette-engine.js` | 100 | Bộ sinh 256 màu ANSI và xử lý phối màu đa tầng cho từng lượt nổ |
| `js/config.js` | 110 | Store quản lý trạng thái tập trung, liên kết với LocalStorage |
| `js/coordinate-hud.js` | 94 | Thước đo tọa độ trục X (0-100%), trục Y và live cursor tracker |
| `js/engine.js` | 151 | Vòng lặp vẽ Canvas 60 FPS, scale màn hình và click-to-fire |
| `js/firework.js` | 188 | Vòng đời tên lửa, hỗ trợ nổ tới 5 lượt đa tầng với màu riêng từng lượt |
| `js/guide-content.js` | 72 | Dữ liệu nội dung bảng thuật ngữ và hướng dẫn 5 bước |
| `js/icons.js` | 23 | Thư viện 100% Vector SVG Icons sắc nét (1.75px stroke) |
| `js/modal-card-template.js` | 184 | Template HTML thẻ đợt nổ (5 lượt nổ, 16+ shapes, tọa độ X) |
| `js/modal-controller.js` | 171 | Điều khiển sự kiện modal và chuyển đổi 5 tabs chức năng |
| `js/modal-tab-renderer.js` | 132 | Render nội dung các tab Click-to-Fire, Display & HUD, Presets và Guide |
| `js/modal-sync-helper.js` | 53 | Đồng bộ 2 chiều dữ liệu form nhập liệu và ConfigStore |
| `js/particle.js` | 87 | Vật lý hạt ASCII, lực cản không khí, biến đổi ký tự (* -> : -> .) |
| `js/presets-catalog.js` | 118 | Danh mục các kịch bản pháo hoa mẫu |
| `js/shape-catalog-basic.js` | 107 | Công thức toán học hình học cơ bản (Cầu, Tim, Sao, Liễu, Xoắn ốc...) |
| `js/shape-catalog-exotic.js` | 98 | Công thức toán học hình học phức tạp (Sao Thổ, Bướm, Vô cực, Cúc...) |
| `js/shape-catalog.js` | 25 | Bộ gom và xuất khẩu ShapeCatalog cho toàn hệ thống |
| `js/storage-manager.js` | 66 | Quản lý lưu trữ tự động và khe lưu trên LocalStorage |
| `js/terminal.js` | 190 | Bộ phân tích cú pháp dòng lệnh CLI với hỗ trợ 16+ shapes |
| `js/text-rasterizer.js` | 111 | Chuyển văn bản thành hạt ASCII và thuật toán tách từ thành nhiều tên lửa |
| `js/wave-scheduler.js` | 137 | Lập lịch bắn các đợt pháo hoa và phân bổ tọa độ X theo thời gian |
