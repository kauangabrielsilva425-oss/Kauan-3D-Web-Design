# 🧠 Memória Permanente do Projeto & Estado Atual (Kauan Gabriel Portfolio)

> **AVISO PARA QUALQUER IA / MODELO (Claude, Gemini, GPT ou Nova Sessão)**:
> Leia atentamente este documento ao iniciar ou retomar qualquer turno. O usuário Kauan Gabriel configurou este arquivo para garantir continuidade imediata entre limites de uso, trocas de modelo ou recargas de quota.

---

## 📌 Contexto & Estado do Projeto
- **Repositório**: `c:\Users\Admin\Documents\Projetos\jack-portfolio`
- **Servidor Local**: Vite dev server rodando em background (`http://localhost:5173/`, `IsDaemon: true`).
- **Profissional**: **Kauan Gabriel** — *Web Designer & AI Engineer*.
- **Posicionamento**: Criação de interfaces digitais sensoriais, experiências 3D WebGL em tempo real e soluções impulsionadas por IA para marcas de alto impacto e fundadores visionários.

---

## 🎨 Decisões de Design & Regras Ativas Implementadas

### 1. Paleta & Atmosfera (Pitch Black)
- Fundo do site é **preto absoluto (`#000000`)**.
- A tela de introdução (`IntroScreen`) é `#000000` puro (sem gradientes cinzas/azulados de fundo).
- Eliminação total de barras de rolagem aparentes, linhas artificiais horizontais de slide ou bordas desnecessárias.

### 2. Tipografia Editorial Consagrada
- Headings de impacto: Google Fonts **`Anton`** e **`Archivo Black`** (`HI, I'M KAUAN`, `SPACES FOR FUTURE LIVING HERE`).
- Demais textos: Tipografia limpa, monospace parakickers técnicos (`// 01 | SOBRE MIM`, `// 02 | ENGENHARIA DE IA & WEB DESIGN`).

### 3. Cadeira 3D Interativa (`Spatial3DShowcaseSection.tsx`)
- Animação original com rotação 3D contínua em múltiplos eixos impulsionada pelo scroll (`rotation.x = scroll * 4π + 0.45`, `rotation.y = scroll * 2.2π + 0.35`).
- Levitação senoidal orgânica (`position.y = sin(t * 1.5) * 0.18`).
- Acabamento metálico PBR com reflexos especulares profundos, rim light ciano e iluminação de estúdio ACES Filmic (exposure 2.4).
- 3 Estágios de scroll com lista editorial ao fundo: `Ripple Bench`, `Arc Table`, `Orb Vase`, `Grid Shelving`, `Halo Pendant`, `Flow Chair`.
- Fundo preto absoluto (`#000000`).
- **Visual 100% Limpo (Poluição Removida)**:
  - Removido mini-nav HUD superior (`KAUAN ATELIER 3D` com ponto ciano e botão `CONTACT // PROPOSTA`).
  - Removida barra de progresso horizontal ciano e contador `3D SCROLL EXPERIENCE • 100%`.
  - Removidos textos de rodapé da seção (`bespoke.kauan.com`, `contato@kauan.design`, `ROLE PARA CONTINUAR...` e linha divisória horizontal).
  - Removido o badge ciano do estágio 3 (`// ATELIER KAUAN GABRIEL // 2026`), mantendo apenas a frase final limpa.
- O root e body usam `overflow-x: clip` para manter a fixação sticky impecável sem bugs.

### 4. Manifesto dos Cubos 3D (`OrchestraCubesSection.tsx`)
- **Fase 1**: `CODE. DESIGN. INTELLIGENCE.` (PT: `CÓDIGO. DESIGN. INTELIGÊNCIA.`)
- **Fase 2**: `KAUAN GABRIEL // APPROACH` | `WHERE DESIGN MEETS INTELLIGENCE.` (PT: `Onde o design encontra a inteligência.`) | `I unite expressive web design, real-time 3D, and artificial intelligence to turn ambitious ideas into reality.` (PT: `Eu uno web design expressivo, 3D em tempo real e inteligência artificial para transformar ideias ambiciosas em realidade.`)

### 5. Seção Sobre Mim (`AboutSection.tsx`)
- Texto principal atualizado para:
  > *"Sou Kauan Gabriel, web designer & AI engineer apaixonado por construir experiências digitais inteligentes. Meu trabalho foca em design UI/UX, experiências web 3D e soluções impulsionadas por IA. Combino estética, código e inteligência artificial para transformar ideias complexas em produtos marcantes e funcionais..."*

