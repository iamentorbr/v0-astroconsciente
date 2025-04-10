"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Progress } from "@/components/ui/progress"

// Definição dos questionários
const questionarios = {
  1: {
    titulo: "Aspectos Emocionais",
    descricao: "Responda às perguntas sobre seus padrões emocionais",
    perguntas: [
      {
        id: "emocional1",
        pergunta: "Como você lida com suas emoções mais intensas?",
        opcoes: [
          { valor: "a", texto: "Expresso abertamente, às vezes de forma explosiva" },
          { valor: "b", texto: "Guardo para mim e processo internamente" },
          { valor: "c", texto: "Analiso racionalmente antes de expressar" },
          { valor: "d", texto: "Busco compartilhar com pessoas próximas" },
        ],
      },
      {
        id: "emocional2",
        pergunta: "Quando se sente vulnerável, você geralmente:",
        opcoes: [
          { valor: "a", texto: "Busca isolamento para se recompor" },
          { valor: "b", texto: "Procura atividades que tragam segurança" },
          { valor: "c", texto: "Busca conexão com pessoas de confiança" },
          { valor: "d", texto: "Tenta ignorar e seguir em frente" },
        ],
      },
      {
        id: "emocional3",
        pergunta: "Seus padrões emocionais recorrentes incluem:",
        opcoes: [
          { valor: "a", texto: "Ansiedade e preocupação com o futuro" },
          { valor: "b", texto: "Nostalgia e apego ao passado" },
          { valor: "c", texto: "Intensidade emocional e paixão" },
          { valor: "d", texto: "Estabilidade e equilíbrio emocional" },
        ],
      },
    ],
  },
  2: {
    titulo: "Aspectos Mentais",
    descricao: "Responda às perguntas sobre seus padrões de pensamento",
    perguntas: [
      {
        id: "mental1",
        pergunta: "Como você costuma tomar decisões importantes?",
        opcoes: [
          { valor: "a", texto: "Baseado na intuição e no que sinto" },
          { valor: "b", texto: "Analisando prós e contras racionalmente" },
          { valor: "c", texto: "Considerando o impacto nas pessoas envolvidas" },
          { valor: "d", texto: "Seguindo princípios e valores estabelecidos" },
        ],
      },
      {
        id: "mental2",
        pergunta: "Quando enfrenta um problema complexo, você tende a:",
        opcoes: [
          { valor: "a", texto: "Buscar soluções criativas e inovadoras" },
          { valor: "b", texto: "Analisar metodicamente cada aspecto" },
          { valor: "c", texto: "Confiar em métodos que funcionaram antes" },
          { valor: "d", texto: "Buscar diferentes perspectivas e opiniões" },
        ],
      },
      {
        id: "mental3",
        pergunta: "Seu estilo de aprendizado predominante é:",
        opcoes: [
          { valor: "a", texto: "Visual - aprendo vendo e observando" },
          { valor: "b", texto: "Auditivo - aprendo ouvindo e discutindo" },
          { valor: "c", texto: "Prático - aprendo fazendo e experimentando" },
          { valor: "d", texto: "Conceitual - aprendo entendendo teorias" },
        ],
      },
    ],
  },
  3: {
    titulo: "Aspectos Relacionais",
    descricao: "Responda às perguntas sobre seus padrões de relacionamento",
    perguntas: [
      {
        id: "relacional1",
        pergunta: "Em relacionamentos próximos, você geralmente:",
        opcoes: [
          { valor: "a", texto: "Busca profundidade emocional e conexão" },
          { valor: "b", texto: "Valoriza espaço pessoal e independência" },
          { valor: "c", texto: "Prioriza estabilidade e segurança" },
          { valor: "d", texto: "Busca estímulo intelectual e novidade" },
        ],
      },
      {
        id: "relacional2",
        pergunta: "Em situações de conflito, você tende a:",
        opcoes: [
          { valor: "a", texto: "Confrontar diretamente para resolver" },
          { valor: "b", texto: "Evitar o conflito para manter a paz" },
          { valor: "c", texto: "Buscar compromisso e entendimento mútuo" },
          { valor: "d", texto: "Analisar a situação antes de responder" },
        ],
      },
      {
        id: "relacional3",
        pergunta: "Sua forma de demonstrar afeto geralmente é:",
        opcoes: [
          { valor: "a", texto: "Através de palavras e expressão verbal" },
          { valor: "b", texto: "Através de gestos e ações concretas" },
          { valor: "c", texto: "Através de presença e tempo de qualidade" },
          { valor: "d", texto: "Através de presentes e atenção aos detalhes" },
        ],
      },
    ],
  },
  4: {
    titulo: "Aspectos Espirituais",
    descricao: "Responda às perguntas sobre sua conexão espiritual",
    perguntas: [
      {
        id: "espiritual1",
        pergunta: "Sua conexão com o transcendente se manifesta principalmente através de:",
        opcoes: [
          { valor: "a", texto: "Práticas contemplativas e meditação" },
          { valor: "b", texto: "Conexão com a natureza e elementos" },
          { valor: "c", texto: "Rituais e práticas estruturadas" },
          { valor: "d", texto: "Serviço aos outros e ação no mundo" },
        ],
      },
      {
        id: "espiritual2",
        pergunta: "Quando busca significado na vida, você tende a:",
        opcoes: [
          { valor: "a", texto: "Explorar filosofias e sistemas de pensamento" },
          { valor: "b", texto: "Confiar na intuição e experiências pessoais" },
          { valor: "c", texto: "Buscar orientação em tradições estabelecidas" },
          { valor: "d", texto: "Encontrar propósito através de relacionamentos" },
        ],
      },
      {
        id: "espiritual3",
        pergunta: "Sua visão sobre o destino e livre-arbítrio é:",
        opcoes: [
          { valor: "a", texto: "Acredito que criamos nossa própria realidade" },
          { valor: "b", texto: "Acredito em um equilíbrio entre destino e escolhas" },
          { valor: "c", texto: "Acredito que há um plano maior guiando tudo" },
          { valor: "d", texto: "Acredito que a vida é principalmente aleatória" },
        ],
      },
    ],
  },
}

