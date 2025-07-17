// components/about-section.tsx
import { CheckCircle, Award, Users, Clock, Wrench } from "lucide-react"

const features = [
  {
    icon: Award,
    title: "Premium Quality Assurance",
    description:
      "All our hybrid batteries undergo rigorous testing to ensure optimal performance and longevity for your vehicle.",
  },
  {
    icon: Users,
    title: "Expert Technical Support",
    description: "Our experienced technicians provide professional installation and comprehensive after-sales support.",
  },
  {
    icon: Clock,
    title: "Fast & Reliable Service",
    description: "Quick turnaround times with same-week installation available for most vehicle models.",
  },
  {
    icon: Wrench,
    title: "Professional Installation",
    description: "Certified technicians ensure proper installation with warranty coverage on all work performed.",
  },
]

const stats = [
  { number: "50+", label: "Satisfied Customers" },
  { number: "100%", label: "Genuine Parts" },
  { number: "24/7", label: "Support Available" },
]

export default function AboutSection() {
  return (
    <section id="about" className="py-20 bg-gradient-to-br from-gray-50 to-red-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center bg-fadarc-red/10 text-fadarc-red px-6 py-3 rounded-full text-sm font-semibold mb-6">
            ABOUT FADARC MOTORS
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-fadarc-black mb-6">SUPPLIER OF GENUINE PARTS</h2>
          <p className="text-xl text-gray-600 max-w-5xl mx-auto leading-relaxed">
            We are a distinguished provider of authentic Engines, Gear boxes and accessories in Zimbabwe. Our mission is
            to provide our customer with a unique and personalized experience by offering a wide range of customization
            options that cater to their individual preferences.
          </p>
        </div>
        {/* Stats Section */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="professional-card p-8 hover-lift">
                <div className="text-4xl font-bold text-fadarc-red mb-2">{stat.number}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
        {/* Features Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {features.map((feature, index) => (
            <div key={index} className="professional-card p-8 hover-lift">
              <div className="flex items-start">
                <div className="gradient-red text-white p-4 rounded-xl mr-6 flex-shrink-0">
                  <feature.icon className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-fadarc-black mb-4">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* Why Choose Us */}
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h3 className="text-3xl font-bold text-fadarc-black mb-8">Why Choose Fadarc Motors?</h3>
            <div className="space-y-6">
              {[
                "Genuine OEM parts from trusted manufacturers",
                "Professional installation by certified technicians",
                "We ensure the timely completion of customer jobs as per agreement",
                "We are the top supplier of authentic Toyota Aqua, Nissan Xtrail, Honda Vezel and accessories.",
                "Our workshop is equipped with state-of-the-art facilities.",
                "Our service Centre stands out for its availability of spare parts, skilled and reliable technicians and exceptional customer service.",
              ].map((point, index) => (
                <div key={index} className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-fadarc-red mr-4 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700 font-medium leading-relaxed">{point}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="gradient-red text-white p-8 rounded-2xl">
            <h4 className="text-2xl font-bold mb-6">Our Commitment</h4>
            <p className="text-lg leading-relaxed mb-6">
              At Fadarc Motors, we understand that your vehicle is an important investment. That's why we're committed
              to providing only the highest quality genuine parts and professional service you can trust.
            </p>
            <p className="text-lg leading-relaxed">
              Our team of experienced professionals is dedicated to keeping your hybrid vehicle running efficiently and
              reliably for years to come.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
