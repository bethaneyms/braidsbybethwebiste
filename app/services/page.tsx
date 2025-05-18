"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { RevealAnimation } from "@/components/reveal-animation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { VideoPlayer } from "@/components/video-player"

export default function ServicesPage() {
  const services = [
    {
      id: "knotless",
      title: "Knotless Braids",
      description:
        "Gentle on the scalp with a natural-looking finish. These braids start with your natural hair and gradually incorporate the braiding hair for a seamless, comfortable result.",
      image: "/placeholder.svg?height=600&width=600&text=Knotless",
      video: null,
      prices: [
        { size: "Large", price: "$90" },
        { size: "Medium", price: "$140" },
        { size: "Small", price: "$160" },
      ],
    },
    {
      id: "traditional",
      title: "Traditional Braids",
      description:
        "Classic braiding technique with a secure hold. These braids start with the braiding hair from the root for a bold, defined look that lasts.",
      image: "/placeholder.svg?height=600&width=600&text=Traditional",
      video: "/videos/traditional.mp4",
      prices: [
        { size: "Large", price: "$100" },
        { size: "Medium", price: "$130" },
        { size: "Small", price: "$160" },
      ],
    },
    {
      id: "boho",
      title: "Boho Braids",
      description:
        "Braids with curly ends for a bohemian look. This style combines the durability of braids with the softness of curly ends for a romantic, free-spirited aesthetic.",
      image: "/placeholder.svg?height=600&width=600&text=Boho",
      video: null,
      prices: [
        { size: "Medium (w/ curly ends)", price: "$170" },
        { size: "Small (w/ curly ends)", price: "$185" },
      ],
    },
    {
      id: "senegalese",
      title: "Senegalese Twists",
      description:
        "Classic, elegant twists for a timeless look. These rope-like twists are created by wrapping two strands around each other for a polished, sophisticated style.",
      image: "/placeholder.svg?height=600&width=600&text=Senegalese",
      video: null,
      prices: [
        { size: "Large", price: "$80" },
        { size: "Medium", price: "$120" },
        { size: "Small", price: "$140" },
      ],
    },
    {
      id: "passion",
      title: "Passion Twists",
      description:
        "Bohemian-inspired style with a soft, romantic feel. These twists have a more textured, unstructured look compared to Senegalese twists for a modern, relaxed vibe.",
      image: "/placeholder.svg?height=600&width=600&text=Passion",
      video: null,
      prices: [
        { size: "Large", price: "$80" },
        { size: "Medium", price: "$120" },
        { size: "Small", price: "$140" },
      ],
    },
    {
      id: "natural",
      title: "Natural Services",
      description:
        "Styles that enhance your natural hair texture. From two-strand twists to basic parting services, these options are perfect for those looking to style their natural hair.",
      image: "/placeholder.svg?height=600&width=600&text=Natural",
      video: null,
      prices: [
        { size: "Two-Strand Twists (natural hair)", price: "$60" },
        { size: "Parting Only", price: "$30" },
      ],
    },
  ]

  return (
    <div>
      {/* Hero Section */}
      <section className="py-20 bg-black">
        <div className="container text-center">
          <RevealAnimation>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              OUR <span className="text-red">SERVICES</span>
            </h1>
            <p className="text-white/70 max-w-2xl mx-auto">
              Explore our range of professional braiding services, each designed to give you a stunning, long-lasting
              style.
            </p>
          </RevealAnimation>
        </div>
      </section>

      {/* Services Tabs */}
      <section className="py-10 bg-black">
        <div className="container">
          <RevealAnimation>
            <Tabs defaultValue="all" className="w-full">
              <div className="flex justify-center mb-12 overflow-x-auto">
                <TabsList className="bg-card border border-red/30">
                  <TabsTrigger value="all" className="data-[state=active]:bg-red data-[state=active]:text-white">
                    All Styles
                  </TabsTrigger>
                  {services.map((service) => (
                    <TabsTrigger
                      key={service.id}
                      value={service.id}
                      className="data-[state=active]:bg-red data-[state=active]:text-white"
                    >
                      {service.title}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>

              <TabsContent value="all" className="mt-0">
                <div className="space-y-20">
                  {services.map((service, index) => (
                    <RevealAnimation key={service.id} delay={index * 200}>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <div className="service-image-container relative aspect-square rounded-lg overflow-hidden">
                          {service.video ? (
                            <VideoPlayer src={service.video} poster={service.image} className="w-full h-full" />
                          ) : (
                            <Image
                              src={service.image || "/placeholder.svg"}
                              alt={service.title}
                              fill
                              className="object-cover"
                            />
                          )}
                        </div>

                        <div className="bg-card p-8 rounded-lg border border-red/30">
                          <h2 className="text-3xl font-bold text-red mb-4">{service.title}</h2>
                          <p className="text-white/70 mb-6">{service.description}</p>

                          <div className="space-y-3 mb-8">
                            <h3 className="text-xl font-semibold text-white">Pricing</h3>
                            {service.prices.map((price, idx) => (
                              <div key={idx} className="flex justify-between border-b border-red/10 pb-2">
                                <span className="text-white">{price.size}</span>
                                <span className="text-red font-semibold">{price.price}</span>
                              </div>
                            ))}
                          </div>

                          <Button asChild className="bg-red hover:bg-red/80 text-white glow-on-hover">
                            <Link href="/booking">BOOK THIS STYLE</Link>
                          </Button>
                        </div>
                      </div>
                    </RevealAnimation>
                  ))}
                </div>
              </TabsContent>

              {services.map((service) => (
                <TabsContent key={service.id} value={service.id} className="mt-0">
                  <RevealAnimation>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                      <div className="service-image-container relative aspect-square rounded-lg overflow-hidden">
                        {service.video ? (
                          <VideoPlayer src={service.video} poster={service.image} className="w-full h-full" />
                        ) : (
                          <Image
                            src={service.image || "/placeholder.svg"}
                            alt={service.title}
                            fill
                            className="object-cover"
                          />
                        )}
                      </div>

                      <div className="bg-card p-8 rounded-lg border border-red/30">
                        <h2 className="text-3xl font-bold text-red mb-4">{service.title}</h2>
                        <p className="text-white/70 mb-6">{service.description}</p>

                        <div className="space-y-3 mb-8">
                          <h3 className="text-xl font-semibold text-white">Pricing</h3>
                          {service.prices.map((price, idx) => (
                            <div key={idx} className="flex justify-between border-b border-red/10 pb-2">
                              <span className="text-white">{price.size}</span>
                              <span className="text-red font-semibold">{price.price}</span>
                            </div>
                          ))}
                        </div>

                        <Button asChild className="bg-red hover:bg-red/80 text-white glow-on-hover">
                          <Link href="/booking">BOOK THIS STYLE</Link>
                        </Button>
                      </div>
                    </div>
                  </RevealAnimation>
                </TabsContent>
              ))}
            </Tabs>
          </RevealAnimation>
        </div>
      </section>

      {/* Policies Section */}
      <section className="py-20 animated-gradient">
        <div className="container">
          <RevealAnimation>
            <h2 className="text-3xl font-bold text-white text-center mb-12">
              POLICIES & <span className="text-black">GUIDELINES</span>
            </h2>
          </RevealAnimation>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <RevealAnimation delay={200}>
              <div className="bg-black p-8 rounded-lg border border-red/30">
                <h3 className="text-xl font-bold text-red mb-4">Disclaimer & Client Agreement</h3>
                <p className="text-white/70 mb-6">
                  By booking, the client acknowledges that I am not a licensed hairstylist. Upon booking, you agree to
                  receive services at your own risk and understand that I am not liable for any allergic reactions or
                  issues caused by products used during your appointment.
                </p>

                <h3 className="text-xl font-bold text-red mb-4">Appointment Requests & Hair Drop-Off</h3>
                <p className="text-white/70 mb-6">
                  Appointments must be requested at least 5 days in advance by texting me directly. Please plan to have
                  the whole day free! Hair must be dropped off at least 1 day before your appointment so I can prep your
                  style in advance.
                </p>
              </div>
            </RevealAnimation>

            <RevealAnimation delay={400}>
              <div className="bg-black p-8 rounded-lg border border-red/30">
                <h3 className="text-xl font-bold text-red mb-4">Deposits & Payments</h3>
                <p className="text-white/70 mb-6">
                  A $15 deposit is required to secure your appointment. Your spot is not confirmed until the deposit is
                  received. The remaining balance is due immediately after the service is completed.
                </p>

                <h3 className="text-xl font-bold text-red mb-4">Cancellations & Refunds</h3>
                <p className="text-white/70 mb-6">
                  24-hour notice is required to receive a full deposit refund. Same-day cancellations or no-shows will
                  result in a non-refundable deposit, which goes toward the time spent prepping the hair in advance.
                </p>

                <h3 className="text-xl font-bold text-red mb-4">How to Prepare</h3>
                <ul className="text-white/70 space-y-2 list-disc pl-5">
                  <li>Hair must be clean and free of heavy product buildup</li>
                  <li>Detangle thoroughly from root to tip before coming</li>
                  <li>Arrive with blow-dried hair if possible</li>
                  <li>Be on time to respect both your time and mine</li>
                </ul>
              </div>
            </RevealAnimation>
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
