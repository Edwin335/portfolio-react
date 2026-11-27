
import {
  LayoutDashboard,
  FolderKanban,
  LogOut,
  Plus,
  ExternalLink,
  Menu,
  X,
  Pencil,
  Trash2,
  FileText,
} from 'lucide-react'

import { supabase } from '../lib/supabase'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import type { Project } from '../types/project'
import {
  createProject,
  getProjects,
  updateProject,
  deleteProject,
  uploadProjectImage,
  deleteProjectImage,
} from '../services/projectService'
import ProjectForm from '../components/admin/ProjectForm'
import PortfolioContent from '../components/admin/PortfolioContent'

interface ProjectFormData {
  title: string
  description: string
  technologies: string[]
  github_url: string | null
  demo_url: string | null
  is_published: boolean
  imageFile: File | null
  removeImage: boolean
}

function Admin() {
  const navigate = useNavigate()

  const [activeSection, setActiveSection] = useState<
    'dashboard' | 'proyectos' | 'contenido'
  >('dashboard')

  const [menuOpen, setMenuOpen] = useState(false)
  const [projects, setProjects] = useState<Project[]>([])
  const [showForm, setShowForm] = useState(false)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  useEffect(() => {
    async function loadProjects() {
      try {
        const data = await getProjects()
        setProjects(data)
      } catch {
        setError('No fue posible cargar los proyectos.')
      } finally {
        setLoading(false)
      }
    }

    loadProjects()
  }, [])

  async function handleLogout() {
    await supabase.auth.signOut()
    navigate('/login')
  }

  function handleSectionChange(
    section: 'dashboard' | 'proyectos' | 'contenido'
  ) {
    setActiveSection(section)
    setMenuOpen(false)
  }

  function handleNewProject() {
    setSelectedProject(null)
    setShowForm(true)
  }

  function handleEdit(project: Project) {
    setSelectedProject(project)
    setShowForm(true)
  }

  async function handleSaveProject(projectData: ProjectFormData) {
    let uploadedImageUrl: string | null = null

    try {
      if (selectedProject) {
        const oldImageUrl = selectedProject.image_url

        // Subir la nueva imagen, si se seleccionó una.
        if (projectData.imageFile) {
          uploadedImageUrl = await uploadProjectImage(projectData.imageFile)
        }

        const imageUrl = projectData.imageFile
          ? uploadedImageUrl
          : projectData.removeImage
            ? null
            : oldImageUrl

        // Actualizar el proyecto en Supabase.
        const updatedProject = await updateProject(
          selectedProject.id,
          {
            title: projectData.title,
            description: projectData.description,
            technologies: projectData.technologies,
            github_url: projectData.github_url,
            demo_url: projectData.demo_url,
            is_published: projectData.is_published,
            image_url: imageUrl,
          },
        )

        setProjects((current) =>
          current.map((project) =>
            project.id === updatedProject.id ? updatedProject : project,
          ),
        )

        // Eliminar la imagen anterior solo después de actualizar correctamente.
        if (
          oldImageUrl &&
          (projectData.imageFile || projectData.removeImage)
        ) {
          try {
            await deleteProjectImage(oldImageUrl)
          } catch {
            console.error('No fue posible eliminar la imagen anterior.')
          }
        }
      } else {
        // Subir la imagen del nuevo proyecto, si existe.
        if (projectData.imageFile) {
          uploadedImageUrl = await uploadProjectImage(projectData.imageFile)
        }

        const newProject = await createProject({
          title: projectData.title,
          description: projectData.description,
          technologies: projectData.technologies,
          github_url: projectData.github_url,
          demo_url: projectData.demo_url,
          is_published: projectData.is_published,
          image_url: uploadedImageUrl,
        })

        setProjects((current) => [newProject, ...current])
      }

      setShowForm(false)
      setSelectedProject(null)
    } catch (saveError) {
      // Si la operación falla, limpiar la imagen nueva para evitar archivos huérfanos.
      if (uploadedImageUrl) {
        try {
          await deleteProjectImage(uploadedImageUrl)
        } catch {
          console.error('No fue posible limpiar la imagen recién subida.')
        }
      }

      throw saveError
    }
  }

  async function handleDelete(project: Project) {
    const confirmed = window.confirm(
      `¿Estás seguro de eliminar el proyecto "${project.title}"? Esta acción no se puede deshacer.`,
    )

    if (!confirmed) return

    setDeletingId(project.id)

    try {
      // Primero eliminar el registro de la base de datos.
      await deleteProject(project.id)

      setProjects((current) =>
        current.filter((item) => item.id !== project.id),
      )

      // Después intentar eliminar su imagen.
      if (project.image_url) {
        try {
          await deleteProjectImage(project.image_url)
        } catch {
          window.alert(
            'El proyecto fue eliminado, pero no se pudo eliminar su imagen de almacenamiento.',
          )
        }
      }
    } catch {
      window.alert('No fue posible eliminar el proyecto. Inténtalo nuevamente.')
    } finally {
      setDeletingId(null)
    }
  }

  const navButtonClass = (
    section: 'dashboard' | 'proyectos' | 'contenido'
  ) =>
    `flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm transition ${
      activeSection === section
        ? 'bg-violet-600/20 text-violet-300'
        : 'text-gray-400 hover:bg-white/5 hover:text-white'
    }`

  return (
    <div className="flex min-h-screen flex-col bg-[#080814] text-white md:flex-row">
      {/* Mobile header */}
      <div className="flex items-center justify-between border-b border-white/10 bg-white/[0.02] p-4 md:hidden">
        <h1 className="text-2xl font-bold">
          EJR<span className="text-violet-400">.</span>
        </h1>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={menuOpen}
          className="rounded-lg p-2 text-gray-300 transition hover:bg-white/10 hover:text-white"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile overlay */}
      {menuOpen && (
        <button
          aria-label="Cerrar menú"
          onClick={() => setMenuOpen(false)}
          className="fixed inset-0 z-40 bg-black/60 md:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-50 flex w-1/2 max-w-72 flex-col
          border-r border-white/10 bg-[#10101f] p-4 shadow-2xl
          transition-transform duration-300
          md:sticky md:top-0 md:z-auto md:flex md:min-h-screen
          md:w-64 md:max-w-none md:shrink-0 md:translate-x-0
          md:border-r md:border-b-0 md:bg-white/[0.02] md:p-6 md:shadow-none
          ${menuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}
      >
        <div className="mb-10 flex items-center justify-between md:mb-12">
          <div>
            <h1 className="text-2xl font-bold">
              EJR<span className="text-violet-400">.</span>
            </h1>
            <p className="mt-1 text-xs text-gray-500">
              Panel administrativo
            </p>
          </div>

          <button
            onClick={() => setMenuOpen(false)}
            aria-label="Cerrar menú"
            className="rounded-lg p-2 text-gray-400 hover:bg-white/10 hover:text-white md:hidden"
          >
            <X size={21} />
          </button>
        </div>

        <nav className="flex flex-1 flex-col gap-2">
          <button
            onClick={() => handleSectionChange('dashboard')}
            className={navButtonClass('dashboard')}
          >
            <LayoutDashboard size={19} />
            Dashboard
          </button>

          <button
            onClick={() => handleSectionChange('proyectos')}
            className={navButtonClass('proyectos')}
          >
            <FolderKanban size={19} />
            Proyectos
          </button>

          <button onClick={() => handleSectionChange('contenido')}
            className={`${navButtonClass('contenido')} gap-2 px-3 md:gap-3 md:px-4`}>
            <FileText size={19} className="shrink-0" />
            <span className="min-w-0 break-words text-left md:whitespace-nowrap">
              Contenido del portafolio
            </span>
          </button>
        </nav>

        <button
          onClick={handleLogout}
          className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm text-gray-400 transition hover:bg-red-500/10 hover:text-red-400"
        >
          <LogOut size={19} />
          Cerrar sesión
        </button>
      </aside>

      {/* Main content */}
      <main className="min-w-0 flex-1 p-4 sm:p-6 md:p-8">
        {/* Header */}
        <header className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between md:mb-10">
          <div>
            <h2 className="text-2xl font-bold sm:text-3xl">
              {activeSection === 'dashboard'
                ? 'Dashboard'
                : activeSection === 'proyectos'
                  ? 'Mis proyectos'
                  : 'Contenido del portafolio'}
            </h2>

            <p className="mt-2 text-sm text-gray-400 sm:text-base">
              {activeSection === 'dashboard'
                ? 'Bienvenido al administrador de tu portafolio.'
                : activeSection === 'proyectos'
                  ? 'Administra los proyectos de tu portafolio.'
                  : 'Edita la información de las secciones de tu portafolio.'}
            </p>
          </div>

          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            className="flex w-fit items-center gap-2 text-sm text-violet-400 hover:text-violet-300"
          >
            Ver portafolio
            <ExternalLink size={16} />
          </a>
        </header>

        {/* Dashboard */}
        {activeSection === 'dashboard' && (
          <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 md:gap-6">
            <article className="rounded-xl border border-white/10 bg-white/[0.03] p-5 sm:p-6">
              <p className="text-sm text-gray-400">Total de proyectos</p>
              <p className="mt-3 text-4xl font-bold">{projects.length}</p>
            </article>

            <article className="rounded-xl border border-white/10 bg-white/[0.03] p-5 sm:p-6">
              <p className="text-sm text-gray-400">Proyectos publicados</p>
              <p className="mt-3 text-4xl font-bold">
                {projects.filter((project) => project.is_published).length}
              </p>
            </article>

            <article className="rounded-xl border border-white/10 bg-white/[0.03] p-5 sm:p-6">
              <p className="text-sm text-gray-400">Estado del sistema</p>
              <p className="mt-3 text-xl font-semibold text-green-400">
                En desarrollo
              </p>
            </article>
          </section>
        )}

        {/* Portfolio content */}
        {activeSection === 'contenido' && (
          <PortfolioContent />
        )}

        {/* Project form modal */}
        {showForm && (
          <ProjectForm
            key={selectedProject?.id ?? 'new'}
            initialProject={selectedProject}
            onCancel={() => {
              setShowForm(false)
              setSelectedProject(null)
            }}
            onSubmit={handleSaveProject}
          />
        )}

        {/* Projects */}
        {activeSection === 'proyectos' && (
          <section className="rounded-xl border border-white/10 bg-white/[0.03] p-4 sm:p-6">
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="text-xl font-bold">Mis proyectos</h3>
                <p className="mt-1 text-sm text-gray-400">
                  Administra los proyectos de tu portafolio.
                </p>
              </div>

              <button
                onClick={handleNewProject}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-violet-600 px-4 py-3 text-sm font-semibold transition hover:bg-violet-500 sm:w-fit sm:py-2"
              >
                <Plus size={17} />
                Nuevo proyecto
              </button>
            </div>

            {loading ? (
              <p className="py-12 text-center text-gray-400">
                Cargando proyectos...
              </p>
            ) : error ? (
              <p className="py-12 text-center text-red-400">
                {error}
              </p>
            ) : projects.length === 0 ? (
              <div className="py-12 text-center">
                <FolderKanban size={42} className="mx-auto text-gray-600" />
                <p className="mt-4 text-gray-400">
                  Todavía no hay proyectos registrados.
                </p>
                <p className="mt-1 text-sm text-gray-600">
                  Aquí aparecerán los proyectos que agregues.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {projects.map((project) => (
                  <article
                    key={project.id}
                    className="min-w-0 rounded-xl border border-white/10 bg-white/[0.03] p-5"
                  >
                    <h4 className="break-words font-bold">{project.title}</h4>

                    <p className="mt-2 break-words text-sm text-gray-400">
                      {project.description}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="break-words rounded-full bg-violet-500/10 px-3 py-1 text-xs text-violet-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="mt-5 flex items-center justify-between gap-3">
                      <span
                        className={`rounded-full px-3 py-1 text-xs ${
                          project.is_published
                            ? 'bg-green-500/10 text-green-400'
                            : 'bg-yellow-500/10 text-yellow-400'
                        }`}
                      >
                        {project.is_published ? 'Publicado' : 'Borrador'}
                      </span>

                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => handleEdit(project)}
                          aria-label={`Editar ${project.title}`}
                          title="Editar proyecto"
                          className="rounded-lg border border-white/10 p-2 text-gray-400 transition hover:border-violet-500/40 hover:bg-violet-500/10 hover:text-violet-300"
                        >
                          <Pencil size={17} />
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDelete(project)}
                          disabled={deletingId === project.id}
                          aria-label={`Eliminar ${project.title}`}
                          title="Eliminar proyecto"
                          className="rounded-lg border border-white/10 p-2 text-gray-400 transition hover:border-red-500/40 hover:bg-red-500/10 hover:text-red-400 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          <Trash2 size={17} />
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>
        )}
      </main>
    </div>
  )
}

export default Admin
