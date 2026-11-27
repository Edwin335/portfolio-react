
export interface AboutCard {
  id: string
  title: string
  description: string
}

export interface SkillCategory {
  id: string
  category: string
  technologies: string[]
  icon_url?: string
  icon_path?: string
}

export interface ContactMethod {
  id: string
  name: string
  value: string
  href: string
}

export interface PortfolioContent {
  id: number

  // Conóceme
  about_eyebrow: string
  about_title: string
  about_subtitle: string
  about_description: string
  about_secondary_description: string
  about_cards: AboutCard[]

  // Habilidades
  skills_eyebrow: string
  skills_title: string
  skills_description: string
  skills_categories: SkillCategory[]

  // Contacto
  contact_eyebrow: string
  contact_title: string
  contact_description: string
  contact_methods: ContactMethod[]

  updated_at: string
}
