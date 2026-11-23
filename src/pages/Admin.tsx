
import {
  LayoutDashboard,
  FolderKanban,
  LogOut,
  Plus,
  ExternalLink,
} from 'lucide-react'

import { supabase } from '../lib/supabase'
import { useNavigate } from 'react-router-dom'

function Admin() {
  const navigate = useNavigate()

  async function handleLogout() {
    await supabase.auth.signOut()
    navigate('/login')
  }

  return (
    <div className="flex min-h-screen bg-[#080814] text-white">
      {/* Sidebar */}
      <aside className="flex w-64 flex-col border-r border-white/10 bg-white/[0.02] p-6">
        <div className="mb-12">
          <h1 className="text-2xl font-bold">
            EJR<span className="text-violet-400">.</span>
          </h1>
          <p className="mt-1 text-xs text-gray-500">
            Panel administrativo
          </p>
        </div>

        <nav className="flex-1 space-y-2">
          <a
            href="#dashboard"
            className="flex items-center gap-3 rounded-lg bg-violet-600/20 px-4 py-3 text-violet-300"
          >
            <LayoutDashboard size={19} />
            Dashboard
          </a>

          <a
            href="#proyectos"
            className="flex items-center gap-3 rounded-lg px-4 py-3 text-gray-400 transition hover:bg-white/5 hover:text-white"
          >
            <FolderKanban size={19} />
            Proyectos
          </a>
        </nav>

        <button onClick={handleLogout} className="flex items-center gap-3 rounded-lg px-4 py-3 text-gray-400 transition hover:bg-red-500/10 hover:text-red-400">
          <LogOut size={19} />
          Cerrar sesión
        </button>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8">
        <header className="mb-10 flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold">Dashboard</h2>
            <p className="mt-2 text-gray-400">
              Bienvenido al administrador de tu portafolio.
            </p>
          </div>

          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 text-sm text-violet-400 hover:text-violet-300"
          >
            Ver portafolio
            <ExternalLink size={16} />
          </a>
        </header>

        {/* Summary cards */}
        <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          <article className="rounded-xl border border-white/10 bg-white/[0.03] p-6">
            <p className="text-sm text-gray-400">Total de proyectos</p>
            <p className="mt-3 text-4xl font-bold">0</p>
          </article>

          <article className="rounded-xl border border-white/10 bg-white/[0.03] p-6">
            <p className="text-sm text-gray-400">Proyectos publicados</p>
            <p className="mt-3 text-4xl font-bold">0</p>
          </article>

          <article className="rounded-xl border border-white/10 bg-white/[0.03] p-6">
            <p className="text-sm text-gray-400">Estado del sistema</p>
            <p className="mt-3 text-xl font-semibold text-green-400">
              En desarrollo
            </p>
          </article>
        </section>

        {/* Projects section */}
        <section className="mt-10 rounded-xl border border-white/10 bg-white/[0.03] p-6">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold">Mis proyectos</h3>
              <p className="mt-1 text-sm text-gray-400">
                Administra los proyectos de tu portafolio.
              </p>
            </div>

            <button className="flex items-center gap-2 rounded-lg bg-violet-600 px-4 py-2 text-sm font-semibold transition hover:bg-violet-500">
              <Plus size={17} />
              Nuevo proyecto
            </button>
          </div>

          <div className="py-12 text-center">
            <FolderKanban
              size={42}
              className="mx-auto text-gray-600"
            />
            <p className="mt-4 text-gray-400">
              Todavía no hay proyectos registrados.
            </p>
            <p className="mt-1 text-sm text-gray-600">
              Aquí aparecerán los proyectos que agregues.
            </p>
          </div>
        </section>
      </main>
    </div>
  )
}

export default Admin
