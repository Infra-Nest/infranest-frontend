import type { IncomingMessage, ServerResponse } from 'node:http'
import nodemailer from 'nodemailer'

type Language = 'es' | 'en'

type ContactBody = {
  name?: unknown
  email?: unknown
  subject?: unknown
  message?: unknown
  field_x9k2?: unknown
  language?: unknown
}

type ContactRequest = IncomingMessage & { body?: unknown }

interface ContactResponse extends ServerResponse {
  status(code: number): this
  json(body: unknown): this
}

type ContactLabels = {
  eyebrow: string
  title: string
  name: string
  email: string
  subject: string
  message: string
  sentAt: string
  footer: string
  subjectPrefix: string
}

const labels: Record<Language, ContactLabels> = {
  es: {
    eyebrow: 'Contacto',
    title: 'Nuevo mensaje de contacto',
    name: 'Nombre',
    email: 'Correo electrónico',
    subject: 'Asunto',
    message: 'Mensaje',
    sentAt: 'Recibido',
    footer: 'Este mensaje se ha enviado desde el formulario de contacto de Infranest.',
    subjectPrefix: 'Nuevo contacto en Infranest',
  },
  en: {
    eyebrow: 'Contact',
    title: 'New contact message',
    name: 'Name',
    email: 'Email',
    subject: 'Subject',
    message: 'Message',
    sentAt: 'Received',
    footer: 'This message was sent through the Infranest contact form.',
    subjectPrefix: 'New contact at Infranest',
  },
}

const rateLimitWindowMs = 15 * 60 * 1000
const rateLimitMax = 5
// Best-effort only: Vercel may run this function in multiple instances that do not share memory.
const rateLimitByIp = new Map<string, { count: number; resetAt: number }>()

function respond(response: ContactResponse, status: number, payload: Record<string, boolean | string>) {
  response.setHeader('Cache-Control', 'no-store')
  response.setHeader('X-Content-Type-Options', 'nosniff')
  response.status(status).json(payload)
}

function isRecord(value: unknown): value is ContactBody {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function getSingleLine(value: unknown, maxLength: number): string | null {
  if (typeof value !== 'string') return null
  const normalized = value.trim()
  if (!normalized || normalized.length > maxLength || containsUnsafeControlCharacters(normalized)) return null
  return normalized
}

function getEmail(value: unknown): string | null {
  const email = getSingleLine(value, 254)
  if (!email || !/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/u.test(email)) return null
  return email
}

function getMessage(value: unknown): string | null {
  if (typeof value !== 'string') return null
  const message = value.trim()
  if (message.length < 10 || message.length > 5000 || containsUnsafeControlCharacters(message, true)) return null
  return message
}

function containsUnsafeControlCharacters(value: string, allowLineBreaks = false): boolean {
  for (const character of value) {
    const code = character.charCodeAt(0)
    if (code < 32 || code === 127) {
      if (allowLineBreaks && (code === 9 || code === 10 || code === 13)) continue
      return true
    }
  }
  return false
}

function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/gu, character => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  })[character] ?? character)
}

function getClientIp(request: ContactRequest): string | null {
  const forwarded = request.headers['x-vercel-forwarded-for']
    ?? request.headers['x-real-ip']
    ?? request.headers['x-forwarded-for']
  const candidate = typeof forwarded === 'string' ? forwarded.split(',')[0]?.trim() : undefined
  return candidate || request.socket.remoteAddress || null
}

function isRateLimited(request: ContactRequest, now = Date.now()): boolean {
  const ip = getClientIp(request)
  if (!ip) return false

  const current = rateLimitByIp.get(ip)
  if (current && current.resetAt > now) {
    if (current.count >= rateLimitMax) return true
    current.count += 1
  } else {
    rateLimitByIp.set(ip, { count: 1, resetAt: now + rateLimitWindowMs })
  }

  if (rateLimitByIp.size > 500) {
    for (const [key, entry] of rateLimitByIp) {
      if (entry.resetAt <= now) rateLimitByIp.delete(key)
    }
  }

  return false
}

function originMatchesHost(request: ContactRequest): boolean {
  const origin = request.headers.origin
  if (!origin) return true
  const host = request.headers.host
  if (!host) return false

  try {
    return new URL(origin).host.toLowerCase() === host.toLowerCase()
  } catch {
    return false
  }
}

function getDate(language: Language): string {
  return new Intl.DateTimeFormat(language === 'es' ? 'es-ES' : 'en-GB', {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone: 'Europe/Madrid',
  }).format(new Date())
}

