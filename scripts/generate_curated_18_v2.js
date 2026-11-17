import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const TARGET_DIR = path.resolve('jack-portfolio/public/cubes_preview');
if (!fs.existsSync(TARGET_DIR)) {
  fs.mkdirSync(TARGET_DIR, { recursive: true });
}

const list18 = [
  // --- PARTE 1: 9 IMAGENS DOS SEUS PROJETOS REAIS ---
  {
    index: 1,
    title: 'Nextlevel Studio // 3D Holographic UI',
    category: 'Projeto Real • 3D CGI & UI/UX',
    badge: 'PROJETO REAL',
    desc: 'Interface futurista de estúdio criativo com elementos holográficos tridimensionais.',
    url: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055344_5eff02e0-87a5-41ce-b64f-eb08da8f33db.png&w=800&q=85'
  },
  {
    index: 2,
    title: 'Nextlevel Studio // Dark Minimalist Dashboard',
    category: 'Projeto Real • Web Design',
    badge: 'PROJETO REAL',
    desc: 'Dashboard dark de alta precisão com tipografia limpa e microinterações.',
    url: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055431_11d841fd-8b41-46a5-82e4-b04f2407a7d8.png&w=800&q=85'
  },
  {
    index: 3,
    title: 'Nextlevel Studio // CGI Spatial Art',
    category: 'Projeto Real • 3D Render',
    badge: 'PROJETO REAL',
    desc: 'Render CGI cinematográfico com iluminação dramática de estúdio.',
    url: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055451_e317bf2d-28d4-48cc-86b0-6f72f25b6327.png&w=800&q=85'
  },
  {
    index: 4,
    title: 'Aura Tech // Luxury Spatial Hardware 3D',
    category: 'Projeto Real • Luxury Tech',
    badge: 'PROJETO REAL',
    desc: 'Dispositivo físico 3D futurista com acabamento em titânio e vidro negro.',
    url: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055654_911201c5-36d9-4bc6-bac7-331adfce159f.png&w=800&q=85'
  },
  {
    index: 5,
    title: 'Aura Tech // Kinetic Brand Identity',
    category: 'Projeto Real • Branding 3D',
    badge: 'PROJETO REAL',
    desc: 'Composição de marca cinética com tipografia monumental e luz volumétrica.',
    url: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055723_5ceda0b8-d9c2-4665-b2e3-83ba19ba76d1.png&w=800&q=85'
  },
  {
    index: 6,
    title: 'Aura Tech // Glassmorphism Packaging 3D',
    category: 'Projeto Real • 3D Modeling',
    badge: 'PROJETO REAL',
    desc: 'Mockup 3D de packaging com refração de vidro e iluminação caustics.',
    url: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055753_adc5dcbd-a8e6-49c0-b43a-9b030d835cea.png&w=800&q=85'
  },
  {
    index: 7,
    title: 'Solaris Web3 // Photoreal Spatial Mesh',
    category: 'Projeto Real • Web3 & 3D',
    badge: 'PROJETO REAL',
    desc: 'Esfera topográfica paramétrica em alta definição no vácuo escuro.',
    url: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055759_963cfb0b-4bd1-4b0f-9d0a-09bd6cf95b2f.png&w=800&q=85'
  },
  {
    index: 8,
    title: 'Solaris Web3 // Dark Cyber Terminal UI',
    category: 'Projeto Real • UI/UX Dev',
    badge: 'PROJETO REAL',
    desc: 'Interface de plataforma descentralizada com visual cyber high-end.',
    url: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_060108_438f781a-9846-4dcc-89ab-c4e6cb830f5b.png&w=800&q=85'
  },
  {
    index: 9,
    title: 'Solaris Web3 // Spatial Node Network',
    category: 'Projeto Real • Creative Dev',
    badge: 'PROJETO REAL',
    desc: 'Rede de dados tridimensional interativa renderizada em tempo real.',
    url: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055818_9d062121-ad7e-46b9-999a-1a6a692ef1ee.png&w=800&q=85'
  },

  // --- PARTE 2: 9 RENDERS 3D & UI FUTURISTA ESTILO AWWWARDS ---
  {
    index: 10,
    title: 'Space Voyage // 3D WebGL Spatial Universe',
    category: 'Conceito 3D • WebGL Espacial',
    badge: 'AWWWARDS 3D',
    desc: 'Cena imersiva de cosmos 3D com shaders de iluminação volumétrica.',
    url: 'https://motionsites.ai/assets/hero-space-voyage-preview-eECLH3Yc.gif'
  },
  {
    index: 11,
    title: 'CodeNest Interactive // Cyber IDE & Code WebGL',
    category: 'Conceito 3D • UI & Shaders',
    badge: 'AWWWARDS 3D',
    desc: 'Editor de código e ambiente de desenvolvimento tridimensional interativo.',
    url: 'https://motionsites.ai/assets/hero-codenest-preview-Cgppc2qV.gif'
  },
  {
    index: 12,
    title: 'Vex Ventures // 3D CGI Liquid Chrome Branding',
    category: 'Conceito 3D • Cromo Líquido',
    badge: 'AWWWARDS 3D',
    desc: 'Fluido cromado espelhado com reflexos metálicos fluidos em alta rotação.',
    url: 'https://motionsites.ai/assets/hero-vex-ventures-preview-BczMFIiw.gif'
  },
  {
    index: 13,
    title: 'Stellar Intelligence // Real-Time Neural WebGL',
    category: 'Conceito 3D • Inteligência Artificial',
    badge: 'AWWWARDS 3D',
    desc: 'Núcleo neural tridimensional em constante pulsação de luz ciano.',
    url: 'https://motionsites.ai/assets/hero-stellar-ai-preview-D3HL6bw1.gif'
  },
  {
    index: 14,
    title: 'Aethera OS // Cyber Interface & Holographic Glass',
    category: 'Conceito 3D • Sistema Operacional Cyber',
    badge: 'AWWWARDS 3D',
    desc: 'Interface holográfica em vidro translúcido com cards flutuantes.',
    url: 'https://motionsites.ai/assets/hero-aethera-preview-DknSlcTa.gif'
  },
  {
    index: 15,
    title: 'Orbit Web3 // Spatial Sphere & Nodes',
    category: 'Conceito 3D • Web3 3D',
    badge: 'AWWWARDS 3D',
    desc: 'Planeta digital e anéis orbitais com partículas dinâmicas.',
    url: 'https://motionsites.ai/assets/hero-orbit-web3-preview-BXt4OttD.gif'
  },
  {
    index: 16,
    title: 'Vitara Motors // Automotive 3D PBR Configurator',
    category: 'Conceito 3D • Design Automotivo',
    badge: 'AWWWARDS 3D',
    desc: 'Supercarro esportivo com shaders PBR de fibra de carbono e reflexos.',
    url: 'https://motionsites.ai/assets/hero-vitara-preview-Cjz2QYyU.gif'
  },
  {
    index: 17,
    title: 'DesignPro Studio // Awwwards Interactive Craft',
    category: 'Conceito 3D • Awwwards Craft',
    badge: 'AWWWARDS 3D',
    desc: 'Composição de layouts cinéticos com tipografia monumental e scroll.',
    url: 'https://motionsites.ai/assets/hero-designpro-preview-D8c5_een.gif'
  },
  {
    index: 18,
    title: 'SkyElite Jet // Photoreal Aerospace CGI Render',
    category: 'Conceito 3D • CGI Fotorrealista',
    badge: 'AWWWARDS 3D',
    desc: 'Jato executivo aeroespacial com iluminação cinematográfica de estúdio.',
    url: 'https://motionsites.ai/assets/hero-skyelite-preview-DHaZIgUv.gif'
  }
];

