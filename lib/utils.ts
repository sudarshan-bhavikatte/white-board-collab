import { Camera, Color } from "@/types/canvas"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

const COLORS = [
  "#DC2626",
  "#F59E0B",
  "#14532D",
  "#7C3AED",
  "#EC4899",
  "#1D4ED8",
  "#EA580C",
  "#6B7280",
  "#FBBF24",
]
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function getRandomColor( connectionId:number) : string {
  return COLORS[connectionId % COLORS.length]
}

export function pointerEventToCanvasPoint(
  e : React.PointerEvent,
  camera : Camera
) {
  return {
    x:Math.round(e.clientX)- camera.x,
    y:Math.round(e.clientY)- camera.y
  }
}

export function colorToCss(color: Color) {
  return `#${color.r.toString(16).padStart(2, "0")}${color.g.toString(16).padStart(2, "0")}${color.b.toString(16).padStart(2, "0")}`
}