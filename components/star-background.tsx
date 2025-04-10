"use client"

import { useEffect, useRef } from "react"

interface Star {
  x: number
  y: number
  size: number
  opacity: number
  speed: number
}

export function StarBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const starsRef = useRef<Star[]>([])
  const requestRef = useRef<number>()

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

    // Cleanup
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current)
      }
    }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
}
