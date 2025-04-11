"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Plus, Edit, Trash2, Search, MoreHorizontal, Check, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
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
import { Badge } from "@/components/ui/badge"

interface Protocolo {
  id: string
  tipo: string
  titulo: string
  subtitulo: string
  preco: number
  vendas: number
  ativo: boolean
}

export default function ProtocolosPage() {
  const [protocolos, setProtocolos] = useState<Protocolo[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [protocoloToDelete, setProtocoloToDelete] = useState<Protocolo | null>(null)

  useEffect(() => {
    // Simulação de carregamento de dados
    const loadProtocolos = () => {
      // Em uma implementação real, estes dados viriam de uma API
      setTimeout(() => {
        setProtocolos([
          {
            id: "autoconhecimento",
            tipo: "autoconhecimento",
            titulo: "PROTOCOLO PARA AUTOCONHECIMENTO",
            subtitulo: "Jornada de Autodescoberta Astrológica",
            preco: 29.9,
            vendas: 124,
            ativo: true,
          },
          {
            id: "manifestacao",
            tipo: "manifestacao",
            titulo: "PROTOCOLO PARA MANIFESTAÇÃO CONSCIENTE",
            subtitulo: "Alinhando Intenções com Energias Cósmicas",
            preco: 29.9,
            vendas: 87,
            ativo: true,
          },
          {
            id: "emocional",
            tipo: "emocional",
            titulo: "PROTOCOLO EMOCIONAL",
            subtitulo: "Equilibrando o Mundo Interior através da Astrologia",
            preco: 29.9,
            vendas: 65,
            ativo: true,
          },
          {
            id: "espiritual",
            tipo: "espiritual",
            titulo: "PROTOCOLO ESPIRITUAL",
            subtitulo: "Conexão Cósmica e Desenvolvimento Interior",
            preco: 29.9,
            vendas: 36,
            ativo: true,
          },
        ])
        setIsLoading(false)
      }, 1000)
    }

    loadProtocolos()
  }, [])

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  const filteredProtocolos = protocolos.filter(
    (protocolo) =>
      protocolo.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      protocolo.subtitulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      protocolo.tipo.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleToggleStatus = (id: string) => {
    setProtocolos(
      protocolos.map((protocolo) => (protocolo.id === id ? { ...protocolo, ativo: !protocolo.ativo } : protocolo)),
    )
  }

  const confirmDelete = () => {
    if (protocoloToDelete) {
      // Em uma implementação real, aqui seria feita uma chamada para a API
      setProtocolos(protocolos.filter((p) => p.id !== protocoloToDelete.id))
      setDeleteDialogOpen(false)
      setProtocoloToDelete(null)
    }
  }

  const openDeleteDialog = (protocolo: Protocolo) => {
    setProtocoloToDelete(protocolo)
    setDeleteDialogOpen(true)
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Protocolos</h1>
          <p className="text-muted-foreground">Gerencie os protocolos disponíveis no sistema</p>
        </div>
        <Link href="/admin/protocolos/novo">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Novo Protocolo
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Protocolos Disponíveis</CardTitle>
          <CardDescription>
            Total de {protocolos.length} protocolos, {protocolos.filter((p) => p.ativo).length} ativos
          </CardDescription>
          <div className="flex w-full max-w-sm items-center space-x-2 mt-4">
            <Input
              type="search"
              placeholder="Buscar protocolo..."
              value={searchTerm}
              onChange={handleSearch}
              className="w-full"
            />
            <Button type="submit" size="icon" variant="ghost">
              <Search className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Protocolo</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead className="text-right">Preço</TableHead>
                <TableHead className="text-right">Vendas</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProtocolos.map((protocolo) => (
                <TableRow key={protocolo.id}>
                  <TableCell className="font-medium">
                    <div>
                      <div>{protocolo.titulo}</div>
                      <div className="text-xs text-muted-foreground">{protocolo.subtitulo}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{protocolo.tipo}</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    R$ {protocolo.preco.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                  </TableCell>
                  <TableCell className="text-right">{protocolo.vendas}</TableCell>
                  <TableCell>
                    <Badge variant={protocolo.ativo ? "success" : "destructive"}>
                      {protocolo.ativo ? "Ativo" : "Inativo"}
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
                        <DropdownMenuItem asChild>
                          <Link href={`/admin/protocolos/${protocolo.id}`}>
                            <Edit className="mr-2 h-4 w-4" />
                            Editar
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleToggleStatus(protocolo.id)}>
                          {protocolo.ativo ? (
                            <>
                              <X className="mr-2 h-4 w-4" />
                              Desativar
                            </>
                          ) : (
                            <>
                              <Check className="mr-2 h-4 w-4" />
                              Ativar
                            </>
                          )}
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => openDeleteDialog(protocolo)}>
                          <Trash2 className="mr-2 h-4 w-4" />
                          Excluir
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar exclusão</DialogTitle>
            <DialogDescription>
              Tem certeza que deseja excluir o protocolo "{protocoloToDelete?.titulo}"? Esta ação não pode ser desfeita.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Cancelar
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Excluir
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
