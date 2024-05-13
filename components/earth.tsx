import { useState, useEffect, useRef, useCallback } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { EarthSpinner, EarthContainer } from '@/components/earth-loader'
import createEarth from '@/lib/model'

function easeOutCirc(x: number) {
  return Math.sqrt(1 - Math.pow(x - 1, 4))
}

export default function Earth() {
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

      // controler
      const controls = new OrbitControls(camera, renderer.domElement)
      // controls.autoRotate = true
      controls.target = target

      const scene = new THREE.Scene()

      // finish creating the Earth before animation
      let req: number = 0
      let frame: number = 0
      createEarth(scene).then(earthData => {
        const { earthMesh, lightsMesh, cloudsMesh, glowMesh, stars } = earthData
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
      })

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
