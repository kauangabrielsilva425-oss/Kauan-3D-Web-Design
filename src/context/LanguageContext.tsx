import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'PT' | 'EN' | 'ES';

interface Translations {
  [key: string]: {
    PT: string | string[];
    EN: string | string[];
    ES: string | string[];
  };
}

export const translations: Translations = {
  // Navigation
  'nav.about': { PT: 'SOBRE', EN: 'ABOUT', ES: 'SOBRE' },
  'nav.services': { PT: 'SERVIÇOS', EN: 'SERVICES', ES: 'SERVICIOS' },
  'nav.methodology': { PT: 'PADRÃO GLOBAL', EN: 'GLOBAL STANDARD', ES: 'ESTÁNDAR GLOBAL' },
  'nav.spatial': { PT: 'PRODUTO 3D', EN: '3D PRODUCT', ES: 'PRODUCTO 3D' },
  'nav.ai_engineer': { PT: 'DESIGN & IA', EN: 'DESIGN & AI', ES: 'DISEÑO & IA' },
  'nav.work': { PT: 'MEU TRABALHO', EN: 'MY WORK', ES: 'MI TRABAJO' },
  'nav.lab': { PT: 'MEU TRABALHO', EN: 'MY WORK', ES: 'MI TRABAJO' },
  'nav.projects': { PT: 'PROJETOS', EN: 'PROJECTS', ES: 'PROYECTOS' },
  'nav.contact': { PT: 'CONTATO', EN: 'CONTACT', ES: 'CONTACTO' },

  // Hero Section
  'hero.title': { PT: 'OLÁ, SOU KAUAN', EN: "HI, I'M KAUAN", ES: 'HOLA, SOY KAUAN' },
  'hero.headline1': {
    PT: 'Kauan é um 3D Digital Creator & Web Designer sediado no Brasil.',
    EN: 'Kauan is a 3D Digital Creator & Web Designer based in Brazil.',
    ES: 'Kauan es un 3D Digital Creator & Web Designer radicado en Brasil.',
  },
  'hero.headline2': {
    PT: 'Desenvolvendo websites de alto impacto & experiências 3D extraordinárias.',
    EN: 'Developing high-impact websites & extraordinary 3D experiences.',
    ES: 'Desarrollando sitios web de alto impacto & experiencias 3D extraordinarias.',
  },
  'hero.scroll': { PT: 'ROLAR ↓', EN: 'SCROLL ↓', ES: 'DESPLAZAR ↓' },
  'hero.cta': { PT: 'Falar sobre o projeto', EN: 'Discuss project', ES: 'Hablar del proyecto' },

  // Approach & Values Section (Inspired by Harry Portugal)
  'approach.badge': {
    PT: '// 02 | ABORDAGEM & VALORES',
    EN: '// 02 | APPROACH & VALUES',
    ES: '// 02 | ENFOQUE Y VALORES',
  },
  'approach.title_p1': {
    PT: 'ESTRATÉGIA, ENGENHARIA 3D',
    EN: 'STRATEGY, 3D ENGINEERING',
    ES: 'ESTRATEGIA, INGENIERÍA 3D',
  },
  'approach.title_p2': {
    PT: '& EXCELÊNCIA DIGITAL',
    EN: '& DIGITAL EXCELLENCE',
    ES: '& EXCELENCIA DIGITAL',
  },
  'approach.subtitle': {
    PT: 'Cada projeto é tratado como uma obra exclusiva. Unindo rigor técnico, direção de arte cinematográfica e código de alto padrão para posicionar marcas no topo.',
    EN: 'Every project is treated as an exclusive piece. Combining technical rigor, cinematic art direction, and high-standard code to position brands at the top.',
    ES: 'Cada proyecto es tratado como una obra exclusiva. Combinando rigor técnico, dirección de arte cinematográfica y código de alto estándar para posicionar marcas en la cima.',
  },
  'approach.card1.title': {
    PT: 'Estratégia & Identidade Visual',
    EN: 'Strategy & Visual Identity',
    ES: 'Estrategia e Identidad Visual',
  },
  'approach.card1.desc': {
    PT: 'Concepção estética de alto padrão, alinhando a visão da sua marca com direção de arte de impacto e presença digital inesquecível.',
    EN: 'High-standard aesthetic conception, aligning brand vision with impactful art direction and unforgettable digital presence.',
    ES: 'Concepción estética de alto nivel, alineando la visión de la marca con dirección de arte impactante y presencia digital inolvidable.',
  },
  'approach.card1.tag1': { PT: 'DIREÇÃO DE ARTE', EN: 'ART DIRECTION', ES: 'DIRECCIÓN DE ARTE' },
  'approach.card1.tag2': { PT: 'BRANDING 3D', EN: '3D BRANDING', ES: 'BRANDING 3D' },
  'approach.card1.tag3': { PT: 'POSICIONAMENTO', EN: 'POSITIONING', ES: 'POSICIONAMIENTO' },

  'approach.card2.title': {
    PT: 'Engenharia 3D & WebGL',
    EN: '3D Engineering & WebGL',
    ES: 'Ingeniería 3D y WebGL',
  },
  'approach.card2.desc': {
    PT: 'Experiências imersivas no navegador, modelos interativos otimizados, iluminação cinemática e taxas de quadros fluidas sem comprometer o carregamento.',
    EN: 'Immersive browser experiences, optimized interactive models, cinematic lighting, and fluid frame rates without compromising load times.',
    ES: 'Experiencias inmersivas en el navegador, modelos interactivos optimizados, iluminación cinemática y cuadros fluidos sin comprometer la carga.',
  },
  'approach.card2.tag1': { PT: 'WEBGL / THREE.JS', EN: 'WEBGL / THREE.JS', ES: 'WEBGL / THREE.JS' },
  'approach.card2.tag2': { PT: 'OTIMIZAÇÃO 3D', EN: '3D OPTIMIZATION', ES: 'OPTIMIZACIÓN 3D' },
  'approach.card2.tag3': { PT: 'TEMPO REAL', EN: 'REAL TIME', ES: 'TIEMPO REAL' },

  'approach.card3.title': {
    PT: 'Atenção aos Detalhes & Conversão',
    EN: 'Attention to Detail & Conversion',
    ES: 'Atención a los Detalles y Conversión',
  },
  'approach.card3.desc': {
    PT: 'Rigor cirúrgico em microinterações, tipografia cinética, contraste e usabilidade. Cada elemento é lapidado para gerar exclusividade e conversão real.',
    EN: 'Surgical rigor in microinteractions, kinetic typography, contrast, and usability. Every element is crafted to generate exclusivity and real conversion.',
    ES: 'Rigor quirúrgico en microinteracciones, tipografía cinética, contraste y usabilidad. Cada elemento está pulido para generar exclusividad y conversión real.',
  },
  'approach.card3.tag1': { PT: 'MICROINTERAÇÕES', EN: 'MICROINTERACTIONS', ES: 'MICROINTERACCIONES' },
  'approach.card3.tag2': { PT: 'SMOOTH SCROLL', EN: 'SMOOTH SCROLL', ES: 'SMOOTH SCROLL' },
  'approach.card3.tag3': { PT: 'ALTA CONVERSÃO', EN: 'HIGH CONVERSION', ES: 'ALTA CONVERSIÓN' },

  // Digital Showcase / Continuous Parallax
  'showcase.badge': {
    PT: '// 04 | SHOWCASE DIGITAL',
    EN: '// 04 | DIGITAL SHOWCASE',
    ES: '// 04 | SHOWCASE DIGITAL',
  },
  'showcase.title': {
    PT: 'EXPLORAÇÕES & PRODUÇÃO 3D',
    EN: 'EXPLORATIONS & 3D PRODUCTION',
    ES: 'EXPLORACIONES Y PRODUCCIÓN 3D',
  },
  'showcase.subtitle': {
    PT: 'Uma seleção contínua de renderizações cinematográficas, direções visuais e conceitos interativos desenvolvidos para clientes e projetos experimentais.',
    EN: 'A continuous selection of cinematic renders, visual directions, and interactive concepts crafted for clients and experimental projects.',
    ES: 'Una selección continua de renders cinematográficos, direcciones visuales y conceptos interactivos desarrollados para clientes y proyectos experimentales.',
  },

  // Project Card Metadata Labels
  'projects.sector_label': { PT: 'SETOR', EN: 'INDUSTRY', ES: 'SECTOR' },
  'projects.scope_label': { PT: 'ESCOPO', EN: 'SCOPE', ES: 'ALCANCE' },
  'projects.year_label': { PT: 'ANO', EN: 'YEAR', ES: 'AÑO' },

  // Testimonials Section
  'testimonials.badge': {
    PT: '// 05 | DEPOIMENTOS',
    EN: '// 05 | TESTIMONIALS',
    ES: '// 05 | TESTIMONIOS',
  },
  'testimonials.title': {
    PT: 'O QUE DIZEM SOBRE O TRABALHO',
    EN: 'WHAT LEADERS SAY ABOUT MY WORK',
    ES: 'LO QUE DICEN SOBRE MI TRABAJO',
  },
  'testimonials.subtitle': {
    PT: 'Feedback direto de fundadores e diretores criativos com quem colaborei em produções digitais e experiências 3D.',
    EN: 'Direct feedback from founders and creative directors I collaborated with on digital productions and 3D experiences.',
    ES: 'Comentarios directos de fundadores y directores creativos con quienes colaboré en producciones digitales y experiencias 3D.',
  },
  'testimonials.q1.text': {
    PT: 'O nível de atenção aos detalhes e refinamento 3D entregue pelo Kauan colocou nosso lançamento em outro patamar de mercado. Visualmente impecável e com performance extrema.',
    EN: 'The level of attention to detail and 3D refinement delivered by Kauan took our launch to another market tier. Visually flawless and exceptionally performant.',
    ES: 'El nivel de atención a los detalles y refinamiento 3D entregado por Kauan llevó nuestro lanzamiento a otro nivel de mercado. Visualmente impecable y con rendimiento extremo.',
  },
  'testimonials.q1.author': { PT: 'Gabriel Mendes', EN: 'Gabriel Mendes', ES: 'Gabriel Mendes' },
  'testimonials.q1.role': { PT: 'Diretor Criativo', EN: 'Creative Director', ES: 'Director Creativo' },
  'testimonials.q1.company': { PT: 'Nextlevel Tech', EN: 'Nextlevel Tech', ES: 'Nextlevel Tech' },

  'testimonials.q2.text': {
    PT: 'Raramente encontramos alguém que domina tanto a direção estética 3D quanto a engenharia de código web moderno. A conversão e o engajamento dos nossos usuários dispararam.',
    EN: 'We rarely find someone who masters both 3D aesthetic direction and modern web code engineering. User engagement and conversion jumped significantly.',
    ES: 'Rara vez encontramos a alguien que domine tanto la dirección estética 3D como la ingeniería de código web moderno. El compromiso de los usuarios y la conversión se dispararon.',
  },
  'testimonials.q2.author': { PT: 'Lucas Vasconcelos', EN: 'Lucas Vasconcelos', ES: 'Lucas Vasconcelos' },
  'testimonials.q2.role': { PT: 'Head de Produto', EN: 'Head of Product', ES: 'Head de Producto' },
  'testimonials.q2.company': { PT: 'Solaris Digital', EN: 'Solaris Digital', ES: 'Solaris Digital' },

  'testimonials.q3.text': {
    PT: 'Entrega pontual, comunicação direta e um olhar cirúrgico para microinterações e experiência do usuário. O portfólio reflete exatamente a maestria com que ele conduz o projeto.',
    EN: 'On-time delivery, direct communication, and a surgical eye for microinteractions and user experience. The portfolio accurately reflects the mastery brought to the project.',
    ES: 'Entrega puntual, comunicación directa y un ojo quirúrgico para microinteracciones y experiencia de usuario. El portafolio refleja exactamente la maestría con la que conduce el proyecto.',
  },
  'testimonials.q3.author': { PT: 'Marcos Silveira', EN: 'Marcos Silveira', ES: 'Marcos Silveira' },
  'testimonials.q3.role': { PT: 'Co-Fundador & CEO', EN: 'Co-Founder & CEO', ES: 'Co-Fundador y CEO' },
  'testimonials.q3.company': { PT: 'Aura Labs', EN: 'Aura Labs', ES: 'Aura Labs' },

  // About Section
  'about.badge': { PT: '// 01 | SOBRE MIM', EN: '// 01 | ABOUT ME', ES: '// 01 | SOBRE MÍ' },
  'about.headline_pre': { PT: 'Sou ', EN: "I'm ", ES: 'Soy ' },
  'about.role': {
    PT: 'web designer & AI engineer',
    EN: 'web designer & AI engineer',
    ES: 'web designer & AI engineer',
  },
  'about.headline_post': {
    PT: ' apaixonado por construir experiências digitais inteligentes.',
    EN: ' passionate about building intelligent digital experiences.',
    ES: ' apasionado por construir experiencias digitales inteligentes.',
  },
  'about.p1': {
    PT: 'Meu trabalho foca em design UI/UX, experiências web 3D e soluções impulsionadas por IA. Combino estética, código e inteligência artificial para transformar ideias complexas em produtos marcantes e funcionais.',
    EN: 'My work focuses on UI/UX design, 3D web experiences, and AI-powered solutions. I combine aesthetics, code, and artificial intelligence to transform complex ideas into striking and functional products.',
    ES: 'Mi trabajo se enfoca en diseño UI/UX, experiencias web 3D y soluciones impulsadas por IA. Combino estética, código e inteligencia artificial para transformar ideas complejas en productos impactantes y funcionales.',
  },
  'about.p2': {
    PT: 'Gosto de colaborar com fundadores visionários e equipes ambiciosas para criar produtos digitais inteligentes que geram impacto.',
    EN: 'I enjoy collaborating with visionary founders and ambitious teams to build smart digital products that make an impact.',
    ES: 'Disfruto colaborar con fundadores visionarios y equipos ambiciosos para crear productos digitales inteligentes que generen impacto.',
  },
  'about.callout': {
    PT: 'Vamos construir algo extraordinário juntos.',
    EN: "Let's build something extraordinary together.",
    ES: 'Construyamos algo extraordinario juntos.',
  },
  'about.cta': {
    PT: 'Falar sobre o projeto',
    EN: 'Discuss the project',
    ES: 'Hablar sobre el proyecto',
  },

  // Tech Stack & Creative Ecosystem (Icon Cloud & Monetization Tools)
  'about.stack_badge': {
    PT: '// 02 | CRIAÇÃO & MONETIZAÇÃO',
    EN: '// 02 | CREATION & MONETIZATION',
    ES: '// 02 | CREACIÓN Y MONETIZACIÓN',
  },
  'about.stack_title': {
    PT: 'CRIE, ESCALE & MONETIZE',
    EN: 'BUILD, SCALE & MONETIZE',
    ES: 'CREA, ESCALA Y MONETIZA',
  },
  'about.stack_subtitle': {
    PT: 'Plataformas estratégicas para criar audiência, automatizar fluxos e escalar receita.',
    EN: 'Strategic platforms to grow audiences, automate workflows, and scale revenue.',
    ES: 'Plataformas estratégicas para hacer crecer audiencias, automatizar flujos y escalar ingresos.',
  },
  'about.tool.youtube.tag': { PT: 'AUDIÊNCIA & ADS', EN: 'AUDIENCE & ADS', ES: 'AUDIENCIA Y ADS' },
  'about.tool.youtube.desc': {
    PT: 'Produção de conteúdo de alto valor, alcance massivo e monetização via AdSense e parcerias globais.',
    EN: 'High-value content production, massive reach, and monetization via AdSense and global sponsorships.',
    ES: 'Producción de contenido de alto valor, alcance masivo y monetización vía AdSense y patrocinios globales.',
  },
  'about.tool.chatgpt.tag': { PT: 'IA & NEGÓCIOS', EN: 'AI & BUSINESS', ES: 'IA Y NEGOCIOS' },
  'about.tool.chatgpt.desc': {
    PT: 'Ideação de infoprodutos, automações avançadas, copy de alta conversão e inteligência estratégica.',
    EN: 'Digital product ideation, advanced automation, high-converting copy, and strategic intelligence.',
    ES: 'Ideación de productos digitales, automatizaciones avanzadas, copy de alta conversión e inteligencia estratégica.',
  },
  'about.tool.replit.tag': { PT: 'MICRO-SAAS & CLOUD', EN: 'MICRO-SAAS & CLOUD', ES: 'MICRO-SAAS Y CLOUD' },
  'about.tool.replit.desc': {
    PT: 'Desenvolvimento ágil e deploy em tempo recorde de microsserviços, bots e SaaS rentáveis.',
    EN: 'Rapid development and instant cloud deployment of profitable microservices, bots, and web SaaS.',
    ES: 'Desarrollo ágil y despliegue instantáneo de microservicios, bots y SaaS rentables en la nube.',
  },
  'about.tool.arc.tag': { PT: 'WORKFLOW & FOCO', EN: 'WORKFLOW & FOCUS', ES: 'FLUJO Y ENFOQUE' },
  'about.tool.arc.desc': {
    PT: 'Ambiente de navegação fluido, múltiplos espaços de trabalho organizados e pesquisa de mercado.',
    EN: 'Fluid browsing environment, organized multi-workspaces, and in-depth market intelligence.',
    ES: 'Entorno de navegación fluido, múltiples espacios organizados e investigación de mercado a fondo.',
  },
  'about.stack_category_ai': {
    PT: 'Inteligência Artificial & Copilots',
    EN: 'Artificial Intelligence & Copilots',
    ES: 'Inteligencia Artificial y Copilots',
  },
  'about.stack_category_workflow': {
    PT: 'Gestão, Código & Conexão',
    EN: 'Management, Code & Connection',
    ES: 'Gestión, Código y Conexión',
  },
  'about.stack_hint': {
    PT: 'Esfera 3D interativa • Passe o cursor para navegar',
    EN: 'Interactive 3D Sphere • Move cursor to navigate',
    ES: 'Esfera 3D interactiva • Mueve el cursor para navegar',
  },

  // Services Section
  'services.badge': {
    PT: 'CAPACIDADES // SERVIÇOS',
    EN: 'CAPABILITIES // SERVICES',
    ES: 'CAPACIDADES // SERVICIOS',
  },
  'services.title': { PT: 'Serviços', EN: 'Services', ES: 'Servicios' },
  'services.subtitle': {
    PT: 'Soluções digitais de alta performance que combinam design moderno, engenharia 3D e desenvolvimento full-stack.',
    EN: 'High-performance digital solutions combining modern design, 3D engineering, and full-stack development.',
    ES: 'Soluciones digitales de alto rendimiento que combinan diseño moderno, ingeniería 3D y desarrollo full-stack.',
  },

  // Service Card 1
  'services.card1.title': {
    PT: 'Web Design & UI/UX',
    EN: 'Web Design & UI/UX',
    ES: 'Web Design & UI/UX',
  },
  'services.card1.lines': {
    PT: [
      'Criando interfaces modernas e intuitivas',
      'focadas na experiência do usuário,',
      'unindo estética e usabilidade.',
    ],
    EN: [
      'Crafting modern, intuitive interfaces',
      'focused on user experience,',
      'blending aesthetics and usability.',
    ],
    ES: [
      'Creando interfaces modernas e intuitivas',
      'enfocadas en la experiencia del usuario,',
      'uniendo estética y usabilidad.',
    ],
  },

  // Service Card 2
  'services.card2.title': {
    PT: 'Creative Dev & 3D WebGL',
    EN: 'Creative Dev & 3D WebGL',
    ES: 'Creative Dev & 3D WebGL',
  },
  'services.card2.lines': {
    PT: [
      'Construindo experiências interativas',
      'e visuais 3D diretamente no navegador',
      'com alto desempenho e impacto visual.',
    ],
    EN: [
      'Building interactive experiences',
      'and 3D visuals directly in the browser',
      'with high performance and visual impact.',
    ],
    ES: [
      'Construyendo experiencias interactivas',
      'y visuales 3D directamente en el navegador',
      'con alto rendimiento e impacto visual.',
    ],
  },

  // Service Card 3
  'services.card3.title': {
    PT: 'Modelagem 3D & Render',
    EN: '3D Modeling & Render',
    ES: 'Modelado 3D & Render',
  },
  'services.card3.lines': {
    PT: [
      'Criação de modelos 3D de alta precisão,',
      'iluminação cinematográfica e texturas realistas',
      'para produtos, marcas e universos virtuais.',
    ],
    EN: [
      'Crafting high-precision 3D models,',
      'cinematic lighting, and realistic textures',
      'for products, brands, and digital worlds.',
    ],
    ES: [
      'Creación de modelos 3D de alta precisión,',
      'iluminación cinematográfica y texturas realistas',
      'para productos, marcas y universos virtuales.',
    ],
  },

  // Service Card 4
  'services.card4.title': {
    PT: 'Motion Design & Animação',
    EN: 'Motion Design & Animation',
    ES: 'Motion Design & Animación',
  },
  'services.card4.lines': {
    PT: [
      'Animações fluidas e microinterações dinâmicas,',
      'unindo ritmo, tipografia cinética',
      'e alto impacto visual em cada segundo.',
    ],
    EN: [
      'Fluid animations and dynamic microinteractions,',
      'blending rhythm, kinetic typography,',
      'and high visual impact in every frame.',
    ],
    ES: [
      'Animaciones fluidas y microinteracciones dinámicas,',
      'uniendo ritmo, tipografía cinética',
      'y alto impacto visual en cada segundo.',
    ],
  },

  // 3D Spatial Cubes Manifesto Section
  'manifesto.badge': {
    PT: '// 03 · MANIFESTO & VISÃO 3D',
    EN: '// 03 · MANIFESTO & 3D VISION',
    ES: '// 03 · MANIFIESTO Y VISIÓN 3D',
  },
  'manifesto.h1': {
    PT: 'CÓDIGO. DESIGN. INTELIGÊNCIA.',
    EN: 'CODE. DESIGN. INTELLIGENCE.',
    ES: 'CÓDIGO. DISEÑO. INTELIGENCIA.',
  },
  'manifesto.h2_badge': {
    PT: 'KAUAN GABRIEL // APPROACH',
    EN: 'KAUAN GABRIEL // APPROACH',
    ES: 'KAUAN GABRIEL // APPROACH',
  },
  'manifesto.h2_title': {
    PT: 'Onde o design encontra a inteligência.',
    EN: 'WHERE DESIGN MEETS INTELLIGENCE.',
    ES: 'Donde el diseño se encuentra con la inteligencia.',
  },
  'manifesto.h2_desc': {
    PT: 'Eu uno web design expressivo, 3D em tempo real e inteligência artificial para transformar ideias ambiciosas em realidade.',
    EN: 'I unite expressive web design, real-time 3D, and artificial intelligence to turn ambitious ideas into reality.',
    ES: 'Uno diseño web expresivo, 3D en tiempo real e inteligencia artificial para transformar ideas ambiciosas en realidad.',
  },

  // Interactive Gravity & Bounce Motion Lab
  'bounce.badge': {
    PT: '// 05 | MOTION LAB // FÍSICA CINÉTICA',
    EN: '// 05 | MOTION LAB // KINETIC PHYSICS',
    ES: '// 05 | MOTION LAB // FÍSICA CINÉTICA',
  },
  'bounce.title_line1': {
    PT: 'Mova o cursor para fazer',
    EN: 'Move your mouse to make',
    ES: 'Mueve el cursor para hacer',
  },
  'bounce.title_line2': {
    PT: 'as imagens caírem e quicarem',
    EN: 'images fall and bounce',
    ES: 'las imágenes caer y rebotar',
  },
  'bounce.hint': {
    PT: 'Passe o mouse ou deslize o dedo pela tela para disparar física cinética em tempo real',
    EN: 'Hover or swipe across the screen to trigger real-time kinetic physics',
    ES: 'Pasa el ratón o desliza el dedo por la pantalla para activar física cinética en tiempo real',
  },

  // 3D Spatial Product & Object Design Showcase (Three.js WebGL)
  'spatial3d.badge': {
    PT: '// 04 · 3D PRODUCT LAB // WEBGL INTERATIVO',
    EN: '// 04 · 3D PRODUCT LAB // INTERACTIVE WEBGL',
    ES: '// 04 · 3D PRODUCT LAB // WEBGL INTERACTIVO',
  },
  'spatial3d.title': {
    PT: 'FLOW CHAIR // DESIGN PARAMÉTRICO',
    EN: 'FLOW CHAIR // PARAMETRIC DESIGN',
    ES: 'FLOW CHAIR // DISEÑO PARAMÉTRICO',
  },
  'spatial3d.subtitle': {
    PT: 'Modelagem 3D de alta precisão, texturização PBR com reflexos dinâmicos e iluminação cinemática renderizada em tempo real a 60 FPS.',
    EN: 'High-precision 3D modeling, dynamic PBR texturing with live reflections, and cinematic lighting rendered in real time at 60 FPS.',
    ES: 'Modelado 3D de alta precisión, texturizado PBR con reflejos dinámicos e iluminación cinemática renderizada en tiempo real a 60 FPS.',
  },
  'spatial3d.drag_hint': {
    PT: 'Arraste para orbitar em 360° • Role a página para inspecionar em perspectiva',
    EN: 'Drag to orbit in 360° • Scroll the page to inspect in perspective',
    ES: 'Arrastra para orbitar en 360° • Desplaza la página para inspeccionar en perspectiva',
  },
  'spatial3d.wireframe_btn': {
    PT: 'MALHA WIREFRAME',
    EN: 'WIREFRAME MESH',
    ES: 'MALLA WIREFRAME',
  },
  'spatial3d.solid_btn': {
    PT: 'RENDER PBR SÓLIDO',
    EN: 'PBR SOLID RENDER',
    ES: 'RENDER PBR SÓLIDO',
  },
  'spatial3d.autorotate_on': {
    PT: 'AUTO-ROTAÇÃO: ATIVA',
    EN: 'AUTO-ROTATE: ON',
    ES: 'AUTO-ROTACIÓN: ACTIVA',
  },
  'spatial3d.autorotate_off': {
    PT: 'AUTO-ROTAÇÃO: PAUSA',
    EN: 'AUTO-ROTATE: PAUSED',
    ES: 'AUTO-ROTACIÓN: PAUSA',
  },
  'spatial3d.spec1_title': {
    PT: '01 · Topologia & Malha',
    EN: '01 · Mesh & Topology',
    ES: '01 · Malla y Topología',
  },
  'spatial3d.spec1_desc': {
    PT: 'Geometria limpa e subdividida para curvas fluidas sem artefatos ou sobrecarga gráfica.',
    EN: 'Clean subdivided geometry engineered for fluid curves without polygonal artifacts.',
    ES: 'Geometría limpia y subdividida para curvas fluidas sin artefactos ni sobrecarga.',
  },
  'spatial3d.spec2_title': {
    PT: '02 · Materiais PBR Reais',
    EN: '02 · Real PBR Materials',
    ES: '02 · Materiales PBR Reales',
  },
  'spatial3d.spec2_desc': {
    PT: 'Propriedades físicas de aspereza, metalicidade e iluminação baseada na física (PBR).',
    EN: 'Accurate physical roughness, metalness, and physics-based rendering illumination.',
    ES: 'Propiedades físicas de rugosidad, metalicidad e iluminación basada en la física (PBR).',
  },
  'spatial3d.spec3_title': {
    PT: '03 · Flutuação Senoidal',
    EN: '03 · Sinusoidal Levitation',
    ES: '03 · Levitación Senoidal',
  },
  'spatial3d.spec3_desc': {
    PT: 'Simulação matemática de gravidade zero com física suave e inércia de rotação.',
    EN: 'Mathematical zero-gravity physics simulation with organic floating inertia.',
    ES: 'Simulación matemática de gravedad cero con física suave e inercia de rotación.',
  },
  'spatial3d.spec4_title': {
    PT: '04 · Iluminação 3D Cinemática',
    EN: '04 · 3D Cinematic Lighting',
    ES: '04 · Iluminación 3D Cinemática',
  },
  'spatial3d.spec4_desc': {
    PT: 'Setup com 3 fontes de luz direcionais, oclusão suave e mapa de tons ACESFilmic.',
    EN: '3-point directional light setup with soft shadow maps and ACESFilmic tonemapping.',
    ES: 'Configuración de 3 fuentes de luz direccionales y mapa de tonos ACESFilmic.',
  },
  'spatial3d.cta': {
    PT: 'Solicitar Projeto 3D // WebGL',
    EN: 'Request 3D Project // WebGL',
    ES: 'Solicitar Proyecto 3D // WebGL',
  },

  // Projects Section
  'projects.title': { PT: 'Projetos', EN: 'Projects', ES: 'Proyectos' },
  'projects.live_btn': { PT: 'Ver Projeto', EN: 'Live Project', ES: 'Ver Proyecto' },

  // Footer Section
  'footer.badge': {
    PT: 'KAUAN GABRIEL // PRODUÇÃO DIGITAL',
    EN: 'KAUAN GABRIEL // DIGITAL PRODUCTION',
    ES: 'KAUAN GABRIEL // PRODUCCIÓN DIGITAL',
  },
  'footer.desc': {
    PT: 'Vamos construir experiências digitais inesquecíveis, designs que convertem e tecnologia de ponta para a sua marca.',
    EN: "Let's build unforgettable digital experiences, converting designs, and cutting-edge technology for your brand.",
    ES: 'Construyamos experiencias digitales inolvidables, diseños que convierten y tecnología de vanguardia para su marca.',
  },
  'footer.cta': {
    PT: 'Falar com o Kauan',
    EN: 'Contact Kauan',
    ES: 'Hablar con Kauan',
  },
  'footer.nav.services': { PT: 'Serviços', EN: 'Services', ES: 'Servicios' },
  'footer.nav.work': { PT: 'Meu Trabalho', EN: 'My Work', ES: 'Mi Trabajo' },
  'footer.nav.portfolio': { PT: 'Portfólio', EN: 'Portfolio', ES: 'Portafolio' },
  'footer.nav.about': { PT: 'Sobre', EN: 'About', ES: 'Sobre mí' },
  'footer.nav.contact': { PT: 'Contato', EN: 'Contact', ES: 'Contacto' },
  'footer.nav.projects': { PT: 'Projetos', EN: 'Projects', ES: 'Proyectos' },
  'footer.privacy': { PT: 'Política de Privacidade', EN: 'Privacy Policy', ES: 'Política de Privacidad' },
  'footer.terms': { PT: 'Termos e Condições', EN: 'Terms & Conditions', ES: 'Términos y Condiciones' },
  'footer.rights': {
    PT: 'Todos os direitos reservados.',
    EN: 'All rights reserved.',
    ES: 'Todos los derechos reservados.',
  },

  // Dedicated Service Page
  'service_page.back': { PT: 'Voltar ao Portfólio', EN: 'Back to Portfolio', ES: 'Volver al Portafolio' },
  'service_page.view_all_services': { PT: 'Ver todos os serviços', EN: 'View all services', ES: 'Ver todos los servicios' },
  'service_page.cta_title': { PT: 'Pronto para iniciar este projeto?', EN: 'Ready to start this project?', ES: '¿Listo para iniciar este proyecto?' },
  'service_page.cta_desc': {
    PT: 'Fale diretamente comigo pelo WhatsApp para receber um orçamento ágil ou envie um e-mail com os detalhes da sua ideia.',
    EN: 'Talk directly with me on WhatsApp for a fast quote or send an email with your project details.',
    ES: 'Habla directamente conmigo por WhatsApp para una cotización rápida o envía un correo con los detalles de tu idea.',
  },
  'service_page.other_services': { PT: 'Outros Serviços Especializados', EN: 'Other Specialized Services', ES: 'Otros Servicios Especializados' },
  'service_page.process_title': { PT: '// PROCESSO DE CRIAÇÃO', EN: '// CREATION PROCESS', ES: '// PROCESO DE CREACIÓN' },
  'service_page.step1_title': { PT: 'Briefing & Alinhamento', EN: 'Briefing & Alignment', ES: 'Briefing y Alineación' },
  'service_page.step1_desc': {
    PT: 'Definição precisa dos objetivos, referências e prazos.',
    EN: 'Precise definition of goals, visual references, and timeline.',
    ES: 'Definición precisa de objetivos, referencias y plazos.',
  },
  'service_page.step2_title': { PT: 'Direção de Arte & Protótipo', EN: 'Art Direction & Prototyping', ES: 'Dirección de Arte y Prototipo' },
  'service_page.step2_desc': {
    PT: 'Apresentação dos conceitos visuais e validação estética.',
    EN: 'Presentation of visual concepts and aesthetic validation.',
    ES: 'Presentación de conceptos visuales y validación estética.',
  },
  'service_page.step3_title': { PT: 'Execução & Refinamento', EN: 'Execution & Refinement', ES: 'Ejecución y Refinamiento' },
  'service_page.step3_desc': {
    PT: 'Produção técnica, modelagem/código e polimento de cada detalhe.',
    EN: 'Technical production, 3D modeling/code, and detail polishing.',
    ES: 'Producción técnica, modelado/código y pulido de cada detalle.',
  },
  'service_page.step4_title': { PT: 'Entrega Final & Suporte', EN: 'Final Delivery & Support', ES: 'Entrega Final y Soporte' },
  'service_page.step4_desc': {
    PT: 'Arquivos finais otimizados e suporte total na implementação.',
    EN: 'Optimized final deliverables and full implementation support.',
    ES: 'Archivos finales optimizados y soporte total en la implementación.',
  },

  // Dedicated Service Page Titles & Section Headers
  'sp.back_button': { PT: '← VER TODOS OS SERVIÇOS', EN: '← VIEW ALL SERVICES', ES: '← VER TODOS LOS SERVICIOS' },
  'sp.badge_specialty': { PT: 'ESPECIALIDADE', EN: 'SPECIALTY', ES: 'ESPECIALIDAD' },
  'sp.about_title': { PT: '// 01 · SOBRE ESTE SERVIÇO (O QUE É & COMO FUNCIONA)', EN: '// 01 · ABOUT THIS SERVICE (WHAT IT IS & HOW IT WORKS)', ES: '// 01 · SOBRE ESTE SERVICIO (QUÉ ES Y CÓMO FUNCIONA)' },
  'sp.showcase_title': { PT: '// 02 · DEMONSTRAÇÃO PRÁTICA (O QUE ESTÁ NO VÍDEO)', EN: '// 02 · PRACTICAL SHOWCASE (WHAT IS IN THE VIDEO)', ES: '// 02 · DEMOSTRACIÓN PRÁCTICA (QUÉ HAY EN EL VIDEO)' },
  'sp.deliverables_title': { PT: '// 03 · O QUE EU DESENVOLVO & ENTREGAS REAIS', EN: '// 03 · WHAT I BUILD & REAL DELIVERABLES', ES: '// 03 · LO QUE DESARROLLO Y ENTREGABLES' },
  'sp.pillars_title': { PT: '// 04 · PILARES TÉCNICOS & ENGENHARIA DE CRAFT', EN: '// 04 · TECHNICAL PILLARS & CRAFT ENGINEERING', ES: '// 04 · PILARES TÉCNICOS Y CRAFT' },
  'sp.tools_title': { PT: '// 05 · FERRAMENTAS & STACK UTILIZADAS', EN: '// 05 · TOOLS & TECHNOLOGIES USED', ES: '// 05 · HERRAMIENTAS Y TECNOLOGÍAS' },
  'sp.process_title': { PT: '// 06 · METODOLOGIA PASSO A PASSO (DO ZERO À ENTREGA)', EN: '// 06 · STEP-BY-STEP METHODOLOGY (ZERO TO LAUNCH)', ES: '// 06 · METODOLOGÍA PASO A PASO (DE CERO AL LANZAMIENTO)' },
  'sp.other_services_title': { PT: 'Explorar Outras Especialidades', EN: 'Explore Other Specialties', ES: 'Explorar Otras Especialidades' },
  'sp.live_showcase': { PT: 'DEMONSTRAÇÃO AO VIVO', EN: 'LIVE SHOWCASE', ES: 'DEMOSTRACIÓN EN VIVO' },

  // Service 1: Web Design & UI/UX
  'sp.s1.title': { PT: 'WEB DESIGN & UI/UX', EN: 'WEB DESIGN & UI/UX', ES: 'WEB DESIGN & UI/UX' },
  'sp.s1.subtitle': {
    PT: 'Criação de Websites de Alta Performance, Landing Pages de Conversão & Interfaces Digitais Autorais',
    EN: 'High-Performance Websites, High-Converting Landing Pages & Bespoke Digital Interfaces',
    ES: 'Sitios Web de Alto Rendimiento, Landing Pages de Conversión e Interfaces Digitales Exclusivas',
  },
  'sp.s1.about_p1': {
    PT: 'O Web Design & UI/UX com Kauan Gabriel é o encontro cirúrgico entre psicologia visual, direção de arte autoral e arquitetura de conversão. Enquanto o UI (User Interface) molda a identidade estética — tipografia expressiva, contrastes marcantes e grids estruturados —, o UX (User Experience) mapeia a mente do visitante para que cada clique, rolagem e decisão aconteça de forma intuitiva e sem atrito.',
    EN: 'Web Design & UI/UX with Kauan Gabriel represents the surgical intersection of visual psychology, bespoke art direction, and conversion architecture. While UI (User Interface) sculpts aesthetic identity — bold typography, deep contrasts, and structured grids —, UX (User Experience) maps visitor psychology so every click, scroll, and action feels frictionless and natural.',
    ES: 'El Web Design & UI/UX con Kauan Gabriel es la unión de psicología visual, dirección de arte de autor y arquitectura de conversión. Mientras la UI moldea la identidad estética — tipografía expresiva, contrastes profundos y cuadrículas estructuradas —, la UX guía al visitante para que cada interacción sea intuitiva y sin fricción.',
  },
  'sp.s1.about_p2': {
    PT: 'Não trabalho com temas genéricos, construtores de arrastar-e-soltar engessados ou cópias previsíveis da internet. Cada interface nasce de um estudo detalhado no Figma e ganha vida em código sob medida de alta velocidade, criando uma presença digital que posiciona sua marca como líder incontestável de mercado.',
    EN: 'I never rely on generic templates, rigid drag-and-drop website builders, or predictable internet clones. Every interface originates from deep structural research in Figma and is engineered in custom, ultra-fast code, establishing a digital presence that commands authority and scales revenue.',
    ES: 'No utilizo plantillas genéricas ni constructores rígidos. Cada interfaz nace de una investigación profunda en Figma y cobra vida en código a medida ultrarrápido, posicionando tu marca con máxima autoridad.',
  },
  'sp.s1.showcase': {
    PT: 'No vídeo ao lado, demonstro a interface de uma plataforma automotiva de alto luxo desenvolvida sob medida. Observe a aplicação de tipografia editorial marcante ("For Those Who Refuse Ordinary"), o contraste dark premium que valoriza o veículo e as microinterações fluidas nos cartões e botões. É a união exata de estética refinada e funcionalidade comercial.',
    EN: 'In the showcase video, I present the bespoke interface of a luxury automotive platform. Notice the bold editorial typography ("For Those Who Refuse Ordinary"), the deep dark contrast highlighting the vehicle, and tactile microinteractions across cards and buttons. It represents the exact balance between high aesthetics and commercial performance.',
    ES: 'En el video demostrativo presento la interfaz de una plataforma automotriz de alto lujo. Observa la tipografía editorial ("For Those Who Refuse Ordinary"), el contraste oscuro prémium y las microinteracciones fluidas en tarjetas y botones.',
  },
  'sp.s1.live_url': { PT: 'kauan.design/apex-web', EN: 'kauan.design/apex-web', ES: 'kauan.design/apex-web' },
  'sp.s1.d1.title': { PT: 'Landing Pages de Alta Conversão', EN: 'High-Converting Landing Pages', ES: 'Landing Pages de Alta Conversión' },
  'sp.s1.d1.desc': {
    PT: 'Páginas estratégicas para lançamentos de produtos e serviços high-ticket, com estrutura persuasiva que converte visitantes em clientes.',
    EN: 'Strategic pages for high-ticket product and service launches, engineered with persuasive structure to convert visitors into clients.',
    ES: 'Páginas estratégicas para lanzamientos y servicios high-ticket con estructura persuasiva de alta conversión.',
  },
  'sp.s1.d2.title': { PT: 'Websites Institucionais & Portfólios Autorais', EN: 'Bespoke Corporate Sites & Portfolios', ES: 'Sitios Corporativos y Portafolios de Autor' },
  'sp.s1.d2.desc': {
    PT: 'Plataformas digitais completas para marcas e empresas que precisam de uma identidade visual marcante para justificar tickets mais altos.',
    EN: 'Complete digital platforms for brands and enterprises seeking an unforgettable visual identity that justifies premium pricing.',
    ES: 'Plataformas digitales completas para marcas y empresas que buscan una presencia inolvidable y mayor valor de marca.',
  },
  'sp.s1.d3.title': { PT: 'E-Commerce & Experiências Imersivas', EN: 'Immersive E-Commerce & Catalogs', ES: 'E-Commerce y Catálogos Inmersivos' },
  'sp.s1.d3.desc': {
    PT: 'Lojas virtuais e catálogos desenhados para gerar desejo imediato de compra, com navegação rápida, vitrines dinâmicas e checkout sem fricção.',
    EN: 'Online stores and digital showrooms designed to spark immediate purchase desire, featuring fluid navigation and seamless checkout.',
    ES: 'Tiendas online y catálogos diseñados para generar deseo de compra inmediato con navegación fluida y rápida.',
  },
  'sp.s1.d4.title': { PT: 'Design Systems Completos no Figma', EN: 'Comprehensive Figma Design Systems', ES: 'Design Systems Completos en Figma' },
  'sp.s1.d4.desc': {
    PT: 'Biblioteca modular no Figma com componentes reutilizáveis, guia tipográfico, tokens de cor e documentação pronta para escala e desenvolvimento.',
    EN: 'Modular Figma libraries featuring reusable components, typography scales, color tokens, and documentation ready for scaling.',
    ES: 'Librerías modulares en Figma con componentes reutilizables, guía tipográfica y documentación completa.',
  },
  'sp.s1.p1.title': { PT: 'ARQUITETURA DE INFORMAÇÃO & UX', EN: 'INFORMATION ARCHITECTURE & UX RESEARCH', ES: 'ARQUITECTURA DE INFORMACIÓN Y UX' },
  'sp.s1.p1.desc': {
    PT: 'Mapeamento estratégico da jornada do usuário para garantir retenção e conduzir o visitante naturalmente ao ponto de contato.',
    EN: 'Strategic user journey mapping ensuring retention and guiding qualified visitors effortlessly toward direct contact.',
    ES: 'Mapeo estratégico de la navegación para retener visitantes y guiarlos hacia el contacto directo.',
  },
  'sp.s1.p2.title': { PT: 'DIREÇÃO DE ARTE & PROTÓTIPO FIGMA', EN: 'BESPOKE ART DIRECTION & FIGMA PROTOTYPES', ES: 'DIRECCIÓN DE ARTE Y PROTOTIPOS FIGMA' },
  'sp.s1.p2.desc': {
    PT: 'Layout autoral desenhado no Figma com grid responsivo, paleta sofisticada e validação interativa antes de qualquer linha de código.',
    EN: 'Original layouts crafted in Figma with responsive grids, sophisticated dark tones, and clickable prototypes prior to code.',
    ES: 'Diseño original en Figma con cuadrícula responsiva, paleta sofisticada y prototipo navegable antes de programar.',
  },
  'sp.s1.p3.title': { PT: 'MICROINTERAÇÕES & VELVET EASING', EN: 'MICROINTERACTIONS & VELVET EASING', ES: 'MICROINTERACCIONES Y VELVET EASING' },
  'sp.s1.p3.desc': {
    PT: 'Física personalizada para botões, cards suspensos no hover e transições suaves sem qualquer sensação de template engessado.',
    EN: 'Custom acceleration physics for hover states, floating cards, and seamless transitions free from template rigidity.',
    ES: 'Física personalizada para botones, tarjetas elevadas en hover y transiciones fluidas sin sensación rígida.',
  },
  'sp.s1.p4.title': { PT: 'PERFORMANCE CIRÚRGICA 60 FPS', EN: 'SURGICAL 60 FPS SPEED & CLEAN CODE', ES: 'RENDIMIENTO A 60 FPS Y CÓDIGO LIMPIO' },
  'sp.s1.p4.desc': {
    PT: 'Código limpo otimizado para carregamento instantâneo no Google PageSpeed e responsividade milimétrica em smartphones e telas 4K.',
    EN: 'Clean code optimized for sub-second loading on Google PageSpeed, flawless mobile responsiveness, and ultrawide displays.',
    ES: 'Código limpio optimizado para carga instantánea, excelente rendimiento en Google PageSpeed y adaptación móvil.',
  },

  // Service 2: Creative Dev & 3D WebGL
  'sp.s2.title': { PT: 'CREATIVE DEV & 3D WEBGL', EN: 'CREATIVE DEV & 3D WEBGL', ES: 'CREATIVE DEV & 3D WEBGL' },
  'sp.s2.subtitle': {
    PT: 'Desenvolvimento Front-End Avançado com Modelos 3D Interativos em Tempo Real no Navegador',
    EN: 'Advanced Creative Front-End with Real-Time Interactive 3D WebGL in the Browser',
    ES: 'Desarrollo Front-End Avanzado con Modelos 3D Interactivos en Tiempo Real en el Navegador',
  },
  'sp.s2.about_p1': {
    PT: 'O Creative Development com 3D WebGL leva a web a uma nova dimensão: a renderização de objetos tridimensionais em tempo real diretamente na placa de vídeo (GPU) do visitante, sem necessidade de baixar aplicativos, instalar plugins ou esperar carregamentos infinitos.',
    EN: 'Creative Development with 3D WebGL pushes the web into a new spatial dimension: rendering real-time 3D objects directly on the visitor GPU, requiring zero app downloads, zero third-party plugins, and zero long wait times.',
    ES: 'El Creative Development con 3D WebGL lleva la web a una nueva dimensión: renderizado 3D en tiempo real directo en la GPU del visitante, sin descargas de apps ni plugins adicionales.',
  },
  'sp.s2.about_p2': {
    PT: 'Utilizando Three.js, WebGL e shaders GLSL programados sob medida, transformo páginas estáticas comuns em experiências interativas onde o cliente pode girar produtos em 360°, dar zoom em detalhes microscópicos e interagir com reflexos de luz dinâmicos. Isso constrói um posicionamento tecnológico inigualável e multiplica o tempo de retenção na página.',
    EN: 'Harnessing Three.js, WebGL, and custom GLSL shaders, I transform static pages into interactive realms where users inspect products in full 360° orbit, zoom into microscopic fabric weaves, and manipulate dynamic lighting. This positions your brand at the absolute technological forefront.',
    ES: 'Con Three.js, WebGL y shaders GLSL personalizados, transformo sitios planos en experiencias donde el usuario rota productos en 360°, examina detalles y manipula iluminación en tiempo real.',
  },
  'sp.s2.showcase': {
    PT: 'No vídeo ao lado, demonstro um visualizador 3D interativo para um e-commerce de moda técnica. O casaco puffer é renderizado em tempo real na GPU do usuário: o cliente pode orbitar em torno da peça, ver o reflexo da luz física na textura de nylon sintético, inspecionar o volume dos bolsos e alternar variações de cores com resposta instantânea.',
    EN: 'In the showcase video, I demonstrate an interactive 3D showroom for technical outerwear. The puffer jacket renders live on the user GPU: shoppers orbit around the piece, observe physical cinematic light reflections on the synthetic nylon, inspect folds, and switch colorways instantaneously.',
    ES: 'En el video demostrativo se muestra una chaqueta técnica 3D en tiempo real. El cliente puede orbitar en 360°, observar los reflejos de luz física en el nailon y cambiar colores al instante.',
  },
  'sp.s2.live_url': { PT: 'kauan.design/aura-spatial-3d', EN: 'kauan.design/aura-spatial-3d', ES: 'kauan.design/aura-spatial-3d' },
  'sp.s2.d1.title': { PT: 'Configuradores de Produto 3D em Tempo Real', EN: 'Real-Time 3D Product Configurators', ES: 'Configuradores de Producto 3D en Tiempo Real' },
  'sp.s2.d1.desc': {
    PT: 'Vitrines interativas onde o usuário personaliza cores, materiais e acessórios de roupas, calçados, veículos ou hardware diretamente no navegador.',
    EN: 'Interactive viewports where users customize colors, materials, and accessories of apparel, footwear, vehicles, or hardware directly in the browser.',
    ES: 'Vitrinas interactivas donde el usuario personaliza colores, materiales y acabados directamente en el navegador.',
  },
  'sp.s2.d2.title': { PT: 'Landing Pages Imersivas com Scrollytelling', EN: 'Immersive Scrollytelling 3D Sites', ES: 'Landing Pages Inmersivas con Scrollytelling' },
  'sp.s2.d2.desc': {
    PT: 'Websites com mundos 3D navegáveis via scroll, onde a história da marca é revelada tridimensionalmente conforme o usuário rola a página.',
    EN: 'Websites with 3D spatial scenes driven by scroll physics, unraveling brand storytelling dynamically as visitors advance through the page.',
    ES: 'Sitios con escenas 3D controladas por el scroll, contando la historia de la marca de manera tridimensional.',
  },
  'sp.s2.d3.title': { PT: 'Shaders GLSL Customizados & Efeitos Visuais', EN: 'Custom GLSL Shaders & Visual Effects', ES: 'Shaders GLSL Personalizados y Efectos Visuales' },
  'sp.s2.d3.desc': {
    PT: 'Efeitos de distorção líquida, refração de vidro, partículas interativas e gradientes volumétricos processados diretamente na placa de vídeo.',
    EN: 'Liquid distortions, glass refractions, responsive particle fields, and volumetric color gradients calculated directly on the graphics card.',
    ES: 'Distorsiones líquidas, refracción de vidrio, partículas interactivas y gradientes calculados en la GPU.',
  },
  'sp.s2.d4.title': { PT: 'Otimização Extrema para Mobile (Draco / KTX2)', EN: 'Extreme Mobile Optimization (Draco / KTX2)', ES: 'Optimización Extrema para Móvil (Draco / KTX2)' },
  'sp.s2.d4.desc': {
    PT: 'Compressão inteligente de malhas e texturas para garantir carregamento em menos de 2 segundos mesmo em conexões móveis 4G.',
    EN: 'Smart mesh compression and texture streaming ensuring sub-2-second initial loading times even on 4G mobile connections.',
    ES: 'Compresión inteligente de geometrías y texturas para cargar en menos de 2 segundos en conexiones móviles.',
  },
  'sp.s2.p1.title': { PT: 'RENDERIZAÇÃO WEBGL & THREE.JS', EN: 'WEBGL 3D & THREE.JS RENDERING', ES: 'RENDERIZADO WEBGL Y THREE.JS' },
  'sp.s2.p1.desc': {
    PT: 'Pipeline 3D moderno no navegador rodando a 60 FPS contínuos com controle orbital suave e responsivo ao toque e mouse.',
    EN: 'Modern browser 3D pipeline running at steady 60 FPS with responsive orbit controls tuned for mobile touch and desktop cursor.',
    ES: 'Pipeline 3D moderno a 60 FPS continuos con control orbital suave y sensible al tacto y cursor.',
  },
  'sp.s2.p2.title': { PT: 'SHADERS PBR & MATERIAIS FÍSICOS', EN: 'PHYSICAL PBR SHADERS & LIGHTING', ES: 'SHADERS PBR Y MATERIALES FÍSICOS' },
  'sp.s2.p2.desc': {
    PT: 'Simulação ótica precisa de metais, vidros, tecidos e plásticos reagindo à iluminação dinâmica profissional.',
    EN: 'Accurate optical simulation of metals, glass, textiles, and synthetics reacting to dynamic professional illumination.',
    ES: 'Simulación óptica de metales, vidrio, tejidos y sintéticos reaccionando a la luz profesional.',
  },
  'sp.s2.p3.title': { PT: 'COMPRESSÃO DRACO & VELOCIDADE RELÂMPAGO', EN: 'DRACO COMPRESSION & INSTANT STREAMING', ES: 'COMPRESIÓN DRACO Y CARGA RÁPIDA' },
  'sp.s2.p3.desc': {
    PT: 'Modelos 3D compactados com Draco loader e texturas KTX2 para consumo mínimo de memória e banda de internet.',
    EN: '3D assets compressed via Draco algorithm and KTX2 texture format, preserving device memory and minimal network bandwidth.',
    ES: 'Modelos 3D comprimidos con Draco y KTX2 para un consumo mínimo de memoria y datos móviles.',
  },
  'sp.s2.p4.title': { PT: 'AUMENTO DE RETENÇÃO & CONVERSÃO', EN: 'BOOSTED RETENTION & SALES CONVERSION', ES: 'MAYOR RETENCIÓN Y CONVERSIÓN DE VENTAS' },
  'sp.s2.p4.desc': {
    PT: 'A experiência tridimensional elimina dúvidas sobre o produto, reduz devoluções em até 40% e acelera a decisão de compra.',
    EN: '3D spatial engagement dissolves product hesitation, reduces return rates by up to 40%, and accelerates purchase decisions.',
    ES: 'La experiencia 3D elimina dudas del producto, reduce devoluciones hasta en un 40% y acelera la compra.',
  },

  // Service 3: Modelagem 3D & Render
  'sp.s3.title': { PT: 'MODELAGEM 3D & RENDER', EN: '3D MODELING & RENDERING', ES: 'MODELADO 3D & RENDER' },
  'sp.s3.subtitle': {
    PT: 'Escultura Tridimensional de Alta Precisão, Shaders PBR Fotorrealistas & Iluminação Cinemática',
    EN: 'High-Precision 3D Sculpting, Photoreal PBR Shaders & Cinematic Lighting',
    ES: 'Escultura Tridimensional de Alta Precisión, Shaders PBR Fotorrealistas e Iluminación Cinemática',
  },
  'sp.s3.about_p1': {
    PT: 'A Modelagem 3D e a Renderização Fotorrealista representam o auge da computação gráfica moderna voltada para produtos, publicidade e design industrial. Trata-se da criação de objetos virtuais tridimensionais com fidelidade física tão rigorosa que superam a perfeição de uma fotografia tradicional.',
    EN: '3D Modeling and Photorealistic Rendering represent the peak of modern computer graphics applied to high-tier products, advertising, and industrial design. It involves sculpting virtual 3D assets with optical precision so flawless they surpass traditional camera photography.',
    ES: 'El Modelado 3D y el Renderizado Fotorrealista son el corazón de los gráficos por computadora para productos y publicidad de lujo. Consiste en crear objetos tridimensionales con fidelidad óptica tan alta que superan la fotografía tradicional.',
  },
  'sp.s3.about_p2': {
    PT: 'Construo cada modelo a partir do zero com topologia limpa e precisa (quad-based), aplicando mapas de textura em altíssima resolução (8K) e simulando iluminação cinemática com múltiplos pontos de luz. Isso possibilita capturas em ângulos impossíveis, geração de renders em 4K/8K para outdoors ou embalagens e pré-visualização completa antes da fabricação física.',
    EN: 'I sculpt every asset from the ground up using pristine quad-based topology, 8K physically-based texture maps, and multi-point cinematic lighting. This empowers brands to capture angles impossible in physical shoots, produce 8K renders for billboards or packaging, and validate designs before tooling.',
    ES: 'Construyo cada modelo desde cero con topología quad-based limpia, texturas 8K e iluminación cinemática en múltiples puntos. Permite capturas en ángulos imposibles, renders en 8K para impresión y validación antes de fabricar.',
  },
  'sp.s3.showcase': {
    PT: 'No vídeo ao lado, você visualiza uma escultura geométrica hard-surface de alta complexidade. Observe como os reflexos caústicos e a iluminação de três pontos percorrem os chanfros metálicos sem imperfeições ou quebras de luz, evidenciando o rigor milimétrico da malha poligonal e a fidelidade do shader azul metálico.',
    EN: 'In the showcase video, you see an intricate hard-surface geometric sculpt. Observe how caustic reflections and multi-point lighting sweep across beveled metallic chamfers with zero smoothing distortions, highlighting pristine polygonal topology and lustrous metallic shader fidelity.',
    ES: 'En el video demostrativo se aprecia una escultura hard-surface de alta complejidad geométrica. La luz recorre los biseles metálicos con pureza total, evidenciando topología precisa y materiales fotorrealistas.',
  },
  'sp.s3.live_url': { PT: 'kauan.design/vortex-polymesh', EN: 'kauan.design/vortex-polymesh', ES: 'kauan.design/vortex-polymesh' },
  'sp.s3.d1.title': { PT: 'Renders Fotorrealistas de Produto (Campanhas Comerciais)', EN: 'Photorealistic Commercial Product Renders', ES: 'Renders Fotorrealistas de Producto' },
  'sp.s3.d1.desc': {
    PT: 'Imagens em ultra-alta definição (4K / 8K) para lançamentos de produtos, cosméticos, eletrônicos, calçados e embalagens de luxo.',
    EN: 'Ultra-high-definition renders (4K / 8K) for product launches, cosmetics, luxury packaging, electronics, and global commercial campaigns.',
    ES: 'Imágenes en ultra alta definición (4K/8K) para lanzamientos de productos, cosméticos, empaques de lujo y electrónica.',
  },
  'sp.s3.d2.title': { PT: 'Modelagem Hard-Surface & Orgânica', EN: 'Hard-Surface & Organic 3D Modeling', ES: 'Modelado Hard-Surface y Orgánico' },
  'sp.s3.d2.desc': {
    PT: 'Construção 3D cirúrgica de peças mecânicas, gadgets tecnológicos, veículos, acessórios de moda e formas conceituais.',
    EN: 'Surgical 3D construction of mechanical parts, technological gadgets, automotive concepts, fashion accessories, and organic forms.',
    ES: 'Construcción 3D precisa de piezas mecánicas, gadgets tecnológicos, vehículos y conceptos de diseño.',
  },
  'sp.s3.d3.title': { PT: 'Visualização Técnica & Exploded Views', EN: 'Technical Visualization & Exploded Views', ES: 'Visualización Técnica y Despieces (Exploded Views)' },
  'sp.s3.d3.desc': {
    PT: 'Composições visuais que mostram o interior, as camadas e a engenharia de montagem de produtos complexos com clareza estética.',
    EN: 'Technical breakdowns showcasing inner mechanisms, multi-layer assemblies, and engineering precision with clean aesthetic clarity.',
    ES: 'Despieces visuales que muestran el interior, las capas y la ingeniería de productos complejos con gran claridad.',
  },
  'sp.s3.d4.title': { PT: 'Assets 3D Otimizados para Web & AR', EN: 'Web & Augmented Reality Optimized Assets', ES: 'Assets 3D Optimizados para Web y Realidad Aumentada' },
  'sp.s3.d4.desc': {
    PT: 'Conversão e otimização de arquivos de alta densidade em formatos leves (GLTF / GLB / USDZ) prontos para e-commerce e filtros AR.',
    EN: 'Conversion and decimation of heavy master sculpts into ultra-light formats (GLTF / GLB / USDZ) ready for web viewports and AR filters.',
    ES: 'Conversión de modelos densos a formatos ligeros (GLTF / GLB / USDZ) listos para la web y filtros AR.',
  },
  'sp.s3.p1.title': { PT: 'TOPOLOGIA QUAD-BASED LIMPA', EN: 'PRISTINE QUAD-BASED TOPOLOGY', ES: 'TOPOLOGÍA QUAD-BASED LIMPIA' },
  'sp.s3.p1.desc': {
    PT: 'Malhas lapidadas exclusivamente com polígonos de 4 faces, permitindo subdivisões suaves sem vincos indesejados ou artefatos.',
    EN: 'Meshes structured purely with 4-sided quads, enabling flawless subdivision smoothing with zero pinching or shading artifacts.',
    ES: 'Mallas estructuradas exclusivamente con polígonos de 4 lados para una subdivisión perfecta sin artefactos de luz.',
  },
  'sp.s3.p2.title': { PT: 'TEXTURIZAÇÃO PBR PROCEDURAL & 8K', EN: 'PROCEDURAL & 8K PBR TEXTURING', ES: 'TEXTURIZADO PBR PROCEDURAL Y 8K' },
  'sp.s3.p2.desc': {
    PT: 'Mapas físicos de rugosidade, metalicidade, relevo e normais milimétricos que reagem à luz exatamente como materiais reais.',
    EN: 'Physical roughness, metalness, displacement, and micro-normal maps behaving identically to tangible real-world materials.',
    ES: 'Mapas físicos de rugosidad, metalicidad y relieves milimétricos que reaccionan a la luz como materiales reales.',
  },
  'sp.s3.p3.title': { PT: 'ILUMINAÇÃO CINEMÁTICA & RIGS DE LUZ', EN: 'CINEMATIC LIGHTING RIGS', ES: 'ILUMINACIÓN CINEMÁTICA Y RIGS DE LUZ' },
  'sp.s3.p3.desc': {
    PT: 'Sistemas de iluminação cinematográfica com rim lights, difusores e mapas de reflexo HDRI para esculpir contornos com dramaticidade.',
    EN: 'Virtual lighting setups with edge rim lights, custom diffusers, and 32-bit HDRI reflection probes sculpting dramatic contours.',
    ES: 'Sistemas de iluminación con rim lights, difusores y mapas HDRI para resaltar contornos con dramatismo.',
  },
  'sp.s3.p4.title': { PT: 'COLOR GRADING & ENTREGA EM ALTA RESOLUÇÃO', EN: 'COLOR GRADING & ULTRA-RES MASTERS', ES: 'COLOR GRADING Y ENTREGA EN ALTA RESOLUCIÓN' },
  'sp.s3.p4.desc': {
    PT: 'Pós-produção avançada com nitidez óptica e arquivos finais prontos para impressão em grande escala ou telas digitais.',
    EN: 'Advanced linear post-processing, optical depth-of-field, and master deliverables tailored for massive prints or digital showcases.',
    ES: 'Poscronización y tratamiento de color para entregables de gran resolución listos para impresos y pantallas.',
  },

  // Service 4: Motion Design & Animação
  'sp.s4.title': { PT: 'MOTION DESIGN & ANIMAÇÃO', EN: 'MOTION DESIGN & ANIMATION', ES: 'MOTION DESIGN Y ANIMACIÓN' },
  'sp.s4.subtitle': {
    PT: 'Design em Movimento, Tipografia Cinética, Sequências Cinemáticas & Animações de Marca',
    EN: 'Motion Graphics, Kinetic Typography, Cinematic Title Sequences & Brand Animation',
    ES: 'Diseño en Movimiento, Tipografía Cinética, Secuencias Cinemáticas y Animación de Marca',
  },
  'sp.s4.about_p1': {
    PT: 'O Motion Design é a arte de dar vida, ritmo e narrativa a elementos visuais estáticos. Em um ambiente digital hipercompetitivo onde a atenção do usuário se esvai em menos de 3 segundos, o movimento inteligente é a ferramenta mais poderosa para capturar olhares, reter audiência e transmitir mensagens com impacto duradouro.',
    EN: 'Motion Design is the discipline of breathing life, rhythm, and narrative tension into static visual elements. In a saturated digital landscape where viewer attention evaporates in under 3 seconds, purposeful motion is the supreme weapon to hook eyes, command retention, and anchor brand messaging.',
    ES: 'El Motion Design es el arte de dar vida, ritmo y narrativa a elementos estáticos. En un entorno digital donde la atención dura menos de 3 segundos, el movimiento inteligente es la herramienta más potente para captar y retener miradas.',
  },
  'sp.s4.about_p2': {
    PT: 'Aplico curvas de aceleração avançadas (easing), sincronização milimétrica com a trilha sonora e direção de arte cinematográfica para criar peças magnéticas — desde vinhetas de logotipo e aberturas de marca até vídeos promocionais de alta conversão e microinterações táteis para interfaces digitais.',
    EN: 'I engineer custom velocity curves (easing), micro-synchronized audio pacing, and cinematic art direction to produce magnetic pieces — from animated brand idents and explosive title sequences to high-conversion product trailers and tactile interface microinteractions.',
    ES: 'Aplico curvas de aceleración personalizadas, sincronización con el audio y dirección de arte cinematográfica para crear identidades dinámicas, comerciales y microinteracciones de interfaz.',
  },
  'sp.s4.showcase': {
    PT: 'No vídeo ao lado, demonstro uma sequência dinâmica e poster interativo animado inspirado no universo do Deadpool. Repare na tipografia cinética brutalista com quebras rítmicas secas, recortes em camadas com profundidade de campo e transições de tela aceleradas que mantém a energia alta e prendem o espectador até o último frame.',
    EN: 'In the showcase video, I present a high-octane dynamic sequence and animated interactive poster inspired by Deadpool. Notice the aggressive brutalist kinetic typography, multi-plane depth layering, dynamic UI meters, and snap cuts that sustain electrical energy and lock viewer attention until the final frame.',
    ES: 'En el video demostrativo presento una secuencia dinámica inspirada en Deadpool. Observa la tipografía cinética brutalista, los recortes en capas y las transiciones rápidas que atrapan la atención.',
  },
  'sp.s4.live_url': { PT: 'kauan.design/deadpool-kinetic', EN: 'kauan.design/deadpool-kinetic', ES: 'kauan.design/deadpool-kinetic' },
  'sp.s4.d1.title': { PT: 'Vídeos Comerciais & Lançamentos de Produto', EN: 'High-Impact Product Teasers & Commercials', ES: 'Videos Comerciales y Lanzamientos de Producto' },
  'sp.s4.d1.desc': {
    PT: 'Vídeos promocionais dinâmicos pensados para campanhas de tráfego pago, lançamentos e mídias sociais com taxas recordes de retenção.',
    EN: 'High-octane promotional reels tailored for paid media campaigns, product launches, and social feeds with industry-leading retention.',
    ES: 'Videos promocionales dinámicos para campañas pagadas y redes sociales con altos índices de retención.',
  },
  'sp.s4.d2.title': { PT: 'Tipografia Cinética & Title Sequences', EN: 'Kinetic Typography & Title Sequences', ES: 'Tipografía Cinética y Secuencias de Título' },
  'sp.s4.d2.desc': {
    PT: 'Aberturas cinematográficas e sequências de títulos onde o texto é o protagonista visual, movendo-se com peso e intenção dramática.',
    EN: 'Cinematic openers and title animations where typography takes center stage, moving with weight, cadence, and expressive power.',
    ES: 'Aperturas cinematográficas donde el texto es el protagonista, moviéndose con peso y fuerza visual.',
  },
  'sp.s4.d3.title': { PT: 'UI Motion & Microinterações de Interface', EN: 'UI Motion & Digital Product Microinteractions', ES: 'UI Motion y Microinteracciones de Interfaz' },
  'sp.s4.d3.desc': {
    PT: 'Animações sutis e fluidas para websites e aplicativos, guiando o olhar do usuário e criando uma experiência de uso premium.',
    EN: 'Smooth, tactile motion choreography for apps and websites, guiding user focus and establishing a world-class luxury feel.',
    ES: 'Animaciones sutiles para aplicaciones y sitios web, guiando al usuario con fluidez prémium.',
  },
  'sp.s4.d4.title': { PT: 'Vinhetas de Marca (Logo Animations)', EN: 'Dynamic Brand Idents & Logo Animations', ES: 'Animación de Logotipos e Identidad Dinámica' },
  'sp.s4.d4.desc': {
    PT: 'Animação exclusiva do logotipo e elementos de identidade visual para uso em aberturas de vídeos, apresentações e assinaturas digitais.',
    EN: 'Bespoke logo animation and motion identity assets for YouTube intros, investor decks, and digital media presence.',
    ES: 'Animación exclusiva del logo y activos de marca para videos, presentaciones institucionales y redes.',
  },
  'sp.s4.p1.title': { PT: 'CURVAS DE ACELERAÇÃO & VELVET EASING', EN: 'VELOCITY CURVES & VELVET EASING', ES: 'CURVAS DE ACELERACIÓN Y VELVET EASING' },
  'sp.s4.p1.desc': {
    PT: 'Calibração manual de gráficos de velocidade para criar movimentos orgânicos, eliminando qualquer sensação robótica ou repetitiva.',
    EN: 'Manual velocity curve shaping in graph editors, yielding organic weight and punch while eradicating robotic linear motions.',
    ES: 'Calibración manual de velocidad para movimientos orgánicos con peso e impacto, sin rigidez robótica.',
  },
  'sp.s4.p2.title': { PT: 'SINCRONIZAÇÃO AUDIOVISUAL CIRÚRGICA', EN: 'SURGICAL AUDIOVISUAL PACING', ES: 'SINCRONIZACIÓN AUDIOVISUAL PRECISA' },
  'sp.s4.p2.desc': {
    PT: 'Cortes, transições e impactos visuais perfeitamente cravados nos tempos da trilha sonora e efeitos sonoros (SFX).',
    EN: 'Keyframe cuts, camera punches, and visual accents synced to exact beats and sound design transients.',
    ES: 'Cortes y transiciones sincronizados al milisegundo exacto con la música y diseño sonoro.',
  },
  'sp.s4.p3.title': { PT: 'COMPOSIÇÃO MULTICAMADAS & PROFUNDIDADE', EN: 'MULTI-LAYER COMPOSITION & DEPTH', ES: 'COMPOSICIÓN MULTICAPA Y PROFUNDIDAD' },
  'sp.s4.p3.desc': {
    PT: 'Separação de planos com paralaxe, iluminação volumétrica, partículas dinâmicas e granulação analógica com visual de filme.',
    EN: 'Multi-plane spatial depth, parallax cameras, volumetric lighting, responsive particles, and filmic analog grain.',
    ES: 'Separación de planos en profundidad, luces volumétricas, partículas y grano de película.',
  },
  'sp.s4.p4.title': { PT: 'RETENÇÃO MÁXIMA DE ATENÇÃO', EN: 'MAXIMUM VIEWER RETENTION HOOKS', ES: 'MÁXIMA RETENCIÓN DE AUDIENCIA' },
  'sp.s4.p4.desc': {
    PT: 'Ganchos visuais nos primeiros segundos estruturados para reter mais de 80% dos espectadores do início ao encerramento da peça.',
    EN: 'Structured visual hooks across the first 3 seconds designed to sustain viewer engagement rates above 80%.',
    ES: 'Ganchos visuales en los primeros segundos diseñados para retener más del 80% de la audiencia.',
  },

  // Service Detail Modal
  'service_detail.badge': { PT: '// DETALHES DO SERVIÇO', EN: '// SERVICE DETAILS', ES: '// DETALLES DEL SERVICIO' },
  'service_detail.about_title': { PT: 'Sobre o Serviço', EN: 'About the Service', ES: 'Sobre el Servicio' },
  'service_detail.includes_title': { PT: 'O que está incluso', EN: "What's Included", ES: 'Lo que está incluido' },
  'service_detail.redirect_title': { PT: 'Onde solicitar este serviço', EN: 'Where to request this service', ES: 'Dónde solicitar este servicio' },
  'service_detail.redirect_desc': {
    PT: 'Fale diretamente comigo para orçar ou tirar dúvidas sobre este serviço. Escolha o canal de sua preferência:',
    EN: 'Talk directly with me to get a quote or ask questions about this service. Choose your preferred channel:',
    ES: 'Habla directamente conmigo para cotizar o hacer preguntas sobre este servicio. Elige tu canal preferido:',
  },
  'service_detail.btn_wa': { PT: 'Conversar no WhatsApp', EN: 'Chat on WhatsApp', ES: 'Conversar en WhatsApp' },
  'service_detail.btn_email': { PT: 'Enviar por E-mail', EN: 'Send via Email', ES: 'Enviar por Correo' },
  'service_detail.btn_form': { PT: 'Preencher Formulário Completo', EN: 'Fill Out Detailed Form', ES: 'Llenar Formulario Completo' },

  // Service 1 Details
  'service_detail.s1.desc': {
    PT: 'Criação de websites modernos, landing pages de alta conversão e interfaces digitais sofisticadas. Foco em tipografia impactante, microinterações fluidas e usabilidade cirúrgica para transformar visitantes em clientes fiéis.',
    EN: 'Creation of modern websites, high-converting landing pages, and sophisticated digital interfaces. I focus on impactful typography, fluid microinteractions, and surgical usability to turn visitors into loyal clients.',
    ES: 'Creación de sitios web modernos, landing pages de alta conversión e interfaces digitales sofisticadas. Me enfoco en tipografía impactante, microinteracciones fluidas y usabilidad quirúrgica para transformar visitantes en clientes fieles.',
  },
  'service_detail.s1.f1': { PT: 'Design UI/UX Responsivo (Mobile, Tablet & Desktop)', EN: 'Responsive UI/UX Design (Mobile, Tablet & Desktop)', ES: 'Diseño UI/UX Responsivo (Móvil, Tablet y Escritorio)' },
  'service_detail.s1.f2': { PT: 'Prototipagem Interativa & Design System no Figma', EN: 'Interactive Prototyping & Design System in Figma', ES: 'Prototipado Interactivo y Design System en Figma' },
  'service_detail.s1.f3': { PT: 'Estrutura focada em Conversão & Retenção', EN: 'Conversion & Retention focused Architecture', ES: 'Estructura enfocada en Conversión y Retención' },
  'service_detail.s1.f4': { PT: 'Direção de Arte Editorial & Estética Exclusiva', EN: 'Editorial Art Direction & Exclusive Aesthetics', ES: 'Dirección de Arte Editorial y Estética Exclusiva' },

  // Service 2 Details
  'service_detail.s2.desc': {
    PT: 'Desenvolvimento de experiências 3D interativas diretamente no navegador com Three.js e WebGL. Transformo produtos e conceitos em modelos tridimensionais que o usuário pode girar, explorar e interagir em tempo real com máxima fluidez.',
    EN: 'Development of interactive 3D browser experiences using Three.js and WebGL. I transform products and concepts into 3D models users can rotate, explore, and interact with in real time with maximum fluidity.',
    ES: 'Desarrollo de experiencias 3D interactivas en el navegador con Three.js y WebGL. Transformo productos y conceptos en modelos tridimensionales que el usuario puede girar, explorar e interactuar en tiempo real con máxima fluidez.',
  },
  'service_detail.s2.f1': { PT: 'Interatividade 3D WebGL em Tempo Real (Three.js)', EN: 'Real-Time WebGL 3D Interactivity (Three.js)', ES: 'Interactividad 3D WebGL en Tiempo Real (Three.js)' },
  'service_detail.s2.f2': { PT: 'Shaders Customizados, Iluminação & Reflexos', EN: 'Custom Shaders, Lighting & Reflections', ES: 'Shaders Personalizados, Iluminación y Reflejos' },
  'service_detail.s2.f3': { PT: 'Otimização Extrema de Geometria e Texturas', EN: 'Extreme Geometry & Texture Optimization', ES: 'Optimización Extrema de Geometría y Texturas' },
  'service_detail.s2.f4': { PT: 'Controles de Câmera, Órbita e Reação ao Cursor', EN: 'Camera Controls, Orbit & Cursor Tracking', ES: 'Controles de Cámara, Órbita y Rastreo de Cursor' },

  // Service 3 Details
  'service_detail.s3.desc': {
    PT: 'Modelagem 3D e renderização cinemática para produtos, concept art e peças publicitárias. Crio modelos com malha precisa, shaders realistas (metais, vidro, tecidos) e iluminação cinematográfica para apresentações inesquecíveis.',
    EN: 'High-precision 3D modeling and cinematic rendering for products, concept art, and advertising. I create models with clean topology, realistic shaders (metals, glass, fabrics), and cinematic lighting for unforgettable presentations.',
    ES: 'Modelado 3D y renderizado cinemático para productos, concept art y publicidad. Creo modelos con topología precisa, shaders realistas (metales, vidrio, telas) e iluminación cinematográfica para presentaciones inolvidables.',
  },
  'service_detail.s3.f1': { PT: 'Modelagem 3D Hard-Surface & Orgânica', EN: 'Hard-Surface & Organic 3D Modeling', ES: 'Modelado 3D Hard-Surface y Orgánico' },
  'service_detail.s3.f2': { PT: 'Texturização Realista & Materiais PBR Avançados', EN: 'Realistic Texturing & Advanced PBR Materials', ES: 'Texturizado Realista y Materiales PBR Avanzados' },
  'service_detail.s3.f3': { PT: 'Iluminação Cinemática & Composição', EN: 'Cinematic Lighting & Composition', ES: 'Iluminación Cinemática y Composición' },
  'service_detail.s3.f4': { PT: 'Exportação em Alta Resolução & Assets Otimizados (GLTF)', EN: 'High-Resolution Export & Web-Optimized Assets (GLTF)', ES: 'Exportación en Alta Resolución y Assets Optimizados (GLTF)' },

  // Service 4 Details
  'service_detail.s4.desc': {
    PT: 'Animações dinâmicas, tipografia cinética e vídeos de produto com alto impacto visual. Crio loops promocionais e microinterações com ritmo e fluidez que capturam a atenção e elevam o nível de qualquer marca.',
    EN: 'Dynamic animations, kinetic typography, and high-impact product videos. I create promotional loops and microinteractions with rhythm and fluidity that capture attention and elevate any brand tier.',
    ES: 'Animaciones dinámicas, tipografía cinética y videos de producto con alto impacto visual. Creo loops promocionales y microinteracciones con ritmo y fluidez que capturan la atención y elevan cualquier marca.',
  },
  'service_detail.s4.f1': { PT: 'Animação de Produto & Loops Promocionais', EN: 'Product Animation & Promotional Loops', ES: 'Animación de Producto y Loops Promocionales' },
  'service_detail.s4.f2': { PT: 'Tipografia Cinética & Transições Dinâmicas', EN: 'Kinetic Typography & Dynamic Transitions', ES: 'Tipografía Cinética y Transiciones Dinámicas' },
  'service_detail.s4.f3': { PT: 'Microinterações de Interface & Smooth Physics', EN: 'UI Microinteractions & Smooth Physics', ES: 'Microinteracciones de Interfaz y Smooth Physics' },
  'service_detail.s4.f4': { PT: 'Edição e Ritmo Visual de Alto Impacto', EN: 'High-Impact Visual Rhythm & Editing', ES: 'Edición y Ritmo Visual de Alto Impacto' },

  // Contact Modal
  'contact.badge': { PT: 'ENTRE EM CONTATO', EN: 'GET IN TOUCH', ES: 'PONTE EN CONTACTO' },
  'contact.startProject': { PT: 'Iniciar um projeto', EN: 'Start a project', ES: 'Iniciar un proyecto' },
  'contact.title': { PT: 'Iniciar um Projeto', EN: 'Start a Project', ES: 'Iniciar un Proyecto' },
  'contact.subtitle': {
    PT: 'Conte-me sobre sua visão 3D, prazos e objetivos.',
    EN: 'Tell me about your 3D vision, timeline, and goals.',
    ES: 'Cuéntame sobre tu visión 3D, plazos y objetivos.',
  },
  'contact.name_label': { PT: 'Seu Nome *', EN: 'Your Name *', ES: 'Tu Nombre *' },
  'contact.email_label': { PT: 'Seu E-mail *', EN: 'Your Email *', ES: 'Tu Correo *' },
  'contact.phone_label': { PT: 'WhatsApp / Telefone', EN: 'WhatsApp / Phone', ES: 'WhatsApp / Teléfono' },
  'contact.service_label': { PT: 'Serviço de Interesse', EN: 'Service of Interest', ES: 'Servicio de Interés' },
  'contact.details_label': { PT: 'Detalhes do Projeto *', EN: 'Project Details *', ES: 'Detalles del Proyecto *' },
  'contact.send_btn': { PT: 'Enviar para kauangabrielsilva425@gmail.com', EN: 'Send to kauangabrielsilva425@gmail.com', ES: 'Enviar a kauangabrielsilva425@gmail.com' },
  'contact.direct_wa': { PT: 'WhatsApp Direto', EN: 'Direct WhatsApp', ES: 'WhatsApp Directo' },
  'contact.sent_title': { PT: 'Mensagem Enviada!', EN: 'Message Sent!', ES: '¡Mensaje Enviado!' },
  'contact.sent_desc': {
    PT: 'Sua solicitação foi encaminhada para kauangabrielsilva425@gmail.com! Retornarei no WhatsApp (31) 99657-1669 ou por e-mail em até 24 horas.',
    EN: 'Your request was forwarded to kauangabrielsilva425@gmail.com! I will reply on WhatsApp (31) 99657-1669 or email within 24 hours.',
    ES: '¡Tu solicitud fue enviada a kauangabrielsilva425@gmail.com! Responderé por WhatsApp (31) 99657-1669 o correo en menos de 24 horas.',
  },

  // 3D Spatial Showcase Experience
  'spatial.stage1_p': {
    EN: '3D modeling & spatial computing. Crafting interactive experiences and visualizations for brands leading the web.',
    PT: 'Modelagem 3D & computação espacial. Criando experiências interativas e visualizações para marcas que lideram a web.',
    ES: 'Modelado 3D y computación espacial. Creando experiencias interactivas y visualizaciones para marcas que lideran la web.',
  },
  'spatial.stage2_badge': {
    EN: '// 3D COLLECTION // SCROLL EXPERIENCE',
    PT: '// COLEÇÃO 3D // EXPERIÊNCIA DE SCROLL',
    ES: '// COLECCIÓN 3D // EXPERIENCIA DE SCROLL',
  },
  'spatial.stage3_h2': {
    EN: 'I build high-performance 3D experiences, spatial installations, and immersive art direction for the modern web.',
    PT: 'Eu desenvolvo experiências 3D de alta performance, instalações espaciais e direção de arte imersiva para o navegador.',
    ES: 'Desarrollo experiencias 3D de alto rendimiento, instalaciones espaciales y dirección de arte inmersiva para la web.',
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  tLines: (key: string) => string[];
}

const LanguageContext = createContext<LanguageContextType>({
  language: 'EN',
  setLanguage: () => {},
  t: (key) => key,
  tLines: () => [],
});

const STORAGE_KEY = 'kauan_portfolio_lang';

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEY) as Language | null;
      if (saved && ['PT', 'EN', 'ES'].includes(saved)) {
        return saved;
      }
    }
    return 'EN';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, lang);
    }
  };

  const t = (key: string): string => {
    const entry = translations[key];
    if (!entry) return key;
    const val = entry[language] ?? entry['EN'] ?? entry['PT'];
    return Array.isArray(val) ? val.join(' ') : (val as string);
  };

  const tLines = (key: string): string[] => {
    const entry = translations[key];
    if (!entry) return [];
    const val = entry[language] ?? entry['EN'] ?? entry['PT'];
    return Array.isArray(val) ? val : [val as string];
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, tLines }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
