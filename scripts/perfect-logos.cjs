const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const projectRoot = path.join(__dirname, '..');
const outDir = path.join(projectRoot, 'public', 'logos');

function distToSegment(px, py, x1, y1, x2, y2) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const lenSq = dx * dx + dy * dy;
  if (lenSq === 0) return Math.hypot(px - x1, py - y1);
  let t = ((px - x1) * dx + (py - y1) * dy) / lenSq;
  t = Math.max(0, Math.min(1, t));
  return Math.hypot(px - (x1 + t * dx), py - (y1 + t * dy));
}

async function processReplitPerfect() {
  const replitPath = 'C:/Users/Admin/.gemini/antigravity/brain/3167e07d-c831-4411-9b93-291a86404390/.user_uploaded/media_1794453778753_a944a363.jpg';
  const { data, info } = await sharp(replitPath).raw().toBuffer({ resolveWithObject: true });
  const w = info.width, h = info.height;

  const cropX = 55, cropY = 55, cropW = 322, cropH = 320;
  const cBuf = Buffer.alloc(cropW * cropH * 4);

  for (let y = 0; y < cropH; y++) {
    for (let x = 0; x < cropW; x++) {
      const srcIdx = ((y + cropY) * w + (x + cropX)) * 3;
      const dstIdx = (y * cropW + x) * 4;
      cBuf[dstIdx] = data[srcIdx];
      cBuf[dstIdx+1] = data[srcIdx+1];
      cBuf[dstIdx+2] = data[srcIdx+2];
      cBuf[dstIdx+3] = 255;
    }
  }

  // Flood fill background checkerboard
  const isBg = new Uint8Array(cropW * cropH);
  const queue = [];

  function isBgColor(r, g, b) {
    if (b > 130 && (b - r > 20 || b - g > 20)) return false;
    return true;
  }

  for (let x = 0; x < cropW; x++) {
    queue.push(0 * cropW + x);
    queue.push((cropH - 1) * cropW + x);
    isBg[0 * cropW + x] = 1;
    isBg[(cropH - 1) * cropW + x] = 1;
  }
  for (let y = 0; y < cropH; y++) {
    queue.push(y * cropW + 0);
    queue.push(y * cropW + (cropW - 1));
    isBg[y * cropW + 0] = 1;
    isBg[y * cropW + (cropW - 1)] = 1;
  }

  let head = 0;
  while (head < queue.length) {
    const curr = queue[head++];
    const cx = curr % cropW;
    const cy = Math.floor(curr / cropW);

    const neighbors = [[cx+1, cy], [cx-1, cy], [cx, cy+1], [cx, cy-1]];
    for (const [nx, ny] of neighbors) {
      if (nx >= 0 && nx < cropW && ny >= 0 && ny < cropH) {
        const nIdx = ny * cropW + nx;
        if (!isBg[nIdx]) {
          const pIdx = nIdx * 4;
          if (isBgColor(cBuf[pIdx], cBuf[pIdx+1], cBuf[pIdx+2])) {
            isBg[nIdx] = 1;
            queue.push(nIdx);
          }
        }
      }
    }
  }

  for (let i = 0; i < cropW * cropH; i++) {
    if (isBg[i]) {
      cBuf[i * 4 + 3] = 0;
    }
  }

  // Inpaint the prompt region with clean cloud gradient to erase all checkerboard noise/holes
  for (let y = 90; y < 230; y++) {
    for (let x = 70; x < 250; x++) {
      const idx = (y * cropW + x) * 4;
      if (cBuf[idx + 3] > 0) {
        const r = cBuf[idx], g = cBuf[idx+1], b = cBuf[idx+2];
        if (r > 160 && (b - r) < 65) {
          const origY = y + cropY;
          const t = Math.max(0, Math.min(1, (origY - 100) / 240));
          const gr = Math.round(164 * (1 - t) + 68 * t);
          const gg = Math.round(165 * (1 - t) + 79 * t);
          const gb = 255;
          cBuf[idx] = gr;
          cBuf[idx+1] = gg;
          cBuf[idx+2] = gb;
        }
      }
    }
  }

  // Anti-alias cloud boundary
  for (let y = 1; y < cropH - 1; y++) {
    for (let x = 1; x < cropW - 1; x++) {
      const idx = (y * cropW + x) * 4;
      if (cBuf[idx+3] === 255) {
        let bgCount = 0;
        if (isBg[(y-1)*cropW + x]) bgCount++;
        if (isBg[(y+1)*cropW + x]) bgCount++;
        if (isBg[y*cropW + (x-1)]) bgCount++;
        if (isBg[y*cropW + (x+1)]) bgCount++;
        if (bgCount === 3) cBuf[idx+3] = 70;
        else if (bgCount === 2) cBuf[idx+3] = 140;
        else if (bgCount === 1) cBuf[idx+3] = 210;
      }
    }
  }

  // Draw mathematical vector chevron and underscore directly onto the buffer
  // Chevron: top (91.5, 117), apex (114, 159), bottom (91.5, 201)
  // Dash: (171.5, 202) to (230.5, 202)
  const radius = 10.5;
  const aaEdge = 0.8;

  for (let y = 0; y < cropH; y++) {
    for (let x = 0; x < cropW; x++) {
      const idx = (y * cropW + x) * 4;
      if (cBuf[idx+3] === 0) continue; // outside cloud

      // Distance to chevron
      const d1 = distToSegment(x, y, 91.5, 117, 114, 159);
      const d2 = distToSegment(x, y, 114, 159, 91.5, 201);
      const dChevron = Math.min(d1, d2);

      // Distance to dash
      const dDash = distToSegment(x, y, 171.5, 202, 230.5, 202);

      const d = Math.min(dChevron, dDash);

      if (d <= radius - aaEdge) {
        // Completely solid pure white
        cBuf[idx] = 255;
        cBuf[idx+1] = 255;
        cBuf[idx+2] = 255;
        cBuf[idx+3] = 255;
      } else if (d < radius + aaEdge) {
        // Anti-aliased boundary
        const factor = (radius + aaEdge - d) / (aaEdge * 2);
        cBuf[idx] = Math.round(cBuf[idx] * (1 - factor) + 255 * factor);
        cBuf[idx+1] = Math.round(cBuf[idx+1] * (1 - factor) + 255 * factor);
        cBuf[idx+2] = Math.round(cBuf[idx+2] * (1 - factor) + 255 * factor);
      }
    }
  }

  await sharp(cBuf, { raw: { width: cropW, height: cropH, channels: 4 } })
    .trim()
    .resize(256, 256, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(path.join(outDir, 'replit.png'));

  console.log('Replit generated with mathematical vector perfection at 256x256!');
}

async function processArcPerfect() {
  const arcPath = 'C:/Users/Admin/.gemini/antigravity/brain/3167e07d-c831-4411-9b93-291a86404390/.user_uploaded/media_1794453794138_4bfd89e4.jpg';
  const { data, info } = await sharp(arcPath).raw().toBuffer({ resolveWithObject: true });
  const w = info.width, h = info.height;

  // Find bounding box of the rainbow arc
  let minX = 999, maxX = 0, minY = 999, maxY = 0;
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const idx = (y * w + x) * 3;
      const r = data[idx], g = data[idx+1], b = data[idx+2];
      const maxC = Math.max(r, g, b);
      const minC = Math.min(r, g, b);
      const sat = maxC - minC;
      if (sat > 25 && y < 400) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }

  const pad = 10;
  const cropX = Math.max(0, minX - pad);
  const cropY = Math.max(0, minY - pad);
  const cropW = Math.min(w - cropX, (maxX - minX) + pad * 2);
  const cropH = Math.min(h - cropY, (maxY - minY) + pad * 2);

  const cBuf = Buffer.alloc(cropW * cropH * 4);
  for (let y = 0; y < cropH; y++) {
    for (let x = 0; x < cropW; x++) {
      const srcIdx = ((y + cropY) * w + (x + cropX)) * 3;
      const dstIdx = (y * cropW + x) * 4;
      cBuf[dstIdx] = data[srcIdx];
      cBuf[dstIdx+1] = data[srcIdx+1];
      cBuf[dstIdx+2] = data[srcIdx+2];
      cBuf[dstIdx+3] = 255;
    }
  }

  // Flood fill background from border
  const isBg = new Uint8Array(cropW * cropH);
  const queue = [];

  function isArcBg(r, g, b) {
    const maxC = Math.max(r, g, b);
    const minC = Math.min(r, g, b);
    const sat = maxC - minC;
    return sat < 22;
  }

  for (let x = 0; x < cropW; x++) {
    queue.push(0 * cropW + x);
    queue.push((cropH - 1) * cropW + x);
    isBg[0 * cropW + x] = 1;
    isBg[(cropH - 1) * cropW + x] = 1;
  }
  for (let y = 0; y < cropH; y++) {
    queue.push(y * cropW + 0);
    queue.push(y * cropW + (cropW - 1));
    isBg[y * cropW + 0] = 1;
    isBg[y * cropW + (cropW - 1)] = 1;
  }

  let head = 0;
  while (head < queue.length) {
    const curr = queue[head++];
    const cx = curr % cropW;
    const cy = Math.floor(curr / cropW);

    const neighbors = [[cx+1, cy], [cx-1, cy], [cx, cy+1], [cx, cy-1]];
    for (const [nx, ny] of neighbors) {
      if (nx >= 0 && nx < cropW && ny >= 0 && ny < cropH) {
        const nIdx = ny * cropW + nx;
        if (!isBg[nIdx]) {
          const pIdx = nIdx * 4;
          if (isArcBg(cBuf[pIdx], cBuf[pIdx+1], cBuf[pIdx+2])) {
            isBg[nIdx] = 1;
            queue.push(nIdx);
          }
        }
      }
    }
  }

  // Also flood fill the inner arch cutout from bottom-center
  const archBottomX = Math.round(cropW / 2);
  const archBottomY = cropH - 2;
  const startIdx = archBottomY * cropW + archBottomX;
  if (!isBg[startIdx]) {
    queue.push(startIdx);
    isBg[startIdx] = 1;
    while (head < queue.length) {
      const curr = queue[head++];
      const cx = curr % cropW;
      const cy = Math.floor(curr / cropW);
      const neighbors = [[cx+1, cy], [cx-1, cy], [cx, cy+1], [cx, cy-1]];
      for (const [nx, ny] of neighbors) {
        if (nx >= 0 && nx < cropW && ny >= 0 && ny < cropH) {
          const nIdx = ny * cropW + nx;
          if (!isBg[nIdx]) {
            const pIdx = nIdx * 4;
            if (isArcBg(cBuf[pIdx], cBuf[pIdx+1], cBuf[pIdx+2])) {
              isBg[nIdx] = 1;
              queue.push(nIdx);
            }
          }
        }
      }
    }
  }

  for (let i = 0; i < cropW * cropH; i++) {
    if (isBg[i]) {
      cBuf[i * 4 + 3] = 0;
    }
  }

  // Anti-alias edges
  for (let y = 1; y < cropH - 1; y++) {
    for (let x = 1; x < cropW - 1; x++) {
      const idx = (y * cropW + x) * 4;
      if (cBuf[idx+3] === 255) {
        let bgCount = 0;
        if (isBg[(y-1)*cropW + x]) bgCount++;
        if (isBg[(y+1)*cropW + x]) bgCount++;
        if (isBg[y*cropW + (x-1)]) bgCount++;
        if (isBg[y*cropW + (x+1)]) bgCount++;
        if (bgCount === 3) cBuf[idx+3] = 70;
        else if (bgCount === 2) cBuf[idx+3] = 140;
        else if (bgCount === 1) cBuf[idx+3] = 210;
      }
    }
  }

  await sharp(cBuf, { raw: { width: cropW, height: cropH, channels: 4 } })
    .trim()
    .resize(256, 256, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(path.join(outDir, 'arc.png'));

  console.log('Arc Browser generated with perfect archway at 256x256!');
}

async function run() {
  await processReplitPerfect();
  await processArcPerfect();
  console.log('All perfect logos generated successfully!');
}

run();
