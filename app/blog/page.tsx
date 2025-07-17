"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import Link from "next/link" // Changed from wouter
import { Calendar, Clock, Settings, Plus, Edit3, Trash2, Eye, EyeOff, Share2 } from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import Navigation from "@/components/navigation" // Placeholder
import type { BlogPost, InsertBlogPost } from "@/types/blog" // Changed import path
import { useToast } from "@/hooks/use-toast" // Using shadcn toast
import { handleShare } from "@/utils/share" // Declare the handleShare variable

export default function BlogPage() {
  const [isAdminMode, setIsAdminMode] = useState(false)
  const [adminPassword, setAdminPassword] = useState("")
  const [showPasswordDialog, setShowPasswordDialog] = useState(false)
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string>("")
  const [formData, setFormData] = useState<Partial<InsertBlogPost>>({
    title: "",
    content: "",
    excerpt: "",
    imageUrl: "",
    category: "",
    published: true,
  })

  const queryClient = useQueryClient()
  const { toast } = useToast()

  // Check admin session on component mount
  useEffect(() => {
    const checkAdminSession = async () => {
      const token = localStorage.getItem("admin_token")
      if (token) {
        try {
          const response = await fetch("/api/admin/verify", {
            headers: { Authorization: `Bearer ${token}` },
          })
          if (response.ok) {
            setIsAdminMode(true)
          } else {
            localStorage.removeItem("admin_token")
          }
        } catch (error) {
          localStorage.removeItem("admin_token")
        }
      }
    }
    checkAdminSession()
  }, [])

  const { data: blogPosts = [], isLoading } = useQuery<BlogPost[]>({
    queryKey: ["/api/blog"],
    queryFn: async () => {
      const res = await fetch("/api/blog")
      if (!res.ok) throw new Error("Failed to fetch blog posts")
      return res.json()
    },
  })

  const createPostMutation = useMutation({
    mutationFn: async (post: InsertBlogPost) => {
      const response = await fetch("/api/blog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(post),
      })
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: "Unknown error" }))
        const errorMessage = errorData.error || `HTTP ${response.status}: ${response.statusText}`
        throw new Error(errorMessage)
      }
      return response.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/blog"] })
      setIsCreateDialogOpen(false)
      setEditingPost(null)
      resetForm()
      toast({
        title: "✅ Blog post created successfully!",
        variant: "default",
      })
    },
    onError: (error: Error) => {
      console.error("Create post error:", error)
      toast({
        title: "❌ Failed to create blog post",
        description: error.message,
        variant: "destructive",
      })
    },
  })

  const updatePostMutation = useMutation({
    mutationFn: async ({ id, ...post }: Partial<BlogPost>) => {
      const response = await fetch(`/api/blog/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(post),
      })
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: "Unknown error" }))
        const errorMessage = errorData.error || `HTTP ${response.status}: ${response.statusText}`
        throw new Error(errorMessage)
      }
      return response.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/blog"] })
      setEditingPost(null)
      resetForm()
      setIsCreateDialogOpen(false)
      toast({
        title: "✅ Blog post updated successfully!",
        variant: "default",
      })
    },
    onError: (error: Error) => {
      console.error("Update post error:", error)
      toast({
        title: "❌ Failed to update blog post",
        description: error.message,
        variant: "destructive",
      })
    },
  })

  const deletePostMutation = useMutation({
    mutationFn: async (id: number) => {
      const response = await fetch(`/api/blog/${id}`, {
        method: "DELETE",
      })
      if (!response.ok) throw new Error("Failed to delete post")
      return response.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/blog"] })
      toast({
        title: "✅ Blog post deleted successfully!",
        variant: "default",
      })
    },
    onError: (error: Error) => {
      console.error("Delete post error:", error)
      toast({
        title: "❌ Failed to delete blog post",
        description: error.message,
        variant: "destructive",
      })
    },
  })

  const resetForm = () => {
    setFormData({
      title: "",
      content: "",
      excerpt: "",
      imageUrl: "",
      category: "",
      published: true,
    })
    setImageFile(null)
    setImagePreview("")
    // Reset file input
    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement
    if (fileInput) {
      fileInput.value = ""
    }
  }

  const handleAdminLogin = async () => {
    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: adminPassword }),
      })
      if (response.ok) {
        const { token } = await response.json()
        localStorage.setItem("admin_token", token)
        setIsAdminMode(true)
        setShowPasswordDialog(false)
        setAdminPassword("")
        toast({
          title: "🔓 Admin access granted",
          variant: "default",
        })
      } else {
        toast({
          title: "Incorrect password",
          description: "Please contact administrator.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Login error:", error)
      toast({
        title: "Login failed",
        description: "Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"]
      if (!allowedTypes.includes(file.type)) {
        toast({
          title: "❌ Invalid file type",
          description: "Please upload only JPG, PNG, or WEBP images.",
          variant: "destructive",
        })
        e.target.value = ""
        return
      }
      setImageFile(file)

      // Show preview immediately
      const reader = new FileReader()
      reader.onload = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)

      // Upload file to server
      try {
        const formData = new FormData()
        formData.append("image", file)

        toast({
          title: "📤 Uploading image...",
          variant: "default",
        })

        const response = await fetch("/api/upload/blog-image", {
          method: "POST",
          body: formData,
        })
        if (!response.ok) {
          throw new Error("Upload failed")
        }
        const { imageUrl } = await response.json()
        setFormData((prev) => ({ ...prev, imageUrl }))
        toast({
          title: "✅ Image uploaded successfully!",
          variant: "default",
        })
      } catch (error) {
        console.error("Upload error:", error)
        toast({
          title: "❌ Failed to upload image",
          description: "Please try again.",
          variant: "destructive",
        })
        setImageFile(null)
        setImagePreview("")
        e.target.value = ""
      }
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.title?.trim()) {
      toast({
        title: "Validation Error",
        description: "Please enter a title.",
        variant: "destructive",
      })
      return
    }
    if (!formData.content?.trim()) {
      toast({
        title: "Validation Error",
        description: "Please enter content.",
        variant: "destructive",
      })
      return
    }
    if (!formData.excerpt?.trim()) {
      toast({
        title: "Validation Error",
        description: "Please enter an excerpt.",
        variant: "destructive",
      })
      return
    }
    const finalData = {
      title: formData.title.trim(),
      content: formData.content.trim(),
      excerpt: formData.excerpt.trim(),
      category: formData.category?.trim() || "General",
      imageUrl: formData.imageUrl?.trim() || "",
      published: formData.published ?? true,
    }
    if (editingPost) {
      updatePostMutation.mutate({ ...finalData, id: editingPost.id })
    } else {
      createPostMutation.mutate(finalData as InsertBlogPost)
    }
  }

  const handleEdit = (post: BlogPost) => {
    setEditingPost(post)
    setFormData({
      title: post.title,
      content: post.content,
      excerpt: post.excerpt,
      imageUrl: post.imageUrl || "",
      category: post.category,
      published: post.published,
    })
    setImagePreview(post.imageUrl || "")
    setIsCreateDialogOpen(true)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-fadarc-red"></div>
          <p className="mt-4 text-gray-600">Loading blog posts...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <Navigation />
      <div className="container mx-auto px-4 py-20">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center bg-fadarc-red/10 text-fadarc-red px-6 py-3 rounded-full text-sm font-semibold mb-6">
            BLOG & INSIGHTS
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-fadarc-black mb-6">
            Latest <span className="text-fadarc-red">Automotive</span> Insights
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Stay updated with the latest automotive tips, hybrid technology insights, and expert advice from our team.
          </p>
        </div>
        {/* Admin Controls */}
        {isAdminMode && (
          <div className="mb-8 bg-white rounded-2xl p-6 border border-gray-200 shadow-lg">
            <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center mb-6">
              <div>
                <h3 className="text-2xl font-bold text-fadarc-black mb-2">Content Management Dashboard</h3>
                <p className="text-gray-600">Create, edit, and manage your blog posts</p>
              </div>
              <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
                <DialogTrigger asChild>
                  <Button
                    className="bg-fadarc-red hover:bg-fadarc-red/90 text-white font-bold px-8 py-3 rounded-xl"
                    onClick={() => {
                      setEditingPost(null)
                      resetForm()
                    }}
                  >
                    <Plus className="w-5 h-5 mr-2" />
                    Create New Post
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl max-h-[95vh] overflow-y-auto bg-white">
                  <DialogHeader className="pb-6 border-b border-gray-200">
                    <DialogTitle className="text-2xl text-center text-fadarc-black">
                      {editingPost ? "Edit Blog Post" : "Create New Blog Post"}
                    </DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleSubmit} className="space-y-6 pt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="title" className="text-sm font-semibold text-gray-700">
                          Post Title *
                        </Label>
                        <Input
                          id="title"
                          value={formData.title || ""}
                          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                          required
                          placeholder="Enter a compelling title"
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="category" className="text-sm font-semibold text-gray-700">
                          Category *
                        </Label>
                        <Input
                          id="category"
                          value={formData.category || ""}
                          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                          required
                          placeholder="e.g., Hybrid Technology, Maintenance"
                          className="mt-1"
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="excerpt" className="text-sm font-semibold text-gray-700">
                        Short Description (Excerpt) *
                      </Label>
                      <Textarea
                        id="excerpt"
                        value={formData.excerpt || ""}
                        onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                        required
                        rows={3}
                        placeholder="Write a brief summary"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="content" className="text-sm font-semibold text-gray-700">
                        Full Article Content *
                      </Label>
                      <Textarea
                        id="content"
                        value={formData.content || ""}
                        onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                        required
                        rows={10}
                        placeholder="Write your complete blog post content here..."
                        className="mt-1"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label className="text-sm font-semibold text-gray-700">Upload Image</Label>
                        <Input type="file" accept="image/*" onChange={handleImageUpload} className="mt-1" />
                        <p className="text-xs text-gray-500 mt-1">Or enter URL below</p>
                      </div>
                      <div>
                        <Label htmlFor="imageUrl" className="text-sm font-semibold text-gray-700">
                          Image URL
                        </Label>
                        <Input
                          id="imageUrl"
                          value={formData.imageUrl || ""}
                          onChange={(e) => {
                            const url = e.target.value
                            setFormData({ ...formData, imageUrl: url })
                            if (url && (url.startsWith("http") || url.startsWith("data:"))) {
                              setImagePreview(url)
                            } else {
                              setImagePreview("")
                            }
                            // Clear file input if URL is being entered
                            if (url && !url.startsWith("data:")) {
                              setImageFile(null)
                            }
                          }}
                          placeholder="https://example.com/image.jpg"
                          className="mt-1"
                        />
                      </div>
                    </div>
                    {imagePreview && (
                      <div>
                        <Label className="text-sm font-semibold text-gray-700">Image Preview</Label>
                        <div className="mt-1 border rounded-lg overflow-hidden">
                          <img
                            src={imagePreview || "/placeholder.svg"}
                            alt="Preview"
                            className="w-full h-48 object-cover"
                          />
                        </div>
                      </div>
                    )}
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="published"
                        checked={formData.published ?? true}
                        onCheckedChange={(checked) => setFormData({ ...formData, published: checked })}
                      />
                      <Label htmlFor="published" className="text-sm font-semibold text-gray-700">
                        {formData.published ? "Published (Visible to visitors)" : "Draft (Hidden)"}
                      </Label>
                    </div>
                    <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => {
                          setIsCreateDialogOpen(false)
                          setEditingPost(null)
                          resetForm()
                        }}
                      >
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                        className="bg-fadarc-red hover:bg-fadarc-red/90 text-white"
                        disabled={createPostMutation.isPending || updatePostMutation.isPending}
                      >
                        {createPostMutation.isPending || updatePostMutation.isPending ? (
                          <div className="flex items-center space-x-2">
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            <span>{editingPost ? "Updating..." : "Creating..."}</span>
                          </div>
                        ) : (
                          <>{editingPost ? "Update Post" : "Create Post"}</>
                        )}
                      </Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        )}
        {/* Admin Toggle */}
        <div className="fixed top-24 right-8 z-50">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              if (isAdminMode) {
                setIsAdminMode(false)
                localStorage.removeItem("admin_token")
                toast({
                  title: "🔒 Admin mode disabled",
                  variant: "default",
                })
              } else {
                setShowPasswordDialog(true)
              }
            }}
            className="bg-white/90 backdrop-blur-sm"
          >
            {isAdminMode ? (
              <>
                <EyeOff className="w-4 h-4 mr-2" />
                Exit Admin
              </>
            ) : (
              <>
                <Settings className="w-4 h-4 mr-2" />
                Admin
              </>
            )}
          </Button>
        </div>
        {/* Admin Password Dialog */}
        <Dialog open={showPasswordDialog} onOpenChange={setShowPasswordDialog}>
          <DialogContent className="sm:max-w-md bg-white">
            <DialogHeader className="text-center pb-6">
              <DialogTitle className="text-2xl text-fadarc-black">Admin Access Required</DialogTitle>
              <p className="text-gray-600 mt-2">Enter your administrator password</p>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="admin-password" className="text-sm font-semibold text-gray-700">
                  Admin Password
                </Label>
                <Input
                  id="admin-password"
                  type="password"
                  placeholder="Enter password"
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  className="mt-1"
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      handleAdminLogin()
                    }
                  }}
                />
              </div>
              <div className="flex justify-center space-x-4 pt-4">
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowPasswordDialog(false)
                    setAdminPassword("")
                  }}
                >
                  Cancel
                </Button>
                <Button onClick={handleAdminLogin} className="bg-fadarc-red hover:bg-fadarc-red/90 text-white">
                  Login
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
        {/* Blog Posts Grid */}
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <Card
              key={post.id}
              className="group bg-white border border-gray-200 shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
            >
              <CardHeader className="p-0">
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={post.imageUrl || "/placeholder.svg?height=400&width=600"} // Using v0 placeholder
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.src = "/placeholder.svg?height=400&width=600" // Using v0 placeholder
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
                  {/* Admin Controls */}
                  {isAdminMode && (
                    <div className="absolute top-4 right-4 flex space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="bg-white/90 backdrop-blur-sm"
                        onClick={() => handleEdit(post)}
                      >
                        <Edit3 className="w-4 h-4" />
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            size="sm"
                            variant="outline"
                            className="bg-red-50/90 backdrop-blur-sm border-red-200 hover:bg-red-100"
                          >
                            <Trash2 className="w-4 h-4 text-red-600" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent className="bg-white">
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Blog Post</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete "{post.title}"? This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => deletePostMutation.mutate(post.id)}
                              className="bg-red-500 hover:bg-red-600"
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  )}
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-fadarc-red text-white">{post.category}</Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-3 text-fadarc-black group-hover:text-fadarc-red transition-colors duration-300 line-clamp-2">
                  {post.title}
                </h2>
                <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4" />
                    <span>{post.createdAt ? new Date(post.createdAt).toLocaleDateString() : "Recent"}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4" />
                    <span>5 min read</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <Link href={`/blog/${post.id}`}>
                    <Button className="bg-fadarc-red hover:bg-fadarc-red/90 text-white">
                      <Eye className="w-4 h-4 mr-2" />
                      Read More
                    </Button>
                  </Link>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleShare(post.title, post.excerpt, `${window.location.origin}/blog/${post.id}`)}
                  >
                    <Share2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        {/* Empty State */}
        {blogPosts.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📝</div>
            <h3 className="text-2xl font-bold text-fadarc-black mb-2">No Blog Posts Yet</h3>
            <p className="text-gray-600 mb-6">Be the first to share your automotive insights!</p>
            {isAdminMode && (
              <Button
                onClick={() => setIsCreateDialogOpen(true)}
                className="bg-fadarc-red hover:bg-fadarc-red/90 text-white"
              >
                <Plus className="w-5 h-5 mr-2" />
                Create Your First Post
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
