// Tipos para os protocolos

export interface ProtocolDay {
  day: number
  title: string
  description: string
  content: string
  actions: ProtocolAction[]
  isPreview?: boolean
}

export interface ProtocolAction {
  type: "reflection" | "practice" | "meditation" | "journaling" | "ritual"
  title: string
  description: string
  duration?: string
  instructions: string
}

export interface Protocol {
  id: string
  type: "autoconhecimento" | "manifestacao" | "emocional" | "espiritual"
  title: string
  subtitle: string
  description: string
  purchaseDate?: string
  days: ProtocolDay[]
}

export interface UserProtocol extends Protocol {
  purchaseDate: string
  unlockLevel: "preview" | "partial" | "full"
}

// Função para calcular o nível de desbloqueio com base na data de compra
export function calculateUnlockLevel(purchaseDate: string): "preview" | "partial" | "full" {
  if (!purchaseDate) return "preview"

  // Verificar se estamos no ambiente do cliente
  if (typeof window === "undefined") return "partial" // Valor padrão seguro para SSR

  try {
    const purchase = new Date(purchaseDate)
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - purchase.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays >= 7) {
      return "full"
    } else {
      return "partial"
    }
  } catch (error) {
    console.error("Error calculating unlock level:", error)
    return "partial" // Valor padrão em caso de erro
  }
}

// Função para determinar se um dia específico está desbloqueado
export function isDayUnlocked(day: number, unlockLevel: "preview" | "partial" | "full"): boolean {
  if (unlockLevel === "full") return true
  if (unlockLevel === "partial" && day <= 7) return true
  if (day <= 3 && (unlockLevel === "preview" || unlockLevel === "partial")) return true
  return false
}
