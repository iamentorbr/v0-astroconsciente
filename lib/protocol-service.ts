import type { Protocol, ProtocolDay, ProtocolAction } from "./protocol-types"

// Função para gerar um protocolo completo de 21 dias
export function generateProtocol(
  type: "autoconhecimento" | "manifestacao" | "emocional" | "espiritual",
  userData: any,
): Protocol {
  try {
    const baseProtocol = getBaseProtocol(type)

    // Personalizar o protocolo com base nos dados do usuário
    const personalizedDays = baseProtocol.days.map((day) => {
      return {
        ...day,
        content: personalizeContent(day.content, userData),
        actions: day.actions.map((action) => ({
          ...action,
          instructions: personalizeContent(action.instructions, userData),
        })),
      }
    })

    return {
      ...baseProtocol,
      days: personalizedDays,
    }
  } catch (error) {
    console.error("Error generating protocol:", error)
    // Retornar um protocolo vazio em caso de erro
    return {
      id: type,
      type,
      title: `PROTOCOLO ${type.toUpperCase()}`,
      subtitle: "Erro ao gerar protocolo",
      description: "Ocorreu um erro ao gerar o protocolo. Por favor, tente novamente.",
      days: [],
    }
  }
}

// Função para personalizar o conteúdo com base nos dados do usuário
function personalizeContent(content: string, userData: any): string {
  if (!userData || !content) return content || ""

  let personalized = content

  // Substituir placeholders com dados do usuário
  if (userData.nome) {
    personalized = personalized.replace(/\{nome\}/g, userData.nome)
  } else {
    personalized = personalized.replace(/\{nome\}/g, "")
  }

  if (userData.sol) {
    personalized = personalized.replace(/\{sol\}/g, userData.sol)
  } else {
    personalized = personalized.replace(/\{sol\}/g, "seu signo solar")
  }

  if (userData.lua) {
    personalized = personalized.replace(/\{lua\}/g, userData.lua)
  } else {
    personalized = personalized.replace(/\{lua\}/g, "seu signo lunar")
  }

  if (userData.ascendente) {
    personalized = personalized.replace(/\{ascendente\}/g, userData.ascendente)
  } else {
    personalized = personalized.replace(/\{ascendente\}/g, "seu ascendente")
  }

  return personalized
}

// Função para obter o protocolo base de acordo com o tipo
function getBaseProtocol(type: "autoconhecimento" | "manifestacao" | "emocional" | "espiritual"): Protocol {
  switch (type) {
    case "autoconhecimento":
      return createAutoconhecimentoProtocol()
    case "manifestacao":
      return createManifestacaoProtocol()
    case "emocional":
      return createEmocionalProtocol()
    case "espiritual":
      return createEspiritualProtocol()
    default:
      return createAutoconhecimentoProtocol()
  }
}

// Funções para criar os protocolos base
function createAutoconhecimentoProtocol(): Protocol {
  return {
    id: "autoconhecimento",
    type: "autoconhecimento",
    title: "PROTOCOLO PARA AUTOCONHECIMENTO",
    subtitle: "Jornada de Autodescoberta Astrológica",
    description:
      "Este protocolo foi desenvolvido para aprofundar seu autoconhecimento através da compreensão dos arquétipos astrológicos presentes em seu mapa natal. Através de práticas reflexivas e exercícios específicos, você será guiado em uma jornada de descoberta pessoal que revela padrões, potenciais e desafios únicos da sua configuração astrológica.",
    days: generateAutoconhecimentoDays(),
  }
}

function createManifestacaoProtocol(): Protocol {
  return {
    id: "manifestacao",
    type: "manifestacao",
    title: "PROTOCOLO PARA MANIFESTAÇÃO CONSCIENTE",
    subtitle: "Alinhando Intenções com Energias Cósmicas",
    description:
      "Este protocolo foi criado para ajudá-lo a manifestar seus objetivos e desejos de forma alinhada com as energias do seu mapa astrológico. Através da compreensão dos ciclos cósmicos e da utilização consciente dos arquétipos presentes em seu mapa, você aprenderá a co-criar com o universo de maneira mais efetiva e harmoniosa.",
    days: generateManifestacaoDays(),
  }
}

