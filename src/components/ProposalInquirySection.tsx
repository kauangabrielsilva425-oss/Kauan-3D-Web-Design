import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, MessageCircle, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface ProposalInquirySectionProps {
  onSuccess?: () => void;
}

const SERVICE_OPTIONS = [
  { id: 'brand-strategy', pt: 'Estratégia de Marca', en: 'Brand Strategy', es: 'Estrategia de Marca' },
  { id: 'brand-identity', pt: 'Identidade de Marca', en: 'Brand Identity', es: 'Identidad de Marca' },
  { id: 'experience-design', pt: 'Design de Experiência', en: 'Experience Design', es: 'Diseño de Experiencia' },
  { id: 'visual-content', pt: 'Conteúdo Visual', en: 'Visual Content', es: 'Contenido Visual' },
  { id: 'web-dev', pt: 'Desenvolvimento Web', en: 'Web Development', es: 'Desarrollo Web' },
  { id: 'ecommerce', pt: 'E-commerce', en: 'E-commerce', es: 'E-commerce' },
  { id: 'web-mobile-apps', pt: 'Aplicativos Web & Mobile', en: 'Web & Mobile Apps', es: 'Aplicaciones Web & Mobile' },
  { id: 'interface-design', pt: 'Design de Interface', en: 'Interface Design', es: 'Diseño de Interfaz' },
];

