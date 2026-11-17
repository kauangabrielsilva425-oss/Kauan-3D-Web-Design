const sharp = require('sharp');
const path = require('path');
const outDir = path.join(__dirname, '..', 'public', 'logos');

async function processNewLogos() {
  // 1. REPLIT
  {
    const imgPath = 'C:/Users/Admin/.gemini/antigravity/brain/3167e07d-c831-4411-9b93-291a86404390/.user_uploaded/media_1794453778753_a944a363.jpg';
    const { data, info } = await sharp(imgPath).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
    const w = info.width, h = info.height;
    const outBuf = Buffer.alloc(w * h * 4);

    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        const idx = (y * w + x) * 4;
        const r = data[idx], g = data[idx+1], b = data[idx+2];
        const isBlue = (b > 160 && (b - r > 30 || b - g > 30));
        const isWhitePrompt = (r > 230 && g > 230 && b > 230 && x > w * 0.25 && x < w * 0.75 && y > h * 0.25 && y < h * 0.75);

        if (isBlue || isWhitePrompt) {
          outBuf[idx] = r;
          outBuf[idx+1] = g;
          outBuf[idx+2] = b;
          outBuf[idx+3] = 255;
        } else {
          if (b > 120 && b - Math.min(r, g) > 15) {
            const factor = Math.min(1, Math.max(0, (b - Math.min(r, g)) / 45));
            outBuf[idx] = r;
            outBuf[idx+1] = g;
            outBuf[idx+2] = b;
            outBuf[idx+3] = Math.round(factor * 255);
          } else {
            outBuf[idx+3] = 0;
          }
        }
      }
    }

    await sharp(outBuf, { raw: { width: w, height: h, channels: 4 } })
      .trim()
      .resize(128, 128, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png()
      .toFile(path.join(outDir, 'replit.png'));
    console.log('Replit processed!');
  }

  // 2. ARC
  {
    const imgPath = 'C:/Users/Admin/.gemini/antigravity/brain/3167e07d-c831-4411-9b93-291a86404390/.user_uploaded/media_1794453794138_4bfd89e4.jpg';
    const { data, info } = await sharp(imgPath).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
    const w = info.width, h = info.height;
    const outBuf = Buffer.alloc(w * h * 4);

    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        const idx = (y * w + x) * 4;
        const r = data[idx], g = data[idx+1], b = data[idx+2];
        const sat = Math.max(r, g, b) - Math.min(r, g, b);
        if (sat > 25) {
          outBuf[idx] = r;
          outBuf[idx+1] = g;
          outBuf[idx+2] = b;
          outBuf[idx+3] = 255;
        } else if (sat > 10) {
          outBuf[idx] = r;
          outBuf[idx+1] = g;
          outBuf[idx+2] = b;
          outBuf[idx+3] = Math.round((sat - 10) / 15 * 255);
        } else {
          outBuf[idx+3] = 0;
        }
      }
    }

    await sharp(outBuf, { raw: { width: w, height: h, channels: 4 } })
      .trim()
      .resize(128, 128, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png()
      .toFile(path.join(outDir, 'arc.png'));
    console.log('Arc processed!');
  }

  // 3. CHATGPT / OPENAI
  {
    const { fetchSimpleIcons } = require('react-icon-cloud');
    const res = await fetchSimpleIcons({ slugs: ['openai'] });
    const pathData = res.simpleIcons.openai.path;
    const svg = Buffer.from(
      `<svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 24 24"><path fill="#10A37F" d="${pathData}" /></svg>`
    );
    await sharp(svg).png().toFile(path.join(outDir, 'chatgpt.png'));
    console.log('ChatGPT processed with official OpenAI emerald green!');
  }

  // 4. YOUTUBE
  {
    const ytSvg = Buffer.from(
      `<svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 128 128">
        <path fill="#FF0000" d="M118.9 36.2c-1.4-5.3-5.5-9.4-10.8-10.8C98.6 22.7 64 22.7 64 22.7s-34.6 0-44.1 2.7c-5.3 1.4-9.4 5.5-10.8 10.8C6.4 45.7 6.4 64 6.4 64s0 18.3 2.7 27.8c1.4 5.3 5.5 9.4 10.8 10.8 9.5 2.7 44.1 2.7 44.1 2.7s34.6 0 44.1-2.7c5.3-1.4 9.4-5.5 10.8-10.8 2.7-9.5 2.7-27.8 2.7-27.8s0-18.3-2.7-27.8z"/>
        <polygon fill="#FFFFFF" points="51.2,80 81.6,64 51.2,48"/>
      </svg>`
    );
    await sharp(ytSvg).png().toFile(path.join(outDir, 'youtube.png'));
    console.log('YouTube processed!');
  }
}

processNewLogos();
