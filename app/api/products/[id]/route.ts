import { NextResponse } from "next/server"
import { storage } from "@/lib/db/storage" // Updated import path

interface Params {
  id: string
}

export async function GET(request: Request, { params }: { params: Params }) {
  try {
    const id = Number.parseInt(params.id)
    if (Number.isNaN(id)) {
      return NextResponse.json({ message: "Invalid product ID" }, { status: 400 })
    }

    const product = await storage.getProduct(id)
    if (!product) {
      return NextResponse.json({ message: "Product not found" }, { status: 404 })
    }
    return NextResponse.json(product, { status: 200 })
  } catch (error) {
    console.error("Error fetching product:", error)
    return NextResponse.json({ message: "Failed to fetch product" }, { status: 500 })
  }
}
