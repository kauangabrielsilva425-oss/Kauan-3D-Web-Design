import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const TARGET_PREVIEW = path.resolve('jack-portfolio/public/cubes_preview');
const TARGET_CUBES = path.resolve('jack-portfolio/public/cubes');
const ARTIFACT_PREVIEW = 'C:/Users/Admin/.gemini/antigravity/brain/3167e07d-c831-4411-9b93-291a86404390/cubes_preview';

[TARGET_PREVIEW, TARGET_CUBES, ARTIFACT_PREVIEW].forEach(d => {
  if (!fs.existsSync(d)) fs.mkdirSync(d, { recursive: true });
});

// The Top 18 Motion Websites curated directly from MotionSites.ai
const top18MotionSites = [
  {
    index: 1,
    title: 'Aetheris Voyage',
    category: '3D WebGL • Space Experience',
    badge: 'MOTIONSITES // AWWWARDS',
    desc: 'Universo 3D espacial imersivo com navegação orbital e shaders volumétricos.',
    url: 'https://motionsites.ai/assets/hero-aetheris-voyage-poster-BOeMMDSw.png'
  },
  {
    index: 2,
    title: 'CodeNest Interactive',
    category: 'Cyber IDE • WebGL Dev',
    badge: 'MOTIONSITES // FEATURED',
    desc: 'Editor de código e ambiente de desenvolvimento tridimensional interativo com shaders em tempo real.',
    url: 'https://motionsites.ai/assets/hero-codenest-poster-Cq1PVGCy.png'
  },
  {
    index: 3,
    title: 'NOVA Space Systems',
    category: 'Aerospace • Deep Tech 3D',
    badge: 'MOTIONSITES // 3D WEBGL',
    desc: 'Landing page aeroespacial com modelos 3D interativos e interface cinematográfica.',
    url: 'https://motionsites.ai/assets/hero-nova-space-poster-BNMHPfK2.png'
  },
  {
    index: 4,
    title: 'AKOR Cyber Security',
    category: 'Cyber Security • Dark UI',
    badge: 'MOTIONSITES // CYBER TECH',
    desc: 'Plataforma de segurança cibernética com visual high-tech e painel de nós de dados.',
    url: 'https://motionsites.ai/assets/hero-akor-security-poster-Cw0Ko1yz.png'
  },
  {
    index: 5,
    title: 'RIVR DeFi',
    category: 'Web3 & Fintech • Spatial Protocol',
    badge: 'MOTIONSITES // WEB3',
    desc: 'Protocolo descentralizado de última geração com interface fluida e gráficos em tempo real.',
    url: 'https://motionsites.ai/assets/landing-rivr-defi-poster-DCTiByUf.png'
  },
  {
    index: 6,
    title: 'Digital Reality',
    category: 'Spatial Computing • XR Experience',
    badge: 'MOTIONSITES // SPATIAL',
    desc: 'Interface conceitual para realidade estendida e computação espacial translúcida.',
    url: 'https://motionsites.ai/assets/hero-digital-reality-poster-CmM0f68V.png'
  },
  {
    index: 7,
    title: 'SkyElite Private Jets',
    category: 'Luxury Aerospace • Cinematic CGI',
    badge: 'MOTIONSITES // LUXURY',
    desc: 'Apresentação cinematográfica com render CGI de aeronave cruzando nuvens volumétricas.',
    url: 'https://motionsites.ai/assets/hero-skyelite-poster-GHD3VPq4.png'
  },
  {
    index: 8,
    title: 'Synapse AI',
    category: 'AI Platform • Neural Interface',
    badge: 'MOTIONSITES // AI AGENT',
    desc: 'Plataforma de inteligência artificial com núcleo neural em constante pulsação de luz.',
    url: 'https://motionsites.ai/assets/hero-synapse-ai-poster-LxdBC470.png'
  },
  {
    index: 9,
    title: 'Nexus IT Solutions',
    category: 'Engineering • Dark Enterprise',
    badge: 'MOTIONSITES // DEV ARCH',
    desc: 'Soluções corporativas de engenharia de software com tipografia editorial arrojada.',
    url: 'https://motionsites.ai/assets/hero-nexus-poster-fNblRje9.png'
  },
  {
    index: 10,
    title: 'Orbit Engineers',
    category: 'Robotics & Hardware • Spatial Systems',
    badge: 'MOTIONSITES // HARDWARE',
    desc: 'Engenharia de sistemas orbitais e hardware avançado com detalhes mecânicos em 3D.',
    url: 'https://motionsites.ai/assets/hero-orbit-engineers-poster-BT1ffUzn.png'
  },
  {
    index: 11,
    title: 'Finlytic AI Agent',
    category: 'Fintech AI • Autonomous Data',
    badge: 'MOTIONSITES // DATA VIZ',
    desc: 'Assistente financeiro autônomo com visualização de métricas e gráficos neon dark.',
    url: 'https://motionsites.ai/assets/hero-finlytic-poster-BKqseFhS.png'
  },
  {
    index: 12,
    title: 'Digital Epoch',
    category: 'Creative Dev • Bold Experience',
    badge: 'MOTIONSITES // CREATIVE DEV',
    desc: 'Site experimental com micro-interações de mouse e tipografia de escala monumental.',
    url: 'https://motionsites.ai/assets/hero-digital-epoch-poster-Cnyom0By.png'
  },
  {
    index: 13,
    title: 'Velorah Focus',
    category: 'Spatial Sound • Luxury Hardware',
    badge: 'MOTIONSITES // PRODUCT 3D',
    desc: 'Design de produto para hardware de áudio espacial com acabamento em titânio escovado.',
    url: 'https://motionsites.ai/assets/hero-velorah-focus-poster-DahOTE6J.png'
  },
  {
    index: 14,
    title: 'New Era Auto',
    category: 'Automotive 3D • Real-Time WebGL',
    badge: 'MOTIONSITES // AUTOMOTIVE',
    desc: 'Supercarro esportivo elétrico com iluminação de estúdio e reflexos PBR.',
    url: 'https://motionsites.ai/assets/hero-new-era-auto-poster-CSiQtduG.png'
  },
  {
    index: 15,
    title: 'Web3 EOS',
    category: 'Web3 Ecosystem • Decentralized Space',
    badge: 'MOTIONSITES // WEB3 SPATIAL',
    desc: 'Rede descentralizada global com visual de nó espacial e partículas dinâmicas.',
    url: 'https://motionsites.ai/assets/hero-web3-eos-poster-DF0_WdVS.png'
  },
  {
    index: 16,
    title: 'Weblex Studio',
    category: 'Agency • Interactive Web Design',
    badge: 'MOTIONSITES // AGENCY',
    desc: 'Agência criativa premiada com navegação cinética e layouts de vanguarda.',
    url: 'https://motionsites.ai/assets/hero-weblex-poster-EhV1BiMD.png'
  },
  {
    index: 17,
    title: 'Framelix 3D',
    category: 'Motion Studio • Kinetic Direction',
    badge: 'MOTIONSITES // MOTION REEL',
    desc: 'Direção de arte em movimento com efeitos de gravidade e física interativa.',
    url: 'https://motionsites.ai/assets/hero-framelix-poster-Da8_fUvr.png'
  },
  {
    index: 18,
    title: 'Bionova Biotech',
    category: 'Futuristic Biotech • Next-Gen Health',
    badge: 'MOTIONSITES // BIOTECH',
    desc: 'Biotecnologia do futuro com modelagem molecular em 3D e interface científica moderna.',
    url: 'https://motionsites.ai/assets/hero-bionova-poster-CPaKbq55.png'
  }
];

