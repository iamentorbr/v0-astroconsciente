// Esta é uma simulação da integração com IA
// Em um ambiente real, seria integrado com OpenAI ou outro serviço de IA

interface MapaAstrologico {
  nome: string
  dataNascimento: string
  horaNascimento: string
  localNascimento: string
  sol: string
  ascendente: string
  lua: string
}

interface Questionario {
  [key: string]: string
}

// Atualize a função generateAstroTherapeuticProtocol para aceitar o tipo de protocolo

export async function generateAstroTherapeuticProtocol(
  mapa: MapaAstrologico,
  respostas: Record<number, Questionario>,
  orientacao: string,
  tipoProtocolo = "autoconhecimento",
): Promise<string> {
  // Simulação de delay para parecer que está processando
  await new Promise((resolve) => setTimeout(resolve, 3000))

  // Em uma implementação real, aqui seria feita uma chamada para a API de IA
  // com os dados do mapa, respostas, orientação e tipo de protocolo

  // Título do protocolo baseado no tipo selecionado
  let tituloProtocolo = "PROTOCOLO ASTROTERAPÊUTICO PERSONALIZADO";
  let subtitulo = "";
  let abordagemEspecifica = "";

  switch (tipoProtocolo) {
    case "autoconhecimento":
      tituloProtocolo = "PROTOCOLO PARA AUTOCONHECIMENTO";
      subtitulo = "Jornada de Autodescoberta Astrológica";
      abordagemEspecifica = `Este protocolo foi desenvolvido para aprofundar seu autoconhecimento através da compreensão dos arquétipos astrológicos presentes em seu mapa natal. Através de práticas reflexivas e exercícios específicos, você será guiado em uma jornada de descoberta pessoal que revela padrões, potenciais e desafios únicos da sua configuração astrológica.`;
      break;
    case "manifestacao":
      tituloProtocolo = "PROTOCOLO PARA MANIFESTAÇÃO CONSCIENTE";
      subtitulo = "Alinhando Intenções com Energias Cósmicas";
      abordagemEspecifica = `Este protocolo foi criado para ajudá-lo a manifestar seus objetivos e desejos de forma alinhada com as energias do seu mapa astrológico. Através da compreensão dos ciclos cósmicos e da utilização consciente dos arquétipos presentes em seu mapa, você aprenderá a co-criar com o universo de maneira mais efetiva e harmoniosa.`;
      break;
    case "emocional":
      tituloProtocolo = "PROTOCOLO EMOCIONAL";
      subtitulo = "Equilibrando o Mundo Interior através da Astrologia";
      abordagemEspecifica = `Este protocolo foi desenhado para trabalhar especificamente com seus padrões emocionais, utilizando a sabedoria astrológica como mapa para a compreensão e transformação. Focando especialmente nas posições lunares e aspectos relacionados às águas emocionais do seu mapa, este trabalho visa promover maior equilíbrio e fluidez emocional.`;
      break;
    case "espiritual":
      tituloProtocolo = "PROTOCOLO ESPIRITUAL";
      subtitulo = "Conexão Cósmica e Desenvolvimento Interior";
      abordagemEspecifica = `Este protocolo foi concebido para aprofundar sua conexão espiritual através da compreensão dos aspectos transcendentes do seu mapa astrológico. Trabalhando com os planetas transpessoais e as casas relacionadas à espiritualidade, este caminho visa expandir sua consciência e fortalecer sua conexão com dimensões mais sutis da existência.`;
      break;
  }

  return `# ${tituloProtocolo}
## ${subtitulo}

## PARA: ${mapa.nome}

### BASEADO NO MAPA ASTROLÓGICO
- Sol em ${mapa.sol}
- Lua em ${mapa.lua}
- Ascendente em ${mapa.ascendente}

## INTRODUÇÃO

${abordagemEspecifica}

Este protocolo foi desenvolvido especificamente para você, com base no seu mapa astrológico e nas respostas fornecidas no questionário. O objetivo é oferecer um caminho estruturado para trabalhar os aspectos identificados na sua orientação terapêutica, aprofundando o autoconhecimento e promovendo transformação pessoal.

## TEMAS CENTRAIS PARA TRABALHO

1. **Integração ${mapa.sol}-${mapa.lua}**
   A dinâmica entre seu Sol em ${mapa.sol} e sua Lua em ${mapa.lua} revela uma tensão criativa entre ${getSignoQualidade(mapa.sol)} e ${getSignoQualidade(mapa.lua)}. Este é um eixo central para seu desenvolvimento pessoal.

2. **Expressão Autêntica através do Ascendente**
   Seu Ascendente em ${mapa.ascendente} representa sua interface com o mundo. Trabalhar com essa energia permite uma expressão mais autêntica e consciente.

3. **Padrões Emocionais Recorrentes**
   Suas respostas indicam padrões emocionais relacionados a ${getRespostaTendencia(respostas)}. Estes padrões têm raízes profundas que podem ser exploradas e transformadas.

## PRÁTICAS RECOMENDADAS

### Semana 1-2: Observação e Consciência

1. **Diário Reflexivo Diário** - Reserve 15 minutos por dia para registrar:
   - Situações que despertaram emoções intensas
   - Padrões de pensamento recorrentes
   - Conexões percebidas com os arquétipos astrológicos

2. **Meditação Guiada com Foco nos Elementos** - Prática de 10 minutos diários conectando-se com os elementos predominantes no seu mapa:
   - ${getElementosPredominantes(mapa)}

### Semana 3-4: Exploração e Compreensão

1. **Trabalho com Símbolos e Imagens** - Crie ou encontre imagens que representem:
   - A energia do seu Sol em ${mapa.sol}
   - A energia da sua Lua em ${mapa.lua}
   - O diálogo entre essas energias

2. **Prática Corporal Integrativa** - Exercícios que ajudam a incorporar as qualidades de:
   - Enraizamento (Terra)
   - Fluidez (Água)
   - Expressão (Fogo)
   - Expansão (Ar)

### Semana 5-6: Transformação e Integração

1. **Ritual Personalizado** - Crie um ritual semanal que honre as energias do seu mapa e promova integração, incluindo:
   - Elementos simbólicos relacionados aos seus signos
   - Afirmações transformadoras
   - Visualização criativa

2. **Prática Relacional** - Exercícios para trabalhar os padrões identificados nos relacionamentos:
   - Comunicação consciente
   - Estabelecimento de limites saudáveis
   - Expressão autêntica de necessidades

## REFLEXÕES SEMANAIS

Para cada semana, propomos uma pergunta reflexiva para aprofundar sua jornada:

1. Como a energia do meu Sol em ${mapa.sol} se manifesta nas minhas escolhas conscientes?
2. De que formas minha Lua em ${mapa.lua} influencia minhas necessidades emocionais?
3. Como meu Ascendente em ${mapa.ascendente} afeta a forma como me apresento ao mundo?
4. Quais padrões emocionais recorrentes posso identificar em minha vida?
5. Como posso integrar melhor as energias aparentemente contraditórias em meu mapa?
6. Que recursos internos posso acessar para trabalhar meus desafios?

## RECURSOS ADICIONAIS

- **Leituras Recomendadas**: Textos sobre astrologia psicológica e desenvolvimento pessoal
- **Práticas Complementares**: Sugestões de outras modalidades terapêuticas que podem beneficiar seu processo
- **Exercícios de Visualização**: Scripts personalizados para trabalho com imaginação ativa

## CONCLUSÃO

Este protocolo oferece um ponto de partida para sua jornada de autoconhecimento através da astrologia. Lembre-se que o processo é pessoal e pode ser adaptado conforme sua experiência. Recomendamos revisitar este protocolo após 6 semanas para avaliar seu progresso e ajustar as práticas conforme necessário.

---

*Este protocolo foi gerado pelo sistema AstroConsciente com base nos dados fornecidos. Para uma análise mais aprofundada, considere agendar uma consulta com um astrólogo ou terapeuta especializado.*
}

// Funções auxiliares
function getSignoQualidade(signo: string): string {
  const qualidades: Record<string, string> = {
    Áries: "expressão direta, iniciativa e coragem",
    Touro: "estabilidade, praticidade e apreciação sensorial",
    Gêmeos: "comunicação, curiosidade e adaptabilidade",
    Câncer: "nutrição emocional, proteção e memória",
    Leão: "expressão criativa, liderança e reconhecimento",
    Virgem: "análise, aperfeiçoamento e serviço",
    Libra: "harmonia, equilíbrio e relacionamentos",
    Escorpião: "transformação, profundidade e intensidade",
    Sagitário: "expansão, significado e liberdade",
    Capricórnio: "estrutura, responsabilidade e realização",
    Aquário: "inovação, comunidade e originalidade",
    Peixes: "compaixão, transcendência e intuição",
  }

  return qualidades[signo] || "qualidades diversas"
}

function getRespostaTendencia(respostas: Record<number, Questionario>, grupo = 1): string {
  // Simulação - seria substituída por análise real das respostas
  const tendencias = [
    "processar internamente antes de expressar",
    "buscar soluções práticas e concretas",
    "valorizar a conexão emocional profunda",
    "buscar significado através de experiências pessoais",
  ]

  return tendencias[grupo - 1]
}

function getElementosPredominantes(mapa: MapaAstrologico): string {
  // Mapeamento de signos para elementos
  const elementos: Record<string, string> = {
    Áries: "Fogo",
    Leão: "Fogo",
    Sagitário: "Fogo",
    Touro: "Terra",
    Virgem: "Terra",
    Capricórnio: "Terra",
    Gêmeos: "Ar",
    Libra: "Ar",
    Aquário: "Ar",
    Câncer: "Água",
    Escorpião: "Água",
    Peixes: "Água",
  }

  const elementosPresentes = new Set([
    elementos[mapa.sol] || "",
    elementos[mapa.lua] || "",
    elementos[mapa.ascendente] || "",
  ])

  return Array.from(elementosPresentes)
    .filter((e) => e)
    .join(", ")
}
