import { useEffect, useRef, useState } from 'react'

function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    // Leer de localStorage sincrónicamente
    const savedTheme = window.localStorage.getItem('theme')
    if (savedTheme === 'light' || savedTheme === 'dark') {
      // Aplicar al DOM inmediatamente
      document.documentElement.setAttribute('data-theme', savedTheme)
      return savedTheme
    }
    // Fallback a preferencia del sistema
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const systemTheme = prefersDark ? 'dark' : 'light'
    // Aplicar al DOM inmediatamente
    document.documentElement.setAttribute('data-theme', systemTheme)
    return systemTheme
  })
  const [navOpen, setNavOpen] = useState(false)
  const sliderRef = useRef<HTMLDivElement | null>(null)
  const dragState = useRef({
    isDown: false,
    startX: 0,
    scrollLeft: 0,
  })
  const [dragging, setDragging] = useState(false)

  // Asegurar que el tema se mantiene sincronizado con el DOM
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark'
    const root = document.documentElement
    const applyTheme = () => {
      setTheme(nextTheme)
      root.setAttribute('data-theme', nextTheme)
      window.localStorage.setItem('theme', nextTheme)
    }
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!prefersReduced && 'startViewTransition' in document) {
      ;(document as { startViewTransition: (cb: () => void) => void }).startViewTransition(
        applyTheme,
      )
    } else {
      applyTheme()
    }
  }

  const toggleNav = () => {
    setNavOpen((prev) => !prev)
  }

  const handleSliderPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    const slider = sliderRef.current
    if (!slider) return
    dragState.current.isDown = true
    dragState.current.startX = event.pageX - slider.offsetLeft
    dragState.current.scrollLeft = slider.scrollLeft
    slider.setPointerCapture(event.pointerId)
    setDragging(true)
  }

  const handleSliderPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const slider = sliderRef.current
    if (!slider || !dragState.current.isDown) return
    const x = event.pageX - slider.offsetLeft
    const walk = x - dragState.current.startX
    slider.scrollLeft = dragState.current.scrollLeft - walk
  }

  const handleSliderPointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    const slider = sliderRef.current
    if (!slider) return
    dragState.current.isDown = false
    slider.releasePointerCapture(event.pointerId)
    setDragging(false)
  }

  const handleSliderPointerLeave = () => {
    dragState.current.isDown = false
    setDragging(false)
  }

  const handleSliderKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const slider = sliderRef.current
    if (!slider) return

    const scrollAmount = 200 // Cantidad de scroll en píxeles
    const pageScrollAmount = slider.clientWidth * 0.8 // 80% del ancho visible

    switch (event.key) {
      case 'ArrowLeft':
        event.preventDefault()
        slider.scrollBy({ left: -scrollAmount, behavior: 'smooth' })
        break
      case 'ArrowRight':
        event.preventDefault()
        slider.scrollBy({ left: scrollAmount, behavior: 'smooth' })
        break
      case 'Home':
        event.preventDefault()
        slider.scrollTo({ left: 0, behavior: 'smooth' })
        break
      case 'End':
        event.preventDefault()
        slider.scrollTo({ left: slider.scrollWidth, behavior: 'smooth' })
        break
      case 'PageUp':
        event.preventDefault()
        slider.scrollBy({ left: -pageScrollAmount, behavior: 'smooth' })
        break
      case 'PageDown':
        event.preventDefault()
        slider.scrollBy({ left: pageScrollAmount, behavior: 'smooth' })
        break
    }
  }

  return (
    <div className="page">
      <header className="site-header">
        <div className="container header-inner">
          <div className="brand">
            <span className="brand-mark">IN</span>
            <span className="brand-name">Infranest</span>
          </div>
          <nav className="nav">
            <a href="#plataforma">Plataforma</a>
            <a href="#productos">Productos</a>
            <a href="#servicios">Servicios</a>
            <a href="#casos">Casos</a>
            <a href="#seguridad">Seguridad</a>
          </nav>
          <div className="header-actions">
            <button
              className="btn btn-ghost theme-toggle"
              onClick={toggleTheme}
              aria-label={theme === 'dark' ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro'}
            >
              {theme === 'dark' ? (
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M21 12.8A8.5 8.5 0 1 1 11.2 3a6.5 6.5 0 0 0 9.8 9.8z" />
                </svg>
              ) : (
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <circle cx="12" cy="12" r="4" />
                  <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
                </svg>
              )}
            </button>
            <a className="btn btn-primary" href="#contacto">
              Contactar
            </a>
            <button
              className={`btn btn-ghost nav-toggle ${navOpen ? 'open' : ''}`}
              onClick={toggleNav}
              aria-label={navOpen ? 'Cerrar menú' : 'Abrir menú'}
              aria-expanded={navOpen}
              aria-controls="mobile-menu"
            >
              <span className="hamburger">
                <span />
                <span />
                <span />
              </span>
            </button>
          </div>
        </div>
        <div id="mobile-menu" className={`mobile-menu ${navOpen ? 'open' : ''}`}>
          <div className="mobile-menu-inner">
            <a href="#plataforma" onClick={() => setNavOpen(false)}>
              Plataforma
            </a>
            <a href="#productos" onClick={() => setNavOpen(false)}>
              Productos
            </a>
            <a href="#servicios" onClick={() => setNavOpen(false)}>
              Servicios
            </a>
            <a href="#casos" onClick={() => setNavOpen(false)}>
              Casos
            </a>
            <a href="#seguridad" onClick={() => setNavOpen(false)}>
              Seguridad
            </a>
            <div className="mobile-actions">
              <a
                className="btn btn-primary"
                href="#contacto"
                onClick={() => setNavOpen(false)}
              >
                Contactar
              </a>
            </div>
          </div>
        </div>
      </header>

      <main>
        <section className="hero">
          <div className="container hero-grid">
            <div className="hero-copy">
              <p className="eyebrow">Consultoría IT y proyectos a medida</p>
              <h1>Consultoría IT clara y accionable.</h1>
              <p className="lead">
                Acompañamos desde el diagnóstico hasta la implementación,
                combinando estrategia, desarrollo y operaciones para pymes,
                grandes empresas y particulares.
              </p>
              <div className="hero-actions">
                <button className="btn btn-primary">Solicitar diagnóstico</button>
                <button className="btn btn-outline">Explorar soluciones</button>
              </div>
              <div className="hero-trust">
                <span>Trabajo remoto y presencial</span>
                <span>Proyectos para pymes y grandes empresas</span>
                <span>Procesos y entregas claras</span>
              </div>
            </div>

            <div className="hero-card">
              <div className="signal">
                <span />
                <span />
                <span />
                <span />
              </div>
              <div className="hero-panel">
                <h3>Proyectos a medida</h3>
                <ul>
                  <li>
                    <span>Diagnóstico técnico</span>
                    <strong>Inicial</strong>
                  </li>
                  <li>
                    <span>Propuesta clara</span>
                    <strong>Por fases</strong>
                  </li>
                  <li>
                    <span>Acompañamiento</span>
                    <strong className="wrap-right">Durante el desarrollo</strong>
                  </li>
                </ul>
                <p className="form-note">Cuéntanos tu caso y lo revisamos contigo.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="section stats reveal">
          <div className="container stats-grid">
            <div>
              <h2>Impacto real en cada proyecto</h2>
              <p>
                Alineamos tecnología con objetivos de negocio, clarificando
                prioridades, riesgos y entregables para cada tipo de cliente.
              </p>
            </div>
            <div className="stat-cards">
              <div className="card">
                <div className="icon-badge">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="9" />
                    <circle cx="12" cy="12" r="4" />
                    <path d="M12 3v2M12 19v2M3 12h2M19 12h2" />
                  </svg>
                </div>
                <h3>Dirección clara</h3>
                <p>Roadmaps con hitos y estimaciones realistas</p>
              </div>
              <div className="card">
                <div className="icon-badge">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M13 2 5 14h7l-1 8 8-12h-7l1-8z" />
                  </svg>
                </div>
                <h3>Entrega ágil</h3>
                <p>Iteraciones rápidas con validación continua</p>
              </div>
              <div className="card">
                <div className="icon-badge">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="9" />
                    <circle cx="12" cy="12" r="3" />
                    <path d="M4.9 4.9 8 8M16 16l3.1 3.1M19.1 4.9 16 8M8 16l-3.1 3.1" />
                  </svg>
                </div>
                <h3>Soporte continuo</h3>
                <p>Acompañamiento y mantenimiento post entrega</p>
              </div>
            </div>
          </div>
        </section>

        <section id="plataforma" className="section platform reveal">
          <div className="container">
            <div className="section-heading">
              <div>
                <p className="eyebrow">Enfoque de trabajo</p>
                <h2>Consultoría, desarrollo y soporte continuo.</h2>
              </div>
              <p>
                Diseñamos soluciones técnicas, construimos productos y
                acompañamos la puesta en marcha con procesos claros.
              </p>
            </div>
            <div className="cards-grid">
              <article className="card">
                <div className="icon-badge">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="6" />
                    <path d="M20 20l-3.5-3.5" />
                  </svg>
                </div>
                <h3>Diagnóstico y estrategia</h3>
                <p>
                  Descubrimos prioridades, riesgos y objetivos con un plan
                  realista y accionable.
                </p>
              </article>
              <article className="card">
                <div className="icon-badge">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2 20 6 12 10 4 6l8-4z" />
                    <path d="M4 6v8l8 4 8-4V6" />
                    <path d="M12 10v8" />
                  </svg>
                </div>
                <h3>Arquitectura y desarrollo</h3>
                <p>
                  Diseñamos e implementamos soluciones seguras, escalables y
                  fáciles de mantener.
                </p>
              </article>
              <article className="card">
                <div className="icon-badge">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M10 14a5 5 0 0 1 0-7l1.5-1.5a5 5 0 0 1 7 7L17 14" />
                    <path d="M14 10a5 5 0 0 1 0 7l-1.5 1.5a5 5 0 0 1-7-7L7 10" />
                  </svg>
                </div>
                <h3>Integraciones y automatización</h3>
                <p>
                  Conectamos sistemas existentes, optimizamos flujos y
                  reducimos tareas manuales.
                </p>
              </article>
              <article className="card">
                <div className="icon-badge">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 7a4 4 0 0 1-6 3.5L7.5 18a2 2 0 1 1-3-3L12 7.5A4 4 0 0 1 21 7z" />
                  </svg>
                </div>
                <h3>Operación y soporte</h3>
                <p>
                  Monitoreo, mejoras continuas y mantenimiento post entrega.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section id="productos" className="section products reveal">
          <div className="container">
            <div className="section-heading">
              <div>
                <p className="eyebrow">Nuestros productos</p>
                <h2>Producto propio y proyectos a medida.</h2>
              </div>
              <p>
                Hoy contamos con Odimetry, nuestro primer producto en
                desarrollo, junto con proyectos a medida para particulares y
                empresas.
              </p>
            </div>
            <div className="cards-grid">
              <article className="card">
                <div className="icon-badge">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2 20 6v6c0 5-3.5 9-8 10-4.5-1-8-5-8-10V6l8-4z" />
                    <path d="M9 12l2 2 4-4" />
                  </svg>
                </div>
                <h3>Odimetry</h3>
                <p>
                  Auditorías de ciberseguridad automatizadas para descubrir lo
                  que expones en Internet antes de que lo haga un atacante.
                  Identifica servicios expuestos, vulnerabilidades conocidas y
                  configuraciones inseguras. Sin instalaciones, sin agentes.
                </p>
                <a className="product-link" href="https://odimetry-landing.vercel.app" target="_blank" rel="noreferrer">
                  Ver landing de Odimetry
                </a>
              </article>
            </div>
          </div>
        </section>

        <section id="servicios" className="section services reveal">
          <div className="container services-grid">
            <div>
              <p className="eyebrow">Servicios</p>
              <h2>Equipo cercano para construir con confianza.</h2>
              <p>
                Consultoría IT, implementación y acompañamiento con procesos
                claros y comunicación directa.
              </p>
              <ul className="checklist">
                <li>Diagnóstico técnico y roadmap de mejoras</li>
                <li>Desarrollo de software y automatización</li>
                <li>Integraciones con sistemas existentes</li>
                <li>Mantenimiento, soporte y evolución del producto</li>
                <li>Proyectos a medida según tu arquitectura</li>
              </ul>
            </div>
            <div className="service-panels">
              <div className="panel">
                <div className="icon-badge">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16v10H7l-3 3V4z" />
                  </svg>
                </div>
                <h3>Consultoría IT práctica</h3>
                <p>
                  Evaluación técnica, plan de acción y acompañamiento en la
                  ejecución.
                </p>
              </div>
              <div className="panel">
                <div className="icon-badge">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M8 9 4 12l4 3M16 9l4 3-4 3M10 19l4-14" />
                  </svg>
                </div>
                <h3>Desarrollo y delivery</h3>
                <p>
                  Desarrollo de producto y automatizaciones con un equipo
                  reducido y enfocado.
                </p>
              </div>
              <div className="panel">
                <div className="icon-badge">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 3h6a2 2 0 0 1 2 2v2h-2a2 2 0 1 0 0 4h2v2a2 2 0 0 1-2 2h-2v-2a2 2 0 1 0-4 0v2H9a2 2 0 0 1-2-2v-2h2a2 2 0 1 0 0-4H7V5a2 2 0 0 1 2-2z" />
                  </svg>
                </div>
                <h3>Proyectos a medida</h3>
                <p>
                  Soluciones personalizadas para necesidades únicas con alcance
                  claro y realista.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="section stack reveal">
          <div className="container">
            <div className="section-heading">
              <div>
                <p className="eyebrow">Stack tecnológico</p>
                <h2>Tecnologías con las que trabajamos.</h2>
              </div>
              <p>
                Elegimos herramientas según el alcance. Nos movemos bien en
                frontend, backend y automatización.
              </p>
            </div>
            <div
              ref={sliderRef}
              className={`stack-slider ${dragging ? 'dragging' : ''}`}
              aria-label="Tecnologías"
              role="region"
              tabIndex={0}
              onPointerDown={handleSliderPointerDown}
              onPointerMove={handleSliderPointerMove}
              onPointerUp={handleSliderPointerUp}
              onPointerLeave={handleSliderPointerLeave}
              onKeyDown={handleSliderKeyDown}
            >
              <div className="stack-track">
                <div className="stack-item">
                  <img src="/stack-icons/angular.svg" alt="Angular" />
                  <span>Angular</span>
                </div>
                <div className="stack-item">
                  <img src="/stack-icons/react.svg" alt="React" />
                  <span>React</span>
                </div>
                <div className="stack-item">
                  <img src="/stack-icons/nextjs.svg" alt="Next.js" />
                  <span>Next.js</span>
                </div>
                <div className="stack-item">
                  <img src="/stack-icons/nestjs.svg" alt="Nest.js" />
                  <span>Nest.js</span>
                </div>
                <div className="stack-item">
                  <img src="/stack-icons/codeigniter.svg" alt="CodeIgniter" />
                  <span>CodeIgniter</span>
                </div>
                <div className="stack-item">
                  <img src="/stack-icons/python.svg" alt="Python" />
                  <span>Python</span>
                </div>
                <div className="stack-item">
                  <img src="/stack-icons/typescript.svg" alt="TypeScript" />
                  <span>TypeScript</span>
                </div>
                <div className="stack-item">
                  <img src="/stack-icons/nodejs.svg" alt="Node.js" />
                  <span>Node.js</span>
                </div>
                <div className="stack-item">
                  <img src="/stack-icons/postgresql.svg" alt="PostgreSQL" />
                  <span>PostgreSQL</span>
                </div>
                <div className="stack-item">
                  <img src="/stack-icons/docker.svg" alt="Docker" />
                  <span>Docker</span>
                </div>
                <div className="stack-item">
                  <img src="/stack-icons/aws.svg" alt="AWS" />
                  <span>AWS</span>
                </div>
                <div className="stack-item">
                  <img src="/stack-icons/git.svg" alt="Git" />
                  <span>Git</span>
                </div>
                <div className="stack-item">
                  <img src="/stack-icons/cursor.png" alt="Cursor" />
                  <span>Cursor</span>
                </div>
                <div className="stack-item">
                  <img src="/stack-icons/openai.svg" alt="ChatGPT" />
                  <span>ChatGPT</span>
                </div>
                <div className="stack-item">
                  <img src="/stack-icons/anthropic.svg" alt="Claude" />
                  <span>Claude</span>
                </div>
                <div className="stack-item">
                  <img src="/stack-icons/github-actions.svg" alt="CI/CD" />
                  <span>CI/CD</span>
                </div>

                <div className="stack-item" aria-hidden="true">
                  <img src="/stack-icons/angular.svg" alt="" />
                  <span>Angular</span>
                </div>
                <div className="stack-item" aria-hidden="true">
                  <img src="/stack-icons/react.svg" alt="" />
                  <span>React</span>
                </div>
                <div className="stack-item" aria-hidden="true">
                  <img src="/stack-icons/nextjs.svg" alt="" />
                  <span>Next.js</span>
                </div>
                <div className="stack-item" aria-hidden="true">
                  <img src="/stack-icons/nestjs.svg" alt="" />
                  <span>Nest.js</span>
                </div>
                <div className="stack-item" aria-hidden="true">
                  <img src="/stack-icons/codeigniter.svg" alt="" />
                  <span>CodeIgniter</span>
                </div>
                <div className="stack-item" aria-hidden="true">
                  <img src="/stack-icons/python.svg" alt="" />
                  <span>Python</span>
                </div>
                <div className="stack-item" aria-hidden="true">
                  <img src="/stack-icons/typescript.svg" alt="" />
                  <span>TypeScript</span>
                </div>
                <div className="stack-item" aria-hidden="true">
                  <img src="/stack-icons/nodejs.svg" alt="" />
                  <span>Node.js</span>
                </div>
                <div className="stack-item" aria-hidden="true">
                  <img src="/stack-icons/postgresql.svg" alt="" />
                  <span>PostgreSQL</span>
                </div>
                <div className="stack-item" aria-hidden="true">
                  <img src="/stack-icons/docker.svg" alt="" />
                  <span>Docker</span>
                </div>
                <div className="stack-item" aria-hidden="true">
                  <img src="/stack-icons/aws.svg" alt="" />
                  <span>AWS</span>
                </div>
                <div className="stack-item" aria-hidden="true">
                  <img src="/stack-icons/git.svg" alt="" />
                  <span>Git</span>
                </div>
                <div className="stack-item" aria-hidden="true">
                  <img src="/stack-icons/cursor.png" alt="" />
                  <span>Cursor</span>
                </div>
                <div className="stack-item" aria-hidden="true">
                  <img src="/stack-icons/openai.svg" alt="" />
                  <span>ChatGPT</span>
                </div>
                <div className="stack-item" aria-hidden="true">
                  <img src="/stack-icons/anthropic.svg" alt="" />
                  <span>Claude</span>
                </div>
                <div className="stack-item" aria-hidden="true">
                  <img src="/stack-icons/github-actions.svg" alt="" />
                  <span>CI/CD</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="casos" className="section cases reveal">
          <div className="container">
            <div className="section-heading">
              <div>
                <p className="eyebrow">Casos de uso</p>
                <h2>Soluciones adaptadas a cada perfil.</h2>
              </div>
            </div>
            <div className="cards-grid">
              <article className="card">
                <div className="icon-badge">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 9h18l-1.5 11h-15z" />
                    <path d="M4 9l2-5h12l2 5" />
                  </svg>
                </div>
                <h3>Pymes en crecimiento</h3>
                <p>
                  Sistemas internos, automatización de procesos y reportes
                  confiables.
                </p>
              </article>
              <article className="card">
                <div className="icon-badge">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="4" y="3" width="16" height="18" rx="2" />
                    <path d="M8 7h2M8 11h2M8 15h2M14 7h2M14 11h2M14 15h2" />
                  </svg>
                </div>
                <h3>Empresas consolidadas</h3>
                <p>
                  Modernización de plataformas y soporte para equipos internos.
                </p>
              </article>
              <article className="card">
                <div className="icon-badge">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 4c-4 1-7 4-8 8l4 4c4-1 7-4 8-8l-4-4z" />
                    <path d="M6 14l-2 6 6-2" />
                    <circle cx="15" cy="9" r="1" />
                  </svg>
                </div>
                <h3>Startups y productos</h3>
                <p>
                  Roadmaps técnicos, MVPs y escalamiento progresivo.
                </p>
              </article>
              <article className="card">
                <div className="icon-badge">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="8" r="3" />
                    <path d="M4 20a8 8 0 0 1 16 0" />
                  </svg>
                </div>
                <h3>Particulares</h3>
                <p>
                  Asesoría técnica, soluciones puntuales y acompañamiento.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section id="seguridad" className="section security reveal">
          <div className="container security-grid">
            <div>
              <p className="eyebrow">Calidad y buenas prácticas</p>
              <h2>Entregas confiables, sin sorpresas.</h2>
              <p>
                Priorizamos buenas prácticas, documentación y procesos para
                garantizar resultados consistentes.
              </p>
              <div className="badges">
                <span>Documentación</span>
                <span>Versionado</span>
                <span>QA</span>
                <span>Mejora continua</span>
              </div>
            </div>
            <div className="security-card">
              <div className="icon-badge">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 2h6l1 2h3v18H5V4h3l1-2z" />
                  <path d="M9 12l2 2 4-4" />
                </svg>
              </div>
              <h3>Checklist operativo</h3>
              <ul>
                <li>Alcance y objetivos alineados</li>
                <li>Plan de trabajo y entregables</li>
                <li>Revisiones técnicas y pruebas</li>
                <li>Soporte post entrega</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="section process reveal">
          <div className="container">
            <div className="section-heading">
              <div>
                <p className="eyebrow">Metodología</p>
                <h2>De la evaluación al despliegue.</h2>
              </div>
              <p>
                Activamos un roadmap claro para mover tu infraestructura a un
                estándar corporativo sin detener operaciones.
              </p>
            </div>
            <div className="process-steps">
              <div className="step">
                <span>01</span>
                <h3>Diagnóstico</h3>
                <p>Levantamiento técnico y financiero con brechas claras.</p>
              </div>
              <div className="step">
                <span>02</span>
                <h3>Diseño</h3>
                <p>Arquitectura modular, presupuesto y cronograma.</p>
              </div>
              <div className="step">
                <span>03</span>
                <h3>Implementación</h3>
                <p>Despliegue coordinado con equipos locales y proveedores.</p>
              </div>
              <div className="step">
                <span>04</span>
                <h3>Operación</h3>
                <p>KPIs en vivo, soporte 24/7 y mejora continua.</p>
              </div>
            </div>
          </div>
        </section>

        <section id="contacto" className="section contact reveal">
          <div className="container contact-grid">
            <div>
              <p className="eyebrow">Contacto</p>
              <h2>Cuéntalo y lo ponemos en marcha.</h2>
              <p>
                Completa el formulario y nuestro equipo te responderá con una
                propuesta inicial. Podemos diseñar proyectos personalizados
                según tu realidad operativa y regulatoria.
              </p>
              <div className="contact-cards">
                <div className="card">
                  <div className="icon-badge">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="9" />
                      <path d="M12 7v5l3 3" />
                    </svg>
                  </div>
                  <h3>Tiempo de respuesta</h3>
                  <p>24-48 horas hábiles</p>
                </div>
                <div className="card">
                  <div className="icon-badge">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 21s-6-5-6-10a6 6 0 1 1 12 0c0 5-6 10-6 10z" />
                      <circle cx="12" cy="11" r="2" />
                    </svg>
                  </div>
                  <h3>Soporte regional</h3>
                  <p>España</p>
                </div>
              </div>
            </div>
            <form className="contact-form">
              <label>
                Nombre y apellido
                <input type="text" placeholder="Tu nombre" />
              </label>
              <label>
                Email corporativo
                <input type="email" placeholder="nombre@empresa.com" />
              </label>
              <label>
                Empresa
                <input type="text" placeholder="Nombre de la empresa" />
              </label>
              <label>
                Necesidad principal
                <select>
                  <option>Selecciona una opción</option>
                  <option>Monitoreo y telemetría</option>
                  <option>Modernización de infraestructura</option>
                  <option>Proyectos a medida</option>
                  <option>Seguridad y compliance</option>
                </select>
              </label>
              <label>
                Mensaje
                <textarea rows={4} placeholder="Cuéntalo aquí" />
              </label>
              <button type="button" className="btn btn-primary">
                Enviar solicitud
              </button>
              <p className="form-note">
                Este formulario es una vista previa y no envía correos aún.
              </p>
            </form>
          </div>
        </section>
      </main>

      <button
        className="theme-fab"
        onClick={toggleTheme}
        aria-label={theme === 'dark' ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro'}
      >
        {theme === 'dark' ? (
          <svg
            className="h-5 w-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M21 12.8A8.5 8.5 0 1 1 11.2 3a6.5 6.5 0 0 0 9.8 9.8z" />
          </svg>
        ) : (
          <svg
            className="h-5 w-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
          </svg>
        )}
      </button>

      <footer className="site-footer">
        <div className="container footer-grid">
          <div>
            <div className="brand">
              <span className="brand-mark">IN</span>
              <span className="brand-name">Infranest</span>
            </div>
            <p>
              Plataforma corporativa para operar infraestructura crítica con
              seguridad, eficiencia y control total.
            </p>
          </div>
          <div>
            <h4>Plataforma</h4>
            <a href="#plataforma">Capacidades</a>
            <a href="#productos">Productos</a>
            <a href="#servicios">Servicios</a>
            <a href="#seguridad">Cumplimiento</a>
          </div>
          <div>
            <h4>Empresa</h4>
            <a href="#casos">Casos de uso</a>
            <a href="#contacto">Contacto</a>
            <a href="mailto:hola@infranest.com">hola@infranest.com</a>
          </div>
          <div>
            <h4>Oficinas</h4>
            <p>Sevilla, España</p>
            <p>+34 95 000 0000</p>
          </div>
        </div>
        <div className="footer-bottom container">
          <span>© 2026 Infranest. Todos los derechos reservados.</span>
          <span>Privacidad · Términos · Seguridad</span>
        </div>
      </footer>
    </div>
  )
}

export default App
