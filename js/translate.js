/** 도시명 자동 번역 (전 세계 언어 → 영문) */

const TRANSLATE_URL = 'https://api.mymemory.translated.net/get';

/** Unicode 기반 언어 감지 */
const LANGUAGE_PATTERNS = [
  { code: 'ko', pattern: /[\uAC00-\uD7AF\u1100-\u11FF]/ },
  { code: 'ja', pattern: /[\u3040-\u309F\u30A0-\u30FF]/ },
  { code: 'zh-CN', pattern: /[\u4E00-\u9FFF]/ },
  { code: 'ru', pattern: /[\u0400-\u04FF]/ },
  { code: 'ar', pattern: /[\u0600-\u06FF]/ },
  { code: 'th', pattern: /[\u0E00-\u0E7F]/ },
  { code: 'hi', pattern: /[\u0900-\u097F]/ },
  { code: 'el', pattern: /[\u0370-\u03FF]/ },
  { code: 'he', pattern: /[\u0590-\u05FF]/ },
  { code: 'bn', pattern: /[\u0980-\u09FF]/ },
  { code: 'ta', pattern: /[\u0B80-\u0BFF]/ },
  { code: 'ka', pattern: /[\u10A0-\u10FF]/ },
];

/**
 * 입력 텍스트의 언어 코드 추정
 * @param {string} text
 * @returns {string|null}
 */
export function detectLanguage(text) {
  for (const { code, pattern } of LANGUAGE_PATTERNS) {
    if (pattern.test(text)) return code;
  }
  return null;
}

/**
 * 번역이 필요한지 판단 (비영어권 문자 포함 여부)
 * @param {string} text
 * @returns {boolean}
 */
export function needsTranslation(text) {
  return detectLanguage(text) !== null;
}

/**
 * MyMemory API로 영문 도시명 변환
 * @param {string} text
 * @param {string} langCode
 * @returns {Promise<string|null>}
 */
async function requestTranslation(text, langCode) {
  const params = new URLSearchParams({
    q: text,
    langpair: `${langCode}|en`,
  });

  const response = await fetch(`${TRANSLATE_URL}?${params}`);
  if (!response.ok) return null;

  const data = await response.json();
  if (data.responseStatus !== 200 || !data.responseData?.translatedText) {
    return null;
  }

  const translated = data.responseData.translatedText.trim();

  if (
    translated.includes('MYMEMORY WARNING') ||
    translated.toUpperCase() === 'QUERY LENGTH LIMIT EXCEEDED'
  ) {
    return null;
  }

  return translated;
}

/**
 * 도시명을 영문으로 변환
 * @param {string} cityName
 * @returns {Promise<string>}
 */
export async function translateToEnglish(cityName) {
  const trimmed = cityName.trim();
  const lang = detectLanguage(trimmed);

  if (!lang) return trimmed;

  const translated = await requestTranslation(trimmed, lang);
  return translated ?? trimmed;
}
