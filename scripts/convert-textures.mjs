// One-shot: convert every .jpg in public/earth_texture/ to same-dimension .webp.
// Usage: node scripts/convert-textures.mjs
// Idempotent — re-running overwrites the .webp outputs. Leaves .jpg + circle.png intact.
import { readdir, stat } from 'node:fs/promises'
import { join, parse } from 'node:path'
import sharp from 'sharp'

const DIR = 'public/earth_texture'
const QUALITY = 85

const files = (await readdir(DIR)).filter(f => f.toLowerCase().endsWith('.jpg'))

if (files.length === 0) {
  console.error(`No .jpg files found in ${DIR}`)
  process.exit(1)
}

let totalIn = 0
let totalOut = 0
console.log(
  `Converting ${files.length} JPEG(s) to WebP (quality ${QUALITY})...\n`
)

for (const file of files) {
  const src = join(DIR, file)
  const out = join(DIR, `${parse(file).name}.webp`)

  const meta = await sharp(src).metadata()
  // No resize — preserve exact source dimensions.
  await sharp(src).webp({ quality: QUALITY }).toFile(out)

  const inKB = (await stat(src)).size / 1024
  const outKB = (await stat(out)).size / 1024
  totalIn += inKB
  totalOut += outKB

  const pct = (100 * (1 - outKB / inKB)).toFixed(0)
  console.log(
    `${file}  ${meta.width}x${meta.height}  ` +
      `${inKB.toFixed(0)}KB -> ${outKB.toFixed(0)}KB  (-${pct}%)`
  )
}

console.log(
  `\nTotal: ${totalIn.toFixed(0)}KB -> ${totalOut.toFixed(0)}KB  ` +
    `(-${(100 * (1 - totalOut / totalIn)).toFixed(0)}%)`
)
