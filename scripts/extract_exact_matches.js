async function extractMatches() {
  const res = await fetch('https://motionsites.ai/assets/prompts-B7hhaEh7.js', {
    headers: { 'User-Agent': 'Mozilla/5.0' }
  });
  const js = await res.text();

  const matches = [...js.matchAll(/\{[^}]+title:[^}]+poster:[^}]+\}/g)].map(m => m[0]);
  console.log('Found matches:', matches.length);

  const parsed = [];
  for (const m of matches) {
    // extract fields
    const id = m.match(/id:\s*[`"']?([^`"',}]+)[`"']?/)?.[1];
    const title = m.match(/title:\s*[`"']?([^`"',}]+)[`"']?/)?.[1];
    const poster = m.match(/poster:\s*[`"']?([^`"',}]+)[`"']?/)?.[1];
    const category = m.match(/category:\s*[`"']?([^`"',}]+)[`"']?/)?.[1];
    const type = m.match(/type:\s*[`"']?([^`"',}]+)[`"']?/)?.[1];
    parsed.push({ id, title, poster, category, type });
  }

  console.log('Parsed successfully:', parsed.length);
  parsed.slice(0, 30).forEach((p, idx) => {
    console.log(`${idx + 1}. [${p.title}] (ID: ${p.id}, Poster: ${p.poster})`);
  });
}

extractMatches();
