export default function Home() {
  return (
    <div className="min-h-screen bg-fundo text-brancoMistico flex flex-col items-center justify-center p-8 text-center">
      <div className="max-w-xl">
        <h1 className="text-4xl md:text-5xl font-titulo text-dourado mb-6">
          Bem-vinda ao Astroconsciente
        </h1>
        <p className="text-lg md:text-xl font-corpo text-brancoMistico/80 mb-10">
          Descubra sua verdade através da Tríade e desperte seu potencial mais profundo.
        </p>
        <a
          href="/intencao"
          className="px-6 py-3 bg-roxo rounded-2xl shadow-lg text-white font-semibold hover:bg-roxo/80 transition-all"
        >
          Iniciar Jornada
        </a>
      </div>
    </div>
  );
}