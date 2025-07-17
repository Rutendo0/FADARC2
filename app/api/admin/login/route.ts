import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { password } = await request.json()

    // IMPORTANT: Replace "admin123" with a secure environment variable or a proper authentication system.
    // For example: process.env.ADMIN_PASSWORD
    if (password === "admin123") {
      // In a real application, you would generate a JWT or a more secure token here.
      // For this example, a simple string token is used.
      return NextResponse.json({ token: "admin-token" }, { status: 200 })
    } else {
      return NextResponse.json({ message: "Invalid password" }, { status: 401 })
    }
  } catch (error) {
    console.error("Admin login error:", error)
    return NextResponse.json({ message: "Login failed" }, { status: 500 })
  }
}
