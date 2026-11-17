async function parseWithEvalOrLooseRegex() {
  const res = await fetch('https://motionsites.ai/assets/prompts-B7hhaEh7.js', {
    headers: { 'User-Agent': 'Mozilla/5.0' }
  });
  const js = await res.text();

  // Find all occurrences of `{id:`
  const parts = js.split('{id:');
  const sites = [];
  
  for (let i = 1; i < parts.length; i++) {
    const chunk = parts[i].slice(0, 500); // look at the first 500 chars of the object
    const idMatch = chunk.match(/^[`"']([^`"']+)`?["']/);
    const titleMatch = chunk.match(/title:[`"']([^`"']+)`?["']/);
    const posterMatch = chunk.match(/poster:[`"']?([^`"',}]+)[`"']?/);
    const categoryMatch = chunk.match(/category:[`"']?([^`"',}]+)[`"']?/);
    const descMatch = chunk.match(/description:[`"']([^`"']+)`?["']/);
    
    if (idMatch && titleMatch) {
      sites.push({
        id: idMatch[1],
        title: titleMatch[1],
        poster: posterMatch ? posterMatch[1] : null,
        category: categoryMatch ? categoryMatch[1] : 'Website',
        desc: descMatch ? descMatch[1] : ''
      });
    }
  }

  console.log('Total sites parsed:', sites.length);
  sites.slice(0, 35).forEach((s, idx) => {
    console.log(`${idx + 1}. [${s.title}] (${s.id}) -> Poster: ${s.poster}`);
  });
}

parseWithEvalOrLooseRegex();
