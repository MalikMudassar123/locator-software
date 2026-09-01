/**
 * The LOCATOR brand film, in one place.
 *
 * It plays in two very differently-styled frames — the home page hero
 * (VideoHeroSection) and the service pages (ServiceVideo) — and the two used to
 * hold their own sources, so the hero was still pointing at a W3Schools Big
 * Buck Bunny placeholder while the service pages ran the real film. Keeping the
 * id here means swapping the film updates every frame at once.
 *
 * Hosted on Vimeo (https://vimeo.com/1222611216). Public video, no privacy
 * hash needed in the player URL.
 */
export const LOCATOR_VIDEO_ID = '1222611216'

export const LOCATOR_VIDEO_TITLE = 'Locator | Effective Vehicle Tracking and Much More.'

/**
 * `autoplay` is on by default because both call sites only mount the iframe
 * after a click — the viewer has already asked for it, and without the flag
 * they would have to press play a second time inside the Vimeo frame.
 *
 * `title=0&byline=0&portrait=0` strip Vimeo's own title card and author
 * avatar — both call sites already draw their own title and play button over
 * the poster, so Vimeo's copy would duplicate or clash with it. `dnt=1` skips
 * Vimeo's tracking cookies, which the embed doesn't need to function.
 */
export const locatorVideoEmbed = (autoplay = true) =>
  `https://player.vimeo.com/video/${LOCATOR_VIDEO_ID}?title=0&byline=0&portrait=0&dnt=1${autoplay ? '&autoplay=1' : ''}`

/** Vimeo's own generated thumbnail for this video, requested at 1280px wide —
 *  the same still both frames show before playback starts. */
export const LOCATOR_VIDEO_POSTER =
  'https://i.vimeocdn.com/video/2195617753-c46ca833c10ea3d904855ac59abd88982cf99767ed1f25342c404595a320c7c8-d_1280'

/** Permissions the embed needs; identical in both frames. */
export const LOCATOR_VIDEO_ALLOW =
  'autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share'
