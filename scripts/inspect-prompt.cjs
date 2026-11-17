const sharp = require('sharp');
const path = require('path');

async function inspectPrompt() {
  const replitPath = 'C:/Users/Admin/.gemini/antigravity/brain/3167e07d-c831-4411-9b93-291a86404390/.user_uploaded/media_1794453778753_a944a363.jpg';
  const { data, info } = await sharp(replitPath).raw().toBuffer({ resolveWithObject: true });
  const w = info.width, h = info.height;

  // Check center region
  let promptPixels = [];
  for (let y = 140; y < 270; y++) {
    for (let x = 110; x < 330; x++) {
      const idx = (y * w + x) * 3;
      const r = data[idx], g = data[idx+1], b = data[idx+2];
      // prompt is white/light
      if (r > 190 && g > 190 && b > 190) {
        promptPixels.push({ x, y, r, g, b });
      }
    }
  }
  console.log('Found prompt pixels count:', promptPixels.length);
  console.log('Sample prompt pixels:', promptPixels.slice(0, 5));
}

inspectPrompt();
