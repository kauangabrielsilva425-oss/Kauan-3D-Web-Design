async function resolveAllVariables() {
  const res = await fetch('https://motionsites.ai/assets/prompts-B7hhaEh7.js', {
    headers: { 'User-Agent': 'Mozilla/5.0' }
  });
  const js = await res.text();

  // Find all variable declarations like `varName="/assets/hero-..."` or `varName=`/assets/...``
  const varMap = {};
  const varRegex = /([a-zA-Z0-9_$]+)=[`"'](\/assets\/[^`"']+\.(?:png|gif|webp|jpg)|https:\/\/[^`"']+)`?["']/g;
  let vm;
  while ((vm = varRegex.exec(js)) !== null) {
    varMap[vm[1]] = vm[2];
  }

  console.log('Total resolved variables:', Object.keys(varMap).length);

  // Extract matches
  const matches = [...js.matchAll(/\{[^}]+title:[^}]+poster:[^}]+\}/g)].map(m => m[0]);
  const sites = [];

  for (const m of matches) {
    const id = m.match(/id:\s*[`"']?([^`"',}]+)[`"']?/)?.[1];
    const title = m.match(/title:\s*[`"']?([^`"',}]+)[`"']?/)?.[1];
    const rawPoster = m.match(/poster:\s*[`"']?([^`"',}]+)[`"']?/)?.[1];
    const category = m.match(/category:\s*[`"']?([^`"',}]+)[`"']?/)?.[1];

    let posterUrl = rawPoster;
    if (rawPoster && varMap[rawPoster]) {
      posterUrl = varMap[rawPoster];
    }
    if (posterUrl && !posterUrl.startsWith('http')) {
      posterUrl = `https://motionsites.ai${posterUrl.startsWith('/') ? '' : '/'}${posterUrl}`;
    }

    if (title && posterUrl) {
      sites.push({ id, title, category, posterUrl });
    }
  }

  console.log('Sites with full poster URL:', sites.length);
  sites.slice(0, 30).forEach((s, i) => {
    console.log(`${i+1}. [${s.title}] (${s.category}) -> ${s.posterUrl}`);
  });

  return sites;
}

resolveAllVariables();
