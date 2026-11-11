
import { Code2, Heart, ArrowUp } from 'lucide-react'

function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#080812] px-6 py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-5 sm:flex-row">
        <a
          href="#inicio"
          className="flex items-center gap-2 text-xl font-bold text-white"
        >
          <Code2 className="text-violet-400" size={24} />
          EJR<span className="text-violet-400">.</span>
        </a>

        <p className="flex flex-wrap items-center justify-center gap-1 text-sm text-gray-400">
          © {new Date().getFullYear()} Edwin Javier Pabón Rodríguez.
          Hecho con <Heart size={14} className="fill-violet-400 text-violet-400" /> y dedicación.
        </p>

        <a
          href="#inicio"
          aria-label="Volver al inicio"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-gray-400 transition hover:border-violet-500 hover:text-violet-400"
        >
          <ArrowUp size={20} />
        </a>
      </div>
    </footer>
  )
}

export default Footer
