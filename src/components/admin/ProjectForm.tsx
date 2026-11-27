
import { useEffect, useState, useMemo, type FormEvent, type ChangeEvent } from 'react'
import type { Project } from '../../types/project'

interface ProjectFormProps {
  onCancel: () => void
  onSubmit: (project: {
    title: string
    description: string
    technologies: string[]
    github_url: string | null
    demo_url: string | null
    is_published: boolean
    imageFile: File | null
    removeImage: boolean
  }) => Promise<void>
  initialProject?: Project | null
}

export default function ProjectForm({
  onCancel,
  onSubmit,
  initialProject = null,
}: ProjectFormProps) {
  const [title, setTitle] = useState(initialProject?.title ?? '')
  const [description, setDescription] = useState(initialProject?.description ?? '')
  const [technologies, setTechnologies] = useState(
    initialProject?.technologies.join(', ') ?? '',
  )
  const [githubUrl, setGithubUrl] = useState(initialProject?.github_url ?? '')
  const [demoUrl, setDemoUrl] = useState(initialProject?.demo_url ?? '')
  const [isPublished, setIsPublished] = useState(
    String(initialProject?.is_published ?? false),
  )

  const [imageFile, setImageFile] = useState<File | null>(null)
  const [removeImage, setRemoveImage] = useState(false)

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const previewUrl = useMemo(() => {
    if (!imageFile) return null

    return URL.createObjectURL(imageFile)
  }, [imageFile])

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl)
      }
    }
  }, [previewUrl])

  const currentImage = imageFile
    ? previewUrl
    : removeImage
      ? null
      : initialProject?.image_url ?? null

  function handleImageChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]

    if (!file) return

    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp']

    if (!allowedTypes.includes(file.type)) {
      setError('Formato no permitido. Usa JPG, PNG o WEBP.')
      event.target.value = ''
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      setError('La imagen no puede superar los 5 MB.')
      event.target.value = ''
      return
    }

    setError(null)
    setImageFile(file)
    setRemoveImage(false)
  }

  function handleRemoveImage() {
    if (imageFile) {
      setImageFile(null)
    } else {
      setRemoveImage(true)
    }

    setError(null)
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setLoading(true)
    setError(null)

    try {
      await onSubmit({
        title: title.trim(),
        description: description.trim(),
        technologies: technologies
          .split(',')
          .map((technology) => technology.trim())
          .filter(Boolean),
        github_url: githubUrl.trim() || null,
        demo_url: demoUrl.trim() || null,
        is_published: isPublished === 'true',
        imageFile,
        removeImage,
      })
    } catch {
      setError('No se pudo guardar el proyecto. Inténtalo nuevamente.')
    } finally {
      setLoading(false)
    }
  }

  const inputClass =
    'w-full rounded-lg border border-white/10 bg-[#080814] px-4 py-3 text-white outline-none transition focus:border-violet-500'

  const labelClass =
    'mb-2 block text-sm font-medium text-gray-300'

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/70 p-3 sm:items-center sm:p-4">
      <form
        onSubmit={handleSubmit}
        className="my-auto max-h-[calc(100dvh-1.5rem)] w-full max-w-2xl space-y-5 overflow-y-auto rounded-2xl border border-white/10 bg-[#10101f] p-4 shadow-2xl sm:max-h-[90vh] sm:p-6"
      >
        <h3 className="text-xl font-bold">
          {initialProject ? 'Editar proyecto' : 'Nuevo proyecto'}
        </h3>

        <div>
          <label htmlFor="title" className={labelClass}>
            Título
          </label>
          <input
            id="title"
            type="text"
            placeholder="Nombre del proyecto"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            required
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="description" className={labelClass}>
            Descripción
          </label>
          <textarea
            id="description"
            placeholder="Describe tu proyecto"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            required
            rows={4}
            className={`${inputClass} resize-y`}
          />
        </div>

        <div>
          <label htmlFor="technologies" className={labelClass}>
            Tecnologías
          </label>
          <input
            id="technologies"
            type="text"
            placeholder="React, TypeScript, Supabase"
            value={technologies}
            onChange={(event) => setTechnologies(event.target.value)}
            required
            className={inputClass}
          />
          <p className="mt-1 text-xs text-gray-500">
            Separa las tecnologías con comas.
          </p>
        </div>

        <div>
          <label htmlFor="github_url" className={labelClass}>
            URL de GitHub
          </label>
          <input
            id="github_url"
            type="url"
            placeholder="https://github.com/usuario/proyecto"
            value={githubUrl}
            onChange={(event) => setGithubUrl(event.target.value)}
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="demo_url" className={labelClass}>
            URL de demostración
          </label>
          <input
            id="demo_url"
            type="url"
            placeholder="https://mi-proyecto.com"
            value={demoUrl}
            onChange={(event) => setDemoUrl(event.target.value)}
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="project_image" className={labelClass}>
            Imagen del proyecto
          </label>

          <input
            id="project_image"
            type="file"
            accept="image/png,image/jpeg,image/webp"
            onChange={handleImageChange}
            className="w-full text-sm text-gray-400 file:mr-4 file:rounded-lg file:border-0 file:bg-violet-600 file:px-4 file:py-2 file:font-semibold file:text-white hover:file:bg-violet-500"
          />

          <p className="mt-2 text-xs text-gray-500">
            Formatos JPG, PNG o WEBP. Tamaño máximo: 5 MB.
          </p>

          {currentImage && (
            <div className="mt-4">
              <img
                src={currentImage}
                alt="Vista previa del proyecto"
                className="h-48 w-full rounded-xl border border-white/10 object-cover"
              />

              <button
                type="button"
                onClick={handleRemoveImage}
                className="mt-2 text-sm text-red-400 hover:text-red-300"
              >
                Quitar imagen
              </button>
            </div>
          )}
        </div>

        <div>
          <label htmlFor="is_published" className={labelClass}>
            Estado
          </label>
          <select
            id="is_published"
            value={isPublished}
            onChange={(event) => setIsPublished(event.target.value)}
            className={inputClass}
          >
            <option value="false">Borrador</option>
            <option value="true">Publicado</option>
          </select>
        </div>

        {error && (
          <p className="rounded-lg border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-400">
            {error}
          </p>
        )}

        <div className="flex flex-col-reverse gap-3 pt-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            className="rounded-lg border border-white/10 px-5 py-2.5 text-sm font-medium text-gray-300 transition hover:bg-white/5 disabled:opacity-50"
          >
            Cancelar
          </button>

          <button
            type="submit"
            disabled={loading}
            className="rounded-lg bg-violet-600 px-5 py-2.5 text-sm font-semibold transition hover:bg-violet-500 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading
              ? 'Guardando...'
              : initialProject
                ? 'Guardar cambios'
                : 'Guardar proyecto'}
          </button>
        </div>
      </form>
    </div>
  )
}
