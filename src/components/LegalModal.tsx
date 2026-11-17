import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShieldCheck, FileText } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export type LegalTab = 'privacy' | 'terms';

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: LegalTab;
}

export const LegalModal: React.FC<LegalModalProps> = ({
  isOpen,
  onClose,
  initialTab = 'privacy',
}) => {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState<LegalTab>(initialTab);

  React.useEffect(() => {
    if (isOpen) {
      setActiveTab(initialTab);
    }
  }, [isOpen, initialTab]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#000000]/80 backdrop-blur-xl"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 15 }}
            transition={{ type: 'spring', damping: 28, stiffness: 320 }}
            className="relative w-full max-w-3xl max-h-[85vh] apple-glass-card border border-white/[0.18] rounded-2xl shadow-[0_25px_70px_rgba(0,0,0,0.95),0_0_35px_rgba(56,189,248,0.12)] flex flex-col overflow-hidden z-10"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 sm:px-8 py-5 border-b border-white/[0.08] bg-[#050507]">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setActiveTab('privacy')}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-medium uppercase tracking-[0.12em] transition-all cursor-pointer ${
                    activeTab === 'privacy'
                      ? 'bg-white/[0.14] text-white border border-white/[0.18] shadow-sm'
                      : 'text-zinc-400 hover:text-white hover:bg-white/[0.04]'
                  }`}
                >
                  <ShieldCheck className="w-4 h-4 text-[#38BDF8]" />
                  <span>
                    {language === 'EN'
                      ? 'Privacy Policy'
                      : language === 'ES'
                      ? 'Política de Privacidad'
                      : 'Política de Privacidade'}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('terms')}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-medium uppercase tracking-[0.12em] transition-all cursor-pointer ${
                    activeTab === 'terms'
                      ? 'bg-white/[0.14] text-white border border-white/[0.18] shadow-sm'
                      : 'text-zinc-400 hover:text-white hover:bg-white/[0.04]'
                  }`}
                >
                  <FileText className="w-4 h-4 text-[#38BDF8]" />
                  <span>
                    {language === 'EN'
                      ? 'Terms & Conditions'
                      : language === 'ES'
                      ? 'Términos y Condiciones'
                      : 'Termos e Condições'}
                  </span>
                </button>
              </div>

              {/* Close Button */}
              <button
                type="button"
                onClick={onClose}
                className="w-9 h-9 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center hover:bg-white/[0.10] hover:text-[#38BDF8] text-zinc-400 transition-colors cursor-pointer"
                aria-label={language === 'EN' ? 'Close' : language === 'ES' ? 'Cerrar' : 'Fechar'}
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Scrollable Legal Content */}
            <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-sm text-zinc-300 font-light leading-relaxed select-text">
              {activeTab === 'privacy' ? (
                <>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-semibold text-white tracking-tight mb-2">
                      {language === 'EN'
                        ? 'Privacy Policy'
                        : language === 'ES'
                        ? 'Política de Privacidad'
                        : 'Política de Privacidade'}
                    </h3>
                    <p className="text-xs text-zinc-500 font-mono">
                      {language === 'EN'
                        ? 'Last updated: November 2026 | Global Privacy Standard & LGPD Compliant'
                        : language === 'ES'
                        ? 'Última actualización: Noviembre de 2026 | Estándar de Privacidad Global y LGPD'
                        : 'Última atualização: Novembro de 2026 | Conformidade com a Lei Geral de Proteção de Dados (LGPD)'}
                    </p>
                  </div>

                  <section className="space-y-2">
                    <h4 className="text-base font-medium text-white">
                      {language === 'EN'
                        ? '1. Overview and Commitment'
                        : language === 'ES'
                        ? '1. Visión General y Compromiso'
                        : '1. Visão Geral e Compromisso'}
                    </h4>
                    <p>
                      {language === 'EN'
                        ? 'Kauan Gabriel values transparency, privacy, and user security. This Privacy Policy outlines how information is collected, used, and safeguarded when visiting this website or submitting project inquiries.'
                        : language === 'ES'
                        ? 'Kauan Gabriel valora la transparencia, privacidad y seguridad de sus usuarios. Esta Política de Privacidad describe cómo se recopila, utiliza y protege la información al navegar por este sitio web o solicitar propuestas de proyectos.'
                        : 'Kauan Gabriel valoriza a transparência e a segurança de seus clientes e visitantes. Esta Política de Privacidade descreve como coletamos, utilizamos, armazenamos e protegemos as informações fornecidas por você ao navegar em nosso site ou solicitar orçamentos e serviços.'}
                    </p>
                  </section>

                  <section className="space-y-2">
                    <h4 className="text-base font-medium text-white">
                      {language === 'EN'
                        ? '2. Information Collected'
                        : language === 'ES'
                        ? '2. Información Recopilada'
                        : '2. Dados Pessoais Coletados'}
                    </h4>
                    <p>
                      {language === 'EN'
                        ? 'We only collect essential information required to respond to inquiries and conduct client project discussions:'
                        : language === 'ES'
                        ? 'Únicamente recopilamos la información esencial necesaria para responder consultas y llevar a cabo proyectos profesionales:'
                        : 'Coletamos exclusivamente as informações necessárias para estabelecer contato e viabilizar projetos profissionais:'}
                    </p>
                    <ul className="list-disc pl-5 space-y-1 text-zinc-400">
                      <li>
                        {language === 'EN'
                          ? 'Full name and business title;'
                          : language === 'ES'
                          ? 'Nombre completo y cargo profesional;'
                          : 'Nome completo;'}
                      </li>
                      <li>
                        {language === 'EN'
                          ? 'Email address and optional phone / WhatsApp;'
                          : language === 'ES'
                          ? 'Correo electrónico y WhatsApp o teléfono opcional;'
                          : 'Endereço de e-mail e telefone opcional;'}
                      </li>
                      <li>
                        {language === 'EN'
                          ? 'Project scope details and message specifications;'
                          : language === 'ES'
                          ? 'Detalles del proyecto y especificaciones del mensaje;'
                          : 'Serviço de interesse e detalhes fornecidos voluntariamente na mensagem;'}
                      </li>
                      <li>
                        {language === 'EN'
                          ? 'Standard anonymous performance and security telemetry.'
                          : language === 'ES'
                          ? 'Telemetría anónima estrictamente técnica para rendimiento y seguridad.'
                          : 'Dados técnicos anônimos de navegação estritamente necessários para desempenho e segurança.'}
                      </li>
                    </ul>
                  </section>

                  <section className="space-y-2">
                    <h4 className="text-base font-medium text-white">
                      {language === 'EN'
                        ? '3. Purpose of Processing'
                        : language === 'ES'
                        ? '3. Finalidad del Tratamiento'
                        : '3. Finalidade do Tratamento'}
                    </h4>
                    <p>
                      {language === 'EN'
                        ? 'Submitted data is strictly used to:'
                        : language === 'ES'
                        ? 'Los datos proporcionados se utilizan exclusivamente para:'
                        : 'Os dados fornecidos têm finalidade exclusiva de:'}
                    </p>
                    <ul className="list-disc pl-5 space-y-1 text-zinc-400">
                      <li>
                        {language === 'EN'
                          ? 'Provide proposals, technical timelines, and commercial estimates;'
                          : language === 'ES'
                          ? 'Responder consultas, elaborar presupuestos y propuestas comerciales;'
                          : 'Responder a dúvidas, pedidos de orçamento e propostas comerciais;'}
                      </li>
                      <li>
                        {language === 'EN'
                          ? 'Establish contracts for design, web development, and 3D engineering services;'
                          : language === 'ES'
                          ? 'Formalizar contratos de prestación de servicios de diseño, desarrollo web e ingeniería 3D;'
                          : 'Firmar contratos de prestação de serviços de design, desenvolvimento web e produção 3D;'}
                      </li>
                      <li>
                        {language === 'EN'
                          ? 'Ensure technical stability and protect platform infrastructure.'
                          : language === 'ES'
                          ? 'Garantizar la estabilidad técnica y seguridad de la plataforma.'
                          : 'Garantir a integridade, estabilidade e segurança técnica da plataforma.'}
                      </li>
                    </ul>
                  </section>

                  <section className="space-y-2">
                    <h4 className="text-base font-medium text-white">
                      {language === 'EN'
                        ? '4. Data Protection and Zero Selling'
                        : language === 'ES'
                        ? '4. Protección de Datos y Cero Venta'
                        : '4. Não Compartilhamento de Dados'}
                    </h4>
                    <p>
                      {language === 'EN'
                        ? 'We never sell, rent, or trade your personal information to third parties. Data is handled with strict confidentiality and industry-standard security.'
                        : language === 'ES'
                        ? 'Nunca vendemos, alquilamos ni comercializamos información personal con terceros. Los datos se gestionan con estricta confidencialidad y estándares modernos de seguridad.'
                        : 'Não vendemos, alugamos ou comercializamos informações pessoais de usuários com quaisquer terceiros. O compartilhamento ocorre única e exclusivamente mediante ordem judicial ou determinação legal expressa.'}
                    </p>
                  </section>
                </>
              ) : (
                <>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-semibold text-white tracking-tight mb-2">
                      {language === 'EN'
                        ? 'Terms & Conditions'
                        : language === 'ES'
                        ? 'Términos y Condiciones'
                        : 'Termos e Condições de Uso'}
                    </h3>
                    <p className="text-xs text-zinc-500 font-mono">
                      {language === 'EN'
                        ? 'Last updated: November 2026 | General Service Terms'
                        : language === 'ES'
                        ? 'Última actualización: Noviembre de 2026 | Términos Generales'
                        : 'Última atualização: Novembro de 2026 | Termos Gerais de Navegação e Contratação'}
                    </p>
                  </div>

                  <section className="space-y-2">
                    <h4 className="text-base font-medium text-white">
                      {language === 'EN'
                        ? '1. Acceptance of Terms'
                        : language === 'ES'
                        ? '1. Aceptación de los Términos'
                        : '1. Aceitação dos Termos'}
                    </h4>
                    <p>
                      {language === 'EN'
                        ? 'By accessing this portfolio website, you agree to comply with and be bound by these Terms and Conditions. If you do not agree, please do not use the website.'
                        : language === 'ES'
                        ? 'Al acceder a este sitio web y utilizar sus canales, aceptas expresamente cumplir con estos Términos y Condiciones. Si no estás de acuerdo, te recomendamos abstenerte de utilizar la plataforma.'
                        : 'Ao acessar este website e utilizar nossos serviços, você concorda expressamente com os presentes Termos e Condições de Uso. Caso não concorde com algum dos termos, recomendamos a não utilização da plataforma.'}
                    </p>
                  </section>

                  <section className="space-y-2">
                    <h4 className="text-base font-medium text-white">
                      {language === 'EN'
                        ? '2. Intellectual Property'
                        : language === 'ES'
                        ? '2. Propiedad Intelectual'
                        : '2. Propriedade Intelectual'}
                    </h4>
                    <p>
                      {language === 'EN'
                        ? 'All content displayed on this website—including UI designs, 3D models, custom code, animations, and graphics—is the intellectual property of Kauan Gabriel or licensed for portfolio display. Unauthorized copying, reproduction, or redistribution is strictly prohibited.'
                        : language === 'ES'
                        ? 'Todo el contenido presentado en este sitio web (incluidos diseños UI, modelos 3D, código fuente, animaciones y gráficos) es propiedad intelectual de Kauan Gabriel o está formalmente licenciado. Se prohíbe cualquier reproducción o distribución no autorizada.'
                        : 'Todos os elementos exibidos neste site, incluindo códigos-fonte, animações, layouts, logotipos, imagens conceituais e textos, são de titularidade de Kauan Gabriel ou licenciados formalmente para uso. É vedada a reprodução, cópia, alteração ou distribuição não autorizada.'}
                    </p>
                  </section>

                  <section className="space-y-2">
                    <h4 className="text-base font-medium text-white">
                      {language === 'EN'
                        ? '3. Project Contracts & Engagement'
                        : language === 'ES'
                        ? '3. Contratación de Proyectos'
                        : '3. Prazos e Contratação de Projetos'}
                    </h4>
                    <p>
                      {language === 'EN'
                        ? 'Commercial quotes, delivery milestones, scope specifications, and payment terms are customized for each client and executed through specific professional service agreements.'
                        : language === 'ES'
                        ? 'Las propuestas comerciales, plazos de entrega, valores y especificaciones técnicas se establecen de manera personalizada y se formalizan mediante un contrato de prestación de servicios para cada cliente.'
                        : 'Propostas comerciais, cronogramas de entrega, valores e escopos técnicos são estipulados de forma personalizada e formalizados em contrato de prestação de serviços específico para cada cliente.'}
                    </p>
                  </section>
                </>
              )}
            </div>

            {/* Modal Footer */}
            <div className="px-6 sm:px-8 py-4 border-t border-white/[0.08] bg-[#050507] flex items-center justify-between">
              <span className="text-xs text-zinc-500 font-mono">
                Kauan Gabriel // 2026
              </span>
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2 rounded-xl bg-white text-[#000000] font-medium text-xs sm:text-sm hover:bg-zinc-200 transition-colors cursor-pointer"
              >
                {language === 'EN' ? 'Got it' : language === 'ES' ? 'Entendido' : 'Entendido'}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default LegalModal;
