import { cloneElement, isValidElement, useEffect, useRef, useState } from 'react'
import type { FormEvent, ReactNode } from 'react'
import { recordMissingEnglishTranslation } from './translationAudit'

type Language = 'es' | 'en'

const navigation = [
  { href: '#plataforma', es: 'Nuestra idea', en: 'Our approach' },
  { href: '#nosotros', es: 'Quiénes somos', en: 'About us' },
  { href: '#productos', es: 'Odimetry', en: 'Odimetry' },
  { href: '#servicios', es: 'Cómo trabajamos', en: 'How we work' },
  { href: '#contacto', es: 'Hablemos', en: 'Contact' },
]
const questions = [
  ['¿Para quién son los productos de Infranest?', 'Para pymes y profesionales autónomos que necesitan resolver una tarea tecnológica concreta, sin asumir un proyecto desproporcionado ni disponer de un equipo técnico amplio.'],
  ['¿Desarrolláis productos propios o prestáis servicios?', 'Hacemos ambas cosas. Desarrollamos productos propios y ofrecemos servicios puntuales de integración, configuración y puesta en marcha cuando ayudan a incorporarlos en el entorno del cliente.'],
  ['¿Podéis ayudarnos con la puesta en marcha?', 'Sí. Ofrecemos integración, configuración y acompañamiento para facilitar la adopción de nuestros productos. Primero hablamos del contexto y acordamos qué trabajo tiene sentido y cuál será su alcance.'],
  ['¿Cómo decidís qué mejorar?', 'Escuchamos cada propuesta y evaluamos su utilidad, si puede servir a más usuarios y cómo encaja en nuestra dirección. Explicamos qué podemos priorizar y qué debe esperar.'],
]

