"use client"
import { Facebook, Instagram, Linkedin } from "lucide-react"
import Image from "next/image" // Using Next.js Image component

export default function Footer() {
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
  }

  return (
    <footer className="bg-fadarc-black text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info with Logo */}
          <div className="md:col-span-1">
            <div className="flex items-center mb-6">
              <Image
                src="/images/image_1750836838385.png"
                alt="Fadarc Motors Logo"
                width={40} // Provide appropriate width
                height={40} // Provide appropriate height
                className="h-10 w-auto"
              />
            </div>
            <h3 className="text-xl font-bold mb-4 text-fadarc-red">Fadarc Motors</h3>
            <div className="flex space-x-4 mt-6">
              <a
                href="https://www.facebook.com/share/16iQPh4Y7d/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-fadarc-red transition-colors"
              >
                <Facebook className="w-6 h-6" />
              </a>
              <a
                href="https://www.instagram.com/fadarczim?igsh=YzljYTk1ODg3Zg=="
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-fadarc-red transition-colors"
              >
                <Instagram className="w-6 h-6" />
              </a>
              <a href="mailto:info@fadarc.com" className="text-gray-400 hover:text-fadarc-red transition-colors">
                <Linkedin className="w-6 h-6" />
              </a>
            </div>
          </div>
          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-1 text-fadarc-red">Quick Links</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <button
                  onClick={() => scrollToSection("home")}
                  className="hover:text-white transition-colors text-left"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("vehicle-models")}
                  className="hover:text-white transition-colors text-left"
                >
                  Vehicle Models
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("products")}
                  className="hover:text-white transition-colors text-left"
                >
                  Products
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("about")}
                  className="hover:text-white transition-colors text-left"
                >
                  About
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("contact")}
                  className="hover:text-white transition-colors text-left"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>
          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-2 text-fadarc-red">Contact</h4>
            <div className="space-y-2 text-sm text-gray-300">
              <div>
                <p className="font-semibold text-white mb-1">Phone:</p>
                <p>078 228 2444</p>
              </div>
              <div>
                <p className="font-semibold text-white mb-1">Email:</p>
                <p>info@fadarc.com</p>
              </div>
            </div>
          </div>
          {/* Sister Company */}
          <div>
            <h4 className="text-lg font-semibold mb-2 text-fadarc-red">Sister Company</h4>
            <div className="text-sm text-gray-300">
              <a
                href="https://www.diagnosisandsensors.co.zw/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                Diagnosis & Sensors
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-9 pt-5">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
            <p>&copy; {new Date().getFullYear()} Fadarc Motors. All rights reserved.</p>
            <div className="mt-4 md:mt-0">
              <p className="text-center md:text-right text-sm sm:text-base">
                Website designed & developed by{" "}
                <a
                  href="https://niakazi.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-fadarc-red hover:text-white font-bold transition-colors text-base sm:text-lg"
                >
                  Niakazi Technology Solutions
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
