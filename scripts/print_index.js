async function printIndex() {
  const res = await fetch('https://motionsites.ai/assets/Index-DYrJ3MQl.js', {
    headers: { 'User-Agent': 'Mozilla/5.0' }
  });
  const js = await res.text();
  console.log(js.slice(0, 4000));
}

printIndex();
