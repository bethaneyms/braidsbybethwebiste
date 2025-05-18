import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Heart, Star, Users, Award } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 bg-primary text-primary-foreground">
        <div className="container">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">About Styles by B.</h1>
            <p className="text-lg text-primary-foreground/90 mb-6">
              Meet Bethaney Mallory-Smothers, the creative stylist behind Styles by B.
            </p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative aspect-square rounded-lg overflow-hidden">
              <Image
                src="/placeholder.svg?height=800&width=800&text=Bethaney"
                alt="Bethaney Mallory-Smothers"
                fill
                className="object-cover"
              />
            </div>

            <div>
              <h2 className="text-3xl font-bold mb-6">The Stylist</h2>
              <div className="space-y-4 text-lg">
                <p>
                  Hello! I'm Bethaney Mallory-Smothers, a passionate hair stylist specializing in braids, twists, and
                  natural hair styles in the Nashville area.
                </p>
                <p>
                  My journey in hair styling began with a deep appreciation for the artistry and cultural significance
                  of braiding. What started as a creative outlet has blossomed into a thriving business where I help
                  clients express themselves through beautiful, healthy hairstyles.
                </p>
                <p>
                  At Styles by B., I believe that every client deserves personalized attention and a style that not only
                  looks amazing but also promotes hair health. I take pride in creating looks that enhance your natural
                  beauty while protecting your hair.
                </p>
                <p>
                  When I'm not styling hair, I enjoy photography and visual arts, which influence my creative approach
                  to hair design.
                </p>
              </div>

              <div className="mt-8">
                <Button asChild className="bg-accent hover:bg-accent/90">
                  <Link href="/booking">Book with Bethaney</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-16 bg-muted">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Philosophy</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              The core values that guide everything we do at Styles by B.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Heart className="h-10 w-10 text-primary" />,
                title: "Passion",
                description: "Every style is created with love and dedication to the craft.",
              },
              {
                icon: <Star className="h-10 w-10 text-secondary" />,
                title: "Quality",
                description: "No compromises when it comes to the quality of our work.",
              },
              {
                icon: <Users className="h-10 w-10 text-accent" />,
                title: "Connection",
                description: "Building relationships with clients is at the heart of our business.",
              },
              {
                icon: <Award className="h-10 w-10 text-earth-green" />,
                title: "Excellence",
                description: "Continuously improving our techniques and service.",
              },
            ].map((value, index) => (
              <Card key={index} className="text-center border-none shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex justify-center mb-4">{value.icon}</div>
                  <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Client Testimonials</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Hear what our clients have to say about their experience with Styles by B.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                quote:
                  "Bethaney is amazing! My knotless braids were perfect and lasted so long. She's my go-to stylist now.",
                name: "Jasmine K.",
                service: "Knotless Braids",
              },
              {
                quote:
                  "I love how my passion twists turned out. Bethaney took her time and made sure everything was just right.",
                name: "Taylor M.",
                service: "Passion Twists",
              },
              {
                quote:
                  "The best braider in Nashville! Professional, talented, and makes you feel comfortable throughout the process.",
                name: "Michelle D.",
                service: "Traditional Braids",
              },
            ].map((testimonial, index) => (
              <Card key={index} className="border-none shadow-md">
                <CardContent className="p-6">
                  <div className="flex justify-center mb-4">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-secondary text-secondary" />
                      ))}
                    </div>
                  </div>
                  <blockquote className="text-center mb-4 italic">"{testimonial.quote}"</blockquote>
                  <div className="text-center">
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.service}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-accent text-accent-foreground">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Ready for Your Next Style?</h2>
            <p className="text-accent-foreground/90 text-lg mb-8">
              Book your appointment with Styles by B. and experience the difference.
            </p>
            <Button asChild size="lg" className="bg-white text-accent hover:bg-white/90">
              <Link href="/booking">Book Now</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
