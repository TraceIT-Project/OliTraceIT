import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/** Número en formato es-ES: 1.234,56 */
export function formatNumber(num: number): string {
  return new Intl.NumberFormat('es-ES').format(num)
}

/** Fecha en formato es-ES: 25/02/2026 */
export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })
}
