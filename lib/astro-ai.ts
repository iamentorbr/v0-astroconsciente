// Esta é uma simulação da integração com IA
// Em um ambiente real, seria integrado com OpenAI ou outro serviço de IA

interface MapaAstrologico {
  nome: string;
  dataNascimento: string;
  horaNascimento: string;
  localNascimento: string;
  sol: string;
  ascendente: string;
  lua: string;
}

export function gerarElementosDominantes(mapa: MapaAstrologico): string {
  const elementos: Record<string, string> = {
    "Áries": "Fogo",
    "Leão": "Fogo",
    "Sagitário": "Fogo",
    "Touro": "Terra",
    "Virgem": "Terra",
    "Capricórnio": "Terra",
    "Gêmeos": "Ar",
    "Libra": "Ar",
    "Aquário": "Ar",
    "Câncer": "Água",
    "Escorpião": "Água",
    "Peixes": "Água",
  };

  const elementosPresentes = new Set([
    elementos[mapa.sol] || "",
    elementos[mapa.lua] || "",
    elementos[mapa.ascendente] || "",
  ]);

  return Array.from(elementosPresentes)
    .filter((e) => e)
    .join(", ");
}
