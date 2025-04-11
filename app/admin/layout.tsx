"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import Link from "next/link"
import { BarChart3, Users, Package, ShoppingCart, Settings, LogOut, Menu } from "lucide-react"

import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

interface AdminLayoutProps {
  children: React.ReactNode
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [isMounted, setIsMounted] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    // Verificar se o usuário é administrador
    // Em uma implementação real, isso seria feito com uma verificação de token JWT ou similar
    const checkAdmin = () => {
      try {
        const userData = localStorage.getItem("usuario")
        if (userData) {
          const user = JSON.parse(userData)
          // Simulação: consideramos o usuário como admin para demonstração
          // Em produção, você teria uma verificação real de permissões
          setIsAdmin(true)
        } else {
          router.push("/auth/login")
        }
      } catch (error) {
        console.error("Erro ao verificar permissões:", error)
        router.push("/auth/login")
      }
    }

    checkAdmin()
  }, [router])

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("usuario")
    }
    router.push("/auth/login")
  }

  // Renderização segura para SSR
  if (!isMounted) {
    return (
      <div className="flex min-h-screen flex-col">
        <div className="flex flex-1">
          <div className="flex flex-1 flex-col">
            <div className="flex-1">
              <div className="container flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Redirecionar se não for admin
  if (!isAdmin) {
    return (
      <div className="flex min-h-screen flex-col">
        <div className="flex flex-1">
          <div className="flex flex-1 flex-col">
            <div className="flex-1">
              <div className="container flex items-center justify-center min-h-screen">
                <div className="text-center">
                  <h1 className="text-2xl font-bold mb-4">Acesso Restrito</h1>
                  <p className="mb-4">Você não tem permissão para acessar esta área.</p>
                  <Button onClick={() => router.push("/")}>Voltar ao Início</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <div className="border-b">
        <div className="flex h-16 items-center px-4 container">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="pr-0">
              <MobileNav pathname={pathname} />
            </SheetContent>
          </Sheet>
          <div className="ml-auto flex items-center space-x-4">
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Sair
            </Button>
          </div>
        </div>
      </div>
      <div className="flex flex-1">
        <aside className="hidden border-r bg-muted/40 md:block md:w-[200px] lg:w-[240px]">
          <ScrollArea className="py-6 pr-6 lg:py-8">
            <h2 className="mb-4 px-6 text-lg font-semibold tracking-tight">Dashboard</h2>
            <nav className="grid gap-2 px-2">
              <Link
                href="/admin"
                className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium ${
                  pathname === "/admin" ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                }`}
              >
                <BarChart3 className="h-4 w-4" />
                Visão Geral
              </Link>
              <Link
                href="/admin/protocolos"
                className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium ${
                  pathname?.startsWith("/admin/protocolos") ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                }`}
              >
                <Package className="h-4 w-4" />
                Protocolos
              </Link>
              <Link
                href="/admin/vendas"
                className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium ${
                  pathname?.startsWith("/admin/vendas") ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                }`}
              >
                <ShoppingCart className="h-4 w-4" />
                Vendas
              </Link>
              <Link
                href="/admin/usuarios"
                className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium ${
                  pathname?.startsWith("/admin/usuarios") ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                }`}
              >
                <Users className="h-4 w-4" />
                Usuários
              </Link>
              <Link
                href="/admin/configuracoes"
                className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium ${
                  pathname?.startsWith("/admin/configuracoes") ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                }`}
              >
                <Settings className="h-4 w-4" />
                Configurações
              </Link>
            </nav>
          </ScrollArea>
        </aside>
        <div className="flex flex-1 flex-col">
          <main className="flex-1 p-4 md:p-6">{children}</main>
        </div>
      </div>
    </div>
  )
}

function MobileNav({ pathname }: { pathname: string | null }) {
  return (
    <div className="flex flex-col gap-6 pr-6">
      <Link href="/" className="flex items-center gap-2 px-2">
        <span className="font-bold">AstroConsciente</span>
        <span className="text-xs text-muted-foreground">Admin</span>
      </Link>
      <nav className="grid gap-2 text-sm">
        <Link
          href="/admin"
          className={`flex items-center gap-2 rounded-lg px-3 py-2 ${
            pathname === "/admin" ? "bg-primary text-primary-foreground" : "hover:bg-muted"
          }`}
        >
          <BarChart3 className="h-4 w-4" />
          Visão Geral
        </Link>
        <Link
          href="/admin/protocolos"
          className={`flex items-center gap-2 rounded-lg px-3 py-2 ${
            pathname?.startsWith("/admin/protocolos") ? "bg-primary text-primary-foreground" : "hover:bg-muted"
          }`}
        >
          <Package className="h-4 w-4" />
          Protocolos
        </Link>
        <Link
          href="/admin/vendas"
          className={`flex items-center gap-2 rounded-lg px-3 py-2 ${
            pathname?.startsWith("/admin/vendas") ? "bg-primary text-primary-foreground" : "hover:bg-muted"
          }`}
        >
          <ShoppingCart className="h-4 w-4" />
          Vendas
        </Link>
        <Link
          href="/admin/usuarios"
          className={`flex items-center gap-2 rounded-lg px-3 py-2 ${
            pathname?.startsWith("/admin/usuarios") ? "bg-primary text-primary-foreground" : "hover:bg-muted"
          }`}
        >
          <Users className="h-4 w-4" />
          Usuários
        </Link>
        <Link
          href="/admin/configuracoes"
          className={`flex items-center gap-2 rounded-lg px-3 py-2 ${
            pathname?.startsWith("/admin/configuracoes") ? "bg-primary text-primary-foreground" : "hover:bg-muted"
          }`}
        >
          <Settings className="h-4 w-4" />
          Configurações
        </Link>
      </nav>
    </div>
  )
}
