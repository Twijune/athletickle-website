import { marketingCopy } from '../marketingCopy'
import { SITE_NAME } from '../../seo/config'
import type { EditionCopy } from './types'

// Brazilian Portuguese: academia, celular, assinatura, app.
export const pt: EditionCopy = {
  editions: {
    parkour: {
      title: 'Força e potência. Construídas em torno do seu parkour.',
      description: 'Dê à sua prática de parkour um plano estruturado de força e potência. Informe sua frequência de parkour e seus dias de treino complementar e veja para onde seguem seus próximos blocos de treino.',
      short: 'Treino complementar de força e potência para atletas de parkour.',
      features: [
        ['Sua prática conta', 'Sua frequência de parkour é um dado de entrada do seu plano de treino complementar. O app programa o trabalho de força e potência. Você planeja sua prática de parkour.'],
        ['Força com propósito', 'Programas elegíveis podem incluir blocos focados em saltos, sessões de contraste que combinam um levantamento com um salto na mesma direção e sessões de levantamento voltadas à velocidade. Sua experiência determina as opções.'],
        ['Entenda a sessão', 'Veja séries, repetições, esforço e descanso juntos. Vídeos de demonstração dos movimentos e um guia de treino dentro do app ajudam a explicar o que o plano pede de você.'],
      ],
      details: [
        'O modo iniciante com pesos livres prioriza os levantamentos fundamentais.',
        'As opções de argolas e levantamento olímpico refletem seu acesso a equipamentos e sua experiência.',
        '258 fichas de exercícios, filtradas conforme seu programa. Alguns movimentos não têm vídeo de demonstração.',
        'Um questionário ao final do bloco orienta o bloco seguinte.',
      ],
      faq: [
        ['O app ensina técnicas de parkour?', 'Esta edição programa treino complementar de força e potência. Ela não substitui um treinador de parkour nem gera sua prática técnica de parkour.'],
        ['Posso programar treinos de sprint separados?', 'No momento, não. O app não tem controles separados para treino de velocidade. Sessões de levantamento voltadas à velocidade ainda podem aparecer em programas complementares elegíveis.'],
        ['O app sugere minha próxima carga a partir dos registros?', 'O Athletickle Parkour permite registrar os treinos, mas as indicações de carga (aumentar, repetir, reduzir) por enquanto existem apenas no Athletickle Strength.'],
      ],
    },
    strength: {
      title: 'Dê uma direção ao seu treino de força.',
      description: 'Treino estruturado para força e massa muscular. Escolha sua ênfase, sua frequência semanal e sua experiência. Veja seu roteiro antes de começar o primeiro bloco de quatro semanas.',
      short: 'Treino estruturado de academia para força e massa muscular, com uma opção de dois dias.',
      features: [
        ['Dois dias podem ser o plano', 'A dose mínima efetiva monta duas sessões de corpo inteiro por semana com um volume reduzido. A progressão e os deloads continuam fazendo parte do plano.'],
        ['Escolha sua ênfase', 'Direcione seu roteiro para massa muscular, força máxima ou ambas. Escolha à parte uma ênfase na parte superior ou inferior do corpo, ou mantenha a distribuição equilibrada.'],
        ['Uma direção para o seu próximo levantamento', 'Registre seu desempenho para receber indicações: aumentar a carga, repeti-la ou reduzi-la. O app não estima seu 1RM nem escolhe um número de quilos por você.'],
      ],
      details: [
        '207 movimentos sem impacto na base de exercícios, antes dos filtros de experiência e de programa.',
        'Planos elegíveis incluem séries pesadas seguidas de volume com carga reduzida no mesmo levantamento.',
        'O modo iniciante com pesos livres prioriza os levantamentos fundamentais.',
        'As opções de argolas e levantamento olímpico refletem seu acesso a equipamentos e sua experiência.',
      ],
      faq: [
        ['Preciso registrar todas as séries?', 'Não. Seu bloco de quatro semanas gerado pode ser seguido sem registros. Registrar acrescenta indicações de progressão. Uma sessão sem registro não é tratada como um treino fracassado.'],
        ['A opção de dois dias é uma mudança temporária?', 'Escolha-a ao criar um programa. O modo permanece nesse programa à medida que os blocos seguintes são desbloqueados. Não é um ajuste semanal que possa ser trocado no meio do programa.'],
        ['O app reescreve minha próxima sessão automaticamente?', 'Não. O desempenho registrado fornece indicações de progressão. Sua avaliação ao final do bloco orienta o bloco seguinte. O bloco em andamento não é reescrito continuamente.'],
      ],
    },
  },
  sharedFaq: [
    ['O que é gratuito e o que exige assinatura?', 'O primeiro bloco completo de quatro semanas é gratuito. Continuar nos blocos seguintes exige uma assinatura. Há um intervalo mínimo de 21 dias antes que o próximo bloco possa ser desbloqueado, inclusive para assinantes. Os preços e as condições de cobrança são exibidos no fluxo de compra da loja.'],
    ['Quanto do roteiro eu consigo ver?', 'Escolha três ou seis blocos de quatro semanas: uma direção para 12 ou 24 semanas. A sequência fica visível desde o início, e os blocos seguintes são gerados em detalhe à medida que são desbloqueados.'],
    ['Posso trocar os exercícios?', 'Antes de salvar um programa, troque exercícios elegíveis por equivalentes. Algumas posições não têm equivalente disponível. A dose prescrita é mantida, e os programas salvos ficam fixos.'],
    ['Preciso de equipamentos de academia?', 'Sim. O acesso a uma academia é pressuposto. Preferir o peso do corpo influencia a seleção de exercícios, mas não torna o programa livre de equipamentos.'],
    ['Funciona offline?', 'A geração de programas e os dados de treino salvos são locais. Os vídeos de demonstração e as operações da loja precisam de conexão. O acesso premium tem uma tolerância offline de três dias. Não há backup na nuvem nem sincronização entre aparelhos.'],
    ['Preciso de uma conta no Discord para treinar?', 'Não. O Discord é nossa comunidade e nosso canal de novidades, separado dos apps. Os apps não exigem uma conta Athletickle. O que você decidir publicar no Discord fica compartilhado lá.'],
  ],
  playCta: 'Baixar no Google Play',
  availableNote: 'Já disponível para Android. Seu primeiro bloco de quatro semanas é gratuito.',
  builtTitle: 'Feito para o seu treino.',
  setupEyebrow: 'DA CONFIGURAÇÃO À SESSÃO',
  setupTitle: 'Deixe o plano do seu jeito.',
  setupLead: 'Revise seus exercícios. Troque movimentos elegíveis por equivalentes antes de salvar. Siga as séries, repetições, esforço e descanso prescritos.',
  exportNote: 'Exporte seu programa pelo menu de compartilhamento do celular. Registrar é opcional: seu bloco gerado está pronto para ser seguido.',
  founderTitle: 'A experiência por trás da programação.',
  founderBio: marketingCopy.pt.founder,
  meetMika: 'Conheça o Mika (em inglês)',
  weeks: 'SEMANAS',
  offerEyebrow: 'SEU PRIMEIRO BLOCO É GRATUITO',
  offerTitle: 'Um ponto de partida completo.',
  offerLead: 'Seu primeiro bloco de quatro semanas inclui o deload programado. Continue nos blocos seguintes com uma assinatura.',
  offerNote: 'O bloco seguinte tem um intervalo mínimo de 21 dias, inclusive para assinantes. Os preços e as condições de cobrança da loja aparecem antes da compra.',
  faqTitle: 'Antes de começar.',
  communityLabel: 'COMUNIDADE',
  communityTitle: 'Traga suas dúvidas. Compartilhe seu progresso.',
  communityLead: 'Conheça o fundador e outros atletas no Discord. Acompanhe as novidades e conte o que funciona e o que precisa melhorar.',
  exploreOther: (appName) => `Conheça o ${appName}`,
  metaTitleTail: 'Treino estruturado',
  metaDescriptionTail: 'Primeiro bloco de quatro semanas gratuito. Já disponível para Android no Google Play.',
  landingTitle: `${SITE_NAME} | Treino de parkour e força`,
  landingDescription:
    'Treino estruturado para parkour, força e massa muscular. Athletickle Parkour e Strength já estão disponíveis para Android no Google Play.',
}
