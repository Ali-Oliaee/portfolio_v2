"use client"

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type Ref,
} from "react"
import "@google/model-viewer"

// Type declaration for model-viewer custom element
declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "model-viewer": {
        src?: string
        "ios-src"?: string
        alt?: string
        "camera-controls"?: boolean | string
        "disable-zoom"?: boolean | string
        "interpolation-decay"?: string | number
        "camera-orbit"?: string
        "min-camera-orbit"?: string
        "max-camera-orbit"?: string
        exposure?: string | number
        "shadow-intensity"?: string | number
        "field-of-view"?: string
        style?: CSSProperties
        className?: string
        ref?: Ref<HTMLElement>
      }
    }
  }
}

export default function Model3D() {
  const modelViewerRef = useRef<any>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [cameraOrbit, setCameraOrbit] = useState("0deg 75deg 5m")

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (!containerRef.current) return

      const rect = containerRef.current.getBoundingClientRect()
      const x = event.clientX - rect.left
      const y = event.clientY - rect.top

      // Calculate relative position (-1 to 1)
      const relX = (x / rect.width) * 2 - 1
      const relY = (y / rect.height) * 2 - 1

      // Map to camera angles (yaw and pitch)
      const yaw = relX * 30 // -30 to 30 degrees horizontally
      const pitch = 75 + relY * -15 // 60 to 90 degrees vertically

      setCameraOrbit(`${-yaw}deg ${pitch}deg 6m`)
    }

    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="h-[300px] w-[300px] md:h-[350px] md:w-[350px]"
    >
      <model-viewer
        ref={modelViewerRef}
        src="/models/normal_human_face.glb"
        ios-src="/models/Normal_Human_Face.usdz"
        alt="3D Human Face Model"
        camera-controls
        disable-zoom
        interpolation-decay="200"
        style={{
          width: "100%",
          height: "100%",
          background: "transparent",
        }}
        camera-orbit={cameraOrbit}
        min-camera-orbit="auto 60deg 6m"
        max-camera-orbit="auto 90deg 6m"
        exposure="1.2"
        shadow-intensity="1"
        field-of-view="30deg"
      />
    </div>
  )
}
