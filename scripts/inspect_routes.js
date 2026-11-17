async function inspectRoutes() {
  const res = await fetch('https://motionsites.ai/assets/routes-Cd381sVb.js', {
    headers: { 'User-Agent': 'Mozilla/5.0' }
  });
  const js = await res.text();
  console.log('Routes JS length:', js.length);
  
  // Find all module chunks imported in routes
  const imports = [...js.matchAll(/\/assets\/[a-zA-Z0-9_\-]+\.js/g)].map(m => m[0]);
  console.log('Route imports:', [...new Set(imports)]);
}

inspectRoutes();
