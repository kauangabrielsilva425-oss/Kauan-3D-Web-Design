async function scrape() {
  try {
    const res = await fetch('https://motionsites.ai/', {
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
    });
    const html = await res.text();
    console.log('HTML length:', html.length);
    
    // Find all script tags
    const scripts = [...html.matchAll(/src="([^"]+\.js)"/g)].map(m => m[1]);
    console.log('Scripts:', scripts);

    // Let's fetch the main bundle script to find all site items and asset URLs!
    for (const s of scripts) {
      const scriptUrl = s.startsWith('http') ? s : `https://motionsites.ai${s.startsWith('/') ? '' : '/'}${s}`;
      console.log('Fetching script:', scriptUrl);
      const sRes = await fetch(scriptUrl, { headers: { 'User-Agent': 'Mozilla/5.0' } });
      const js = await sRes.text();
      console.log('Script length:', js.length);

      // Find all image/gif/asset references
      const assets = [...js.matchAll(/\/assets\/[a-zA-Z0-9_\-]+\.(?:gif|webp|png|jpg|jpeg|mp4)/g)].map(m => m[0]);
      const uniqueAssets = [...new Set(assets)];
      console.log('Found assets count:', uniqueAssets.length);
      console.log('Sample assets:', uniqueAssets.slice(0, 30));

      // Also look for site titles/names or data structures
      const siteNames = [...js.matchAll(/title:\s*["']([^"']+)["']/g)].map(m => m[1]);
      if (siteNames.length > 0) {
        console.log('Site names:', siteNames.slice(0, 20));
      }
    }
  } catch (err) {
    console.error('Error:', err.message);
  }
}

scrape();
