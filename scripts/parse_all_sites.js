async function parseAllSites() {
  const res = await fetch('https://motionsites.ai/assets/prompts-B7hhaEh7.js', {
    headers: { 'User-Agent': 'Mozilla/5.0' }
  });
  const js = await res.text();

  // Find all prompt items
  // regex to capture id, title, poster, image, category
  const itemRegex = /\{id:[`"']([^`"']+)`?["'],title:[`"']([^`"']+)`?["'],image:[`"']?([^`"',}]+)[`"']?,poster:[`"']?([^`"',}]+)[`"']?,category:[`"']?([^`"',}]+)[`"']?/g;
  
  const items = [];
  let match;
  while ((match = itemRegex.exec(js)) !== null) {
    items.push({
      id: match[1],
      title: match[2],
      image: match[3],
      poster: match[4],
      category: match[5]
    });
  }

  console.log('Parsed items count:', items.length);
  console.log('First 20 items:');
  items.slice(0, 20).forEach((it, idx) => {
    console.log(`${idx + 1}. [${it.title}] (${it.category})`);
    console.log(`   Poster: ${it.poster}`);
  });
}

parseAllSites();
