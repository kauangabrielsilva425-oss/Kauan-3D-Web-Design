const sharp = require('sharp');
const path = require('path');
const outDir = path.join(__dirname, '..', 'public', 'logos');

async function fixGithubAndCursor() {
  // Fix GitHub
  {
    const imgPath = 'C:/Users/Admin/.gemini/antigravity/brain/3167e07d-c831-4411-9b93-291a86404390/.user_uploaded/media_1794451822360_2d934c09.png';
    const { data, info } = await sharp(imgPath).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
    const w = info.width, h = info.height;
    const cx = w / 2, cy = h / 2;
    const radius = 203;
    const outBuf = Buffer.alloc(w * h * 4);

    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        const idx = (y * w + x) * 4;
        const dist = Math.sqrt((x - cx)**2 + (y - cy)**2);
        if (dist > radius + 1) {
          outBuf[idx+3] = 0; // Transparent outside circle
        } else {
          const r = data[idx], g = data[idx+1], b = data[idx+2];
          // Is it cat (light) or background disc (dark)?
          const isCat = (r > 140 && g > 140 && b > 140);
          if (isCat) {
            outBuf[idx] = 255;
            outBuf[idx+1] = 255;
            outBuf[idx+2] = 255;
            outBuf[idx+3] = 255;
          } else {
            // Dark circle disc
            outBuf[idx] = 18;
            outBuf[idx+1] = 22;
            outBuf[idx+2] = 28;
            if (dist > radius - 1) {
              outBuf[idx+3] = Math.round((radius + 1 - dist) / 2 * 255);
            } else {
              outBuf[idx+3] = 255;
            }
          }
        }
      }
    }

    await sharp(outBuf, { raw: { width: w, height: h, channels: 4 } })
      .trim()
      .resize(128, 128, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png()
      .toFile(path.join(outDir, 'github.png'));
    console.log('GitHub fixed!');
  }

  // Fix Cursor
  {
    const imgPath = 'C:/Users/Admin/.gemini/antigravity/brain/3167e07d-c831-4411-9b93-291a86404390/.user_uploaded/media_1794451851074_c2aeb1b9.png';
    const { data, info } = await sharp(imgPath)
      .extract({ left: 15, top: 6, width: 240, height: 240 })
      .ensureAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true });

    const w = 240, h = 240;
    const r = 52; // corner radius
    const innerW = w / 2 - r;
    const innerH = h / 2 - r;
    const outBuf = Buffer.alloc(w * h * 4);

    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        const idx = (y * w + x) * 4;
        const qx = Math.abs(x - w / 2);
        const qy = Math.abs(y - h / 2);
        const dx = Math.max(0, qx - innerW);
        const dy = Math.max(0, qy - innerH);
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist > r + 1) {
          outBuf[idx + 3] = 0;
        } else {
          outBuf[idx] = data[idx];
          outBuf[idx + 1] = data[idx + 1];
          outBuf[idx + 2] = data[idx + 2];
          if (dist > r - 1) {
            outBuf[idx + 3] = Math.round((r + 1 - dist) / 2 * 255);
          } else {
            outBuf[idx + 3] = 255;
          }
        }
      }
    }

    await sharp(outBuf, { raw: { width: w, height: h, channels: 4 } })
      .trim()
      .resize(128, 128, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png()
      .toFile(path.join(outDir, 'cursor.png'));
    console.log('Cursor fixed with exact math squircle!');
  }
}

fixGithubAndCursor();