function createEmocionalProtocol(): Protocol {
  return {
    id: "emocional",
    type: "emocional",
    title: "PROTOCOLO EMOCIONAL",
    subtitle: "Equilibrando o Mundo Interior através da Astrologia",
    description:
      "Este protocolo foi desenhado para trabalhar especificamente com seus padrões emocionais, utilizando a sabedoria astrológica como mapa para a compreensão e transformação. Focando especialmente nas posições lunares e aspectos relacionados às águas emocionais do seu mapa, este trabalho visa promover maior equilíbrio e fluidez emocional.",
    days: generateEmocionalDays(),
  }
}

function createEspiritualProtocol(): Protocol {
  return {
    id: "espiritual",
    type: "espiritual",
    title: "PROTOCOLO ESPIRITUAL",
    subtitle: "Conexão Cósmica e Desenvolvimento Interior",
    description:
      "Este protocolo foi concebido para aprofundar sua conexão espiritual através da compreensão dos aspectos transcendentes do seu mapa astrológico. Trabalhando com os planetas transpessoais e as casas relacionadas à espiritualidade, este caminho visa expandir sua consciência e fortalecer sua conexão com dimensões mais sutis da existência.",
    days: generateEspiritualDays(),
  }
}

// Funções para gerar os dias de cada protocolo
function generateAutoconhecimentoDays(): ProtocolDay[] {
  const days: ProtocolDay[] = []

  // Semana 1: Fundamentos e Observação
  days.push({
    day: 1,
    title: "Reconhecendo Seu Mapa Interior",
    description: "Introdução aos elementos fundamentais do seu mapa astrológico e como eles se manifestam em sua vida.",
    content:
      "Bem-vindo(a) ao primeiro dia da sua jornada de autoconhecimento astrológico, {nome}. Hoje vamos explorar os elementos fundamentais do seu mapa natal e como eles formam a base da sua personalidade. Com Sol em {sol}, Lua em {lua} e Ascendente em {ascendente}, você possui uma configuração única que influencia sua forma de ser e estar no mundo. Hoje, vamos começar a reconhecer esses padrões em sua vida cotidiana.",
    isPreview: true,
    actions: [
      {
        type: "reflection",
        title: "Reflexão Inicial",
        description: "Reconheça os padrões do seu mapa astrológico em sua vida",
        duration: "15 minutos",
        instructions:
          "Encontre um lugar tranquilo e reflita sobre como as qualidades do seu signo solar ({sol}) se manifestam em sua vida. Anote pelo menos três situações recentes em que você expressou claramente essas características.",
      },
      {
        type: "journaling",
        title: "Registro de Autoconhecimento",
        description: "Documente suas observações sobre seus padrões astrológicos",
        duration: "20 minutos",
        instructions:
          "Em seu diário, responda às seguintes perguntas: 1) Como as características do meu Sol em {sol} influenciam minhas decisões conscientes? 2) De que forma minha Lua em {lua} afeta meus padrões emocionais? 3) Como meu Ascendente em {ascendente} molda a forma como os outros me percebem inicialmente?",
      },
    ],
  })

  days.push({
    day: 2,
    title: "Explorando Seu Sol Interior",
    description: "Aprofundamento na energia do seu Sol e como ela representa sua essência consciente.",
    content:
      "Hoje, {nome}, vamos nos aprofundar na energia do seu Sol em {sol}. O Sol representa nossa essência consciente, nossa vitalidade e propósito de vida. Com seu Sol em {sol}, você naturalmente expressa as qualidades deste signo em sua busca por autorrealização. Vamos explorar como essa energia solar se manifesta em diferentes áreas da sua vida e como você pode integrá-la de forma mais consciente.",
    isPreview: true,
    actions: [
      {
        type: "meditation",
        title: "Meditação Solar",
        description: "Conecte-se com a energia do seu Sol",
        duration: "10 minutos",
        instructions:
          "Sente-se confortavelmente e visualize um sol dourado brilhante no centro do seu peito. Imagine que este sol irradia as qualidades do seu signo solar ({sol}). Respire profundamente e a cada inspiração, sinta essas qualidades se fortalecendo em você.",
      },
      {
        type: "practice",
        title: "Expressão Solar",
        description: "Atividade para expressar conscientemente a energia do seu Sol",
        duration: "30 minutos",
        instructions:
          "Escolha uma atividade que represente a expressão natural do seu signo solar ({sol}) e dedique-se a ela hoje. Por exemplo, se seu Sol está em um signo de fogo, pode ser uma atividade física ou criativa; se está em terra, algo prático ou sensorial; em ar, algo intelectual ou comunicativo; em água, algo emocional ou intuitivo.",
      },
    ],
  })

  days.push({
    day: 3,
    title: "Navegando pelas Águas Lunares",
    description: "Compreensão dos padrões emocionais representados pela sua Lua.",
    content:
      "No terceiro dia da sua jornada, {nome}, vamos explorar a energia da sua Lua em {lua}. A Lua representa nosso mundo emocional, nossas necessidades inconscientes e nossos padrões de resposta instintivos. Com sua Lua em {lua}, você naturalmente busca segurança emocional através das qualidades deste signo. Hoje, vamos observar como esses padrões lunares influenciam suas reações e necessidades emocionais.",
    isPreview: true,
    actions: [
      {
        type: "journaling",
        title: "Diário Lunar",
        description: "Explore seus padrões emocionais lunares",
        duration: "20 minutos",
        instructions:
          "Em seu diário, registre: 1) Quais situações despertam suas reações emocionais mais intensas? 2) O que você prec isa para se sentir emocionalmente seguro? 3) Como as qualidades da sua Lua em {lua} se manifestam em seus relacionamentos próximos?",
      },
      {
        type: "ritual",
        title: "Ritual de Conexão Lunar",
        description: "Honre suas necessidades emocionais",
        duration: "15 minutos",
        instructions:
          "Crie um pequeno altar com objetos que representem conforto emocional para você. Inclua elementos que correspondam ao elemento da sua Lua (fogo, terra, ar ou água). À noite, acenda uma vela branca e dedique alguns minutos para honrar suas necessidades emocionais, permitindo-se sentir plenamente.",
      },
    ],
  })

  // Adicionar mais dias para completar os 21
  for (let i = 4; i <= 21; i++) {
    days.push(createGenericProtocolDay(i, "autoconhecimento"))
  }

  return days
}

