import { Link } from 'react-router-dom'
import MarketingLayout from '../components/MarketingLayout'
import { DISCORD_URL, FOUNDER_NAME, FOUNDER_TITLE } from '../data/marketing'
import { aboutMeta } from '../seo/meta'
import { useHead } from '../seo/useHead'

export default function About() {
  useHead(aboutMeta())
  return <MarketingLayout>
    <article className="marketing-section about-page">
      <p className="eyebrow">{FOUNDER_NAME} / {FOUNDER_TITLE}</p>
      <h1>A plan more people can access.</h1>
      <div className="founder-intro">
      <p className="lead">I’m Mika, founder of Athletickle and an exercise physiologist with a Master of Science from the University of Jyväskylä. I started parkour in 2005 and began coaching a year later. Athletickle brings that coaching and programming experience into a plan you can follow independently.</p>
        <figure className="founder-portrait">
          <img src="/founder-mika.jpg" width="1224" height="1224" alt="Mika climbing outdoors" />
          <figcaption>{FOUNDER_NAME} — {FOUNDER_TITLE}</figcaption>
        </figure>
      </div>
      <div className="about-body">
        <h2>From parkour spots to the gym floor.</h2>
        <p>I was a founding member of Parkour Akatemia, the Finnish Parkour Academy. Alongside weekly classes for children and adults, I trained and mentored instructors and helped develop international standards for coaching parkour.</p>
        <p>In 2010, I co-founded Athletica in Jyväskylä. Through the company, we worked with thousands of people: everyday gym-goers, recreational athletes and elite competitors, including Olympic-level track-and-field athletes and NHL players. Coaching across different sports taught me to look at what each person’s training needs to accomplish.</p>
        <h2>Practice, research and teaching.</h2>
        <p>I completed my MSc in Exercise Physiology at the University of Jyväskylä in 2019. For my thesis, I designed and piloted a field test for measuring aerobic capacity in parkour.</p>
        <p><a href="https://urn.fi/URN:NBN:fi:jyu-201905272835">Read the thesis: Field test for measuring VO₂peak in parkour: a pilot study ↗</a></p>
        <p>From 2017 to 2025, I taught coaches and fitness professionals about strength and endurance training, recovery, mobility and the coaching process. I have also reviewed content for Finnish books on parkour and strength training and appeared as an expert on YLE.</p>
        <h2>Why I built Athletickle.</h2>
        <p>Over time, one-to-one coaching with me became something many people couldn’t afford. Students, recreational lifters and parkour practitioners still wanted a structured plan, but my time put it out of reach.</p>
        <p>Athletickle is my way of making the programming more accessible. It puts the logic I’ve used with clients into four-week training blocks on a 12- or 24-week roadmap. Deloads are planned in advance. The first complete block is free, and your programs and training logs stay on your phone.</p>
        <p><Link to="/parkour">Athletickle Parkour</Link> builds complementary strength and power training around your parkour frequency. <Link to="/strength">Athletickle Strength</Link> focuses on strength and muscle in the gym, including a reduced-volume two-day option.</p>
        <h2>The plan is the start of a conversation.</h2>
        <p>The app provides the plan. You bring the effort and judgment to follow it. Both editions are pre-launch, and I’d like to hear how they work for you: what’s clear, what’s confusing and what gets in your way.</p>
        <p>You can find me on the Athletickle Discord.</p>
        <a className="button primary" href={DISCORD_URL}>Talk with Mika on Discord ↗</a>
        <p className="small-note">— {FOUNDER_NAME}, {FOUNDER_TITLE}</p>
      </div>
    </article>
  </MarketingLayout>
}
