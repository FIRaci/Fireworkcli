/**
 * Comprehensive Guide & Glossary Content Data
 */

export const GUIDE_SECTIONS = {
  glossary: [
    {
      term: 'Đợt nổ (Wave)',
      badge: 'Sequence',
      desc: 'Là một cụm pháo hoa được phóng lên theo trình tự thời gian kịch bản. Mỗi đợt có độ trễ kích hoạt (delayBefore), số lượng quả pháo và hình dạng riêng biệt. Ví dụ: Đợt 1 bắn 3 quả mở màn -> Chờ 2 giây -> Đợt 2 bắn chữ "I love you ♡".'
    },
    {
      term: 'Lượt nổ (Multi-Stage Burst)',
      badge: 'Detonation',
      desc: 'Là số lần phát nổ liên tiếp của từng quả pháo sau khi lên đỉnh quỹ đạo:\n• Lượt = 1: Nổ đơn tiêu chuẩn.\n• Lượt = 2: Nổ lần 1 bung hạt chính, sau x giây delay các hạt tiếp tục nổ lần 2 thành các chùm sao phụ lấp lánh.\n• Lượt = 3: Nổ đa tầng liên hoàn.'
    },
    {
      term: 'Thời gian lơ lửng (Hang Time)',
      badge: 'Physics',
      desc: 'Khoảng thời gian (tính bằng giây) các hạt pháo hoa trôi bồng bềnh và duy trì trên bầu trời trước khi trọng lực bắt đầu kéo rơi xuống và phân rã dần ký tự.'
    },
    {
      term: 'Bắn chữ & Tạo hình (Shape & Text)',
      badge: 'Rasterizer',
      desc: 'Hệ thống tự động rasterize câu chữ bạn nhập (như "I love you ♡", "2026") hoặc công thức toán học hình Trái tim, Ngôi sao thành ma trận tọa độ hạt ASCII nở bung đồng đều trên không trung.'
    },
    {
      term: 'Giãn cách bắn (Stagger)',
      badge: 'Timing',
      desc: 'Khoảng thời gian lệch pha (giây) giữa các quả pháo trong cùng một Đợt. Giúp tạo hiệu ứng pháo hoa bắn nối tiếp hình cánh quạt thay vì phóng đồng loạt cùng một tích tắc.'
    }
  ],

  steps: [
    {
      step: '01',
      title: 'Trải nghiệm kịch bản có sẵn',
      desc: 'Nhấn nút "Start Show" trên thanh công cụ hoặc gõ lệnh "start" trong ô terminal để chạy kịch bản mẫu. Bạn cũng có thể click chuột bất kỳ đâu trên màn hình để bắn pháo hoa tại vị trí đó.'
    },
    {
      step: '02',
      title: 'Mở bảng tùy biến Alt + Q',
      desc: 'Nhấn tổ hợp phím Alt + Q (hoặc nút Config trên thanh công cụ) để mở bảng điều khiển. Tại đây bạn có thể thêm/xóa các Đợt nổ hoặc chuyển sang tab Presets để chọn mẫu có sẵn.'
    },
    {
      step: '03',
      title: 'Cấu hình Đợt và Lượt nổ',
      desc: 'Tùy chỉnh số lượng quả pháo cho từng đợt, chọn số Lượt nổ (1 hoặc 2 lượt), chỉnh thời gian delay giữa lượt 1 và lượt 2, và điều chỉnh thời gian lơ lửng (Hang time).'
    },
    {
      step: '04',
      title: 'Bắn chữ cá nhân hóa',
      desc: 'Trong thẻ Đợt, chọn kiểu hình là "Bắn cụm chữ (Custom Text)", sau đó nhập câu chữ bạn muốn (vd: "I love you ♡", "HAPPY NEW YEAR"). Nhấn nút "Bắn thử" để kiểm tra ngay.'
    },
    {
      step: '05',
      title: 'Sử dụng dòng lệnh CLI Terminal',
      desc: 'Gõ trực tiếp các lệnh hữu ích: "text I love you ♡", "heart", "star", "preset champagne_finale", "theme slate", "clear", "help".'
    }
  ]
};
