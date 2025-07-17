import {
  type Quote,
  type Product,
  type User,
  type BlogPost,
  type InsertQuote,
  type InsertProduct,
  type InsertUser,
  type InsertBlogPost,
  type UploadedFile,
  type InsertUploadedFile,
  users,
  quotes,
  products,
  blogPosts,
  uploadedFiles,
} from "./schema" // Updated import path

import { drizzle } from "drizzle-orm/postgres-js"
import postgres from "postgres"
import { eq } from "drizzle-orm"

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>
  getUserByUsername(username: string): Promise<User | undefined>
  createUser(user: InsertUser): Promise<User>
  // Quote methods
  createQuote(quote: InsertQuote): Promise<Quote>
  getQuotes(): Promise<Quote[]>
  getQuote(id: number): Promise<Quote | undefined>
  // Product methods
  getProducts(): Promise<Product[]>
  getProduct(id: number): Promise<Product | undefined>
  getProductsByCategory(category: string): Promise<Product[]>
  createProduct(product: InsertProduct): Promise<Product>
  // Blog methods
  getBlogPosts(): Promise<BlogPost[]>
  getBlogPost(id: number): Promise<BlogPost | undefined>
  createBlogPost(post: InsertBlogPost): Promise<BlogPost>
  updateBlogPost(id: number, post: Partial<InsertBlogPost>): Promise<BlogPost | undefined>
  deleteBlogPost(id: number): Promise<boolean>
  // File upload methods
  createUploadedFile(file: InsertUploadedFile): Promise<UploadedFile>
  getUploadedFiles(): Promise<UploadedFile[]>
}

// PostgreSQL Storage - Production Ready
export class PostgreSQLStorage implements IStorage {
  private db: ReturnType<typeof drizzle>
  constructor() {
    if (!process.env.DATABASE_URL) {
      throw new Error("DATABASE_URL environment variable is required for PostgreSQL storage")
    }
    const sql = postgres(process.env.DATABASE_URL)
    this.db = drizzle(sql)
  }
  // User methods
  async getUser(id: number): Promise<User | undefined> {
    const result = await this.db.select().from(users).where(eq(users.id, id))
    return result[0]
  }
  async getUserByUsername(username: string): Promise<User | undefined> {
    const result = await this.db.select().from(users).where(eq(users.username, username))
    return result[0]
  }
  async createUser(insertUser: InsertUser): Promise<User> {
    const result = await this.db.insert(users).values(insertUser).returning()
    return result[0]
  }
  // Quote methods
  async createQuote(insertQuote: InsertQuote): Promise<Quote> {
    const result = await this.db.insert(quotes).values(insertQuote).returning()
    return result[0]
  }
  async getQuotes(): Promise<Quote[]> {
    return await this.db.select().from(quotes)
  }
  async getQuote(id: number): Promise<Quote | undefined> {
    const result = await this.db.select().from(quotes).where(eq(quotes.id, id))
    return result[0]
  }
  // Product methods
  async getProducts(): Promise<Product[]> {
    return await this.db.select().from(products)
  }
  async getProduct(id: number): Promise<Product | undefined> {
    const result = await this.db.select().from(products).where(eq(products.id, id))
    return result[0]
  }
  async getProductsByCategory(category: string): Promise<Product[]> {
    return await this.db.select().from(products).where(eq(products.category, category))
  }
  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const result = await this.db.insert(products).values(insertProduct).returning()
    return result[0]
  }
  // Blog methods
  async getBlogPosts(): Promise<BlogPost[]> {
    return await this.db.select().from(blogPosts).where(eq(blogPosts.published, true))
  }
  async getBlogPost(id: number): Promise<BlogPost | undefined> {
    const result = await this.db.select().from(blogPosts).where(eq(blogPosts.id, id))
    return result[0]
  }
  async createBlogPost(insertBlogPost: InsertBlogPost): Promise<BlogPost> {
    const result = await this.db.insert(blogPosts).values(insertBlogPost).returning()
    return result[0]
  }
  async updateBlogPost(id: number, updateData: Partial<InsertBlogPost>): Promise<BlogPost | undefined> {
    const result = await this.db
      .update(blogPosts)
      .set({ ...updateData, updatedAt: new Date() })
      .where(eq(blogPosts.id, id))
      .returning()
    return result[0]
  }
  async deleteBlogPost(id: number): Promise<boolean> {
    const result = await this.db.delete(blogPosts).where(eq(blogPosts.id, id))
    return result.length > 0
  }
  // File upload methods
  async createUploadedFile(insertFile: InsertUploadedFile): Promise<UploadedFile> {
    const result = await this.db.insert(uploadedFiles).values(insertFile).returning()
    return result[0]
  }
  async getUploadedFiles(): Promise<UploadedFile[]> {
    return await this.db.select().from(uploadedFiles)
  }
}

// Memory Storage - For Development/Testing
export class MemStorage implements IStorage {
  private users: Map<number, User>
  private quotes: Map<number, Quote>
  private products: Map<number, Product>
  private blogPosts: Map<number, BlogPost>
  private uploadedFiles: Map<number, UploadedFile> // Added for consistency
  private currentUserId: number
  private currentQuoteId: number
  private currentProductId: number
  private currentBlogPostId: number
  private currentFileId: number // Added for consistency

