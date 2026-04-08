"use client"

import * as React from "react"
import { m, Variants } from "framer-motion"
import { cn } from "@/lib/utils"

interface AnimatedTextProps extends React.HTMLAttributes<HTMLDivElement> {
  text: string
  duration?: number
  delay?: number
  replay?: boolean
  inView?: boolean
  className?: string
  textClassName?: string
  textStyle?: React.CSSProperties
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span"
}

const AnimatedText = React.forwardRef<HTMLDivElement, AnimatedTextProps>(
  (
    {
      text,
      duration = 0.05,
      delay = 0.1,
      replay = true,
      className,
      textClassName,
      textStyle,
      as: Component = "span",
      ...props
    },
    ref
  ) => {
    const letters = Array.from(text)

    const container: Variants = {
      hidden: { opacity: 0 },
      visible: (i: number = 1) => ({
        opacity: 1,
        transition: {
          staggerChildren: duration * 1.5,
          delayChildren: i * delay
        }
      })
    }

    const child: Variants = {
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          type: "tween",
          ease: [0.16, 1, 0.3, 1],
          duration: 0.6
        }
      },
      hidden: {
        opacity: 0,
        y: 40
      }
    }

    return (
      <div
        ref={ref}
        className={cn("flex items-center justify-center", className)}
        {...props}
      >
        <m.div
          style={{ display: "flex", overflow: "hidden", fontFamily: "var(--font-inter), system-ui, sans-serif", ...textStyle }}
          variants={container}
          initial="hidden"
          {...(typeof (props as any).inView === 'boolean'
            ? { animate: (props as any).inView ? 'visible' : 'hidden' }
            : { whileInView: replay ? 'visible' : 'hidden', viewport: { once: true, margin: '-100px' } })}
          className={cn("font-semibold", textClassName)}
        >
          {letters.map((letter, index) => (
            <m.span 
              key={index} 
              variants={child}
              style={{ willChange: "transform, opacity", display: "inline-block" }}
            >
              {letter === " " ? "\u00A0" : letter}
            </m.span>
          ))}
        </m.div>
      </div>
    )
  }
)

AnimatedText.displayName = "AnimatedText"

export { AnimatedText }