const englishCopy: Record<string, string> = {
  'Saltar al contenido': 'Skip to content',
  'Productos tecnológicos para el día a día de tu empresa.': 'Technology products for your business, built for everyday work.',
  'Creamos herramientas claras para pymes y autónomos. Y te acompañamos para que encajen en tu forma de trabajar.': 'We build straightforward tools for small businesses and self-employed professionals, and help them fit the way you work.',
  'Conoce nuestro primer producto': 'Meet our first product',
  'Así entendemos la tecnología': 'How we think about technology',
  'De un problema concreto.': 'From a real problem.',
  'A una herramienta que encaja.': 'To a tool that fits.',
  'Productos propios. Comunicación directa.': 'Our own products. Direct communication.',
  'Empieza por Odimetry ': 'Start with Odimetry ',
  'La idea que nos mueve': 'What drives us',
  'La tecnología tiene que encajar contigo.': 'Technology should work the way you do.',
  'Una tarea concreta merece una solución clara. Con el alcance adecuado y sin añadir complejidad innecesaria.': 'A specific task deserves a clear solution, with the right scope and no unnecessary complexity.',
  'En Infranest desarrollamos productos propios y escuchamos a quienes los utilizan. La integración, la configuración y la puesta en marcha ayudan a llevar cada producto al contexto real de tu negocio.': 'At Infranest, we build our own products and listen to the people who use them. Integration, configuration and setup help each product fit the reality of your business.',
  'Pensado para': 'Designed for',
  'Pymes y profesionales autónomos': 'Small businesses and self-employed professionals',
  'Quiénes somos': 'Who we are',
  'Ingeniería de software con visión de negocio.': 'Software engineering with a business perspective.',
  'Infranest nace de la iniciativa de tres ingenieros de software con una ambición compartida: desarrollar productos tecnológicos propios que resuelvan necesidades reales de empresas y profesionales.': 'Infranest was founded by three software engineers who share an ambition: to build our own technology products that solve real needs for businesses and professionals.',
  'Nuestra experiencia en startups nos ha enseñado a analizar problemas, trabajar de cerca con clientes y responder a necesidades que evolucionan. Esa trayectoria ha reforzado nuestra capacidad para traducir demandas de negocio en decisiones técnicas, definir prioridades y ajustar el alcance de cada solución.': 'Our experience at startups has taught us to analyse problems, work closely with clients and respond to changing needs. It has strengthened our ability to turn business demands into technical decisions, set priorities and define the right scope for each solution.',
  'Combinamos esa perspectiva con conocimientos de desarrollo de software y diseño de experiencias digitales para abordar nuestros productos de principio a fin. Como socios fundadores, dirigimos Infranest y participamos directamente en su construcción, cuidando tanto la base técnica como la utilidad y la experiencia de quienes los utilizan.': 'We bring that perspective together with software development and digital experience design to take our products from concept to delivery. As co-founders, we lead Infranest and take an active role in building its products, caring for both their technical foundations and the value and experience they deliver.',
  'Nuestro primer producto': 'Our first product',
  'Conoce qué expone tu negocio en Internet.': 'See what your business exposes online.',
  'Una evaluación externa de ciberseguridad sobre dominios y activos autorizados, con resultados comprensibles y próximos pasos orientativos.': 'An external cybersecurity assessment of authorised domains and assets, with clear results and practical next steps.',
  'Conocer Odimetry ': 'Explore Odimetry ',
  'En desarrollo y validación de mercado.': 'In development and market validation.',
  'Del análisis a la decisión': 'From assessment to decision',
  'Qué hay expuesto': 'What is exposed',
  'Servicios visibles desde Internet en el alcance autorizado.': 'Internet-facing services within the authorised scope.',
  'Qué necesita atención': 'What needs attention',
  'Vulnerabilidades conocidas y configuraciones inseguras identificadas.': 'Known vulnerabilities and identified insecure configurations.',
  'Por dónde empezar': 'Where to start',
  'Un informe claro y priorizado para orientar las siguientes acciones.': 'A clear, prioritised report to guide the next steps.',
  'Una evaluación del momento y del alcance analizado. Sin promesas de seguridad total.': 'A point-in-time assessment of the agreed scope. No promises of complete security.',
  'Del producto al uso real': 'From product to everyday use',
  'Construimos el producto.': 'We build the product.',
  'Acompañamos su adopción.': 'We support its adoption.',
  'La puesta en marcha también cuenta. Acordamos contigo qué hace falta para empezar y mantenemos una conversación abierta para mejorar.': 'Getting started matters too. We agree what you need to begin and stay in touch to keep improving.',
  'Entender tu contexto': 'Understand your context',
  'Escuchamos qué necesitas resolver y vemos si el producto encaja.': 'We listen to what you need to solve and see whether the product fits.',
  'Acordar lo necesario': 'Agree on what is needed',
  'Definimos la integración, la configuración y el alcance de la puesta en marcha.': 'We define the integration, configuration and scope of the setup.',
  'Aprender contigo': 'Learn with you',
  'Recogemos tu experiencia y explicamos qué mejoras priorizamos y por qué.': 'We learn from your experience and explain which improvements we prioritise and why.',
  'Nuestra forma de hacer': 'How we work',
  'Hablar claro.': 'Speak plainly.',
  'Escuchar de cerca.': 'Listen closely.',
  'Sin dar por hecho lo que necesitas. Sin prometer lo que todavía no existe. Con flexibilidad para adaptarnos y criterio para decidir qué aporta valor al producto.': 'We do not assume what you need or promise what does not exist yet. We adapt where it makes sense and use our judgement to decide what adds value to the product.',
  'Antes de hablar': 'Before we talk',
  'Las cosas claras, desde el principio.': 'Clear answers, from the start.',
  '¿Para quién son los productos de Infranest?': 'Who are Infranest products for?',
  'Para pymes y profesionales autónomos que necesitan resolver una tarea tecnológica concreta, sin asumir un proyecto desproporcionado ni disponer de un equipo técnico amplio.': 'For small businesses and self-employed professionals who need to solve a specific technology task without taking on an oversized project or needing a large technical team.',
  '¿Desarrolláis productos propios o prestáis servicios?': 'Do you build your own products or provide services?',
  'Hacemos ambas cosas. Desarrollamos productos propios y ofrecemos servicios puntuales de integración, configuración y puesta en marcha cuando ayudan a incorporarlos en el entorno del cliente.': 'Both. We build our own products and provide focused integration, configuration and setup services when they help customers adopt them.',
  '¿Podéis ayudarnos con la puesta en marcha?': 'Can you help us get set up?',
  'Sí. Ofrecemos integración, configuración y acompañamiento para facilitar la adopción de nuestros productos. Primero hablamos del contexto y acordamos qué trabajo tiene sentido y cuál será su alcance.': 'Yes. We provide integration, configuration and guidance to help with adoption. First, we discuss your context and agree on useful work and its scope.',
  '¿Cómo decidís qué mejorar?': 'How do you decide what to improve?',
  'Escuchamos cada propuesta y evaluamos su utilidad, si puede servir a más usuarios y cómo encaja en nuestra dirección. Explicamos qué podemos priorizar y qué debe esperar.': 'We listen to each suggestion and assess its usefulness, whether it could help more users and how it fits our direction. We explain what we can prioritise and what will need to wait.',
  'Hablemos de tu contexto': 'Let us talk about your needs',
  '¿Qué te gustaría': 'What would you like',
  'hacer más sencillo?': 'to make easier?',
  'Cuéntanos qué necesita tu negocio o qué te gustaría saber sobre Odimetry. Te explicaremos dónde podemos ayudarte.': 'Tell us what your business needs or what you would like to know about Odimetry. We will explain how we may be able to help.',
  'Si lo prefieres, también puedes escribirnos directamente a ': 'If you prefer, you can also email us directly at ',
  'info@infranest.es': 'info@infranest.es',
  'Nombre': 'Name',
  'Correo electrónico': 'Email',
  'Asunto': 'Subject',
  'Mensaje': 'Message',
  'Enviar mensaje': 'Send message',
  'Enviando…': 'Sending…',
  'Estamos enviando tu mensaje…': 'We are sending your message…',
  'Gracias. Hemos recibido tu mensaje.': 'Thanks. Your message has been sent.',
  'No hemos podido enviar tu mensaje. Inténtalo de nuevo o escríbenos a ': 'We could not send your message. Please try again or email us at ',
  'Has alcanzado el límite de envíos. Espera 15 minutos antes de volver a intentarlo o escríbenos a ': 'You have reached the sending limit. Wait 15 minutes before trying again or email us at ',
  'Usaremos estos datos para responder a tu consulta.': 'We will use these details to reply to your enquiry.',
  'Productos claros para problemas complejos.': 'Clear products for complex problems.',
  'Preguntas frecuentes': 'Frequently asked questions',
  'Volver arriba ↑': 'Back to top ↑',
}
const alreadyEnglishCopy = new Set([
  ...Object.values(englishCopy), ...navigation.map(({ en }) => en), 'Menu', 'Close', 'Language', 'Spanish', 'English',
  'Main navigation', 'Open navigation menu', 'Close navigation menu', 'Infranest, home', 'Infranest, back to home', 'Switch to light theme', 'Switch to dark theme',
])

