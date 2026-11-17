async function debugVariables() {
  const res = await fetch('https://motionsites.ai/assets/prompts-B7hhaEh7.js', {
    headers: { 'User-Agent': 'Mozilla/5.0' }
  });
  const js = await res.text();

  // Print first 1500 characters
  console.log('START OF FILE:');
  console.log(js.slice(0, 1500));
}

debugVariables();
