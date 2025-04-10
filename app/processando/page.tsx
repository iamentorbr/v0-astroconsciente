"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { AstralAnimation } from "@/components/astral-animation"

export default function ProcessandoPage() {
  const router = useRouter()

  useEffect(() => {
    // Verificar se os dados necessários existem
    const mapaData = localStorage.getItem("mapaAstrologico")
    let allQuestionnairesCompleted = true

    for (let i = 1; i <= 4; i++) {
      const questionarioData = localStorage.getItem(`questionario${i}`)
      if (!questionarioData) {
        allQuestionnairesCompleted = false
        break
      }
    }

    if (!mapaData || !allQuestionnairesCompleted) {
      router.push("/mapa-astrologico")
      return
    }

    // Timeout de segurança para garantir que o redirecionamento aconteça
    const safetyTimeout = setTimeout(() => {
      window.location.href = "/resultado"
    }, 16000) // Tempo máximo que a página pode ficar aberta

    return () => {
      clearTimeout(safetyTimeout)
    }
  }, [router])

  const handleAnimationComplete = () => {
    // Usar window.location para um redirecionamento mais forte
    window.location.href = "/resultado"
  }

  return <AstralAnimation onComplete={handleAnimationComplete} />
}
