"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Search, Download, ArrowUpDown, MoreHorizontal, Mail, Ban, UserCheck } from "lucide-react"

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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface Usuario {
  id: string
  nome: string
  email: string
  dataCadastro: string
  ultimoAcesso: string
  protocolos: number
  status: "ativo" | "inativo"
}

export default function UsuariosPage() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("todos")
  const [currentPage, setCurrentPage] = useState(1)
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Usuario
    direction: "ascending" | "descending"
  } | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState<Usuario | null>(null)
  const [dialogAction, setDialogAction] = useState<"ativar" | "desativar" | "email">("ativar")

  const itemsPerPage = 10

  useEffect(() => {
    // Simulação de carregamento de dados
    const loadUsuarios = () => {
      // Em uma implementação real, estes dados viriam de uma API
      setTimeout(() => {
        // Gerar dados simulados
        const usuariosSimulados: Usuario[] = []
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
          "Camila Martins",
          "Bruno Almeida",
          "Patrícia Gomes",
          "Thiago Barbosa",
          "Aline Cardoso",
          "Marcelo Ribeiro",
          "Vanessa Oliveira",
          "Ricardo Mendes",
          "Daniela Castro",
          "Felipe Nunes",
        ]

        for (let i = 0; i < nomes.length; i++) {
          const dataCadastro = new Date()
          dataCadastro.setDate(dataCadastro.getDate() - Math.floor(Math.random() * 180))

          const ultimoAcesso = new Date()
          ultimoAcesso.setDate(ultimoAcesso.getDate() - Math.floor(Math.random() * 30))

          const nome = nomes[i]
          const email = nome.toLowerCase().replace(" ", ".") + "@email.com"

          usuariosSimulados.push({
            id: `USR-${1000 + i}`,
            nome: nome,
            email: email,
            dataCadastro: dataCadastro.toLocaleDateString("pt-BR"),
            ultimoAcesso: ultimoAcesso.toLocaleDateString("pt-BR"),
            protocolos: Math.floor(Math.random() * 4),
            status: Math.random() > 0.2 ? "ativo" : "inativo", // 80% de chance de estar ativo
          })
        }

        setUsuarios(usuariosSimulados)
        setIsLoading(false)
      }, 1000)
    }

    loadUsuarios()
  }, [])

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
    setCurrentPage(1) // Reset para a primeira página ao buscar
  }

  const handleStatusFilter = (value: string) => {
    setStatusFilter(value)
    setCurrentPage(1) // Reset para a primeira página ao filtrar
  }

  const handleSort = (key: keyof Usuario) => {
    let direction: "ascending" | "descending" = "ascending"

    if (sortConfig && sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending"
    }

    setSortConfig({ key, direction })
  }

  const openDialog = (user: Usuario, action: "ativar" | "desativar" | "email") => {
    setSelectedUser(user)
    setDialogAction(action)
    setDialogOpen(true)
  }

  const confirmAction = () => {
    if (!selectedUser) return

    if (dialogAction === "ativar" || dialogAction === "desativar") {
      // Atualizar status do usuário
      setUsuarios(
        usuarios.map((user) =>
          user.id === selectedUser.id ? { ...user, status: dialogAction === "ativar" ? "ativo" : "inativo" } : user,
        ),
      )
    } else if (dialogAction === "email") {
      // Simulação de envio de email
      console.log(`Email enviado para ${selectedUser.email}`)
    }

    setDialogOpen(false)
  }

  // Aplicar filtros
  const filteredUsuarios = usuarios.filter((usuario) => {
    const matchesSearch =
      usuario.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      usuario.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      usuario.id.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "todos" || usuario.status === statusFilter

    return matchesSearch && matchesStatus
  })

  // Aplicar ordenação
  if (sortConfig !== null) {
    filteredUsuarios.sort((a, b) => {
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
  const totalPages = Math.ceil(filteredUsuarios.length / itemsPerPage)
  const paginatedUsuarios = filteredUsuarios.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

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
        <h1 className="text-3xl font-bold tracking-tight">Usuários</h1>
        <p className="text-muted-foreground">Gerencie os usuários do sistema</p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
        <div className="flex flex-col sm:flex-row gap-4 sm:items-center">
          <div className="flex items-center space-x-2">
            <Input
              type="search"
              placeholder="Buscar usuário..."
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
                <SelectItem value="ativo">Ativos</SelectItem>
                <SelectItem value="inativo">Inativos</SelectItem>
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
          <CardTitle>Lista de Usuários</CardTitle>
          <CardDescription>Total de {filteredUsuarios.length} usuários encontrados</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="-ml-3 h-8 data-[state=open]:bg-accent">
                        <span>Nome</span>
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start">
                      <DropdownMenuItem onClick={() => handleSort("nome")}>
                        Nome {sortConfig?.key === "nome" && (sortConfig.direction === "ascending" ? "↑" : "↓")}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableHead>
                <TableHead>Email</TableHead>
                <TableHead>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="-ml-3 h-8 data-[state=open]:bg-accent">
                        <span>Data de Cadastro</span>
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start">
                      <DropdownMenuItem onClick={() => handleSort("dataCadastro")}>
                        Data de Cadastro{" "}
                        {sortConfig?.key === "dataCadastro" && (sortConfig.direction === "ascending" ? "↑" : "↓")}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableHead>
                <TableHead>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="-ml-3 h-8 data-[state=open]:bg-accent">
                        <span>Último Acesso</span>
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start">
                      <DropdownMenuItem onClick={() => handleSort("ultimoAcesso")}>
                        Último Acesso{" "}
                        {sortConfig?.key === "ultimoAcesso" && (sortConfig.direction === "ascending" ? "↑" : "↓")}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableHead>
                <TableHead className="text-center">Protocolos</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedUsuarios.map((usuario) => (
                <TableRow key={usuario.id}>
                  <TableCell className="font-medium">{usuario.nome}</TableCell>
                  <TableCell>{usuario.email}</TableCell>
                  <TableCell>{usuario.dataCadastro}</TableCell>
                  <TableCell>{usuario.ultimoAcesso}</TableCell>
                  <TableCell className="text-center">{usuario.protocolos}</TableCell>
                  <TableCell>
                    <Badge variant={usuario.status === "ativo" ? "success" : "destructive"}>
                      {usuario.status === "ativo" ? "Ativo" : "Inativo"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Abrir menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Ações</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => openDialog(usuario, "email")}>
                          <Mail className="mr-2 h-4 w-4" />
                          Enviar Email
                        </DropdownMenuItem>
                        {usuario.status === "ativo" ? (
                          <DropdownMenuItem onClick={() => openDialog(usuario, "desativar")}>
                            <Ban className="mr-2 h-4 w-4" />
                            Desativar Usuário
                          </DropdownMenuItem>
                        ) : (
                          <DropdownMenuItem onClick={() => openDialog(usuario, "ativar")}>
                            <UserCheck className="mr-2 h-4 w-4" />
                            Ativar Usuário
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
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

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {dialogAction === "ativar"
                ? "Ativar Usuário"
                : dialogAction === "desativar"
                  ? "Desativar Usuário"
                  : "Enviar Email"}
            </DialogTitle>
            <DialogDescription>
              {dialogAction === "ativar"
                ? `Tem certeza que deseja ativar o usuário ${selectedUser?.nome}?`
                : dialogAction === "desativar"
                  ? `Tem certeza que deseja desativar o usuário ${selectedUser?.nome}?`
                  : `Enviar email para ${selectedUser?.email}`}
            </DialogDescription>
          </DialogHeader>
          {dialogAction === "email" && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Input
                  id="assunto"
                  placeholder="Assunto do email"
                  className="col-span-4"
                  defaultValue="Informações sobre o AstroConsciente"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <textarea
                  id="mensagem"
                  placeholder="Mensagem"
                  className="col-span-4 min-h-[100px] rounded-md border border-input bg-background px-3 py-2 text-sm"
                  defaultValue="Olá, gostaríamos de compartilhar algumas informações importantes sobre sua conta no AstroConsciente..."
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={confirmAction}>
              {dialogAction === "ativar" ? "Ativar" : dialogAction === "desativar" ? "Desativar" : "Enviar"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
