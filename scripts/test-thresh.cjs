const sharp = require('sharp');

async function testPromptThreshold() {
  const replitPath = 'C:/Users/Admin/.gemini/antigravity/brain/3167e07d-c831-4411-9b93-291a86404390/.user_uploaded/media_1794453778753_a944a363.jpg';
  const { data, info } = await sharp(replitPath).raw().toBuffer({ resolveWithObject: true });
  const w = info.width, h = info.height;

  let minR = 255, minG = 255, maxCloudR = 0, maxCloudG = 0;

  for (let y = 140; y < 270; y++) {
    for (let x = 110; x < 330; x++) {
      const idx = (y * w + x) * 3;
      const r = data[idx], g = data[idx+1], b = data[idx+2];
      // Is it near cloud or prompt?
      if (r > 140 && g > 160) {
        if (r < minR) minR = r;
        if (g < minG) minG = g;
      } else {
        if (r > maxCloudR) maxCloudR = r;
        if (g > maxCloudG) maxCloudG = g;
      }
    }
  }

  console.log('Prompt min r, g:', minR, minG);
  console.log('Cloud max r, g in that region:', maxCloudR, maxCloudG);
}

testPromptThreshold();