function createEmailHtml(input: { name: string; email: string; subject: string; message: string }, language: Language): string {
  const copy = labels[language]
  const safeMessage = escapeHtml(input.message).replace(/\r\n?|\n/gu, '<br>')
  const rows = [
    [copy.name, escapeHtml(input.name)],
    [copy.email, escapeHtml(input.email)],
    [copy.subject, escapeHtml(input.subject)],
  ]
    .map(([label, value]) => `<tr><td style="padding:11px 0;color:#64727c;font-size:13px;border-bottom:1px solid #e6eaed;width:145px;vertical-align:top">${label}</td><td style="padding:11px 0;color:#17212b;font-size:14px;border-bottom:1px solid #e6eaed;overflow-wrap:anywhere">${value}</td></tr>`)
    .join('')

  return `<!doctype html>
<html lang="${language}">
  <head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
  <body style="margin:0;padding:32px 12px;background:#f5f7f8;color:#17212b;font-family:Manrope,Arial,sans-serif">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:640px;margin:0 auto;background:#ffffff;border:1px solid #d8dee3;border-radius:8px;overflow:hidden">
      <tr><td style="padding:24px 30px;background:#17212b;border-bottom:5px solid #0fa9a0">
        <p style="margin:0 0 9px;color:#f2b544;font-size:11px;font-weight:700;letter-spacing:1.8px;text-transform:uppercase">Infranest · ${copy.eyebrow}</p>
        <h1 style="margin:0;color:#ffffff;font-family:Sora,Arial,sans-serif;font-size:24px;line-height:1.3">${copy.title}</h1>
      </td></tr>
      <tr><td style="padding:24px 30px 8px">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0">${rows}</table>
      </td></tr>
      <tr><td style="padding:16px 30px 26px">
        <p style="margin:0 0 10px;color:#64727c;font-size:13px;font-weight:700">${copy.message}</p>
        <div style="padding:16px;border-left:4px solid #0fa9a0;background:#f5f7f8;color:#17212b;font-size:14px;line-height:1.7;overflow-wrap:anywhere">${safeMessage}</div>
        <p style="margin:20px 0 0;color:#64727c;font-size:12px">${copy.sentAt}: ${getDate(language)} · infranest.es</p>
      </td></tr>
      <tr><td style="padding:16px 30px;background:#17212b;color:#d8dee3;font-size:12px;line-height:1.6">${copy.footer}</td></tr>
    </table>
  </body>
</html>`
}

function createEmailText(input: { name: string; email: string; subject: string; message: string }, language: Language): string {
  const copy = labels[language]
  return [
    copy.title,
    '',
    `${copy.name}: ${input.name}`,
    `${copy.email}: ${input.email}`,
    `${copy.subject}: ${input.subject}`,
    '',
    `${copy.message}:`,
    input.message,
    '',
    `${copy.sentAt}: ${getDate(language)} · infranest.es`,
  ].join('\n')
}

export default async function handler(request: ContactRequest, response: ContactResponse): Promise<void> {
  response.setHeader('Cache-Control', 'no-store')
  response.setHeader('X-Content-Type-Options', 'nosniff')

  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST')
    respond(response, 405, { ok: false, error: 'method_not_allowed' })
    return
  }

  if (!originMatchesHost(request)) {
    respond(response, 403, { ok: false, error: 'origin_not_allowed' })
    return
  }

  if (!request.headers['content-type']?.toLowerCase().startsWith('application/json')) {
    respond(response, 415, { ok: false, error: 'unsupported_media_type' })
    return
  }

  const contentLength = Number(request.headers['content-length'] ?? 0)
  if (contentLength > 20_000) {
    respond(response, 413, { ok: false, error: 'payload_too_large' })
    return
  }

  if (!isRecord(request.body)) {
    respond(response, 400, { ok: false, error: 'invalid_request' })
    return
  }

  if (typeof request.body.field_x9k2 === 'string' && request.body.field_x9k2.trim()) {
    respond(response, 200, { ok: true })
    return
  }

  if (isRateLimited(request)) {
    respond(response, 429, { ok: false, error: 'rate_limited' })
    return
  }

  const name = getSingleLine(request.body.name, 120)
  const email = getEmail(request.body.email)
  const subject = getSingleLine(request.body.subject, 160)
  const message = getMessage(request.body.message)
  const language: Language = request.body.language === 'en' ? 'en' : 'es'

  if (!name || !email || !subject || !message) {
    respond(response, 400, { ok: false, error: 'invalid_request' })
    return
  }

  const host = process.env.ZOHO_SMTP_HOST?.trim()
  const rawPort = process.env.ZOHO_SMTP_PORT?.trim()
  const user = process.env.ZOHO_SMTP_USER?.trim()
  const password = process.env.ZOHO_SMTP_PASS
  const recipient = process.env.CONTACT_TO_EMAIL?.trim() || 'info@infranest.es'

  if (!host || !user || !password || !rawPort || (rawPort !== '465' && rawPort !== '587') || !getEmail(recipient)) {
    respond(response, 503, { ok: false, error: 'mail_service_unavailable' })
    return
  }

  const port = rawPort === '465' ? 465 : 587
  const copy = labels[language]
  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    requireTLS: port === 587,
    auth: { user, pass: password },
    tls: { minVersion: 'TLSv1.2' },
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 20_000,
  })

  try {
    await transporter.sendMail({
      from: { name: 'Infranest', address: user },
      to: recipient,
      replyTo: { name, address: email },
      subject: `${copy.subjectPrefix}: ${subject}`,
      text: createEmailText({ name, email, subject, message }, language),
      html: createEmailHtml({ name, email, subject, message }, language),
    })
    respond(response, 200, { ok: true })
  } catch {
    respond(response, 502, { ok: false, error: 'mail_delivery_failed' })
  } finally {
    transporter.close()
  }
}
