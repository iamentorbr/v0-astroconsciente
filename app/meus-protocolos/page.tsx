"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Download, ArrowLeft, LogOut } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface Usuario {
  nome: string
  email: string
  autenticado: boolean
}

interface Protocolo {
  id: string
  titulo: string
  tipo: string
  dataCompra: string
  conteudo: string
}

export default function MeusProtocolosPage() {
  const router = useRouter()
  const [usuario, setUsuario] = useState<Usuario | null>(null)
  const [protocolos, setProtocolos] = useState<Protocolo[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Verificar se o usuário está autenticado
    const usuarioData = localStorage.getItem("usuario")
    if (!usuarioData) {
      router.push("/auth/login")
      return
    }

    try {
      const usuarioParsed = JSON.parse(usuarioData)
      if (!usuarioParsed.autenticado) {
        router.push("/auth/login")
        return
      }

      setUsuario(usuarioParsed)

      // Carregar protocolos do usuário (simulado)
      // Em uma implementação real, isso seria uma chamada à API
      const protocolosSimulados: Protocolo[] = [
        {
          id: "proto1",
          titulo: "PROTOCOLO PARA AUTOCONHECIMENTO",
          tipo: "autoconhecimento",
          dataCompra: "10/04/2023",
          conteudo:
            "# PROTOCOLO PARA AUTOCONHECIMENTO\n\n## Jornada de Autodescoberta Astrológica\n\n## PARA: " +
            usuarioParsed.nome +
            "\n\n### BASEADO NO MAPA ASTROLÓGICO\n- Sol em Áries\n- Lua em Câncer\n- Ascendente em Libra\n\n## INTRODUÇÃO\n\nEste protocolo foi desenvolvido para aprofundar seu autoconhecimento através da compreensão dos arquétipos astrológicos presentes em seu mapa natal. Através de práticas reflexivas e exercícios específicos, você será guiado em uma jornada de descoberta pessoal que revela padrões, potenciais e desafios únicos da sua configuração astrológica.\n\n## TEMAS CENTRAIS PARA TRABALHO\n\n1. **Integração Áries-Câncer**\n   A dinâmica entre seu Sol em Áries e sua Lua em Câncer revela uma tensão criativa entre expressão direta, iniciativa e coragem e nutrição emocional, proteção e memória. Este é um eixo central para seu desenvolvimento pessoal.\n\n2. **Expressão Autêntica através do Ascendente**\n   Seu Ascendente em Libra representa sua interface com o mundo. Trabalhar com essa energia permite uma expressão mais autêntica e consciente.\n\n3. **Padrões Emocionais Recorrentes**\n   Suas respostas indicam padrões emocionais relacionados a processar internamente antes de expressar. Estes padrões têm raízes profundas que podem ser exploradas e transformadas.",
        },
        {
          id: "proto2",
          titulo: "PROTOCOLO EMOCIONAL",
          tipo: "emocional",
          dataCompra: "15/04/2023",
          conteudo:
            "# PROTOCOLO EMOCIONAL\n\n## Equilibrando o Mundo Interior através da Astrologia\n\n## PARA: " +
            usuarioParsed.nome +
            "\n\n### BASEADO NO MAPA ASTROLÓGICO\n- Sol em Áries\n- Lua em Câncer\n- Ascendente em Libra\n\n## INTRODUÇÃO\n\nEste protocolo foi desenhado para trabalhar especificamente com seus padrões emocionais, utilizando a sabedoria astrológica como mapa para a compreensão e transformação. Focando especialmente nas posições lunares e aspectos relacionados às águas emocionais do seu mapa, este trabalho visa promover maior equilíbrio e fluidez emocional.\n\n## TEMAS CENTRAIS PARA TRABALHO\n\n1. **Compreensão da Lua em Câncer**\n   Sua Lua em Câncer indica uma natureza emocional profunda, sensível e receptiva. Este posicionamento traz uma forte conexão com o passado, memórias e necessidade de segurança emocional.\n\n2. **Equilíbrio entre Ação e Sensibilidade**\n   A tensão entre seu Sol em Áries (ação, iniciativa) e sua Lua em Câncer (sensibilidade, receptividade) cria um campo dinâmico para exploração e integração.\n\n3. **Harmonização através do Ascendente em Libra**\n   Seu Ascendente em Libra oferece um caminho para equilibrar estas energias através da busca por harmonia, equilíbrio e consideração pelos outros.",
        },
      ]

      setProtocolos(protocolosSimulados)
      setIsLoading(false)
    } catch (error) {
      console.error("Erro ao carregar dados do usuário:", error)
      router.push("/auth/login")
    }
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("usuario")
    router.push("/")
  }

  const handleDownloadPDF = (protocolo: Protocolo) => {
    // Implementação para download do PDF
    alert(
      `Funcionalidade de download do protocolo "${protocolo.titulo}" será implementada com a integração de geração de PDF`,
    )
  }

  if (isLoading) {
    return (
      <div className="container py-12 flex items-center justify-center min-h-screen">
        <Card className="w-full max-w-4xl">
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

      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl">Meus Protocolos</CardTitle>
          <CardDescription>Acesse os protocolos AstroTerapêuticos que você adquiriu</CardDescription>
        </CardHeader>
        <CardContent>
          {protocolos.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground mb-4">Você ainda não adquiriu nenhum protocolo.</p>
              <Link href="/mapa-astrologico">
                <Button>Iniciar Jornada AstroTerapêutica</Button>
              </Link>
            </div>
          ) : (
            <Tabs defaultValue={protocolos[0].id}>
              <TabsList className="grid grid-cols-2 mb-4">
                {protocolos.map((protocolo) => (
                  <TabsTrigger key={protocolo.id} value={protocolo.id}>
                    {protocolo.titulo}
                  </TabsTrigger>
                ))}
              </TabsList>

              {protocolos.map((protocolo) => (
                <TabsContent key={protocolo.id} value={protocolo.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-medium">{protocolo.titulo}</h3>
                      <p className="text-sm text-muted-foreground">Adquirido em: {protocolo.dataCompra}</p>
                    </div>
                    <Button size="sm" onClick={() => handleDownloadPDF(protocolo)}>
                      <Download className="h-4 w-4 mr-2" />
                      Baixar PDF
                    </Button>
                  </div>

                  <div className="prose prose-sm max-w-none">
                    {protocolo.conteudo.split("\n\n").map((paragraph, index) => (
                      <p key={index}>{paragraph}</p>
                    ))}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          )}
        </CardContent>
        <CardFooter>
          <div className="w-full text-center">
            <Link href="/mapa-astrologico">
              <Button variant="outline">Iniciar Nova Jornada AstroTerapêutica</Button>
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
