"use client"

import type React from "react"

import { useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { MapPin, Phone, Mail } from "lucide-react"
import { apiRequest } from "@/lib/queryClient"
import { insertQuoteSchema, type InsertQuote } from "@/types/schema" // Changed import path

export default function ContactSection() {
  const { toast } = useToast()
  const queryClient = useQueryClient()

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    vehicleMake: "",
    vehicleModel: "",
    serviceRequired: "",
  })

  const quoteMutation = useMutation({
    mutationFn: async (data: InsertQuote) => {
      const response = await apiRequest("POST", "/api/quotes", data)
      return response.json()
    },
    onSuccess: () => {
      toast({
        title: "Quote Request Submitted",
        description: "We will contact you within 24 hours with a personalized quote.",
      })
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        vehicleMake: "",
        vehicleModel: "",
        serviceRequired: "",
      })
      queryClient.invalidateQueries({ queryKey: ["/api/quotes"] })
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to submit quote request. Please try again.",
        variant: "destructive",
      })
    },
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const validatedData = insertQuoteSchema.parse(formData)
      quoteMutation.mutate(validatedData)
    } catch (error: any) {
      toast({
        title: "Validation Error",
        description: error.errors?.[0]?.message || "Please fill in all required fields correctly.",
        variant: "destructive",
      })
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const contactInfo = [
    {
      icon: MapPin,
      title: "Harare Branch",
      details: "3 Robert Mugabe Harare, Zimbabwe",
    },
    {
      icon: MapPin,
      title: "Bulawayo Branch",
      details: "114 G.Silundika Ave, Bulawayo, Zimbabwe",
    },
    {
      icon: Phone,
      title: "Phone Numbers",
      details: "+263 78 228 2444 \n +263 71 441 1620",
    },
    {
      icon: Mail,
      title: "Email",
      details: "info@fadarc.com",
    },
  ]

  return (
    <section id="contact" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-fadarc-black mb-4">Get Your Free Quote</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Contact our hybrid experts today for personalized service and competitive pricing
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Quote Form */}
          <Card className="bg-gray-50 rounded-xl">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-fadarc-black mb-6">Request a Quote</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                      First Name
                    </Label>
                    <Input
                      id="firstName"
                      type="text"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange("firstName", e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-fadarc-red focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name
                    </Label>
                    <Input
                      id="lastName"
                      type="text"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange("lastName", e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-fadarc-red focus:border-transparent"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-fadarc-red focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-fadarc-red focus:border-transparent"
                    required
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label className="block text-sm font-medium text-gray-700 mb-2">Vehicle Make</Label>
                    <Select
                      value={formData.vehicleMake}
                      onValueChange={(value) => handleInputChange("vehicleMake", value)}
                    >
                      <SelectTrigger className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-fadarc-red focus:border-transparent">
                        <SelectValue placeholder="Select Make" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="toyota">Toyota</SelectItem>
                        <SelectItem value="honda">Honda</SelectItem>
                        <SelectItem value="mazda">Mazda</SelectItem>
                        <SelectItem value="nissan">Nissan</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="vehicleModel" className="block text-sm font-medium text-gray-700 mb-2">
                      Vehicle Model
                    </Label>
                    <Input
                      id="vehicleModel"
                      type="text"
                      value={formData.vehicleModel}
                      onChange={(e) => handleInputChange("vehicleModel", e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-fadarc-red focus:border-transparent"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="serviceRequired" className="block text-sm font-medium text-gray-700 mb-2">
                    Service Required
                  </Label>
                  <Textarea
                    id="serviceRequired"
                    rows={4}
                    value={formData.serviceRequired}
                    onChange={(e) => handleInputChange("serviceRequired", e.target.value)}
                    placeholder="Describe the service or parts you need..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-fadarc-red focus:border-transparent"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  disabled={quoteMutation.isPending}
                  className="w-full bg-fadarc-red text-white py-4 rounded-lg text-lg font-semibold hover:bg-fadarc-red-dark transition-colors"
                >
                  {quoteMutation.isPending ? "Sending..." : "Send Quote Request"}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-fadarc-black mb-6">Contact Information</h3>

              <div className="space-y-6">
                {contactInfo.map((info, index) => {
                  const IconComponent = info.icon
                  return (
                    <div key={index} className="flex items-start">
                      <div className="text-fadarc-red text-2xl mr-4 mt-1">
                        <IconComponent className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-fadarc-black">{info.title}</h4>
                        <p className="text-gray-600 whitespace-pre-line">{info.details}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* WhatsApp Contact */}
            <Card className="bg-fadarc-red rounded-xl text-white">
              <CardContent className="p-6">
                <h4 className="text-lg font-bold mb-3">WhatsApp Support</h4>
                <p className="mb-4">Get instant support and quotes through WhatsApp for faster service.</p>
                <div className="flex items-center">
                  <Phone className="text-xl mr-3 w-5 h-5" />
                  <span className="text-lg font-semibold">0782282444</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
