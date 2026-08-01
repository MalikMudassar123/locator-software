'use client'

import { useLayoutEffect } from 'react'
import { usePathname } from 'next/navigation'

// Next's built-in scroll-to-top on navigation checks whether the new route's
// content already appears in the viewport before resetting scroll. Almost
// every route here opens with a `position: fixed` navbar (SoftwareNavbar),
// which always reports as "in view" regardless of actual scroll offset, so
// that check can pass when it shouldn't and the page is left wherever the
// previous route had scrolled to. Force every route change back to the top
// explicitly instead of relying on that heuristic.
export default function ScrollRestoration() {
  const pathname = usePathname()

  useLayoutEffect(() => {
    // A hash in the URL means the browser/router is scrolling to an in-page
    // anchor (e.g. /software#fleet-manager) — don't fight that.
    if (window.location.hash) return
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}
