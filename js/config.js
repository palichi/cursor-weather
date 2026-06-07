/** 기본 설정 및 날씨 코드 매핑 */

export const DEFAULT_CITY = 'Seoul';

/** WMO 날씨 코드 → 한국어 설명 */
export const WEATHER_LABELS = {
  0: '맑음',
  1: '대체로 맑음',
  2: '부분적으로 흐림',
  3: '흐림',
  45: '안개',
  48: '서리 안개',
  51: '가벼운 이슬비',
  53: '이슬비',
  55: '강한 이슬비',
  61: '약한 비',
  63: '비',
  65: '강한 비',
  71: '약한 눈',
  73: '눈',
  75: '강한 눈',
  77: '진눈깨비',
  80: '약한 소나기',
  81: '소나기',
  82: '강한 소나기',
  85: '약한 눈 소나기',
  86: '강한 눈 소나기',
  95: '뇌우',
  96: '우박을 동반한 뇌우',
  99: '강한 우박 뇌우',
};

/** 날씨 코드 → 테마 (카드 배경용) */
export const WEATHER_THEMES = {
  sunny: [0, 1],
  cloudy: [2, 3, 45, 48],
  rainy: [51, 53, 55, 61, 63, 65, 80, 81, 82],
  snowy: [71, 73, 75, 77, 85, 86],
  stormy: [95, 96, 99],
};

/** 요일 이름 (한국어) */
export const DAY_NAMES = ['일', '월', '화', '수', '목', '금', '토'];

/** 날씨별 생활 팁 */
export const WEATHER_TIPS = {
  sunny: '자외선이 강할 수 있어요. 모자나 선크림을 챙기세요.',
  cloudy: '날씨가 변덕스러울 수 있어요. 가벼운 겉옷을 준비하세요.',
  rainy: '우산이나 우비를 꼭 챙기세요. 미끄러운 길에 주의하세요.',
  snowy: '미끄러운 도로에 주의하고, 따뜻하게 입으세요.',
  stormy: '가능하면 실외 활동을 피하고, 안전한 곳에 머무르세요.',
  default: '날씨에 맞는 옷차림을 준비하세요.',
};

/**
 * 날씨 코드로 테마 키 반환
 * @param {number} code
 * @returns {string}
 */
export function getThemeKey(code) {
  for (const [theme, codes] of Object.entries(WEATHER_THEMES)) {
    if (codes.includes(code)) return theme;
  }
  return 'cloudy';
}

/**
 * 날씨 코드로 한국어 설명 반환
 * @param {number} code
 * @returns {string}
 */
export function getWeatherLabel(code) {
  return WEATHER_LABELS[code] ?? '알 수 없음';
}
