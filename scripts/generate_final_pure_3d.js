import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const TARGET_PREVIEW = path.resolve('jack-portfolio/public/cubes_preview');
const TARGET_CUBES = path.resolve('jack-portfolio/public/cubes');
const ARTIFACT_PREVIEW = 'C:/Users/Admin/.gemini/antigravity/brain/3167e07d-c831-4411-9b93-291a86404390/cubes_preview';

[TARGET_PREVIEW, TARGET_CUBES, ARTIFACT_PREVIEW].forEach(d => {
  if (!fs.existsSync(d)) fs.mkdirSync(d, { recursive: true });
});

const brainDir = 'C:/Users/Admin/.gemini/antigravity/brain/3167e07d-c831-4411-9b93-291a86404390';

const list18 = [
  // --- LOTE DE RENDERS 3D AUTORAIS GERADOS SOB MEDIDA ---
  {
    index: 1,
    title: 'Escultura 3D em Cromo Líquido',
    category: 'CGI • Cromo Líquido & Mercúrio',
    badge: '3D CGI EXCLUSIVO',
    desc: 'Escultura fluida de mercúrio espelhado em gravidade zero sobre vácuo negro profundo.',
    localFile: path.join(brainDir, 'liquid_chrome_sculpture_1794585426481.jpg')
  },
  {
    index: 2,
    title: 'Esfera de Vidro Obsidiana & Núcleo Holográfico',
    category: 'CGI • Vidro Negro & Caustics',
    badge: '3D CGI EXCLUSIVO',
    desc: 'Esfera escura com refrações ópticas e núcleo neural interno em ciano luminescente.',
    localFile: path.join(brainDir, 'obsidian_glass_sphere_1794585445765.jpg')
  },
  {
    index: 3,
    title: 'Gadget Espacial Translúcido & Microchips',
    category: 'CGI • Gadget Conceitual',
    badge: '3D CGI EXCLUSIVO',
    desc: 'Dispositivo wearable em vidro óptico revelando microprocessadores e circuitos dourados.',
    localFile: path.join(brainDir, 'spatial_glass_gadget_1794585467195.jpg')
  },
  {
    index: 4,
    title: 'Poliedro Prismático em Titânio & Cristal',
    category: 'CGI • Geometria 3D & Caustics',
    badge: '3D CGI EXCLUSIVO',
    desc: 'Estrutura poliédrica com dispersão cromática e feixes de luz refratados no cristal.',
    localFile: path.join(brainDir, 'prism_polyhedra_sculpture_1794585493544.jpg')
  },
  {
    index: 5,
    title: 'Ondas Paramétricas & Wireframe WebGL',
    category: 'CGI • Shaders WebGL',
    badge: '3D CGI EXCLUSIVO',
    desc: 'Fitas dinâmicas entrelaçadas com grade de arame em gradiente ciano e violeta.',
    localFile: path.join(brainDir, 'parametric_ribbon_waves_1794585524590.jpg')
  },
  {
    index: 6,
    title: 'Capacete & Visor Cibernético Sci-Fi',
    category: 'CGI • Cyber Techwear',
    badge: '3D CGI EXCLUSIVO',
    desc: 'Escultura de visor cromado com iluminação de recorte e acabamento automotivo.',
    localFile: path.join(brainDir, 'cybernetic_chrome_visor_1794585559454.jpg')
  },
  {
    index: 7,
    title: 'Cubo de Vidro com Matriz 3D Holográfica',
    category: 'CGI • Matriz 3D & Cubo',
    badge: '3D CGI EXCLUSIVO',
    desc: 'Cubo translúcido contendo uma grade tridimensional de nós e partículas flutuantes.',
    localFile: path.join(brainDir, 'transparent_cubic_prism_grid_1794586091598.jpg')
  },
  {
    index: 8,
    title: 'Anel Dinâmico de Mercúrio Fluido',
    category: 'CGI • Cromo Líquido',
    badge: '3D CGI EXCLUSIVO',
    desc: 'Toróide fluido com ondulações cinéticas e gotas metálicas suspensas.',
    localFile: path.join(brainDir, 'mercury_fluid_ring_1794586147940.jpg')
  },
  {
    index: 9,
    title: 'Fones de Áudio Espacial em Vidro Fumê',
    category: 'CGI • Gadget Conceitual',
    badge: '3D CGI EXCLUSIVO',
    desc: 'Headphones com cúpulas transparentes, anéis luminescentes em neon ciano e cromo.',
    localFile: path.join(brainDir, 'futuristic_headset_1794586095943.jpg')
  },
  {
    index: 10,
    title: 'Giroscópio de Titânio & Núcleo de Plasma',
    category: 'CGI • Astrofísica & 3D',
    badge: '3D CGI EXCLUSIVO',
    desc: 'Anéis concêntricos de metal escovado orbitando uma estrela de fusão em miniatura.',
    localFile: path.join(brainDir, 'gyro_plasma_sphere_1794586113666.jpg')
  },
  {
    index: 11,
    title: 'Tipografia Escultural em Cromo Molten',
    category: 'CGI • Tipografia 3D',
    badge: '3D CGI EXCLUSIVO',
    desc: 'Glifo experimental esculpido em metal líquido espelhado com reflexos de estúdio.',
    localFile: path.join(brainDir, 'molten_chrome_glyph_1794586133891.jpg')
  },

  // --- RENDERS 3D CURADOS DE ARTISTAS CGI RENOMADOS (Milad Fakurian & Deep 3D) ---
  {
    index: 12,
    title: 'Vidro Líquido & Dispersão Iridescente',
    category: 'CGI • Vidro & Refração Óptica',
    badge: '3D RENDER ART',
    desc: 'Render de fluido viscoso com caustics e dispersão iridescente em fundo preto.',
    url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&h=600&q=85'
  },
  {
    index: 13,
    title: 'Esfera Minimalista Flutuante no Vácuo',
    category: 'CGI • Vidro Negro & Minimalismo',
    badge: '3D RENDER ART',
    desc: 'Composição de esfera fosca e translúcida com iluminação suave de estúdio.',
    url: 'https://images.unsplash.com/photo-1617791160505-6f00504e3519?auto=format&fit=crop&w=600&h=600&q=85'
  },
  {
    index: 14,
    title: 'Topografia Paramétrica Holográfica',
    category: 'CGI • Shaders & WebGL',
    badge: '3D RENDER ART',
    desc: 'Malha digital de elevação topográfica em linhas neon sobre atmosfera escura.',
    url: 'https://images.unsplash.com/photo-1614741118887-7a4ee193a5fa?auto=format&fit=crop&w=600&h=600&q=85'
  },
  {
    index: 15,
    title: 'Poliedros Flutuantes de Vidro Escuro',
    category: 'CGI • Geometria 3D',
    badge: '3D RENDER ART',
    desc: 'Formas geométricas lapidadas em vidro fumê com refrações de luz de alta precisão.',
    url: 'https://images.unsplash.com/photo-1633167606207-d840b5070fc2?auto=format&fit=crop&w=600&h=600&q=85'
  },
  {
    index: 16,
    title: 'Gradiente Fluido Ciano Elétrico & Dark',
    category: 'CGI • Shaders & Fluidos',
    badge: '3D RENDER ART',
    desc: 'Onda fluida em movimento com transição aveludada do preto profundo ao ciano.',
    url: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&w=600&h=600&q=85'
  },
  {
    index: 17,
    title: 'Túnel Paramétrico Sci-Fi em Perspectiva',
    category: 'CGI • Arquitetura Futurista',
    badge: '3D RENDER ART',
    desc: 'Passarela arquitetônica linear que converge ao infinito com luzes rasantes.',
    url: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=600&h=600&q=85'
  },
  {
    index: 18,
    title: 'Dinâmica de Fluidos Monocromáticos',
    category: 'CGI • Fluidos em Alta Velocidade',
    badge: '3D RENDER ART',
    desc: 'Splash cinético de tinta líquida congelada no tempo com riqueza de microdetalhes.',
    url: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=600&h=600&q=85'
  }
];

