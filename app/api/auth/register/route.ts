import { NextResponse } from "next/server";
import { users, findUserByEmail, addUser, User } from "@/lib/auth/users";

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();
    
    // Validate input
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }
    
    // Check if user already exists
    const existingUser = findUserByEmail(email);
    if (existingUser) {
      return NextResponse.json(
        { error: "Email already in use" },
        { status: 409 }
      );
    }
    
    // Create new user
    const newUser: User = {
      id: (users.length + 1).toString(),
      name,
      email,
      password, // In production, this would be hashed
    };
    
    // Add user to our "database"
    addUser(newUser);
    
    // Return success without exposing password
    const { password: _, ...userWithoutPassword } = newUser;
    
    return NextResponse.json(
      { user: userWithoutPassword, message: "User registered successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}