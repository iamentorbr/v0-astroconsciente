import { useEffect } from "react";
import { useRouter } from "next/router";

export default function GerandoRelatorio() {
  const router = useRouter();

  // Simulação de espera (ex: carregamento IA)
  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/resultado");
    }, 4000); // 4 segundos, pode ajustar depois

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="min-h-screen bg-fundo text-brancoMistico flex flex-col items-center justify-center px-6 text-center">
      <div className="animate-pulse mb-6">
        <div className="w-20 h-20 rounded-full border-4 border-dourado border-t-transparent animate-spin mx-auto mb-4" />
        <h1 className="text-2xl md:text-3xl font-titulo text-dourado">
          Estamos conectando com o cosmos...
        </h1>
      </div>
      <p className="text-base md:text-lg text-brancoMistico/80 max-w-md">
        Estamos canalizando as informações da sua Tríade, seus pilares e respostas.
        Isso pode levar alguns instantes. Respire fundo e permita-se receber.
      </p>
    </div>
  );
}
