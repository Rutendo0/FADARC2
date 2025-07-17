"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Phone } from "lucide-react"
import Link from "next/link" // Changed from wouter
import Image from "next/image" // Using Next.js Image component

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    // If we're not on the home page, navigate to home first
    if (window.location.pathname !== "/") {
      window.location.href = `/#${sectionId}`
      return
    }

    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" })
    }
    setIsOpen(false)
  }

  const handleNavigation = (item: { type: string; href: string }) => {
    if (item.type === "route") {
      // Direct route navigation
      setIsOpen(false)
      // Next.js Link handles navigation, no need for manual window.location.href
    } else {
      // Section scroll navigation
      scrollToSection(item.href)
    }
  }

  const navItems = [
    { label: "Home", href: "home", type: "scroll" },
    { label: "Services", href: "services", type: "scroll" },
    { label: "Vehicle Models", href: "vehicle-models", type: "scroll" },
    { label: "Products", href: "products", type: "scroll" },
    { label: "About", href: "about", type: "scroll" },
    { label: "Blog", href: "/blog", type: "route" },
  ]

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/95 backdrop-blur-md shadow-professional-lg" : "bg-white/90 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/">
              <Image
                // Update the src prop in the Image component
                // - src={fadarcLogoPath || "/placeholder.svg"}
                src="/images/image_1750836838385.png"
                alt="Fadarc Motors Logo"
                width={48} // Provide appropriate width
                height={48} // Provide appropriate height
                className="h-12 w-auto cursor-pointer transition-transform hover:scale-105"
              />
            </Link>
          </div>
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) =>
              item.type === "route" ? (
                <Link key={item.href} href={item.href}>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-fadarc-gray hover:text-fadarc-red font-medium transition-colors relative group"
                  >
                    {item.label}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-fadarc-red transition-all group-hover:w-full"></span>
                  </button>
                </Link>
              ) : (
                <button
                  key={item.href}
                  onClick={() => handleNavigation(item)}
                  className="text-fadarc-gray hover:text-fadarc-red font-medium transition-colors relative group"
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-fadarc-red transition-all group-hover:w-full"></span>
                </button>
              ),
            )}
            {/* Contact info */}
            <div className="flex items-center text-fadarc-gray mr-4">
              <Phone className="w-4 h-4 mr-2" />
              <span className="font-medium">078 228 2444</span>
            </div>
            <Button onClick={() => scrollToSection("contact")} className="btn-primary">
              Get Quote
            </Button>
          </div>
          {/* Mobile menu */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-fadarc-gray hover:text-fadarc-red">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent className="bg-white">
                <div className="flex flex-col space-y-6 mt-8">
                  {navItems.map((item) =>
                    item.type === "route" ? (
                      <Link key={item.href} href={item.href}>
                        <button
                          onClick={() => setIsOpen(false)}
                          className="text-left text-fadarc-gray hover:text-fadarc-red font-medium transition-colors py-2 text-lg"
                        >
                          {item.label}
                        </button>
                      </Link>
                    ) : (
                      <button
                        key={item.href}
                        onClick={() => handleNavigation(item)}
                        className="text-left text-fadarc-gray hover:text-fadarc-red font-medium transition-colors py-2 text-lg"
                      >
                        {item.label}
                      </button>
                    ),
                  )}
                  <div className="flex items-center text-fadarc-gray py-2">
                    <Phone className="w-4 h-4 mr-2" />
                    <span className="font-medium">078 228 2444</span>
                  </div>
                  <Button onClick={() => scrollToSection("contact")} className="btn-primary w-full mt-6">
                    Get Quote
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  )
}
