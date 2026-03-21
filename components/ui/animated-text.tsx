"use client"

import * as React from "react"
import { motion, Variants } from "framer-motion"
import { cn } from "@/lib/utils"

interface AnimatedTextProps extends React.HTMLAttributes<HTMLDivElement> {
  text: string
  duration?: number
  delay?: number
  replay?: boolean
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
          type: "spring",
          damping: 15,
          stiffness: 150
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
        <motion.div
          style={{ display: "flex", overflow: "hidden", ...textStyle }}
          variants={container}
          initial="hidden"
          whileInView={replay ? "visible" : "hidden"}
          viewport={{ once: true, margin: "-100px" }}
          className={cn("font-semibold", textClassName)}
        >
          {letters.map((letter, index) => (
            <motion.span key={index} variants={child}>
              {letter === " " ? "\u00A0" : letter}
            </motion.span>
          ))}
        </motion.div>
      </div>
    )
  }
)

AnimatedText.displayName = "AnimatedText"

export { AnimatedText }
