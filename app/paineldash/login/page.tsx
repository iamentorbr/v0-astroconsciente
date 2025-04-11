"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Loader2, Lock } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription } from "@/components/ui/alert"

const formSchema = z.object({
  email: z.string().email({
    message: "Email inválido.",
  }),
  senha: z.string().min(1, {
    message: "A senha é obrigatória.",
  }),
})

export default function DashboardLoginPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [loginError, setLoginError] = useState("")
  const [mounted, setMounted] = useState(false)

  // Verificar se o componente está montado (cliente)
  useEffect(() => {
    setMounted(true)

    // Verificar se já está autenticado como admin
    if (typeof window !== "undefined") {
      const adminAuth = localStorage.getItem("adminAuth")
      if (adminAuth === "true") {
        router.push("/paineldash")
      }
    }
  }, [router])

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      senha: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)
    setLoginError("")

    // Verificar credenciais
    if (values.email === "admin@admin.com" && values.senha === "36166255") {
      // Autenticação bem-sucedida
      if (typeof window !== "undefined") {
        localStorage.setItem("adminAuth", "true")
      }

      // Redirecionar para o dashboard
      setTimeout(() => {
        setIsLoading(false)
        router.push("/paineldash")
      }, 1000)
    } else {
      // Autenticação falhou
      setTimeout(() => {
        setIsLoading(false)
        setLoginError("Email ou senha incorretos. Por favor, tente novamente.")
      }, 1000)
    }
  }

  // Renderização segura para SSR
  if (!mounted) {
    return null
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-muted/40 p-4">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-blue-50 z-[-1]" />

      <div className="w-full max-w-md">
        <Card className="border-2">
          <CardHeader className="space-y-1 text-center">
            <div className="flex justify-center mb-2">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Lock className="h-6 w-6 text-primary" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold">Dashboard Administrativo</CardTitle>
            <CardDescription>Entre com suas credenciais de administrador para acessar o painel</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="admin@admin.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="senha"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Senha</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="••••••••" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {loginError && (
                  <Alert variant="destructive">
                    <AlertDescription>{loginError}</AlertDescription>
                  </Alert>
                )}

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Autenticando...
                    </>
                  ) : (
                    "Entrar"
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter className="text-center text-sm text-muted-foreground">
            <p className="w-full">Acesso restrito apenas para administradores do sistema AstroConsciente</p>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
