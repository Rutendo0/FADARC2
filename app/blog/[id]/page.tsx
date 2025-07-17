"use client"

import { useQuery } from "@tanstack/react-query"
import Link from "next/link" // Changed from wouter
import { useParams } from "next/navigation" // Changed from wouter
import { Calendar, Clock, ArrowLeft, Share2, MessageSquare } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Navigation from "@/components/navigation" // Placeholder
import type { BlogPost } from "@/types/blog" // Changed import path
import { useToast } from "@/hooks/use-toast" // Using shadcn toast

export default function BlogPostPage() {
  const params = useParams()
  const postId = params?.id ? Number.parseInt(params.id as string) : null

  const { toast } = useToast()

  const {
    data: post,
    isLoading,
    error,
  } = useQuery<BlogPost>({
    queryKey: ["/api/blog", postId],
    queryFn: async () => {
      if (!postId) throw new Error("No post ID provided")
      const response = await fetch(`/api/blog/${postId}`)
      if (!response.ok) throw new Error("Failed to fetch post")
      return response.json()
    },
    enabled: !!postId, // Removed !!match as Next.js handles routing
  })

  const handleShare = (postTitle: string, postExcerpt: string, postUrl: string) => {
    const shareText = `Check out: "${postTitle}" - ${postUrl}`
    if (navigator.share) {
      navigator.share({
        title: postTitle,
        text: postExcerpt,
        url: postUrl,
      })
    } else {
      window.open(`https://wa.me/?text=${encodeURIComponent(shareText)}`, "_blank")
    }
  }

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href)
    toast({
      title: "Link copied!",
      description: "The blog post link has been copied to your clipboard.",
    })
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
        <div className="container mx-auto px-4 py-12">
          <div className="animate-pulse space-y-8 max-w-4xl mx-auto">
            <div className="h-8 bg-gray-200 rounded w-1/4"></div>
            <div className="h-64 bg-gray-200 rounded"></div>
            <div className="h-12 bg-gray-200 rounded w-3/4"></div>
            <div className="space-y-4">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              <div className="h-4 bg-gray-200 rounded w-4/6"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
        <Navigation />
        <div className="container mx-auto px-4 py-12">
          <div className="text-center max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold text-fadarc-black mb-4">Blog Post Not Found</h1>
            <p className="text-gray-600 mb-8">The blog post you're looking for doesn't exist or has been removed.</p>
            <Link href="/blog">
              <Button className="bg-fadarc-red hover:bg-fadarc-red/90 text-white">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Blog
              </Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        <article className="max-w-4xl mx-auto">
          {/* Back Navigation */}
          <div className="mb-20 pt-10">
            <Link
              href="/blog"
              className="inline-flex items-center space-x-2 text-fadarc-red hover:text-fadarc-red/80 transition-colors bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg border border-gray-200 shadow-sm hover:shadow-md"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Blog</span>
            </Link>
            <span className="text-gray-300">|</span>
          </div>
          {/* Article Header */}
          <header className="mb-8">
            <div className="flex items-center space-x-4 mb-4">
              <Badge className="bg-fadarc-red text-white">{post.category}</Badge>
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <div className="flex items-center space-x-1">
                  <Calendar className="w-4 h-4" />
                  <span>{post.createdAt ? new Date(post.createdAt).toLocaleDateString() : "Recent"}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>5 min read</span>
                </div>
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-fadarc-black mb-6 leading-tight">{post.title}</h1>
            <p className="text-xl text-gray-600 leading-relaxed mb-8">{post.excerpt}</p>
          </header>
          {/* Featured Image */}
          {post.imageUrl && (
            <div className="relative w-full overflow-hidden rounded-xl mb-8 shadow-lg">
              <img
                src={post.imageUrl || "/placeholder.svg"}
                alt={post.title}
                className="w-full h-auto max-h-[600px] object-cover"
                onError={(e) => {
                  e.currentTarget.src = "/placeholder.svg?height=600&width=800" // Using v0 placeholder
                }}
                loading="lazy"
              />
            </div>
          )}
          {/* Article Content */}
          <div className="prose prose-lg max-w-none">
            <div className="text-gray-700 leading-relaxed">
              {post.content &&
                post.content.split("\n").map((paragraph, index) => {
                  if (paragraph.trim() === "") {
                    return <div key={index} className="h-6"></div>
                  }
                  return (
                    <p key={index} className="mb-6 text-lg leading-8">
                      {paragraph}
                    </p>
                  )
                })}
            </div>
          </div>
          {/* Share and Contact Section */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="flex flex-col lg:flex-row justify-between items-start gap-8">
              {/* Share */}
              <div>
                <h3 className="text-lg font-bold text-fadarc-black mb-3">Share This Article</h3>
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleShare(post.title, post.excerpt, `${window.location.origin}/blog/${post.id}`)}
                  >
                    <MessageSquare className="w-4 h-4 mr-2" />
                    WhatsApp
                  </Button>
                  <Button variant="outline" size="sm" onClick={handleCopyLink}>
                    <Share2 className="w-4 h-4 mr-2" />
                    Copy Link
                  </Button>
                </div>
              </div>
              {/* Contact */}
              <div className="text-right">
                <h3 className="text-lg font-bold text-fadarc-black mb-3">Need Help?</h3>
                <div className="text-sm text-gray-600">
                  <p>Harare: 0242 770 389</p>
                  <p>Bulawayo: 0292 883 884</p>
                </div>
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  )
}
