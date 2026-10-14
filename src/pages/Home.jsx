import Hero from '../components/Hero'
import Tissemsilt from '../components/Tissemsilt'
import History from '../components/History'
import Doum from '../components/Doum'
import Stages from '../components/Stages'
import Plait from '../components/Plait'
import Symbols from '../components/Symbols'
import Identity from '../components/Identity'
import { useTitle } from '../router'

export default function Home() {
  useTitle(null)
  return (
    <>
      <Hero />
      <Tissemsilt />
      <History />
      <Doum />
      <Stages />
      <Plait />
      <Symbols />
      <Identity />
    </>
  )
}
