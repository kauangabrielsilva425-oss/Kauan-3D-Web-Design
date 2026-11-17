import sharp from 'sharp';

// High-end Unsplash IDs specifically for 3D Renders, Liquid Chrome, Dark Glass, Cyberpunk Shaders, Spatial Tech
const candidateIds = [
  // 1. 3D Liquid Chrome & Metallic Fluid
  { id: "photo-1634017839464-5c339ebe3cb4", title: "Escultura Cromada 3D Espelhada", theme: "Cromo Líquido & Metal 3D" },
  { id: "photo-1618005182384-a83a8bd57fbe", title: "Vidro Líquido & Refrações Iridescentes", theme: "Cromo Líquido & Metal 3D" },
  { id: "photo-1614741118887-7a4ee193a5fa", title: "Topografia 3D Ondulada Holográfica", theme: "Cromo Líquido & Metal 3D" },
  
  // 2. Geometria Espacial & Vidro Negro / Caustics
  { id: "photo-1633167606207-d840b5070fc2", title: "Poliedro de Vidro Negro Flutuante", theme: "Geometria Espacial & Caustics" },
  { id: "photo-1617791160505-6f00504e3519", title: "Esfera de Vidro Minimalista no Vácuo", theme: "Geometria Espacial & Caustics" },
  { id: "photo-1620641788421-7a1c342ea42e", title: "Gradiente Fluido Ciano Elétrico & Dark", theme: "Geometria Espacial & Caustics" },

  // 3. Cyberpunk UI, Shaders & Visuals Tecnológicos
  { id: "photo-1550751827-4bd374c3f58b", title: "Metrópole Cyberpunk & Iluminação Dark", theme: "Cyberpunk & Shaders" },
  { id: "photo-1526374965328-7f61d4dc18c5", title: "Chuva de Código Binário & Matriz Cibernética", theme: "Cyberpunk & Shaders" },
  { id: "photo-1507499739999-097706ad8914", title: "Instalação de Neon Geométrico & Luzes", theme: "Cyberpunk & Shaders" },
  { id: "photo-1518770660439-4636190af475", title: "Microarquitetura de Processador em Macro", theme: "Cyberpunk & Shaders" },

  // 4. Arte 3D Concreta, Monólitos & Formas Espaciais
  { id: "photo-1600585154340-be6161a56a0c", title: "Monólito Futurista de Linhas Puristas", theme: "Formas Espaciais & 3D" },
  { id: "photo-1635070041078-e363dbe005cb", title: "Túnel Paramétrico Sci-Fi em Perspectiva", theme: "Formas Espaciais & 3D" },
  { id: "photo-1518709268805-4e9042af9f23", title: "Grelha Geométrica de Vidro Espelhado", theme: "Formas Espaciais & 3D" },
  { id: "photo-1541701494587-cb58502866ab", title: "Dinâmica de Fluidos Monocromáticos", theme: "Formas Espaciais & 3D" },

  // 5. Mais opções conceituais 3D / Dark
  { id: "photo-1579783900882-c0d3dad7b119", title: "Arte Abstrata Fluida em Preto e Ouro", theme: "Arte Abstrata Dark" },
  { id: "photo-1618005182384-a83a8bd57fbe", title: "Vórtice Óptico 3D", theme: "Arte Abstrata Dark" },
  { id: "photo-1563089145-599997674d42", title: "Luz Ciano & Silhueta Futurista", theme: "Arte Abstrata Dark" },
  { id: "photo-1607604276583-eef5d076aa5f", title: "Glitch Visual & Monitores Dark", theme: "Arte Abstrata Dark" },
  { id: "photo-1509198397868-475647b2a1e5", title: "Techwear Cyberpunk com Capuz", theme: "Techwear Futurista" },
  { id: "photo-1534528741775-53994a69daeb", title: "Perfil com Iluminação de Estúdio", theme: "Techwear Futurista" }
];

async function check(item) {
  const url = `https://images.unsplash.com/${item.id}?auto=format&fit=crop&w=400&h=400&q=85`;
  try {
    const res = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0" } });
    return { ...item, url, status: res.status };
  } catch (err) {
    return { ...item, url, error: err.message };
  }
}

async function run() {
  const results = [];
  for (const item of candidateIds) {
    const r = await check(item);
    results.push(r);
  }
  console.log(JSON.stringify(results.filter(r => r.status === 200), null, 2));
}

run();
