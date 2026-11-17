import https from 'node:https';

const testCandidates = [
  { id: "photo-1518770660439-4636190af475", title: "Microchip & Processador em Macro Dark" },
  { id: "photo-1507499739999-097706ad8914", title: "Instalação de Luzes e Geometria Cyber" },
  { id: "photo-1550751827-4bd374c3f58b", title: "Metrópole Cyberpunk Dark & Chuva de Neon" },
  { id: "photo-1563089145-599997674d42", title: "Luz Ciano & Silhueta Futurista Minimalista" },
  { id: "photo-1617791160505-6f00504e3519", title: "Esfera de Vidro 3D Minimalista Flutuante" }
];

function checkUrl(item) {
  const url = `https://images.unsplash.com/${item.id}?auto=format&fit=crop&w=400&h=400&q=80`;
  return new Promise((resolve) => {
    https.get(url, (res) => {
      resolve({ ...item, url, status: res.statusCode });
    }).on('error', (e) => resolve({ ...item, url, error: e.message }));
  });
}

async function run() {
  for (const item of testCandidates) {
    const res = await checkUrl(item);
    console.log(res);
  }
}

run();
