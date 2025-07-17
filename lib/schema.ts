import { pgTable, text, serial, integer, timestamp, boolean } from "drizzle-orm/pg-core"
import { createInsertSchema } from "drizzle-zod"
import type { z } from "zod"

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
})

export const quotes = pgTable("quotes", {
  id: serial("id").primaryKey(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  vehicleMake: text("vehicle_make").notNull(),
  vehicleModel: text("vehicle_model").notNull(),
  serviceRequired: text("service_required").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
})

export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  category: text("category").notNull(),
  imageUrl: text("image_url"),
})

export const insertQuoteSchema = createInsertSchema(quotes).omit({
  id: true,
  createdAt: true,
})

export const insertProductSchema = createInsertSchema(products).omit({
  id: true,
})

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
})

export type InsertQuote = z.infer<typeof insertQuoteSchema>
export type Quote = typeof quotes.$inferSelect
export type InsertProduct = z.infer<typeof insertProductSchema>
export type Product = typeof products.$inferSelect

export const blogPosts = pgTable("blog_posts", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  excerpt: text("excerpt").notNull(),
  imageUrl: text("image_url"),
  category: text("category").notNull(),
  published: boolean("published").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
})

export const insertBlogPostSchema = createInsertSchema(blogPosts).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
})

export type InsertBlogPost = z.infer<typeof insertBlogPostSchema>

// File metadata table for tracking uploads
export const uploadedFiles = pgTable("uploaded_files", {
  id: serial("id").primaryKey(),
  originalName: text("original_name").notNull(),
  fileName: text("file_name").notNull(),
  fileSize: integer("file_size").notNull(),
  mimeType: text("mime_type").notNull(),
  cloudUrl: text("cloud_url"),
  uploadedAt: timestamp("uploaded_at").defaultNow().notNull(),
})

export type UploadedFile = typeof uploadedFiles.$inferSelect
export type InsertUploadedFile = typeof uploadedFiles.$inferInsert
export type BlogPost = typeof blogPosts.$inferSelect
export type InsertUser = z.infer<typeof insertUserSchema>
export type User = typeof users.$inferSelect