// Esquema de validação para cada etapa
const createFormSchema = (step: number) => {
  const schema: Record<string, z.ZodString> = {}

  questionarios[step as keyof typeof questionarios].perguntas.forEach((pergunta) => {
    schema[pergunta.id] = z.string({
      required_error: "Por favor, selecione uma resposta.",
    })
  })

  return z.object(schema)
}

export default function QuestionarioPage({ params }: { params: { step: string } }) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [progress, setProgress] = useState(0)

  const step = Number.parseInt(params.step)
  const totalSteps = Object.keys(questionarios).length

  // Verificar se o step é válido
  useEffect(() => {
    if (isNaN(step) || step < 1 || step > totalSteps) {
      router.push("/questionario/1")
    } else {
      // Calcular o progresso
      setProgress(((step - 1) / totalSteps) * 100)

      // Verificar se os dados do mapa astrológico existem
      const mapaData = localStorage.getItem("mapaAstrologico")
      if (!mapaData) {
        router.push("/mapa-astrologico")
      }

      // Carregar respostas anteriores se existirem
      const previousAnswers = localStorage.getItem(`questionario${step}`)
      if (previousAnswers) {
        const answers = JSON.parse(previousAnswers)
        Object.keys(answers).forEach((key) => {
          form.setValue(key as any, answers[key])
        })
      }
    }
  }, [step, router])

  const questionario = questionarios[step as keyof typeof questionarios]
  const formSchema = createFormSchema(step)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)

    // Salvar as respostas
    localStorage.setItem(`questionario${step}`, JSON.stringify(values))

    // Simular um pequeno atraso para feedback visual
    setTimeout(() => {
      setIsLoading(false)

      if (step < totalSteps) {
        router.push(`/questionario/${step + 1}`)
      } else {
        // Redirecionar para a página de processamento em vez da página de resultado
        router.push("/processando")
      }
    }, 500)
  }

  if (!questionario) return null

  return (
    <div className="container max-w-2xl py-12">
      <Card>
        <CardHeader>
          <div className="mb-2">
            <Progress value={progress} className="h-2" />
            <p className="text-xs text-muted-foreground mt-1 text-right">
              Etapa {step} de {totalSteps}
            </p>
          </div>
          <CardTitle>{questionario.titulo}</CardTitle>
          <CardDescription>{questionario.descricao}</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {questionario.perguntas.map((pergunta, index) => (
                <FormField
                  key={pergunta.id}
                  control={form.control}
                  name={pergunta.id as any}
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel className="text-base font-medium">
                        {index + 1}. {pergunta.pergunta}
                      </FormLabel>
                      <FormControl>
                        <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="space-y-1">
                          {pergunta.opcoes.map((opcao) => (
                            <FormItem key={opcao.valor} className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value={opcao.valor} />
                              </FormControl>
                              <FormLabel className="font-normal">{opcao.texto}</FormLabel>
                            </FormItem>
                          ))}
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}

              <div className="flex justify-between pt-4">
                {step > 1 ? (
                  <Button type="button" variant="outline" onClick={() => router.push(`/questionario/${step - 1}`)}>
                    Anterior
                  </Button>
                ) : (
                  <Button type="button" variant="outline" onClick={() => router.push("/mapa-astrologico")}>
                    Voltar
                  </Button>
                )}

                <Button type="submit" disabled={isLoading}>
                  {step < totalSteps ? "Próximo" : "Finalizar"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