### 6. Seção de Telas 3D (`WebDesignAiEngineerSection.tsx`)
- **Estilo**: Visual **100% limpo** estilo RafxVision (Edge-to-Edge).
- **Animação 3D Exata do Vídeo RafxVision**:
  - Trajetória de chegada em asas 3D espaciais (`[perspective:1400px]`, `preserve-3d`).
  - Cada card converge suavemente com rotações e posições 3D calibradas:
    - Card 0 (Crimson Rite): `x: -260, y: -30, z: -280, rotateY: 26, rotateX: 10, rotateZ: -4, scale: 0.82`
    - Card 1 (Lumen Roof): `x: 0, y: -140, z: -220, rotateX: 20, scale: 0.86`
    - Card 2 (Imagine Studio): `x: 260, y: -30, z: -280, rotateY: -26, rotateX: 10, rotateZ: 4, scale: 0.82`
    - Card 3 (Porsche / Roadster): `x: -260, y: 80, z: -280, rotateY: 26, rotateX: -10, rotateZ: 4, scale: 0.82`
    - Card 4 (Facet Glass): `x: 0, y: 140, z: -220, rotateX: -20, scale: 0.86`
    - Card 5 (Neural Kinetics): `x: 260, y: 80, z: -280, rotateY: -26, rotateX: -10, rotateZ: -4, scale: 0.82`
  - **Pouso 100% Plano**: Todos os 6 cards travam perfeitamente alinhados e planos no grid 2x3 (`rotateX: 0, rotateY: 0, rotateZ: 0, scale: 1`).
  - **Cinemática**: Curva `cubic-bezier(0.16, 1, 0.3, 1)` com duração de 1.2s e stagger de 0.08s.
  - **Hover Interativo**: Elevação suave (`scale: 1.03, z: 35`), realce de borda branca translúcida e sombra profunda.
- **Sem poluição**: Removidos todos os textos sobrepostos, descrições, tags, contadores (`01 // 06`), indicador de "LIVE DEMO", botão circular com a seta (`↗`) e os 4 pill badges inferiores (`Three.js / WebGL 60FPS`, `Agentes Autônomos de IA`, `Shaders GLSL Customizados`, `Interfaces Sensoriais & 3D`). Permanece apenas a assinatura tipográfica sutil `WEB DESIGN / DEVELOPMENT / DIGITAL / EXPERIMENTS`.
- **Sem redirecionamento**: Nenhuma ação de clique ativa nas telas (`onClick` removido).
- **Reprodução Contínua 24/7**: Todos os vídeos rodam **de forma automática, contínua e sem necessidade de passar o mouse** (`autoPlay`, `loop`, `muted`, `playsInline`).
- **Mídias em Alta Fidelidade (100% MP4)**:
  1. *Tattoo Studio // Crimson Rite* (`/ai-craft/card-1-tattoo.mp4`)
  2. *Solar Fog // Lumen Roof* (`/ai-craft/card-2-lumen.mp4`)
  3. *Hover Ink // Imagine Studio* (`/ai-craft/card-3-hoverink.mp4`)
  4. *Automotive Spatial // Type 01 Roadster* (`/ai-craft/card-4-newera.mp4`)
  5. *Facet Glass // Refração 3D* (`/ai-craft/card-5-facetglass.mp4`)
  6. *Human Machine // Neural Kinetics* (`/ai-craft/card-6-humanmachine.mp4`)

### 7. Final do Site (`App.tsx` & `EditorialMoodboardStream.tsx`)
- O final do site termina exclusivamente com o feed fotográfico estético em stream contínuo expandido para **12 fileiras completas** (mais de 3.750px de profundidade de scroll).
- Mais de 100 fotografias editoriais PB de alto padrão que se expandem dinamicamente durante a rolagem.
- Encerramento fluido sobre preto absoluto (`#000000`) sem rodapés repetidos ou formulários adicionais no final.

### 8. Sistema Multilíngue & Padrão do Site (`LanguageContext.tsx`)
- **Idioma Padrão do Site**: **Inglês (`EN`)** por padrão para qualquer visitante inicial (`storageKey: 'kauan_portfolio_lang'`).
- **Alternância Dinâmica (EN, PT, ES)**: Todos os blocos do site (Hero, Sobre Mim, Telas de Vídeo, Serviços, Experiência da Cadeira 3D em todos os 3 estágios, Manifesto dos Cubos 3D, Formulário de Orçamento/Proposta, Modal de Contato e Modal Legal) traduzem 100% dinamicamente sem resquícios de texto em outro idioma.
- **Integridade Textual & Tipográfica**: Zero caracteres corrompidos (mojibake) e ortografia refinada em inglês, português e espanhol.

### 9. Remoção Completa de 'Estúdio' / 'Studio' & Narrativa Exclusiva em 1ª Pessoa do Singular (Fale Só de Mim)
- **Zero Estúdio**: Todas as menções a "estúdio", "estudio", "studio", "estúdios", "studios" e marcas antigas ("Vision Studios", "Estúdio Vision") foram **100% erradicadas** de todo o código, componentes e dicionários de idiomas (EN, PT, ES).
- **Narrativa Exclusiva em 1ª Pessoa do Singular**: Toda a comunicação do site fala estritamente e exclusivamente de Kauan Gabriel na primeira pessoa ("eu", "desenvolvo", "crio", "construo", "transformo", "I build", "I create", "I sculpt", "desarrollo", "creo", "construyo").
- **Cadeira 3D (Estágio 1)**: O texto de abertura da cadeira (`spatial.stage1_p`) inicia diretamente sem a palavra estúdio:
  - **PT**: `"Modelagem 3D & computação espacial. Criando experiências interativas e visualizações para marcas que lideram a web."` (eliminando totalmente `ESTÚDIO DE`).
  - **EN**: `"3D modeling & spatial computing. Crafting interactive experiences and visualizations for brands leading the web."`
  - **ES**: `"Modelado 3D y computación espacial. Creando experiencias interactivas y visualizaciones para marcas que lideran la web."`
