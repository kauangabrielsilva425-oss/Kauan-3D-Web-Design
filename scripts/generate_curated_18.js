import fs from 'node:fs';
import path from 'node:path';
import https from 'node:https';
import sharp from 'sharp';

const TARGET_DIR = path.resolve('public/cubes_preview');
if (!fs.existsSync(TARGET_DIR)) {
  fs.mkdirSync(TARGET_DIR, { recursive: true });
}

const list18 = [
  // --- PARTE 1: 9 IMAGENS DOS SEUS PROJETOS REAIS ---
  {
    index: 1,
    title: 'Nextlevel Studio // 3D Holographic UI',
    category: 'Projeto Real • 3D CGI & UI/UX',
    desc: 'Interface futurista de estúdio criativo com elementos holográficos tridimensionais.',
    url: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055344_5eff02e0-87a5-41ce-b64f-eb08da8f33db.png&w=800&q=85'
  },
  {
    index: 2,
    title: 'Nextlevel Studio // Dark Minimalist Dashboard',
    category: 'Projeto Real • Web Design',
    desc: 'Dashboard dark de alta precisão com tipografia limpa e microinterações.',
    url: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055431_11d841fd-8b41-46a5-82e4-b04f2407a7d8.png&w=800&q=85'
  },
  {
    index: 3,
    title: 'Nextlevel Studio // CGI Spatial Art',
    category: 'Projeto Real • 3D Render',
    desc: 'Render CGI cinematográfico com iluminação dramática de estúdio.',
    url: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055451_e317bf2d-28d4-48cc-86b0-6f72f25b6327.png&w=800&q=85'
  },
  {
    index: 4,
    title: 'Aura Tech // Luxury Spatial Hardware 3D',
    category: 'Projeto Real • Luxury Tech',
    desc: 'Dispositivo físico 3D futurista com acabamento em titânio e vidro negro.',
    url: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055654_911201c5-36d9-4bc6-bac7-331adfce159f.png&w=800&q=85'
  },
  {
    index: 5,
    title: 'Aura Tech // Kinetic Brand Identity',
    category: 'Projeto Real • Branding 3D',
    desc: 'Composição de marca cinética com tipografia monumental e luz volumétrica.',
    url: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055723_5ceda0b8-d9c2-4665-b2e3-83ba19ba76d1.png&w=800&q=85'
  },
  {
    index: 6,
    title: 'Aura Tech // Glassmorphism Packaging 3D',
    category: 'Projeto Real • 3D Modeling',
    desc: 'Mockup 3D de packaging com refração de vidro e iluminação caustics.',
    url: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055753_adc5dcbd-a8e6-49c0-b43a-9b030d835cea.png&w=800&q=85'
  },
  {
    index: 7,
    title: 'Solaris Web3 // Photoreal Spatial Mesh',
    category: 'Projeto Real • Web3 & 3D',
    desc: 'Esfera topográfica paramétrica em alta definição no vácuo escuro.',
    url: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055759_963cfb0b-4bd1-4b0f-9d0a-09bd6cf95b2f.png&w=800&q=85'
  },
  {
    index: 8,
    title: 'Solaris Web3 // Dark Cyber Terminal UI',
    category: 'Projeto Real • UI/UX Dev',
    desc: 'Interface de plataforma descentralizada com visual cyber high-end.',
    url: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_060108_438f781a-9846-4dcc-89ab-c4e6cb830f5b.png&w=800&q=85'
  },
  {
    index: 9,
    title: 'Solaris Web3 // Spatial Node Network',
    category: 'Projeto Real • Creative Dev',
    desc: 'Rede de dados tridimensional interativa renderizada em tempo real.',
    url: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055818_9d062121-ad7e-46b9-999a-1a6a692ef1ee.png&w=800&q=85'
  },

  // --- PARTE 2: 9 RENDERS 3D & UI FUTURISTA ESTILO AWWWARDS ---
  {
    index: 10,
    title: 'Space Voyage // 3D WebGL Spatial Universe',
    category: 'Conceito 3D • WebGL Espacial',
    desc: 'Cena imersiva de cosmos 3D com shaders de iluminação volumétrica.',
    url: 'https://motionsites.ai/assets/hero-space-voyage-preview-eECLH3Yc.gif'
  },
  {
    index: 11,
    title: 'CodeNest Interactive // Cyber IDE & Code WebGL',
    category: 'Conceito 3D • UI & Shaders',
    desc: 'Editor de código e ambiente de desenvolvimento tridimensional interativo.',
    url: 'https://motionsites.ai/assets/hero-codenest-preview-Cgppc2qV.gif'
  },
  {
    index: 12,
    title: 'Vex Ventures // 3D CGI Liquid Chrome Branding',
    category: 'Conceito 3D • Cromo Líquido',
    desc: 'Fluido cromado espelhado com reflexos metálicos fluidos em alta rotação.',
    url: 'https://motionsites.ai/assets/hero-vex-ventures-preview-BczMFIiw.gif'
  },
  {
    index: 13,
    title: 'Stellar Intelligence // Real-Time Neural WebGL',
    category: 'Conceito 3D • Inteligência Artificial',
    desc: 'Núcleo neural tridimensional em constante pulsação de luz ciano.',
    url: 'https://motionsites.ai/assets/hero-stellar-ai-preview-D3HL6bw1.gif'
  },
  {
    index: 14,
    title: 'Aethera OS // Cyber Interface & Holographic Glass',
    category: 'Conceito 3D • Sistema Operacional Cyber',
    desc: 'Interface holográfica em vidro translúcido com cards flutuantes.',
    url: 'https://motionsites.ai/assets/hero-aethera-preview-DknSlcTa.gif'
  },
  {
    index: 15,
    title: 'Orbit Web3 // Spatial Sphere & Decentralized Nodes',
    category: 'Conceito 3D • Web3 3D',
    desc: 'Planeta digital e anéis orbitais com partículas dinâmicas.',
    url: 'https://motionsites.ai/assets/hero-orbit-web3-preview-BXt4OttD.gif'
  },
  {
    index: 16,
    title: 'Vitara Motors // Automotive 3D Real-Time Configurator',
    category: 'Conceito 3D • Design Automotivo',
    desc: 'Supercarro esportivo com shaders PBR de fibra de carbono e reflexos.',
    url: 'https://motionsites.ai/assets/hero-vitara-preview-Cjz2QYyU.gif'
  },
  {
    index: 17,
    title: 'DesignPro Studio // Awwwards Interactive Craft',
    category: 'Conceito 3D • Awwwards Craft',
    desc: 'Composição de layouts cinéticos com tipografia monumental e scroll.',
    url: 'https://motionsites.ai/assets/hero-designpro-preview-D8c5_een.gif'
  },
  {
    index: 18,
    title: 'SkyElite Jet // Photoreal Aerospace CGI Render',
    category: 'Conceito 3D • CGI Fotorrealista',
    desc: 'Jato executivo aeroespacial com iluminação cinematográfica de estúdio.',
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
  console.log('Downloading and optimizing 18 images with Sharp...');
  for (const item of list18) {
    try {
      const buf = await downloadBuffer(item.url);
      const outPath = path.join(TARGET_DIR, `img${item.index}.jpg`);
      // Sharp: take first frame (if GIF), resize to 400x400 center crop, high quality jpeg
      await sharp(buf, { pages: 1 })
        .resize(400, 400, { fit: 'cover', position: 'center' })
        .jpeg({ quality: 88, chromaSubsampling: '4:4:4' })
        .toFile(outPath);
      console.log(`✓ Processed #${item.index}: ${item.title}`);
    } catch (err) {
      console.error(`✗ Error processing #${item.index} (${item.title}):`, err.message);
    }
  }

  // Create preview HTML
  const htmlContent = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>Aprovação das 18 Imagens dos Cubos 3D // Kauan Gabriel</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      background: #000000;
      color: #ffffff;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      padding: 40px 24px;
    }
    .header {
      max-width: 1200px;
      margin: 0 auto 40px;
      text-align: center;
    }
    .badge {
      display: inline-block;
      font-family: monospace;
      font-size: 12px;
      letter-spacing: 0.2em;
      color: #38bdf8;
      text-transform: uppercase;
      margin-bottom: 12px;
      border: 1px solid rgba(56, 189, 248, 0.2);
      padding: 4px 12px;
      border-radius: 999px;
      background: rgba(56, 189, 248, 0.05);
    }
    h1 {
      font-size: 32px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: -0.02em;
      margin-bottom: 12px;
    }
    p.desc {
      color: #a1a1aa;
      font-size: 15px;
      max-width: 700px;
      margin: 0 auto;
      line-height: 1.5;
    }
    .section-title {
      max-width: 1200px;
      margin: 50px auto 20px;
      font-size: 20px;
      font-weight: 700;
      letter-spacing: -0.01em;
      display: flex;
      align-items: center;
      gap: 12px;
      border-bottom: 1px solid rgba(255,255,255,0.1);
      padding-bottom: 10px;
    }
    .section-title span {
      color: #38bdf8;
      font-family: monospace;
      font-size: 14px;
    }
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
      gap: 24px;
      max-width: 1200px;
      margin: 0 auto;
    }
    .card {
      background: rgba(255, 255, 255, 0.03);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 14px;
      overflow: hidden;
      transition: transform 0.2s, border-color 0.2s;
    }
    .card:hover {
      transform: translateY(-4px);
      border-color: #38bdf8;
    }
    .img-wrap {
      width: 100%;
      aspect-ratio: 1/1;
      background: #111;
      position: relative;
    }
    .img-wrap img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }
    .number-tag {
      position: absolute;
      top: 10px;
      left: 10px;
      background: rgba(0,0,0,0.75);
      backdrop-filter: blur(8px);
      color: #38bdf8;
      font-family: monospace;
      font-size: 12px;
      font-weight: bold;
      padding: 3px 8px;
      border-radius: 6px;
      border: 1px solid rgba(56, 189, 248, 0.3);
    }
    .info {
      padding: 16px;
    }
    .cat-tag {
      font-size: 10px;
      font-family: monospace;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      color: #a1a1aa;
      margin-bottom: 6px;
      display: block;
    }
    .card-title {
      font-size: 14px;
      font-weight: 700;
      color: #ffffff;
      margin-bottom: 6px;
      line-height: 1.3;
    }
    .card-desc {
      font-size: 12px;
      color: #71717a;
      line-height: 1.4;
    }
  </style>