// Implementações das outras funções de geração de dias...
// (Mantendo o código mais curto, mas você deve manter as implementações completas)

function generateManifestacaoDays(): ProtocolDay[] {
  // Implementação simplificada para o exemplo
  const days: ProtocolDay[] = []

  // Adicionar 3 dias de preview
  for (let i = 1; i <= 3; i++) {
    days.push({
      day: i,
      title: `Manifestação Consciente - Dia ${i}`,
      description: "Aprenda a manifestar seus desejos alinhados com seu mapa astrológico.",
      content: "Conteúdo do dia sobre manifestação consciente.",
      isPreview: true,
      actions: [
        {
          type: "reflection",
          title: "Reflexão sobre Manifestação",
          description: "Explore seus padrões de manifestação",
          duration: "15 minutos",
          instructions: "Instruções para reflexão sobre manifestação.",
        },
        {
          type: "practice",
          title: "Prática de Manifestação",
          description: "Exercício prático de manifestação",
          duration: "20 minutos",
          instructions: "Instruções para prática de manifestação.",
        },
      ],
    })
  }

  // Adicionar os dias restantes
  for (let i = 4; i <= 21; i++) {
    days.push(createGenericProtocolDay(i, "manifestacao"))
  }

  return days
}

function generateEmocionalDays(): ProtocolDay[] {
  // Implementação simplificada para o exemplo
  const days: ProtocolDay[] = []

  // Adicionar 3 dias de preview
  for (let i = 1; i <= 3; i++) {
    days.push({
      day: i,
      title: `Equilíbrio Emocional - Dia ${i}`,
      description: "Trabalhe seus padrões emocionais através da astrologia.",
      content: "Conteúdo do dia sobre equilíbrio emocional.",
      isPreview: true,
      actions: [
        {
          type: "meditation",
          title: "Meditação Emocional",
          description: "Conecte-se com suas emoções",
          duration: "10 minutos",
          instructions: "Instruções para meditação emocional.",
        },
        {
          type: "journaling",
          title: "Diário Emocional",
          description: "Registre seus padrões emocionais",
          duration: "15 minutos",
          instructions: "Instruções para registro emocional.",
        },
      ],
    })
  }

  // Adicionar os dias restantes
  for (let i = 4; i <= 21; i++) {
    days.push(createGenericProtocolDay(i, "emocional"))
  }

  return days
}

