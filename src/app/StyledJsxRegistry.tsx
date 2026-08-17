'use client'

import { useState } from 'react'
import { useServerInsertedHTML } from 'next/navigation'
import { StyleRegistry, createStyleRegistry } from 'styled-jsx'

/**
 * Server-side collector for styled-jsx.
 *
 * This is what stops the lower half of the landing page arriving as unstyled
 * markup. styled-jsx is not automatically collected during SSR in the App
 * Router: without a registry it only injects its <style> tags on the client,
 * while the runtime is booting. Everything built with `<style jsx>` therefore
 * shipped as HTML carrying class names that matched no rule anywhere in the
 * document, and stayed that way until hydration ran — the 1-2 second flash of
 * raw content.
 *
 * It lined up exactly with which sections were affected. Smart IoT, the globe
 * hero, video hero, testimonials, the logo marquee and the blog section all use
 * `<style jsx>` and all flashed. The navbar, hero, ScrollShowcase (Fleet and
 * Video Telematics), FeatureSlider and footer use inline styles, globals.css or
 * a plain server-rendered `<style>` element, and none of them ever flashed.
 *
 * `useServerInsertedHTML` gives styled-jsx the flush hook it is missing, so
 * those rules are emitted into the document during rendering and are already in
 * force on the browser's first paint. Nothing about the CSS itself changes —
 * same selectors, same declarations, same cascade position — only when it
 * arrives. Hydration is unaffected: the registry hands the client the same
 * stylesheet it just sent, so styled-jsx adopts it instead of re-inserting it.
 *
 * Must wrap every subtree containing `<style jsx>`, which is why the root layout
 * puts it around ContactDock and ScrollRestoration as well as {children} — the
 * dock and its SupportChat use styled-jsx too and would otherwise keep flashing
 * on their own.
 */
export default function StyledJsxRegistry({
  children,
}: {
  children: React.ReactNode
}) {
  // createStyleRegistry() is called lazily and kept for the life of the tree.
  // Once per render pass, not once per module: two concurrent requests must not
  // share a registry or one can flush the other's styles away.
  const [registry] = useState(() => createStyleRegistry())

  useServerInsertedHTML(() => {
    const styles = registry.styles()
    // Flush after reading, so a streamed response emits each chunk's styles
    // exactly once rather than repeating everything collected so far.
    registry.flush()
    return <>{styles}</>
  })

  return <StyleRegistry registry={registry}>{children}</StyleRegistry>
}
