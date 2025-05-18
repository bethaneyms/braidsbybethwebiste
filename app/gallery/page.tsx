import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function GalleryPage() {
  const categories = [
    { id: "all", name: "All Styles" },
    { id: "knotless", name: "Knotless Braids" },
    { id: "traditional", name: "Traditional Braids" },
    { id: "boho", name: "Boho Braids" },
    { id: "senegalese", name: "Senegalese Twists" },
    { id: "passion", name: "Passion Twists" },
    { id: "natural", name: "Natural Hair" },
  ]

  // Sample gallery images (in a real implementation, these would be actual images)
  const galleryImages = [
    {
      id: 1,
      src: "knotless.mp4",
      alt: "Knotless Braids Style 1",
      category: "knotless",
    },
   
    {
      id: 2,
      src: "traditional.mp4",
      alt: "Traditional Braids Style 1",
      category: "traditional",
    },
  
    { id: 3, src: "boho.mp4", alt: "Boho Braids Style 1", category: "boho" },
   
    {
      id: 4,
      src: "senagalese.mp4",
      alt: "Senegalese Twists Style 1",
      category: "senegalese",
    },
   
    {
      id: 5,
      src: "passion.mp4",
      alt: "Passion Twists Style 1",
      category: "passion",
    },
    
    {
      id: 6,
      src: "natural.mp4",
      alt: "Natural Hair Style 1",
      category: "natural",
    },
    
  ]

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 bg-primary text-primary-foreground">
        <div className="container">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Style Gallery</h1>
            <p className="text-lg text-primary-foreground/90 mb-6">
              Browse through our portfolio of hairstyles to find inspiration for your next look.
            </p>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-16">
        <div className="container">
          <Tabs defaultValue="all" className="w-full">
            <div className="mb-8 overflow-x-auto">
              <TabsList className="inline-flex w-auto h-auto p-1 bg-muted">
                {categories.map((category) => (
                  <TabsTrigger key={category.id} value={category.id} className="px-4 py-2 text-sm">
                    {category.name}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            <TabsContent value="all" className="mt-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {galleryImages.map((image) => (
                  <div key={image.id} className="relative aspect-square rounded-md overflow-hidden gallery-image">
                    <Image src={image.src || "/placeholder.svg"} alt={image.alt} fill className="object-cover" />
                  </div>
                ))}
              </div>
            </TabsContent>

            {categories.slice(1).map((category) => (
              <TabsContent key={category.id} value={category.id} className="mt-0">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {galleryImages
                    .filter((image) => image.category === category.id)
                    .map((image) => (
                      <div key={image.id} className="relative aspect-square rounded-md overflow-hidden gallery-image">
                        <Image src={image.src || "/placeholder.svg"} alt={image.alt} fill className="object-cover" />
                      </div>
                    ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* Instagram Feed */}
      <section className="py-16 bg-muted">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Follow Us on Instagram</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Check out our Instagram for the latest styles, behind-the-scenes content, and more inspiration.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="relative aspect-square rounded-md overflow-hidden gallery-image">
                <Image
                  src={`/placeholder.svg?height=300&width=300&text=Instagram+${index + 1}`}
                  alt={`Instagram post ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Button asChild variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white">
              <Link href="https://instagram.com/stylesbyb" target="_blank" rel="noopener noreferrer">
                Follow @stylesbyb
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-accent text-accent-foreground">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Love What You See?</h2>
            <p className="text-accent-foreground/90 text-lg mb-8">
              Book your appointment today to get your own stunning hairstyle.
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
