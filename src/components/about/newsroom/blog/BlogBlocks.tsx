import Image from 'next/image'
import RichText from './RichText'
import type { BlogBlock, BlogBlockImage } from './blog-content'

function textLength(blocks: BlogBlock[]): number {
  let n = 0
  for (const b of blocks) {
    if ('html' in b) n += b.html.replace(/<[^>]+>/g, '').length
    if ('items' in b) n += b.items.join(' ').replace(/<[^>]+>/g, '').length
    if ('rows' in b) n += b.rows.flatMap((r) => r.cells).join(' ').replace(/<[^>]+>/g, '').length
    if ('blocks' in b) n += textLength(b.blocks)
  }
  return n
}

function bandLayout(block: Extract<BlogBlock, { type: 'split' }>) {
  const chars = textLength(block.blocks)
  if (chars < 120) return 'compact'
  if (chars < 400) return 'brief'
  return block.image.width / block.image.height >= 1.25 ? 'wide-image' : 'wide-text'
}

function Figure({ image, className = 'ba-figure' }: { image: BlogBlockImage; className?: string }) {
  return (
    <figure className={className}>
      <Image
        src={image.src}
        alt={image.alt}
        width={image.width}
        height={image.height}
        sizes="(max-width: 900px) 100vw, 720px"
        className="ba-img"
      />
    </figure>
  )
}

function Table({ rows }: { rows: { head: boolean; cells: string[] }[] }) {
  const head = rows.filter((r) => r.head)
  const body = rows.filter((r) => !r.head)
  return (
    <div className="ba-table-scroll">
      <table className="ba-table">
        {head.length > 0 && (
          <thead>
            {head.map((row, i) => (
              <tr key={i}>
                {row.cells.map((cell, j) => (
                  <th key={j} scope="col">
                    <RichText html={cell} />
                  </th>
                ))}
              </tr>
            ))}
          </thead>
        )}
        <tbody>
          {body.map((row, i) => (
            <tr key={i}>
              {row.cells.map((cell, j) => (
                <td key={j}>
                  <RichText html={cell} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function Block({ block }: { block: BlogBlock }) {
  switch (block.type) {
    case 'heading':
      return block.level === 2 ? (
        <h2 className="ba-h2">
          <RichText html={block.html} />
        </h2>
      ) : (
        <h3 className="ba-h3">
          <RichText html={block.html} />
        </h3>
      )

    case 'p':
      return (
        <p className="ba-p">
          <RichText html={block.html} />
        </p>
      )

    case 'quote':
      return (
        <blockquote className="ba-quote">
          <RichText html={block.html} />
        </blockquote>
      )

    case 'ul':
      return (
        <ul className="ba-list">
          {block.items.map((item, i) => (
            <li key={i}>
              <RichText html={item} />
            </li>
          ))}
        </ul>
      )

    case 'ol':
      return (
        <ol className="ba-olist">
          {block.items.map((item, i) => (
            <li key={i}>
              <RichText html={item} />
            </li>
          ))}
        </ol>
      )

    case 'image':
      return <Figure image={block.image} />

    case 'table':
      return <Table rows={block.rows} />

    case 'group':
      return <BlogBlocks blocks={block.blocks} />

    case 'split':
      return (
        <div
          className="ba-split"
          data-side={block.side}
          data-layout={bandLayout(block)}
        >
          <Figure image={block.image} className="ba-split-figure" />
          <div className="ba-split-body">
            {block.step !== undefined && <span className="ba-step">{String(block.step).padStart(2, '0')}</span>}
            <BlogBlocks blocks={block.blocks} />
          </div>
        </div>
      )

    default:
      return null
  }
}

export default function BlogBlocks({ blocks }: { blocks: BlogBlock[] }) {
  return (
    <>
      {blocks.map((block, i) => (
        <Block key={i} block={block} />
      ))}
    </>
  )
}
