import https from 'node:https';

const candidateList = [
  // 1. 3D Abstract, Glass & Liquid Chrome
  { id: "photo-1618005182384-a83a8bd57fbe", title: "Vidro Líquido & Refrativo Iridescente", theme: "3D & Vidro Líquido" },
  { id: "photo-1634017839464-5c339ebe3cb4", title: "Escultura Cromada 3D Minimalista", theme: "3D & Vidro Líquido" },
  { id: "photo-1614741118887-7a4ee193a5fa", title: "Topografia Digital & Ondas Holográficas", theme: "3D & Vidro Líquido" },
  { id: "photo-1633167606207-d840b5070fc2", title: "Poliedros de Vidro Negro Flutuantes", theme: "3D & Vidro Líquido" },
  { id: "photo-1620641788421-7a1c342ea42e", title: "Gradiente Fluido Dark & Ciano Profundo", theme: "3D & Vidro Líquido" },

  // 2. Arquitetura Brutalista, Espaço & Formas Dark
  { id: "photo-1600585154340-be6161a56a0c", title: "Monólito Arquitetônico Dark", theme: "Arquitetura Brutalista" },
  { id: "photo-1513694203232-719a280e022f", title: "Geometria de Concreto & Sombras Duras", theme: "Arquitetura Brutalista" },
  { id: "photo-1635070041078-e363dbe005cb", title: "Túnel Futurista Brutalista em Perspectiva", theme: "Arquitetura Brutalista" },
  { id: "photo-1508739773434-c26b3d09e071", title: "Deserto Noturno & Estrutura Monolítica", theme: "Arquitetura Brutalista" },
  { id: "photo-1518709268805-4e9042af9f23", title: "Linhas Geométricas & Reflexos em Vidro Negro", theme: "Arquitetura Brutalista" },

  // 3. Editorial Cyberpunk, Techwear & Moda Conceitual
  { id: "photo-1509198397868-475647b2a1e5", title: "Retrato Editorial Techwear Cyberpunk", theme: "Moda & Techwear Futurista" },
  { id: "photo-1534528741775-53994a69daeb", title: "Silhueta Editorial Iluminação Dramática Dark", theme: "Moda & Techwear Futurista" },
  { id: "photo-1515886657613-9f3515b0c78f", title: "Moda Avant-Garde Minimalista com Iluminação de Estúdio", theme: "Moda & Techwear Futurista" },
  { id: "photo-1539571696357-5a69c17a67c6", title: "Perfil Dark Moderno & Luz de Contorno", theme: "Moda & Techwear Futurista" },

  // 4. Arte Conceitual, Hardware & Tipografia Dark
  { id: "photo-1550745165-9bc0b252726f", title: "Hardware Retrô Futurista & Circuitos Dark", theme: "Hardware & Tipografia Dark" },
  { id: "photo-1607604276583-eef5d076aa5f", title: "Monitores CRT & Glitch Visual Dark", theme: "Hardware & Tipografia Dark" },
  { id: "photo-1579783902614-a3fb3927b675", title: "Escultura Clássica com Intervenção Digital", theme: "Hardware & Tipografia Dark" },
  { id: "photo-1541701494587-cb58502866ab", title: "Explosão de Tinta Negra e Textura Líquida", theme: "Hardware & Tipografia Dark" }
];

function checkUrl(item) {
  const url = `https://images.unsplash.com/${item.id}?auto=format&fit=crop&w=400&h=400&q=80`;
  return new Promise((resolve) => {
    https.get(url, (res) => {
      resolve({ ...item, url, status: res.statusCode, contentType: res.headers['content-type'] });
    }).on('error', (e) => resolve({ ...item, url, error: e.message }));
  });
}

async function run() {
  const results = [];
  for (const item of candidateList) {
    const res = await checkUrl(item);
    results.push(res);
  }
  console.log(JSON.stringify(results, null, 2));
}

run();
