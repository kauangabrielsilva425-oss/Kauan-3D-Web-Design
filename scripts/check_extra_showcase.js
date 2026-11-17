import https from 'node:https';

const showcaseExtra = [
  { name: 'Stellar System Motion', url: 'https://motionsites.ai/assets/hero-stellar-ai-v2-preview-DjvxjG3C.gif' },
  { name: 'ASME Concept 3D', url: 'https://motionsites.ai/assets/hero-asme-preview-B_nGDnTP.gif' },
  { name: 'Data Kinetic Creative Dev', url: 'https://motionsites.ai/assets/hero-transform-data-preview-Cx5OU29N.gif' },
  { name: 'Vitara Motors Automotive 3D', url: 'https://motionsites.ai/assets/hero-vitara-preview-Cjz2QYyU.gif' },
  { name: 'Terra World Environment 3D', url: 'https://motionsites.ai/assets/hero-terra-preview-BFjrCr7T.gif' },
  { name: 'SkyElite Jet Photoreal CGI', url: 'https://motionsites.ai/assets/hero-skyelite-preview-DHaZIgUv.gif' },
  { name: 'X-Portfolio Kinetic Layout', url: 'https://motionsites.ai/assets/hero-xportfolio-preview-D4A8maiC.gif' }
];

function checkUrl(item) {
  return new Promise((resolve) => {
    https.get(item.url, (res) => {
      resolve({ ...item, status: res.statusCode });
    }).on('error', (e) => resolve({ ...item, error: e.message }));
  });
}

async function run() {
  for (const item of showcaseExtra) {
    const res = await checkUrl(item);
    console.log(res);
  }
}

run();