async function processImages() {
  console.log('Processing all 18 pure 3D CGI artworks...');
  
  for (const it of list18) {
    let buf;
    if (it.localFile && fs.existsSync(it.localFile)) {
      buf = fs.readFileSync(it.localFile);
    } else if (it.url) {
      const res = await fetch(it.url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
      const ab = await res.arrayBuffer();
      buf = Buffer.from(ab);
    }

    if (!buf) {
      console.error(`Could not get buffer for #${it.index}`);
      continue;
    }

    // Process with Sharp to 400x400
    const processedBuf = await sharp(buf)
      .resize(400, 400, { fit: 'cover', position: 'center' })
      .jpeg({ quality: 92, chromaSubsampling: '4:4:4' })
      .toBuffer();

    // Save to public/cubes_preview
    fs.writeFileSync(path.join(TARGET_PREVIEW, `img${it.index}.jpg`), processedBuf);
    
    // Save to public/cubes as both .jpeg and .jpg
    fs.writeFileSync(path.join(TARGET_CUBES, `img${it.index}.jpeg`), processedBuf);
    fs.writeFileSync(path.join(TARGET_CUBES, `img${it.index}.jpg`), processedBuf);

    // Save to artifact cubes_preview
    fs.writeFileSync(path.join(ARTIFACT_PREVIEW, `img${it.index}.jpg`), processedBuf);

    console.log(`✓ Processed #${it.index}: ${it.title}`);
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
      max-width: 760px;
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
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 24px;
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
      font-size: 15px;
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
      <div class="badge">// NOVO CATÁLOGO DE APROVAÇÃO 3D CGI</div>
      <h1>18 Artes 3D CGI & Design Futurista</h1>
      <p class="desc">
        <strong>100% livre dos projetos do site</strong>. Conjunto estritamente focado em <strong>CGI High-End</strong>: Cromo líquido fluido, esferas de vidro negro com caustics, gadgets translúcidos, shaders WebGL paramétricos e tipografia metálica em vácuo negro absoluto.
      </p>
    </div>

    <div class="section-title">
      <span class="pill">PARTE 1</span>
      <h2>Renders Autorais 3D CGI & Conceitos Futuristas (11 Imagens)</h2>
    </div>
    <div class="grid">
      ${list18.slice(0, 11).map(it => `
        <div class="card">
          <div class="img-wrap">
            <span class="number-tag">#${it.index.toString().padStart(2, '0')}</span>
            <span class="badge-tag">${it.badge}</span>
            <img src="/cubes_preview/img${it.index}.jpg?v=cgi" alt="${it.title}">
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
      <h2>Vidro Óptico, Geometrias & Shaders WebGL (7 Imagens)</h2>
    </div>
    <div class="grid">
      ${list18.slice(11, 18).map(it => `
        <div class="card">
          <div class="img-wrap">
            <span class="number-tag">#${it.index.toString().padStart(2, '0')}</span>
            <span class="badge-tag">${it.badge}</span>
            <img src="/cubes_preview/img${it.index}.jpg?v=cgi" alt="${it.title}">
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

processImages();
