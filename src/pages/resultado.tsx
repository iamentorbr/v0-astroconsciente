export default function Resultado() {
  // Em breve: os dados virão da IA
  const dadosFicticios = {
    nome: "Lys",
    trigrama: "Sol em Leão, Lua em Câncer, Ascendente em Peixes",
    mensagem: "Você está em um ponto de virada interna. Sua luz quer brilhar, mas sua alma pede acolhimento.",
    mentalidade: "Sua mente navega entre a intuição profunda e a vontade de clareza. Você é movida por emoções sutis, mas busca sentido lógico nas experiências.",
    desafios: "Medo de não ser vista por quem você é. Tendência a se esconder quando mais precisa se mostrar.",
    sonhos: "Um chamado forte por autenticidade e conexões verdadeiras. Desejo de criar algo significativo que inspire outros.",
    acoes: "Confie mais nos seus sentimentos. Ancore sua intuição com ações reais. Pequenos rituais diários podem te ajudar.",
    produto: {
      nome: "Manual da Tríade Solar",
      descricao: "Um guia de autotransformação baseado na sua combinação Sol-Lua-Ascendente.",
      link: "#"
    }
  };

  return (
    <div className="min-h-screen bg-fundo text-brancoMistico px-6 py-12 flex flex-col items-center">
      <div className="max-w-3xl w-full">
        <h1 className="text-3xl font-titulo text-dourado mb-2">Leitura Astroconsciente</h1>
        <p className="text-base text-brancoMistico/70 mb-8">
          Relatório gerado com base na sua Tríade e respostas. Esta mensagem é única e exclusiva ✨
        </p>

        <section className="mb-6">
          <h2 className="text-xl text-dourado font-semibold mb-2">🌞 Sua Tríade</h2>
          <p>{dadosFicticios.trigrama}</p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl text-dourado font-semibold mb-2">🌀 Mensagem Canalizada</h2>
          <p className="italic text-brancoMistico/80">{dadosFicticios.mensagem}</p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl text-dourado font-semibold mb-2">🧠 Mentalidade e Comportamento</h2>
          <p>{dadosFicticios.mentalidade}</p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl text-dourado font-semibold mb-2">🌒 Desafios e Dores</h2>
          <p>{dadosFicticios.desafios}</p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl text-dourado font-semibold mb-2">🌠 Tendências e Sonhos</h2>
          <p>{dadosFicticios.sonhos}</p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl text-dourado font-semibold mb-2">🔮 Ações e Caminhos</h2>
          <p>{dadosFicticios.acoes}</p>
        </section>

        <section className="mt-10 p-6 rounded-xl border border-white/20 bg-white/5">
          <h2 className="text-xl text-dourado font-semibold mb-2">🎁 Sugestão Personalizada</h2>
          <p className="mb-2">{dadosFicticios.produto.descricao}</p>
          <a href={dadosFicticios.produto.link} className="inline-block px-5 py-3 bg-roxo rounded-lg shadow hover:bg-roxo/80 transition-all">
            Acessar {dadosFicticios.produto.nome}
          </a>
        </section>
      </div>
    </div>
  );
}
