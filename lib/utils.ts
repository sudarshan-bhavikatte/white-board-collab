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