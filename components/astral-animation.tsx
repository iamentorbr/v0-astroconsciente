"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { Loader2 } from "lucide-react"

interface Star {
  x: number
  y: number
  size: number
  opacity: number
  speed: number
}

export function AstralAnimation({ onComplete }: { onComplete: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [message, setMessage] = useState("Analisando seu mapa astrológico...")
  const [fadeOut, setFadeOut] = useState(false)
  const starsRef = useRef<Star[]>([])
  const requestRef = useRef<number>()
  const timeoutRef = useRef<NodeJS.Timeout>()
  const completedRef = useRef(false)

  // Mensagens que serão exibidas em sequência
  const messages = [
    "Analisando seu mapa astrológico...",
    "Interpretando padrões energéticos...",
    "Conectando com os arquétipos cósmicos...",
    "Alinhando as influências planetárias...",
    "Preparando sua orientação personalizada...",
  ]

  // Função segura para chamar onComplete apenas uma vez
  const completeAnimation = () => {
    if (!completedRef.current && typeof onComplete === "function") {
      completedRef.current = true
      onComplete()
    }
  }

  useEffect(() => {
    // Inicializa as estrelas
    const initStars = () => {
      const stars: Star[] = []
      for (let i = 0; i < 150; i++) {
        stars.push({
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          size: Math.random() * 2 + 0.5,
          opacity: Math.random() * 0.8 + 0.2,
          speed: Math.random() * 0.05 + 0.01,
        })
      }
      starsRef.current = stars
    }

    // Função para desenhar as estrelas
    const drawStars = () => {
      const canvas = canvasRef.current
      if (!canvas) return

      const ctx = canvas.getContext("2d")
      if (!ctx) return

      // Ajusta o tamanho do canvas para preencher a tela
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight

      // Limpa o canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Desenha as estrelas
      starsRef.current.forEach((star) => {
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`
        ctx.fill()

        // Movimento das estrelas
        star.y -= star.speed
        if (star.y < -10) {
          star.y = canvas.height + 10
          star.x = Math.random() * canvas.width
        }
      })

      // Desenha constelações (linhas conectando algumas estrelas)
      ctx.strokeStyle = "rgba(255, 255, 255, 0.2)"
      ctx.lineWidth = 0.5

      for (let i = 0; i < starsRef.current.length; i += 10) {
        if (i + 1 < starsRef.current.length) {
          ctx.beginPath()
          ctx.moveTo(starsRef.current[i].x, starsRef.current[i].y)
          ctx.lineTo(starsRef.current[i + 1].x, starsRef.current[i + 1].y)
          ctx.stroke()
        }
      }

      // Desenha símbolos astrológicos ocasionalmente
      const time = Date.now()
      if (time % 1000 < 50) {
        const symbols = [
          "♈",
          "♉",
          "♊",
          "♋",
          "♌",
          "♍",
          "♎",
          "♏",
          "♐",
          "♑",
          "♒",
          "♓",
          "☉",
          "☽",
          "☿",
          "♀",
          "♂",
          "♃",
          "♄",
        ]
        const symbol = symbols[Math.floor(Math.random() * symbols.length)]
        const x = Math.random() * canvas.width
        const y = Math.random() * canvas.height
        ctx.font = "24px serif"
        ctx.fillStyle = "rgba(255, 255, 255, 0.7)"
        ctx.fillText(symbol, x, y)
      }

      requestRef.current = requestAnimationFrame(drawStars)
    }

    // Inicializa e começa a animação
    initStars()
    drawStars()

    // Configura a troca de mensagens
    let messageIndex = 0
    const messageInterval = setInterval(() => {
      messageIndex = (messageIndex + 1) % messages.length
      setMessage(messages[messageIndex])
    }, 3000)

    // Configura o timeout para o fade out
    timeoutRef.current = setTimeout(() => {
      setFadeOut(true)
      setTimeout(() => {
        completeAnimation()
      }, 1500) // Tempo para o fade out completar
    }, 12000) // Tempo total da animação

    // Timeout de segurança para garantir que o callback seja chamado
    const safetyTimeout = setTimeout(() => {
      completeAnimation()
    }, 15000) // Tempo máximo que a animação pode durar

    // Cleanup
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current)
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
      clearInterval(messageInterval)
      clearTimeout(safetyTimeout)

      // Garantir que o callback seja chamado se o componente for desmontado
      completeAnimation()
    }
  }, [onComplete, messages])

  return (
    <motion.div
      className="fixed inset-0 bg-black flex flex-col items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: fadeOut ? 0 : 1 }}
      transition={{ duration: 1.5 }}
    >
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      <div className="relative z-10 text-center px-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1 }}
          className="mb-8"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">AstroConsciente</h2>
          <p className="text-lg text-white/80">Revelando os caminhos das estrelas</p>
        </motion.div>

        <motion.div
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          className="flex flex-col items-center"
        >
          <div className="relative w-24 h-24 mb-6">
            <div className="absolute inset-0 rounded-full bg-white/10 animate-ping" />
            <div className="absolute inset-2 rounded-full bg-white/20 animate-pulse" />
            <div className="absolute inset-4 rounded-full bg-white/30" />
            <div className="absolute inset-0 flex items-center justify-center">
              <Loader2 className="h-8 w-8 text-white animate-spin" />
            </div>
          </div>

          <p className="text-white text-lg">{message}</p>
        </motion.div>
      </div>
    </motion.div>
  )
}
