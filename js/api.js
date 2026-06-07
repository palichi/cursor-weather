/** Open-Meteo API 연동 */

import { needsTranslation, translateToEnglish } from './translate.js';

const GEOCODING_URL = 'https://geocoding-api.open-meteo.com/v1/search';
const FORECAST_URL = 'https://api.open-meteo.com/v1/forecast';

/**
 * Open-Meteo 지오코딩 API 호출
 * @param {string} name
 * @returns {Promise<object|null>}
 */
async function geocode(name) {
  const params = new URLSearchParams({
    name,
    count: '5',
    language: 'en',
    format: 'json',
  });

  const response = await fetch(`${GEOCODING_URL}?${params}`);
  if (!response.ok) return null;

  const data = await response.json();
  if (!data.results?.length) return null;

  return data.results[0];
}

/**
 * 도시 이름으로 좌표 검색
 * @param {string} cityName
 * @returns {Promise<{name: string, latitude: number, longitude: number, country: string}>}
 */
export async function searchCity(cityName) {
  const trimmed = cityName.trim();
  if (!trimmed) {
    throw new Error('도시 이름을 입력해주세요.');
  }

  const searchQueries = [];

  if (needsTranslation(trimmed)) {
    const englishName = await translateToEnglish(trimmed);
    searchQueries.push(englishName);
  }

  if (!searchQueries.includes(trimmed)) {
    searchQueries.push(trimmed);
  }

  for (const query of searchQueries) {
    const city = await geocode(query);
    if (city) {
      return {
        name: city.name,
        latitude: city.latitude,
        longitude: city.longitude,
        country: city.country ?? '',
      };
    }
  }

  throw new Error(`"${cityName}" 도시를 찾을 수 없습니다.`);
}

/**
 * 좌표 기반 날씨 데이터 조회
 * @param {number} latitude
 * @param {number} longitude
 * @returns {Promise<object>}
 */
export async function fetchWeather(latitude, longitude) {
  const params = new URLSearchParams({
    latitude: String(latitude),
    longitude: String(longitude),
    current: [
      'temperature_2m',
      'relative_humidity_2m',
      'apparent_temperature',
      'weather_code',
      'wind_speed_10m',
    ].join(','),
    daily: [
      'weather_code',
      'temperature_2m_max',
      'temperature_2m_min',
    ].join(','),
    timezone: 'auto',
    forecast_days: '7',
  });

  const response = await fetch(`${FORECAST_URL}?${params}`);

  if (!response.ok) {
    throw new Error('날씨 데이터를 가져오는데 실패했습니다.');
  }

  return response.json();
}

/**
 * 도시 이름으로 날씨 전체 조회
 * @param {string} cityName
 * @returns {Promise<{city: object, weather: object}>}
 */
export async function getWeatherByCity(cityName) {
  const city = await searchCity(cityName);
  const weather = await fetchWeather(city.latitude, city.longitude);
  return { city, weather };
}
