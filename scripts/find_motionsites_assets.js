async function findAssets() {
  const sRes = await fetch('https://motionsites.ai/assets/index-DFt5aiKe.js', {
    headers: { 'User-Agent': 'Mozilla/5.0' }
  });
  const js = await sRes.text();
  console.log('JS length:', js.length);
  const heroMatches = [...js.matchAll(/hero-[a-zA-Z0-9_\-]+/g)].map(m => m[0]);
  console.log('hero- matches count:', heroMatches.length);
  console.log('Sample hero- matches:', [...new Set(heroMatches)].slice(0, 50));
  
  // Also search for website names or domains or titles
  const websiteMatches = [...js.matchAll(/["']([a-zA-Z0-9_\-]+\.(?:com|io|ai|app|design|dev))["']/g)].map(m => m[1]);
  console.log('Domains found:', [...new Set(websiteMatches)].slice(0, 30));
}

findAssets();
