import { useState } from "react";
import { useRouter } from "next/router";

const perguntas = [
  {
    id: "q1",
    texto: "Quando você pensa no seu futuro ideal, o que mais aparece?",
    opcoes: [
      "Liberdade para viver com autenticidade",
      "Sucesso e reconhecimento por algo que amo",
      "Conexões profundas e relacionamentos significativos",
      "Paz interior e simplicidade"
    ]
  },
  {
    id: "q2",
    texto: "O que você mais deseja transformar na sua vida atual?",
    opcoes: [
      "Meu propósito e direção",
      "Minha relação com o trabalho",
      "Meus relacionamentos",
      "Minha relação comigo mesma(o)"
    ]
  },
  {
    id: "q3",
    texto: "Qual dessas frases mais representa seu desejo profundo?",
    opcoes: [
      "Quero viver algo novo, mesmo sem saber o quê",
      "Quero deixar um legado com o que sou",
      "Quero amar com verdade, inclusive a mim",
      "Quero sentir que estou no meu caminho"
    ]
  }
];

export default function Questionario3() {
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
          Etapa 3: Sonhos e Desejos
        </h1>
        <p className="text-base text-brancoMistico/80 mb-6">
          Compartilhe seus desejos mais profundos e o que você sonha viver.
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
            onClick={() => router.push("/questionario/2")}
            className="px-6 py-3 bg-white/10 text-white rounded-xl hover:bg-white/20 transition-all"
          >
            Voltar
          </button>
          <button
            onClick={() => router.push("/questionario/4")}
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