function ContactForm({ language }: { language: Language }) {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const t = (copy: string) => {
    if (language === 'es') return copy
    const translation = englishCopy[copy]
    if (translation === undefined) auditEnglishCopy(copy)
    return translation ?? copy
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (status === 'sending') return
    const form = event.currentTarget
    const values = Object.fromEntries(new FormData(form).entries())
    setStatus('sending')
    setErrorMessage('')
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...values, language }),
      })
      if (response.status === 429) {
        setErrorMessage(t('Has alcanzado el límite de envíos. Espera 15 minutos antes de volver a intentarlo o escríbenos a '))
        setStatus('error')
        return
      }
      if (!response.ok) throw new Error('Contact request failed')
      form.reset()
      setStatus('success')
    } catch {
      setStatus('error')
      setErrorMessage(t('No hemos podido enviar tu mensaje. Inténtalo de nuevo o escríbenos a '))
    }
  }

  return <form className="contact-form" onSubmit={handleSubmit}>
    <div className="contact-form-grid">
      <label>{t('Nombre')}<input name="name" autoComplete="name" required maxLength={120} /></label>
      <label>{t('Correo electrónico')}<input name="email" type="email" autoComplete="email" required maxLength={254} /></label>
    </div>
    <label>{t('Asunto')}<input name="subject" required maxLength={160} /></label>
    <label>{t('Mensaje')}<textarea name="message" rows={5} required minLength={10} maxLength={5000} /></label>
    <label className="contact-trap" aria-hidden="true">Leave blank<input name="field_x9k2" tabIndex={-1} autoComplete="off" /></label>
    <button className="contact-submit" type="submit" disabled={status === 'sending'}>
      {status === 'sending' ? t('Enviando…') : t('Enviar mensaje')}
      <span aria-hidden="true">↗</span>
    </button>
    <p className="contact-privacy-note">{t('Usaremos estos datos para responder a tu consulta.')}</p>
    <p className="contact-status" data-state={status} role={status === 'error' ? 'alert' : 'status'} aria-live={status === 'error' ? 'assertive' : 'polite'} aria-atomic="true">{status === 'sending'
      ? t('Estamos enviando tu mensaje…')
      : status === 'success'
        ? t('Gracias. Hemos recibido tu mensaje.')
        : status === 'error' ? <>{errorMessage}<a href="mailto:info@infranest.es">info@infranest.es</a>.</> : ''}</p>
  </form>
}

