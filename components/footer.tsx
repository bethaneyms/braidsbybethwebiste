import Link from "next/link"
import { Instagram, Phone, Mail } from "lucide-react"

export function Footer() {
  return (
    <footer className="py-12 bg-black border-t border-red/20">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="mb-6 md:mb-0">
            <Link href="/" className="logo-text text-2xl text-white">
              <span className="text-red">B</span>RAIDS <span className="text-red">B</span>Y{" "}
              <span className="text-red">B</span>ETH
            </Link>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10">
            <Link href="/" className="nav-link">
              HOME
            </Link>
            <Link href="/services" className="nav-link">
              SERVICES
            </Link>
            <Link href="/booking" className="nav-link">
              BOOK
            </Link>
          </div>

          <div className="flex items-center gap-4 mt-6 md:mt-0">
            <Link
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-red transition-colors duration-200"
            >
              <Instagram className="h-5 w-5" />
              <span className="sr-only">Instagram</span>
            </Link>
            <Link href="tel:+1234567890" className="text-white hover:text-red transition-colors duration-200">
              <Phone className="h-5 w-5" />
              <span className="sr-only">Phone</span>
            </Link>
            <Link
              href="mailto:contact@braidsbybeth.com"
              className="text-white hover:text-red transition-colors duration-200"
            >
              <Mail className="h-5 w-5" />
              <span className="sr-only">Email</span>
            </Link>
          </div>
        </div>

        <div className="border-t border-red/10 pt-6 text-center">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Braids by Beth. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
