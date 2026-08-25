import Image from 'next/image'

/**
 * Flag art for every country the careers filter offers. The UAE flag predates
 * the /flags folder and still lives at the site root, so it's mapped
 * explicitly rather than derived from the country name.
 */
export const COUNTRY_FLAGS: Record<string, string> = {
  'United Arab Emirates': '/uae-flag.svg',
  'Saudi Arabia': '/flags/saudi-arabia.svg',
  Kuwait: '/flags/kuwait.svg',
  Qatar: '/flags/qatar.svg',
  Oman: '/flags/oman.svg',
  Bahrain: '/flags/bahrain.svg',
  India: '/flags/india.svg',
}

/**
 * A country flag cropped into a small circle — the same treatment as the
 * market cards on the contact page, scaled down for list rows and filter
 * options. "All" has no flag of its own, so it gets a globe mark instead,
 * which keeps every row in the dropdown optically aligned.
 *
 * Styles are inline rather than class-based because this renders once per
 * job row and once per dropdown option; a <style> block per instance would
 * duplicate the same rules many times over.
 */
export default function CountryFlag({ country, size = 20 }: { country: string; size?: number }) {
  const src = COUNTRY_FLAGS[country]

  const shell: React.CSSProperties = {
    width: size,
    height: size,
    borderRadius: '50%',
    overflow: 'hidden',
    flexShrink: 0,
    display: 'grid',
    placeItems: 'center',
    boxShadow: 'inset 0 0 0 1px rgba(15,23,42,.12)',
  }

  if (!src) {
    // "All" (or any country without art) — a neutral globe in the same circle.
    return (
      <span style={{ ...shell, background: '#eef3ff', color: '#1360ee' }} aria-hidden="true">
        <svg
          width={Math.round(size * 0.66)}
          height={Math.round(size * 0.66)}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="9" />
          <path d="M3 12h18M12 3c2.5 2.6 2.5 15.4 0 18M12 3c-2.5 2.6-2.5 15.4 0 18" />
        </svg>
      </span>
    )
  }

  return (
    <span style={shell} aria-hidden="true">
      <Image
        src={src}
        alt=""
        width={size}
        height={size}
        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
      />
    </span>
  )
}
