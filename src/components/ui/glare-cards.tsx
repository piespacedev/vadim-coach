'use client'

import React, { useRef, useState } from 'react'
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from 'framer-motion'
import { cn } from '@/lib/utils'

// Обработчики анимации и драга у DOM и у framer-motion называются одинаково,
// но принимают разные аргументы — исключаем их из наследуемых пропсов.
type DivPropsWithoutMotionConflicts = Omit<
  React.HTMLAttributes<HTMLDivElement>,
  | 'onAnimationStart'
  | 'onAnimationEnd'
  | 'onAnimationIteration'
  | 'onDrag'
  | 'onDragStart'
  | 'onDragEnd'
  | 'onTransitionEnd'
>

export interface GlareCardProps extends DivPropsWithoutMotionConflicts {
  children: React.ReactNode
  glareColor?: string
  tiltIntensity?: number
}

const GlareCard = React.forwardRef<HTMLDivElement, GlareCardProps>(
  (
    {
      children,
      className,
      glareColor = 'rgba(255,255,255,0.2)',
      tiltIntensity = 15, // Reduced default for subtler feel
      ...props
    },
    ref,
  ) => {
    const internalRef = useRef<HTMLDivElement | null>(null)
    const prefersReducedMotion = useReducedMotion()
    const [isHovered, setIsHovered] = useState(false)

    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)

    // Ultra-smooth spring config for that "expensive" feel
    const springConfig = { damping: 25, stiffness: 150, mass: 0.6 }
    const springX = useSpring(mouseX, springConfig)
    const springY = useSpring(mouseY, springConfig)

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      if (!internalRef.current || prefersReducedMotion) return

      const rect = internalRef.current.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

      const normalizedX = (e.clientX - centerX) / (rect.width / 2)
      const normalizedY = (e.clientY - centerY) / (rect.height / 2)

      mouseX.set(normalizedX)
      mouseY.set(normalizedY)
    }

    const handleMouseEnter = () => setIsHovered(true)
    const handleMouseLeave = () => {
      setIsHovered(false)
      mouseX.set(0)
      mouseY.set(0)
    }

    // ВАЖНО: значения строятся через useTransform, а не через springX.get().
    // .get() читает число один раз на рендере — пружина живёт вне React,
    // и карточка бы просто не двигалась.

    // 1. Perspective Tilt
    const rotateX = useTransform(springY, (v) => v * -tiltIntensity)
    const rotateY = useTransform(springX, (v) => v * tiltIntensity)

    // 2. The Interactive Glare (Moves with mouse)
    const glareX = useTransform(springX, (v) => `${50 + v * 100}%`)
    const glareY = useTransform(springY, (v) => `${50 + v * 100}%`)
    const backgroundGlare = useMotionTemplate`radial-gradient(
      circle at ${glareX} ${glareY},
      ${glareColor} 0%,
      transparent 80%
    )`

    // 3. Dynamic Border Highlight (Simulates light hitting the edge)
    const beamX = useTransform(springX, (v) => `${50 + v * 50}%`)
    const beamY = useTransform(springY, (v) => `${50 + v * 50}%`)
    const borderHighlight = useMotionTemplate`conic-gradient(
      from 0deg at ${beamX} ${beamY},
      transparent,
      ${glareColor},
      transparent
    )`

    // 4. Shimmer offset (moves opposite to tilt)
    const shimmerX = useTransform(springX, (v) => `${v * -20}%`)

    return (
      <motion.div
        ref={(node) => {
          internalRef.current = node
          if (typeof ref === 'function') ref(node)
          else if (ref) ref.current = node
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX: prefersReducedMotion ? 0 : rotateX,
          rotateY: prefersReducedMotion ? 0 : rotateY,
          transformStyle: 'preserve-3d',
          // transformPerspective, а не perspective: CSS-свойство perspective
          // действует на детей, а наклоняется сам этот элемент.
          transformPerspective: 1000,
        }}
        className={cn(
          'relative group isolate overflow-hidden rounded-[2rem] border border-white/10 bg-zinc-900/50 backdrop-blur-xl p-8 transition-all duration-500',
          'hover:border-white/20 hover:shadow-[0_0_50px_-12px_rgba(0,0,0,0.8)]',
          className,
        )}
        {...props}
      >
        {/* Layer 1: The Sharp Light Streak (Border Beam) */}
        <motion.div
          className="pointer-events-none absolute inset-[-1px] z-30 rounded-[inherit] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background: borderHighlight,
            // Кольцо из градиента: вычитаем content-box из padding-box.
            WebkitMaskImage:
              'linear-gradient(#fff, #fff) content-box, linear-gradient(#fff, #fff)',
            maskImage: 'linear-gradient(#fff, #fff) content-box, linear-gradient(#fff, #fff)',
            WebkitMaskComposite: 'xor',
            maskComposite: 'exclude',
            padding: '1px',
          }}
        />

        {/* Layer 2: Main Radial Glare */}
        <motion.div
          className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100 mix-blend-soft-light"
          style={{ background: backgroundGlare }}
        />

        {/* Layer 3: Subtle Reflective Shimmer (Moves opposite to tilt) */}
        <motion.div
          className="pointer-events-none absolute inset-[-50%] z-0 rotate-[15deg] opacity-0 transition-opacity duration-1000 group-hover:opacity-10"
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
            x: shimmerX,
          }}
        />

        {/* Content Container (Lifted in 3D Space) */}
        <div
          className="relative z-40 h-full w-full"
          style={{
            transform: prefersReducedMotion ? 'none' : 'translateZ(50px)',
            filter: isHovered ? 'drop-shadow(0 20px 30px rgba(0,0,0,0.5))' : 'none',
            transition: 'filter 0.5s ease',
          }}
        >
          {children}
        </div>
      </motion.div>
    )
  },
)

GlareCard.displayName = 'GlareCard'

export { GlareCard }
