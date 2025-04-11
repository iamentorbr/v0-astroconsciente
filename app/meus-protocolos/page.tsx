"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, LogOut } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProtocolViewer } from "@/components/protocol-viewer"
import { type UserProtocol, calculateUnlockLevel } from "@/lib/protocol-types"

interface Usuario {
  nome: string
  email: string
  autenticado: boolean
}

export default function MeusProtocolosPage() {
  const router = useRouter()
  const [usuario, setUsuario] = useState<Usuario | null>(null)
  const [protocolos, setProtocolos] = useState<UserProtocol[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [mounted, setMounted] = useState(false)

  // Verificar se o componente está montado (cliente)
  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    // Não executar no servidor
    if (!mounted) return

    // Função para carregar dados do usuário e protocolos
    const loadUserData = () => {
      try {
        const usuarioData = localStorage.getItem("usuario")
        if (!usuarioData) {
          router.push("/auth/login")
          return
        }

        const usuarioParsed = JSON.parse(usuarioData)
        if (!usuarioParsed.autenticado) {
          router.push("/auth/login")
          return
        }

        setUsuario(usuarioParsed)

        // Tentar carregar protocolos salvos
        const protocolosData = localStorage.getItem("protocolosUsuario")
        if (protocolosData) {
          try {
            const parsedProtocolos = JSON.parse(protocolosData)
            if (Array.isArray(parsedProtocolos) && parsedProtocolos.length > 0) {
              // Calcular o nível de desbloqueio para cada protocolo
              const protocolosAtualizados = parsedProtocolos.map((protocolo) => ({
                ...protocolo,
                unlockLevel: calculateUnlockLevel(protocolo.purchaseDate),
              }))
              setProtocolos(protocolosAtualizados)
              setIsLoading(false)
              return
            }
          } catch (e) {
            console.error("Erro ao processar protocolos salvos:", e)
          }
        }

        // Se não houver protocolos salvos ou ocorrer um erro, usar dados simulados
        const protocolosSimulados: UserProtocol[] = [
          {
            id: "proto1",
            type: "autoconhecimento",
            title: "PROTOCOLO PARA AUTOCONHECIMENTO",
            subtitle: "Jornada de Autodescoberta Astrológica",
            description:
              "Este protocolo foi desenvolvido para aprofundar seu autoconhecimento através da compreensão dos arquétipos astrológicos presentes em seu mapa natal. Através de práticas reflexivas e exercícios específicos, você será guiado em uma jornada de descoberta pessoal que revela padrões, potenciais e desafios únicos da sua configuração astrológica.",
            purchaseDate: "10/04/2023",
            unlockLevel: "full",
            days: generateSampleDays("autoconhecimento"),
          },
          {
            id: "proto2",
            type: "emocional",
            title: "PROTOCOLO EMOCIONAL",
            subtitle: "Equilibrando o Mundo Interior através da Astrologia",
            description:
              "Este protocolo foi desenhado para trabalhar especificamente com seus padrões emocionais, utilizando a sabedoria astrológica como mapa para a compreensão e transformação. Focando especialmente nas posições lunares e aspectos relacionados às águas emocionais do seu mapa, este trabalho visa promover maior equilíbrio e fluidez emocional.",
            purchaseDate: new Date().toLocaleDateString(), // Comprado hoje para demonstrar desbloqueio parcial
            unlockLevel: "partial",
            days: generateSampleDays("emocional"),
          },
        ]

        // Calcular o nível de desbloqueio para cada protocolo
        const protocolosAtualizados = protocolosSimulados.map((protocolo) => ({
          ...protocolo,
          unlockLevel: calculateUnlockLevel(protocolo.purchaseDate),
        }))

        setProtocolos(protocolosAtualizados)
        setIsLoading(false)
      } catch (error) {
        console.error("Erro ao carregar dados do usuário:", error)
        router.push("/auth/login")
      }
    }

    loadUserData()
  }, [router, mounted])

  const handleLogout = () => {
    if (mounted) {
      localStorage.removeItem("usuario")
    }
    router.push("/")
  }

  // Renderização inicial segura para SSR
  if (!mounted) {
    return (
      <div className="container py-12 flex items-center justify-center min-h-screen">
        <Card className="w-full max-w-4xl mx-auto">
          <CardContent className="flex flex-col items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            <p className="text-sm text-muted-foreground mt-4">Carregando...</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="container py-12 flex items-center justify-center min-h-screen">
        <Card className="w-full max-w-4xl mx-auto">
          <CardContent className="flex flex-col items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            <p className="text-sm text-muted-foreground mt-4">Carregando seus protocolos...</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container py-12">
      <div className="flex justify-between items-center mb-8">
        <Link
          href="/"
          className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="mr-1 h-4 w-4" />
          Voltar ao início
        </Link>

        <div className="flex items-center gap-4">
          <span className="text-sm text-muted-foreground">Olá, {usuario?.nome}</span>
          <Button variant="outline" size="sm" onClick={handleLogout}>
            <LogOut className="h-4 w-4 mr-2" />
            Sair
          </Button>
        </div>
      </div>

      {protocolos.length === 0 ? (
        <Card className="w-full max-w-4xl mx-auto">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <h3 className="text-xl font-medium mb-4">Você ainda não adquiriu nenhum protocolo</h3>
            <p className="text-muted-foreground mb-6 text-center max-w-md">
              Inicie sua jornada astrológica e adquira protocolos personalizados para seu desenvolvimento pessoal.
            </p>
            <Link href="/mapa-astrologico">
              <Button>Iniciar Jornada AstroTerapêutica</Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="w-full max-w-4xl mx-auto">
          <Tabs defaultValue={protocolos[0]?.id}>
            <TabsList className="mb-6">
              {protocolos.map((protocolo) => (
                <TabsTrigger key={protocolo.id} value={protocolo.id}>
                  {protocolo.title}
                </TabsTrigger>
              ))}
            </TabsList>

            {protocolos.map((protocolo) => (
              <TabsContent key={protocolo.id} value={protocolo.id}>
                <ProtocolViewer protocol={protocolo} />
              </TabsContent>
            ))}
          </Tabs>

          <div className="mt-8 text-center">
            <Link href="/mapa-astrologico">
              <Button variant="outline">Iniciar Nova Jornada AstroTerapêutica</Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}

// Função auxiliar para gerar dias de amostra para os protocolos
function generateSampleDays(type: "autoconhecimento" | "manifestacao" | "emocional" | "espiritual") {
  const days = []

  for (let i = 1; i <= 21; i++) {
    let title = ""
    let description = ""
    let content = ""

    // Determinar semana
    const week = Math.ceil(i / 7)

    switch (type) {
      case "autoconhecimento":
        if (week === 1) {
          title = `Explorando Padrões Astrológicos - Dia ${i}`
          description = "Exploração dos elementos fundamentais do seu mapa astrológico."
          content =
            "Neste dia da jornada de autoconhecimento, exploramos aspectos do seu mapa astrológico e como eles se manifestam em sua vida cotidiana."
        } else if (week === 2) {
          title = `Integrando Polaridades - Dia ${i}`
          description = "Trabalho com aspectos complementares do seu mapa astrológico."
          content =
            "Nesta fase da jornada, focamos na integração de energias aparentemente opostas em seu mapa, buscando maior equilíbrio e completude."
        } else {
          title = `Transformação Consciente - Dia ${i}`
          description = "Aplicação prática dos insights astrológicos para transformação pessoal."
          content =
            "Na fase final da jornada, trabalhamos na aplicação prática dos insights obtidos, transformando padrões limitantes e potencializando seus dons naturais."
        }
        break

      case "emocional":
        if (week === 1) {
          title = `Consciência Emocional - Dia ${i}`
          description = "Desenvolvimento de consciência sobre seus padrões emocionais."
          content =
            "Neste dia, trabalhamos no desenvolvimento de consciência sobre seus padrões emocionais, observando como eles se manifestam em diferentes contextos."
        } else if (week === 2) {
          title = `Transformação Emocional - Dia ${i}`
          description = "Práticas para transformar padrões emocionais limitantes."
          content =
            "Nesta fase, focamos em práticas específicas para transformar padrões emocionais que não servem mais ao seu crescimento, utilizando a sabedoria do seu mapa astrológico."
        } else {
          title = `Fluidez Emocional - Dia ${i}`
          description = "Cultivo de maior fluidez e resiliência emocional."
          content =
            "Na fase final, integramos as práticas e insights para desenvolver maior fluidez, resiliência e sabedoria emocional, em harmonia com seu mapa astrológico."
        }
        break

      default:
        title = `Dia ${i}`
        description = "Atividades do dia"
        content = "Conteúdo do dia"
    }

    // Criar ações genéricas
    const actions = [
      {
        type: "reflection",
        title: "Reflexão Diária",
        description: "Momento de introspecção e observação",
        duration: "15 minutos",
        instructions:
          "Encontre um lugar tranquilo e reflita sobre como os temas trabalhados hoje se manifestam em sua vida. Anote insights e observações em seu diário.",
      },
      {
        type: "practice",
        title: "Prática de Integração",
        description: "Atividade para incorporar os aprendizados do dia",
        duration: "20 minutos",
        instructions:
          "Escolha uma atividade que ajude a integrar os aprendizados do dia, alinhada com as energias do seu mapa astrológico. Pode ser uma prática criativa, física, intelectual ou contemplativa.",
      },
    ]

    // Adicionar flag de preview para os 3 primeiros dias
    const isPreview = i <= 3

    days.push({
      day: i,
      title,
      description,
      content,
      actions,
      isPreview,
    })
  }

  return days
}
