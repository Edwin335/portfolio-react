import { useEffect, useRef, useState } from 'react'
import { ArrowRight, Code2 } from 'lucide-react'
import { FaGithub } from 'react-icons/fa'

function Hero() {
  const [mounted, setMounted] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 80)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return
      const rect = sectionRef.current.getBoundingClientRect()
      const progress = Math.max(0, -rect.top)
      setScrollY(progress)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const opacity = Math.max(0, 1 - scrollY / 500)
  const translateY = scrollY * 0.35
  const scale = Math.max(0.92, 1 - scrollY / 2000)
  const glowMove = scrollY * 0.15

  return (
    <section
      id="inicio"
      ref={sectionRef}
      className="relative flex min-h-screen items-center overflow-hidden bg-[#080814] px-6 pt-24"
    >
      {/* Glow de fondo */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-700/25 blur-[130px]"
        style={{
          transform: `translate(-50%, calc(-50% + ${glowMove}px))`,
          opacity: opacity * 0.9,
        }}
      />

      <div
        className="relative mx-auto grid w-full max-w-7xl items-center gap-12 md:grid-cols-2"
        style={{
          opacity,
          transform: `translateY(${translateY}px) scale(${scale})`,
          transition: 'transform 0.1s ease-out, opacity 0.1s ease-out',
        }}
      >
        {/* Texto */}
        <div>
          {/* SALUDOS, SOY */}
          <h1 className="text-5xl font-extrabold leading-tight text-white md:text-7xl">
            <span
              className={`inline-block transition-all duration-1000 ease-out ${
                mounted
                  ? 'translate-y-0 opacity-100 blur-0'
                  : 'translate-y-8 opacity-0 blur-sm'
              }`}
            >
              SALUDOS, SOY
            </span>
            <br />

            {/* EDWIN PABÓN - efecto más fuerte */}
            <span
              className={`inline-block bg-gradient-to-r from-violet-400 to-fuchsia-500 bg-clip-text text-transparent transition-all duration-1100 delay-200 ease-out ${
                mounted
                  ? 'translate-y-0 scale-100 opacity-100 blur-0'
                  : 'translate-y-10 scale-95 opacity-0 blur-md'
              }`}
            >
              EDWIN PABÓN
            </span>
          </h1>

          {/* Párrafo */}
          <p
            className={`mt-6 max-w-xl leading-relaxed text-gray-400 transition-all duration-1000 delay-500 ease-out ${
              mounted
                ? 'translate-y-0 opacity-100 blur-0'
                : 'translate-y-8 opacity-0 blur-sm'
            }`}
          >
            Combino desarrollo web, integración de APIs y automatización de
            procesos, apoyándome en herramientas de IA para transformar
            necesidades reales en sistemas funcionales.
          </p>

          {/* Botones */}
          <div
            className={`mt-9 flex flex-wrap gap-4 transition-all duration-1000 delay-700 ease-out ${
              mounted
                ? 'translate-y-0 opacity-100'
                : 'translate-y-8 opacity-0'
            }`}
          >
            <a
              href="#proyectos"
              className="group flex items-center gap-2 rounded-full bg-violet-600 px-6 py-3.5 font-semibold text-white shadow-lg shadow-violet-600/30 transition-all hover:bg-violet-500 hover:shadow-violet-500/40"
            >
              Ver proyectos
              <ArrowRight
                size={18}
                className="transition-transform group-hover:translate-x-1"
              />
            </a>

            <a
              href="#contacto"
              className="flex items-center gap-2 rounded-full border border-violet-500/60 px-6 py-3.5 text-white transition-all hover:border-violet-400 hover:bg-violet-500/10"
            >
              Contactarme
            </a>
          </div>

          {/* GitHub */}
          <a
            href="https://github.com/Edwin335"
            target="_blank"
            rel="noreferrer"
            className={`mt-9 inline-flex items-center gap-2.5 text-gray-400 transition-all duration-1000 delay-900 ease-out hover:text-violet-400 ${
              mounted
                ? 'translate-y-0 opacity-100'
                : 'translate-y-6 opacity-0'
            }`}
          >
            <FaGithub size={22} />
            <span className="text-sm font-medium">GitHub</span>
          </a>
        </div>

        {/* Parte derecha (sin cambios) */}
        <div
          className={`relative flex items-center justify-center transition-all duration-1000 delay-300 ease-out ${
            mounted
              ? 'translate-y-0 opacity-100 scale-100'
              : 'translate-y-12 opacity-0 scale-95'
          }`}
        >
          <div className="absolute h-72 w-72 animate-[spin_18s_linear_infinite] rounded-full border border-violet-500/20 md:h-96 md:w-96" />
          <div className="absolute h-72 w-72 rounded-full border border-violet-500/10 shadow-[0_0_120px_rgba(139,92,246,0.22)] md:h-96 md:w-96" />

          <div className="relative flex h-64 w-64 animate-[float_6s_ease-in-out_infinite] items-center justify-center rounded-3xl border border-violet-500/30 bg-gradient-to-br from-violet-950/90 to-[#101020] shadow-2xl shadow-violet-900/40 backdrop-blur-sm md:h-80 md:w-80">
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-violet-500/10 to-transparent" />
            <Code2
              size={110}
              className="relative text-violet-400 drop-shadow-[0_0_25px_rgba(167,139,250,0.4)]"
            />
          </div>

          <span
            className={`absolute -bottom-5 rounded-full border border-violet-500/30 bg-[#101020]/90 px-5 py-2.5 text-sm text-violet-300 backdrop-blur-md transition-all duration-1000 delay-1000 ${
              mounted
                ? 'translate-y-0 opacity-100'
                : 'translate-y-6 opacity-0'
            }`}
          >
            Desarrollador full stack junior
          </span>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-18px); }
        }
      `}</style>
    </section>
  )
}

export default Hero