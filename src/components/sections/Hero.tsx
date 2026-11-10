
import { ArrowRight, Code2 } from 'lucide-react'

function Hero() {
  return (
    <section
      id="inicio"
      className="relative flex min-h-screen items-center overflow-hidden bg-[#080814] px-6 pt-24"
    >
      <div className="absolute left-1/2 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-violet-700/20 blur-[120px]" />

      <div className="relative mx-auto grid w-full max-w-7xl items-center gap-12 md:grid-cols-2">
        <div>
          <span className="mb-6 inline-block rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-2 text-sm text-violet-400">
            Hola, soy desarrollador de software
          </span>

          <h1 className="text-5xl font-extrabold leading-tight text-white md:text-7xl">
            Edwin Javier
            <br />
            <span className="bg-gradient-to-r from-violet-400 to-fuchsia-500 bg-clip-text text-transparent">
              Pabón Rodríguez
            </span>
          </h1>

          <h2 className="mt-5 text-2xl font-semibold text-gray-200">
            Desarrollador de Software
          </h2>

          <p className="mt-5 max-w-xl leading-relaxed text-gray-400">
            Apasionado por la tecnología, la programación y la creación
            de soluciones web. Me gusta aprender, resolver problemas
            y transformar ideas en proyectos.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="#proyectos"
              className="flex items-center gap-2 rounded-full bg-violet-600 px-6 py-3 font-semibold text-white shadow-lg shadow-violet-600/30 transition hover:bg-violet-500"
            >
              Ver proyectos <ArrowRight size={18} />
            </a>

            <a
              href="#contacto"
              className="flex items-center gap-2 rounded-full border border-violet-500 px-6 py-3 text-white transition hover:bg-violet-500/10"
            >
              Contactarme
            </a>
          </div>

          <a
            href="https://github.com/edwinpabonr"
            target="_blank"
            rel="noreferrer"
            className="mt-8 inline-flex items-center gap-2 text-gray-400 transition hover:text-violet-400"
          >
            <Code2 size={22} />
            GitHub
          </a>
        </div>

        <div className="relative flex items-center justify-center">
          <div className="absolute h-72 w-72 rounded-full border border-violet-500/30 shadow-[0_0_100px_rgba(139,92,246,0.25)] md:h-96 md:w-96" />

          <div className="relative flex h-64 w-64 items-center justify-center rounded-3xl border border-violet-500/30 bg-gradient-to-br from-violet-950 to-[#101020] shadow-2xl shadow-violet-900/30 md:h-80 md:w-80">
            <Code2 size={110} className="text-violet-400" />
          </div>

          <span className="absolute -bottom-5 rounded-full border border-violet-500/30 bg-[#101020] px-5 py-2 text-sm text-violet-300">
            Code · Build · Improve
          </span>
        </div>
      </div>
    </section>
  )
}

export default Hero
