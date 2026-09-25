import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/** Format number in Spanish locale: 1.234,56 */
export function formatNumber(num: number): string {
  return new Intl.NumberFormat('es-ES').format(num)
}

/** Format currency in Spanish: 5.400,00 € */
export function formatCurrency(num: number): string {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(num)
}

/** Format date in Spanish: 25/02/2026 */
export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })
}

/** Format percent: 21,8% */
export function formatPercent(num: number): string {
  return `${num.toFixed(1).replace('.', ',')}%`
}

/** Format kg in Spanish locale: 4.200 kg */
export function formatKg(num: number): string {
  return `${formatNumber(num)} kg`
}

/** Format number for chart tooltip in Spanish */
export function formatChartValue(v: number, suffix = ''): string {
  return `${formatNumber(v)}${suffix ? ' ' + suffix : ''}`
}
