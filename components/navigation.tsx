"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Instagram } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-black/90 backdrop-blur-sm py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="container flex items-center justify-between">
        <div className="flex-1 md:flex-none">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" className="text-white hover:bg-red/10 hover:text-red">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="bg-black border-red/30">
              <div className="flex flex-col gap-6 pt-10">
                <Link
                  href="/"
                  className={`nav-link text-xl font-semibold ${pathname === "/" ? "active" : ""}`}
                  onClick={() => setIsOpen(false)}
                >
                  HOME
                </Link>
                <Link
                  href="/services"
                  className={`nav-link text-xl font-semibold ${pathname === "/services" ? "active" : ""}`}
                  onClick={() => setIsOpen(false)}
                >
                  SERVICES
                </Link>
                <Link
                  href="/booking"
                  className={`nav-link text-xl font-semibold ${pathname === "/booking" ? "active" : ""}`}
                  onClick={() => setIsOpen(false)}
                >
                  BOOK
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        <nav className="hidden md:flex items-center gap-10">
          <Link href="/" className={`nav-link ${pathname === "/" ? "active" : ""}`}>
            HOME
          </Link>
          <Link href="/services" className={`nav-link ${pathname === "/services" ? "active" : ""}`}>
            SERVICES
          </Link>
        </nav>

        <div className="flex-1 flex justify-center">
          <Link href="/" className="logo-text text-2xl text-white">
            <span className="text-red">B</span>RAIDS <span className="text-red">B</span>Y{" "}
            <span className="text-red">B</span>ETH
          </Link>
        </div>

        <div className="flex-1 flex justify-end items-center gap-6">
          <Link href="/booking" className={`hidden md:block nav-link ${pathname === "/booking" ? "active" : ""}`}>
            BOOK
          </Link>
          <Link
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-red transition-colors duration-200"
          >
            <Instagram className="h-5 w-5" />
            <span className="sr-only">Instagram</span>
          </Link>
        </div>
      </div>
    </header>
  )
}
