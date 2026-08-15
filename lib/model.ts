import {
  Group,
  TextureLoader,
  type Texture,
  IcosahedronGeometry,
  MeshPhongMaterial,
  Mesh,
  AdditiveBlending,
  MeshStandardMaterial,
  DirectionalLight,
  AmbientLight,
  type Scene,
  Points,
  BufferGeometry,
  PointsMaterial,
  ShaderMaterial,
  Vector3,
  DataTexture,
  RGBAFormat,
  Color,
  SRGBColorSpace
} from 'three'
import getFresnelMat from '@/lib/fresnel'
import getStarfield, { disposeStarTexture } from '@/lib/starfield'

export interface EarthModel {
  earthMesh: Mesh<IcosahedronGeometry, MeshPhongMaterial>
  lightsMesh: Mesh<IcosahedronGeometry, ShaderMaterial>
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

function loadTexture(
  path: string,
  promises: Promise<Texture>[],
  isColor = false
): Texture {
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
      t => {
        if (isColor) t.colorSpace = SRGBColorSpace
        resolvePromise(t)
      },
      undefined,
      err => rejectPromise(err)
    )
    if (isColor) texture.colorSpace = SRGBColorSpace

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

    // Phase 1: Core Texture (Color-Graded High-Contrast Day Map)
    const material = new MeshPhongMaterial({
      map: loadTexture(
        '/earth_texture/2k_earth_daymap.webp',
        loadPromisesPhase1,
        true
      ),
      specular: new Color(0x333333),
      shininess: 15
    })
    const earthMesh = new Mesh(geometry, material)
    earthGroup.add(earthMesh)

    // Sun light positioned for a vibrant 65% day / 35% night split
    const sunPos = new Vector3(3.0, 1.2, 3.5)
    const sunDirection = sunPos.clone().normalize()

    // 1x1 transparent dummy texture so WebGL sampler2D is always valid before Phase 3 loads
    const emptyTexture = new DataTexture(
      new Uint8Array([0, 0, 0, 0]),
      1,
      1,
      RGBAFormat
    )
    emptyTexture.needsUpdate = true

    // Sun-aware Night Lights shader: city lights glow vividly on the night side
    const lightsUniforms = {
      lightsTexture: { value: emptyTexture as Texture },
      sunDirection: { value: sunDirection }
    }
    const lightsMat = new ShaderMaterial({
      uniforms: lightsUniforms,
      vertexShader: `
        varying vec2 vUv;
        varying vec3 vWorldNormal;

        void main() {
          vUv = uv;
          vWorldNormal = normalize((modelMatrix * vec4(normal, 0.0)).xyz);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform sampler2D lightsTexture;
        uniform vec3 sunDirection;

        varying vec2 vUv;
        varying vec3 vWorldNormal;

        void main() {
          vec4 texColor = texture2D(lightsTexture, vUv);
          float dProd = dot(vWorldNormal, sunDirection);
          float nightFactor = smoothstep(0.2, -0.1, dProd);
          gl_FragColor = vec4(texColor.rgb * nightFactor * 2.2, texColor.a * nightFactor);
        }
      `,
      transparent: true,
      blending: AdditiveBlending,
      depthWrite: false
    })
    const lightsMesh = new Mesh(geometry, lightsMat)
    lightsMesh.scale.setScalar(1.001)
    earthGroup.add(lightsMesh)

    const cloudsMat = new MeshStandardMaterial({
      transparent: true,
      opacity: 0.45,
      blending: AdditiveBlending,
      depthWrite: false
    })
    const cloudsMesh = new Mesh(geometry, cloudsMat)
    cloudsMesh.scale.setScalar(1.003)
    earthGroup.add(cloudsMesh)

    // Sun-aware atmospheric Fresnel glow
    const fresnelMat = getFresnelMat({ sunDirection })
    const glowMesh = new Mesh(geometry, fresnelMat)
    glowMesh.scale.setScalar(1.01)
    earthGroup.add(glowMesh)

    const stars = getStarfield({ numStars: 1000 })
    scene.add(stars)

    const sunLight = new DirectionalLight(0xffffff, 2.0)
    sunLight.position.copy(sunPos)
    scene.add(sunLight)

    const ambientLight = new AmbientLight(0xffffff, 0.35)
    scene.add(ambientLight)

    // Earth is now visible! Start background Phase 2 & 3
    // Start loading Phase 2 and 3 textures in parallel with Phase 1 to reduce total load time
    const p2Normal = loadTexture(
      '/earth_texture/2k_earth_normal_map.webp',
      loadPromisesPhase2
    )
    const p2Spec = loadTexture(
      '/earth_texture/2k_earth_specular_map.webp',
      loadPromisesPhase2
    )

    const p3Lights = loadTexture(
      '/earth_texture/2k_earth_nightmap.webp',
      loadPromisesPhase3,
      true
    )
    const p3Clouds = loadTexture(
      '/earth_texture/2k_earth_clouds.webp',
      loadPromisesPhase3,
      true
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
        material.needsUpdate = true
      })
      .catch(err => {
        if (!isDisposed) console.warn('Phase 2 loading failed: ', err)
      })

    // Apply Phase 3 textures when they finish loading
    Promise.all(loadPromisesPhase3)
      .then(() => {
        if (isDisposed) return
        lightsUniforms.lightsTexture.value = p3Lights
        lightsMat.needsUpdate = true

        cloudsMat.map = p3Clouds
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
      scene.remove(ambientLight)
      ambientLight.dispose()
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
      emptyTexture.dispose()
      disposeTextures()
    }

    return { earthMesh, lightsMesh, cloudsMesh, glowMesh, stars, dispose }
  } catch (error) {
    console.error('Error in creating The Earth: ', error)
    throw new Error('Failed to create The Earth!')
  }
}
