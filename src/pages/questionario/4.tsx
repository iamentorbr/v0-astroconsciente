import { useState } from "react";
import { useRouter } from "next/router";

const perguntas = [
  {
    id: "q1",
    texto: "Qual dessas frases mais representa sua relação com a espiritualidade?",
    opcoes: [
      "Eu tenho uma prática espiritual regular",
      "Acredito em algo maior, mas não sigo nenhuma prática",
      "Me sinto conectada(o) com o todo, mas de forma intuitiva",
      "Tenho dúvidas ou resistência sobre esse tema"
    ]
  },
  {
    id: "q2",
    texto: "O que mais te conecta com o sagrado ou com algo maior?",
    opcoes: [
      "Meditação, oração ou silêncio interior",
      "A natureza e seus ciclos",
      "Arte, música ou criatividade",
      "Momentos de crise ou transformação"
    ]
  },
  {
    id: "q3",
    texto: "Como você lida com sua intuição?",
    opcoes: [
      "Confio muito e sigo o que sinto",
      "Escuto, mas às vezes duvido",
      "Sinto, mas costumo ignorar",
      "Tenho dificuldade em identificar o que é intuição"
    ]
  }
];

export default function Questionario4() {
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
          Etapa 4: Espiritualidade e Fé
        </h1>
        <p className="text-base text-brancoMistico/80 mb-6">
          Como você se conecta com o invisível e com sua sabedoria interna?
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
            onClick={() => router.push("/questionario/3")}
            className="px-6 py-3 bg-white/10 text-white rounded-xl hover:bg-white/20 transition-all"
          >
            Voltar
          </button>
          <button
            onClick={() => router.push("/gerando-relatorio")}
            disabled={!podeAvancar}
            className="px-6 py-3 bg-roxo rounded-xl shadow-md hover:bg-roxo/80 transition-all disabled:opacity-50"
          >
            Gerar Relatório
          </button>
        </div>
      </div>
    </div>
  );
}
