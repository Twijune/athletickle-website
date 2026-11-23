import { marketingCopy } from '../marketingCopy'
import { SITE_NAME } from '../../seo/config'
import type { EditionCopy } from './types'

export const fr: EditionCopy = {
  editions: {
    parkour: {
      title: 'Force et puissance. Construites autour de votre parkour.',
      description: 'Donnez à votre pratique du parkour un plan structuré de force et de puissance. Indiquez votre fréquence de parkour et vos jours d’entraînement complémentaire, puis découvrez le cap de vos prochains blocs.',
      short: 'Entraînement complémentaire de force et de puissance pour les pratiquants de parkour.',
      features: [
        ['Votre pratique compte', 'Votre fréquence de parkour est une donnée d’entrée de votre plan d’entraînement complémentaire. L’appli programme le travail de force et de puissance. Vous planifiez votre pratique du parkour.'],
        ['La force avec un objectif', 'Les programmes éligibles peuvent inclure des blocs axés sur le saut, des séances de contraste associant un exercice de musculation à un saut dans la même direction, et des séances de musculation orientées vitesse. Votre expérience détermine les options.'],
        ['Comprendre la séance', 'Séries, répétitions, effort et repos s’affichent ensemble. Des vidéos de démonstration et un guide d’entraînement intégré à l’appli aident à expliquer ce que le plan vous demande.'],
      ],
      details: [
        'Le mode débutant aux poids libres met l’accent sur les mouvements fondamentaux.',
        'Les options anneaux et haltérophilie tiennent compte de votre accès au matériel et de votre expérience.',
        '258 fiches d’exercices, filtrées selon votre programme. Certains mouvements n’ont pas de vidéo de démonstration.',
        'Un questionnaire de fin de bloc oriente le bloc suivant.',
      ],
      faq: [
        ['L’appli enseigne-t-elle les techniques de parkour ?', 'Cette édition programme un entraînement complémentaire de force et de puissance. Elle ne remplace pas un coach de parkour et ne génère pas votre pratique technique du parkour.'],
        ['Puis-je programmer des séances de sprint séparées ?', 'Pas pour le moment. L’appli ne propose pas de réglages distincts pour l’entraînement de vitesse. Des séances de musculation orientées vitesse peuvent tout de même apparaître dans les programmes complémentaires éligibles.'],
        ['L’appli propose-t-elle ma prochaine charge à partir de mon journal ?', 'Athletickle Parkour permet d’enregistrer vos séances, mais les repères de charge (ajouter, répéter, alléger) ne sont pour l’instant disponibles que dans Athletickle Strength.'],
      ],
    },
    strength: {
      title: 'Donnez une direction à votre entraînement de force.',
      description: 'Un entraînement structuré pour la force et la masse musculaire. Choisissez votre priorité, votre fréquence hebdomadaire et votre niveau d’expérience. Découvrez votre feuille de route avant de commencer le premier bloc de quatre semaines.',
      short: 'Entraînement structuré en salle pour la force et la masse musculaire, avec une option à deux séances par semaine.',
      features: [
        ['Deux jours peuvent être le plan', 'Le mode dose minimale efficace construit deux séances corps entier par semaine avec un volume réduit. La progression et les semaines allégées font toujours partie du plan.'],
        ['Choisissez votre priorité', 'Orientez votre feuille de route vers la masse musculaire, la force maximale, ou les deux. Choisissez séparément une priorité haut ou bas du corps, ou gardez une répartition équilibrée.'],
        ['Une direction pour votre prochaine charge', 'Enregistrez vos performances pour obtenir des repères : ajouter de la charge, la répéter ou l’alléger. L’appli n’estime pas votre 1RM et ne choisit pas un nombre de kilos à votre place.'],
      ],
      details: [
        '207 mouvements sans impact dans la base d’exercices, avant les filtres d’expérience et de programme.',
        'Les plans éligibles comprennent des séries lourdes suivies d’un volume à charge réduite sur le même exercice.',
        'Le mode débutant aux poids libres met l’accent sur les mouvements fondamentaux.',
        'Les options anneaux et haltérophilie tiennent compte de votre accès au matériel et de votre expérience.',
      ],
      faq: [
        ['Dois-je enregistrer chaque série ?', 'Non. Votre bloc de quatre semaines généré peut être suivi sans journal. Le journal ajoute des repères de progression. Une séance non enregistrée n’est pas considérée comme un entraînement raté.'],
        ['L’option deux jours est-elle un réglage temporaire ?', 'Choisissez-la à la création d’un programme. Le mode reste attaché à ce programme quand les blocs suivants se débloquent. Ce n’est pas un réglage hebdomadaire modifiable en cours de programme.'],
        ['L’appli réécrit-elle automatiquement ma prochaine séance ?', 'Non. Les performances enregistrées fournissent des repères de progression. Votre bilan de fin de bloc oriente le bloc suivant. Le bloc en cours n’est pas réécrit en continu.'],
      ],
    },
  },
  sharedFaq: [
    ['Qu’est-ce qui est gratuit, et qu’est-ce qui nécessite un abonnement ?', 'Le premier bloc complet de quatre semaines est gratuit. Les blocs suivants nécessitent un abonnement. Un délai de 21 jours s’applique avant de débloquer le bloc suivant, même pour les abonnés. Les prix et les conditions de facturation sont affichés lors de l’achat dans le store.'],
    ['Quelle partie de la feuille de route puis-je voir ?', 'Choisissez trois ou six blocs de quatre semaines : un cap sur 12 ou 24 semaines. La séquence est visible dès le départ, et les blocs suivants sont détaillés à leur déblocage.'],
    ['Puis-je changer les exercices ?', 'Avant d’enregistrer un programme, remplacez les exercices éligibles par des équivalents. Certains emplacements n’ont pas d’équivalent disponible. La dose prescrite est conservée, et les programmes enregistrés ne sont plus modifiables.'],
    ['Ai-je besoin de matériel de salle ?', 'Oui. L’accès à une salle est supposé. Une préférence pour le poids du corps influence le choix des exercices, mais ne rend pas le programme sans matériel.'],
    ['L’appli fonctionne-t-elle hors ligne ?', 'La génération des programmes et les données d’entraînement enregistrées sont locales. Les vidéos de démonstration et les opérations des stores nécessitent une connexion. L’accès premium offre trois jours de grâce hors ligne. Il n’y a ni sauvegarde cloud ni synchronisation entre appareils.'],
    ['Faut-il un compte Discord pour s’entraîner ?', 'Non. Discord est notre espace communautaire et notre canal de nouveautés, distinct des applis. Les applis ne nécessitent pas de compte Athletickle. Ce que vous choisissez de publier sur Discord y est partagé.'],
  ],
  playCta: 'Télécharger sur Google Play',
  availableNote: 'Disponible dès maintenant sur Android. Votre premier bloc de quatre semaines est offert.',
  builtTitle: 'Conçu pour votre entraînement.',
  setupEyebrow: 'DE LA CONFIGURATION À LA SÉANCE',
  setupTitle: 'Faites du plan le vôtre.',
  setupLead: 'Vérifiez vos exercices. Remplacez les mouvements éligibles par des équivalents avant d’enregistrer. Suivez les séries, répétitions, effort et repos prescrits.',
  exportNote: 'Exportez votre programme depuis le menu de partage de votre téléphone. Le journal est facultatif : votre bloc généré est prêt à être suivi.',
  founderTitle: 'L’expérience derrière la programmation.',
  founderBio: marketingCopy.fr.founder,
  meetMika: 'Rencontrer Mika (en anglais)',
  weeks: 'SEMAINES',
  offerEyebrow: 'VOTRE PREMIER BLOC EST OFFERT',
  offerTitle: 'Un point de départ complet.',
  offerLead: 'Votre premier bloc de quatre semaines comprend sa semaine allégée prévue. Poursuivez avec les blocs suivants grâce à un abonnement.',
  offerNote: 'Un délai de 21 jours s’applique avant le bloc suivant, même pour les abonnés. Les prix et les conditions de facturation du store s’affichent avant l’achat.',
  faqTitle: 'Avant de commencer.',
  communityLabel: 'COMMUNAUTÉ',
  communityTitle: 'Posez vos questions. Partagez vos progrès.',
  communityLead: 'Rencontrez le fondateur et d’autres athlètes sur Discord. Suivez les nouveautés et dites-nous ce qui fonctionne, et ce qui reste à améliorer.',
  exploreOther: (appName) => `Découvrir ${appName}`,
  metaTitleTail: 'Entraînement structuré',
  metaDescriptionTail: 'Premier bloc de quatre semaines offert. Disponible sur Android via Google Play.',
  landingTitle: `${SITE_NAME} | Entraînement pour le parkour et la force`,
  landingDescription:
    'Entraînement structuré pour le parkour, la force et la masse musculaire. Athletickle Parkour et Strength sont disponibles sur Android via Google Play.',
}
