import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, CheckCircle2, MessageCircle, Mail, Phone } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialService?: string;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose, initialService }) => {
  const { t, language } = useLanguage();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: initialService || 'Web Design & UI/UX',
    message: '',
  });

  useEffect(() => {
    if (initialService) {
      setFormData((prev) => ({ ...prev, service: initialService }));
    }
  }, [initialService, isOpen]);

  const getWhatsAppMessage = () => {
    switch (language) {
      case 'EN':
        return encodeURIComponent('Hi Kauan! I saw your portfolio and would like to discuss a project.');
      case 'ES':
        return encodeURIComponent('¡Hola Kauan! Vi tu portafolio y me gustaría conversar sobre un proyecto.');
      case 'PT':
      default:
        return encodeURIComponent('Olá Kauan! Vi seu portfólio e gostaria de conversar sobre um projeto.');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Construct formatted email to kauangabrielsilva425@gmail.com
    const subject = encodeURIComponent(`[Projeto Kauan Gabriel] ${formData.service} - ${formData.name}`);
    const body = encodeURIComponent(
      `Olá Kauan,\n\n` +
      `Recebi um novo contato de projeto através do seu portfólio:\n\n` +
      `Nome: ${formData.name}\n` +
      `E-mail: ${formData.email}\n` +
      `WhatsApp / Telefone: ${formData.phone || 'Não informado'}\n` +
      `Serviço de Interesse: ${formData.service}\n\n` +
      `Detalhes do Projeto:\n${formData.message}\n\n` +
      `Enviado via portfólio Kauan Gabriel`
    );

    const mailtoUrl = `mailto:kauangabrielsilva425@gmail.com?subject=${subject}&body=${body}`;
    window.location.href = mailtoUrl;

    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    setFormData({
      name: '',
      email: '',
      phone: '',
      service: 'Web Design & UI/UX',
      message: '',
    });
    onClose();
  };

  const serviceOptions = [
    {
      value: 'Web Design & UI/UX',
      label: '01 | Web Design & UI/UX',
    },
    {
      value: 'Creative Dev & 3D WebGL',
      label: '02 | Creative Dev & 3D WebGL',
    },
    {
      value: 'Modelagem 3D & Render',
      label:
        language === 'PT'
          ? '03 | Modelagem 3D & Render'
          : language === 'ES'
          ? '03 | Modelado 3D & Render'
          : '03 | 3D Modeling & Render',
    },
    {
      value: 'Motion Design & Animação',
      label:
        language === 'PT'
          ? '04 | Motion Design & Animação'
          : language === 'ES'
          ? '04 | Motion Design & Animación'
          : '04 | Motion Design & Animation',
    },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#000000]/80 backdrop-blur-xl"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className="relative w-full max-w-lg rounded-2xl apple-glass-card border border-white/[0.18] p-6 sm:p-8 text-[#F4F7FF] shadow-[0_30px_90px_rgba(0,0,0,0.95)] z-10 overflow-hidden max-h-[92vh] overflow-y-auto"
          >
            {/* Subtle Neutral Ambient Glow */}
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-white/[0.04] rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-white/[0.03] rounded-full blur-3xl pointer-events-none" />

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 w-10 h-10 rounded-xl apple-glass-pill flex items-center justify-center hover:border-white/40 hover:text-white transition-colors cursor-pointer text-zinc-400"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5 text-zinc-400 hover:text-white" />
            </button>

            {submitted ? (
              <div className="py-8 flex flex-col items-center text-center">
                <CheckCircle2 className="w-16 h-16 text-white mb-4" />
                <h3 className="text-2xl font-bold uppercase tracking-tight text-[#F4F7FF] mb-2">
                  {t('contact.sent_title')}
                </h3>
                <p className="text-sm text-[#D4D4D8] max-w-sm mb-6 leading-relaxed">
                  {t('contact.sent_desc')}
                </p>
                <div className="flex flex-col sm:flex-row items-center gap-3 w-full">
                  <a
                    href={`https://wa.me/5531996571669?text=${encodeURIComponent(
                      language === 'EN'
                        ? 'Hi Kauan! I sent an inquiry about a project and would like to chat.'
                        : language === 'ES'
                        ? '¡Hola Kauan! Envié una solicitud sobre un proyecto y me gustaría conversar.'
                        : 'Olá Kauan! Enviei um e-mail sobre um projeto e gostaria de conversar.'
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 w-full py-3.5 px-4 rounded-xl border border-white/20 bg-white/[0.06] hover:bg-white/[0.12] text-white font-semibold text-xs tracking-wider uppercase flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4 text-white" />
                    <span>WhatsApp (31) 99657-1669</span>
                  </a>
                  <button
                    type="button"
                    onClick={handleReset}
                    className="flex-1 w-full py-3.5 px-4 rounded-xl border border-white/[0.14] bg-[#0A0A0E] hover:bg-white/[0.06] text-zinc-300 hover:text-white font-medium text-xs tracking-wider uppercase transition-all cursor-pointer"
                  >
                    {language === 'EN' ? 'Close' : language === 'ES' ? 'Cerrar' : 'Fechar'}
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <div className="mb-5">
                  <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-zinc-400 block mb-1">
                    {t('contact.badge')}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-medium uppercase tracking-[0.04em] text-[#F8FAFC]">
                    {t('contact.title')}
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-400 font-light mt-1">
                    {t('contact.subtitle')}
                  </p>
                </div>

                {/* Direct Fast Contact Badges (Monochrome: Zero Green, Zero Blue) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-5">
                  <a
                    href={`https://wa.me/5531996571669?text=${getWhatsAppMessage()}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2.5 p-3 rounded-xl border border-white/10 bg-white/[0.03] hover:border-white/30 hover:bg-white/[0.06] transition-all duration-200 group cursor-pointer"
                    title={language === 'EN' ? 'Chat directly on WhatsApp' : language === 'ES' ? 'Conversar directamente en WhatsApp' : 'Conversar direto no WhatsApp'}
                  >
                    <div className="w-8 h-8 rounded-lg bg-white/[0.06] border border-white/10 flex items-center justify-center text-white group-hover:bg-white/10 transition-colors">
                      <MessageCircle className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex flex-col text-left">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400">
                        {language === 'EN' ? 'Direct WhatsApp' : language === 'ES' ? 'WhatsApp Directo' : 'WhatsApp Direto'}
                      </span>
                      <span className="text-xs font-semibold text-white tracking-wide">(31) 99657-1669</span>
                    </div>
                  </a>

                  <a
                    href="mailto:kauangabrielsilva425@gmail.com?subject=Or%C3%A7amento%20de%20Projeto%20-%20Kauan%20Gabriel"
                    className="flex items-center gap-2.5 p-3 rounded-xl border border-white/10 bg-white/[0.03] hover:border-white/30 hover:bg-white/[0.06] transition-all duration-200 group cursor-pointer"
                    title={language === 'EN' ? 'Send direct email' : language === 'ES' ? 'Enviar correo directo' : 'Enviar e-mail direto'}
                  >
                    <div className="w-8 h-8 rounded-lg bg-white/[0.06] border border-white/10 flex items-center justify-center text-white group-hover:bg-white/10 transition-colors">
                      <Mail className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex flex-col text-left overflow-hidden">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400">
                        {language === 'EN' ? 'Professional Email' : language === 'ES' ? 'Correo Profesional' : 'E-mail Profissional'}
                      </span>
                      <span className="text-xs font-semibold text-white tracking-wide truncate">kauangabrielsilva425@gmail.com</span>
                    </div>
                  </a>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-300 mb-1 font-medium">
                        {t('contact.name_label')}
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        placeholder="Alex Morgan"
                        className="w-full bg-[#000000] border border-white/[0.1] rounded-xl px-4 py-2.5 text-sm text-[#F8FAFC] placeholder-zinc-600 focus:outline-none focus:border-white/50 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-300 mb-1 font-medium">
                        {t('contact.email_label')}
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        placeholder="alex@brand.com"
                        className="w-full bg-[#000000] border border-white/[0.1] rounded-xl px-4 py-2.5 text-sm text-[#F8FAFC] placeholder-zinc-600 focus:outline-none focus:border-white/50 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-300 mb-1 font-medium">
                        {t('contact.phone_label')}
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        placeholder="(31) 99657-1669"
                        className="w-full bg-[#000000] border border-white/[0.1] rounded-xl px-4 py-2.5 text-sm text-[#F8FAFC] placeholder-zinc-600 focus:outline-none focus:border-white/50 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-300 mb-1 font-medium">
                        {t('contact.service_label')}
                      </label>
                      <select
                        value={formData.service}
                        onChange={(e) =>
                          setFormData({ ...formData, service: e.target.value })
                        }
                        className="w-full bg-[#000000] border border-white/[0.1] rounded-xl px-4 py-2.5 text-sm text-[#F8FAFC] focus:outline-none focus:border-white/50 transition-colors cursor-pointer"
                      >
                        {serviceOptions.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-300 mb-1 font-medium">
                      {t('contact.details_label')}
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      placeholder="..."
                      className="w-full bg-[#000000] border border-white/[0.1] rounded-xl px-4 py-2.5 text-sm text-[#F8FAFC] placeholder-zinc-600 focus:outline-none focus:border-white/50 transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-white text-[#000000] font-semibold uppercase tracking-[0.14em] text-xs sm:text-[13px] flex items-center justify-center gap-2 hover:bg-zinc-200 transition-colors cursor-pointer mt-1 shadow-md"
                  >
                    <Mail className="w-3.5 h-3.5 text-black" />
                    <span>{t('contact.send_btn')}</span>
                  </button>
                </form>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
