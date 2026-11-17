async function parseAllPrompts() {
  const res = await fetch('https://motionsites.ai/assets/prompts-B7hhaEh7.js', {
    headers: { 'User-Agent': 'Mozilla/5.0' }
  });
  const js = await res.text();

  // Extract all poster and preview assets
  const posters = [...js.matchAll(/\/assets\/hero-[a-zA-Z0-9_\-]+-poster-[a-zA-Z0-9_\-]+\.png/g)].map(m => m[0]);
  const previews = [...js.matchAll(/\/assets\/hero-[a-zA-Z0-9_\-]+-preview-[a-zA-Z0-9_\-]+\.gif/g)].map(m => m[0]);

  console.log('Total posters found:', posters.length);
  console.log('Total previews found:', previews.length);

  // Let us match items by inspecting the data array
  // In prompts-B7hhaEh7.js, items are declared as objects
  console.log('Posters sample:');
  console.log(posters.slice(0, 30));
}

parseAllPrompts();
