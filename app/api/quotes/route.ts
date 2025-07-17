import { NextResponse } from "next/server"
import { storage } from "@/lib/db/storage" // Updated import path
import { insertQuoteSchema } from "@/lib/db/schema" // Updated import path
import { z } from "zod"

export async function GET() {
  // This route should ideally have admin authentication
  try {
    const quotes = await storage.getQuotes()
    return NextResponse.json(quotes, { status: 200 })
  } catch (error) {
    console.error("Error fetching quotes:", error)
    return NextResponse.json({ message: "Failed to fetch quotes" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const quoteData = insertQuoteSchema.parse(body)
    const quote = await storage.createQuote(quoteData)
    return NextResponse.json(quote, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ message: "Validation error", errors: error.errors }, { status: 400 })
    }
    console.error("Error creating quote request:", error)
    return NextResponse.json({ message: "Failed to create quote request" }, { status: 500 })
  }
}
