# Hướng Dẫn Sử Dụng & Bảng Giải Thích Thuật Ngữ

Tài liệu hướng dẫn chi tiết từng bước cách cấu hình và vận hành hệ thống pháo hoa Terminal ASCII Fireworks.

---

## 📖 1. Bảng Giải thích Thuật ngữ Cốt lõi

### 🌊 Đợt nổ (Wave)
- **Định nghĩa**: Là một đợt bắn / cụm pháo hoa được phóng lên theo dòng thời gian kịch bản.
- **Đặc điểm**: Mỗi đợt có độ trễ kích hoạt (`delayBefore`), số lượng quả pháo phóng lên (`rocketCount`), và kiểu hình riêng.
- **Ví dụ thực tế**:
  - *Đợt 1*: Bắn 3 quả mở màn phân tán hình quạt.
  - *Nghỉ 2 giây* (`delayBefore: 2.0s`).
  - *Đợt 2*: Bắn cụm chữ *"I love you ♡"*.
  - *Nghỉ 1.5 giây*.
  - *Đợt 3*: Bắn 4 quả kết thúc rực rỡ.

### 💥 Lượt nổ (Multi-Stage Burst)
- **Định nghĩa**: Là số lần phát nổ liên tiếp của từng quả pháo đơn lẻ sau khi đạt độ cao cực đại.
- **Phân loại**:
  - **1 Lượt (Single Burst)**: Quả pháo bay lên và nổ tung một lần thành các hạt ASCII.
  - **2 Lượt (Double Burst)**: Quả pháo nổ lần 1 tạo chùm hạt chính; sau `x` giây delay do người dùng cài đặt (`stage2Delay`), các hạt chính tiếp tục phát nổ lần 2 thành các chùm sao phụ lấp lánh (Secondary Explosion).
  - **3 Lượt (Triple Burst)**: Nổ đa tầng 3 giai đoạn liên hoàn.

### ⏳ Thời gian lơ lửng (Hang Time)
- **Định nghĩa**: Khoảng thời gian (giây) các hạt pháo hoa trôi bồng bềnh và duy trì trên không trung trước khi trọng lực bắt đầu kéo rơi xuống và phân rã dần ký tự (`*` -> `:` -> `.`).
- **Ứng dụng**: Tăng Hang Time khi bắn chữ ("I love you ♡") để người xem đọc rõ nội dung câu chữ.

### 🔤 Bắn chữ & Tạo hình (Shape & Text Rasterizer)
- **Định nghĩa**: Công cụ quét tự động biến đổi bất kỳ câu chữ nào bạn nhập (như *"I love you ♡"*, *"2026"*) hoặc công thức toán học hình Trái tim, Ngôi sao thành ma trận tọa độ hạt ASCII nở bung sắc nét trên không trung.

### ⏱ Giãn cách bắn (Stagger)
- **Định nghĩa**: Khoảng thời gian lệch pha (giây) giữa các quả pháo trong cùng một Đợt. Giúp tạo hiệu ứng pháo hoa bắn nối tiếp thay vì phóng đồng loạt cùng một thời điểm.

---

## 🚀 2. Hướng dẫn từng bước (Step-by-Step Tutorial)

1. **Bước 1 - Trải nghiệm nhanh**:
   - Nhấn nút **Start Show** trên thanh công cụ hoặc gõ `start` trong ô Terminal CLI để xem kịch bản pháo hoa mẫu.
   - Bạn cũng có thể click chuột trực tiếp vào bất kỳ vị trí nào trên màn hình để phóng pháo hoa tại tọa độ đó.

2. **Bước 2 - Mở bảng tùy biến**:
   - Nhấn tổ hợp phím **`Alt + Q`** hoặc nút **Config** trên thanh công cụ.

3. **Bước 3 - Cấu hình chuỗi Đợt & Lượt nổ**:
   - Trong thẻ **Waves & Stages**, bạn có thể bấm **+ Add Wave** để thêm đợt mới.
   - Chỉnh sửa độ trễ chuyển đợt, số lượng pháo và số lượt nổ (1 hoặc 2 lượt).

4. **Bước 4 - Bắn chữ cá nhân hóa**:
   - Trong thẻ Đợt bất kỳ, chọn Kiểu hình: `Bắn cụm chữ (Custom Text)`.
   - Nhập nội dung câu chữ mong muốn (vd: `I love you ♡`).
   - Bấm nút **Bắn thử** trên góc thẻ để kiểm tra ngay.

5. **Bước 5 - Sử dụng dòng lệnh CLI**:
   - Gõ `text I love you ♡` để bắn ngay cụm chữ.
   - Gõ `heart` hoặc `star` để bắn hình trái tim hoặc ngôi sao.
   - Gõ `preset champagne_finale` hoặc `preset monochrome_minimal` để đổi kịch bản.
