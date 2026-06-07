/** SkyView 메인 앱 */

import { DEFAULT_CITY } from './config.js';
import { getWeatherByCity } from './api.js';
import { renderWeather, showError, showLoading } from './ui.js';

let currentCity = DEFAULT_CITY;

/**
 * 날씨 데이터 로드 및 화면 갱신
 * @param {string} cityName
 */
async function loadWeather(cityName) {
  showLoading();

  try {
    const { city, weather } = await getWeatherByCity(cityName);
    currentCity = city.name;
    renderWeather(city, weather);
  } catch (error) {
    showError(error.message ?? '알 수 없는 오류가 발생했습니다.');
  }
}

/** 검색 폼 이벤트 */
function setupSearch() {
  const form = document.getElementById('search-form');
  const input = document.getElementById('city-input');

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const query = input.value.trim();
    if (query) {
      loadWeather(query);
    }
  });
}

/** 재시도 버튼 */
function setupRetry() {
  document.getElementById('retry-btn').addEventListener('click', () => {
    loadWeather(currentCity);
  });
}

/** 앱 초기화 */
function init() {
  setupSearch();
  setupRetry();
  loadWeather(DEFAULT_CITY);
}

init();
