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

function loadTexture(path: string) {
  if (!textureCache[path]) {
    textureCache[path] = loader.load(path)
  }
  return textureCache[path]
}

export default async function createEarth(scene: Scene) {
  try {
    const earthGroup = new Group()
    earthGroup.rotation.z = (-23.4 * Math.PI) / 180
    scene.add(earthGroup)
    const details = 12
    const geometry = new IcosahedronGeometry(1, details)

    const material = new MeshPhongMaterial({
      map: loadTexture('/earth_texture/8081_earthmap4k.jpg'),
      normalMap: loadTexture('/earth_texture/earthnormalmap.jpg'),
      specularMap: loadTexture('/earth_texture/8081_earthspec4k.jpg'),
      bumpMap: loadTexture('/earth_texture/8081_earthbump4k.jpg'),
      lightMap: loadTexture('/earth_texture/8081_earthlights4k.jpg'),
      bumpScale: 0.04
    })
    const earthMesh = new Mesh(geometry, material)
    earthGroup.add(earthMesh)

    const lightsMat = new MeshBasicMaterial({
      lightMap: loadTexture('/earth_texture/8081_earthlights4k.jpg'),
      blending: AdditiveBlending
    })
    const lightsMesh = new Mesh(geometry, lightsMat)
    // earthGroup.add(lightsMesh)

    const cloudsMat = new MeshStandardMaterial({
      map: loadTexture('/earth_texture/earthcloudmap.jpg'),
      transparent: true,
      opacity: 0.5,
      blending: AdditiveBlending,
      alphaMap: loadTexture('/earth_texture/earthcloudmaptrans.jpg')
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

    return { earthMesh, lightsMesh, cloudsMesh, glowMesh, stars }
  } catch (error) {
    console.log('Error in creating The Earth: ', error)
    throw new Error('Failed to create The Earth!')
  }
}
