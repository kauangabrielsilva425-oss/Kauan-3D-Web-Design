const sharp = require('sharp');
const path = require('path');

const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="100" height="108" viewBox="0 0 50 54" fill="none" shape-rendering="geometricPrecision">
  <rect width="50" height="54" fill="#030712" />
  <defs>
    <linearGradient id="cursorBody" x1="25" y1="5" x2="25" y2="44" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#0b1329" />
      <stop offset="100%" stop-color="#020617" />
    </linearGradient>
  </defs>
  <path
    d="M42.6817 41.1495L27.5103 6.79925C26.7269 5.02557 24.2082 5.02558 23.3927 6.79925L7.59814 41.1495C6.75833 42.9759 8.52712 44.8902 10.4125 44.1954L24.3757 39.0496C24.8829 38.8627 25.4385 38.8627 25.9422 39.0496L39.8121 44.1954C41.6849 44.8902 43.4884 42.9759 42.6817 41.1495Z"
    fill="url(#cursorBody)"
    stroke="#FFFFFF"
    stroke-width="2.5"
    stroke-linejoin="round"
    stroke-linecap="round"
  />
</svg>
`;

sharp(Buffer.from(svg))
  .png()
  .toFile(path.join(__dirname, 'test-dark-cursor.png'))
  .then(() => console.log('Rendered dark cursor!'));
