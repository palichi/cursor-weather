/** 날씨 테마별 SVG 일러스트 */

const SVG_BASE = 'class="weather-svg" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"';

const ICONS = {
  sunny: `
    <svg ${SVG_BASE}>
      <defs>
        <radialGradient id="sunGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#FDE68A"/>
          <stop offset="100%" stop-color="#F59E0B" stop-opacity="0"/>
        </radialGradient>
      </defs>
      <circle cx="100" cy="100" r="70" fill="url(#sunGlow)"/>
      <circle cx="100" cy="100" r="40" fill="#FBBF24"/>
      <g stroke="#F59E0B" stroke-width="4" stroke-linecap="round">
        <line x1="100" y1="30" x2="100" y2="50"/>
        <line x1="100" y1="150" x2="100" y2="170"/>
        <line x1="30" y1="100" x2="50" y2="100"/>
        <line x1="150" y1="100" x2="170" y2="100"/>
        <line x1="50" y1="50" x2="64" y2="64"/>
        <line x1="136" y1="136" x2="150" y2="150"/>
        <line x1="150" y1="50" x2="136" y2="64"/>
        <line x1="64" y1="136" x2="50" y2="150"/>
      </g>
    </svg>
  `,

  cloudy: `
    <svg ${SVG_BASE}>
      <circle cx="130" cy="70" r="30" fill="#FDE68A" opacity="0.6"/>
      <ellipse cx="100" cy="115" rx="65" ry="35" fill="#CBD5E1"/>
      <ellipse cx="70" cy="105" rx="45" ry="30" fill="#E2E8F0"/>
      <ellipse cx="130" cy="108" rx="50" ry="32" fill="#F1F5F9"/>
    </svg>
  `,

  rainy: `
    <svg ${SVG_BASE}>
      <ellipse cx="100" cy="85" rx="65" ry="35" fill="#94A3B8"/>
      <ellipse cx="65" cy="78" rx="40" ry="28" fill="#CBD5E1"/>
      <ellipse cx="135" cy="80" rx="45" ry="30" fill="#E2E8F0"/>
      <g fill="#38BDF8">
        <ellipse cx="70" cy="140" rx="4" ry="10" opacity="0.8"/>
        <ellipse cx="95" cy="150" rx="4" ry="12" opacity="0.9"/>
        <ellipse cx="120" cy="138" rx="4" ry="10" opacity="0.7"/>
        <ellipse cx="145" cy="148" rx="4" ry="11" opacity="0.85"/>
      </g>
    </svg>
  `,

  snowy: `
    <svg ${SVG_BASE}>
      <ellipse cx="100" cy="85" rx="65" ry="35" fill="#CBD5E1"/>
      <ellipse cx="65" cy="78" rx="40" ry="28" fill="#E2E8F0"/>
      <ellipse cx="135" cy="80" rx="45" ry="30" fill="#F1F5F9"/>
      <g fill="#BAE6FD" stroke="#7DD3FC" stroke-width="1">
        <circle cx="75" cy="140" r="5"/>
        <circle cx="100" cy="155" r="6"/>
        <circle cx="125" cy="138" r="5"/>
        <circle cx="150" cy="150" r="5"/>
      </g>
    </svg>
  `,

  stormy: `
    <svg ${SVG_BASE}>
      <ellipse cx="100" cy="80" rx="70" ry="38" fill="#64748B"/>
      <ellipse cx="60" cy="72" rx="42" ry="28" fill="#94A3B8"/>
      <ellipse cx="140" cy="75" rx="48" ry="32" fill="#CBD5E1"/>
      <polygon points="95,105 75,145 95,145 85,175 120,130 100,130 110,105" fill="#FBBF24"/>
    </svg>
  `,
};

/** 작은 아이콘 (주간 예보용) */
const SMALL_ICONS = {
  sunny: `<svg class="h-10 w-10" viewBox="0 0 40 40"><circle cx="20" cy="20" r="10" fill="#FBBF24"/><g stroke="#F59E0B" stroke-width="2"><line x1="20" y1="4" x2="20" y2="8"/><line x1="20" y1="32" x2="20" y2="36"/><line x1="4" y1="20" x2="8" y2="20"/><line x1="32" y1="20" x2="36" y2="20"/></g></svg>`,
  cloudy: `<svg class="h-10 w-10" viewBox="0 0 40 40"><ellipse cx="20" cy="24" rx="14" ry="8" fill="#CBD5E1"/><ellipse cx="14" cy="22" rx="9" ry="6" fill="#E2E8F0"/></svg>`,
  rainy: `<svg class="h-10 w-10" viewBox="0 0 40 40"><ellipse cx="20" cy="18" rx="14" ry="8" fill="#94A3B8"/><ellipse cx="14" cy="16" rx="9" ry="6" fill="#CBD5E1"/><ellipse cx="16" cy="30" rx="2" ry="5" fill="#38BDF8"/><ellipse cx="24" cy="32" rx="2" ry="5" fill="#38BDF8"/></svg>`,
  snowy: `<svg class="h-10 w-10" viewBox="0 0 40 40"><ellipse cx="20" cy="18" rx="14" ry="8" fill="#CBD5E1"/><circle cx="16" cy="30" r="3" fill="#BAE6FD"/><circle cx="24" cy="32" r="3" fill="#BAE6FD"/></svg>`,
  stormy: `<svg class="h-10 w-10" viewBox="0 0 40 40"><ellipse cx="20" cy="16" rx="15" ry="8" fill="#64748B"/><polygon points="18,22 12,32 18,32 15,38 26,26 20,26 22,22" fill="#FBBF24"/></svg>`,
};

/**
 * @param {string} theme
 * @returns {string}
 */
export function getWeatherIcon(theme) {
  return ICONS[theme] ?? ICONS.cloudy;
}

/**
 * @param {string} theme
 * @returns {string}
 */
export function getSmallIcon(theme) {
  return SMALL_ICONS[theme] ?? SMALL_ICONS.cloudy;
}
