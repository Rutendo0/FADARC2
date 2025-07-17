export interface BlogPost {
  id: number
  title: string
  content: string
  excerpt: string
  imageUrl?: string
  category: string
  published: boolean
  createdAt: string // ISO string date
  updatedAt?: string // ISO string date
}

export interface InsertBlogPost {
  title: string
  content: string
  excerpt: string
  imageUrl?: string
  category?: string
  published?: boolean
}
