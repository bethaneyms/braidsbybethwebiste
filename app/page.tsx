"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { RevealAnimation } from "@/components/reveal-animation"
import { ArrowRight } from "lucide-react"
import { VideoPlayer } from "@/components/video-player"

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const services = [
    {
      title: "Knotless Braids",
      video: "knotless.mp4",
      prices: [
        { size: "Large", price: "$90" },
        { size: "Medium", price: "$140" },
        { size: "Small", price: "$160" },
      ],
    },
    {
      title: "Traditional Braids",
      video: "traditional.mp4",
      prices: [
        { size: "Large", price: "$100" },
        { size: "Medium", price: "$130" },
        { size: "Small", price: "$160" },
      ],
    },
    {
      title: "Boho Braids",
      video: "boho.mp4",
      prices: [
        { size: "Medium (w/ curly ends)", price: "$170" },
        { size: "Small (w/ curly ends)", price: "$185" },
      ],
    },
  ]

  return (
    <div>
      {/* Hero Section */}
      <section className="min-h-screen bg-black py-20">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Text Content */}
            <div
              className={`transition-all duration-1000 ${
                isLoaded ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-20"
              }`}
            >
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
                ELEVATE YOUR <span className="text-red">STYLE</span>
              </h1>
              <p className="text-xl text-white/90 mb-8">
                Professional braiding services that transform your look and boost your confidence
              </p>
              <div className="flex flex-wrap gap-4">
                <Button asChild className="bg-red hover:bg-red/80 text-white px-8 py-6 text-lg glow-on-hover">
                  <Link href="/booking">BOOK NOW</Link>
                </Button>
                <Button asChild variant="outline" className="border-red text-white hover:bg-red/10 px-8 py-6 text-lg">
                  <Link href="/services">
                    EXPLORE SERVICES
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </div>

            {/* Image with Enhanced Edge Blending */}
            <div
              className={`relative transition-all duration-1000 ${
                isLoaded ? "opacity-100 translate-x-0" : "opacity-0 translate-x-20"
              }`}
            >
              <div className="relative aspect-[3/4] w-full max-w-md mx-auto">
                {/* Base image */}
                <div className="absolute inset-0">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/6943C354-D305-420A-AC62-AD452A58EEF52024-12-08_11-28-21_410%20%282024-12-08T18_53_58.593%29.JPEG-ndTjnUeGtdEBmdslq3vKbJElHzty9u.jpeg"
                    alt="Braids by Beth"
                    fill
                    priority
                    className="object-cover object-[center_20%]"
                  />
                </div>

                {/* Enhanced edge blending effect */}
                <div className="absolute inset-0 edge-blend-left"></div>
                <div className="absolute inset-0 edge-blend-right"></div>
                <div className="absolute inset-0 edge-blend-top"></div>
                <div className="absolute inset-0 edge-blend-bottom"></div>
                <div className="absolute inset-0 edge-blend-corners"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Traditional Braids Video Showcase */}
      <section className="py-20 bg-black border-t border-b border-red/20">
        <div className="container">
          <RevealAnimation>
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-white mb-4">
                FEATURED <span className="text-red">STYLE</span>
              </h2>
              <p className="text-white/70 max-w-2xl mx-auto">
                Check out our stunning Traditional Braids - a classic style with a modern twist
              </p>
            </div>
          </RevealAnimation>

          <RevealAnimation delay={200}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="relative aspect-video rounded-lg overflow-hidden shadow-2xl shadow-red/20">
                <VideoPlayer
                  src="/videos/traditional.mp4"
                  poster="/placeholder.svg?height=600&width=600&text=Traditional"
                  className="w-full h-full"
                />
              </div>

              <div>
                <h3 className="text-3xl font-bold text-red mb-4">Traditional Braids</h3>
                <p className="text-white/80 mb-6">
                  Classic braiding technique with a secure hold. These braids start with the braiding hair from the root
                  for a bold, defined look that lasts. Perfect for those who want a timeless style with maximum
                  durability.
                </p>

                <div className="space-y-3 mb-8">
                  <h4 className="text-xl font-semibold text-white">Pricing</h4>
                  <div className="flex justify-between border-b border-red/10 pb-2">
                    <span className="text-white">Large</span>
                    <span className="text-red font-semibold">$100</span>
                  </div>
                  <div className="flex justify-between border-b border-red/10 pb-2">
                    <span className="text-white">Medium</span>
                    <span className="text-red font-semibold">$130</span>
                  </div>
                  <div className="flex justify-between border-b border-red/10 pb-2">
                    <span className="text-white">Small</span>
                    <span className="text-red font-semibold">$160</span>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button asChild className="bg-red hover:bg-red/80 text-white glow-on-hover">
                    <Link href="/booking">BOOK THIS STYLE</Link>
                  </Button>
                  <Button asChild variant="outline" className="border-red text-white hover:bg-red/10">
                    <Link href="/services">VIEW ALL STYLES</Link>
                  </Button>
                </div>
              </div>
            </div>
          </RevealAnimation>
        </div>
      </section>

      {/* Featured Services */}
      <section className="py-20 bg-black">
        <div className="container">
          <RevealAnimation>
            <h2 className="text-3xl font-bold text-white text-center mb-4">
              OTHER <span className="text-red">SERVICES</span>
            </h2>
            <p className="text-white/70 text-center max-w-2xl mx-auto mb-16">
              Explore our most popular braiding styles, each designed to give you a stunning, long-lasting look
            </p>
          </RevealAnimation>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services
              .filter((service) => service.title !== "Traditional Braids")
              .map((service, index) => (
                <RevealAnimation key={index} delay={index * 200}>
                  <div className="service-card">
                    <div className="service-image-container mb-4 h-[200px] relative">
                      {service.video ? (
                        <VideoPlayer src={service.video} poster={service.image} className="w-full h-full" />
                      ) : (
                        <Image
                          src={service.image || "/placeholder.svg"}
                          alt={service.title}
                          fill
                          className="object-cover rounded-lg"
                        />
                      )}
                    </div>

                    <h3 className="service-title mb-2">{service.title}</h3>

                    <div className="price space-y-2">
                      {service.prices.map((price, idx) => (
                        <div key={idx} className="flex justify-between">
                          <span>{price.size}</span>
                          <span className="font-semibold text-red">{price.price}</span>
                        </div>
                      ))}

                      <Button asChild className="w-full mt-4 bg-red hover:bg-red/80 glow-on-hover">
                        <Link href="/booking">BOOK NOW</Link>
                      </Button>
                    </div>
                  </div>
                </RevealAnimation>
              ))}

            <RevealAnimation delay={400}>
              <div className="service-card flex flex-col justify-center items-center text-center p-8">
                <div className="mb-4 rounded-full bg-red/10 p-6">
                  <ArrowRight className="h-12 w-12 text-red" />
                </div>
                <h3 className="service-title mb-4">Explore More Styles</h3>
                <p className="text-white/70 mb-6">Discover our full range of professional braiding services</p>
                <Button asChild className="bg-red hover:bg-red/80 text-white glow-on-hover">
                  <Link href="/services">VIEW ALL SERVICES</Link>
                </Button>
              </div>
            </RevealAnimation>
          </div>
        </div>
      </section>

      {/* Client Experience */}
      <section className="py-20 animated-gradient">
        <div className="container">
          <RevealAnimation>
            <h2 className="text-3xl font-bold text-white text-center mb-16">
              THE <span className="text-red">CLIENT</span> EXPERIENCE
            </h2>
          </RevealAnimation>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Consultation",
                description:
                  "We'll discuss your desired style, hair type, and any concerns to create the perfect look for you.",
                icon: "💬",
              },
              {
                title: "Preparation",
                description:
                  "Come with clean, detangled hair or take advantage of our preparation services for the best results.",
                icon: "✨",
              },
              {
                title: "Styling",
                description: "Relax as your hair is transformed with expert technique and attention to detail.",
                icon: "💇‍♀️",
              },
            ].map((step, index) => (
              <RevealAnimation key={index} delay={index * 200}>
                <div className="bg-black p-8 rounded-lg border border-red/30 hover:border-red transition-all duration-300 h-full">
                  <div className="text-4xl mb-4">{step.icon}</div>
                  <h3 className="text-xl font-bold text-red mb-4">{step.title}</h3>
                  <p className="text-white/70">{step.description}</p>
                </div>
              </RevealAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* Booking CTA */}
      <section className="py-20 bg-red">
        <div className="container text-center">
          <RevealAnimation>
            <h2 className="text-3xl font-bold text-white mb-6">READY TO BOOK?</h2>
            <p className="text-white/90 mb-8 max-w-2xl mx-auto">
              Schedule your appointment today and transform your look with professional braiding services.
            </p>
            <Button asChild className="bg-black hover:bg-black/80 text-white px-8 py-6 text-lg">
              <Link href="/booking">BOOK NOW</Link>
            </Button>
          </RevealAnimation>
        </div>
      </section>
    </div>
  )
}
