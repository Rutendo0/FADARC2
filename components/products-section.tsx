"use client"

import { useQuery } from "@tanstack/react-query"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Battery, Settings, Wrench, ShoppingCart, Star, Award } from "lucide-react"
import Image from "next/image" // Using Next.js Image component

interface Product {
  id: number
  name: string
  description: string
  price: number
  category: string
  image: string
}

const categories = [
  {
    name: "Toyota Hybrid Batteries",
    icon: Battery,
    description: "Aqua, Camry, Alphard, Sienta, Auris, CHR",
    models: "Aqua • Camry • Alphard • Sienta • Auris • CHR",
  },
  {
    name: "Honda Hybrid Batteries",
    icon: Battery,
    description: "Vezel, GP5, GP6, GP7",
    models: "Vezel • GP5 • GP6 • GP7",
  },
  {
    name: "Nissan Hybrid Batteries",
    icon: Battery,
    description: "Note 2019",
    models: "Note 2019 • Leaf • e-Power",
  },
  {
    name: "Gear Boxes",
    icon: Settings,
    description: "Honda GP5, Toyota Aqua, Honda Vezel, Nissan Xtrail T32",
    models: "Honda GP5 • Toyota Aqua • Honda Vezel • Nissan Xtrail T32",
  },
  {
    name: "Installation Service",
    icon: Wrench,
    description: "Professional fitting with warranty",
    models: "Expert Installation • Warranty Included • Technical Support",
  },
]

