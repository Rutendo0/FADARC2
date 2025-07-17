"use client"

import { Button } from "@/components/ui/button"
import { ChevronDown, Star, Shield, Zap } from "lucide-react"
import Image from "next/image" // Using Next.js Image component

export default function HeroSection() {
  const scrollToServices = () => {
    const element = document.getElementById("services")
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  const features = [
    { icon: Shield, text: "Genuine OEM Parts" },
    { icon: Star, text: "Expert Installation" },
    { icon: Zap, text: "Premium Quality" },
  ]

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Professional gradient background */}
      <div className="absolute inset-0 gradient-hero"></div>

      {/* Background image with overlay */}
      <div className="absolute inset-0 bg-cover bg-center opacity-20">
        <Image
          src="/images/image_1750840247088.png"
          alt="Fadarc Motors Banner"
          layout="fill"
          objectFit="cover"
          quality={100}
          className="z-0"
        />
      </div>

      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-black/20 to-fadarc-red/10"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-20 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            {/* Premium badge */}
            <div className="inline-flex items-center bg-fadarc-red/10 backdrop-blur-sm border border-fadarc-red/20 text-fadarc-red px-6 py-3 rounded-full text-sm font-semibold mb-8">
              <Shield className="w-4 h-4 mr-2" />
              GENUINE OEM PARTS SUPPLIER
            </div>

            {/* Main heading */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold leading-tight text-white mb-6">
              Premium Hybrid
              <span className="block text-fadarc-red">Battery Solutions</span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl lg:text-2xl text-gray-300 mb-8 leading-relaxed max-w-2xl">
              Transforming vehicles into head-turning machines that reflect personality and style.
            </p>

            {/* Feature highlights */}
            <div className="flex flex-wrap gap-4 sm:gap-6 mb-8 sm:mb-10 justify-center lg:justify-start">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center text-white/90 text-sm sm:text-base">
                  <feature.icon className="w-4 h-4 sm:w-5 sm:h-5 text-fadarc-red mr-2" />
                  <span className="font-medium">{feature.text}</span>
                </div>
              ))}
            </div>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
              <Button
                onClick={scrollToServices}
                className="btn-primary text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 group"
                size="lg"
              >
                Explore Our Products
                <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 ml-2 group-hover:translate-y-1 transition-transform" />
              </Button>
              <Button
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                variant="outline"
                className="btn-secondary text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4"
                size="lg"
              >
                Get Free Quote
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <button onClick={scrollToServices} className="animate-bounce text-white/70 hover:text-white transition-colors">
          <ChevronDown className="w-8 h-8" />
        </button>
      </div>
    </section>
  )
}