- **Cadeira 3D (Estágio 3)**:
  - **PT**: `"Eu desenvolvo experiências 3D de alta performance, instalações espaciais e direção de arte imersiva para o navegador."` (eliminado totalmente "desenvolvemos")
  - **EN**: `"I build high-performance 3D experiences, spatial installations, and immersive art direction for the modern web."`
  - **ES**: `"Desarrollo experiencias 3D de alto rendimiento, instalaciones espaciales y dirección de arte inmersiva para la web."`
- **Páginas de Serviços & Dicionário**:
  - `sp.deliverables_title`: `"// 03 · O QUE EU DESENVOLVO & ENTREGAS REAIS"`
  - Todas as formas plurais de agência (`"desenvolvemos"`, `"criamos"`, `"construímos"`, `"trabalhamos"`, `"aplicamos"`, `"focamos"`) foram convertidas para 1ª pessoa estrita: `"eu desenvolvo"`, `"desenvolvo"`, `"crio"`, `"construo"`, `"não trabalho com temas genéricos"`, `"aplico curvas de aceleração"`, `"foco em tipografia"`.

### 10. Guia Completo de Otimização & Performance Elite (10 Pontos)
1. **Carregamento Tardio de Pixels (`pixelLoader.ts`)**: Google Analytics 4, Google Ads, Meta Ads (Facebook Pixel) e Microsoft Clarity só são injetados após a primeira interação do usuário (`pointerdown`, `touchstart`, `scroll`, `keydown`) ou fallback ocioso (`requestIdleCallback`). Impacto zero no FCP e TBT.
2. **Imagens Comprimidas em WebP com Lazy Load**: 100% dos assets convertidos para `.webp` (redução de 75% a 90% no peso). Todas as imagens usam `loading="lazy"` e `decoding="async"`, com dimensões explícitas.
3. **CLS Zero (Cumulative Layout Shift = 0)**: Containers de 3D, vídeo, cards e imagens possuem proporções fixas (`aspect-[4/5]`, `aspect-[16/10]`, `h-screen`). Fontes carregadas com `display=swap` e `preconnect`.
4. **Meta Tags SEO Completas**: `title`, `description`, URL canônica (`https://kauan.design/`), `robots`, `theme-color`, `author`.
5. **Open Graph & Preview WhatsApp Impecável**: Imagem dedicada `og-image.jpg` (1200x630 JPEG de 79KB) com tipografia editorial de alto contraste, tags `og:type`, `og:title`, `og:description`, `og:image:width`, `og:image:height`, `og:site_name`, `og:locale` (`pt_BR`, `en_US`, `es_ES`) e Twitter Cards.
6. **Schema.org JSON-LD de Entidade Profissional**: Marcação estruturada para Google identificar Kauan Gabriel como `Person` e `ProfessionalService` com catálogo completo de serviços (Web Design, 3D WebGL, Shaders, AI Engineering), dados de contato, áreas atendidas e moedas.
7. **Responsividade Total**: Testado e auditado para Celular (375px/414px), Tablet (768px/1024px), Notebook (1280px/1440px) e Desktop (1920px+). Zero transbordamento horizontal (`overflowCount: 0`).
8. **Código Limpo Sem Rastros de IA**: Removidos quaisquer comentários genéricos, menções a prompts, padrões internos ou marcas de assistente. Código modular escrito no padrão sênior de engenharia frontend.
9. **PageSpeed Otimizado**: Code-splitting refinado em `vite.config.ts` com chunks dedicados (`vendor-three`, `vendor-framer`, `vendor-gsap`, `vendor-icons`), reduzindo o bundle principal de 1.67MB para 449KB.
10. **Guia Completo Ativo**: Todas as diretrizes implementadas, validadas e monitoradas no servidor local.
- Atualizados também: `ContactModal.tsx` (`alex@brand.com`), `WebDesignAiEngineerSection.tsx` (`Crimson Rite // Dark Art`, `Hover Ink // Imagine Art`), `ProjectsSection.tsx`, `CreativePlaygroundSection.tsx`, `WorkCraftSection.tsx`, `ShowcaseGallerySection.tsx` e `LanguageContext.tsx`.

---

## ⚡ Instruções para Próximos Modelos / Turnos
1. Sempre verificar se o Vite dev server está rodando em `http://localhost:5173/` (`IsDaemon: true`).
2. Nunca recriar ou desfazer os itens acima sem solicitação explícita do Kauan.
3. Manter a comunicação direta, concisa e focada na execução de alto nível.
