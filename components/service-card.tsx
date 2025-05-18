"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { VideoPlayer } from "@/components/video-player"

interface ServiceCardProps {
  title: string
  image: string
  video?: string | null
  prices: { size: string; price: string }[]
}

export function ServiceCard({ title, image, video, prices }: ServiceCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div className="service-card" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      <div className="service-image-container mb-4 h-[200px] relative">
        {video ? (
          <VideoPlayer src={video} poster={image} className="w-full h-full" />
        ) : (
          <Image src={image || "/placeholder.svg"} alt={title} fill className="object-cover rounded-lg" />
        )}
      </div>

      <h3 className="service-title mb-2">{title}</h3>

      <div className={`price space-y-2 ${isHovered ? "block" : "hidden"}`}>
        {prices.map((price, index) => (
          <div key={index} className="flex justify-between">
            <span>{price.size}</span>
            <span className="font-semibold text-red">{price.price}</span>
          </div>
        ))}

        <Button asChild className="w-full mt-4 bg-red hover:bg-red/80 glow-on-hover">
          <Link href="/booking">BOOK NOW</Link>
        </Button>
      </div>
    </div>
  )
}