async function fetchWithRetry(url, retries = 3) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const res = await fetch(url, {
        headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const arrayBuffer = await res.arrayBuffer();
      return Buffer.from(arrayBuffer);
    } catch (err) {
      if (attempt === retries) throw err;
      await new Promise(r => setTimeout(r, 1000 * attempt));
    }
  }
}

async function run() {
  console.log('Downloading and optimizing all 18 images directly to jack-portfolio/public/cubes_preview/ ...');
  
  for (const item of list18) {
    try {
      const buf = await fetchWithRetry(item.url);
      const outPath = path.join(TARGET_DIR, `img${item.index}.jpg`);
      
      await sharp(buf, { pages: 1 })
        .resize(400, 400, { fit: 'cover', position: 'center' })
        .jpeg({ quality: 90, chromaSubsampling: '4:4:4' })
        .toFile(outPath);
        
      console.log(`✓ #${item.index} saved: ${item.title}`);
    } catch (err) {
      console.error(`✗ #${item.index} error:`, err.message);
    }
  }

  // Generate public preview HTML
  const htmlContent = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Aprovação das 18 Imagens dos Cubos 3D // Kauan Gabriel</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      background: #000000;
      color: #ffffff;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      padding: 50px 24px;
      -webkit-font-smoothing: antialiased;
    }
    .container {
      max-width: 1280px;
      margin: 0 auto;
    }
    .header {
      text-align: center;
      margin-bottom: 50px;
    }
    .badge {
      display: inline-block;
      font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
      font-size: 11px;
      letter-spacing: 0.25em;
      color: #38bdf8;
      text-transform: uppercase;
      margin-bottom: 14px;
      border: 1px solid rgba(56, 189, 248, 0.25);
      padding: 5px 14px;
      border-radius: 999px;
      background: rgba(56, 189, 248, 0.06);
    }
    h1 {
      font-size: 38px;
      font-weight: 900;
      text-transform: uppercase;
      letter-spacing: -0.02em;
      margin-bottom: 14px;
      background: linear-gradient(180deg, #FFFFFF 0%, #A1A1AA 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    p.desc {
      color: #a1a1aa;
      font-size: 16px;
      max-width: 720px;
      margin: 0 auto;
      line-height: 1.6;
    }
    .section-title {
      margin: 60px 0 24px;
      display: flex;
      align-items: center;
      gap: 14px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
      padding-bottom: 14px;
    }
    .section-title .pill {
      font-family: monospace;
      font-size: 11px;
      letter-spacing: 0.15em;
      color: #38bdf8;
      background: rgba(56, 189, 248, 0.1);
      padding: 4px 10px;
      border-radius: 6px;
    }
    .section-title h2 {
      font-size: 20px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: -0.01em;
      color: #ffffff;
    }
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));
      gap: 22px;
    }
    .card {
      background: #080808;
      border: 1px solid rgba(255, 255, 255, 0.09);
      border-radius: 14px;
      overflow: hidden;
      transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
      display: flex;
      flex-direction: column;
    }
    .card:hover {
      transform: translateY(-4px);
      border-color: rgba(56, 189, 248, 0.5);
      box-shadow: 0 12px 30px rgba(0, 0, 0, 0.8), 0 0 25px rgba(56, 189, 248, 0.15);
    }
    .img-wrap {
      width: 100%;
      aspect-ratio: 1/1;
      background: #0a0a0a;
      position: relative;
      overflow: hidden;
    }
    .img-wrap img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
      transition: transform 0.4s ease;
    }
    .card:hover .img-wrap img {
      transform: scale(1.04);
    }
    .number-tag {
      position: absolute;
      top: 10px;
      left: 10px;
      background: rgba(0, 0, 0, 0.85);
      backdrop-filter: blur(10px);
      color: #38bdf8;
      font-family: monospace;
      font-size: 11px;
      font-weight: 700;
      padding: 3px 9px;
      border-radius: 6px;
      border: 1px solid rgba(56, 189, 248, 0.3);
      z-index: 2;
    }
    .badge-tag {
      position: absolute;
      top: 10px;
      right: 10px;
      background: rgba(0, 0, 0, 0.85);
      backdrop-filter: blur(10px);
      color: #ffffff;
      font-family: monospace;
      font-size: 10px;
      font-weight: 600;
      padding: 3px 8px;
      border-radius: 6px;
      border: 1px solid rgba(255, 255, 255, 0.15);
      z-index: 2;
      letter-spacing: 0.05em;
    }
    .info {
      padding: 18px;
      display: flex;
      flex-direction: column;
      flex: 1;
    }
    .cat-tag {
      font-size: 10px;
      font-family: monospace;
      text-transform: uppercase;
      letter-spacing: 0.12em;
      color: #38bdf8;
      margin-bottom: 8px;
      display: block;
    }
    .card-title {
      font-size: 14px;
      font-weight: 800;
      color: #ffffff;
      margin-bottom: 8px;
      line-height: 1.35;
      letter-spacing: -0.01em;
    }
    .card-desc {
      font-size: 12px;
      color: #71717a;
      line-height: 1.5;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="badge">// APROVAÇÃO DAS 18 FACES DOS CUBOS 3D</div>
      <h1>Curadoria Exclusiva para os Cubos</h1>
      <p class="desc">
        Equilíbrio refinado: <strong>9 imagens dos seus projetos reais</strong> (Nextlevel Studio, Aura Tech, Solaris Web3) combinadas com <strong>9 renders 3D e interfaces conceituais futuristas estilo Awwwards</strong> (WebGL espacial, cromo líquido, interfaces cibernéticas e CGI fotorrealista).
      </p>
    </div>

    <div class="section-title">
      <span class="pill">PARTE 1</span>
      <h2>Projetos Reais do Seu Portfólio (9 Imagens)</h2>
    </div>
    <div class="grid">
      ${list18.slice(0, 9).map(it => `
        <div class="card">
          <div class="img-wrap">
            <span class="number-tag">#${it.index.toString().padStart(2, '0')}</span>
            <span class="badge-tag">${it.badge}</span>
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
      <span class="pill">PARTE 2</span>
      <h2>Renders 3D & UI Futurista Estilo Awwwards (9 Imagens)</h2>
    </div>
    <div class="grid">
      ${list18.slice(9, 18).map(it => `
        <div class="card">
          <div class="img-wrap">
            <span class="number-tag">#${it.index.toString().padStart(2, '0')}</span>
            <span class="badge-tag">${it.badge}</span>
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
  </div>
</body>
</html>`;

  fs.writeFileSync(path.resolve('jack-portfolio/public/cubes-preview.html'), htmlContent, 'utf-8');
  console.log('✓ Successfully created jack-portfolio/public/cubes-preview.html');
}

run();
