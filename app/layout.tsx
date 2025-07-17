import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/ui/toaster"
import { TooltipProvider } from "@/components/ui/tooltip" // Assuming TooltipProvider is also in ui components
import { QueryClientProviderWrapper } from "@/components/query-client-provider-wrapper" // We'll create this next

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Fadarc Motors - Hybrid Experts and Parts | Zimbabwe",
  description:
    "Zimbabwe's leading specialists in hybrid vehicle batteries, parts, and expert servicing. Serving Harare and Bulawayo with genuine parts and professional repairs.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <QueryClientProviderWrapper>
          <TooltipProvider>
            {children}
            <Toaster />
          </TooltipProvider>
        </QueryClientProviderWrapper>
      </body>
    </html>
  )
}
