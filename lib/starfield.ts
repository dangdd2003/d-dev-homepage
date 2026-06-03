import {
  Vector3,
  BufferGeometry,
  Float32BufferAttribute,
  Points,
  PointsMaterial,
  TextureLoader,
  type Texture
} from 'three'

// Cache texture to avoid reloading on every call
let starTexture: Texture | null = null

export default function getStarfield({ numStars = 500 } = {}) {
  function randomSpherePoint() {
    const radius = Math.random() * 25 + 25
    const u = Math.random()
    const v = Math.random()
    const theta = 2 * Math.PI * u
    const phi = Math.acos(2 * v - 1)
    const x = radius * Math.sin(phi) * Math.cos(theta)
    const y = radius * Math.sin(phi) * Math.sin(theta)
    const z = radius * Math.cos(phi)

    return {
      pos: new Vector3(x, y, z),
      hue: 0.6,
      minDist: radius
    }
  }
  const verts = new Float32Array(numStars * 3)
  for (let i = 0; i < numStars; i += 1) {
    const p = randomSpherePoint()
    const { pos } = p
    const i3 = i * 3
    verts[i3] = pos.x
    verts[i3 + 1] = pos.y
    verts[i3 + 2] = pos.z
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
  const points = new Points(geo, mat)
  return points
}
