/**
 * High-Performance Deferred Tracking Pixel Loader
 * Loads Google Analytics 4, Google Ads, Meta Pixel, and Microsoft Clarity
 * ONLY after the first user interaction or idle callback, preserving 100% PageSpeed & Core Web Vitals.
 */

interface PixelConfig {
  ga4Id?: string;
  googleAdsId?: string;
  metaPixelId?: string;
  clarityId?: string;
}

// Configurable via window.PIXEL_CONFIG or import.meta.env
declare global {
  interface Window {
    dataLayer?: any[];
    gtag?: (...args: any[]) => void;
    fbq?: any;
    _fbq?: any;
    clarity?: any;
    PIXEL_CONFIG?: PixelConfig;
  }
}

let isInitialized = false;

function loadScript(src: string, id: string): Promise<void> {
  return new Promise((resolve) => {
    if (document.getElementById(id)) {
      resolve();
      return;
    }
    const script = document.createElement('script');
    script.id = id;
    script.src = src;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => resolve(); // Graceful degradation
    document.head.appendChild(script);
  });
}

function initGA4(ga4Id: string, googleAdsId?: string) {
  if (!ga4Id && !googleAdsId) return;
  const primaryId = ga4Id || googleAdsId;

  window.dataLayer = window.dataLayer || [];
  window.gtag = function () {
    window.dataLayer?.push(arguments);
  };
  window.gtag('js', new Date());

  if (ga4Id) {
    window.gtag('config', ga4Id, {
      send_page_view: true,
      cookie_flags: 'SameSite=None;Secure',
    });
  }
  if (googleAdsId) {
    window.gtag('config', googleAdsId);
  }

  loadScript(`https://www.googletagmanager.com/gtag/js?id=${primaryId}`, 'gtag-script');
}

function initMetaPixel(metaPixelId: string) {
  if (!metaPixelId) return;

  (function (f: any, b: any, e: any, v: any, n?: any, t?: any, s?: any) {
    if (f.fbq) return;
    n = f.fbq = function () {
      if (n.callMethod) {
        n.callMethod.apply(n, arguments);
      } else {
        n.queue.push(arguments);
      }
    };
    if (!f._fbq) f._fbq = n;
    n.push = n;
    n.loaded = true;
    n.version = '2.0';
    n.queue = [];
    t = b.createElement(e);
    t.async = true;
    t.src = v;
    s = b.getElementsByTagName(e)[0];
    if (s && s.parentNode) {
      s.parentNode.insertBefore(t, s);
    } else {
      b.head.appendChild(t);
    }
  })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');

  if (window.fbq) {
    window.fbq('init', metaPixelId);
    window.fbq('track', 'PageView');
  }
}

function initClarity(clarityId: string) {
  if (!clarityId) return;

  (function (c: any, l: any, a: any, r: any, i: any, t?: any, y?: any) {
    c[a] =
      c[a] ||
      function () {
        (c[a].q = c[a].q || []).push(arguments);
      };
    t = l.createElement(r);
    t.async = 1;
    t.src = 'https://www.clarity.ms/tag/' + i;
    y = l.getElementsByTagName(r)[0];
    if (y && y.parentNode) {
      y.parentNode.insertBefore(t, y);
    } else {
      l.head.appendChild(t);
    }
  })(window, document, 'clarity', 'script', clarityId);
}

function loadAllPixels() {
  if (isInitialized) return;
  isInitialized = true;

  // Retrieve IDs from window configuration or environment variables
  const config: PixelConfig = window.PIXEL_CONFIG || {
    ga4Id: (import.meta as any).env?.VITE_GA4_ID || 'G-XXXXXXXXXX',
    googleAdsId: (import.meta as any).env?.VITE_GOOGLE_ADS_ID || '',
    metaPixelId: (import.meta as any).env?.VITE_META_PIXEL_ID || '',
    clarityId: (import.meta as any).env?.VITE_CLARITY_ID || '',
  };

  // Only initialize real tags if provided, or attach tracking stubs
  if (config.ga4Id && config.ga4Id !== 'G-XXXXXXXXXX') {
    initGA4(config.ga4Id, config.googleAdsId);
  }
  if (config.metaPixelId) {
    initMetaPixel(config.metaPixelId);
  }
  if (config.clarityId) {
    initClarity(config.clarityId);
  }

  // Remove event listeners
  EVENTS.forEach((event) => {
    window.removeEventListener(event, handleUserInteraction, { capture: true });
  });
}

const EVENTS: Array<keyof WindowEventMap> = [
  'pointerdown',
  'touchstart',
  'keydown',
  'scroll',
  'wheel',
];

function handleUserInteraction() {
  loadAllPixels();
}

/**
 * Initializes the deferred listener.
 * Attaches passive listeners to user interactions and sets an idle fallback.
 */
export function setupDeferredPixels() {
  if (typeof window === 'undefined') return;

  // 1. Listen for first interaction
  EVENTS.forEach((event) => {
    window.addEventListener(event, handleUserInteraction, {
      capture: true,
      once: true,
      passive: true,
    });
  });

  // 2. Idle fallback (loads after 5s or during idle time if no interaction occurred)
  if ('requestIdleCallback' in window) {
    (window as any).requestIdleCallback(
      () => {
        setTimeout(loadAllPixels, 5000);
      },
      { timeout: 7000 }
    );
  } else {
    setTimeout(loadAllPixels, 5000);
  }
}
