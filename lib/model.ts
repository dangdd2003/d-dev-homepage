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
  type Scene
} from 'three'
import getFresnelMat from '@/lib/fresnel'
import getStarfield from '@/lib/starfield'

// Cache textures to avoid reloading
const textureCache: Record<string, Texture> = {}
const loader = new TextureLoader()

function loadTexture(path: string, promises: Promise<Texture>[]) {
  if (!textureCache[path]) {
    const promise = new Promise<Texture>((resolve, reject) => {
      textureCache[path] = loader.load(
        path,
        texture => resolve(texture),
        undefined,
        reject
      )
    })
    promises.push(promise)
  }
  return textureCache[path]
}

export default async function createEarth(scene: Scene) {
  try {
    const loadPromisesPhase1: Promise<Texture>[] = []
    const loadPromisesPhase2: Promise<Texture>[] = []
    const loadPromisesPhase3: Promise<Texture>[] = []

    const earthGroup = new Group()
    earthGroup.rotation.z = (-23.4 * Math.PI) / 180
    scene.add(earthGroup)
    const details = 12
    const geometry = new IcosahedronGeometry(1, details)

    // Phase 1: Core Texture (Color Map)
    const material = new MeshPhongMaterial({
      map: loadTexture(
        '/earth_texture/8081_earthmap4k.jpg',
        loadPromisesPhase1
      ),
      bumpScale: 0.04
    })
    const earthMesh = new Mesh(geometry, material)
    earthGroup.add(earthMesh)

    // Build empty structural materials for Phase 2/3 so we can update them on load
    const lightsMat = new MeshBasicMaterial({
      blending: AdditiveBlending
    })
    const lightsMesh = new Mesh(geometry, lightsMat)

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

    const sunLight = new DirectionalLight(0xffffff)
    sunLight.position.set(1, 0.5, 1.5)
    scene.add(sunLight)

    // Wait only for Phase 1 (Core Map)
    await Promise.all(loadPromisesPhase1)

    // Earth is now visible! Start background Phase 2 & 3
    // Phase 2: Surface details (normal, spec, bump)
    const p2Normal = loadTexture(
      '/earth_texture/earthnormalmap.jpg',
      loadPromisesPhase2
    )
    const p2Spec = loadTexture(
      '/earth_texture/8081_earthspec4k.jpg',
      loadPromisesPhase2
    )
    const p2Bump = loadTexture(
      '/earth_texture/8081_earthbump4k.jpg',
      loadPromisesPhase2
    )

    Promise.all(loadPromisesPhase2)
      .then(() => {
        material.normalMap = p2Normal
        material.specularMap = p2Spec
        material.bumpMap = p2Bump
        material.needsUpdate = true
      })
      .catch(err => console.warn('Phase 2 loading failed: ', err))

    // Phase 3: Atmosphere & lights
    const p3Lights = loadTexture(
      '/earth_texture/8081_earthlights4k.jpg',
      loadPromisesPhase3
    )
    const p3Clouds = loadTexture(
      '/earth_texture/earthcloudmap.jpg',
      loadPromisesPhase3
    )
    const p3CloudsTrans = loadTexture(
      '/earth_texture/earthcloudmaptrans.jpg',
      loadPromisesPhase3
    )

    Promise.all(loadPromisesPhase3)
      .then(() => {
        lightsMat.lightMap = p3Lights
        lightsMat.needsUpdate = true

        cloudsMat.map = p3Clouds
        cloudsMat.alphaMap = p3CloudsTrans
        cloudsMat.needsUpdate = true
      })
      .catch(err => console.warn('Phase 3 loading failed: ', err))

    return { earthMesh, lightsMesh, cloudsMesh, glowMesh, stars }
  } catch (error) {
    console.error('Error in creating The Earth: ', error)
    throw new Error('Failed to create The Earth!')
  }
}
