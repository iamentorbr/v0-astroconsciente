"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Search, Download, ArrowUpDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface Venda {
  id: string
  data: string
  cliente: string
  email: string
  protocolo: string
  valor: number
  status: "aprovado" | "pendente" | "cancelado"
}

export default function VendasPage() {
  const [vendas, setVendas] = useState<Venda[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("todos")
  const [protocoloFilter, setProtocoloFilter] = useState<string>("todos")
  const [currentPage, setCurrentPage] = useState(1)
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Venda
    direction: "ascending" | "descending"
  } | null>(null)

  const itemsPerPage = 10

  useEffect(() => {
    // Simulação de carregamento de dados
    const loadVendas = () => {
      // Em uma implementação real, estes dados viriam de uma API
      setTimeout(() => {
        // Gerar dados simulados
        const vendasSimuladas: Venda[] = []
        const protocolos = [
          "PROTOCOLO PARA AUTOCONHECIMENTO",
          "PROTOCOLO PARA MANIFESTAÇÃO CONSCIENTE",
          "PROTOCOLO EMOCIONAL",
          "PROTOCOLO ESPIRITUAL",
        ]
        const status: ("aprovado" | "pendente" | "cancelado")[] = ["aprovado", "pendente", "cancelado"]
        const nomes = [
          "Maria Silva",
          "João Santos",
          "Ana Oliveira",
          "Pedro Costa",
          "Carla Souza",
          "Lucas Ferreira",
          "Juliana Lima",
          "Rafael Alves",
          "Fernanda Pereira",
          "Gustavo Rodrigues",
        ]

        for (let i = 1; i <= 50; i++) {
          const dataVenda = new Date()
          dataVenda.setDate(dataVenda.getDate() - Math.floor(Math.random() * 30))

          const nomeIndex = Math.floor(Math.random() * nomes.length)
          const nome = nomes[nomeIndex]
          const email = nome.toLowerCase().replace(" ", ".") + "@email.com"

          vendasSimuladas.push({
            id: `VND-${1000 + i}`,
            data: dataVenda.toLocaleDateString("pt-BR"),
            cliente: nome,
            email: email,
            protocolo: protocolos[Math.floor(Math.random() * protocolos.length)],
            valor: 29.9,
            status: status[Math.floor(Math.random() * (status.length - 0.2))], // Maior probabilidade de "aprovado"
          })
        }

        setVendas(vendasSimuladas)
        setIsLoading(false)
      }, 1000)
    }

    loadVendas()
  }, [])

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
    setCurrentPage(1) // Reset para a primeira página ao buscar
  }

  const handleStatusFilter = (value: string) => {
    setStatusFilter(value)
    setCurrentPage(1) // Reset para a primeira página ao filtrar
  }

  const handleProtocoloFilter = (value: string) => {
    setProtocoloFilter(value)
    setCurrentPage(1) // Reset para a primeira página ao filtrar
  }

  const handleSort = (key: keyof Venda) => {
    let direction: "ascending" | "descending" = "ascending"

    if (sortConfig && sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending"
    }

    setSortConfig({ key, direction })
  }

  // Aplicar filtros
  const filteredVendas = vendas.filter((venda) => {
    const matchesSearch =
      venda.cliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
      venda.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      venda.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      venda.protocolo.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "todos" || venda.status === statusFilter

    const matchesProtocolo =
      protocoloFilter === "todos" || venda.protocolo.toLowerCase().includes(protocoloFilter.toLowerCase())

    return matchesSearch && matchesStatus && matchesProtocolo
  })

  // Aplicar ordenação
  if (sortConfig !== null) {
    filteredVendas.sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === "ascending" ? -1 : 1
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === "ascending" ? 1 : -1
      }
      return 0
    })
  }

  // Paginação
  const totalPages = Math.ceil(filteredVendas.length / itemsPerPage)
  const paginatedVendas = filteredVendas.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

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
        <h1 className="text-3xl font-bold tracking-tight">Vendas</h1>
        <p className="text-muted-foreground">Gerencie e acompanhe as vendas de protocolos</p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
        <div className="flex flex-col sm:flex-row gap-4 sm:items-center">
          <div className="flex items-center space-x-2">
            <Input
              type="search"
              placeholder="Buscar venda..."
              value={searchTerm}
              onChange={handleSearch}
              className="w-full sm:w-[250px]"
            />
            <Button type="submit" size="icon" variant="ghost">
              <Search className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex items-center space-x-2">
            <Select value={statusFilter} onValueChange={handleStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filtrar por status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos os status</SelectItem>
                <SelectItem value="aprovado">Aprovado</SelectItem>
                <SelectItem value="pendente">Pendente</SelectItem>
                <SelectItem value="cancelado">Cancelado</SelectItem>
              </SelectContent>
            </Select>
            <Select value={protocoloFilter} onValueChange={handleProtocoloFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filtrar por protocolo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos os protocolos</SelectItem>
                <SelectItem value="autoconhecimento">Autoconhecimento</SelectItem>
                <SelectItem value="manifestação">Manifestação</SelectItem>
                <SelectItem value="emocional">Emocional</SelectItem>
                <SelectItem value="espiritual">Espiritual</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Exportar
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Histórico de Vendas</CardTitle>
          <CardDescription>Total de {filteredVendas.length} vendas encontradas</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="-ml-3 h-8 data-[state=open]:bg-accent">
                        <span>ID</span>
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start">
                      <DropdownMenuItem onClick={() => handleSort("id")}>
                        ID {sortConfig?.key === "id" && (sortConfig.direction === "ascending" ? "↑" : "↓")}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableHead>
                <TableHead>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="-ml-3 h-8 data-[state=open]:bg-accent">
                        <span>Data</span>
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start">
                      <DropdownMenuItem onClick={() => handleSort("data")}>
                        Data {sortConfig?.key === "data" && (sortConfig.direction === "ascending" ? "↑" : "↓")}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableHead>
                <TableHead>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="-ml-3 h-8 data-[state=open]:bg-accent">
                        <span>Cliente</span>
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start">
                      <DropdownMenuItem onClick={() => handleSort("cliente")}>
                        Cliente {sortConfig?.key === "cliente" && (sortConfig.direction === "ascending" ? "↑" : "↓")}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableHead>
                <TableHead>Protocolo</TableHead>
                <TableHead className="text-right">Valor</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedVendas.map((venda) => (
                <TableRow key={venda.id}>
                  <TableCell className="font-medium">{venda.id}</TableCell>
                  <TableCell>{venda.data}</TableCell>
                  <TableCell>
                    <div>
                      <div>{venda.cliente}</div>
                      <div className="text-xs text-muted-foreground">{venda.email}</div>
                    </div>
                  </TableCell>
                  <TableCell>{venda.protocolo}</TableCell>
                  <TableCell className="text-right">
                    R$ {venda.valor.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        venda.status === "aprovado"
                          ? "success"
                          : venda.status === "pendente"
                            ? "outline"
                            : "destructive"
                      }
                    >
                      {venda.status === "aprovado"
                        ? "Aprovado"
                        : venda.status === "pendente"
                          ? "Pendente"
                          : "Cancelado"}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <div className="mt-4">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                  />
                </PaginationItem>

                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNumber: number

                  if (totalPages <= 5) {
                    pageNumber = i + 1
                  } else if (currentPage <= 3) {
                    pageNumber = i + 1
                  } else if (currentPage >= totalPages - 2) {
                    pageNumber = totalPages - 4 + i
                  } else {
                    pageNumber = currentPage - 2 + i
                  }

                  return (
                    <PaginationItem key={pageNumber}>
                      <PaginationLink onClick={() => setCurrentPage(pageNumber)} isActive={currentPage === pageNumber}>
                        {pageNumber}
                      </PaginationLink>
                    </PaginationItem>
                  )
                })}

                {totalPages > 5 && currentPage < totalPages - 2 && (
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                )}

                {totalPages > 5 && currentPage < totalPages - 2 && (
                  <PaginationItem>
                    <PaginationLink onClick={() => setCurrentPage(totalPages)}>{totalPages}</PaginationLink>
                  </PaginationItem>
                )}

                <PaginationItem>
                  <PaginationNext
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
