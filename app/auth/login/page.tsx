"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"

const formSchema = z.object({
  email: z.string().email({
    message: "Email inválido.",
  }),
  senha: z.string().min(1, {
    message: "A senha é obrigatória.",
  }),
})

export default function LoginPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [loginError, setLoginError] = useState("")

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

    // Simulação de login
    setTimeout(() => {
      // Em uma implementação real, aqui seria feita uma chamada para a API
      // para autenticar o usuário

      // Para demonstração, vamos simular um login bem-sucedido
      localStorage.setItem(
        "usuario",
        JSON.stringify({
          nome: "Usuário Demonstração",
          email: values.email,
          autenticado: true,
        }),
      )

      setIsLoading(false)
      router.push("/meus-protocolos")
    }, 1500)
  }

  return (
    <div className="container flex flex-col items-center justify-center min-h-screen py-12">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Entrar</CardTitle>
          <CardDescription>Acesse sua conta para visualizar seus protocolos</CardDescription>
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
                      <Input type="email" placeholder="seu.email@exemplo.com" {...field} />
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
                      <Input type="password" placeholder="******" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {loginError && <div className="text-sm text-red-500">{loginError}</div>}

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Entrando...
                  </>
                ) : (
                  "Entrar"
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="text-sm text-center text-muted-foreground">
            Não possui uma conta?{" "}
            <Link href="/auth/cadastro" className="text-primary hover:underline">
              Cadastre-se
            </Link>
          </div>
          <div className="text-sm text-center">
            <Link href="/auth/recuperar-senha" className="text-muted-foreground hover:text-foreground">
              Esqueceu sua senha?
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
