// components/services-section.tsx
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image" // Using Next.js Image component

export default function ServicesSection() {
  const services = [
    {
      title: "Hybrid Battery Replacement",
      description: "Genuine Toyota hybrid batteries for Aqua, Camry, Alphard, Sienta, Auris, CHR and more.",
      features: ["Toyota Aqua, Camry, Alphard", "Honda Vezel, GP5, GP6, GP7", "Nissan X-Trail T32, Note 2019"],
      image: "/assets/image.jpg",
    },
    {
      title: "Professional Installation",
      description: "Expert technicians providing professional hybrid battery installation and system diagnostics.",
      features: ["Certified technicians", "Diagnostic testing included", "Quality guarantee"],
      image: "/assets/image1.jpg",
    },
    {
      title: "Genuine Parts Supply",
      description: "Authentic Toyota, Honda, and Nissan hybrid parts with fast delivery across Zimbabwe.",
      features: ["100% Genuine OEM parts", "Competitive pricing", "Harare & Bulawayo delivery"],
      image: "/assets/image2.jpg",
    },
  ]

  return (
    <section id="services" className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block bg-fadarc-red text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
            OUR EXPERTISE
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-fadarc-black mb-6">Professional Services</h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Our service center is equipped with state-of-of-the-art facilities and staffed by certified technicians who
            specialize in servicing, repairing and fitting.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {services.map((service, index) => {
            return (
              <Card
                key={index}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border-0 hover:-translate-y-2"
              >
                <div className="relative overflow-hidden">
                  <Image
                    src={service.image || "/placeholder.svg"}
                    alt={service.title}
                    width={400} // Provide appropriate width
                    height={224} // Provide appropriate height (56 * 4)
                    className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  <div className="absolute top-4 left-4 backdrop-blur-sm rounded-full p-3"></div>
                </div>
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-fadarc-black mb-4 group-hover:text-fadarc-red transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>
                  <div className="space-y-3">
                    {service.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center">
                        <div className="w-2 h-2 bg-fadarc-red rounded-full mr-3 flex-shrink-0"></div>
                        <span className="text-gray-700 font-medium">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
