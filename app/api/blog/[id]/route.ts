import { NextResponse } from "next/server"
import { storage } from "@/lib/db/storage" // Updated import path
import { insertBlogPostSchema } from "@/lib/db/schema" // Updated import path
import { z } from "zod"

interface Params {
  id: string
}

export async function GET(request: Request, { params }: { params: Params }) {
  try {
    const id = Number.parseInt(params.id)
    if (Number.isNaN(id)) {
      return NextResponse.json({ message: "Invalid blog post ID" }, { status: 400 })
    }

    const post = await storage.getBlogPost(id)
    if (!post) {
      return NextResponse.json({ message: "Blog post not found" }, { status: 404 })
    }
    return NextResponse.json(post, { status: 200 })
  } catch (error) {
    console.error("Error fetching blog post:", error)
    return NextResponse.json({ message: "Failed to fetch blog post" }, { status: 500 })
  }
}

export async function PUT(request: Request, { params }: { params: Params }) {
  try {
    const id = Number.parseInt(params.id)
    if (Number.isNaN(id)) {
      return NextResponse.json({ message: "Invalid blog post ID" }, { status: 400 })
    }

    const body = await request.json()
    // Use partial schema for updates as not all fields might be present
    const updateData = insertBlogPostSchema.partial().parse(body)

    const post = await storage.updateBlogPost(id, updateData)
    if (!post) {
      return NextResponse.json({ message: "Blog post not found" }, { status: 404 })
    }
    return NextResponse.json(post, { status: 200 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ message: "Validation error", errors: error.errors }, { status: 400 })
    }
    console.error("Error updating blog post:", error)
    return NextResponse.json({ message: "Failed to update blog post" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: Params }) {
  try {
    const id = Number.parseInt(params.id)
    if (Number.isNaN(id)) {
      return NextResponse.json({ message: "Invalid blog post ID" }, { status: 400 })
    }

    const success = await storage.deleteBlogPost(id)
    if (!success) {
      return NextResponse.json({ message: "Blog post not found" }, { status: 404 })
    }
    return NextResponse.json({ message: "Blog post deleted successfully" }, { status: 200 })
  } catch (error) {
    console.error("Error deleting blog post:", error)
    return NextResponse.json({ message: "Failed to delete blog post" }, { status: 500 })
  }
}
