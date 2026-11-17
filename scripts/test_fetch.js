async function test() {
  try {
    const res = await fetch('https://motionsites.ai/assets/hero-codenest-preview-Cgppc2qV.gif', {
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
    });
    console.log('Status:', res.status, 'Content-Length:', res.headers.get('content-length'));
    const arrayBuffer = await res.arrayBuffer();
    console.log('Downloaded bytes:', arrayBuffer.byteLength);
  } catch (err) {
    console.error('Fetch error:', err.message);
  }
}
test();
