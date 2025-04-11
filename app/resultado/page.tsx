"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Loader2, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { generateAstroTherapeuticProtocol } from "@/lib/astro-ai"
import { generateProtocol } from "@/lib/protocol-service"
import { ProtocolViewer } from "@/components/protocol-viewer"
import type { UserProtocol } from "@/lib/protocol-types"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface MapaAstrologico {
  nome: string
  dataNascimento: string
  horaNascimento: string
  localNascimento: string
  sol: string
  ascendente: string
  lua: string
}

interface Questionario {
  [key: string]: string
}

interface ProtocoloOpcao {
  id: string
  titulo: string
  descricao: string
  preco: number
}

interface Usuario {
  nome: string
  email: string
  autenticado: boolean
}

export default function ResultadoPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [mapa, setMapa] = useState<MapaAstrologico | null>(null)
  const [respostas, setRespostas] = useState<Record<number, Questionario>>({})
  const [orientacao, setOrientacao] = useState<string>("")
  const [protocolo, setProtocolo] = useState<string>("")
  const [selectedProtocolo, setSelectedProtocolo] = useState<string | null>(null)
  const [previewProtocol, setPreviewProtocol] = useState<UserProtocol | null>(null)
  const [isProcessingPayment, setIsProcessingPayment] = useState(false)
  const [showLoginDialog, setShowLoginDialog] = useState(false)
  const [usuario, setUsuario] = useState<Usuario | null>(null)
  const [mounted, setMounted] = useState(false)

  // Verificar se o componente está montado (cliente)
  useEffect(() => {
    setMounted(true)
  }, [])

  // Opções de protocolo disponíveis para compra
  const protocoloOpcoes: ProtocoloOpcao[] = [
    {
      id: "autoconhecimento",
      titulo: "PROTOCOLO PARA AUTOCONHECIMENTO",
      descricao:
        "Aprofunde o conhecimento sobre si mesmo através de práticas e reflexões baseadas no seu mapa astrológico.",
      preco: 29.9,
    },
    {
      id: "manifestacao",
      titulo: "PROTOCOLO PARA MANIFESTAÇÃO CONSCIENTE",
      descricao:
        "Aprenda a utilizar as energias do seu mapa astrológico para manifestar seus objetivos de forma alinhada.",
      preco: 29.9,
    },
    {
      id: "emocional",
      titulo: "PROTOCOLO EMOCIONAL",
      descricao: "Trabalhe seus padrões emocionais e desenvolva maior equilíbrio através da compreensão astrológica.",
      preco: 29.9,
    },
    {
      id: "espiritual",
      titulo: "PROTOCOLO ESPIRITUAL",
      descricao: "Explore a dimensão espiritual do seu mapa astrológico e desenvolva práticas para conexão interior.",
      preco: 29.9,
    },
  ]

  useEffect(() => {
    // Não executar no servidor
    if (!mounted) return

    // Verificar se o usuário está autenticado
    try {
      const usuarioData = localStorage.getItem("usuario")
      if (usuarioData) {
        const usuarioParsed = JSON.parse(usuarioData)
        if (usuarioParsed.autenticado) {
          setUsuario(usuarioParsed)
        }
      }
    } catch (error) {
      console.error("Erro ao verificar autenticação:", error)
    }

    // Função para carregar os dados
    const loadData = () => {
      try {
        // Carregar dados do mapa astrológico
        const mapaData = localStorage.getItem("mapaAstrologico")
        if (!mapaData) {
          router.push("/mapa-astrologico")
          return
        }

        // Carregar respostas dos questionários
        const questionarios: Record<number, Questionario> = {}
        let allQuestionnairesCompleted = true

        for (let i = 1; i <= 4; i++) {
          const questionarioData = localStorage.getItem(`questionario${i}`)
          if (!questionarioData) {
            allQuestionnairesCompleted = false
            break
          }
          questionarios[i] = JSON.parse(questionarioData)
        }

        if (!allQuestionnairesCompleted) {
          router.push("/questionario/1")
          return
        }

        // Definir os dados do mapa e respostas
        const parsedMapa = JSON.parse(mapaData)
        setMapa(parsedMapa)
        setRespostas(questionarios)

        // Gerar orientação terapêutica
        const orientacaoGerada = gerarOrientacaoTerapeutica(parsedMapa, questionarios)
        setOrientacao(orientacaoGerada)
        setIsLoading(false)
      } catch (error) {
        console.error("Erro ao carregar dados:", error)
        // Em caso de erro, tentar novamente após um breve intervalo
        setTimeout(loadData, 1000)
      }
    }

    // Iniciar o carregamento dos dados
    loadData()
  }, [router, mounted])

  const handleSelectProtocolo = async (id: string) => {
    setSelectedProtocolo(id)

    // Gerar preview do protocolo
    if (mapa) {
      try {
        const baseProtocol = generateProtocol(id as any, mapa)
        const previewProtocol: UserProtocol = {
          ...baseProtocol,
          purchaseDate: "",
          unlockLevel: "preview",
        }
        setPreviewProtocol(previewProtocol)
      } catch (error) {
        console.error("Erro ao gerar preview do protocolo:", error)
      }
    }
  }

  const handleComprarProtocolo = async () => {
    if (!selectedProtocolo || !mapa) return

    // Verificar se o usuário está autenticado
    if (!usuario) {
      setShowLoginDialog(true)
      return
    }

    setIsProcessingPayment(true)

    try {
      // Simulação de processamento de pagamento
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Após o pagamento bem-sucedido, gerar o protocolo
      const protocoloGerado = await generateAstroTherapeuticProtocol(mapa, respostas, orientacao, selectedProtocolo)

      // Gerar o protocolo completo
      const fullProtocol = generateProtocol(selectedProtocolo as any, mapa)

      // Salvar o protocolo (em uma implementação real, isso seria feito no backend)
      // Aqui estamos apenas simulando para demonstração
      if (mounted) {
        try {
          const protocolosUsuario = localStorage.getItem("protocolosUsuario") || "[]"
          const protocolos = JSON.parse(protocolosUsuario)
          protocolos.push({
            ...fullProtocol,
            purchaseDate: new Date().toLocaleDateString(),
            unlockLevel: "partial",
          })
          localStorage.setItem("protocolosUsuario", JSON.stringify(protocolos))
        } catch (error) {
          console.error("Erro ao salvar protocolo:", error)
        }
      }

      setProtocolo(protocoloGerado)

      // Redirecionar para a página de protocolos
      router.push("/meus-protocolos")
    } catch (error) {
      console.error("Erro ao processar pagamento:", error)
    } finally {
      setIsProcessingPayment(false)
    }
  }

  const handleLoginRedirect = () => {
    // Salvar o estado atual para retornar após o login
    if (mounted) {
      try {
        localStorage.setItem("redirectAfterLogin", "/resultado")
      } catch (error) {
        console.error("Erro ao salvar redirecionamento:", error)
      }
    }
    router.push("/auth/login")
  }

  const handleCadastroRedirect = () => {
    // Salvar o estado atual para retornar após o cadastro
    if (mounted) {
      try {
        localStorage.setItem("redirectAfterLogin", "/resultado")
      } catch (error) {
        console.error("Erro ao salvar redirecionamento:", error)
      }
    }
    router.push("/auth/cadastro")
  }

  // Renderização inicial segura para SSR
  if (!mounted) {
    return (
      <div className="container py-12">
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
      <div className="container py-12">
        <Card className="w-full max-w-4xl mx-auto">
          <CardContent className="flex flex-col items-center justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-primary mb-2" />
            <p className="text-sm text-muted-foreground">Finalizando sua orientação...</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container py-12">
      {usuario && (
        <div className="w-full max-w-4xl mx-auto flex justify-end mb-4">
          <Button variant="outline" className="flex items-center gap-2" asChild>
            <Link href="/meus-protocolos">
              <User className="h-4 w-4" />
              <span>Meus Protocolos</span>
            </Link>
          </Button>
        </div>
      )}

      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl">Sua Orientação AstroTerapêutica</CardTitle>
          <CardDescription>Baseada no seu mapa astrológico e nas suas respostas ao questionário</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="orientacao">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="orientacao">Orientação Terapêutica</TabsTrigger>
              <TabsTrigger value="protocolo" disabled={!previewProtocol}>
                Protocolo Detalhado
              </TabsTrigger>
            </TabsList>
            <TabsContent value="orientacao" className="pt-4">
              <div className="space-y-4">
                <div className="bg-muted p-4 rounded-lg">
                  <h3 className="font-medium mb-2">Seu Mapa Astrológico</h3>
                  <div className="grid grid-cols-3 gap-2 text-sm">
                    <div>
                      <span className="font-medium">Sol:</span> {mapa?.sol}
                    </div>
                    <div>
                      <span className="font-medium">Ascendente:</span> {mapa?.ascendente}
                    </div>
                    <div>
                      <span className="font-medium">Lua:</span> {mapa?.lua}
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Orientação Terapêutica Personalizada</h3>
                  <div className="prose prose-sm max-w-none">
                    {orientacao.split("\n\n").map((paragraph, index) => (
                      <p key={index}>{paragraph}</p>
                    ))}
                  </div>
                </div>

                {!protocolo && (
                  <div className="bg-primary/5 p-4 rounded-lg mt-6">
                    <h3 className="text-lg font-medium mb-4">
                      Aprofunde sua jornada com um Protocolo AstroTerapêutico
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      {protocoloOpcoes.map((opcao) => (
                        <div
                          key={opcao.id}
                          className={`border rounded-lg p-4 cursor-pointer transition-all ${
                            selectedProtocolo === opcao.id
                              ? "border-primary bg-primary/5"
                              : "border-border hover:border-primary/50"
                          }`}
                          onClick={() => handleSelectProtocolo(opcao.id)}
                        >
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-medium">{opcao.titulo}</h4>
                            <div className="text-lg font-bold">R$ {opcao.preco.toFixed(2).replace(".", ",")}</div>
                          </div>
                          <p className="text-sm text-muted-foreground">{opcao.descricao}</p>
                        </div>
                      ))}
                    </div>

                    <Button
                      onClick={handleComprarProtocolo}
                      disabled={isProcessingPayment || !selectedProtocolo}
                      className="w-full"
                    >
                      {isProcessingPayment ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Processando pagamento...
                        </>
                      ) : (
                        <>
                          Comprar Protocolo
                          {selectedProtocolo && ` - R$ 29,90`}
                        </>
                      )}
                    </Button>
                  </div>
                )}
              </div>
            </TabsContent>
            <TabsContent value="protocolo" className="pt-4">
              {previewProtocol && <ProtocolViewer protocol={previewProtocol} onPurchase={handleComprarProtocolo} />}
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={() => router.push("/")}>
            Voltar ao início
          </Button>
        </CardFooter>
      </Card>

      <Dialog open={showLoginDialog} onOpenChange={setShowLoginDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Faça login para continuar</DialogTitle>
            <DialogDescription>Para adquirir um protocolo, você precisa estar logado em sua conta.</DialogDescription>
          </DialogHeader>
          <div className="flex flex-col space-y-4 py-4">
            <p className="text-sm text-muted-foreground">
              Faça login para acessar seus protocolos ou crie uma nova conta para começar.
            </p>
          </div>
          <DialogFooter className="flex flex-col sm:flex-row gap-2">
            <Button variant="outline" onClick={handleCadastroRedirect} className="sm:w-full">
              Criar conta
            </Button>
            <Button onClick={handleLoginRedirect} className="sm:w-full">
              Fazer login
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

// Função para gerar orientação terapêutica (simulada)
function gerarOrientacaoTerapeutica(mapa: MapaAstrologico, respostas: Record<number, Questionario>): string {
  // Esta é uma função simulada que seria substituída pela integração com IA
  return `Com base no seu mapa astrológico e nas suas respostas, identificamos padrões importantes que podem orientar seu desenvolvimento pessoal.

Seu Sol em ${mapa.sol} indica uma essência vital que busca ${getSignoQualidade(mapa.sol)}, enquanto seu Ascendente em ${mapa.ascendente} mostra que você se apresenta ao mundo com ${getSignoQualidade(mapa.ascendente)}. Sua Lua em ${mapa.lua} revela necessidades emocionais ligadas a ${getSignoQualidade(mapa.lua)}.

Suas respostas ao questionário indicam uma tendência a ${getRespostaTendencia(respostas)} nos aspectos emocionais, enquanto nos aspectos mentais você demonstra ${getRespostaTendencia(respostas, 2)}. Nos relacionamentos, percebemos padrões de ${getRespostaTendencia(respostas, 3)}, e sua conexão espiritual se manifesta principalmente através de ${getRespostaTendencia(respostas, 4)}.

Recomendamos que você trabalhe o equilíbrio entre ${mapa.sol} e ${mapa.lua}, buscando integrar a expressão consciente com as necessidades emocionais inconscientes. Práticas de autoconhecimento que envolvam ${getRecomendacaoPratica(mapa)} podem ser especialmente benéficas para você neste momento.

Observe como os padrões identificados se manifestam em sua vida cotidiana e experimente novas formas de responder a situações desafiadoras, especialmente aquelas relacionadas a ${getDesafioArea(mapa, respostas)}.`
}

// Funções auxiliares para a geração de texto
function getSignoQualidade(signo: string): string {
  const qualidades: Record<string, string> = {
    Áries: "expressão direta, iniciativa e coragem",
    Touro: "estabilidade, praticidade e apreciação sensorial",
    Gêmeos: "comunicação, curiosidade e adaptabilidade",
    Câncer: "nutrição emocional, proteção e memória",
    Leão: "expressão criativa, liderança e reconhecimento",
    Virgem: "análise, aperfeiçoamento e serviço",
    Libra: "harmonia, equilíbrio e relacionamentos",
    Escorpião: "transformação, profundidade e intensidade",
    Sagitário: "expansão, significado e liberdade",
    Capricórnio: "estrutura, responsabilidade e realização",
    Aquário: "inovação, comunidade e originalidade",
    Peixes: "compaixão, transcendência e intuição",
  }

  return qualidades[signo] || "qualidades diversas"
}

function getRespostaTendencia(respostas: Record<number, Questionario>, grupo = 1): string {
  // Simulação - seria substituída por análise real das respostas
  const tendencias = [
    "processar internamente antes de expressar",
    "buscar soluções práticas e concretas",
    "valorizar a conexão emocional profunda",
    "buscar significado através de experiências pessoais",
  ]

  return tendencias[grupo - 1]
}

function getRecomendacaoPratica(mapa: MapaAstrologico): string {
  // Baseado no elemento predominante
  const elementos: Record<string, string> = {
    Áries: "fogo",
    Leão: "fogo",
    Sagitário: "fogo",
    Touro: "terra",
    Virgem: "terra",
    Capricórnio: "terra",
    Gêmeos: "ar",
    Libra: "ar",
    Aquário: "ar",
    Câncer: "água",
    Escorpião: "água",
    Peixes: "água",
  }

  const solElemento = elementos[mapa.sol] || ""
  const luaElemento = elementos[mapa.lua] || ""
  const ascElemento = elementos[mapa.ascendente] || ""

  if (solElemento === "fogo" || luaElemento === "fogo" || ascElemento === "fogo") {
    return "movimento físico, expressão criativa e atividades que canalizem sua energia"
  } else if (solElemento === "terra" || luaElemento === "terra" || ascElemento === "terra") {
    return "conexão com a natureza, trabalhos manuais e estabelecimento de rotinas saudáveis"
  } else if (solElemento === "ar" || luaElemento === "ar" || ascElemento === "ar") {
    return "escrita, diálogo terapêutico e exploração de novas ideias"
  } else {
    return "meditação, trabalho com sonhos e expressão artística fluida"
  }
}

function getDesafioArea(mapa: MapaAstrologico, respostas: Record<number, Questionario>): string {
  // Simulação - seria substituída por análise real
  const areas = [
    "estabelecer limites saudáveis",
    "expressar suas necessidades emocionais",
    "equilibrar racionalidade e intuição",
    "encontrar estabilidade em meio a mudanças",
  ]

  // Simplificação para demonstração
  const index = ((mapa.sol || "").length + (mapa.lua || "").length) % 4
  return areas[index]
}
