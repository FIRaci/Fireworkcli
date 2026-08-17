/**
 * Guide & Glossary Content Store v4.0 (<120 lines)
 */

export const GUIDE_SECTIONS = {
  glossary: [
    {
      term: '1. Chuyển đổi ảnh PNG sang Pháo hoa (PNG to Fireworks)',
      badge: 'Tính năng độc quyền',
      desc: 'Tải lên bất kỳ file ảnh PNG, logo, icon hoặc hình vẽ nào. Hệ thống tự động phân tích độ trong suốt alpha, trích xuất ma trận pixel và bắn thành chùm pháo hoa ASCII giữ nguyên màu sắc gốc của ảnh.'
    },
    {
      term: '2. Bảng vẽ Doodle Tự do (Doodle Drawing Canvas)',
      badge: 'Tự vẽ pháo hoa',
      desc: 'Khung vẽ tương tác mini trong tab PNG & Doodle cho phép bạn dùng chuột/bút vẽ bất kỳ hình thù gì (ngôi sao, hình trái tim, chữ ký tay) rồi bấm "Bắn thử nét vẽ" để bung nở ngay trên bầu trời.'
    },
    {
      term: '3. Số Lượt nổ Tùy ý (1 - 20+ Lượt Nổ Đa Tầng)',
      badge: 'Không giới hạn',
      desc: 'Người dùng có thể nhập trực tiếp số lượng lượt nổ mong muốn (ví dụ 6 lượt, 8 lượt, 12 lượt). Hệ thống tự động tính toán nhịp delay và phối màu sắc cho từng tầng nổ liên hoàn.'
    },
    {
      term: '4. Kho 35+ Kiểu Hình Toán Học',
      badge: 'Đa dạng tuyệt đối',
      desc: '• Hình học: Vuông ⏹, Tròn ⭕, Tam giác ▲, Lục giác ⬡, Bát giác 🛑, Sao 5/6/8/12 cánh ★, Kim cương ◆.<br>• Loài hoa: Hoa hồng 🌹, Hoa sen 🪷, Hoa hướng dương 🌻, Hoa anh đào 🌸, Hoa tulip 🌷, Bồ công anh 🌾, Cúc đại đóa 🏵, Liễu rủ 🌿.<br>• Biểu tượng: Mặt trăng 🌙, Mặt trời ☀️, Nốt nhạc 🎵, Bông tuyết ❄️, Cây thông 🎄, Trái tim ♡, Cánh bướm 🦋, Sao Thổ 🪐, Vô cực ∞, Vương miện 👑.'
    },
    {
      term: '5. Chế độ Xem Bắn Thử Trực Tiếp (Live Transparency Preview)',
      badge: 'Trực quan',
      desc: 'Khi bấm nút "Bắn thử", bảng tùy biến sẽ tự động chuyển sang chế độ mờ trong suốt (Glass Transparency) trong 3.5 giây để bạn chiêm ngưỡng trọn vẹn quỹ đạo và khoảnh khắc pháo hoa phát nổ trên màn hình.'
    }
  ],

  steps: [
    {
      step: '01',
      title: 'Tải ảnh PNG hoặc Tự vẽ Nét Doodle',
      desc: 'Mở <strong>Alt + Q</strong> -> chuyển sang thẻ <strong>PNG & Doodle</strong> để kéo thả ảnh PNG hoặc tự tay vẽ pháo hoa của riêng bạn.'
    },
    {
      step: '02',
      title: 'Tùy Chỉnh Số Lượt Nổ & Tọa Độ X',
      desc: 'Nhập số lượt nổ tùy ý (ví dụ 6 hoặc 10 lượt), gán mã màu từng lượt và nhập danh sách tọa độ trục X (vd: <code>15, 35, 65, 85</code>).'
    },
    {
      step: '03',
      title: 'Chọn Trong Kho 35+ Kiểu Hình',
      desc: 'Lựa chọn hình học chuẩn (Vuông, Tròn, Sao 12 cánh) hoặc các loài hoa (Hoa hồng, Hoa sen, Hoa hướng dương, Sakura).'
    },
    {
      step: '04',
      title: 'Bắn Thử Live Preview',
      desc: 'Bấm nút <strong>Bắn thử</strong> trên góc thẻ để xem pháo hoa nổ trực tiếp với hiệu ứng làm mờ giao diện xuyên thấu.'
    }
  ]
};
