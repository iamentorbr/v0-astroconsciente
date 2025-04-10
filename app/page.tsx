"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowRight, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { IntroSlides } from "@/components/intro-slides"

export default function Home() {
  const [showIntro, setShowIntro] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userName, setUserName] = useState("")

  useEffect(() => {
    // Verificar se o usuário já viu a introdução
    const introViewed = localStorage.getItem("introViewed")
    if (introViewed === "true") {
      setShowIntro(false)
    }

    // Verificar se o usuário está autenticado
    const usuarioData = localStorage.getItem("usuario")
    if (usuarioData) {
      try {
        const usuario = JSON.parse(usuarioData)
        if (usuario.autenticado) {
          setIsAuthenticated(true)
          setUserName(usuario.nome)
        }
      } catch (error) {
        console.error("Erro ao verificar autenticação:", error)
      }
    }
  }, [])

  const handleIntroComplete = () => {
    setShowIntro(false)
    localStorage.setItem("introViewed", "true")
  }

  if (showIntro) {
    return <IntroSlides onComplete={handleIntroComplete} />
  }

  return (
    <div className="container flex flex-col items-center justify-center min-h-screen py-12 space-y-8">
      {isAuthenticated && (
        <div className="w-full max-w-4xl flex justify-end mb-4">
          <Link href="/meus-protocolos">
            <Button variant="outline" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span>Olá, {userName.split(" ")[0]}</span>
            </Button>
          </Link>
        </div>
      )}

      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">AstroConsciente</h1>
        <p className="max-w-[700px] text-lg text-muted-foreground">
          Descubra orientações terapêuticas personalizadas baseadas no seu mapa astrológico e respostas pessoais.
        </p>
      </div>

      <div className="grid w-full max-w-4xl gap-6 sm:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Iniciar Jornada</CardTitle>
            <CardDescription>Comece sua jornada de autoconhecimento astrológico</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Insira os dados do seu mapa astrológico e responda a perguntas para receber orientações terapêuticas
              personalizadas.
            </p>
          </CardContent>
          <CardFooter>
            <Link href="/mapa-astrologico" className="w-full">
              <Button className="w-full">
                Começar
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Sobre o Processo</CardTitle>
            <CardDescription>Entenda como funciona nossa abordagem</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Combinamos astrologia com psicologia para criar protocolos terapêuticos personalizados que ajudam no seu
              desenvolvimento pessoal.
            </p>
          </CardContent>
          <CardFooter>
            <Link href="/sobre" className="w-full">
              <Button variant="outline" className="w-full">
                Saiba mais
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>

      {!isAuthenticated && (
        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground mb-4">Já possui protocolos adquiridos?</p>
          <div className="flex gap-4 justify-center">
            <Link href="/auth/login">
              <Button variant="outline">Fazer Login</Button>
            </Link>
            <Link href="/auth/cadastro">
              <Button variant="secondary">Criar Conta</Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}
