/**
 * Vercel Serverless Function - Secure Backend Contact Endpoint
 * Keeps sensitive API keys (e.g. RESEND_API_KEY, SMTP credentials) 100% on the server side,
 * preventing any leakage to the browser bundle or client DevTools.
 */

export default async function handler(req: any, res: any) {
  // Only accept POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { name, email, phone, service, message } = req.body || {};

    // Basic server-side validation
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Campos obrigatórios ausentes.' });
    }

    // Verify email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'E-mail inválido.' });
    }

    // Securely retrieve secret API Key from server environment variables
    const RESEND_API_KEY = process.env.RESEND_API_KEY;

    if (RESEND_API_KEY) {
      // Send via Resend API securely from server
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from: 'Kauan Portfolio <contato@kauan.design>',
          to: ['kauangabrielsilva425@gmail.com'],
          reply_to: email,
          subject: `[Novo Lead Portfólio] ${service || 'Geral'} - ${name}`,
          text: `Nome: ${name}\nE-mail: ${email}\nTelefone: ${phone || 'Não informado'}\nServiço: ${service || 'Geral'}\n\nMensagem:\n${message}`,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Resend error:', errorData);
        return res.status(500).json({ error: 'Falha ao processar envio.' });
      }

      return res.status(200).json({ success: true, message: 'Mensagem enviada com sucesso!' });
    }

    // Fallback if no backend email provider key is configured yet
    return res.status(200).json({
      success: true,
      message: 'Dados recebidos no servidor com sucesso.',
    });
  } catch (error) {
    console.error('Server error:', error);
    return res.status(500).json({ error: 'Erro interno do servidor.' });
  }
}
