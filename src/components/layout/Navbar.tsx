
import { Code2, House, User, FolderKanban, Zap, Mail } from 'lucide-react'

const links = [
  { name: 'Inicio', href: '#inicio', icon: House },
  { name: 'Sobre mí', href: '#sobre-mi', icon: User },
  { name: 'Proyectos', href: '#proyectos', icon: FolderKanban },
  { name: 'Habilidades', href: '#habilidades', icon: Zap },
  { name: 'Contacto', href: '#contacto', icon: Mail },
]

function Navbar() {
  return (
    <header className="fixed top-0 z-50 w-full border-b border-white/10 bg-[#080814]/90 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <a href="#inicio" className="flex items-center gap-2 text-2xl font-bold text-violet-500">
          <Code2 size={30} />
          EJR
        </a>

        <div className="hidden items-center gap-7 md:flex">
          {links.map((link) => {
            const Icon = link.icon

            return (
              <a
                key={link.name}
                href={link.href}
                className="flex items-center gap-2 text-sm text-gray-300 transition hover:text-violet-400"
              >
                <Icon size={16} />
                {link.name}
              </a>
            )
          })}
        </div>

        <a
          href="#contacto"
          className="rounded-full border border-violet-500 px-4 py-2 text-sm text-white transition hover:bg-violet-600"
        >
          Hablemos
        </a>
      </nav>
    </header>
  )
}

export default Navbar