</head>
<body>
  <div class="header">
    <div class="badge">// APROVAÇÃO DAS 18 FACES 3D</div>
    <h1>Curadoria para os Cubos Giratórios</h1>
    <p class="desc">
      Combinação perfeita: <strong>9 imagens dos seus projetos reais</strong> (Nextlevel Studio, Aura Tech, Solaris Web3) + <strong>9 renders 3D & UI futuristas estilo Awwwards</strong> (Space Voyage, CodeNest, Vex Chrome, Aethera OS, etc.).
    </p>
  </div>

  <div class="section-title">
    <span>[ PARTE 1 / 2 ]</span>
    <h2>Trabalhos & Projetos do Seu Portfólio (9 Imagens)</h2>
  </div>
  <div class="grid">
    ${list18.slice(0, 9).map(it => `
      <div class="card">
        <div class="img-wrap">
          <span class="number-tag">#${it.index.toString().padStart(2, '0')}</span>
          <img src="/cubes_preview/img${it.index}.jpg" alt="${it.title}">
        </div>
        <div class="info">
          <span class="cat-tag">${it.category}</span>
          <div class="card-title">${it.title}</div>
          <div class="card-desc">${it.desc}</div>
        </div>
      </div>
    `).join('')}
  </div>

  <div class="section-title">
    <span>[ PARTE 2 / 2 ]</span>
    <h2>Renders 3D & UI Futurista Estilo Awwwards (9 Imagens)</h2>
  </div>
  <div class="grid">
    ${list18.slice(9, 18).map(it => `
      <div class="card">
        <div class="img-wrap">
          <span class="number-tag">#${it.index.toString().padStart(2, '0')}</span>
          <img src="/cubes_preview/img${it.index}.jpg" alt="${it.title}">
        </div>
        <div class="info">
          <span class="cat-tag">${it.category}</span>
          <div class="card-title">${it.title}</div>
          <div class="card-desc">${it.desc}</div>
        </div>
      </div>
    `).join('')}
  </div>
</body>
</html>`;

  fs.writeFileSync(path.resolve('public/cubes-preview.html'), htmlContent, 'utf-8');
  console.log('✓ Created public/cubes-preview.html');
}

processAll();
