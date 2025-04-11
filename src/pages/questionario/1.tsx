import { useState } from "react";
import { useRouter } from "next/router";

const perguntas = [
  {
    id: "q1",
    texto: "Como você descreveria sua forma de pensar?",
    opcoes: [
      "Analítica e lógica",
      "Criativa e imaginativa",
      "Intuitiva e simbólica",
      "Caótica e dispersa"
    ]
  },
  {
    id: "q2",
    texto: "Você sente que tem facilidade de manter o foco em uma tarefa?",
    opcoes: [
      "Sim, com facilidade",
      "Sim, mas por pouco tempo",
      "Dificilmente",
      "Não consigo me concentrar"
    ]
  },
  {
    id: "q3",
    texto: "Sua mente tende a:",
    opcoes: [
      "Racionalizar tudo",
      "Vaguear por ideias aleatórias",
      "Se conectar com ideias maiores",
      "Entrar em loops de preocupação"
    ]
  }
];

export default function Questionario1() {
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
          Etapa 1: Mente
        </h1>
        <p className="text-base text-brancoMistico/80 mb-6">
          Responda com sinceridade sobre como sua mente funciona no dia a dia.
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

        <div className="mt-8 flex justify-end">
          <button
            onClick={() => router.push("/questionario/2")}
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
