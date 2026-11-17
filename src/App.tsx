import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import { LanguageProvider } from './context/LanguageContext';
import { LanguageSelector } from './components/LanguageSelector';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { ServicesSection } from './components/ServicesSection';
import { IntroScreen } from './components/IntroScreen';
import { WebDesignAiEngineerSection } from './components/WebDesignAiEngineerSection';
import type { LegalTab } from './components/LegalModal';

// High-Performance Dynamic Code Splitting (Reduces Initial Main-Thread JS by >600KB)
const Spatial3DShowcaseSection = React.lazy(() => import('./components/Spatial3DShowcaseSection').then(m => ({ default: m.Spatial3DShowcaseSection })));
const OrchestraCubesSection = React.lazy(() => import('./components/OrchestraCubesSection').then(m => ({ default: m.OrchestraCubesSection })));
const ProposalInquirySection = React.lazy(() => import('./components/ProposalInquirySection').then(m => ({ default: m.ProposalInquirySection })));
const EditorialMoodboardStream = React.lazy(() => import('./components/EditorialMoodboardStream').then(m => ({ default: m.EditorialMoodboardStream })));
const ServicePage = React.lazy(() => import('./components/ServicePage').then(m => ({ default: m.ServicePage })));
const ContactModal = React.lazy(() => import('./components/ContactModal').then(m => ({ default: m.ContactModal })));
const LegalModal = React.lazy(() => import('./components/LegalModal').then(m => ({ default: m.LegalModal })));

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

declare global {
  interface Window {
    __lenis?: Lenis;
    gsap?: typeof gsap;
    ScrollTrigger?: typeof ScrollTrigger;
  }
}

