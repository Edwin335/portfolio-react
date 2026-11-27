
import { supabase } from '../lib/supabase'
import type { PortfolioContent } from '../types/portfolioContent'

// Consultar el contenido del portafolio
export async function getPortfolioContent(): Promise<PortfolioContent> {
  const { data, error } = await supabase
    .from('portfolio_content')
    .select('*')
    .eq('id', 1)
    .single()

  if (error) throw error

  return data as PortfolioContent
}

// Actualizar el contenido de una sección
export async function updatePortfolioContent(
  updates: Partial<Omit<PortfolioContent, 'id' | 'updated_at'>>
): Promise<PortfolioContent> {
  const { data, error } = await supabase
    .from('portfolio_content')
    .update({
      ...updates,
      updated_at: new Date().toISOString(),
    })
    .eq('id', 1)
    .select()
    .single()

  if (error) throw error

  return data as PortfolioContent
}
