import { NextResponse } from "next/server"
import { storage } from "@/lib/db/storage" // Updated import path

interface Params {
  category: string
}

export async function GET(request: Request, { params }: { params: Params }) {
  try {
    const { category } = params
    const products = await storage.getProductsByCategory(category)
    return NextResponse.json(products, { status: 200 })
  } catch (error) {
    console.error("Error fetching products by category:", error)
    return NextResponse.json({ message: "Failed to fetch products by category" }, { status: 500 })
  }
}
