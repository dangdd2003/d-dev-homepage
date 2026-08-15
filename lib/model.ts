import {
  Group,
  TextureLoader,
  type Texture,
  IcosahedronGeometry,
  MeshPhongMaterial,
  Mesh,
  MeshBasicMaterial,
  AdditiveBlending,
  MeshStandardMaterial,
  DirectionalLight,
  type Scene,
  Points,
  BufferGeometry,
  PointsMaterial,
  ShaderMaterial
} from 'three'
import getFresnelMat from '@/lib/fresnel'
import getStarfield, { disposeStarTexture } from '@/lib/starfield'

export interface EarthModel {
  earthMesh: Mesh<IcosahedronGeometry, MeshPhongMaterial>
  lightsMesh: Mesh<IcosahedronGeometry, MeshBasicMaterial>
  cloudsMesh: Mesh<IcosahedronGeometry, MeshStandardMaterial>
  glowMesh: Mesh<IcosahedronGeometry, ShaderMaterial>
  stars: Points<BufferGeometry, PointsMaterial>
  dispose: () => void
}

interface CacheEntry {
  texture: Texture
  promise: Promise<Texture>
}

// Cache textures and their loading promises to avoid reloading and ensure all callers wait properly
const textureCache: Record<string, CacheEntry> = {}
const loader = new TextureLoader()

// Dispose all cached textures and free GPU memory
export function disposeTextures() {
  for (const key of Object.keys(textureCache)) {
    textureCache[key]?.texture.dispose()
    delete textureCache[key]
  }
}

function loadTexture(path: string, promises: Promise<Texture>[]): Texture {
  const cached = textureCache[path]
  if (!cached) {
    let resolvePromise!: (value: Texture) => void
    let rejectPromise!: (reason?: unknown) => void
    const promise = new Promise<Texture>((resolve, reject) => {
      resolvePromise = resolve
      rejectPromise = reject
    })

    const texture = loader.load(
      path,
      t => resolvePromise(t),
      undefined,
      err => rejectPromise(err)
    )

    textureCache[path] = { texture, promise }
    promises.push(promise)
    return texture
  }
  promises.push(cached.promise)
  return cached.texture
}

export default async function createEarth(scene: Scene): Promise<EarthModel> {
  try {
    const loadPromisesPhase1: Promise<Texture>[] = []
    const loadPromisesPhase2: Promise<Texture>[] = []
    const loadPromisesPhase3: Promise<Texture>[] = []

    const earthGroup = new Group()
    earthGroup.rotation.z = (-23.4 * Math.PI) / 180
    scene.add(earthGroup)
    const details = 16
    const geometry = new IcosahedronGeometry(1, details)

    // Phase 1: Core Texture (Color Map)
    const material = new MeshPhongMaterial({
      map: loadTexture(
        '/earth_texture/8081_earthmap4k.webp',
        loadPromisesPhase1
      ),
      bumpScale: 0.04
    })
    const earthMesh = new Mesh(geometry, material)
    earthGroup.add(earthMesh)

    // Build empty structural materials for Phase 2/3 so we can update them on load
    const lightsMat = new MeshBasicMaterial({
      blending: AdditiveBlending,
      transparent: true
    })
    const lightsMesh = new Mesh(geometry, lightsMat)
    earthGroup.add(lightsMesh)

    const cloudsMat = new MeshStandardMaterial({
      transparent: true,
      opacity: 0.5,
      blending: AdditiveBlending
    })
    const cloudsMesh = new Mesh(geometry, cloudsMat)
    cloudsMesh.scale.setScalar(1.003)
    earthGroup.add(cloudsMesh)

    const fresnelMat = getFresnelMat()
    const glowMesh = new Mesh(geometry, fresnelMat)
    glowMesh.scale.setScalar(1.01)
    earthGroup.add(glowMesh)

    const stars = getStarfield({ numStars: 1000 })
    scene.add(stars)

    const sunLight = new DirectionalLight(0xffffff, 0.7)
    sunLight.position.set(1, 0.5, 1.5)
    scene.add(sunLight)

    // Earth is now visible! Start background Phase 2 & 3
    // Start loading Phase 2 and 3 textures in parallel with Phase 1 to reduce total load time
    const p2Normal = loadTexture(
      '/earth_texture/earthnormalmap.webp',
      loadPromisesPhase2
    )
    const p2Spec = loadTexture(
      '/earth_texture/8081_earthspec4k.webp',
      loadPromisesPhase2
    )
    const p2Bump = loadTexture(
      '/earth_texture/8081_earthbump4k.webp',
      loadPromisesPhase2
    )

    const p3Lights = loadTexture(
      '/earth_texture/8081_earthlights4k.webp',
      loadPromisesPhase3
    )
    const p3Clouds = loadTexture(
      '/earth_texture/earthcloudmap.webp',
      loadPromisesPhase3
    )
    const p3CloudsTrans = loadTexture(
      '/earth_texture/earthcloudmaptrans.webp',
      loadPromisesPhase3
    )

    // Wait only for Phase 1 (Core Map) to complete before rendering the earth
    await Promise.all(loadPromisesPhase1)

    let isDisposed = false

    // Apply Phase 2 textures when they finish loading
    Promise.all(loadPromisesPhase2)
      .then(() => {
        if (isDisposed) return
        material.normalMap = p2Normal
        material.specularMap = p2Spec
        material.bumpMap = p2Bump
        material.needsUpdate = true
      })
      .catch(err => {
        if (!isDisposed) console.warn('Phase 2 loading failed: ', err)
      })

    // Apply Phase 3 textures when they finish loading
    Promise.all(loadPromisesPhase3)
      .then(() => {
        if (isDisposed) return
        lightsMat.map = p3Lights
        lightsMat.needsUpdate = true

        cloudsMat.map = p3Clouds
        cloudsMat.alphaMap = p3CloudsTrans
        cloudsMat.needsUpdate = true
      })
      .catch(err => {
        if (!isDisposed) console.warn('Phase 3 loading failed: ', err)
      })

    const dispose = () => {
      isDisposed = true
      scene.remove(earthGroup)
      scene.remove(stars)
      scene.remove(sunLight)
      sunLight.dispose()
      geometry.dispose()
      material.dispose()
      lightsMat.dispose()
      cloudsMat.dispose()
      if (Array.isArray(stars.material)) {
        stars.material.forEach(m => m.dispose())
      } else {
        stars.material.dispose()
      }
      disposeStarTexture()
      disposeTextures()
    }

    return { earthMesh, lightsMesh, cloudsMesh, glowMesh, stars, dispose }
  } catch (error) {
    console.error('Error in creating The Earth: ', error)
    throw new Error('Failed to create The Earth!')
  }
}
