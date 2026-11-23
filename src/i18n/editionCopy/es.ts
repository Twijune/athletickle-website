import { marketingCopy } from '../marketingCopy'
import { SITE_NAME } from '../../seo/config'
import type { EditionCopy } from './types'

export const es: EditionCopy = {
  editions: {
    parkour: {
      title: 'Fuerza y potencia. Construidas en torno a tu parkour.',
      description: 'Dale a tu práctica de parkour un plan estructurado de fuerza y potencia. Indica tu frecuencia de parkour y tus días de entrenamiento complementario, y descubre hacia dónde van tus próximos bloques.',
      short: 'Entrenamiento complementario de fuerza y potencia para atletas de parkour.',
      features: [
        ['Tu práctica cuenta', 'Tu frecuencia de parkour es un dato de partida para tu plan de entrenamiento complementario. La app programa el trabajo de fuerza y potencia. Tú planificas tu práctica de parkour.'],
        ['Fuerza con un propósito', 'Los programas compatibles pueden incluir bloques centrados en saltos, sesiones de contraste que combinan un levantamiento con un salto en la misma dirección y sesiones de levantamiento orientadas a la velocidad. Tu experiencia determina las opciones.'],
        ['Entiende la sesión', 'Consulta juntas las series, las repeticiones, el esfuerzo y el descanso. Los vídeos de demostración y una guía de entrenamiento en la app ayudan a explicar lo que te pide el plan.'],
      ],
      details: [
        'El modo principiante con peso libre prioriza los levantamientos fundamentales.',
        'Las opciones de anillas y halterofilia reflejan tu acceso al material y tu experiencia.',
        '258 fichas de ejercicios, filtradas según tu programa. Algunos movimientos no tienen vídeo de demostración.',
        'Un cuestionario al final del bloque orienta el siguiente.',
      ],
      faq: [
        ['¿Enseña técnicas de parkour?', 'Esta edición programa entrenamiento complementario de fuerza y potencia. No sustituye a un entrenador de parkour ni genera tu práctica técnica de parkour.'],
        ['¿Puedo programar sesiones de sprint aparte?', 'Por ahora no. La app no tiene controles específicos para el entrenamiento de velocidad. Aun así, pueden aparecer sesiones de levantamiento orientadas a la velocidad en los programas complementarios compatibles.'],
        ['¿Sugiere mi próximo peso a partir de los registros?', 'Athletickle Parkour permite registrar los entrenamientos, pero las indicaciones de carga (subir, repetir, reducir) por ahora solo están en Athletickle Strength.'],
      ],
    },
    strength: {
      title: 'Dale un rumbo a tu entrenamiento de fuerza.',
      description: 'Entrenamiento estructurado para fuerza y masa muscular. Elige tu enfoque, tu frecuencia semanal y tu experiencia. Consulta tu plan antes de empezar el primer bloque de cuatro semanas.',
      short: 'Entrenamiento estructurado en gimnasio para fuerza y masa muscular, con una opción de dos días.',
      features: [
        ['Dos días pueden ser el plan', 'La dosis mínima efectiva crea dos sesiones de cuerpo completo a la semana con un volumen reducido. La progresión y las descargas siguen formando parte del plan.'],
        ['Elige tu enfoque', 'Orienta tu plan hacia la masa muscular, la fuerza máxima o ambas. Elige aparte un énfasis en el tren superior o inferior, o mantén un reparto equilibrado.'],
        ['Una dirección para tu próximo levantamiento', 'Registra tu rendimiento para recibir indicaciones: subir la carga, repetirla o reducirla. La app no estima tu 1RM ni elige por ti una cifra en kilos.'],
      ],
      details: [
        '207 movimientos sin impacto en la base de ejercicios, antes de los filtros de experiencia y programa.',
        'Los planes compatibles incluyen series pesadas seguidas de volumen con menos carga en el mismo levantamiento.',
        'El modo principiante con peso libre prioriza los levantamientos fundamentales.',
        'Las opciones de anillas y halterofilia reflejan tu acceso al material y tu experiencia.',
      ],
      faq: [
        ['¿Tengo que registrar cada serie?', 'No. Tu bloque de cuatro semanas generado se puede seguir sin registros. Registrar añade indicaciones de progresión. Una sesión sin registrar no se trata como un entrenamiento fallido.'],
        ['¿La opción de dos días es un cambio temporal?', 'Elígela al crear un programa. El modo se mantiene en ese programa a medida que se desbloquean los bloques siguientes. No es un ajuste semanal que se pueda cambiar a mitad del programa.'],
        ['¿La app reescribe automáticamente mi próxima sesión?', 'No. El rendimiento registrado aporta indicaciones de progresión. Tu valoración al final del bloque orienta el siguiente. El bloque actual no se reescribe continuamente.'],
      ],
    },
  },
  sharedFaq: [
    ['¿Qué es gratis y qué requiere suscripción?', 'El primer bloque completo de cuatro semanas es gratis. Para continuar con los bloques siguientes hace falta una suscripción. El próximo bloque solo se puede desbloquear tras un mínimo de 21 días, también para suscriptores. Los precios y las condiciones de facturación se muestran durante la compra en la tienda.'],
    ['¿Cuánto del plan puedo ver?', 'Elige tres o seis bloques de cuatro semanas: un rumbo para 12 o 24 semanas. La secuencia se ve desde el principio, y los bloques posteriores se detallan al desbloquearlos.'],
    ['¿Puedo cambiar los ejercicios?', 'Antes de guardar un programa, cambia los ejercicios compatibles por equivalentes. Algunos huecos no tienen equivalente disponible. La dosis prescrita se mantiene, y los programas guardados quedan fijos.'],
    ['¿Necesito material de gimnasio?', 'Sí. Se da por hecho el acceso a un gimnasio. Preferir el peso corporal influye en la selección de ejercicios, pero no convierte el programa en uno sin material.'],
    ['¿Funciona sin conexión?', 'La generación de programas y los datos de entrenamiento guardados son locales. Los vídeos de demostración y las operaciones de las tiendas necesitan conexión. Premium tiene tres días de margen sin conexión. No hay copia en la nube ni sincronización entre dispositivos.'],
    ['¿Hace falta una cuenta de Discord para entrenar?', 'No. Discord es nuestra comunidad y nuestro canal de novedades, independiente de las apps. Las apps no requieren una cuenta de Athletickle. Lo que decidas publicar en Discord se comparte allí.'],
  ],
  playCta: 'Consíguela en Google Play',
  availableNote: 'Ya disponible en Android. Tu primer bloque de cuatro semanas es gratis.',
  builtTitle: 'Hecho para tu entrenamiento.',
  setupEyebrow: 'DE LA CONFIGURACIÓN A LA SESIÓN',
  setupTitle: 'Haz tuyo el plan.',
  setupLead: 'Revisa tus ejercicios. Cambia movimientos compatibles por equivalentes antes de guardar. Sigue las series, repeticiones, esfuerzo y descanso prescritos.',
  exportNote: 'Exporta tu programa desde el menú de compartir de tu teléfono. Registrar es opcional: tu bloque generado está listo para seguirlo.',
  founderTitle: 'La experiencia detrás de la programación.',
  founderBio: marketingCopy.es.founder,
  meetMika: 'Conoce a Mika (en inglés)',
  weeks: 'SEMANAS',
  offerEyebrow: 'TU PRIMER BLOQUE ES GRATIS',
  offerTitle: 'Un punto de partida completo.',
  offerLead: 'Tu primer bloque de cuatro semanas incluye su descarga programada. Continúa con los bloques siguientes mediante una suscripción.',
  offerNote: 'El siguiente bloque solo se puede desbloquear tras un mínimo de 21 días, también para suscriptores. Los precios y las condiciones de facturación de la tienda aparecen antes de comprar.',
  faqTitle: 'Antes de empezar.',
  communityLabel: 'COMUNIDAD',
  communityTitle: 'Trae tus preguntas. Comparte tu progreso.',
  communityLead: 'Conoce al fundador y a otros atletas en Discord. Sigue las novedades y cuéntanos qué funciona y qué hay que mejorar.',
  exploreOther: (appName) => `Explora ${appName}`,
  metaTitleTail: 'Entrenamiento estructurado',
  metaDescriptionTail: 'Primer bloque de cuatro semanas gratis. Ya disponible en Android en Google Play.',
  landingTitle: `${SITE_NAME} | Entrenamiento de parkour y fuerza`,
  landingDescription:
    'Entrenamiento estructurado para parkour, fuerza y masa muscular. Athletickle Parkour y Strength ya están disponibles en Android en Google Play.',
}
