import { useState } from "react";
import { useRouter } from "next/router";

const perguntas = [
  {
    id: "q1",
    texto: "Qual frase mais se aproxima da sua relação com o medo?",
    opcoes: [
      "Tenho medo de me expor ou ser julgada(o)",
      "Tenho medo de falhar ou não ser suficiente",
      "Tenho medo de perder o controle das situações",
      "Meus medos são inconscientes ou difíceis de identificar"
    ]
  },
  {
    id: "q2",
    texto: "O que você sente que mais te limita hoje?",
    opcoes: [
      "Falta de confiança em mim mesma(o)",
      "Medo de não ser aceita(o)",
      "Apego ao controle ou perfeccionismo",
      "Crenças herdadas da família ou cultura"
    ]
  },
  {
    id: "q3",
    texto: "Quando você pensa em mudança ou transformação...",
    opcoes: [
      "Eu travo, mesmo querendo mudar",
      "Eu me movimento, mas me saboto depois",
      "Eu me iludo, mas não ajo de verdade",
      "Eu ajo, mas ainda carrego medos profundos"
    ]
  }
];

export default function Questionario2() {
  const [respostas, setRespostas] = useState<Record<string, string>>({});
  const router = useRouter();

  const podeAvancar = perguntas.every((p) => respostas[p.id]);

  const handleChange = (id: string, valor: string) => {
    setRespostas((prev) => ({ ...prev, [id]: valor }));
  };

  return (
    <div className="min-h-screen bg-fundo text-brancoMistico flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-2xl">
        <h1 className="text-3xl md:text-4xl font-titulo text-dourado mb-4">
          Etapa 2: Medos e Crenças
        </h1>
        <p className="text-base text-brancoMistico/80 mb-6">
          Reflita sobre os bloqueios que limitam sua expressão e evolução.
        </p>

        <div className="space-y-6">
          {perguntas.map((pergunta) => (
            <div key={pergunta.id}>
              <p className="mb-2 text-lg">{pergunta.texto}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {pergunta.opcoes.map((opcao) => (
                  <label key={opcao} className={`cursor-pointer p-3 rounded-xl border border-white/20 hover:bg-white/10 transition-all ${respostas[pergunta.id] === opcao ? 'bg-roxo/60' : 'bg-white/5'}`}>
                    <input
                      type="radio"
                      name={pergunta.id}
                      value={opcao}
                      className="hidden"
                      onChange={() => handleChange(pergunta.id, opcao)}
                    />
                    {opcao}
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex justify-between">
          <button
            onClick={() => router.push("/questionario/1")}
            className="px-6 py-3 bg-white/10 text-white rounded-xl hover:bg-white/20 transition-all"
          >
            Voltar
          </button>
          <button
            onClick={() => router.push("/questionario/3")}
            disabled={!podeAvancar}
            className="px-6 py-3 bg-roxo rounded-xl shadow-md hover:bg-roxo/80 transition-all disabled:opacity-50"
          >
            Próximo
          </button>
        </div>
      </div>
    </div>
  );
}
