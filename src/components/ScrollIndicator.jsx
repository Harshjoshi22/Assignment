import { forwardRef } from 'react'

const ScrollIndicator = forwardRef(function ScrollIndicator(_, ref) {
  return (
    <div ref={ref} className="absolute bottom-3 left-1/2 z-40 -translate-x-1/2 text-xs font-bold tracking-[0.3em]">
      SCROLL TO EXPLORE <span aria-hidden="true">↓</span>
    </div>
  )
})

export default ScrollIndicator