async function run() {
  console.log('Downloading and optimizing all 18 top MotionSites websites...');

  for (const s of top18MotionSites) {
    try {
      const res = await fetch(s.url, {
        headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const ab = await res.arrayBuffer();
      const buf = Buffer.from(ab);

      // Sharp resize to 400x400 center crop, high quality JPEG
      const processed = await sharp(buf)
        .resize(400, 400, { fit: 'cover', position: 'center' })
        .jpeg({ quality: 92, chromaSubsampling: '4:4:4' })
        .toBuffer();

      // Save to public/cubes_preview
      fs.writeFileSync(path.join(TARGET_PREVIEW, `img${s.index}.jpg`), processed);

      // Save to public/cubes as both .jpeg and .jpg
      fs.writeFileSync(path.join(TARGET_CUBES, `img${s.index}.jpeg`), processed);
      fs.writeFileSync(path.join(TARGET_CUBES, `img${s.index}.jpg`), processed);

      // Save to artifact folder
      fs.writeFileSync(path.join(ARTIFACT_PREVIEW, `img${s.index}.jpg`), processed);

      console.log(`✓ #${s.index} saved: ${s.title} (${s.category})`);
    } catch (err) {
      console.error(`✗ #${s.index} error: ${s.title}`, err.message);
    }
  }

  // Generate public preview HTML
  const htmlContent = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Aprovação dos 18 Sites MotionSites.ai // Kauan Gabriel</title>
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
      max-width: 780px;
      margin: 0 auto;
      line-height: 1.6;
    }
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 24px;
      margin-top: 40px;
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
      top: 12px;
      left: 12px;
      background: rgba(0, 0, 0, 0.85);
      backdrop-filter: blur(10px);
      color: #38bdf8;
      font-family: monospace;
      font-size: 11px;
      font-weight: 700;
      padding: 4px 10px;
      border-radius: 6px;
      border: 1px solid rgba(56, 189, 248, 0.3);
      z-index: 2;
    }
    .badge-tag {
      position: absolute;
      top: 12px;
      right: 12px;
      background: rgba(0, 0, 0, 0.85);
      backdrop-filter: blur(10px);
      color: #ffffff;
      font-family: monospace;
      font-size: 10px;
      font-weight: 600;
      padding: 4px 8px;
      border-radius: 6px;
      border: 1px solid rgba(255, 255, 255, 0.15);
      z-index: 2;
      letter-spacing: 0.05em;
    }
    .info {
      padding: 20px;
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
      font-size: 16px;
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
      <div class="badge">// CURADORIA EXCLUSIVA MOTIONSITES.AI</div>
      <h1>18 Melhores Websites da MotionSites.ai</h1>
      <p class="desc">
        Websites reais premiados, interativos e em 3D WebGL extraídos diretamente da <strong>MotionSites.ai</strong>. Zero projetos repetidos do seu site e zero imagens genéricas.
      </p>
    </div>

    <div class="grid">
      ${top18MotionSites.map(s => `
        <div class="card">
          <div class="img-wrap">
            <span class="number-tag">#${s.index.toString().padStart(2, '0')}</span>
            <span class="badge-tag">${s.badge}</span>
            <img src="/cubes_preview/img${s.index}.jpg?v=ms" alt="${s.title}">
          </div>
          <div class="info">
            <span class="cat-tag">${s.category}</span>
            <div class="card-title">${s.title}</div>
            <div class="card-desc">${s.desc}</div>
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
