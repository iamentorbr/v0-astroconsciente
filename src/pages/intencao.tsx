import { useState } from "react";
import { useRouter } from "next/router";

export default function Intencao() {
  const [intencao, setIntencao] = useState("");
  const router = useRouter();

  const handleNext = () => {
    if (intencao.length > 0) {
      // Aqui podemos salvar no localStorage ou contexto futuramente
      router.push("/mapa");
    }
  };

  return (
    <div className="min-h-screen bg-fundo text-brancoMistico flex flex-col items-center justify-center p-6">
      <div className="max-w-xl w-full">
        <h1 className="text-3xl md:text-4xl font-titulo text-dourado mb-4">
          Qual é a sua intenção?
        </h1>
        <p className="text-base md:text-lg text-brancoMistico/80 mb-6">
          Conte, com até 240 caracteres, o que você deseja entender ou transformar neste momento.
        </p>

        <textarea
          maxLength={240}
          rows={5}
          value={intencao}
          onChange={(e) => setIntencao(e.target.value)}
          className="w-full p-4 rounded-xl bg-white/10 text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-roxo resize-none"
          placeholder="Ex: Quero entender meus bloqueios nos relacionamentos..."
        />

        <div className="flex justify-between items-center mt-2 text-sm text-brancoMistico/70">
          <span>{intencao.length} / 240</span>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={handleNext}
            disabled={intencao.length === 0}
            className="px-6 py-3 bg-roxo rounded-xl shadow-md hover:bg-roxo/80 transition-all disabled:opacity-50"
          >
            Próximo
          </button>
        </div>
      </div>
    </div>
  );
}