/** Records user-facing copy that has no English translation. */
function auditEnglishCopy(copy: string): void {
  if (/\p{L}/u.test(copy) && englishCopy[copy] === undefined && !alreadyEnglishCopy.has(copy)) {
    recordMissingEnglishTranslation(copy)
  }
}

/** Recursively translates the text and accessible labels in a React node tree. */
function localizeNode(node: ReactNode, language: Language): ReactNode {
  if (language === 'es') return node
  if (typeof node === 'string') {
    const translation = englishCopy[node]
    if (translation === undefined) auditEnglishCopy(node)
    return translation ?? node
  }
  if (Array.isArray(node)) return node.map((child) => localizeNode(child, language))
  if (isValidElement<{ children?: ReactNode; translate?: string; 'aria-hidden'?: boolean; 'aria-label'?: string; alt?: string; title?: string; placeholder?: string; dangerouslySetInnerHTML?: { __html?: string } }>(node)) {
    const { children, translate, 'aria-hidden': ariaHidden, dangerouslySetInnerHTML } = node.props
    if (translate === 'no' || ariaHidden === true) return node
    for (const copy of [node.props['aria-label'], node.props.alt, node.props.title, node.props.placeholder]) {
      if (copy) auditEnglishCopy(copy)
    }
    if (typeof dangerouslySetInnerHTML?.__html === 'string') {
      const visibleHtmlText = dangerouslySetInnerHTML.__html.replace(/<!--[^]*?-->|<[^>]*>/gu, ' ').trim()
      if (visibleHtmlText) auditEnglishCopy(visibleHtmlText)
    }
    if (children !== undefined) {
      const localizedChildren = localizeNode(children, language)
      return Array.isArray(localizedChildren)
        ? cloneElement(node, undefined, ...localizedChildren)
        : cloneElement(node, undefined, localizedChildren)
    }
  }
  return node
}

/** Renders links for switching between the Spanish and English landing pages. */
function LanguageSwitch({ language }: { language: Language }) {
  if (language === 'en') {
    for (const label of ['Language', 'Spanish', 'English']) auditEnglishCopy(label)
  }
  return <nav className="language-switch" aria-label={language === 'es' ? 'Idioma' : 'Language'}>
    <a href="/" lang="es" aria-label={language === 'en' ? 'Spanish' : 'Español'} aria-current={language === 'es' ? 'page' : undefined}>ES</a>
    <a href="/en/" lang="en" aria-label={language === 'en' ? 'English' : 'Inglés'} aria-current={language === 'en' ? 'page' : undefined}>EN</a>
  </nav>
}

