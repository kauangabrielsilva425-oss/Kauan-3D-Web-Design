async function findEndpoints() {
  const res = await fetch('https://motionsites.ai/assets/index-DFt5aiKe.js', {
    headers: { 'User-Agent': 'Mozilla/5.0' }
  });
  const js = await res.text();
  
  const supabase = [...js.matchAll(/https:\/\/[a-z0-9\-]+\.supabase\.co[^\s"'`)]*/g)].map(m => m[0]);
  console.log('Supabase:', [...new Set(supabase)]);

  const apis = [...js.matchAll(/https?:\/\/[a-zA-Z0-9_\-\.]+\/api[^\s"'`)]*/g)].map(m => m[0]);
  console.log('APIs:', [...new Set(apis)]);

  const storage = [...js.matchAll(/https:\/\/storage\.googleapis\.com[^\s"'`)]*/g)].map(m => m[0]);
  console.log('Google storage:', [...new Set(storage)]);
}

findEndpoints();
