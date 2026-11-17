import fs from 'node:fs';

async function analyze() {
  const res = await fetch('https://motionsites.ai/', {
    headers: { 'User-Agent': 'Mozilla/5.0' }
  });
  const html = await res.text();
  
  // Search for any .gif, .mp4, .webp, .png in html
  const inHtml = [...html.matchAll(/(https?:\/\/[^\s"'<>]+\.(?:gif|webp|png|jpg|mp4)|[^\s"'<>]+\.(?:gif|webp|png|jpg|mp4))/g)].map(m => m[0]);
  console.log('Media in HTML:', [...new Set(inHtml)].slice(0, 30));

  const sRes = await fetch('https://motionsites.ai/assets/index-DFt5aiKe.js', {
    headers: { 'User-Agent': 'Mozilla/5.0' }
  });
  const js = await sRes.text();
  
  // Search for any media in JS
  const inJs = [...js.matchAll(/(https?:\/\/[^\s"'<>]+\.(?:gif|webp|png|jpg|mp4)|[a-zA-Z0-9_\-\/]+\.(?:gif|webp|png|jpg|mp4))/g)].map(m => m[0]);
  console.log('Media in JS:', [...new Set(inJs)].slice(0, 40));

  // Also check if there's an API or JSON data
  const jsonUrls = [...js.matchAll(/(https?:\/\/[^\s"'<>]+\.json|[a-zA-Z0-9_\-\/]+\.json)/g)].map(m => m[0]);
  console.log('JSON files:', [...new Set(jsonUrls)]);
}

analyze();
