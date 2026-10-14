import { MotionConfig } from 'framer-motion'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Tissemsilt from './components/Tissemsilt'
import History from './components/History'
import Doum from './components/Doum'
import Stages from './components/Stages'
import Plait from './components/Plait'
import Symbols from './components/Symbols'
import Identity from './components/Identity'
import Footer from './components/Footer'

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <a
        href="#tissemsilt"
        className="sr-only focus:not-sr-only focus:fixed focus:right-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-straw focus:px-4 focus:py-2 focus:text-bark-deep"
      >
        تخطَّ إلى المحتوى
      </a>
      <Nav />
      <main>
        <Hero />
        <Tissemsilt />
        <History />
        <Doum />
        <Stages />
        <Plait />
        <Symbols />
        <Identity />
      </main>
      <Footer />
    </MotionConfig>
  )
}
