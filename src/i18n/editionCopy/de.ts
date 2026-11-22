import { marketingCopy } from '../marketingCopy'
import { SITE_NAME } from '../../seo/config'
import type { EditionCopy } from './types'

export const de: EditionCopy = {
  editions: {
    parkour: {
      title: 'Kraft und Explosivität. Abgestimmt auf dein Parkour.',
      description: 'Gib deinem Parkourtraining einen strukturierten Plan für Kraft und Explosivität. Gib deine Parkour-Häufigkeit und deine ergänzenden Trainingstage an und sieh, wohin deine nächsten Trainingsblöcke führen.',
      short: 'Ergänzendes Kraft- und Schnellkrafttraining für Parkour-Athleten.',
      features: [
        ['Dein Parkour zählt', 'Deine Parkour-Häufigkeit fließt in deinen ergänzenden Trainingsplan ein. Die App plant das Kraft- und Schnellkrafttraining. Dein Parkourtraining planst du selbst.'],
        ['Kraft mit einem Ziel', 'Geeignete Programme können sprungbetonte Blöcke, Kontrasteinheiten mit einer Kraftübung und einem Sprung in gleicher Richtung sowie schnelligkeitsorientierte Krafteinheiten enthalten. Deine Erfahrung bestimmt die Optionen.'],
        ['Die Einheit verstehen', 'Sätze, Wiederholungen, Intensität und Pausen siehst du zusammen. Demonstrationsvideos und ein Trainingsguide in der App helfen zu erklären, was der Plan von dir verlangt.'],
      ],
      details: [
        'Der Einsteigermodus für freie Gewichte betont grundlegende Übungen.',
        'Optionen für Ringe und olympisches Gewichtheben richten sich nach deiner Ausstattung und Erfahrung.',
        '258 Übungseinträge, passend zu deinem Programm gefiltert. Für einige Übungen gibt es kein Demonstrationsvideo.',
        'Ein Fragebogen am Blockende fließt in den nächsten Block ein.',
      ],
      faq: [
        ['Bringt die App Parkour-Techniken bei?', 'Diese Edition plant ergänzendes Kraft- und Schnellkrafttraining. Sie ersetzt kein Parkour-Coaching und erstellt nicht dein technisches Parkourtraining.'],
        ['Kann ich separate Sprinteinheiten planen?', 'Derzeit nicht. Eigene Einstellungen für Schnelligkeitstraining gibt es in der App nicht. Schnelligkeitsorientierte Krafteinheiten können trotzdem in geeigneten ergänzenden Programmen vorkommen.'],
        ['Schlägt die App mein nächstes Gewicht aus den Logs vor?', 'In Athletickle Parkour kannst du Einheiten loggen, aber die Lasthinweise (erhöhen, wiederholen, reduzieren) gibt es derzeit nur in Athletickle Strength.'],
      ],
    },
    strength: {
      title: 'Gib deinem Krafttraining eine Richtung.',
      description: 'Strukturiertes Training für Kraft und Muskelmasse. Wähle deinen Schwerpunkt, deine wöchentliche Häufigkeit und deine Erfahrung. Sieh deine Roadmap, bevor du den ersten Vier-Wochen-Block startest.',
      short: 'Strukturiertes Gym-Training für Kraft und Muskelmasse, mit einer Zwei-Tage-Option.',
      features: [
        ['Zwei Tage können der Plan sein', 'Die minimale effektive Dosis plant zwei Ganzkörpereinheiten pro Woche mit reduziertem Volumen. Progression und Entlastungswochen bleiben Teil des Plans.'],
        ['Wähle deinen Schwerpunkt', 'Richte deine Roadmap auf Muskelmasse, Maximalkraft oder beides aus. Wähle zusätzlich einen Schwerpunkt auf Ober- oder Unterkörper oder halte die Verteilung ausgewogen.'],
        ['Eine Richtung für deine nächste Last', 'Logge deine Leistung und erhalte Hinweise: Last erhöhen, wiederholen oder reduzieren. Die App schätzt dein 1RM nicht und wählt keine Kilozahl für dich.'],
      ],
      details: [
        '207 Übungen ohne Aufprallbelastung im Übungspool, vor den Filtern für Erfahrung und Programm.',
        'Geeignete Pläne enthalten schwere Sätze, gefolgt von Back-off-Volumen bei derselben Übung.',
        'Der Einsteigermodus für freie Gewichte betont grundlegende Übungen.',
        'Optionen für Ringe und olympisches Gewichtheben richten sich nach deiner Ausstattung und Erfahrung.',
      ],
      faq: [
        ['Muss ich jeden Satz loggen?', 'Nein. Dein generierter Vier-Wochen-Block lässt sich auch ohne Logs befolgen. Loggen ergänzt Progressionshinweise. Eine nicht geloggte Einheit gilt nicht als gescheitertes Training.'],
        ['Ist die Zwei-Tage-Option ein vorübergehender Schalter?', 'Du wählst sie beim Erstellen eines Programms. Der Modus bleibt bei diesem Programm, wenn weitere Blöcke freigeschaltet werden. Er lässt sich nicht mitten im Programm wochenweise umschalten.'],
        ['Schreibt die App meine nächste Einheit automatisch um?', 'Nein. Geloggte Leistungen liefern Progressionshinweise. Dein Feedback am Blockende fließt in den nächsten Block ein. Der laufende Block wird nicht fortlaufend umgeschrieben.'],
      ],
    },
  },
  sharedFaq: [
    ['Was ist kostenlos, und wofür brauche ich ein Abo?', 'Der erste vollständige Vier-Wochen-Trainingsblock ist kostenlos. Für weitere Blöcke brauchst du ein Abo. Der nächste Block kann frühestens nach 21 Tagen freigeschaltet werden, auch mit Abo. Preise und Abrechnungsbedingungen werden beim Kauf im Store angezeigt.'],
    ['Wie viel von der Roadmap sehe ich?', 'Wähle drei oder sechs Vier-Wochen-Blöcke: eine Richtung für 12 oder 24 Wochen. Die Abfolge siehst du von Anfang an, detaillierte spätere Blöcke entstehen beim Freischalten.'],
    ['Kann ich die Übungen ändern?', 'Vor dem Speichern eines Programms kannst du geeignete Übungen gegen Alternativen tauschen. Für manche Plätze gibt es keine Alternative. Die vorgegebene Dosis bleibt erhalten, und gespeicherte Programme sind fest.'],
    ['Brauche ich Gym-Ausstattung?', 'Ja. Zugang zu einem Gym wird vorausgesetzt. Eine Vorliebe für Körpergewichtsübungen beeinflusst die Übungsauswahl, macht den Plan aber nicht gerätefrei.'],
    ['Funktioniert die App offline?', 'Die Programmerstellung und gespeicherte Trainingsdaten sind lokal. Demonstrationsvideos und Store-Vorgänge brauchen Internet. Premium hat eine dreitägige Offline-Kulanzzeit. Es gibt kein Cloud-Backup und keine Gerätesynchronisation.'],
    ['Brauche ich ein Discord-Konto zum Trainieren?', 'Nein. Discord ist unsere Community und unser Kanal für Neuigkeiten, getrennt von den Apps. Die Apps benötigen kein Athletickle-Konto. Was du auf Discord postest, wird dort geteilt.'],
  ],
  playCta: 'Bei Google Play laden',
  availableNote: 'Jetzt für Android verfügbar. Dein erster Vier-Wochen-Block ist kostenlos.',
  builtTitle: 'Gemacht für dein Training.',
  setupEyebrow: 'VOM SETUP ZUR EINHEIT',
  setupTitle: 'Mach den Plan zu deinem.',
  setupLead: 'Prüfe deine Übungen. Tausche geeignete Übungen vor dem Speichern gegen Alternativen. Folge den vorgegebenen Sätzen, Wiederholungen, Intensitäten und Pausen.',
  exportNote: 'Exportiere dein Programm über das Teilen-Menü deines Handys. Loggen ist optional: Dein generierter Block ist bereit zum Training.',
  founderTitle: 'Erfahrung hinter der Trainingsplanung.',
  founderBio: marketingCopy.de.founder,
  meetMika: 'Mika kennenlernen (auf Englisch)',
  weeks: 'WOCHEN',
  offerEyebrow: 'DEIN ERSTER BLOCK IST KOSTENLOS',
  offerTitle: 'Ein vollständiger Einstieg.',
  offerLead: 'Dein erster Vier-Wochen-Block enthält seine geplante Entlastungswoche. Weitere Blöcke setzt du mit einem Abo fort.',
  offerNote: 'Der nächste Block kann frühestens nach 21 Tagen freigeschaltet werden, auch mit Abo. Preise und Abrechnungsbedingungen des Stores werden vor dem Kauf angezeigt.',
  faqTitle: 'Bevor du startest.',
  communityLabel: 'COMMUNITY',
  communityTitle: 'Bring deine Fragen mit. Teile deinen Fortschritt.',
  communityLead: 'Triff den Gründer und andere Athleten auf Discord. Verfolge Neuigkeiten und teile, was funktioniert und was noch Arbeit braucht.',
  exploreOther: (appName) => `${appName} entdecken`,
  metaTitleTail: 'Strukturiertes Training',
  metaDescriptionTail: 'Erster Vier-Wochen-Block kostenlos. Jetzt für Android bei Google Play.',
  landingTitle: `${SITE_NAME} | Parkour- und Krafttraining`,
  landingDescription:
    'Strukturiertes Training für Parkour, Kraft und Muskelmasse. Athletickle Parkour und Strength sind jetzt für Android bei Google Play verfügbar.',
}