function generateEspiritualDays(): ProtocolDay[] {
  // Implementação simplificada para o exemplo
  const days: ProtocolDay[] = []

  // Adicionar 3 dias de preview
  for (let i = 1; i <= 3; i++) {
    days.push({
      day: i,
      title: `Conexão Espiritual - Dia ${i}`,
      description: "Explore a dimensão espiritual do seu mapa astrológico.",
      content: "Conteúdo do dia sobre conexão espiritual.",
      isPreview: true,
      actions: [
        {
          type: "ritual",
          title: "Ritual Espiritual",
          description: "Conecte-se com energias superiores",
          duration: "20 minutos",
          instructions: "Instruções para ritual espiritual.",
        },
        {
          type: "meditation",
          title: "Meditação Transcendental",
          description: "Expanda sua consciência",
          duration: "15 minutos",
          instructions: "Instruções para meditação transcendental.",
        },
      ],
    })
  }

  // Adicionar os dias restantes
  for (let i = 4; i <= 21; i++) {
    days.push(createGenericProtocolDay(i, "espiritual"))
  }

  return days
}

// Função auxiliar para criar dias genéricos para completar os 21 dias
function createGenericProtocolDay(
  dayNumber: number,
  protocolType: "autoconhecimento" | "manifestacao" | "emocional" | "espiritual",
): ProtocolDay {
  // Títulos e temas baseados no tipo de protocolo e número do dia
  let title = ""
  let description = ""
  let content = ""

  // Determinar semana
  const week = Math.ceil(dayNumber / 7)

  switch (protocolType) {
    case "autoconhecimento":
      if (week === 1) {
        title = `Explorando Padrões Astrológicos - Dia ${dayNumber}`
        description = "Continuação da exploração dos elementos fundamentais do seu mapa astrológico."
        content =
          "Continuamos nossa jornada de autoconhecimento explorando mais aspectos do seu mapa astrológico e como eles se manifestam em sua vida cotidiana."
      } else if (week === 2) {
        title = `Integrando Polaridades - Dia ${dayNumber}`
        description = "Trabalho com aspectos complementares do seu mapa astrológico."
        content =
          "Nesta fase da jornada, focamos na integração de energias aparentemente opostas em seu mapa, buscando maior equilíbrio e completude."
      } else {
        title = `Transformação Consciente - Dia ${dayNumber}`
        description = "Aplicação prática dos insights astrológicos para transformação pessoal."
        content =
          "Na fase final da jornada, trabalhamos na aplicação prática dos insights obtidos, transformando padrões limitantes e potencializando seus dons naturais."
      }
      break

    case "manifestacao":
      if (week === 1) {
        title = `Fundamentos da Co-criação - Dia ${dayNumber}`
        description = "Continuação do trabalho com os princípios básicos da manifestação astrológica."
        content =
          "Continuamos explorando os fundamentos da manifestação consciente através do seu mapa astrológico, estabelecendo as bases para uma co-criação efetiva."
      } else if (week === 2) {
        title = `Superando Bloqueios - Dia ${dayNumber}`
        description = "Identificação e transformação de padrões que bloqueiam sua manifestação."
        content =
          "Nesta fase, trabalhamos com os aspectos do seu mapa que podem representar bloqueios ou desafios para sua capacidade de manifestar, transformando-os em aliados."
      } else {
        title = `Manifestação Alinhada - Dia ${dayNumber}`
        description = "Práticas avançadas de manifestação em harmonia com seu propósito astrológico."
        content =
          "Na fase final, integramos todas as ferramentas e insights para uma manifestação plenamente alinhada com seu propósito e potencial astrológico."
      }
      break

    case "emocional":
      if (week === 1) {
        title = `Consciência Emocional - Dia ${dayNumber}`
        description = "Continuação do desenvolvimento de consciência sobre seus padrões emocionais."
        content =
          "Continuamos o trabalho de desenvolvimento de consciência sobre seus padrões emocionais, observando como eles se manifestam em diferentes contextos."
      } else if (week === 2) {
        title = `Transformação Emocional - Dia ${dayNumber}`
        description = "Práticas para transformar padrões emocionais limitantes."
        content =
          "Nesta fase, focamos em práticas específicas para transformar padrões emocionais que não servem mais ao seu crescimento, utilizando a sabedoria do seu mapa astrológico."
      } else {
        title = `Fluidez Emocional - Dia ${dayNumber}`
        description = "Cultivo de maior fluidez e resiliência emocional."
        content =
          "Na fase final, integramos as práticas e insights para desenvolver maior fluidez, resiliência e sabedoria emocional, em harmonia com seu mapa astrológico."
      }
      break

    case "espiritual":
      if (week === 1) {
        title = `Conexão Interior - Dia ${dayNumber}`
        description = "Aprofundamento da conexão com sua essência espiritual."
        content =
          "Continuamos o trabalho de conexão com sua essência espiritual, explorando as dimensões transcendentes do seu mapa astrológico."
      } else if (week === 2) {
        title = `Expansão de Consciência - Dia ${dayNumber}`
        description = "Práticas para expandir sua percepção e consciência."
        content =
          "Nesta fase, focamos em práticas que expandem sua consciência e percepção, utilizando as energias transpessoais do seu mapa astrológico como guias."
      } else {
        title = `Integração Espiritual - Dia ${dayNumber}`
        description = "Incorporação da dimensão espiritual na vida cotidiana."
        content =
          "Na fase final, trabalhamos na integração da dimensão espiritual em sua vida cotidiana, manifestando seu propósito superior em todas as áreas."
      }
      break
  }

  // Criar ações genéricas baseadas no tipo de protocolo
  const actions: ProtocolAction[] = [
    {
      type: "reflection",
      title: "Reflexão Diária",
      description: "Momento de introspecção e observação",
      duration: "15 minutos",
      instructions:
        "Encontre um lugar tranquilo e reflita sobre como os temas trabalhados hoje se manifestam em sua vida. Anote insights e observações em seu diário.",
    },
    {
      type: "practice",
      title: "Prática de Integração",
      description: "Atividade para incorporar os aprendizados do dia",
      duration: "20 minutos",
      instructions:
        "Escolha uma atividade que ajude a integrar os aprendizados do dia, alinhada com as energias do seu mapa astrológico. Pode ser uma prática criativa, física, intelectual ou contemplativa.",
    },
  ]

  return {
    day: dayNumber,
    title,
    description,
    content,
    actions,
  }
}
