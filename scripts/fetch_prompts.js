async function fetchPrompts() {
  const res = await fetch('https://motionsites.ai/assets/prompts-B7hhaEh7.js', {
    headers: { 'User-Agent': 'Mozilla/5.0' }
  });
  const js = await res.text();
  console.log('Prompts JS length:', js.length);
  console.log(js.slice(0, 3000));
}

fetchPrompts();
