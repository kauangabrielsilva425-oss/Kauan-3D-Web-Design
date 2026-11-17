# Jack — 3D Creator Portfolio

A high-performance, dark-themed 3D Creator portfolio landing page built for **"Jack"** using **React 18**, **TypeScript**, **Tailwind CSS**, **Framer Motion 12**, and **Lucide React**.

## ✨ Features & Architecture

### 1. Global System & Typography
- **Theme**: Pure dark theme (`#0C0C0C`) applied across `html`, `body`, `#root`, and the main wrapper.
- **Font**: Google Font **Kanit** (weights 300 to 900) loaded with preconnect optimization.
- **Hero Heading Style**: `.hero-heading` gradient text class utilizing `background: linear-gradient(180deg, #646973 0%, #BBCCD7 100%)` with `-webkit-background-clip: text` and `-webkit-text-fill-color: transparent`.
- **Layout**: Fluid typography with `clamp()` and `overflowX: 'clip'` to ensure zero horizontal scrollbars while preserving full layout responsiveness.

### 2. Sections (Exact Specified Order)
1. **HeroSection**:
   - Full viewport height (`h-screen`) flex-column layout.
   - Top navbar with 4 evenly spaced links (`About`, `Price`, `Projects`, `Contact`) in `#D7E2EA`, uppercase, tracking-wider, with smooth hover transitions.
   - Massive heading `Hi, i'm jack` in `.hero-heading` gradient (`text-[14vw]` up to `text-[17.5vw]`).
   - Center 3D Portrait wrapped in a reactive **Magnet** component (mouse-following effect with `padding: 150`, `strength: 3`, smooth easing, responsive mobile-to-desktop centering).
   - Bottom bar with fluid descriptive tagline and gradient `ContactButton`.
   - Coordinated staggered entry animations via `FadeIn`.

2. **MarqueeSection**:
   - Two high-speed, scroll-linked rows displaying 21 dynamic GIF previews from motionsites.ai.
   - Row 1 (first 11 images, tripled) moves **RIGHT** on scroll (`translateX(offset - 200)`).
   - Row 2 (next 10 images, tripled) moves **LEFT** on scroll (`translateX(-(offset - 200))`).
   - Real-time scroll calculation `(window.scrollY - sectionTop + window.innerHeight) * 0.3` with passive scroll listener and `requestAnimationFrame`.
   - `420px x 270px` rounded tiles with `willChange: 'transform'` optimization.

3. **AboutSection**:
   - Min-height screen centered section.
   - 4 floating 3D decorative assets positioned in corners with staggered directional `FadeIn` (Moon icon, 3D Object, Lego icon, 3D Group).
   - Centered gradient heading `"About me"`.
   - **AnimatedText**: Character-by-character scroll-driven reveal animating opacity from `0.2` to `1` using Framer Motion `useScroll` with offset `['start 0.8', 'end 0.2']`.
   - Gradient `ContactButton` below the text block with exact specified spacing.

4. **ServicesSection**:
   - Contrast white background (`#FFFFFF`) with heavy rounded top corners (`rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px]`).
   - Massive dark `"Services"` heading in `#0C0C0C`.
   - 5 structured services (`01 - 3D Modeling`, `02 - Rendering`, `03 - Motion Design`, `04 - Branding`, `05 - Web Design`) with huge numbered typography and stacked descriptions separated by subtle 1px dividers.

5. **ProjectsSection**:
   - Dark background (`#0C0C0C`) with matching top radius, pulled up `-mt-10 sm:-mt-12 md:-mt-14` to overlap the services section.
   - Gradient heading `"Project"`.
   - **Sticky-Stacking Cards**: 3 interactive project cards (`Nextlevel Studio`, `Aura Brand Identity`, `Solaris Digital`) that scale down as they are scrolled past (`targetScale = 1 - (totalCards - 1 - index) * 0.03`).
   - Each card features category badge, project name, `LiveProjectButton`, and asymmetric 2-column image layout (40% left with 2 stacked images, 60% right with tall showcase render).
   - Interactive Contact Modal and Back-to-Top trigger.

### 3. Reusable Components
- `ContactButton`: Gradient pill (`#18011F` to `#BE4C00`), inset shadows, white outline offset.
- `LiveProjectButton`: Ghost pill with `#D7E2EA` border and hover state.
- `FadeIn`: Framer Motion `whileInView` wrapper with custom easing `[0.25, 0.1, 0.25, 1]`.
- `Magnet`: Mouse-following interactive transform component.
- `AnimatedText`: Scroll-driven character reveal with layout placeholder preservation.

---

## 🚀 Running the Project

```bash
# Navigate to the project directory
cd jack-portfolio

# Start development server
npm run dev

# Or build for production
npm run build

# Preview production build
npm run preview
```
