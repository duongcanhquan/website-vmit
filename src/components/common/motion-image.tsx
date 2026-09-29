"use client"

import Image, { type ImageProps } from "next/image"
import { motion, useReducedMotion } from "framer-motion"
import { canOptimizeImage } from "@/lib/media"
import { cn } from "@/lib/utils"

type MotionImageProps = Omit<ImageProps, "alt"> & {
  alt: string
  frameClassName?: string
  zoom?: number
}

export function MotionImage({
  className,
  frameClassName,
  zoom = 1.06,
  alt,
  ...props
}: MotionImageProps) {
  const reduce = useReducedMotion()

  return (
    <div className={cn("overflow-hidden", frameClassName)}>
      <motion.div
        className="h-full w-full"
        initial={reduce ? false : { scale: 1.04, opacity: 0.85 }}
        whileInView={reduce ? undefined : { scale: 1, opacity: 1 }}
        whileHover={reduce ? undefined : { scale: zoom }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      >
        <Image
          alt={alt}
          className={cn("object-cover", className)}
          unoptimized={typeof props.src === "string" && !canOptimizeImage(props.src)}
          {...props}
        />
      </motion.div>
    </div>
  )
}

export function FadeIn({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode
  className?: string
  delay?: number
}) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 18 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}
