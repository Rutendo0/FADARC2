import { drizzle } from "drizzle-orm/postgres-js"
import postgres from "postgres"
import { blogPosts, uploadedFiles, quotes, products, users } from "./schema"
import type { InsertBlogPost, BlogPost, InsertUploadedFile, UploadedFile } from "./schema"
import { eq } from "drizzle-orm"

// Create database connection
const connectionString = process.env.DATABASE_URL
if (!connectionString) {
  throw new Error("DATABASE_URL environment variable is required")
}

const sql = postgres(connectionString)
const db = drizzle(sql)

export const storage = {
  // Blog post methods
  async getBlogPosts(): Promise<BlogPost[]> {
    return await db.select().from(blogPosts).orderBy(blogPosts.createdAt)
  },

  async getBlogPost(id: number): Promise<BlogPost | null> {
    const result = await db.select().from(blogPosts).where(eq(blogPosts.id, id))
    return result[0] || null
  },

  async createBlogPost(data: InsertBlogPost): Promise<BlogPost> {
    const result = await db.insert(blogPosts).values(data).returning()
    return result[0]
  },

  async updateBlogPost(id: number, data: Partial<InsertBlogPost>): Promise<BlogPost | null> {
    const result = await db.update(blogPosts).set(data).where(eq(blogPosts.id, id)).returning()
    return result[0] || null
  },

  async deleteBlogPost(id: number): Promise<boolean> {
    const result = await db.delete(blogPosts).where(eq(blogPosts.id, id))
    return result.rowCount > 0
  },

  // File upload methods
  async createUploadedFile(data: InsertUploadedFile): Promise<UploadedFile> {
    const result = await db.insert(uploadedFiles).values(data).returning()
    return result[0]
  },

  async getUploadedFile(id: number): Promise<UploadedFile | null> {
    const result = await db.select().from(uploadedFiles).where(eq(uploadedFiles.id, id))
    return result[0] || null
  },

  // Quote methods (existing)
  async createQuote(data: any) {
    const result = await db.insert(quotes).values(data).returning()
    return result[0]
  },

  async getQuotes() {
    return await db.select().from(quotes)
  },

  // Product methods (existing)
  async createProduct(data: any) {
    const result = await db.insert(products).values(data).returning()
    return result[0]
  },

  async getProducts() {
    return await db.select().from(products)
  },

  async getProductsByCategory(category: string) {
    return await db.select().from(products).where(eq(products.category, category))
  },

  // User methods (existing)
  async createUser(data: any) {
    const result = await db.insert(users).values(data).returning()
    return result[0]
  },

  async getUserByUsername(username: string) {
    const result = await db.select().from(users).where(eq(users.username, username))
    return result[0] || null
  }
}