export const App: React.FC = () => {
  const [showIntro, setShowIntro] = useState(true);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isLegalModalOpen, setIsLegalModalOpen] = useState(false);
  const [legalTab, setLegalTab] = useState<LegalTab>('privacy');
  const [contactService, setContactService] = useState<string>('Web Design & UI/UX');

  const getSlugFromHash = () => {
    if (typeof window !== 'undefined' && window.location.hash.startsWith('#/servico/')) {
      return window.location.hash.replace('#/servico/', '');
    }
    return null;
  };

  const [selectedServiceSlug, setSelectedServiceSlug] = useState<string | null>(getSlugFromHash);

  useEffect(() => {
    const handleHash = () => {
      const slug = getSlugFromHash();
      setSelectedServiceSlug(slug);
    };
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  // Dynamic Browser Tab Title with "Kauan" front and center
  useEffect(() => {
    if (selectedServiceSlug) {
      const titles: Record<string, string> = {
        'web-design': 'Kauan | Web Design & UI/UX',
        'creative-3d': 'Kauan | Creative Dev & 3D WebGL',
        '3d-modeling': 'Kauan | Modelagem 3D & Render',
        'motion-design': 'Kauan | Motion Design & Animação',
      };
      document.title = titles[selectedServiceSlug] || 'Kauan | 3D & Web Design';
    } else {
      document.title = 'Kauan | 3D & Web Design';
    }
  }, [selectedServiceSlug]);

  useEffect(() => {
    // Expose for debugging/inspection
    window.gsap = gsap;
    window.ScrollTrigger = ScrollTrigger;

    // 1. Initialize Lenis High-Performance Smooth Scroll
    const lenis = new Lenis({
      duration: 1.7,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.3,
      infinite: false,
    });

    window.__lenis = lenis;

    // 2. Synchronize Lenis scroll updates with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    // 3. Connect Lenis RAF directly to GSAP's internal ticker
    const updateTicker = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

    // 4. Force a fresh ScrollTrigger calculation after initial paint
    ScrollTrigger.refresh();

    return () => {
      gsap.ticker.remove(updateTicker);
      lenis.destroy();
      window.__lenis = undefined;
      window.gsap = undefined;
      window.ScrollTrigger = undefined;
    };
  }, []);

  useEffect(() => {
    if (window.__lenis) {
      if (isContactModalOpen || isLegalModalOpen) {
        window.__lenis.stop();
      } else {
        window.__lenis.start();
      }
    }
  }, [isContactModalOpen, isLegalModalOpen]);

  const handleOpenContact = (serviceName?: string) => {
    setContactService(serviceName || 'Web Design & UI/UX');
    setIsContactModalOpen(true);
  };

  const handleCloseContact = () => {
    setIsContactModalOpen(false);
  };

  const handleOpenPrivacy = () => {
    setLegalTab('privacy');
    setIsLegalModalOpen(true);
  };

  const handleOpenTerms = () => {
    setLegalTab('terms');
    setIsLegalModalOpen(true);
  };

  const handleSelectService = (slug: string) => {
    window.location.hash = `#/servico/${slug}`;
    setSelectedServiceSlug(slug);
    if (window.__lenis) {
      window.__lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  };

  const handleBackFromService = () => {
    setSelectedServiceSlug(null);
    window.location.hash = '#services';
    setTimeout(() => {
      ScrollTrigger.refresh();
      const el = document.getElementById('services');
      if (el) {
        if (window.__lenis) {
          window.__lenis.scrollTo(el, { duration: 1.0, offset: -40 });
        } else {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }, 50);
  };

  // Pause scroll when intro is active, resume on exit
  useEffect(() => {
    if (showIntro) {
      window.__lenis?.stop();
      document.body.style.overflow = 'hidden';
    } else {
      window.__lenis?.start();
      document.body.style.overflow = '';
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 100);
    }
  }, [showIntro]);

  const handleCompleteIntro = () => {
    setShowIntro(false);
  };

  return (
    <LanguageProvider>
      {/* Cinematic Circular Cosmic Intro Animation */}
      <AnimatePresence mode="wait">
        {showIntro && <IntroScreen onComplete={handleCompleteIntro} />}
      </AnimatePresence>

      {/* Homepage view - preserved in DOM, hidden when viewing a service (Harry Portugal model) */}
      <div
        className="bg-[#000000] min-h-screen text-[#F8FAFC] font-['Kanit',sans-serif] relative"
        style={{
          display: selectedServiceSlug ? 'none' : 'block',
        }}
      >
        {/* Top-Right Language Switcher (PT / EN / ES) */}
        <LanguageSelector />

        {/* 1. Hero Section */}
        <HeroSection onContactClick={handleOpenContact} />

        {/* 2. About Section */}
        <AboutSection onContactClick={handleOpenContact} />

        {/* 3. Web Design & Engenharia de IA (Showcase 3D Flutuante - 6 Obras) */}
        <WebDesignAiEngineerSection onContactClick={handleOpenContact} />

        {/* 3. Bento Services Section */}
        <ServicesSection
          onContactClick={handleOpenContact}
          onSelectService={handleSelectService}
        />

        {/* 4. 3D Spatial Product Lab & Below-the-Fold Sections (Loaded via Suspense Chunk) */}
        <React.Suspense fallback={<div className="w-full bg-[#000000]" style={{ minHeight: '100vh' }} />}>
          <Spatial3DShowcaseSection onContactClick={handleOpenContact} />
          <OrchestraCubesSection />
          <ProposalInquirySection />
          <EditorialMoodboardStream onContactClick={handleOpenContact} />
        </React.Suspense>
      </div>

      {/* Dedicated Service Case Study View (Harry Portugal Model - In Document Flow with Velvet Lenis Scroll) */}
      {selectedServiceSlug && (
        <React.Suspense fallback={<div className="w-full min-h-screen bg-[#000000]" />}>
          <div className="w-full min-h-screen bg-[#000000] text-[#F8FAFC] relative z-20">
            <ServicePage
              slug={selectedServiceSlug}
              onBack={handleBackFromService}
              onSelectService={handleSelectService}
              onOpenContact={(srv) => {
                setContactService(srv);
                setIsContactModalOpen(true);
              }}
            />
          </div>
        </React.Suspense>
      )}

      
      {/* Interactive Contact & Legal Modals (Loaded On-Demand) */}
      <React.Suspense fallback={null}>
        {isContactModalOpen && (
          <ContactModal
            isOpen={isContactModalOpen}
            onClose={handleCloseContact}
            initialService={contactService}
          />
        )}

        {isLegalModalOpen && (
          <LegalModal
            isOpen={isLegalModalOpen}
            onClose={() => setIsLegalModalOpen(false)}
            initialTab={legalTab}
          />
        )}
      </React.Suspense>
    </LanguageProvider>
  );
};

export default App;
