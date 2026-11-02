import { useContext, useEffect, useMemo, useRef, useState, useSyncExternalStore } from 'react'
import { Link, useParams } from 'react-router-dom'
import BlogLayout from '../components/BlogLayout'
import { editions } from '../data/marketing'
import { ExerciseContext, type ExerciseEntry } from '../exercises/exercise'
import { exerciseMeta } from '../seo/meta'
import { useHead } from '../seo/useHead'
import NotFound from './NotFound'

/**
 * /exercises/<slug>: one exercise's demo clip, the page the apps can open
 * when a clip will not play in-app, and the link to share. Unlisted - see
 * exercises/exercise.ts.
 */
export default function Exercise() {
  const { slug } = useParams()
  const embedded = useContext(ExerciseContext)
  const devEntry = useDevExercise(slug, embedded)
  const exercise = embedded && embedded.slug === slug ? embedded : devEntry
  const meta = useMemo(() => (exercise ? exerciseMeta(exercise) : null), [exercise])
  useHead(meta)

  if (exercise === undefined) return null
  if (!exercise) return <NotFound />

  return (
    <BlogLayout>
      <article className="container mx-auto px-5 md:px-8 py-12 md:py-16 max-w-4xl">
        <p className="text-xs tracking-[0.3em] font-['Space_Mono'] text-[#D1622A] mb-4 uppercase">
          Exercise demo / {exercise.category}
        </p>
        <h1 className="text-3xl md:text-5xl tracking-tight leading-[1.1] mb-6 break-words">{exercise.name}</h1>
        <div className="w-16 h-1 bg-[#D1622A] mb-10" />

        <Clip exercise={exercise} />

        {exercise.info && (
          <div className="mt-10 border-l-2 border-[#D1622A] pl-5">
            <p className="text-xs tracking-[0.3em] font-['Space_Mono'] text-white/40 mb-2">NOTE</p>
            <p className="font-['Space_Mono'] text-white/80 leading-relaxed">{exercise.info}</p>
          </div>
        )}

        <p className="mt-10 font-['Space_Mono'] text-white/60 leading-relaxed max-w-2xl">
          Your program sets the sets, reps, effort and rest for this movement.
        </p>

        <h2 className="mt-14 mb-6 text-xl tracking-wide">IN THE APP</h2>
        <div className={`grid gap-px bg-white/10 border border-white/10 ${exercise.editions.length > 1 ? 'sm:grid-cols-2' : ''}`}>
          {exercise.editions.map((edition) => (
            <Link
              key={edition}
              to={`/${edition}`}
              className="group bg-[#0a0a0a] p-8 hover:bg-white/[0.03] transition-colors"
            >
              <p className="text-lg tracking-wide mb-3">{editions[edition].name.toUpperCase()}</p>
              <p className="text-sm font-['Space_Mono'] text-white/50 leading-relaxed mb-5">
                {editions[edition].short}
              </p>
              <span className="text-sm font-['Space_Mono'] text-[#D1622A] group-hover:text-[#E07B45]">
                Explore →
              </span>
            </Link>
          ))}
        </div>
      </article>
    </BlogLayout>
  )
}

/**
 * Production pages carry their entry (main.tsx reads it). The dev server has
 * no prerendered HTML, so it loads the list instead; the import sits behind
 * import.meta.env.DEV and is dropped from the production bundle.
 */
function useDevExercise(slug: string | undefined, embedded: ExerciseEntry | null) {
  const needed = import.meta.env.DEV && !embedded
  const [entry, setEntry] = useState<ExerciseEntry | null | undefined>(needed ? undefined : null)
  useEffect(() => {
    if (!import.meta.env.DEV || embedded) return
    let live = true
    import('../data/exercises.json').then((module) => {
      const list = module.default as ExerciseEntry[]
      if (live) setEntry(list.find((exercise) => exercise.slug === slug) ?? null)
    })
    return () => {
      live = false
    }
  }, [slug, embedded])
  return entry
}

