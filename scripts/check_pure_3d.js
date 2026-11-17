import sharp from 'sharp';

// Top 3D CGI renders from famous 3D artists on Unsplash (Milad Fakurian, Shubham Dhage, Google DeepMind 3D, Planet Volumes)
const pure3DCGICandidates = [
  // Cromo Líquido & Metal 3D
  { id: "photo-1634017839464-5c339ebe3cb4", title: "Escultura Cromada 3D Espelhada", theme: "Cromo Líquido" },
  { id: "photo-1618005182384-a83a8bd57fbe", title: "Vidro Líquido & Refrações Iridescentes", theme: "Vidro Líquido" },
  { id: "photo-1614741118887-7a4ee193a5fa", title: "Topografia Paramétrica Holográfica", theme: "Shaders WebGL" },
  { id: "photo-1633167606207-d840b5070fc2", title: "Poliedro de Vidro Negro Flutuante", theme: "Vidro Negro & Caustics" },
  { id: "photo-1617791160505-6f00504e3519", title: "Esfera de Vidro Minimalista no Vácuo", theme: "Vidro Negro & Caustics" },
  { id: "photo-1620641788421-7a1c342ea42e", title: "Gradiente Fluido Ciano Elétrico & Dark", theme: "Fluidos Digitais" },
  { id: "photo-1618005182384-a83a8bd57fbe", title: "Vórtice Óptico 3D", theme: "Vidro Líquido" },
  { id: "photo-1635070041078-e363dbe005cb", title: "Túnel Paramétrico Sci-Fi em Perspectiva", theme: "Arquitetura 3D Sci-Fi" },
  { id: "photo-1541701494587-cb58502866ab", title: "Dinâmica de Fluidos Monocromáticos", theme: "Fluidos 3D" },
  { id: "photo-1579783900882-c0d3dad7b119", title: "Arte Abstrata Fluida em Preto e Ouro", theme: "Cromo & Ouro Líquido" },
  { id: "photo-1550745165-9bc0b252726f", title: "Hardware Retrô Futurista & Sintetizador", theme: "Gadget Futurista" },
  { id: "photo-1518770660439-4636190af475", title: "Microprocessador & Circuitos em Macro Dark", theme: "Gadget Futurista" },
  { id: "photo-1507499739999-097706ad8914", title: "Instalação de Neon Geométrico 3D", theme: "Shaders WebGL" },
  { id: "photo-1526374965328-7f61d4dc18c5", title: "Matriz Cibernética & Fluxo de Código", theme: "Shaders WebGL" },
  { id: "photo-1550751827-4bd374c3f58b", title: "Metrópole Cyberpunk & Iluminação Dark", theme: "Cenário Sci-Fi 3D" },
  { id: "photo-1563089145-599997674d42", title: "Luz Ciano & Silhueta Futurista Minimalista", theme: "Minimalismo Dark" },
  { id: "photo-1518709268805-4e9042af9f23", title: "Grelha Geométrica de Vidro Espelhado", theme: "Geometria Espacial" },
  { id: "photo-1600585154340-be6161a56a0c", title: "Monólito Futurista Dark", theme: "Geometria Espacial" }
];

async function checkUrl(item) {
  const url = `https://images.unsplash.com/${item.id}?auto=format&fit=crop&w=400&h=400&q=85`;
  try {
    const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
    return { ...item, url, ok: res.ok, status: res.status };
  } catch (err) {
    return { ...item, url, ok: false, error: err.message };
  }
}

async function run() {
  const checked = [];
  for (const c of pure3DCGICandidates) {
    const res = await checkUrl(c);
    checked.push(res);
  }
  console.log('Checked:', checked.filter(c => c.ok).length, 'of', pure3DCGICandidates.length);
}
run();
