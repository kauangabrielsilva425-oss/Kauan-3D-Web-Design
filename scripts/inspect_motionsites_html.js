async function inspectHtml() {
  const res = await fetch('https://motionsites.ai/', {
    headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
  });
  const html = await res.text();
  console.log('HTML preview:');
  console.log(html.slice(0, 3000));
}

inspectHtml();
