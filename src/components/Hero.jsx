import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import carSrc from '../assets/car.svg'
import Stats from './Stats'
import ScrollIndicator from './ScrollIndicator'

gsap.registerPlugin(ScrollTrigger)

export default function Hero() {
  const heroRef = useRef(null)
  const carRef = useRef(null)
  const carImgRef = useRef(null)
  const roadRef = useRef(null)
  const roadBgRef = useRef(null)
  const linesRef = useRef(null)
  const clipRef = useRef(null)
  const clipInnerRef = useRef(null)
  const scrollIndicatorRef = useRef(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia()

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap
          .timeline({ defaults: { ease: 'power3.out' } })
          .from(roadRef.current, { opacity: 0, duration: 0.5 })
          .from(carImgRef.current, { opacity: 0, x: -60, duration: 0.6 }, '-=0.2')

        const vw = () => window.innerWidth
        const carW = () => carRef.current.offsetWidth
        const margin = () => vw() * 0.03
        const grow = 1.2
        const travel = () => vw() - margin() * 2 - carW() * (1 + (grow - 1) / 2)
        const edgeStart = () => margin() + carW() * 0.08 - vw()
        const hero = heroRef.current

        const tl = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: {
            trigger: hero,
            start: 'top top',
            end: () => '+=' + Math.max(vw() * 2, 1600),
            scrub: 0.6,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        })

        tl.fromTo(carRef.current, { x: 0, scale: 1 }, { x: travel, scale: grow }, 0)
          .fromTo(roadBgRef.current, { scaleY: 1 }, { scaleY: grow }, 0)
          .fromTo(linesRef.current, { x: 0 }, { x: -720 }, 0)
          .fromTo(clipRef.current, { x: edgeStart }, { x: 0 }, 0)
          .fromTo(clipInnerRef.current, { x: () => -edgeStart() }, { x: 0 }, 0)
          .to(scrollIndicatorRef.current, { opacity: 0, duration: 0.08 }, 0)

        gsap.utils.toArray('.stat').forEach((card, i) => {
          tl.fromTo(
            card,
            { y: () => hero.offsetHeight / 2 - (card.offsetTop + card.offsetHeight / 2), scale: 0.4 },
            { y: 0, scale: 1, ease: 'power2.out', duration: 0.22 },
            0.08 + i * 0.18
          )
        })
      })
    }, heroRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={heroRef} className="hero relative h-screen w-full overflow-hidden bg-[#d8f3dc]" aria-label="Hero">
      <Stats />

      <div ref={roadRef} className="road absolute inset-x-0 z-10">
        <div ref={roadBgRef} className="road-bg absolute inset-0 overflow-hidden">
          <div ref={linesRef} className="road-lines absolute inset-y-0 left-0" />
        </div>
        <div ref={clipRef} className="absolute inset-0 overflow-hidden">
          <div ref={clipInnerRef} className="absolute inset-0 flex items-center pl-[3vw]">
            <h1 className="headline">Welcome ItzFizz</h1>
          </div>
        </div>
      </div>

      <div ref={carRef} className="car absolute">
        <img ref={carImgRef} src={carSrc} alt="Red sports car driving across the page" className="block w-full" />
      </div>

      <ScrollIndicator ref={scrollIndicatorRef} />
    </section>
  )
}
