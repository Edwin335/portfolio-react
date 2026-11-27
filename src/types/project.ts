export interface Project {
  id: string
  title: string
  description: string
  technologies: string[]
  github_url: string | null
  demo_url: string | null
  image_url: string | null
  is_published: boolean
  created_at: string
}