# Terminal ASCII Fireworks (Pháo Hoa Terminal & Alt+Q Customizer)

Ứng dụng web giả lập Terminal phong cách Retro-Cyberpunk/Hacker với hiệu ứng pháo hoa ASCII hoành tráng, bắn từ dưới lên trên và nổ thành các ký tự đặc biệt (`0`, `.`, `:`, `*`, `@`, `#`, `~`, `^`, `!`, `&`, v.v.), tích hợp bảng điều khiển tùy biến chuyên sâu **Alt + Q**.

---

## ✨ Tính năng nổi bật

1. **Hiệu ứng Terminal & Màn hình CRT cổ điển**:
   - Phông chữ Monospace sắc nét `JetBrains Mono`.
   - Hiệu ứng quét dòng CRT Scanlines, lóa sáng phosphor và motion blur chân thực.
   - Hỗ trợ 5 Theme màu: **Matrix Neon Green**, **Cyberpunk Cyan/Purple**, **Amber CRT**, **Dracula**, **Monokai**.

2. **Cơ chế Vật lý Pháo hoa ASCII & Đa Tầng (Multi-Stage Burst)**:
   - **Vệt bắn (Launch Trail)**: Pháo bay từ đáy màn hình để lại các vệt ký tự `|`, `^`, `!`, `:`, `.`, `o`.
   - **Lượt nổ (Stages)**:
     - *Lượt = 1*: Nổ bung các chùm hạt theo hình dạng hoặc chữ.
     - *Lượt = 2, 3*: Sau `x` giây do người dùng tùy chỉnh, các hạt tiếp tục phát nổ chùm sao thứ cấp lấp lánh (Secondary Explosion).
   - **Thời gian giữ nguyên trên trời (Hang time)**: Điều chỉnh thời gian lơ lửng và độ trôi bồng bềnh của các hạt trước khi rơi xuống.
   - **Ký tự nổ**: Nổ bung thành các ký tự `0`, `.`, `:`, `*`, `@`, `#`, `%`, `+`, `~`, `^`, `!`, `&`, v.v.

3. **Phân biệt rõ ràng Đợt nổ (Waves) & Lượt nổ (Stages)**:
   - **Đợt nổ (Wave)**: Cụm pháo hoa bắn theo trình tự thời gian (vd: Đợt 1 -> chờ 2s -> Đợt 2 -> chờ 1s -> Đợt 3).
   - **Lượt nổ (Stages)**: Số lần nổ liên tiếp của từng quả pháo sau khi lên đỉnh quỹ đạo.

4. **Bắn chữ tùy chỉnh & Hình dạng đặc biệt ("I love you ♡")**:
   - Hỗ trợ bắn bất kỳ câu chữ nào lên bầu trời: `I love you ♡`, `HAPPY NEW YEAR`, `2026`, v.v.
   - Tạo hình pháo hoa: **Trái tim ♡**, **Ngôi sao ★**, **Hoa liễu rủ (Willow)**, **Xoắn ốc Galaxy (Spiral)**, **Cầu tròn (Sphere)**.

5. **Bảng điều khiển Tùy biến Chuyên sâu (Alt + Q)**:
   - Nhấn `Alt + Q` từ bất kỳ đâu để mở Modal cấu hình trực quan.
   - Thêm/Xóa/Sửa các đợt bắn (Waves).
   - Tinh chỉnh số lượng pháo, độ trễ, số lượt nổ, delay lượt 2, thời gian lơ lửng, độ cao, bảng màu.
   - Nút bắn thử từng đợt hoặc bắn thử toàn bộ ngay trong Modal.
   - Kịch bản mẫu (Presets): *Romantic Love ("I love you ♡")*, *Grand Finale*, *Matrix Binary Storm*.
   - Trích xuất / Nạp cấu hình JSON.

6. **Hệ thống Âm thanh Thủ tục (Web Audio API)**:
   - Tự tạo âm thanh lập trình: tiếng rít phóng pháo, tiếng nổ trầm vang, tiếng lách tách kim tuyến và hợp âm chuông du dương.

7. **Dòng lệnh CLI tương tác trực tiếp**:
   - Gõ `start`, `stop`, `config`, `text <nội dung>`, `heart`, `star`, `preset <tên>`, `theme <tên>`, `sound on/off`, `help`.

---

## 🚀 Hướng dẫn khởi chạy

Chỉ cần mở file `index.html` trong trình duyệt web bất kỳ hoặc phục vụ qua web server tĩnh:

```bash
# Sử dụng Python HTTP server
python -m http.server 8080

# Hoặc sử dụng npx serve
npx serve .
```

---

## ⌨ Phím tắt hữu ích

- **`Alt + Q`**: Mở / Đóng Bảng tùy biến chi tiết.
- **`Enter`**: Thực thi lệnh đã gõ trong ô Terminal CLI.
- **`Space`**: Bắn nhanh một quả pháo ngẫu nhiên (khi không gõ chữ).
- **`Click chuột`**: Bắn pháo hoa trực tiếp tới vị trí con trỏ chuột trên màn hình.
- **`Tab`**: Tự động hoàn thành lệnh trong ô CLI.
