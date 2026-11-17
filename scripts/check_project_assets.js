import https from 'node:https';

const projectUrls = [
  // 1. Nextlevel Studio (Hero & 3D UI)
  {
    name: "01. Nextlevel Studio - 3D Holographic UI",
    url: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055344_5eff02e0-87a5-41ce-b64f-eb08da8f33db.png&w=800&q=85"
  },
  // 2. Nextlevel Studio - Dark Minimalist Dashboard
  {
    name: "02. Nextlevel Studio - Dark Minimalist Interface",
    url: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055431_11d841fd-8b41-46a5-82e4-b04f2407a7d8.png&w=800&q=85"
  },
  // 3. Nextlevel Studio - CGI Studio Setup
  {
    name: "03. Nextlevel Studio - CGI Studio Render",
    url: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055451_e317bf2d-28d4-48cc-86b0-6f72f25b6327.png&w=800&q=85"
  },
  // 4. Aura Brand Identity - Luxury Tech 3D
  {
    name: "04. Aura Tech - Luxury Spatial Device 3D",
    url: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055654_911201c5-36d9-4bc6-bac7-331adfce159f.png&w=800&q=85"
  },
  // 5. Aura Brand Identity - Kinetic Branding
  {
    name: "05. Aura Tech - Kinetic Brand Identity",
    url: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055723_5ceda0b8-d9c2-4665-b2e3-83ba19ba76d1.png&w=800&q=85"
  },
  // 6. Aura Brand Identity - Packaging & 3D Glass
  {
    name: "06. Aura Tech - Glassmorphism Packaging 3D",
    url: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055753_adc5dcbd-a8e6-49c0-b43a-9b030d835cea.png&w=800&q=85"
  },
  // 7. Solaris Digital - Photoreal 3D Web3 Sphere
  {
    name: "07. Solaris Web3 - Photoreal 3D Mesh",
    url: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055759_963cfb0b-4bd1-4b0f-9d0a-09bd6cf95b2f.png&w=800&q=85"
  },
  // 8. Solaris Digital - Dark Cyber Terminal
  {
    name: "08. Solaris Web3 - Dark Cyber Terminal",
    url: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_060108_438f781a-9846-4dcc-89ab-c4e6cb830f5b.png&w=800&q=85"
  },
  // 9. Solaris Digital - Interactive 3D Architecture
  {
    name: "09. Solaris Web3 - Spatial Node Network",
    url: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055818_9d062121-ad7e-46b9-999a-1a6a692ef1ee.png&w=800&q=85"
  },
  // Showcase WebGL GIF items
  {
    name: "10. Space Voyage - 3D WebGL Spatial Universe",
    url: "https://motionsites.ai/assets/hero-space-voyage-preview-eECLH3Yc.gif"
  },
  {
    name: "11. CodeNest Interactive - Futuristic Dark IDE & WebGL",
    url: "https://motionsites.ai/assets/hero-codenest-preview-Cgppc2qV.gif"
  },
  {
    name: "12. Vex Ventures - 3D CGI Liquid Metallic Branding",
    url: "https://motionsites.ai/assets/hero-vex-ventures-preview-BczMFIiw.gif"
  },
  {
    name: "13. Stellar Intelligence - Real-Time Neural WebGL",
    url: "https://motionsites.ai/assets/hero-stellar-ai-preview-D3HL6bw1.gif"
  },
  {
    name: "14. Aethera OS - Cyber Interface & Holographic Glass",
    url: "https://motionsites.ai/assets/hero-aethera-preview-DknSlcTa.gif"
  },
  {
    name: "15. Orbit Decentralized - 3D Web3 Spatial World",
    url: "https://motionsites.ai/assets/hero-orbit-web3-preview-BXt4OttD.gif"
  },
  {
    name: "16. CyberPulse - Kinetic Audio Synth Hardware",
    url: "https://motionsites.ai/assets/hero-cyber-pulse-preview-BEoJ-6z8.gif"
  },
  {
    name: "17. DesignPro Studio - Awwwards Interactive Craft",
    url: "https://motionsites.ai/assets/hero-designpro-preview-D8c5_een.gif"
  },
  {
    name: "18. Quantum Cloud - Volumetric Shaders & Particle Field",
    url: "https://motionsites.ai/assets/hero-quantum-cloud-preview-C15_nZ7O.gif"
  }
];

function checkUrl(item) {
  return new Promise((resolve) => {
    https.get(item.url, (res) => {
      resolve({ ...item, status: res.statusCode, contentType: res.headers['content-type'], size: res.headers['content-length'] });
    }).on('error', (e) => resolve({ ...item, error: e.message }));
  });
}

async function run() {
  for (const item of projectUrls) {
    const res = await checkUrl(item);
    console.log(res);
  }
}

run();
