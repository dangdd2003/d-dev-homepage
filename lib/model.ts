import * as THREE from 'three'
import getFresnelMat from '@/lib/fresnel'
import getStarfield from '@/lib/starfield'

export default async function createEarth(scene: THREE.Scene) {
  try {
    const earthGroup = new THREE.Group()
    earthGroup.rotation.z = (-23.4 * Math.PI) / 180
    scene.add(earthGroup)
    const details = 12
    const loader = new THREE.TextureLoader()
    const geometry = new THREE.IcosahedronGeometry(1, details)
    const material = new THREE.MeshPhongMaterial({
      map: loader.load('/earth_texture/8081_earthmap4k.jpg'),
      normalMap: loader.load('/earth_texture/earthnormalmap.jpg'),
      specularMap: loader.load('/earth_texture/8081_earthspec4k.jpg'),
      bumpMap: loader.load('/earth_texture/8081_earthbump4k.jpg'),
      lightMap: loader.load('/earth_texture/8081_earthlights4k.jpg'),
      bumpScale: 0.04
    })
    const earthMesh = new THREE.Mesh(geometry, material)
    earthGroup.add(earthMesh)

    const lightsMat = new THREE.MeshBasicMaterial({
      lightMap: loader.load('/earth_texture/8081_earthlights4k.jpg'),
      blending: THREE.AdditiveBlending
    })
    const lightsMesh = new THREE.Mesh(geometry, lightsMat)
    // earthGroup.add(lightsMesh)

    const cloudsMat = new THREE.MeshStandardMaterial({
      map: loader.load('/earth_texture/earthcloudmap.jpg'),
      transparent: true,
      opacity: 0.5,
      blending: THREE.AdditiveBlending,
      alphaMap: loader.load('/earth_texture/earthcloudmaptrans.jpg')
    })
    const cloudsMesh = new THREE.Mesh(geometry, cloudsMat)
    cloudsMesh.scale.setScalar(1.003)
    earthGroup.add(cloudsMesh)

    const fresnelMat = getFresnelMat()
    const glowMesh = new THREE.Mesh(geometry, fresnelMat)
    glowMesh.scale.setScalar(1.01)
    earthGroup.add(glowMesh)

    const stars = getStarfield({ numStars: 1000 })
    scene.add(stars)

    const sunLight = new THREE.DirectionalLight(0xffffff)
    sunLight.position.set(1, 0.5, 1.5)
    scene.add(sunLight)

    return { earthMesh, lightsMesh, cloudsMesh, glowMesh, stars }
  } catch (error) {
    console.log('Error in creating The Earth: ', error)
    throw new Error('Failed to create The Earth!')
  }
}
