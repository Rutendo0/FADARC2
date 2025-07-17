import Navigation from "@/components/navigation" // Placeholder
import HeroSection from "@/components/hero-section" // Placeholder
import ServicesSection from "@/components/services-section" // Placeholder
import VehicleModelsSection from "@/components/vehicle-models-section" // Placeholder
import ProductsSection from "@/components/products-section" // Placeholder
import AboutSection from "@/components/about-section" // Placeholder
import ContactSection from "@/components/contact-section" // Placeholder
import Footer from "@/components/footer" // Placeholder

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <HeroSection />
      <ServicesSection />
      <VehicleModelsSection />
      <ProductsSection />
      <AboutSection />
      <ContactSection />
      <Footer />
    </div>
  )
}
