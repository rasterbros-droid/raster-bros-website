import { useRef, useEffect } from 'react'
import {
  Renderer,
  Camera,
  Transform,
  Plane,
  Program,
  Mesh,
  Texture,
} from 'ogl'

const vertexShader = `
precision highp float;

attribute vec3 position;
attribute vec2 uv;

uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;

varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`

const fragmentShader = `
precision highp float;

uniform sampler2D tMap;

varying vec2 vUv;

void main() {
  gl_FragColor = texture2D(tMap, vUv);
}
`

function lerp(p1: number, p2: number, t: number) {
  return p1 + (p2 - p1) * t
}

class Media {
  gl: any
  scene: any
  geometry: any
  image: string
  viewport: any
  screen: any
  plane: any
  program: any
  extra = 0
  y = 0
  index: number
  length: number

  constructor({
    gl,
    scene,
    geometry,
    image,
    viewport,
    screen,
    index,
    length,
  }: any) {
    this.gl = gl
    this.scene = scene
    this.geometry = geometry
    this.image = image
    this.viewport = viewport
    this.screen = screen
    this.index = index
    this.length = length

    this.createShader()
    this.createMesh()
    this.onResize()
  }

  createShader() {
    const texture = new Texture(this.gl, {
      // Prevent NPOT texture issues on WebGL1, which can render images blank.
      generateMipmaps: false,
      minFilter: this.gl.LINEAR,
      magFilter: this.gl.LINEAR,
      wrapS: this.gl.CLAMP_TO_EDGE,
      wrapT: this.gl.CLAMP_TO_EDGE,
    })

    this.program = new Program(this.gl, {
      vertex: vertexShader,
      fragment: fragmentShader,
      uniforms: {
        tMap: { value: texture },
      },
    })

    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.src = this.image

    img.onload = () => {
      texture.image = img
    }
    img.onerror = () => {
      console.warn('[FlyingPosters] Failed to load image:', this.image)
    }
  }

  createMesh() {
    this.plane = new Mesh(this.gl, {
      geometry: this.geometry,
      program: this.program,
    })

    this.plane.setParent(this.scene)
  }

  onResize() {
    this.plane.scale.x = 2
    this.plane.scale.y = 2

    this.y = this.index * -2.5
  }

  update(scroll: any) {
    this.plane.position.y = this.y - scroll.current
  }
}

class Canvas {
  container: HTMLElement
  canvas: HTMLCanvasElement
  items: string[]
  renderer: any
  gl: any
  camera: any
  scene: any
  geometry: any
  medias: any[] = []

  scroll = {
    current: 0,
    target: 0,
    ease: 0.05,
  }

  constructor({
    container,
    canvas,
    items,
  }: any) {
    this.container = container
    this.canvas = canvas
    this.items = items

    this.createRenderer()
    this.createCamera()
    this.createScene()
    this.createGeometry()
    this.createMedias()
    this.onResize()
    this.update()

    window.addEventListener('resize', this.onResize)
    window.addEventListener('wheel', this.onWheel)
  }

  createRenderer() {
    this.renderer = new Renderer({
      canvas: this.canvas,
      antialias: true,
      alpha: true,
    })

    this.gl = this.renderer.gl
  }

  createCamera() {
    this.camera = new Camera(this.gl)
    this.camera.position.z = 5
  }

  createScene() {
    this.scene = new Transform()
  }

  createGeometry() {
    this.geometry = new Plane(this.gl)
  }

  createMedias() {
    this.medias = this.items.map(
      (item, index) =>
        new Media({
          gl: this.gl,
          scene: this.scene,
          geometry: this.geometry,
          image: item,
          viewport: {},
          screen: {},
          index,
          length: this.items.length,
        })
    )
  }

  onResize = () => {
    const width = this.container.offsetWidth
    const height = this.container.offsetHeight

    this.renderer.setSize(width, height)

    this.camera.perspective({
      aspect: width / height,
    })
  }

  onWheel = (e: WheelEvent) => {
    this.scroll.target += e.deltaY * 0.002
  }

  update = () => {
    this.scroll.current = lerp(
      this.scroll.current,
      this.scroll.target,
      this.scroll.ease
    )

    this.medias.forEach((media) => media.update(this.scroll))

    this.renderer.render({
      scene: this.scene,
      camera: this.camera,
    })

    requestAnimationFrame(this.update)
  }

  destroy() {
    window.removeEventListener('resize', this.onResize)
    window.removeEventListener('wheel', this.onWheel)
  }
}

interface Props {
  items: string[]
}

export default function FlyingPosters({ items }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!containerRef.current || !canvasRef.current) return

    const instance = new Canvas({
      container: containerRef.current,
      canvas: canvasRef.current,
      items,
    })

    return () => {
      instance.destroy()
    }
  }, [items])

  return (
    <div
      ref={containerRef}
      className="w-full h-full overflow-hidden relative"
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full block"
      />
    </div>
  )
}
