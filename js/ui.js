/** DOM 렌더링 */

import { DAY_NAMES, getThemeKey, getWeatherLabel, WEATHER_TIPS } from './config.js';
import { getWeatherIcon, getSmallIcon } from './icons.js';

/**
 * 로딩 / 에러 / 대시보드 상태 전환
 */
export function showLoading() {
  document.getElementById('loading').classList.remove('hidden');
  document.getElementById('error').classList.add('hidden');
  document.getElementById('dashboard').classList.add('hidden');
}

export function showError(message) {
  document.getElementById('loading').classList.add('hidden');
  document.getElementById('error').classList.remove('hidden');
  document.getElementById('dashboard').classList.add('hidden');
  document.getElementById('error-message').textContent = message;
}

export function showDashboard() {
  document.getElementById('loading').classList.add('hidden');
  document.getElementById('error').classList.add('hidden');
  document.getElementById('dashboard').classList.remove('hidden');
}

/**
 * 로컬 날짜를 YYYY-MM-DD 형식으로 반환
 * @param {Date} date
 * @returns {string}
 */
function formatLocalDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * 오늘 날짜 표시용
 * @returns {string}
 */
function formatTodayHeader() {
  const now = new Date();
  const month = now.getMonth() + 1;
  const day = now.getDate();
  const dayName = DAY_NAMES[now.getDay()];
  return `오늘 · ${month}월 ${day}일 (${dayName})`;
}

/**
 * 오늘 날씨 카드 렌더링
 * @param {object} city
 * @param {object} weather
 */
export function renderToday(city, weather) {
  const { current, daily } = weather;
  const code = current.weather_code;
  const theme = getThemeKey(code);

  const todayCard = document.getElementById('today-card');
  todayCard.className = todayCard.className.replace(/theme-\w+/g, '');
  todayCard.classList.add(`theme-${theme}`);

  const locationLabel = city.country
    ? `${city.name}, ${city.country}`
    : city.name;

  document.getElementById('today-date').textContent = formatTodayHeader();
  document.getElementById('location-name').textContent = locationLabel;
  document.getElementById('weather-desc').textContent = getWeatherLabel(code);
  document.getElementById('current-temp').textContent = Math.round(current.temperature_2m);
  document.getElementById('feels-like').textContent = Math.round(current.apparent_temperature);
  document.getElementById('humidity').textContent = current.relative_humidity_2m;
  document.getElementById('wind-speed').textContent = Math.round(current.wind_speed_10m);
  document.getElementById('temp-min').textContent = Math.round(daily.temperature_2m_min[0]);
  document.getElementById('temp-max').textContent = Math.round(daily.temperature_2m_max[0]);
  document.getElementById('weather-illustration').innerHTML = getWeatherIcon(theme);
  document.getElementById('weather-tip').textContent =
    WEATHER_TIPS[theme] ?? WEATHER_TIPS.default;
}

/**
 * 주간 예보 카드 렌더링
 * @param {object} weather
 */
export function renderWeeklyForecast(weather) {
  const { daily } = weather;
  const container = document.getElementById('weekly-forecast');
  const todayStr = formatLocalDate(new Date());

  container.innerHTML = daily.time
    .map((date, index) => {
      const code = daily.weather_code[index];
      const theme = getThemeKey(code);
      const isToday = date === todayStr;
      const dayDate = new Date(date + 'T00:00:00');
      const dayLabel = isToday ? '오늘' : DAY_NAMES[dayDate.getDay()];
      const min = Math.round(daily.temperature_2m_min[index]);
      const max = Math.round(daily.temperature_2m_max[index]);

      return `
        <article
          class="forecast-card glass-card rounded-2xl p-4 text-center ${isToday ? 'is-today' : ''}"
          style="animation-delay: ${0.1 + index * 0.05}s"
        >
          <p class="text-sm font-semibold text-slate-700">${dayLabel}</p>
          <p class="text-xs text-slate-400">${date.slice(5).replace('-', '/')}</p>
          <div class="my-3 flex justify-center">${getSmallIcon(theme)}</div>
          <p class="text-xs text-slate-500">${getWeatherLabel(code)}</p>
          <p class="mt-2 text-sm font-semibold text-slate-800">
            <span class="text-sky-600">${max}°</span>
            <span class="text-slate-300 mx-1">/</span>
            <span class="text-slate-400">${min}°</span>
          </p>
        </article>
      `;
    })
    .join('');
}

/**
 * 전체 UI 업데이트
 * @param {object} city
 * @param {object} weather
 */
export function renderWeather(city, weather) {
  renderToday(city, weather);
  renderWeeklyForecast(weather);
  showDashboard();
}
