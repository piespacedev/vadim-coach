import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/** Склеивает классы и разруливает конфликты Tailwind. Используется всеми ui-компонентами. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