function NetworkDrawing() {
  return <svg className="network-drawing" viewBox="0 0 600 570" fill="none" aria-hidden="true">
    <g stroke="currentColor"><path d="M30 390H570M30 300H570M30 210H570M120 60V510M300 60V510M480 60V510" opacity=".12" /><path d="M30 480H570" opacity=".28" /></g>
    <path d="M125 430V135L475 430V135" stroke="#0FA9A0" strokeLinecap="round" strokeLinejoin="round" strokeWidth="30" />
    <circle cx="475" cy="135" r="29" fill="#F2B544" />
    <circle cx="125" cy="430" r="15" fill="#F2B544" />
    <circle cx="300" cy="282" r="8" fill="currentColor" />
    <path d="M125 480H475" stroke="currentColor" opacity=".25" />
  </svg>
}

/** Renders the landing page in the requested or URL-derived language. */
function App({ language: requestedLanguage }: { language?: Language } = {}) {
  const englishPath = typeof window !== 'undefined' && /^\/en(?:\/|$)/.test(window.location.pathname)
  const language = requestedLanguage ?? (englishPath ? 'en' : 'es')
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  const [navOpen, setNavOpen] = useState(false)
  const menuButton = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    document.documentElement.lang = language
  }, [language])

  useEffect(() => {
    document.documentElement.dataset.enhanced = 'true'
    window.dispatchEvent(new Event('infranest-app-ready'))
    const media = window.matchMedia('(prefers-color-scheme: dark)')
    const syncTheme = () => {
      let preference: string | null = null
      try { preference = window.localStorage.getItem('theme') } catch { /* El tema funciona sin almacenamiento. */ }
      const next = preference === 'dark' || (preference !== 'light' && media.matches) ? 'dark' : 'light'
      document.documentElement.dataset.theme = next
      document.querySelector('meta[name="theme-color"]')?.setAttribute('content', next === 'dark' ? '#101d27' : '#f5f7f8')
      setTheme(next)
    }
    syncTheme()
    media.addEventListener('change', syncTheme)
    window.addEventListener('storage', syncTheme)
    return () => { media.removeEventListener('change', syncTheme); window.removeEventListener('storage', syncTheme) }
  }, [])

  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 1050px)')
    const closeOnDesktop = () => { if (desktop.matches) setNavOpen(false) }
    desktop.addEventListener('change', closeOnDesktop)
    return () => desktop.removeEventListener('change', closeOnDesktop)
  }, [])

  const toggleTheme = () => {
    const next = theme === 'light' ? 'dark' : 'light'
    setTheme(next)
    document.documentElement.dataset.theme = next
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', next === 'dark' ? '#101d27' : '#f5f7f8')
    try { window.localStorage.setItem('theme', next) } catch { /* Preferencia solo para esta visita. */ }
  }

  const themeButton = <button className="theme-toggle" type="button" onClick={toggleTheme} aria-label={language === 'en' ? (theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme') : (theme === 'dark' ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro')}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><circle cx="12" cy="12" r="8" /><path d="M12 4a8 8 0 0 1 0 16Z" fill="currentColor" stroke="none" /></svg></button>

  return localizeNode((
    <div className="page" id="inicio">
      <a className="skip-link" href="#contenido">Saltar al contenido</a>
      <header className="site-header" onKeyDown={(event) => {
        if (event.key === 'Escape' && navOpen) { setNavOpen(false); menuButton.current?.focus() }
      }}>
        <div className="container header-inner">
          <a className="brand" href="#inicio" aria-label={language === 'en' ? 'Infranest, home' : 'Infranest, inicio'}><img src="/brand/infranest-mark.svg" width="44" height="44" alt="" /><span translate="no">Infranest</span></a>
          <div className="header-controls header-controls-mobile">
            <LanguageSwitch language={language} />
            {themeButton}
            <button ref={menuButton} className="menu-toggle" type="button" aria-label={language === 'en' ? (navOpen ? 'Close navigation menu' : 'Open navigation menu') : (navOpen ? 'Cerrar menú' : 'Abrir menú')} aria-expanded={navOpen} aria-controls="site-navigation" onClick={() => setNavOpen(!navOpen)}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
                {navOpen ? <path d="m6 6 12 12M18 6 6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
              </svg>
            </button>
          </div>
          <nav id="site-navigation" className={`site-nav${navOpen ? ' is-open' : ''}`} aria-label={language === 'en' ? 'Main navigation' : 'Navegación principal'}>{navigation.map(({ href, es, en }) => <a key={href} href={href} onClick={(event) => {
            if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
            setNavOpen(false)
            const heading = document.querySelector<HTMLElement>(`${href} h2`)
            if (heading) { heading.tabIndex = -1; heading.focus({ preventScroll: true }) }
          }}>{language === 'en' ? en : es}</a>)}</nav>
          <div className="header-controls header-controls-desktop"><LanguageSwitch language={language} />{themeButton}</div>
        </div>
      </header>
      <main id="contenido" tabIndex={-1}>
        <section className="hero container" aria-labelledby="hero-title">
          <div className="hero-copy"><h1 id="hero-title">Productos tecnológicos para el día a día de tu empresa.</h1><p className="hero-description">Creamos herramientas claras para pymes y autónomos. Y te acompañamos para que encajen en tu forma de trabajar.</p><div className="hero-actions"><a className="button button-primary" href="#productos">Conoce nuestro primer producto</a><a className="text-link" href="#plataforma">Así entendemos la tecnología</a></div></div>
          <div className="hero-art"><NetworkDrawing /><p className="art-caption">De un problema concreto.<br />A una herramienta que encaja.</p></div>
          <div className="hero-bottom"><span>Productos propios. Comunicación directa.</span><a href="#productos">Empieza por Odimetry <span aria-hidden="true">↘</span></a></div>
        </section>
        <section className="section container idea-section" id="plataforma" aria-labelledby="idea-title">
          <div><p className="section-label">La idea que nos mueve</p><h2 id="idea-title">La tecnología tiene que encajar contigo.</h2></div><div className="idea-copy"><p className="large-copy">Una tarea concreta merece una solución clara. Con el alcance adecuado y sin añadir complejidad innecesaria.</p><p>En Infranest desarrollamos productos propios y escuchamos a quienes los utilizan. La integración, la configuración y la puesta en marcha ayudan a llevar cada producto al contexto real de tu negocio.</p><div className="audience" id="casos"><span>Pensado para</span><strong>Pymes y profesionales autónomos</strong></div></div>
        </section>
        <section className="about-section" id="nosotros" aria-labelledby="about-title">
          <div className="container about-layout"><div className="about-intro"><p className="section-label">Quiénes somos</p><h2 id="about-title">Ingeniería de software con visión de negocio.</h2></div><div className="about-content"><p className="large-copy">Infranest nace de la iniciativa de tres ingenieros de software con una ambición compartida: desarrollar productos tecnológicos propios que resuelvan necesidades reales de empresas y profesionales.</p><p>Nuestra experiencia en startups nos ha enseñado a analizar problemas, trabajar de cerca con clientes y responder a necesidades que evolucionan. Esa trayectoria ha reforzado nuestra capacidad para traducir demandas de negocio en decisiones técnicas, definir prioridades y ajustar el alcance de cada solución.</p><p>Combinamos esa perspectiva con conocimientos de desarrollo de software y diseño de experiencias digitales para abordar nuestros productos de principio a fin. Como socios fundadores, dirigimos Infranest y participamos directamente en su construcción, cuidando tanto la base técnica como la utilidad y la experiencia de quienes los utilizan.</p></div></div>
        </section>
        <section className="product-section" id="productos" aria-labelledby="product-title">
          <div className="container product-layout"><div className="product-copy"><p className="section-label">Nuestro primer producto</p><h2 id="product-title" translate="no">Odimetry<span aria-hidden="true">.</span></h2><p className="product-heading">Conoce qué expone tu negocio en Internet.</p><p>Una evaluación externa de ciberseguridad sobre dominios y activos autorizados, con resultados comprensibles y próximos pasos orientativos.</p><a className="button button-teal" href="https://odimetry.es/">Conocer Odimetry <span aria-hidden="true">↗</span></a><p className="product-stage"><span className="signal" />En desarrollo y validación de mercado.</p></div><div className="product-scope"><div className="scope-heading"><span>Del análisis a la decisión</span><span className="scope-symbol" aria-hidden="true">↘</span></div><dl><div><dt>Qué hay expuesto</dt><dd>Servicios visibles desde Internet en el alcance autorizado.</dd></div><div><dt>Qué necesita atención</dt><dd>Vulnerabilidades conocidas y configuraciones inseguras identificadas.</dd></div><div><dt>Por dónde empezar</dt><dd>Un informe claro y priorizado para orientar las siguientes acciones.</dd></div></dl><p className="scope-note">Una evaluación del momento y del alcance analizado. Sin promesas de seguridad total.</p></div></div>
        </section>
        <section className="section container adoption-section" id="servicios" aria-labelledby="adoption-title">
          <div className="adoption-heading"><p className="section-label">Del producto al uso real</p><h2 id="adoption-title">Construimos el producto.<br />Acompañamos su adopción.</h2><p>La puesta en marcha también cuenta. Acordamos contigo qué hace falta para empezar y mantenemos una conversación abierta para mejorar.</p></div><ol className="process" id="proceso"><li><span className="step-number">01</span><div><h3>Entender tu contexto</h3><p>Escuchamos qué necesitas resolver y vemos si el producto encaja.</p></div></li><li><span className="step-number">02</span><div><h3>Acordar lo necesario</h3><p>Definimos la integración, la configuración y el alcance de la puesta en marcha.</p></div></li><li><span className="step-number">03</span><div><h3>Aprender contigo</h3><p>Recogemos tu experiencia y explicamos qué mejoras priorizamos y por qué.</p></div></li></ol>
        </section>
        <section className="principles-section" id="seguridad" aria-labelledby="principles-title"><div className="container principles-layout"><p className="section-label">Nuestra forma de hacer</p><div><h2 id="principles-title">Hablar claro.<br />Escuchar de cerca.</h2><p>Sin dar por hecho lo que necesitas. Sin prometer lo que todavía no existe. Con flexibilidad para adaptarnos y criterio para decidir qué aporta valor al producto.</p></div><span className="connection-mark" aria-hidden="true"><i /><i /><i /></span></div></section>
        <section className="section container faq-section" id="preguntas" aria-labelledby="faq-title"><div><p className="section-label">Antes de hablar</p><h2 id="faq-title">Las cosas claras, desde el principio.</h2></div><div className="faq-list">{questions.map(([question, answer]) => <details key={question}><summary>{question}<span aria-hidden="true">+</span></summary><p>{answer}</p></details>)}</div></section>
        <section className="contact-section" id="contacto" aria-labelledby="contact-title"><div className="container contact-layout"><div><p className="section-label">Hablemos de tu contexto</p><h2 id="contact-title">¿Qué te gustaría<br />hacer más sencillo?</h2></div><div className="contact-copy"><p>Cuéntanos qué necesita tu negocio o qué te gustaría saber sobre Odimetry. Te explicaremos dónde podemos ayudarte.</p><ContactForm language={language} /><p className="contact-note">Si lo prefieres, también puedes escribirnos directamente a <a href="mailto:info@infranest.es">info@infranest.es</a>.</p></div></div></section>
      </main>
      <footer className="site-footer"><div className="container footer-inner"><a className="brand" href="#inicio" aria-label={language === 'en' ? 'Infranest, back to home' : 'Infranest, volver al inicio'}><img src="/brand/infranest-mark.svg" alt="" width="40" height="40" loading="lazy" /><span translate="no">Infranest</span></a><p>Productos claros para problemas complejos.</p><a className="text-link" href="#preguntas">Preguntas frecuentes</a><a className="text-link" href="#inicio">Volver arriba ↑</a></div></footer>
    </div>
  ), language)
}

export default App
