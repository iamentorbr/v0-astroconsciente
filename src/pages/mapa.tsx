import { useState } from "react";
import { useRouter } from "next/router";

const signos = [
  "Áries", "Touro", "Gêmeos", "Câncer", "Leão", "Virgem",
  "Libra", "Escorpião", "Sagitário", "Capricórnio", "Aquário", "Peixes"
];

const pontos = [
  { label: "Sol ☀️", key: "sol", obrigatorio: true },
  { label: "Lua 🌙", key: "lua", obrigatorio: true },
  { label: "Ascendente ⬆️", key: "ascendente", obrigatorio: true },
  { label: "Vênus 💖", key: "venus", obrigatorio: false },
  { label: "Mercúrio 🗣️", key: "mercurio", obrigatorio: false },
  { label: "Marte 🔥", key: "marte", obrigatorio: false },
  { label: "Saturno 🪐", key: "saturno", obrigatorio: false }
];

export default function Mapa() {
  const [dados, setDados] = useState<Record<string, string>>({});
  const router = useRouter();

  const handleChange = (key: string, value: string) => {
    setDados((prev) => ({ ...prev, [key]: value }));
  };

  const podeAvancar = pontos
    .filter((p) => p.obrigatorio)
    .every((p) => dados[p.key]);

  return (
    <div className="min-h-screen bg-fundo text-brancoMistico flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-xl">
        <h1 className="text-3xl md:text-4xl font-titulo text-dourado mb-4">
          Insira os Signos do seu Mapa
        </h1>
        <p className="text-base md:text-lg text-brancoMistico/80 mb-6">
          Preencha os campos abaixo com os signos correspondentes aos seus pontos astrais.
        </p>

        <div className="grid grid-cols-1 gap-4">
          {pontos.map(({ label, key, obrigatorio }) => (
            <div key={key}>
              <label className="block mb-1 text-sm">
                {label} {obrigatorio && <span className="text-dourado">*</span>}
              </label>
              <select
                className="w-full p-3 rounded-xl bg-white/10 text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-roxo"
                value={dados[key] || ""}
                onChange={(e) => handleChange(key, e.target.value)}
              >
                <option value="">Selecione</option>
                {signos.map((signo) => (
                  <option key={signo} value={signo}>{signo}</option>
                ))}
              </select>
            </div>
          ))}
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={() => router.push("/questionario/1")}
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