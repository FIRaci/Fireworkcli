/**
 * Guide & Glossary Content Store v3.0
 * Definitions of Core Terminology & 16+ Parametric Shapes
 */

export const GUIDE_SECTIONS = {
  glossary: [
    {
      term: 'Đợt nổ (Wave)',
      badge: 'Trình tự thời gian',
      desc: 'Một cụm hoặc loạt quả pháo được phóng lên cùng một thời điểm hoặc giãn cách nhau theo kịch bản (ví dụ: Đợt 1 -> nghỉ 2s -> Đợt 2 -> nghỉ 1.5s -> Đợt 3).'
    },
    {
      term: 'Lượt nổ (Multi-Stage Burst, 1 - 5 Lượt)',
      badge: 'Đa tầng nổ thứ cấp',
      desc: 'Số lần phát nổ liên hoàn của từng quả pháo đơn lẻ sau khi bay lên đỉnh. Quả pháo nổ lần 1 tạo chùm hạt chính; sau độ trễ (delay), các hạt chính tiếp tục phát nổ lần 2, 3, 4, 5 thành các chùm sao phụ lấp lánh (mỗi lượt có thể mang một màu sắc khác nhau).'
    },
    {
      term: 'Phân tách cụm từ thành nhiều tên lửa (Space Split)',
      badge: 'Bắn chuỗi tên lửa theo từ',
      desc: 'Khi nhập cụm từ như "I LOVE YOU ♡", hệ thống tự động tách từng từ thành các quả pháo độc lập phóng đồng loạt hoặc nối tiếp dàn đều trên trục tọa độ X (20%, 40%, 60%, 80%).'
    },
    {
      term: 'Thước đo Tọa độ X-Y (HUD Grid)',
      badge: 'Định vị không gian',
      desc: 'Vạch đo tỷ lệ trục hoành X (0% - 100%) và trục tung độ cao Y (10% - 90%) kèm ô hiển thị tọa độ thời gian thực của con trỏ chuột.'
    },
    {
      term: 'Thời gian lơ lửng (Hang Time)',
      badge: 'Thời gian duy trì',
      desc: 'Khoảng thời gian (0.8s - 8.0s) các hạt pháo hoa trôi bồng bềnh và giữ nguyên hình khối trên không trung trước khi trọng lực bắt đầu kéo rơi xuống và phân rã dần ký tự.'
    },
    {
      term: '16+ Kiểu hình Toán học (Parametric Shapes)',
      badge: 'Kho hình học phong phú',
      desc: 'Cầu tròn, Trái tim ♡, Sao 5 cánh ★, Sao 8 cánh ✦, Vành đai Sao Thổ 🪐, Vòng tròn đôi ⭕, Cánh bướm 🦋, Hoa cúc 🌸, Liễu rủ 🌾, Xoắn ốc 🌀, Kim cương ◆, Cỏ 4 lá ☘, Vô cực ∞, Vương miện 👑, Mặt cười :), Bắn câu chữ.'
    },
    {
      term: 'Tùy biến Click Chuột (Click-to-Fire)',
      badge: 'Tương tác trực tiếp',
      desc: 'Tùy chỉnh riêng hình dạng pháo hoa, câu chữ, số lượt nổ (1 - 4 lượt), màu sắc và bán kính phát nổ khi click chuột bất kỳ điểm nào trên màn hình.'
    }
  ],

  steps: [
    {
      step: '01',
      title: 'Khởi chạy & Trải nghiệm',
      desc: 'Bấm nút <strong>Start Show</strong> hoặc gõ lệnh <code>start</code> trong terminal để thưởng thức kịch bản bắn tách từ "I LOVE YOU ♡". Hoặc click chuột trực tiếp lên màn hình.'
    },
    {
      step: '02',
      title: 'Mở Bảng Tùy Biến Chuyên Sâu (Alt + Q)',
      desc: 'Bấm <strong>Config Alt+Q</strong> để mở bảng điều khiển 5 tab: Waves & Stages, Click-to-Fire, Display & HUD, Presets & Storage, Guide & 16+ Shapes.'
    },
    {
      step: '03',
      title: 'Tùy Chỉnh Đợt, 5 Lượt Nổ & Tọa Độ X',
      desc: 'Thêm đợt mới, chọn số lượt nổ từ 1 đến 5 lượt, gán mã màu riêng cho từng lượt (vd: #ffffff, #f472b6, #fde68a) và nhập tọa độ trục X (vd: 20, 50, 80).'
    },
    {
      step: '04',
      title: 'Bắn Chuỗi Chữ Tách Tên Lửa',
      desc: 'Chọn Kiểu hình <em>Bắn câu chữ</em>, nhập nội dung (vd: <code>HAPPY NEW YEAR 2026</code>), tick chọn <em>Tách cụm từ thành nhiều tên lửa</em> để xem pháo dàn hàng ngang ấn tượng.'
    },
    {
      step: '05',
      title: 'Lưu Trữ Tự Động & Lệnh CLI',
      desc: 'Mọi thay đổi đều được tự động lưu vào LocalStorage. Bạn có thể gõ các lệnh nhanh như: <code>saturn</code>, <code>butterfly</code>, <code>heart</code>, <code>text I LOVE YOU ♡</code>.'
    }
  ]
};
