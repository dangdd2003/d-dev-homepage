import {
  BufferGeometry,
  Float32BufferAttribute,
  Points,
  PointsMaterial,
  TextureLoader,
  type Texture
} from 'three'

// Cache texture to avoid reloading on every call
let starTexture: Texture | null = null

export function disposeStarTexture() {
  if (starTexture) {
    starTexture.dispose()
    starTexture = null
  }
}

export interface StarfieldOptions {
  numStars?: number
}

export default function getStarfield({
  numStars = 500
}: StarfieldOptions = {}): Points<BufferGeometry, PointsMaterial> {
  const verts = new Float32Array(numStars * 3)
  for (let i = 0; i < numStars; i += 1) {
    const radius = Math.random() * 25 + 25
    const u = Math.random()
    const v = Math.random()
    const theta = 2 * Math.PI * u
    const phi = Math.acos(2 * v - 1)
    const i3 = i * 3
    verts[i3] = radius * Math.sin(phi) * Math.cos(theta)
    verts[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
    verts[i3 + 2] = radius * Math.cos(phi)
  }
  const geo = new BufferGeometry()
  geo.setAttribute('position', new Float32BufferAttribute(verts, 3))
  // Cache texture on first call, reuse thereafter
  if (!starTexture) {
    starTexture = new TextureLoader().load('/earth_texture/circle.png')
  }
  const mat = new PointsMaterial({
    size: 0.5,
    map: starTexture
  })
  return new Points(geo, mat)
}
