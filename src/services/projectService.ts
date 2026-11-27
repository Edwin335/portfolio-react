
import { supabase } from '../lib/supabase'
import type { Project } from '../types/project'

// Consultar todos los proyectos (administrador)
export async function getProjects(): Promise<Project[]> {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) throw error

  return data
}

// Consultar únicamente proyectos publicados (visitantes)
export async function getPublishedProjects(): Promise<Project[]> {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('is_published', true)
    .order('created_at', { ascending: false })

  if (error) throw error

  return data
}

// Crear un proyecto
export async function createProject(
  project: Omit<Project, 'id' | 'created_at'>
): Promise<Project> {
  const { data, error } = await supabase
    .from('projects')
    .insert(project)
    .select()
    .single()

  if (error) throw error

  return data
}

// Actualizar un proyecto
export async function updateProject(
  id: string,
  updates: Partial<Omit<Project, 'id' | 'created_at'>>
): Promise<Project> {
  const { data, error } = await supabase
    .from('projects')
    .update(updates)
    .eq('id', id)
    .select()
    .single()

  if (error) throw error

  return data
}

// Eliminar un proyecto
export async function deleteProject(id: string): Promise<void> {
  const { error } = await supabase
    .from('projects')
    .delete()
    .eq('id', id)

  if (error) throw error
}

// Subir imagen de un proyecto
export async function uploadProjectImage(file: File): Promise<string> {
  const fileName = `${crypto.randomUUID()}-${file.name
    .replace(/[^a-zA-Z0-9.-]/g, '-')}`

  const { error } = await supabase.storage
    .from('project-images')
    .upload(fileName, file, {
      cacheControl: '3600',
      contentType: file.type,
      upsert: false,
    })

  if (error) throw error

  const { data } = supabase.storage
    .from('project-images')
    .getPublicUrl(fileName)

  return data.publicUrl
}

// Eliminar imagen de un proyecto
export async function deleteProjectImage(
  imageUrl: string | null
): Promise<void> {
  if (!imageUrl) return

  const marker = '/storage/v1/object/public/project-images/'

  const imagePath = imageUrl.split(marker)[1]

  if (!imagePath) {
    throw new Error('La URL de la imagen no pertenece al bucket esperado.')
  }

  const { error } = await supabase.storage
    .from('project-images')
    .remove([decodeURIComponent(imagePath)])

  if (error) throw error
}
