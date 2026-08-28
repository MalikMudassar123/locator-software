/**
 * The LOCATOR brand film, in one place.
 *
 * It plays in two very differently-styled frames — the home page hero
 * (VideoHeroSection) and the service pages (ServiceVideo) — and the two used to
 * hold their own sources, so the hero was still pointing at a W3Schools Big
 * Buck Bunny placeholder while the service pages ran the real film. Keeping the
 * id here means swapping the film updates every frame at once.
 */
export const LOCATOR_VIDEO_ID = 'hwqB52vVUig'

export const LOCATOR_VIDEO_TITLE = 'LOCATOR - Effective Vehicle Tracking System'

/**
 * `autoplay` is on by default because both call sites only mount the iframe
 * after a click — the viewer has already asked for it, and without the flag
 * they would have to press play a second time inside the YouTube frame.
 */
export const locatorVideoEmbed = (autoplay = true) =>
  `https://www.youtube.com/embed/${LOCATOR_VIDEO_ID}${autoplay ? '?autoplay=1' : ''}`

/** maxres is what YouTube generates for HD uploads; it is the same still both
 *  frames show before playback starts. */
export const LOCATOR_VIDEO_POSTER = `https://i.ytimg.com/vi/${LOCATOR_VIDEO_ID}/maxresdefault.jpg`

/** Permissions the embed needs; identical in both frames. */
export const LOCATOR_VIDEO_ALLOW =
  'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
