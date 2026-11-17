import fs from 'node:fs';
import path from 'node:path';
import https from 'node:https';
import sharp from 'sharp';

const TARGET_DIR = path.resolve('public/cubes');
const PREVIEW_DIR = path.resolve('public/cubes_preview');

if (!fs.existsSync(TARGET_DIR)) fs.mkdirSync(TARGET_DIR, { recursive: true });
if (!fs.existsSync(PREVIEW_DIR)) fs.mkdirSync(PREVIEW_DIR, { recursive: true });

const list18 = [
  // --- PARTE 1: 9 IMAGENS DOS SEUS PROJETOS REAIS ---
  {
    index: 1,
    title: 'Nextlevel Studio // 3D Holographic UI',
    url: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055344_5eff02e0-87a5-41ce-b64f-eb08da8f33db.png&w=1200&q=95'
  },
  {
    index: 2,
    title: 'Nextlevel Studio // Dark Minimalist Dashboard',
    url: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055431_11d841fd-8b41-46a5-82e4-b04f2407a7d8.png&w=1200&q=95'
  },
  {
    index: 3,
    title: 'Nextlevel Studio // CGI Spatial Art',
    url: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055451_e317bf2d-28d4-48cc-86b0-6f72f25b6327.png&w=1200&q=95'
  },
  {
    index: 4,
    title: 'Aura Tech // Luxury Spatial Hardware 3D',
    url: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055654_911201c5-36d9-4bc6-bac7-331adfce159f.png&w=1200&q=95'
  },
  {
    index: 5,
    title: 'Aura Tech // Kinetic Brand Identity',
    url: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055723_5ceda0b8-d9c2-4665-b2e3-83ba19ba76d1.png&w=1200&q=95'
  },
  {
    index: 6,
    title: 'Aura Tech // Glassmorphism Packaging 3D',
    url: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055753_adc5dcbd-a8e6-49c0-b43a-9b030d835cea.png&w=1200&q=95'
  },
  {
    index: 7,
    title: 'Solaris Web3 // Photoreal Spatial Mesh',
    url: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055759_963cfb0b-4bd1-4b0f-9d0a-09bd6cf95b2f.png&w=1200&q=95'
  },
  {
    index: 8,
    title: 'Solaris Web3 // Dark Cyber Terminal UI',
    url: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_060108_438f781a-9846-4dcc-89ab-c4e6cb830f5b.png&w=1200&q=95'
  },
  {
    index: 9,
    title: 'Solaris Web3 // Spatial Node Network',
    url: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055818_9d062121-ad7e-46b9-999a-1a6a692ef1ee.png&w=1200&q=95'
  },

  // --- PARTE 2: 9 RENDERS 3D & UI FUTURISTA ESTILO AWWWARDS ---
  {
    index: 10,
    title: 'Space Voyage // 3D WebGL Spatial Universe',
    url: 'https://motionsites.ai/assets/hero-space-voyage-preview-eECLH3Yc.gif'
  },
  {
    index: 11,
    title: 'CodeNest Interactive // Cyber IDE & Code WebGL',
    url: 'https://motionsites.ai/assets/hero-codenest-preview-Cgppc2qV.gif'
  },
  {
    index: 12,
    title: 'Vex Ventures // 3D CGI Liquid Chrome Branding',
    url: 'https://motionsites.ai/assets/hero-vex-ventures-preview-BczMFIiw.gif'
  },
  {
    index: 13,
    title: 'Stellar Intelligence // Real-Time Neural WebGL',
    url: 'https://motionsites.ai/assets/hero-stellar-ai-preview-D3HL6bw1.gif'
  },
  {
    index: 14,
    title: 'Aethera OS // Cyber Interface & Holographic Glass',
    url: 'https://motionsites.ai/assets/hero-aethera-preview-DknSlcTa.gif'
  },
  {
    index: 15,
    title: 'Orbit Web3 // Spatial Sphere & Decentralized Nodes',
    url: 'https://motionsites.ai/assets/hero-orbit-web3-preview-BXt4OttD.gif'
  },
  {
    index: 16,
    title: 'Vitara Motors // Automotive 3D Real-Time Configurator',
    url: 'https://motionsites.ai/assets/hero-vitara-preview-Cjz2QYyU.gif'
  },
  {
    index: 17,
    title: 'DesignPro Studio // Awwwards Interactive Craft',
    url: 'https://motionsites.ai/assets/hero-designpro-preview-D8c5_een.gif'
  },
  {
    index: 18,
    title: 'SkyElite Jet // Photoreal Aerospace CGI Render',
    url: 'https://motionsites.ai/assets/hero-skyelite-preview-DHaZIgUv.gif'
  }
];

function downloadBuffer(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return downloadBuffer(res.headers.location).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`Failed to download ${url}: status ${res.statusCode}`));
      }
      const chunks = [];
      res.on('data', chunk => chunks.push(chunk));
      res.on('end', () => resolve(Buffer.concat(chunks)));
      res.on('error', reject);
    }).on('error', reject);
  });
}

async function processAll() {
  console.log('Generating Ultra-High Definition 800x800 Cube Photos (96% quality)...');
  for (const item of list18) {
    try {
      const buf = await downloadBuffer(item.url);
      const outJpeg = path.join(TARGET_DIR, `img${item.index}.jpeg`);
      const outJpg = path.join(TARGET_DIR, `img${item.index}.jpg`);
      const outPreview = path.join(PREVIEW_DIR, `img${item.index}.jpg`);

      // Sharp: 800x800 retina resolution, 96% high quality jpeg, 4:4:4 chroma subsampling for pin-sharp text
      const optimizedBuffer = await sharp(buf, { pages: 1 })
        .resize(800, 800, { fit: 'cover', position: 'center' })
        .jpeg({ quality: 96, mozjpeg: true, chromaSubsampling: '4:4:4' })
        .toBuffer();

      fs.writeFileSync(outJpeg, optimizedBuffer);
      fs.writeFileSync(outJpg, optimizedBuffer);
      fs.writeFileSync(outPreview, optimizedBuffer);

      console.log(`✓ Upgraded #${item.index} (${item.title}) -> 800x800 HD (${Math.round(optimizedBuffer.length / 1024)} KB)`);
    } catch (err) {
      console.error(`✗ Error downloading #${item.index}:`, err.message);
    }
  }
  console.log('✓ All cube photos enhanced to Ultra-High Resolution!');
}

processAll();
