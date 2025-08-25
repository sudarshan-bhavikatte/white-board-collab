"use client"

import { useEffect, useRef, useCallback } from "react"

interface CanvasLoadingProps {
  width?: number
  height?: number
  className?: string
}

export default function CanvasLoading({ width = 400, height = 400, className = "" }: CanvasLoadingProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number | undefined>(undefined)

  const animate = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const centerX = width / 2
    const centerY = height / 2

    // Animation state
    const startTime = Date.now()

    const animateFrame = () => {
      const elapsed = (Date.now() - startTime) / 1000

      // Clear canvas
      ctx.clearRect(0, 0, width, height)

      // Calculate animation values
      const rotation = elapsed * 0.8
      const pulsePhase = elapsed * 2

      // Draw outer spinning ring
      ctx.strokeStyle = "#3b82f6"
      ctx.lineWidth = 4
      ctx.beginPath()
      ctx.arc(centerX, centerY, 80, rotation, rotation + Math.PI * 1.5)
      ctx.stroke()

      // Draw inner spinning ring (opposite direction)
      ctx.strokeStyle = "#8b5cf6"
      ctx.lineWidth = 3
      ctx.beginPath()
      ctx.arc(centerX, centerY, 50, -rotation * 1.5, -rotation * 1.5 + Math.PI)
      ctx.stroke()

      // Draw pulsing center circle
      const pulseRadius = 20 + Math.sin(pulsePhase) * 8
      const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, pulseRadius)
      gradient.addColorStop(0, "rgba(59, 130, 246, 0.8)")
      gradient.addColorStop(1, "rgba(59, 130, 246, 0.1)")

      ctx.fillStyle = gradient
      ctx.beginPath()
      ctx.arc(centerX, centerY, pulseRadius, 0, Math.PI * 2)
      ctx.fill()

      // Draw animated dots around the circle
      for (let i = 0; i < 8; i++) {
        const angle = (i / 8) * Math.PI * 2 + rotation * 0.5
        const dotX = centerX + Math.cos(angle) * 110
        const dotY = centerY + Math.sin(angle) * 110
        const dotSize = 4 + Math.sin(pulsePhase + i * 0.5) * 2

        ctx.fillStyle = `rgba(139, 92, 246, ${0.3 + Math.sin(pulsePhase + i * 0.3) * 0.4})`
        ctx.beginPath()
        ctx.arc(dotX, dotY, dotSize, 0, Math.PI * 2)
        ctx.fill()
      }

      // Draw loading text
      ctx.fillStyle = "#6b7280"
      ctx.font = "16px system-ui, -apple-system, sans-serif"
      ctx.textAlign = "center"
      ctx.fillText("Loading...", centerX, centerY + 160)

      // Draw animated progress dots
      const dots = Math.floor(elapsed % 4)
      ctx.fillStyle = "#9ca3af"
      ctx.font = "20px system-ui, -apple-system, sans-serif"
      ctx.fillText(".".repeat(dots + 1), centerX + 45, centerY + 160)

      animationRef.current = requestAnimationFrame(animateFrame)
    }

    animateFrame()
  }, [width, height])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size
    canvas.width = width
    canvas.height = height

    animate()

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [width, height, animate])

  return (
    <div className={`fixed inset-0 z-[99] bg-white dark:bg-black flex items-center justify-center ${className} `}>
      <canvas
        ref={canvasRef}
        className="max-w-full h-auto"
        style={{ width: `${width}px`, height: `${height}px` }}
        aria-label="Loading animation"
      />
    </div>
  )
}
