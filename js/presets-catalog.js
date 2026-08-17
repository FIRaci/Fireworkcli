/**
 * Fireworks Show Presets Catalog
 */

export const PRESETS = {
  romantic_salvo: {
    name: 'Muted Rose Romance ("I LOVE YOU ♡")',
    desc: 'Bắn chuỗi 4 quả pháo tách từ "I", "LOVE", "YOU", "♡" dàn đều theo trục X, nổ 3 lượt màu hồng phấn và trắng bạc.',
    loop: false,
    theme: 'monochrome',
    waves: [
      {
        id: 'wave-1',
        name: 'Đợt 1: Khởi động ánh bạc',
        delayBefore: 0,
        rocketCount: 3,
        stagger: 0.25,
        stages: 2,
        stageDelays: [0, 0.8],
        stageColors: ['#ffffff', '#f472b6'],
        shape: 'sphere',
        customText: '',
        splitWords: false,
        customXPositions: '20, 50, 80',
        colorPalette: 'soft_rose',
        altitude: 0.75,
        spread: 1.2,
        hangTime: 2.2,
        characters: '0 . : * ♡'
      },
      {
        id: 'wave-2',
        name: 'Đợt 2: Trái tim đôi lấp lánh',
        delayBefore: 2.0,
        rocketCount: 2,
        stagger: 0.4,
        stages: 2,
        stageDelays: [0, 0.9],
        stageColors: ['#f472b6', '#ffffff'],
        shape: 'heart',
        customText: '',
        splitWords: false,
        customXPositions: '35, 65',
        colorPalette: 'soft_rose',
        altitude: 0.8,
        spread: 1.4,
        hangTime: 2.8,
        characters: '♡ * 0 .'
      },
      {
        id: 'wave-3',
        name: 'Đợt 3: Bắn tách từ "I LOVE YOU ♡"',
        delayBefore: 1.8,
        rocketCount: 4,
        stagger: 0.2,
        stages: 3,
        stageDelays: [0, 0.8, 1.5],
        stageColors: ['#ffffff', '#f472b6', '#fde68a'],
        shape: 'text',
        customText: 'I LOVE YOU ♡',
        splitWords: true,
        customXPositions: '20, 40, 60, 80',
        colorPalette: 'soft_rose',
        altitude: 0.72,
        spread: 1.4,
        hangTime: 3.8,
        characters: 'I L O V E Y U ♡ ★'
      }
    ]
  },

  cosmic_spectrum: {
    name: 'Cosmic 4-Stage Galaxy',
    desc: 'Đại tiệc pháo hoa 4 lượt nổ đổi màu liên hoàn: Trắng -> Vàng -> Cyan -> Hồng.',
    loop: false,
    theme: 'slate',
    waves: [
      {
        id: 'wave-1',
        name: 'Đợt 1: Vành đai Sao Thổ 4 tầng',
        delayBefore: 0,
        rocketCount: 3,
        stagger: 0.3,
        stages: 4,
        stageDelays: [0, 0.7, 1.4, 2.1],
        stageColors: ['#ffffff', '#fde68a', '#38bdf8', '#f472b6'],
        shape: 'saturn',
        customText: '',
        splitWords: false,
        customXPositions: '25, 50, 75',
        colorPalette: 'champagne',
        altitude: 0.78,
        spread: 1.5,
        hangTime: 3.2,
        characters: '🪐 ✦ * 0 .'
      },
      {
        id: 'wave-2',
        name: 'Đợt 2: Cánh bướm & Hoa cúc đại đóa',
        delayBefore: 2.2,
        rocketCount: 4,
        stagger: 0.25,
        stages: 3,
        stageDelays: [0, 0.8, 1.6],
        stageColors: ['#ffffff', '#38bdf8', '#c084fc'],
        shape: 'butterfly',
        customText: '',
        splitWords: false,
        customXPositions: '15, 38, 62, 85',
        colorPalette: 'cosmic_violet',
        altitude: 0.82,
        spread: 1.6,
        hangTime: 3.5,
        characters: '✦ ✧ 0 . : *'
      }
    ]
  }
};
