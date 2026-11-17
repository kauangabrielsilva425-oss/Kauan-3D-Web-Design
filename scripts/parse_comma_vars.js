async function parseCommaVars() {
  const res = await fetch('https://motionsites.ai/assets/prompts-B7hhaEh7.js', {
    headers: { 'User-Agent': 'Mozilla/5.0' }
  });
  const js = await res.text();

  // Find all variable declarations
  // e.g. `varName=`/assets/...`` or `varName="/assets/..."`
  const varMap = {};
  const regex = /([a-zA-Z0-9_$]+)=[`"'](\/assets\/[^`"']+)`?["']/g;
  let m;
  while ((m = regex.exec(js)) !== null) {
    varMap[m[1]] = m[2];
  }

  // Also Mux thumbnail webp URLs
  const muxRegex = /([a-zA-Z0-9_$]+)=[`"'](https:\/\/image\.mux\.com\/[^`"']+)`?["']/g;
  while ((m = muxRegex.exec(js)) !== null) {
    varMap[m[1]] = m[2];
  }

  console.log('Total resolved variable names:', Object.keys(varMap).length);
  console.log('Sample varMap:', Object.entries(varMap).slice(0, 15));

  // Now resolve all 117 sites!
  const matches = [...js.matchAll(/\{[^}]+title:[^}]+poster:[^}]+\}/g)].map(match => match[0]);
  const resolvedSites = [];

  for (const match of matches) {
    const id = match.match(/id:\s*[`"']?([^`"',}]+)[`"']?/)?.[1];
    const title = match.match(/title:\s*[`"']?([^`"',}]+)[`"']?/)?.[1];
    const rawPoster = match.match(/poster:\s*[`"']?([^`"',}]+)[`"']?/)?.[1];
    const category = match.match(/category:\s*[`"']?([^`"',}]+)[`"']?/)?.[1];

    let fullPoster = rawPoster;
    if (rawPoster && varMap[rawPoster]) {
      fullPoster = varMap[rawPoster];
    }
    if (fullPoster && fullPoster.startsWith('/assets/')) {
      fullPoster = `https://motionsites.ai${fullPoster}`;
    }

    if (title && fullPoster && fullPoster.startsWith('http')) {
      resolvedSites.push({ id, title, category, fullPoster });
    }
  }

  console.log('Total successfully resolved sites:', resolvedSites.length);
  resolvedSites.slice(0, 25).forEach((s, idx) => {
    console.log(`${idx + 1}. [${s.title}] (${s.category}) -> ${s.fullPoster}`);
  });

  return resolvedSites;
}

parseCommaVars();
