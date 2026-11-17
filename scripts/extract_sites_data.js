async function extractSitesData() {
  const res = await fetch('https://motionsites.ai/assets/prompts-B7hhaEh7.js', {
    headers: { 'User-Agent': 'Mozilla/5.0' }
  });
  const js = await res.text();

  // Find objects with title, category, preview/poster
  // In minified code, look for `{id:...,title:...,...}` or similar
  const matches = [...js.matchAll(/\{[^}]+title:[^}]+poster:[^}]+\}/g)].map(m => m[0]);
  console.log('Matches with title & poster:', matches.length);
  if (matches.length > 0) {
    console.log('Sample match:', matches[0]);
  } else {
    // Let's search how items are defined
    const titleMatches = [...js.matchAll(/title:\s*["']([^"']+)["']/g)].map(m => m[1]);
    console.log('Titles count:', titleMatches.length, titleMatches.slice(0, 25));
  }
}

extractSitesData();
