import { useEffect, useRef, useState } from 'react'

const navigation = [['#plataforma', 'Nuestra idea'], ['#productos', 'Odimetry'], ['#servicios', 'Cómo trabajamos'], ['#contacto', 'Hablemos']]
const questions = [
  ['¿Para quién son los productos de Infranest?', 'Para pymes y profesionales autónomos que necesitan resolver una tarea tecnológica concreta, sin asumir un proyecto desproporcionado ni disponer de un equipo técnico amplio.'],
  ['¿Desarrolláis productos propios o prestáis servicios?', 'Hacemos ambas cosas. Desarrollamos productos propios y ofrecemos servicios puntuales de integración, configuración y puesta en marcha cuando ayudan a incorporarlos en el entorno del cliente.'],
  ['¿Podéis ayudarnos con la puesta en marcha?', 'Sí. Ofrecemos integración, configuración y acompañamiento para facilitar la adopción de nuestros productos. Primero hablamos del contexto y acordamos qué trabajo tiene sentido y cuál será su alcance.'],
  ['¿Cómo decidís qué mejorar?', 'Escuchamos cada propuesta y evaluamos su utilidad, si puede servir a más usuarios y cómo encaja en nuestra dirección. Explicamos qué podemos priorizar y qué debe esperar.'],
]

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

function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  const [navOpen, setNavOpen] = useState(false)
  const menuButton = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    document.documentElement.dataset.enhanced = 'true'
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

  const themeButton = <button className="theme-toggle" type="button" onClick={toggleTheme} aria-label={theme === 'dark' ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro'}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><circle cx="12" cy="12" r="8" /><path d="M12 4a8 8 0 0 1 0 16Z" fill="currentColor" stroke="none" /></svg></button>

  return (
    <div className="page" id="inicio">
      <a className="skip-link" href="#contenido">Saltar al contenido</a>
      <header className="site-header" onKeyDown={(event) => {
        if (event.key === 'Escape' && navOpen) { setNavOpen(false); menuButton.current?.focus() }
      }}>
        <div className="container header-inner">
          <a className="brand" href="#inicio" aria-label="Infranest, inicio"><img src="/brand/infranest-mark.svg" width="44" height="44" alt="" /><span translate="no">Infranest</span></a>
          <div className="header-controls header-controls-mobile">
            {themeButton}
            <button ref={menuButton} className="menu-toggle" type="button" aria-expanded={navOpen} aria-controls="site-navigation" onClick={() => setNavOpen(!navOpen)}>{navOpen ? 'Cerrar' : 'Menú'}<span aria-hidden="true">{navOpen ? '−' : '+'}</span></button>
          </div>
          <nav id="site-navigation" className={`site-nav${navOpen ? ' is-open' : ''}`} aria-label="Navegación principal">{navigation.map(([href, label]) => <a key={href} href={href} onClick={(event) => {
            if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
            setNavOpen(false)
            const heading = document.querySelector<HTMLElement>(`${href} h2`)
            if (heading) { heading.tabIndex = -1; heading.focus({ preventScroll: true }) }
          }}>{label}</a>)}</nav>
          <div className="header-controls header-controls-desktop">{themeButton}</div>
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
        <section className="product-section" id="productos" aria-labelledby="product-title">
          <div className="container product-layout"><div className="product-copy"><p className="section-label">Nuestro primer producto</p><h2 id="product-title" translate="no">Odimetry<span aria-hidden="true">.</span></h2><p className="product-heading">Conoce qué expone tu negocio en Internet.</p><p>Una evaluación externa de ciberseguridad sobre dominios y activos autorizados, con resultados comprensibles y próximos pasos orientativos.</p><a className="button button-teal" href="https://odimetry.es/">Conocer Odimetry <span aria-hidden="true">↗</span></a><p className="product-stage"><span className="signal" />En desarrollo y validación de mercado.</p></div><div className="product-scope"><div className="scope-heading"><span>Del análisis a la decisión</span><span className="scope-symbol" aria-hidden="true">↘</span></div><dl><div><dt>Qué hay expuesto</dt><dd>Servicios visibles desde Internet en el alcance autorizado.</dd></div><div><dt>Qué necesita atención</dt><dd>Vulnerabilidades conocidas y configuraciones inseguras identificadas.</dd></div><div><dt>Por dónde empezar</dt><dd>Un informe claro y priorizado para orientar las siguientes acciones.</dd></div></dl><p className="scope-note">Una evaluación del momento y del alcance analizado. Sin promesas de seguridad total.</p></div></div>
        </section>
        <section className="section container adoption-section" id="servicios" aria-labelledby="adoption-title">
          <div className="adoption-heading"><p className="section-label">Del producto al uso real</p><h2 id="adoption-title">Construimos el producto.<br />Acompañamos su adopción.</h2><p>La puesta en marcha también cuenta. Acordamos contigo qué hace falta para empezar y mantenemos una conversación abierta para mejorar.</p></div><ol className="process" id="proceso"><li><span className="step-number">01</span><div><h3>Entender tu contexto</h3><p>Escuchamos qué necesitas resolver y vemos si el producto encaja.</p></div></li><li><span className="step-number">02</span><div><h3>Acordar lo necesario</h3><p>Definimos la integración, la configuración y el alcance de la puesta en marcha.</p></div></li><li><span className="step-number">03</span><div><h3>Aprender contigo</h3><p>Recogemos tu experiencia y explicamos qué mejoras priorizamos y por qué.</p></div></li></ol>
        </section>
        <section className="principles-section" id="seguridad" aria-labelledby="principles-title"><div className="container principles-layout"><p className="section-label">Nuestra forma de hacer</p><div><h2 id="principles-title">Hablar claro.<br />Escuchar de cerca.</h2><p>Sin dar por hecho lo que necesitas. Sin prometer lo que todavía no existe. Con flexibilidad para adaptarnos y criterio para decidir qué aporta valor al producto.</p></div><span className="connection-mark" aria-hidden="true"><i /><i /><i /></span></div></section>
        <section className="section container faq-section" id="preguntas" aria-labelledby="faq-title"><div><p className="section-label">Antes de hablar</p><h2 id="faq-title">Las cosas claras, desde el principio.</h2></div><div className="faq-list">{questions.map(([question, answer]) => <details key={question}><summary>{question}<span aria-hidden="true">+</span></summary><p>{answer}</p></details>)}</div></section>
        <section className="contact-section" id="contacto" aria-labelledby="contact-title"><div className="container contact-layout"><div><p className="section-label">Hablemos de tu contexto</p><h2 id="contact-title">¿Qué te gustaría<br />hacer más sencillo?</h2></div><div className="contact-copy"><p>Cuéntanos qué necesita tu negocio o qué te gustaría saber sobre Odimetry. Te explicaremos dónde podemos ayudarte.</p><a className="contact-email" href="mailto:info@infranest.es">info@infranest.es <span aria-hidden="true">↗</span></a><p className="contact-note">El enlace abre tu aplicación de correo. También puedes copiar la dirección y escribirnos desde tu servicio habitual.</p></div></div></section>
      </main>
      <footer className="site-footer"><div className="container footer-inner"><a className="brand" href="#inicio" aria-label="Infranest, volver al inicio"><img src="/brand/infranest-mark.svg" alt="" width="40" height="40" loading="lazy" /><span translate="no">Infranest</span></a><p>Productos claros para problemas complejos.</p><a className="text-link" href="#preguntas">Preguntas frecuentes</a><a className="text-link" href="#inicio">Volver arriba ↑</a></div></footer>
    </div>
  )
}

export default App
