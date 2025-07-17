import { NextResponse } from "next/server"
import { storage } from "@/lib/db/storage" // Updated import path
import { insertBlogPostSchema } from "@/lib/db/schema" // Updated import path
import { z } from "zod"

export async function GET() {
  try {
    const posts = await storage.getBlogPosts()
    return NextResponse.json(posts, { status: 200 })
  } catch (error) {
    console.error("Error fetching blog posts:", error)
    return NextResponse.json({ message: "Failed to fetch blog posts" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const postData = insertBlogPostSchema.parse(body)
    const post = await storage.createBlogPost(postData)
    return NextResponse.json(post, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ message: "Validation error", errors: error.errors }, { status: 400 })
    }
    console.error("Error creating blog post:", error)
    return NextResponse.json({ message: "Failed to create blog post" }, { status: 500 })
  }
}
