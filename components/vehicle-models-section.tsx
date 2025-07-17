"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Battery, Zap, Car } from "lucide-react"

export default function VehicleModelsSection() {
  const toyotaModels = [
    "Toyota Aqua Hybrid",
    "Toyota Camry Hybrid",
    "Toyota Alphard Hybrid",
    "Toyota Sienta Hybrid",
    "Toyota Auris Hybrid",
    "Toyota CHR Hybrid",
  ]
  const hondaModels = ["Honda Vezel Hybrid", "Honda GP5 Hybrid", "Honda GP6 Hybrid", "Honda GP7 Hybrid"]
  const nissanModels = ["Nissan X-Trail T32 Hybrid", "Nissan Note Hybrid 2019"]

  const scrollToContact = () => {
    const element = document.getElementById("contact")
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  return (
    <section id="vehicle-models" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block bg-gray-800 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
            VEHICLE COMPATIBILITY
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-fadarc-black mb-6">Supported Models</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Genuine hybrid batteries, engines and accessories available for all popular Toyota, Honda, and Nissan models
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-16">
          {/* Toyota Models */}
          <Card className="group bg-gradient-to-br from-red-300 via-red-400 to-red-500 border-0 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 rounded-2xl overflow-hidden">
            <CardContent className="p-8 h-full flex flex-col">
              <div className="flex items-center mb-6">
                <div className="bg-gradient-to-br from-fadarc-red to-red-600 text-white p-4 rounded-2xl mr-4 shadow-lg">
                  <Car className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-fadarc-black group-hover:text-fadarc-red transition-colors">
                    Toyota
                  </h3>
                  <p className="text-gray-700 text-sm">Premium Hybrid Models</p>
                </div>
              </div>
              <div className="space-y-3 mb-8 flex-grow">
                {toyotaModels.map((model, index) => (
                  <div
                    key={index}
                    className="flex items-center p-3 bg-white/60 rounded-lg hover:bg-white transition-colors"
                  >
                    <Battery className="w-5 h-5 text-fadarc-red mr-3 flex-shrink-0" />
                    <span className="font-medium text-gray-900">{model}</span>
                  </div>
                ))}
              </div>
              <Button
                onClick={scrollToContact}
                className="w-full bg-gradient-to-r from-fadarc-red to-red-100 text-gray-800 hover:from-white hover:to-fadarc-red transition-all duration-300 py-3 rounded-xl shadow-lg hover:shadow-xl"
              >
                Get Toyota Quote
              </Button>
            </CardContent>
          </Card>
          {/* Honda Models */}
          <Card className="group bg-gradient-to-br from-blue-200 via-blue-200 to-blue-300 border-0 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 rounded-2xl overflow-hidden">
            <CardContent className="p-8 h-full flex flex-col">
              <div className="flex items-center mb-6">
                <div className="bg-gradient-to-br from-blue-600 to-blue-700 text-white p-4 rounded-2xl mr-4 shadow-lg">
                  <Car className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-fadarc-black group-hover:text-blue-600 transition-colors">
                    Honda
                  </h3>
                  <p className="text-gray-700 text-sm">Hybrid Technology</p>
                </div>
              </div>
              <div className="space-y-3 mb-8 flex-grow">
                {hondaModels.map((model, index) => (
                  <div
                    key={index}
                    className="flex items-center p-3 bg-white/60 rounded-lg hover:bg-white transition-colors"
                  >
                    <Zap className="w-5 h-5 text-blue-600 mr-3 flex-shrink-0" />
                    <span className="font-medium text-gray-800">{model}</span>
                  </div>
                ))}
              </div>
              <Button
                onClick={scrollToContact}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-white transition-all duration-300 py-3 rounded-xl shadow-lg hover:shadow-xl"
              >
                Get Honda Quote
              </Button>
            </CardContent>
          </Card>
          {/* Nissan Models */}
          <Card className="group bg-gradient-to-br from-gray-400 via-gray-400 to-gray-500 border-0 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 rounded-2xl overflow-hidden">
            <CardContent className="p-8 h-full flex flex-col">
              <div className="flex items-center mb-6">
                <div className="bg-gradient-to-br from-gray-700 to-gray-800 text-white p-4 rounded-2xl mr-4 shadow-lg">
                  <Car className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-fadarc-black group-hover:text-gray-700 transition-colors">
                    Nissan
                  </h3>
                  <p className="text-gray-800 text-sm">e-POWER Hybrid</p>
                </div>
              </div>
              <div className="space-y-3 mb-8 flex-grow">
                {nissanModels.map((model, index) => (
                  <div
                    key={index}
                    className="flex items-center p-3 bg-white/60 rounded-lg hover:bg-white transition-colors"
                  >
                    <Battery className="w-5 h-5 text-gray-700 mr-3 flex-shrink-0" />
                    <span className="font-medium text-gray-800">{model}</span>
                  </div>
                ))}
              </div>
              <Button
                onClick={scrollToContact}
                className="w-full bg-gradient-to-r from-gray-700 to-gray-800 text-white hover:from-gray-800 hover:to-white transition-all duration-300 py-3 rounded-xl shadow-lg hover:shadow-xl"
              >
                Get Nissan Quote
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