export const ProposalInquirySection: React.FC<ProposalInquirySectionProps> = ({ onSuccess }) => {
  const { language } = useLanguage();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [projectDetails, setProjectDetails] = useState('');
  const [selectedServices, setSelectedServices] = useState<string[]>(['Desenvolvimento Web']);
  const [submitted, setSubmitted] = useState(false);

  const toggleService = (serviceName: string) => {
    setSelectedServices((prev) =>
      prev.includes(serviceName)
        ? prev.filter((s) => s !== serviceName)
        : [...prev, serviceName]
    );
  };

  const getLocalizedServiceName = (opt: (typeof SERVICE_OPTIONS)[0]) => {
    switch (language) {
      case 'EN':
        return opt.en;
      case 'ES':
        return opt.es;
      case 'PT':
      default:
        return opt.pt;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const servicesList = selectedServices.length > 0 ? selectedServices.join(', ') : 'Geral';
    const subject = encodeURIComponent(`[Solicitação de Orçamento] ${name} - ${servicesList}`);
    const body = encodeURIComponent(
      `Olá Kauan,\n\n` +
      `Gostaria de solicitar um orçamento para o meu projeto através do seu portfólio:\n\n` +
      `Nome: ${name}\n` +
      `E-mail: ${email}\n` +
      `Telefone / WhatsApp: ${phone || 'Não informado'}\n` +
      `Serviços de Interesse: ${servicesList}\n\n` +
      `Detalhes do Projeto:\n${projectDetails}\n\n` +
      `Enviado via formulário de orçamento`
    );

    // Trigger email client
    const mailtoUrl = `mailto:kauangabrielsilva425@gmail.com?subject=${subject}&body=${body}`;
    window.location.href = mailtoUrl;

    setSubmitted(true);
    onSuccess?.();
  };

  const handleWhatsAppDirect = () => {
    const servicesList = selectedServices.length > 0 ? selectedServices.join(', ') : 'Projetos Digitais';
    const text = encodeURIComponent(
      `Olá Kauan! Meu nome é ${name || 'um cliente'}.\n` +
      `Tenho interesse em: ${servicesList}.\n` +
      `Podemos conversar sobre um orçamento?`
    );
    window.open(`https://wa.me/5531996571669?text=${text}`, '_blank');
  };

  const handleReset = () => {
    setName('');
    setEmail('');
    setPhone('');
    setProjectDetails('');
    setSelectedServices(['Desenvolvimento Web']);
    setSubmitted(false);
  };

  return (
    <section
      id="contact"
      className="w-full bg-[#000000] py-16 sm:py-24 md:py-32 px-4 sm:px-6 md:px-10 lg:px-16 select-none relative z-10"
    >
      <div className="max-w-6xl mx-auto rounded-3xl bg-[#08080a] border border-white/[0.08] p-7 sm:p-10 md:p-14 lg:p-16 shadow-[0_30px_90px_rgba(0,0,0,0.95)] relative overflow-hidden">
        {/* Subtle ambient light gradient */}
        <div className="absolute top-0 right-0 w-full max-w-[500px] h-[500px] bg-white/[0.015] rounded-full blur-[140px] pointer-events-none [clip-path:inset(0)]" />

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 lg:gap-16 items-start relative z-10">
          {/* Left Column: Heading (Exact Photo 1 standard) */}
          <div className="md:col-span-5 flex flex-col justify-start">
            <h2 className="text-4xl sm:text-5xl md:text-5xl lg:text-6xl xl:text-7xl font-medium tracking-tight text-white leading-[1.08] mb-4">
              {language === 'EN' ? (
                <>Ready to<br />start?</>
              ) : language === 'ES' ? (
                <>¿Listo para<br />empezar?</>
              ) : (
                <>Pronto para<br />começar?</>
              )}
            </h2>

            <p className="text-zinc-500 text-xs sm:text-sm font-light leading-relaxed max-w-xs mt-2 hidden sm:block">
              {language === 'EN'
                ? 'High-end 3D, WebGL and digital experiences.'
                : language === 'ES'
                ? 'Experiencias digitales 3D, WebGL y alta ingeniería.'
                : 'Experiências digitais 3D, WebGL e alta tecnologia sob medida.'}
            </p>
          </div>

          {/* Right Column: Form (Exact Photo 1 standard) */}
          <div className="md:col-span-7">
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="submitted"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  className="rounded-2xl bg-black/60 border border-emerald-500/30 p-8 sm:p-10 flex flex-col items-center text-center"
                >
                  <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mb-5 text-emerald-400">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-medium text-white mb-2">
                    {language === 'EN'
                      ? 'Inquiry Received!'
                      : language === 'ES'
                      ? '¡Solicitud Recibida!'
                      : 'Solicitação Enviada!'}
                  </h3>
                  <p className="text-sm text-zinc-400 max-w-md mb-8 leading-relaxed">
                    {language === 'EN'
                      ? 'Your project details have been forwarded to Kauan. I will get back to you within 24 hours.'
                      : language === 'ES'
                      ? 'Los detalles de su proyecto han sido enviados a Kauan. Responderé en menos de 24 horas.'
                      : 'Seus dados foram encaminhados diretamente para o Kauan. Retornarei via e-mail ou WhatsApp em até 24 horas úteis.'}
                  </p>

                  <div className="flex flex-col sm:flex-row gap-3 w-full justify-center">
                    <button
                      type="button"
                      onClick={handleWhatsAppDirect}
                      className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs sm:text-sm transition-colors cursor-pointer"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>{language === 'EN' ? 'Chat on WhatsApp' : language === 'ES' ? 'Conversar en WhatsApp' : 'Conversar no WhatsApp'}</span>
                    </button>
                    <button
                      type="button"
                      onClick={handleReset}
                      className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 font-medium text-xs sm:text-sm border border-white/10 transition-colors cursor-pointer"
                    >
                      <span>{language === 'EN' ? 'Send another inquiry' : language === 'ES' ? 'Enviar otra solicitud' : 'Nova solicitação'}</span>
                    </button>
                  </div>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="flex flex-col"
                >
                  <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.2em] text-zinc-400 block mb-3.5">
                    {language === 'EN'
                      ? 'FILL OUT THE FORM TO REQUEST A QUOTE:'
                      : language === 'ES'
                      ? 'COMPLETE EL FORMULARIO PARA SOLICITAR UN PRESUPUESTO:'
                      : 'PREENCHA O FORMULÁRIO PARA SOLICITAR UM ORÇAMENTO:'}
                  </span>

                  {/* Inputs Row 1: Name and Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder={language === 'EN' ? 'Your Name *' : language === 'ES' ? 'Tu Nombre *' : 'Seu Nome *'}
                      className="w-full bg-[#121214] border border-white/[0.08] focus:border-white/35 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-500 focus:outline-none transition-colors"
                    />

                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={language === 'EN' ? 'E-mail *' : language === 'ES' ? 'E-mail *' : 'E-mail *'}
                      className="w-full bg-[#121214] border border-white/[0.08] focus:border-white/35 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-500 focus:outline-none transition-colors"
                    />
                  </div>

                  {/* Inputs Row 2: Phone */}
                  <div className="mb-3">
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder={language === 'EN' ? 'Phone / WhatsApp *' : language === 'ES' ? 'Teléfono / WhatsApp *' : 'Telefone *'}
                      className="w-full bg-[#121214] border border-white/[0.08] focus:border-white/35 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-500 focus:outline-none transition-colors"
                    />
                  </div>

                  {/* Inputs Row 3: Message / Project Details */}
                  <div className="mb-5">
                    <textarea
                      required
                      rows={3}
                      value={projectDetails}
                      onChange={(e) => setProjectDetails(e.target.value)}
                      placeholder={language === 'EN' ? 'Tell me about your project *' : language === 'ES' ? 'Cuénteme sobre su proyecto *' : 'Conte-me sobre o seu projeto *'}
                      className="w-full bg-[#121214] border border-white/[0.08] focus:border-white/35 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-500 focus:outline-none transition-colors resize-none leading-relaxed"
                    />
                  </div>

                  {/* Services of Interest Section */}
                  <div className="mb-7">
                    <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.2em] text-zinc-400 block mb-3.5">
                      {language === 'EN'
                        ? 'SERVICES OF YOUR INTEREST'
                        : language === 'ES'
                        ? 'SERVICIOS DE SU INTERÉS'
                        : 'SERVIÇOS DE SEU INTERESSE'}
                    </span>

                    {/* 2-Column Grid of 8 options with circular indicators */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6">
                      {SERVICE_OPTIONS.map((opt) => {
                        const label = getLocalizedServiceName(opt);
                        const isSelected = selectedServices.includes(label);

                        return (
                          <div
                            key={opt.id}
                            onClick={() => toggleService(label)}
                            className="flex items-center gap-3 cursor-pointer group select-none py-0.5"
                          >
                            {/* Circular Radio/Checkbox Button */}
                            <div
                              className={`w-4 h-4 rounded-full border transition-all duration-200 flex items-center justify-center shrink-0 ${
                                isSelected
                                  ? 'border-white bg-white'
                                  : 'border-zinc-600 bg-transparent group-hover:border-zinc-400'
                              }`}
                            >
                              {isSelected && (
                                <div className="w-1.5 h-1.5 rounded-full bg-black" />
                              )}
                            </div>

                            <span
                              className={`text-xs sm:text-[13px] transition-colors ${
                                isSelected
                                  ? 'text-white font-medium'
                                  : 'text-zinc-400 group-hover:text-zinc-200 font-light'
                              }`}
                            >
                              {label}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="flex items-center gap-4">
                    <button
                      type="submit"
                      className="inline-flex items-center justify-center gap-2.5 px-8 sm:px-10 py-3.5 sm:py-4 rounded-xl sm:rounded-full bg-white text-black font-semibold text-xs sm:text-[13px] tracking-wider uppercase hover:bg-zinc-200 transition-all duration-300 cursor-pointer shadow-lg active:scale-[0.98]"
                    >
                      <span>
                        {language === 'EN'
                          ? 'SUBMIT INQUIRY'
                          : language === 'ES'
                          ? 'ENVIAR SOLICITUD'
                          : 'ENVIAR SOLICITAÇÃO'}
                      </span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProposalInquirySection;
