import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, MessageCircle, Mail, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export interface ServiceDetailData {
  id: string;
  value: string;
  titleKey: string;
  descKey: string;
  featureKeys: string[];
  videoSrc: string;
}

interface ServiceDetailModalProps {
  service: ServiceDetailData | null;
  isOpen: boolean;
  onClose: () => void;
  onOpenForm: (serviceValue: string) => void;
}

export const ServiceDetailModal: React.FC<ServiceDetailModalProps> = ({
  service,
  isOpen,
  onClose,
  onOpenForm,
}) => {
  const { t, language } = useLanguage();

  if (!service) return null;

  const getWhatsAppUrl = () => {
    const serviceName = t(service.titleKey);
    let msg = `Olá Kauan! Gostaria de saber mais e solicitar um orçamento para o serviço de ${serviceName}.`;
    if (language === 'EN') {
      msg = `Hi Kauan! I'd like to learn more and request a quote for ${serviceName}.`;
    } else if (language === 'ES') {
      msg = `¡Hola Kauan! Me gustaría saber más y solicitar una cotización para el servicio de ${serviceName}.`;
    }
    return `https://wa.me/5531996571669?text=${encodeURIComponent(msg)}`;
  };

  const getMailtoUrl = () => {
    const serviceName = t(service.titleKey);
    const subject = encodeURIComponent(`[Kauan Gabriel] Orçamento - ${serviceName}`);
    const body = encodeURIComponent(
      `Olá Kauan,\n\nTenho interesse no serviço de ${serviceName} para o meu projeto.\n\nGostaria de entender prazos e disponibilidade.`
    );
    return `mailto:kauangabrielsilva425@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 20 }}
            transition={{ type: 'spring', duration: 0.5, bounce: 0.12 }}
            className="relative w-full max-w-2xl bg-[#050507] border border-white/[0.12] rounded-3xl p-6 sm:p-8 md:p-10 shadow-[0_30px_90px_rgba(0,0,0,0.95)] z-10 my-auto text-left select-none overflow-hidden"
          >
            {/* Top Close Button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.1] flex items-center justify-center hover:border-white/40 hover:bg-white/[0.08] text-zinc-400 hover:text-white transition-all cursor-pointer"
              aria-label="Fechar"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header / Badge */}
            <div className="flex items-center gap-3 mb-2">
              <span className="text-[11px] font-mono tracking-[0.25em] text-zinc-400 uppercase">
                {t('service_detail.badge')} // {service.id}
              </span>
            </div>

            {/* Title */}
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-medium tracking-tight text-white uppercase pr-10">
              {t(service.titleKey)}
            </h2>

            {/* Video Preview Snippet */}
            <div className="mt-5 w-full h-[180px] sm:h-[220px] rounded-2xl overflow-hidden bg-black border border-white/[0.08] relative">
              <video
                src={service.videoSrc}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover pointer-events-none"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />
            </div>

            {/* About the Service */}
            <div className="mt-6">
              <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-zinc-400 mb-2 font-medium">
                {t('service_detail.about_title')}
              </h3>
              <p className="text-sm sm:text-base text-zinc-300 font-light leading-relaxed">
                {t(service.descKey)}
              </p>
            </div>

            {/* What's Included */}
            <div className="mt-6">
              <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-zinc-400 mb-3 font-medium">
                {t('service_detail.includes_title')}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {service.featureKeys.map((fKey) => (
                  <div
                    key={fKey}
                    className="flex items-center gap-2.5 p-3 rounded-xl bg-white/[0.02] border border-white/[0.06]"
                  >
                    <div className="w-5 h-5 rounded-md bg-white/[0.08] flex items-center justify-center shrink-0">
                      <Check className="w-3.5 h-3.5 text-zinc-200" />
                    </div>
                    <span className="text-xs text-zinc-300 font-normal">
                      {t(fKey)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Where to Request / Redirection Actions */}
            <div className="mt-8 pt-6 border-t border-white/[0.08]">
              <div className="mb-4">
                <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-white font-medium">
                  {t('service_detail.redirect_title')}
                </h3>
                <p className="text-xs text-zinc-400 mt-1">
                  {t('service_detail.redirect_desc')}
                </p>
              </div>

              {/* Action Buttons Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* 1. Direct WhatsApp */}
                <a
                  href={getWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2.5 px-4 py-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.12] hover:border-white/30 text-white text-xs font-mono uppercase tracking-[0.12em] transition-all cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 text-zinc-300" />
                  <span>{t('service_detail.btn_wa')}</span>
                </a>

                {/* 2. Direct Email */}
                <a
                  href={getMailtoUrl()}
                  className="flex items-center justify-center gap-2.5 px-4 py-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.12] hover:border-white/30 text-white text-xs font-mono uppercase tracking-[0.12em] transition-all cursor-pointer"
                >
                  <Mail className="w-4 h-4 text-zinc-300" />
                  <span>{t('service_detail.btn_email')}</span>
                </a>

                {/* 3. Open Detailed Form (Span 2 cols) */}
                <button
                  type="button"
                  onClick={() => onOpenForm(service.value)}
                  className="sm:col-span-2 flex items-center justify-center gap-2.5 px-5 py-3.5 rounded-xl bg-white text-black hover:bg-zinc-200 font-mono text-xs uppercase tracking-[0.14em] font-semibold transition-all cursor-pointer shadow-lg"
                >
                  <span>{t('service_detail.btn_form')}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
