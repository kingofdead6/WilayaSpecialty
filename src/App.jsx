import { MotionConfig } from 'framer-motion'
import Nav from './components/Nav'
import Footer from './components/Footer'
import ScrollTop from './components/ScrollTop'
import Home from './pages/Home'
import Faq from './pages/Faq'
import Policies from './pages/Policies'
import NotFound from './pages/NotFound'
import { jumpTo, usePath, useScrollOnRouteChange } from './router'

const PAGES = { '/': Home, '/faq': Faq, '/policies': Policies }

export default function App() {
  const path = usePath()
  useScrollOnRouteChange(path)
  const Page = PAGES[path] ?? NotFound

  return (
    <MotionConfig reducedMotion="user">
      <a
        href="#main"
        onClick={(e) => {
          e.preventDefault()
          jumpTo('main')
        }}
        className="sr-only focus:not-sr-only focus:fixed focus:right-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-straw focus:px-4 focus:py-2 focus:text-bark-deep"
      >
        تخطَّ إلى المحتوى
      </a>
      <Nav />
      <main id="main" className="outline-none">
        <Page key={path} />
      </main>
      <Footer />
      <ScrollTop />
    </MotionConfig>
  )
}
