function interpolateColor(fromColor, toColor, percent) {
  percent *= 100;
  // Проверяем, что percent находится в диапазоне от 0 до 100
  if (percent < 0) percent = 0;
  if (percent > 100) percent = 100;

  // Преобразуем цвета из hex в RGB формат
  const fromRGB = hexToRGB(fromColor);
  const toRGB = hexToRGB(toColor);

  // Вычисляем промежуточные значения для каждого канала (R, G, B)
  const r = fromRGB.r + (toRGB.r - fromRGB.r) * (percent / 100);
  const g = fromRGB.g + (toRGB.g - fromRGB.g) * (percent / 100);
  const b = fromRGB.b + (toRGB.b - fromRGB.b) * (percent / 100);

  // Преобразуем промежуточные значения обратно в hex формат
  const interpolatedColor = RGBToHex(Math.round(r), Math.round(g), Math.round(b));

  return interpolatedColor;
}

/**
 *
 * @param {string} email
 * @returns true or false
 */
const emailRegex = (email) => {
  return (
    String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )?.length > 0
  );
};

const $class = (...classes) => {
  return classes
    .map((x) => (Array.isArray(x) ? (x[1] ? x[0] : null) : x))
    .filter((x) => x)
    .join(' ');
};

function hexToRGB(hex) {
  // Убираем символ # (если есть)
  hex = hex.replace(/^#/, '');

  // Разбиваем hex на красный (R), зеленый (G) и синий (B) компоненты
  const bigint = parseInt(hex, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;

  return { r, g, b };
}

function RGBToHex(r, g, b) {
  // Преобразуем RGB значения в hex формат и объединяем их
  const hexR = r.toString(16).padStart(2, '0');
  const hexG = g.toString(16).padStart(2, '0');
  const hexB = b.toString(16).padStart(2, '0');

  return `#${hexR}${hexG}${hexB}`;
}

function lerp(start, end, progress) {
  return start + (end - start) * progress;
}

function formatNumber(num) {
  if (!num) return undefined;
  return num.toLocaleString();
}

export { $class, emailRegex, formatNumber, interpolateColor, lerp };
