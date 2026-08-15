import { useState, useEffect, useRef, useCallback } from 'react'
import {
  WebGLRenderer,
  PerspectiveCamera,
  Vector3,
  Scene,
  SRGBColorSpace,
  Raycaster,
  Vector2,
  Mesh
} from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { EarthSpinner, EarthContainer } from '@/components/earth-loader'
import createEarth from '@/lib/model'

function easeOutCirc(x: number): number {
  return Math.sqrt(1 - Math.pow(x - 1, 4))
}

function easeInOutCubic(x: number): number {
  return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2
}

export default function Earth() {
  const refContainer = useRef<HTMLDivElement>(null)
  const [loading, setLoading] = useState(true)
  const refRenderer = useRef<WebGLRenderer | null>(null)
  const refCamera = useRef<PerspectiveCamera | null>(null)

  const handleWindowResize = useCallback(() => {
    const { current: renderer } = refRenderer
    const { current: camera } = refCamera
    const { current: container } = refContainer
    if (container && renderer && camera) {
      const scW = container.clientWidth
      const scH = container.clientHeight
      renderer.setSize(scW, scH)
      camera.aspect = scW / scH
      camera.updateProjectionMatrix()
    }
  }, [])

  useEffect(() => {
    const { current: container } = refContainer
    if (container) {
      const scW = container.clientWidth
      const scH = container.clientHeight

      const renderer = new WebGLRenderer({
        antialias: true,
        alpha: true
      })
      renderer.setPixelRatio(window.devicePixelRatio)
      renderer.setSize(scW, scH)
      renderer.outputColorSpace = SRGBColorSpace

      const target = new Vector3(0, 0, 0)
      const initialCameraPosition = new Vector3(10, 0, 0)

      const camera = new PerspectiveCamera(20, scW / scH, 0.1, 1000)
      camera.position.copy(initialCameraPosition)
      camera.lookAt(target)

      container.appendChild(renderer.domElement)
      refRenderer.current = renderer
      refCamera.current = camera

      // controller
      const controls = new OrbitControls(camera, renderer.domElement)
      controls.enableDamping = true
      controls.target.copy(target)

      const scene = new Scene()

      // Raycaster for hover cursor & direct click detection
      const raycaster = new Raycaster()
      const mouse = new Vector2()
      let isDragging = false
      let activeMesh: Mesh | null = null

      let downX = 0
      let downY = 0
      let downTime = 0
      let isResetting = false
      let resetProgress = 0
      const startPos = new Vector3()
      const startTarget = new Vector3()

      const updateMouseCoords = (e: PointerEvent) => {
        const rect = renderer.domElement.getBoundingClientRect()
        mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1
        mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1
      }

      const onPointerMove = (e: PointerEvent) => {
        if (isDragging || !activeMesh) return
        updateMouseCoords(e)
        raycaster.setFromCamera(mouse, camera)
        const intersects = raycaster.intersectObject(activeMesh)
        renderer.domElement.style.cursor =
          intersects.length > 0 ? 'pointer' : 'default'
      }

      const onPointerDown = (e: PointerEvent) => {
        if (e.button !== 0) return
        downX = e.clientX
        downY = e.clientY
        downTime = Date.now()
      }

      const onPointerUp = (e: PointerEvent) => {
        if (e.button !== 0) return
        const dist = Math.hypot(e.clientX - downX, e.clientY - downY)
        const timeDiff = Date.now() - downTime
        // Only trigger on a clean left-click after intro animation
        if (dist < 6 && timeDiff < 400 && frame > 100 && activeMesh) {
          updateMouseCoords(e)
          raycaster.setFromCamera(mouse, camera)
          const intersects = raycaster.intersectObject(activeMesh)
          if (intersects.length > 0) {
            isResetting = true
            resetProgress = 0
            startPos.copy(camera.position)
            startTarget.copy(controls.target)
          }
        }
      }

      const onControlsStart = () => {
        isDragging = true
        isResetting = false
        renderer.domElement.style.cursor = 'grabbing'
      }

      const onControlsEnd = () => {
        isDragging = false
        renderer.domElement.style.cursor = 'default'
      }

      controls.addEventListener('start', onControlsStart)
      controls.addEventListener('end', onControlsEnd)
      renderer.domElement.addEventListener('pointermove', onPointerMove)
      renderer.domElement.addEventListener('pointerdown', onPointerDown)
      renderer.domElement.addEventListener('pointerup', onPointerUp)

      // finish creating the Earth before animation
      let req = 0
      let frame = 0
      let active = true
      let disposeEarth: (() => void) | null = null
      createEarth(scene)
        .then(earthData => {
          if (!active) {
            earthData.dispose()
            return
          }
          const {
            earthMesh,
            lightsMesh,
            cloudsMesh,
            glowMesh,
            stars,
            dispose
          } = earthData
          activeMesh = earthMesh
          disposeEarth = dispose
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
            } else if (isResetting) {
              resetProgress += 0.007
              if (resetProgress >= 1) {
                resetProgress = 1
                isResetting = false
                camera.position.copy(initialCameraPosition)
                controls.target.copy(target)
                camera.lookAt(target)
                controls.update()
              } else {
                const t = easeInOutCubic(resetProgress)
                camera.position.lerpVectors(startPos, initialCameraPosition, t)
                controls.target.lerpVectors(startTarget, target, t)
                camera.lookAt(controls.target)
              }
            } else {
              controls.update()
            }
            renderer.render(scene, camera)
          }
          animate()
          setLoading(false)
        })
        .catch(err => {
          console.error('Failed to initialize Earth 3D:', err)
          setLoading(false)
        })

      return () => {
        cancelAnimationFrame(req)
        controls.removeEventListener('start', onControlsStart)
        controls.removeEventListener('end', onControlsEnd)
        controls.dispose()
        renderer.domElement.removeEventListener('pointermove', onPointerMove)
        renderer.domElement.removeEventListener('pointerdown', onPointerDown)
        renderer.domElement.removeEventListener('pointerup', onPointerUp)
        renderer.domElement.remove()
        renderer.dispose()
        active = false
        if (disposeEarth) disposeEarth()
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
