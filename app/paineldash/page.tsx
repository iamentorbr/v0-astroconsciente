"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Users, Package, ShoppingCart, TrendingUp, Calendar, ArrowRight, UserCheck } from "lucide-react"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

// Componente para o gráfico de vendas
import { VendasChart } from "@/components/admin/vendas-chart"
import { UsuariosChart } from "@/components/admin/usuarios-chart"

export default function DashboardPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [dashboardData, setDashboardData] = useState({
    totalUsuarios: 0,
    usuariosAtivos: 0,
    usuariosInativos: 0,
    totalProtocolos: 0,
    totalVendas: 0,
    vendasHoje: 0,
    receitaTotal: 0,
    receitaMensal: 0,
  })

  useEffect(() => {
    // Simulação de carregamento de dados
    const loadDashboardData = () => {
      // Em uma implementação real, estes dados viriam de uma API
      setTimeout(() => {
        setDashboardData({
          totalUsuarios: 256,
          usuariosAtivos: 187,
          usuariosInativos: 69,
          totalProtocolos: 4,
          totalVendas: 312,
          vendasHoje: 8,
          receitaTotal: 9328.8,
          receitaMensal: 1436.4,
        })
        setIsLoading(false)
      }, 1000)
    }

    loadDashboardData()
  }, [])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Visão geral do sistema AstroConsciente</p>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="analytics">Análises</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total de Usuários</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{dashboardData.totalUsuarios}</div>
                <div className="flex items-center space-x-2">
                  <div className="text-xs text-muted-foreground">
                    <span className="text-green-500 font-medium">{dashboardData.usuariosAtivos}</span> ativos /{" "}
                    <span className="text-red-500 font-medium">{dashboardData.usuariosInativos}</span> inativos
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Protocolos</CardTitle>
                <Package className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{dashboardData.totalProtocolos}</div>
                <p className="text-xs text-muted-foreground">Protocolos disponíveis</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total de Vendas</CardTitle>
                <ShoppingCart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{dashboardData.totalVendas}</div>
                <div className="flex items-center space-x-2">
                  <TrendingUp className="h-4 w-4 text-green-500" />
                  <p className="text-xs text-muted-foreground">
                    <span className="text-green-500 font-medium">+{dashboardData.vendasHoje}</span> hoje
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Receita</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  R$ {dashboardData.receitaTotal.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                </div>
                <p className="text-xs text-muted-foreground">
                  R$ {dashboardData.receitaMensal.toLocaleString("pt-BR", { minimumFractionDigits: 2 })} este mês
                </p>
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Vendas Recentes</CardTitle>
                <CardDescription>Histórico de vendas dos últimos 30 dias</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <VendasChart />
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Usuários Ativos vs. Inativos</CardTitle>
                <CardDescription>Distribuição de usuários por status</CardDescription>
              </CardHeader>
              <CardContent>
                <UsuariosChart
                  data={[
                    { name: "Ativos", value: dashboardData.usuariosAtivos },
                    { name: "Inativos", value: dashboardData.usuariosInativos },
                  ]}
                />
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Vendas por Protocolo</CardTitle>
                <CardDescription>Distribuição de vendas por tipo de protocolo</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                      <span>Autoconhecimento</span>
                    </div>
                    <span className="font-medium">124 vendas</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                      <span>Manifestação</span>
                    </div>
                    <span className="font-medium">87 vendas</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                      <span>Emocional</span>
                    </div>
                    <span className="font-medium">65 vendas</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                      <span>Espiritual</span>
                    </div>
                    <span className="font-medium">36 vendas</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Link href="/paineldash/vendas">
                  <Button variant="outline" size="sm" className="w-full">
                    Ver detalhes
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Atividade Recente</CardTitle>
                <CardDescription>Últimas ações no sistema</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="bg-green-100 p-1 rounded-full">
                      <ShoppingCart className="h-4 w-4 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Nova venda: Protocolo Emocional</p>
                      <p className="text-xs text-muted-foreground">Há 12 minutos</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="bg-blue-100 p-1 rounded-full">
                      <UserCheck className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Novo usuário registrado</p>
                      <p className="text-xs text-muted-foreground">Há 45 minutos</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="bg-green-100 p-1 rounded-full">
                      <ShoppingCart className="h-4 w-4 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Nova venda: Protocolo Autoconhecimento</p>
                      <p className="text-xs text-muted-foreground">Há 1 hora</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="bg-green-100 p-1 rounded-full">
                      <ShoppingCart className="h-4 w-4 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Nova venda: Protocolo Manifestação</p>
                      <p className="text-xs text-muted-foreground">Há 2 horas</p>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" className="w-full">
                  Ver todas as atividades
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="analytics" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Taxa de Conversão</CardTitle>
                <CardDescription>Visitantes que compraram protocolos</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12.5%</div>
                <p className="text-xs text-muted-foreground">+2.1% em relação ao mês anterior</p>
                <div className="mt-4 h-[60px]">
                  {/* Aqui poderia ter um mini gráfico */}
                  <div className="flex items-end justify-between h-full">
                    {[35, 45, 32, 50, 68, 65, 42, 58, 75, 62, 48, 55].map((value, i) => (
                      <div key={i} className="w-[7px] bg-primary rounded-full" style={{ height: `${value}%` }}></div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Tempo Médio de Sessão</CardTitle>
                <CardDescription>Tempo que os usuários passam no site</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">8m 42s</div>
                <p className="text-xs text-muted-foreground">+1m 12s em relação ao mês anterior</p>
                <div className="mt-4 h-[60px]">
                  {/* Aqui poderia ter um mini gráfico */}

                  <div className="flex items-end justify-between h-full">
                    {[55, 65, 72, 50, 48, 65, 82, 68, 75, 62, 78, 85].map((value, i) => (
                      <div key={i} className="w-[7px] bg-primary rounded-full" style={{ height: `${value}%` }}></div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Valor Médio por Venda</CardTitle>
                <CardDescription>Valor médio gasto por cliente</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">R$ 29,90</div>
                <p className="text-xs text-muted-foreground">Sem alteração em relação ao mês anterior</p>
                <div className="mt-4 h-[60px]">
                  {/* Aqui poderia ter um mini gráfico */}
                  <div className="flex items-end justify-between h-full">
                    {[65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65].map((value, i) => (
                      <div key={i} className="w-[7px] bg-primary rounded-full" style={{ height: `${value}%` }}></div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Análise de Desempenho</CardTitle>
              <CardDescription>Métricas detalhadas dos últimos 6 meses</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                <div>
                  <h4 className="text-sm font-medium mb-2">Vendas Mensais</h4>
                  <div className="h-[200px]">
                    {/* Aqui entraria um gráfico mais complexo */}
                    <div className="flex items-end justify-between h-full">
                      {[35, 45, 52, 60, 68, 75].map((value, i) => (
                        <div key={i} className="w-[40px] relative group">
                          <div className="w-full bg-primary rounded-t-md" style={{ height: `${value}%` }}></div>
                          <div className="text-xs text-center mt-1">
                            {["Jan", "Fev", "Mar", "Abr", "Mai", "Jun"][i]}
                          </div>
                          <div className="absolute bottom-full mb-1 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                            {Math.round(value * 3.12)} vendas
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <Separator />
                <div>
                  <h4 className="text-sm font-medium mb-2">Distribuição de Receita por Protocolo</h4>
                  <div className="grid grid-cols-4 gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                        <span className="text-sm">Autoconhecimento</span>
                      </div>
                      <div className="text-lg font-bold">R$ 3.707,60</div>
                      <div className="text-xs text-muted-foreground">39.7% do total</div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                        <span className="text-sm">Manifestação</span>
                      </div>
                      <div className="text-lg font-bold">R$ 2.601,30</div>
                      <div className="text-xs text-muted-foreground">27.9% do total</div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        <span className="text-sm">Emocional</span>
                      </div>
                      <div className="text-lg font-bold">R$ 1.943,50</div>
                      <div className="text-xs text-muted-foreground">20.8% do total</div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                        <span className="text-sm">Espiritual</span>
                      </div>
                      <div className="text-lg font-bold">R$ 1.076,40</div>
                      <div className="text-xs text-muted-foreground">11.6% do total</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
