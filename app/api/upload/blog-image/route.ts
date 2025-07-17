import { NextResponse } from "next/server"
import { v2 as cloudinary } from "cloudinary"
import sharp from "sharp"
import { storage } from "@/lib/db/storage" // Updated import path

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

// Compress image with Sharp
async function compressImage(buffer: Buffer): Promise<Buffer> {
  return await sharp(buffer)
    .resize(1200, 800, {
      fit: "inside",
      withoutEnlargement: true,
    })
    .jpeg({
      quality: 85,
      progressive: true,
    })
    .toBuffer()
}

// Upload to Cloudinary with compression
async function uploadToCloudinary(fileBuffer: Buffer, originalname: string): Promise<string> {
  try {
    // Compress the image first
    const compressedBuffer = await compressImage(fileBuffer)

    return new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder: "blog-images",
            resource_type: "image",
            public_id: `blog_${Date.now()}_${originalname.split(".")[0]}`, // Unique public ID
            transformation: [{ quality: "auto", fetch_format: "auto" }],
          },
          (error, result) => {
            if (error) {
              console.error("Cloudinary upload error:", error)
              reject(error)
            } else {
              console.log("Image uploaded successfully:", result?.secure_url)
              resolve(result!.secure_url)
            }
          },
        )
        .end(compressedBuffer)
    })
  } catch (error) {
    console.error("Image compression or upload error:", error)
    throw error
  }
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const file = formData.get("image") as File | null

    if (!file) {
      return NextResponse.json({ success: false, message: "No file uploaded" }, { status: 400 })
    }

    if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
      console.error("Cloudinary Config Missing:", {
        cloud_name: !!process.env.CLOUDINARY_CLOUD_NAME,
        api_key: !!process.env.CLOUDINARY_API_KEY,
        api_secret: !!process.env.CLOUDINARY_API_SECRET,
      })
      return NextResponse.json(
        {
          success: false,
          message: "Cloudinary service not configured",
          details: {
            configStatus: {
              cloud_name: !!process.env.CLOUDINARY_CLOUD_NAME,
              api_key: !!process.env.CLOUDINARY_API_KEY,
              api_secret: !!process.env.CLOUDINARY_API_SECRET,
            },
          },
        },
        { status: 500 },
      )
    }

    const buffer = Buffer.from(await file.arrayBuffer())
    const imageUrl = await uploadToCloudinary(buffer, file.name)

    const fileMetadata = await storage.createUploadedFile({
      originalName: file.name,
      fileName: `blog_${Date.now()}_${file.name.split(".")[0]}`,
      fileSize: file.size,
      mimeType: file.type,
      cloudUrl: imageUrl,
    })

    return NextResponse.json(
      {
        success: true,
        imageUrl,
        fileId: fileMetadata.id,
        message: "Image uploaded successfully",
      },
      { status: 200 },
    )
  } catch (error: any) {
    console.error("Upload Error:", {
      error: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
    })
    return NextResponse.json(
      {
        success: false,
        message: "Failed to upload image",
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    )
  }
}