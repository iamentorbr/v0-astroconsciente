"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { StarBackground } from "@/components/star-background"

interface Slide {
  title: string
  subtitle: string
  description: string
  symbol: string
}

const slides: Slide[] = [
  {
    title: "Autoconhecimento",
    subtitle: "Jornada Interior",
    description:
      "O Processo AstroTerapêutico revela padrões arquetípicos do seu mapa astrológico, proporcionando insights profundos sobre sua essência e potenciais. Descubra como as energias planetárias influenciam sua personalidade e caminho de vida.",
    symbol: "☉",
  },
  {
    title: "Conexão Afetiva",
    subtitle: "Relacionamentos Conscientes",
    description:
      "Compreenda como os padrões astrológicos influenciam suas relações e aprenda a cultivar conexões mais autênticas e harmoniosas. Transforme seus relacionamentos através do autoconhecimento e da compreensão dos arquétipos que os regem.",
    symbol: "♀",
  },
  {
    title: "Manifestação",
    subtitle: "Criação Consciente",
    description:
      "Aprenda a co-criar com as energias cósmicas, alinhando suas intenções com os ciclos planetários para manifestar a realidade que deseja. Descubra como utilizar o timing cósmico a seu favor para realizar seus objetivos.",
    symbol: "♃",
  },
]

export function IntroSlides({ onComplete }: { onComplete: () => void }) {
  const [currentSlide, setCurrentSlide] = useState(0)

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1)
    } else {
      onComplete()
    }
  }

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1)
    }
  }

  return (
    <div className="fixed inset-0 bg-black flex flex-col items-center justify-center z-50">
      <StarBackground />

      <div className="absolute top-4 right-4 z-10">
        <Button variant="ghost" size="icon" onClick={onComplete} className="text-white hover:bg-white/10">
          <X className="h-6 w-6" />
          <span className="sr-only">Pular</span>
        </Button>
      </div>

      <div className="relative z-10 w-full max-w-4xl px-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="text-center text-white"
          >
            <div className="mb-8">
              <div className="text-6xl mb-4">{slides[currentSlide].symbol}</div>
              <h2 className="text-3xl md:text-4xl font-bold mb-2">{slides[currentSlide].title}</h2>
              <p className="text-xl text-white/80">{slides[currentSlide].subtitle}</p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg mb-8 max-w-2xl mx-auto">
              <p className="text-lg">{slides[currentSlide].description}</p>
            </div>

            <div className="flex justify-between items-center">
              <Button
                variant="ghost"
                onClick={prevSlide}
                disabled={currentSlide === 0}
                className="text-white disabled:opacity-30 hover:bg-white/10"
              >
                <ChevronLeft className="mr-2 h-4 w-4" />
                Anterior
              </Button>

              {currentSlide < slides.length - 1 ? (
                <Button
                  variant="outline"
                  onClick={nextSlide}
                  className="bg-white/10 hover:bg-white/20 text-white border-white/20"
                >
                  Próximo
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              ) : (
                <Button onClick={onComplete} className="bg-white text-black hover:bg-white/90">
                  Começar Jornada
                </Button>
              )}
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="flex justify-center mt-8 space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full ${index === currentSlide ? "bg-white" : "bg-white/30"}`}
              aria-label={`Ir para slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
