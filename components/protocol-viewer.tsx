"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ChevronDown, ChevronUp, Lock, Unlock, Calendar, Clock } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"

import { type ProtocolDay, type UserProtocol, isDayUnlocked } from "@/lib/protocol-types"

interface ProtocolViewerProps {
  protocol: UserProtocol
  onPurchase?: () => void
}

export function ProtocolViewer({ protocol, onPurchase }: ProtocolViewerProps) {
  const [expandedDay, setExpandedDay] = useState<number | null>(1)
  const [activeTab, setActiveTab] = useState<string>("overview")

  const toggleDay = (day: number) => {
    if (expandedDay === day) {
      setExpandedDay(null)
    } else {
      setExpandedDay(day)
    }
  }

  // Garantir que protocol.days existe antes de calcular o progresso
  const progress = protocol.days
    ? Math.round(
        (protocol.days.filter((day) => isDayUnlocked(day.day, protocol.unlockLevel)).length / protocol.days.length) *
          100,
      )
    : 0

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-2xl">{protocol.title}</CardTitle>
            <CardDescription>{protocol.subtitle}</CardDescription>
          </div>
          {protocol.unlockLevel !== "preview" && protocol.purchaseDate && (
            <Badge variant="outline" className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              <span>Adquirido em {protocol.purchaseDate}</span>
            </Badge>
          )}
        </div>

        {protocol.unlockLevel !== "preview" && (
          <div className="mt-4">
            <div className="flex justify-between text-sm mb-1">
              <span>Progresso</span>
              <span>{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        )}
      </CardHeader>

      <CardContent>
        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-2 mb-4">
            <TabsTrigger value="overview">Visão Geral</TabsTrigger>
            <TabsTrigger value="journey">Jornada de 21 Dias</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="prose prose-sm max-w-none">
              <p>{protocol.description}</p>
            </div>

            <div className="bg-muted p-4 rounded-lg">
              <h3 className="font-medium mb-2">Sobre este Protocolo</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Este protocolo é uma jornada de 21 dias com práticas diárias para trabalhar aspectos específicos do seu
                mapa astrológico.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex flex-col items-center p-3 bg-background rounded-lg">
                  <div className="text-3xl mb-2">21</div>
                  <div className="text-sm text-center">Dias de Práticas</div>
                </div>
                <div className="flex flex-col items-center p-3 bg-background rounded-lg">
                  <div className="text-3xl mb-2">5</div>
                  <div className="text-sm text-center">Tipos de Atividades</div>
                </div>
                <div className="flex flex-col items-center p-3 bg-background rounded-lg">
                  <div className="text-3xl mb-2">15-30</div>
                  <div className="text-sm text-center">Minutos por Dia</div>
                </div>
              </div>
            </div>

            {protocol.unlockLevel === "preview" && (
              <div className="bg-primary/5 p-4 rounded-lg border border-primary/20">
                <h3 className="font-medium mb-2 flex items-center">
                  <Lock className="h-4 w-4 mr-2" />
                  Acesso Limitado
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Você está visualizando uma prévia deste protocolo. Adquira-o para desbloquear a jornada completa de 21
                  dias.
                </p>
                {onPurchase && (
                  <Button onClick={onPurchase} className="w-full">
                    Adquirir Protocolo - R$ 29,90
                  </Button>
                )}
              </div>
            )}

            {protocol.unlockLevel === "partial" && protocol.purchaseDate && (
              <div className="bg-primary/5 p-4 rounded-lg border border-primary/20">
                <h3 className="font-medium mb-2 flex items-center">
                  <Unlock className="h-4 w-4 mr-2" />
                  Acesso Parcial
                </h3>
                <p className="text-sm text-muted-foreground">
                  Você tem acesso aos primeiros 7 dias deste protocolo. O conteúdo completo será desbloqueado em{" "}
                  {calculateRemainingDays(protocol.purchaseDate)} dias.
                </p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="journey">
            <div className="space-y-3">
              {protocol.days &&
                protocol.days.map((day) => (
                  <DayCard
                    key={day.day}
                    day={day}
                    isExpanded={expandedDay === day.day}
                    isUnlocked={isDayUnlocked(day.day, protocol.unlockLevel)}
                    toggleExpand={() => toggleDay(day.day)}
                  />
                ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>

      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={() => setActiveTab("overview")}>
          Voltar à Visão Geral
        </Button>
        {protocol.unlockLevel === "preview" && onPurchase && <Button onClick={onPurchase}>Adquirir Protocolo</Button>}
      </CardFooter>
    </Card>
  )
}

interface DayCardProps {
  day: ProtocolDay
  isExpanded: boolean
  isUnlocked: boolean
  toggleExpand: () => void
}

function DayCard({ day, isExpanded, isUnlocked, toggleExpand }: DayCardProps) {
  return (
    <Card className={`border ${isUnlocked ? "border-border" : "border-muted"} ${isExpanded ? "shadow-md" : ""}`}>
      <div
        className={`p-4 flex justify-between items-center cursor-pointer ${isUnlocked ? "" : "opacity-70"}`}
        onClick={toggleExpand}
      >
        <div className="flex items-center">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
              isUnlocked ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
            }`}
          >
            {day.day}
          </div>
          <div>
            <h3 className="font-medium">{day.title}</h3>
            <p className="text-sm text-muted-foreground">{day.description}</p>
          </div>
        </div>
        <div className="flex items-center">
          {!isUnlocked && <Lock className="h-4 w-4 mr-2" />}
          {isExpanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
        </div>
      </div>

      {isExpanded && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Separator />
          <div className="p-4">
            {isUnlocked ? (
              <div className="space-y-4">
                <div className="prose prose-sm max-w-none">
                  <p>{day.content}</p>
                </div>

                <h4 className="font-medium mt-4">Atividades do Dia</h4>
                <div className="space-y-3">
                  {day.actions &&
                    day.actions.map((action, index) => (
                      <div key={index} className="bg-muted p-3 rounded-lg">
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex items-center">
                            <Badge variant="outline" className="mr-2">
                              {action.type === "reflection" && "Reflexão"}
                              {action.type === "practice" && "Prática"}
                              {action.type === "meditation" && "Meditação"}
                              {action.type === "journaling" && "Registro"}
                              {action.type === "ritual" && "Ritual"}
                            </Badge>
                            <h5 className="font-medium">{action.title}</h5>
                          </div>
                          {action.duration && (
                            <Badge variant="secondary" className="flex items-center">
                              <Clock className="h-3 w-3 mr-1" />
                              {action.duration}
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{action.description}</p>
                        <div className="bg-background p-3 rounded-lg text-sm">{action.instructions}</div>
                      </div>
                    ))}
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-6">
                <Lock className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="font-medium text-center mb-2">Conteúdo Bloqueado</h3>
                <p className="text-sm text-muted-foreground text-center max-w-md">
                  Este conteúdo será desbloqueado quando você adquirir o protocolo completo.
                </p>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </Card>
  )
}

// Função auxiliar para calcular dias restantes até o desbloqueio completo
function calculateRemainingDays(purchaseDate: string): number {
  try {
    const purchase = new Date(purchaseDate)
    const unlockDate = new Date(purchase)
    unlockDate.setDate(unlockDate.getDate() + 7)

    const now = new Date()
    const diffTime = Math.abs(unlockDate.getTime() - now.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    return diffDays
  } catch (error) {
    console.error("Error calculating remaining days:", error)
    return 7 // Valor padrão em caso de erro
  }
}
