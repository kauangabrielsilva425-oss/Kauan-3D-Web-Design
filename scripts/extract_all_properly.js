async function extractAllProperly() {
  const res = await fetch('https://motionsites.ai/assets/prompts-B7hhaEh7.js', {
    headers: { 'User-Agent': 'Mozilla/5.0' }
  });
  const js = await res.text();

  // Map variable names to asset paths
  const varMap = {};
  const backtickTokens = js.split('`');
  
  for (let i = 1; i < backtickTokens.length; i += 2) {
    const val = backtickTokens[i];
    if (val.startsWith('/assets/') || val.startsWith('https://')) {
      const prev = backtickTokens[i - 1];
      const varNameMatch = prev.match(/([a-zA-Z0-9_$]+)=$/);
      if (varNameMatch) {
        varMap[varNameMatch[1]] = val;
      }
    }
  }

  console.log('Successfully mapped variables:', Object.keys(varMap).length);
  console.log('Sample mapped variables:', Object.entries(varMap).slice(0, 20));

  // Now extract all website objects from the prompts array!
  const objectChunks = js.split('{id:');
  const sites = [];

  for (let i = 1; i < objectChunks.length; i++) {
    const chunk = objectChunks[i].slice(0, 800);
    const titleMatch = chunk.match(/title:`([^`]+)`/);
    const categoryMatch = chunk.match(/category:`([^`]+)`/);
    const posterMatch = chunk.match(/poster:([a-zA-Z0-9_$]+|`[^`]+`)/);
    const descMatch = chunk.match(/description:`([^`]+)`/);

    if (titleMatch && posterMatch) {
      let posterVar = posterMatch[1];
      let posterUrl = '';
      if (posterVar.startsWith('`')) {
        posterUrl = posterVar.slice(1, -1);
      } else if (varMap[posterVar]) {
        posterUrl = varMap[posterVar];
      }

      if (posterUrl && posterUrl.startsWith('/assets/')) {
        posterUrl = `https://motionsites.ai${posterUrl}`;
      }

      if (posterUrl) {
        sites.push({
          title: titleMatch[1],
          category: categoryMatch ? categoryMatch[1] : 'Website',
          desc: descMatch ? descMatch[1] : '',
          posterUrl
        });
      }
    }
  }

  console.log('Total sites with poster extracted:', sites.length);
  sites.slice(0, 30).forEach((s, idx) => {
    console.log(`${idx + 1}. [${s.title}] (${s.category}) -> ${s.posterUrl}`);
  });

  return sites;
}

extractAllProperly();
