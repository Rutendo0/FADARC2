import { z } from "zod"

export const insertQuoteSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number is required").max(15),
  vehicleMake: z.string().min(1, "Vehicle make is required"),
  vehicleModel: z.string().min(1, "Vehicle model is required"),
  serviceRequired: z.string().min(1, "Service required is a required field"),
})

export type InsertQuote = z.infer<typeof insertQuoteSchema>