  constructor() {
    this.users = new Map()
    this.quotes = new Map()
    this.products = new Map()
    this.blogPosts = new Map()
    this.uploadedFiles = new Map() // Initialize
    this.currentUserId = 1
    this.currentQuoteId = 1
    this.currentProductId = 1
    this.currentBlogPostId = 1
    this.currentFileId = 1 // Initialize
    this.initializeProducts()
    this.initializeBlogPosts()
  }

  private initializeProducts() {
    const sampleProducts: InsertProduct[] = [
      {
        name: "Toyota Aqua Hybrid Battery",
        description:
          "Genuine OEM hybrid battery for Toyota Aqua 2011-2020. Low mileage, tested and certified with 1 year warranty.",
        category: "hybrid-batteries",
        imageUrl: "/attached_assets/image6.png",
      },
      {
        name: "Honda Vezel Gearbox",
        description:
          "Complete gearbox assembly for Honda Vezel hybrid models. Professional installation and fitting service available.",
        category: "transmissions",
        imageUrl: "/attached_assets/image7.png",
      },
      {
        name: "Toyota Prius Inverter Water Pump",
        description:
          "High-efficiency inverter water pump for Toyota Prius hybrid cooling system. Essential for optimal performance.",
        category: "cooling-systems",
        imageUrl: "/attached_assets/image3.png",
      },
    ]
    sampleProducts.forEach((product) => {
      this.createProduct(product)
    })
  }

  private initializeBlogPosts() {
    const samplePosts: InsertBlogPost[] = [
      {
        title: "Understanding Hybrid Battery Technology",
        content: "Hybrid batteries are the heart of any hybrid vehicle...",
        excerpt:
          "Learn about the technology behind hybrid batteries and how proper maintenance can extend their lifespan.",
        category: "Hybrid Technology",
        imageUrl: "/attached_assets/battery2.png",
        published: true,
      },
    ]
    samplePosts.forEach((post) => {
      this.createBlogPost(post)
    })
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id)
  }
  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find((user) => user.username === username)
  }
  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++
    const user: User = { ...insertUser, id }
    this.users.set(id, user)
    return user
  }
  async createQuote(insertQuote: InsertQuote): Promise<Quote> {
    const id = this.currentQuoteId++
    const quote: Quote = { ...insertQuote, id, createdAt: new Date() }
    this.quotes.set(id, quote)
    return quote
  }
  async getQuotes(): Promise<Quote[]> {
    return Array.from(this.quotes.values())
  }
  async getQuote(id: number): Promise<Quote | undefined> {
    return this.quotes.get(id)
  }
  async getProducts(): Promise<Product[]> {
    return Array.from(this.products.values())
  }
  async getProduct(id: number): Promise<Product | undefined> {
    return this.products.get(id)
  }
  async getProductsByCategory(category: string): Promise<Product[]> {
    return Array.from(this.products.values()).filter((product) => product.category === category)
  }
  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const id = this.currentProductId++
    const product: Product = { ...insertProduct, id, imageUrl: insertProduct.imageUrl || null }
    this.products.set(id, product)
    return product
  }
  async getBlogPosts(): Promise<BlogPost[]> {
    return Array.from(this.blogPosts.values()).filter((post) => post.published)
  }
  async getBlogPost(id: number): Promise<BlogPost | undefined> {
    return this.blogPosts.get(id)
  }
  async createBlogPost(insertBlogPost: InsertBlogPost): Promise<BlogPost> {
    const id = this.currentBlogPostId++
    const now = new Date()
    const blogPost: BlogPost = {
      id,
      category: insertBlogPost.category,
      title: insertBlogPost.title,
      content: insertBlogPost.content,
      excerpt: insertBlogPost.excerpt,
      imageUrl: insertBlogPost.imageUrl ?? null,
      published: insertBlogPost.published ?? false,
      createdAt: now,
      updatedAt: now,
    }
    this.blogPosts.set(id, blogPost)
    return blogPost
  }
  async updateBlogPost(id: number, updateData: Partial<InsertBlogPost>): Promise<BlogPost | undefined> {
    const existingPost = this.blogPosts.get(id)
    if (!existingPost) return undefined
    const updatedPost: BlogPost = { ...existingPost, ...updateData, updatedAt: new Date() }
    this.blogPosts.set(id, updatedPost)
    return updatedPost
  }
  async deleteBlogPost(id: number): Promise<boolean> {
    return this.blogPosts.delete(id)
  }
  // File upload methods
  async createUploadedFile(insertFile: InsertUploadedFile): Promise<UploadedFile> {
    const id = this.currentFileId++ // Simple ID for memory storage
    const uploadedFile: UploadedFile = {
      id,
      originalName: insertFile.originalName,
      fileName: insertFile.fileName,
      fileSize: insertFile.fileSize,
      mimeType: insertFile.mimeType,
      cloudUrl: insertFile.cloudUrl ?? null,
      uploadedAt: new Date(),
    }
    this.uploadedFiles.set(id, uploadedFile)
    return uploadedFile
  }
  async getUploadedFiles(): Promise<UploadedFile[]> {
    return Array.from(this.uploadedFiles.values())
  }
}

// Automatically use PostgreSQL if DATABASE_URL is set, otherwise use MemStorage
export const storage: IStorage = process.env.DATABASE_URL ? new PostgreSQLStorage() : new MemStorage()
console.log(`Using ${process.env.DATABASE_URL ? "PostgreSQL" : "Memory"} storage`)
