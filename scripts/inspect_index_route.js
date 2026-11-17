async function inspectIndexRoute() {
  const res = await fetch('https://motionsites.ai/assets/Index-DYrJ3MQl.js', {
    headers: { 'User-Agent': 'Mozilla/5.0' }
  });
  const js = await res.text();
  console.log('Index JS length:', js.length);
  
  // Find all strings matching image/asset paths or titles
  const assetMatches = [...js.matchAll(/\/assets\/[a-zA-Z0-9_\-]+\.(?:gif|webp|png|jpg|mp4)/g)].map(m => m[0]);
  console.log('Asset matches:', [...new Set(assetMatches)]);

  // Let's find any object or array of sites
  // e.g. title:, name:, slug:, preview:, image:
  const titles = [...js.matchAll(/title:\s*["']([^"']+)["']/g)].map(m => m[1]);
  console.log('Titles found:', titles.slice(0, 30));

  // Let's search for "hero-" in this file!
  const heroMatches = [...js.matchAll(/hero-[a-zA-Z0-9_\-]+/g)].map(m => m[0]);
  console.log('hero matches:', [...new Set(heroMatches)]);
}

inspectIndexRoute();
