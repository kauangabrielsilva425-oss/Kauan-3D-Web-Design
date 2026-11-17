const fs = require('fs');
const path = require('path');

const projectRoot = path.join(__dirname, '..');
const logosDir = path.join(projectRoot, 'public', 'logos');
const outFile = path.join(projectRoot, 'src', 'data', 'customLogos.ts');

const LOGO_CONFIG = [
  { id: 'gemini', name: 'Google Gemini', file: 'gemini.png', category: 'ai' },
  { id: 'claude', name: 'Anthropic Claude', file: 'claude.png', category: 'ai' },
  { id: 'v0', name: 'Vercel v0', file: 'v0.png', category: 'build' },
  { id: 'cursor', name: 'Cursor AI', file: 'cursor.png', category: 'build' },
  { id: 'github', name: 'GitHub', file: 'github.png', category: 'build' },
  { id: 'notion', name: 'Notion', file: 'notion.png', category: 'productivity' },
  { id: 'threads', name: 'Threads', file: 'threads.png', category: 'social' },
  { id: 'youtube', name: 'YouTube', file: 'youtube.png', category: 'monetize' },
  { id: 'chatgpt', name: 'ChatGPT', file: 'chatgpt.png', category: 'ai' },
  { id: 'replit', name: 'Replit', file: 'replit.png', category: 'build' },
  { id: 'arc', name: 'Arc Browser', file: 'arc.png', category: 'productivity' },
];

const items = LOGO_CONFIG.map(cfg => {
  const filePath = path.join(logosDir, cfg.file);
  if (!fs.existsSync(filePath)) {
    throw new Error(`File not found: ${filePath}`);
  }
  const base64 = fs.readFileSync(filePath).toString('base64');
  return {
    id: cfg.id,
    name: cfg.name,
    category: cfg.category,
    url: `/logos/${cfg.file}`,
    dataUri: `data:image/png;base64,${base64}`
  };
});

const tsCode = `// Auto-generated high-fidelity custom logos data with all 11 platforms
export interface CustomLogoItem {
  id: string;
  name: string;
  category: 'ai' | 'build' | 'productivity' | 'social' | 'monetize';
  url: string;
  dataUri: string;
}

export const CUSTOM_LOGOS: CustomLogoItem[] = ${JSON.stringify(items, null, 2)};
`;

fs.writeFileSync(outFile, tsCode, 'utf-8');
console.log(`Generated ${items.length} custom logos into ${outFile}!`);