const REDUCED_MOTION = '(prefers-reduced-motion: reduce)'
const subscribeReducedMotion = (onChange: () => void) => {
  const query = window.matchMedia(REDUCED_MOTION)
  query.addEventListener('change', onChange)
  return () => query.removeEventListener('change', onChange)
}

type Phase = 'starting' | 'playing' | 'paused' | 'failed'

// React never writes `muted` as an attribute, and browsers only autoplay
// muted video, so set the property before every play()
function startClip(el: HTMLVideoElement | null, onBlocked: () => void) {
  if (!el) return
  el.muted = true
  el.play().catch(onBlocked)
}

/**
 * The clip loops silently, like the in-app sheet: no controls, tap to pause.
 * With reduced motion it waits on its poster frame for a tap instead.
 */
function Clip({ exercise }: { exercise: ExerciseEntry }) {
  const video = useRef<HTMLVideoElement>(null)
  const [phase, setPhase] = useState<Phase>('starting')
  // Server snapshot false: hydration matches the prerendered HTML, then updates
  const reducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    () => window.matchMedia(REDUCED_MOTION).matches,
    () => false,
  )

  // A blocked play() (autoplay refused, e.g. a battery saver) waits for a tap
  const blocked = () => setPhase((current) => (current === 'failed' ? current : 'paused'))
  const play = () => startClip(video.current, blocked)

  // Ask the media query itself: on the hydration pass `reducedMotion` still
  // holds the server value (false)
  useEffect(() => {
    if (window.matchMedia(REDUCED_MOTION).matches) return
    startClip(video.current, () => setPhase((current) => (current === 'failed' ? current : 'paused')))
  }, [exercise.video])

  const toggle = () => {
    const el = video.current
    if (!el) return
    if (el.paused) play()
    else el.pause()
  }

  const retry = () => {
    setPhase('starting')
    video.current?.load()
    play()
  }

  const waiting = phase === 'starting' && !reducedMotion
  const showPlay = phase === 'paused' || (phase === 'starting' && reducedMotion)

  return (
    <div>
      <div className="relative w-full aspect-video bg-black overflow-hidden border border-white/10">
        <video
          ref={video}
          src={exercise.video}
          poster={exercise.poster}
          muted
          loop
          playsInline
          preload="metadata"
          className="absolute inset-0 w-full h-full object-contain"
          onPlaying={() => setPhase('playing')}
          onPause={blocked}
          onError={() => setPhase('failed')}
        />
        {phase === 'failed' ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-6 text-center bg-black/70">
            <p className="font-['Space_Mono'] text-sm text-white/80">
              Couldn&rsquo;t load the video. Check your connection.
            </p>
            <button
              type="button"
              onClick={retry}
              className="px-6 py-3 border-2 border-white/30 text-xs tracking-[0.2em] font-['Space_Mono'] hover:border-white hover:bg-white/5 transition-all"
            >
              TRY AGAIN
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={toggle}
            aria-label={phase === 'playing' ? 'Pause video' : 'Play video'}
            className="absolute inset-0 flex items-center justify-center focus-visible:outline-2 focus-visible:outline-[#D1622A] focus-visible:-outline-offset-2"
          >
            {waiting && (
              <span className="w-10 h-10 rounded-full border-2 border-white/20 border-t-white motion-safe:animate-spin" />
            )}
            {showPlay && (
              <span className="flex items-center justify-center w-16 h-16 rounded-full bg-black/55">
                <svg viewBox="0 0 24 24" className="w-7 h-7 ml-1 fill-white" aria-hidden="true">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </span>
            )}
          </button>
        )}
      </div>
      <p className="mt-3 text-xs tracking-[0.15em] font-['Space_Mono'] text-white/40">
        SILENT CLIP · LOOPS · TAP THE VIDEO TO PAUSE OR PLAY
      </p>
    </div>
  )
}
