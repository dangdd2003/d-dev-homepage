import { useState, useEffect, useRef, useCallback } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { EarthSpinner, EarthContainer } from '@/components/earth-loader'
import getFresnelMat from '@/lib/fresnel'
import getStarfield from '@/lib/starfield'

function easeOutCirc(x: number) {
  return Math.sqrt(1 - Math.pow(x - 1, 4))
}

const VoxelDog = () => {
  const refContainer = useRef<HTMLDivElement>(null)
  const [loading, setLoading] = useState(true)
  const refRenderer = useRef<THREE.WebGLRenderer>()

  const handleWindowResize = useCallback(() => {
    const { current: renderer } = refRenderer
    const { current: container } = refContainer
    if (container && renderer) {
      const scW = container.clientWidth
      const scH = container.clientHeight
      renderer.setSize(scW, scH)
    }
  }, [])

  useEffect(() => {
    const { current: container } = refContainer
    if (container) {
      const scW = container.clientWidth
      const scH = container.clientHeight

      const renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true
      })
      renderer.setPixelRatio(window.devicePixelRatio)
      renderer.setSize(scW, scH)
      renderer.outputColorSpace = THREE.SRGBColorSpace

      const target = new THREE.Vector3(0, 0, 0)
      const initialCameraPosition = new THREE.Vector3(10, 0, 0)

      const camera = new THREE.PerspectiveCamera(20, scW / scH, 0.1, 1000)
      camera.position.z = 5
      camera.position.copy(initialCameraPosition)
      camera.lookAt(target)

      container.appendChild(renderer.domElement)
      refRenderer.current = renderer

      const scene = new THREE.Scene()
      // build the earth and map texture
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

      // controler
      const controls = new OrbitControls(camera, renderer.domElement)
      // controls.autoRotate = true
      controls.target = target

      let req: number = 0
      let frame = 0
      const animate = () => {
        req = requestAnimationFrame(animate)

        earthMesh.rotation.y += 0.002
        lightsMesh.rotation.y += 0.002
        cloudsMesh.rotation.y += 0.0023
        glowMesh.rotation.y += 0.002
        stars.rotation.y -= 0.0002

        frame = frame <= 100 ? frame + 1 : frame

        if (frame <= 100) {
          const p = initialCameraPosition
          const rotSpeed = -easeOutCirc(frame / 120) * Math.PI * 20

          camera.position.x =
            p.x * Math.cos(rotSpeed) + p.z * Math.sin(rotSpeed)
          camera.position.z =
            p.z * Math.cos(rotSpeed) - p.x * Math.sin(rotSpeed)
          camera.lookAt(target)
        } else {
          controls.update()
        }
        renderer.render(scene, camera)
      }
      animate()
      setLoading(false)
      return () => {
        cancelAnimationFrame(req)
        camera.aspect = scW / scH
        camera.updateProjectionMatrix()
        renderer.domElement.remove()
        renderer.dispose()
      }
    }
  }, [])

  useEffect(() => {
    window.addEventListener('resize', handleWindowResize, false)
    return () => {
      window.removeEventListener('resize', handleWindowResize, false)
    }
  }, [handleWindowResize])

  return (
    <EarthContainer ref={refContainer}>
      {loading && <EarthSpinner />}
    </EarthContainer>
  )
}

export default VoxelDog
