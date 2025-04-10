import Link from "next/link"
import { ArrowLeft } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function SobrePage() {
  return (
    <div className="container max-w-3xl py-12">
      <Link
        href="/"
        className="inline-flex items-center mb-6 text-sm font-medium text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="mr-1 h-4 w-4" />
        Voltar ao início
      </Link>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Sobre o AstroConsciente</CardTitle>
          <CardDescription>Entenda nossa abordagem e metodologia</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-2">Nossa Abordagem</h3>
            <p className="text-muted-foreground">
              O AstroConsciente combina astrologia tradicional com psicologia moderna para criar uma abordagem
              terapêutica personalizada. Acreditamos que o mapa astrológico revela padrões arquetípicos que influenciam
              nossa psique e comportamento, oferecendo insights valiosos para o autoconhecimento e desenvolvimento
              pessoal.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-2">O Processo</h3>
            <div className="space-y-4">
              <div className="bg-muted p-4 rounded-lg">
                <h4 className="font-medium mb-1">1. Mapa Astrológico</h4>
                <p className="text-sm text-muted-foreground">
                  Coletamos os dados do seu mapa astrológico para entender os arquétipos e energias que influenciam sua
                  vida.
                </p>
              </div>

              <div className="bg-muted p-4 rounded-lg">
                <h4 className="font-medium mb-1">2. Questionário Personalizado</h4>
                <p className="text-sm text-muted-foreground">
                  Através de quatro séries de perguntas, exploramos como esses arquétipos se manifestam em diferentes
                  áreas da sua vida.
                </p>
              </div>

              <div className="bg-muted p-4 rounded-lg">
                <h4 className="font-medium mb-1">3. Orientação Terapêutica</h4>
                <p className="text-sm text-muted-foreground">
                  Combinamos a análise do mapa com suas respostas para criar uma orientação terapêutica personalizada.
                </p>
              </div>

              <div className="bg-muted p-4 rounded-lg">
                <h4 className="font-medium mb-1">4. Protocolo AstroTerapêutico</h4>
                <p className="text-sm text-muted-foreground">
                  Para quem deseja se aprofundar, oferecemos um protocolo detalhado com práticas, reflexões e
                  exercícios.
                </p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-2">Base Teórica</h3>
            <p className="text-muted-foreground mb-4">
              Nossa metodologia se baseia na astrologia psicológica, na psicologia junguiana e em abordagens
              terapêuticas contemporâneas. Integramos conceitos de:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
              <li>Astrologia arquetípica de Dane Rudhyar e Richard Tarnas</li>
              <li>Psicologia analítica de Carl Jung</li>
              <li>Abordagens somáticas e mindfulness</li>
              <li>Técnicas de desenvolvimento pessoal baseadas em evidências</li>
            </ul>
          </div>

          <div className="pt-4">
            <Link href="/mapa-astrologico">
              <Button>Iniciar minha jornada</Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