export default function ProductsSection() {
  // Assuming /api/products will return Product[]
  const { data: products, isLoading } = useQuery<Product[]>({
    queryKey: ["/api/products"],
    queryFn: async () => {
      // Placeholder for actual fetch logic
      return [] // Return empty array for now
    },
  })

  const scrollToContact = () => {
    const element = document.getElementById("contact")
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  return (
    <section id="products" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center bg-fadarc-red/10 text-fadarc-red px-6 py-3 rounded-full text-sm font-semibold mb-6">
            <ShoppingCart className="w-4 h-4 mr-2" />
            OUR PRODUCTS & SERVICES
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-fadarc-black mb-6">Supplier Of Genuine Parts</h2>
          <p className="text-xl text-gray-600 max-w-5xl mx-auto leading-relaxed">
            Fadarc offers a range of high-quality products designed to enhance the appearance and performance of your
            vehicle. Our products are expertly crafted and tailored to fit your car perfectly, ensuring a seamless and
            stylish.
          </p>
        </div>
        {/* Categories Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16">
          {categories.map((category, index) => (
            <Card key={index} className="professional-card hover-lift group">
              <CardContent className="p-6 sm:p-8">
                <div className="gradient-red text-white p-4 rounded-xl w-fit mb-6 group-hover:scale-110 transition-transform">
                  <category.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-fadarc-black mb-3 sm:mb-4 group-hover:text-fadarc-red transition-colors">
                  {category.name}
                </h3>
                <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 leading-relaxed">
                  {category.description}
                </p>
                <div className="space-y-2">
                  <div className="text-sm font-semibold text-fadarc-gray uppercase tracking-wide mb-3">
                    Compatible Models:
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {category.models.split(" • ").map((model, modelIndex) => (
                      <Badge
                        key={modelIndex}
                        variant="secondary"
                        className="bg-gray-100 text-gray-700 hover:bg-fadarc-red hover:text-white transition-colors"
                      >
                        {model}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        {/* Product Gallery */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="professional-card overflow-hidden group">
            <Image
              src="/assets/image6.jpg"
              alt="Toyota Hybrid Battery"
              width={300}
              height={160}
              className="w-full h-40 sm:h-48 object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="p-3 sm:p-4">
              <h4 className="font-semibold text-fadarc-black text-sm">Toyota Hybrid Batteries</h4>
              <p className="text-xs text-gray-600 mt-1">Prius, Aqua, Camry Series</p>
            </div>
          </div>
          <div className="professional-card overflow-hidden group">
            <Image
              src="/assets/battery2.png"
              alt="Honda Hybrid Battery"
              width={300}
              height={160}
              className="w-full h-40 sm:h-48 object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="p-3 sm:p-4">
              <h4 className="font-semibold text-fadarc-black text-sm">Honda Hybrid Batteries</h4>
              <p className="text-xs text-gray-600 mt-1">Insight, Civic, Accord Series</p>
            </div>
          </div>
          <div className="professional-card overflow-hidden group">
            <Image
              src="/assets/image.jpg"
              alt="Nissan Hybrid Battery"
              width={300}
              height={160}
              className="w-full h-40 sm:h-48 object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="p-3 sm:p-4">
              <h4 className="font-semibold text-fadarc-black text-sm">Nissan Hybrid Batteries</h4>
              <p className="text-xs text-gray-600 mt-1">Note, Serena, X-Trail Series</p>
            </div>
          </div>
          <div className="professional-card overflow-hidden group">
            <Image
              src="/assets/image2.jpg"
              alt="Premium Battery Components"
              width={300}
              height={160}
              className="w-full h-40 sm:h-48 object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="p-3 sm:p-4">
              <h4 className="font-semibold text-fadarc-black text-sm">Premium Components</h4>
              <p className="text-xs text-gray-600 mt-1">High-quality battery modules</p>
            </div>
          </div>
        </div>
        {/* Additional Product Images */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-12 sm:mb-16">
          <div className="professional-card overflow-hidden group">
            <Image
              src="/assets/battery.jpg"
              alt="Original Toyota Battery"
              width={300}
              height={192}
              className="w-full h-48 sm:h-56 object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="p-3 sm:p-4">
              <h4 className="font-semibold text-fadarc-black text-sm">OEM Toyota Batteries</h4>
              <p className="text-xs text-gray-600 mt-1">Factory specifications and quality</p>
            </div>
          </div>
          <div className="professional-card overflow-hidden group">
            <Image
              src="/assets/image3.jpg"
              alt="High Capacity Battery"
              width={300}
              height={192}
              className="w-full h-48 sm:h-56 object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="p-3 sm:p-4">
              <h4 className="font-semibold text-fadarc-black text-sm">High-Capacity Modules</h4>
              <p className="text-xs text-gray-600 mt-1">Extended life and performance</p>
            </div>
          </div>
          <div className="professional-card overflow-hidden group">
            <Image
              src="/assets/image7.png"
              alt="Professional Installation"
              width={300}
              height={192}
              className="w-full h-48 sm:h-56 object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="p-3 sm:p-4">
              <h4 className="font-semibold text-fadarc-black text-sm">Installation Service</h4>
              <p className="text-xs text-gray-600 mt-1">Expert fitting and diagnostics</p>
            </div>
          </div>
          <div className="professional-card overflow-hidden group">
            <Image
              src="/assets/image1.jpg"
              alt="Windshield Washer"
              width={300}
              height={192}
              className="w-full h-48 sm:h-56 object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="p-3 sm:p-4">
              <h4 className="font-semibold text-fadarc-black text-sm">Windshield Washer</h4>
              <p className="text-xs text-gray-600 mt-1">Car Accessories</p>
            </div>
          </div>
          <div className="professional-card overflow-hidden group">
            <Image
              src="/assets/image4.jpg"
              alt="Genuine Parts Inventory"
              width={300}
              height={192}
              className="w-full h-48 sm:h-56 object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="p-3 sm:p-4">
              <h4 className="font-semibold text-fadarc-black text-sm">Parts Inventory</h4>
              <p className="text-xs text-gray-600 mt-1">Extensive stock of genuine parts</p>
            </div>
          </div>
          <div className="professional-card overflow-hidden group">
            <Image
              src="/assets/image9.png"
              alt="Workshop Facility"
              width={300}
              height={192}
              className="w-full h-48 sm:h-56 object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="p-3 sm:p-4">
              <h4 className="font-semibold text-fadarc-black text-sm">Modern Workshop</h4>
              <p className="text-xs text-gray-600 mt-1">State-of-the-art facilities</p>
            </div>
          </div>
        </div>
        {/* Quality Assurance Section */}
        <div className="bg-gradient-to-r from-gray-50 to-red-50 rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12 mb-12 sm:mb-16">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
            <div>
              <div className="flex items-center mb-4 sm:mb-6">
                <Award className="w-6 h-6 sm:w-8 sm:h-8 text-fadarc-red mr-3" />
                <h3 className="text-2xl sm:text-3xl font-bold text-fadarc-black">Quality Assurance</h3>
              </div>
              <p className="text-base sm:text-lg text-gray-700 mb-4 sm:mb-6 leading-relaxed">
                Every battery we supply comes with our guarantee of authenticity and performance. We work directly with
                manufacturers to ensure you receive genuine OEM parts.
              </p>
              <div className="space-y-4">
                {["100% Genuine OEM Parts", "Rigorous Quality Testing", "Professional Installation"].map(
                  (feature, index) => (
                    <div key={index} className="flex items-center">
                      <Star className="w-5 h-5 text-fadarc-red mr-3" />
                      <span className="font-medium text-gray-700">{feature}</span>
                    </div>
                  ),
                )}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:gap-6">
              <div className="professional-card p-4 sm:p-6 text-center">
                <div className="text-2xl sm:text-3xl font-bold text-fadarc-red mb-1 sm:mb-2">100%</div>
                <div className="text-sm sm:text-base text-gray-600 font-medium">Genuine Parts</div>
              </div>
              <div className="professional-card p-4 sm:p-6 text-center">
                <div className="text-2xl sm:text-3xl font-bold text-fadarc-red mb-1 sm:mb-2">24hr</div>
                <div className="text-sm sm:text-base text-gray-600 font-medium">Installation</div>
              </div>
              <div className="professional-card p-4 sm:p-6 text-center">
                <div className="text-2xl sm:text-3xl font-bold text-fadarc-red mb-1 sm:mb-2">50+</div>
                <div className="text-sm sm:text-base text-gray-600 font-medium">Happy Customers</div>
              </div>
            </div>
          </div>
        </div>
        {/* CTA Section */}
        <div className="text-center">
          <div className="gradient-red text-white p-6 sm:p-8 lg:p-12 rounded-2xl sm:rounded-3xl">
            <h3 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">Ready to Get Started?</h3>
            <p className="text-lg sm:text-xl mb-6 sm:mb-8 opacity-90 max-w-2xl mx-auto">
              Contact us today for a free quote on your hybrid battery replacement or any automotive service.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <Button
                onClick={scrollToContact}
                variant="outline"
                className="bg-white text-fadarc-red border-white hover:bg-gray-100 text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4"
                size="lg"
              >
                Get Free Quote
              </Button>
              <Button
                onClick={() => window.open("tel:0782282444", "_self")}
                variant="outline"
                className="bg-transparent text-white border-white hover:bg-white hover:text-fadarc-red text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4"
                size="lg"
              >
                Call Now: 078 228 2444
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
