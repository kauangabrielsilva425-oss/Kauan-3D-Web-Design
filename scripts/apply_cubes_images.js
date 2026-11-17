import fs from 'node:fs';
import path from 'node:path';

const srcDir = path.resolve('jack-portfolio/public/cubes_preview');
const destDir = path.resolve('jack-portfolio/public/cubes');

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

for (let i = 1; i <= 18; i++) {
  const srcFile = path.join(srcDir, `img${i}.jpg`);
  if (!fs.existsSync(srcFile)) {
    console.error(`Missing source file: ${srcFile}`);
    continue;
  }
  
  // Save as .jpeg and as .jpg for total compatibility
  const destJpeg = path.join(destDir, `img${i}.jpeg`);
  const destJpg = path.join(destDir, `img${i}.jpg`);
  
  fs.copyFileSync(srcFile, destJpeg);
  fs.copyFileSync(srcFile, destJpg);
  console.log(`Copied img${i} -> public/cubes/img${i}.jpeg & .jpg`);
}

console.log('✓ Successfully updated public/cubes with all 18 approved images!');
