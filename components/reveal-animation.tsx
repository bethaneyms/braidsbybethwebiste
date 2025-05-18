"use client"

import type React from "react"

import { useRef, useEffect, useState } from "react"

interface RevealAnimationProps {
  children: React.ReactNode
  delay?: number
}

export function RevealAnimation({ children, delay = 0 }: RevealAnimationProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true)
          }, delay)
          observer.unobserve(entry.target)
        }
      },
      {
        threshold: 0.1,
      },
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [delay])

  return (
    <div ref={ref} className={`reveal-animation ${isVisible ? "revealed" : ""}`}>
      {children}
    </div>
  )
}
