import React, { useEffect, useRef, useMemo } from 'react';
import { useLanguage } from '../context/LanguageContext';

export interface EditorialMoodboardStreamProps {
  onContactClick?: () => void;
}

const MOODBOARD_ITEMS = [
  { name: 'Fieldnotes', year: 2020, img: '/moodboard/img1.webp' },
  { name: 'Redline', year: 2021, img: '/moodboard/img2.webp' },
  { name: 'Gallery Walk', year: 2019, img: '/moodboard/img3.webp' },
  { name: 'Side Profile', year: 2022, img: '/moodboard/img4.webp' },
  { name: 'Open Mic', year: 2023, img: '/moodboard/img5.webp' },
  { name: 'Backboard', year: 2024, img: '/moodboard/img6.webp' },
  { name: 'Afterglow', year: 2021, img: '/moodboard/img7.webp' },
  { name: 'Hill House', year: 2020, img: '/moodboard/img8.webp' },
  { name: 'Low Tide', year: 2018, img: '/moodboard/img9.webp' },
  { name: 'Timepiece', year: 2019, img: '/moodboard/img10.webp' },
  { name: 'Close Focus', year: 2022, img: '/moodboard/img11.webp' },
  { name: 'Airframe', year: 2023, img: '/moodboard/img12.webp' },
  { name: 'Hardcase', year: 2024, img: '/moodboard/img13.webp' },
  { name: 'Deep Red', year: 2021, img: '/moodboard/img14.webp' },
  { name: 'Fast Track', year: 2022, img: '/moodboard/img15.webp' },
  { name: 'Night Shift', year: 2025, img: '/moodboard/img16.webp' },
];

const NUM_ROWS = 12;
const ITEMS_PER_ROW = 10;

export const EditorialMoodboardStream: React.FC<EditorialMoodboardStreamProps> = ({
  onContactClick,
}) => {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLElement>(null);
  const rowsRef = useRef<(HTMLDivElement | null)[]>([]);
  const minWidthRef = useRef(125);
  const maxWidthRef = useRef(500);

  // Distribute items staggered across rows
  const gridRows = useMemo(() => {
    const rows: typeof MOODBOARD_ITEMS[] = [];
    let idx = 0;
    for (let r = 0; r < NUM_ROWS; r++) {
      const rowItems: typeof MOODBOARD_ITEMS = [];
      for (let c = 0; c < ITEMS_PER_ROW; c++) {
        rowItems.push(MOODBOARD_ITEMS[idx % MOODBOARD_ITEMS.length]);
        idx++;
      }
      rows.push(rowItems);
    }
    return rows;
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const rows = rowsRef.current.filter(Boolean) as HTMLDivElement[];
    if (rows.length === 0) return;

    const isMobile = window.innerWidth < 1000;
    minWidthRef.current = isMobile ? 220 : 125;
    maxWidthRef.current = isMobile ? 650 : 450;

    const currentWidths = rows.map(() => minWidthRef.current);
    const targetWidths = [...currentWidths];
    const rowHeights = rows.map(() => 0);
    const rowTops = rows.map(() => 0);

    const measure = () => {
      const isMob = window.innerWidth < 1000;
      minWidthRef.current = isMob ? 220 : 125;
      maxWidthRef.current = isMob ? 650 : 450;

      rows.forEach((row, i) => {
        rowHeights[i] = row.offsetHeight;
        const rect = row.getBoundingClientRect();
        rowTops[i] = rect.top + window.scrollY;
      });
    };

    measure();

    let lastScroll = -1;
    let isRunning = true;

    const update = () => {
      const scrollY = window.scrollY;
      if (scrollY === lastScroll && !isRunning) return;

      const windowH = window.innerHeight;
      let hasChange = false;

      rows.forEach((row, idx) => {
        const top = rowTops[idx] || (row.getBoundingClientRect().top + scrollY);
        const h = rowHeights[idx] || row.offsetHeight;
        const bottom = top + h;
        const start = top - windowH;
        const end = bottom;

        let progress = (scrollY - start) / (end - start);
        progress = Math.max(0, Math.min(1, progress));

        targetWidths[idx] =
          minWidthRef.current + (maxWidthRef.current - minWidthRef.current) * progress;

        const diff = targetWidths[idx] - currentWidths[idx];
        if (Math.abs(diff) > 0.05) {
          currentWidths[idx] += diff * 0.08;
          row.style.width = `${currentWidths[idx]}%`;
          hasChange = true;
        } else if (currentWidths[idx] !== targetWidths[idx]) {
          currentWidths[idx] = targetWidths[idx];
          row.style.width = `${currentWidths[idx]}%`;
        }
      });

      lastScroll = scrollY;
      isRunning = hasChange || scrollY !== lastScroll;
    };

    if (window.gsap?.ticker) {
      window.gsap.ticker.add(update);
    }

    window.addEventListener('resize', measure);
    window.addEventListener('scroll', update, { passive: true });

    return () => {
      if (window.gsap?.ticker) {
        window.gsap.ticker.remove(update);
      }
      window.removeEventListener('resize', measure);
      window.removeEventListener('scroll', update);
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="projects-scroll-container w-full bg-[#000000] relative overflow-hidden pt-8 pb-28 md:pt-12 md:pb-44 flex flex-col items-center gap-3 md:gap-4 select-none [clip-path:inset(0)]"
      style={{
        contentVisibility: 'auto',
        overflow: 'hidden',
        contain: 'paint',
      }}
    >
      {gridRows.map((row, rowIdx) => (
        <div
          key={`moodboard-row-${rowIdx}`}
          ref={(el) => {
            rowsRef.current[rowIdx] = el;
          }}
          className="projects-scroll-row flex gap-3 md:gap-4 will-change-[width] justify-center"
          style={{ width: `${minWidthRef.current}%` }}
        >
          {row.map((item, itemIdx) => (
            <div
              key={`moodboard-item-${rowIdx}-${itemIdx}`}
              className="projects-scroll-item flex-1 h-[135px] sm:h-[160px] md:h-[220px] rounded-xl overflow-hidden shrink-0 group relative bg-black border border-white/[0.04]"
            >
              <div className="projects-scroll-img-wrapper w-full h-full rounded-xl overflow-hidden relative">
                <img
                  src={item.img}
                  alt={item.name}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover filter grayscale contrast-[1.08] brightness-[0.92] group-hover:scale-105 transition-transform duration-700 ease-out"
                />
              </div>
            </div>
          ))}
        </div>
      ))}

    </section>
  );
};

export default EditorialMoodboardStream;
