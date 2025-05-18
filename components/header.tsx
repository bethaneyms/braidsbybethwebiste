import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export function Header() {
  return (
    <header className="flex flex-col items-center justify-center gap-4 bg-muted p-8 text-center">
      <div className="relative h-24 w-24 overflow-hidden rounded-full border-2 border-hotpink">
        <Image src="/placeholder.svg?height=100&width=100" alt="Beth profile picture" fill className="object-cover" />
      </div>
      <h1 className="gradient-text text-4xl font-bold">Braids by Beth</h1>
      <p className="text-white">WELCOME TO MY BOOKING SITE!</p>
      <div className="mt-2 flex gap-4">
        <Button asChild className="bg-secondary text-black hover:bg-secondary/80">
          <Link href="#booking">Book Now</Link>
        </Button>
        <Button asChild variant="outline" className="border-primary text-primary hover:bg-primary/10">
          <Link href="#services">Services</Link>
        </Button>
      </div>
    </header>
  )
}
