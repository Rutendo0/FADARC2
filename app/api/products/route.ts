import { NextResponse } from "next/server"
import { storage } from "@/lib/db/storage" // Updated import path

export async function GET() {
  try {
    const products = await storage.getProducts()
    return NextResponse.json(products, { status: 200 })
  } catch (error) {
    console.error("Error fetching products:", error)
    return NextResponse.json({ message: "Failed to fetch products" }, { status: 500 })
  }
}
