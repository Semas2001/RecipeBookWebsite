import User from '@/models/Users';
import dbConnect from '@/lib/mongodb';
import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';

export const POST = async (request: any) => {
  const { email, password, name } = await request.json();

  // Connect to the database
  await dbConnect();

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return new NextResponse(JSON.stringify({ message: "Email is already in use" }), { status: 400, headers: { "Content-Type": "application/json" } });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, password: hashedPassword, name });

    // Save the user
    await newUser.save();
    return new NextResponse(JSON.stringify({ message: "User is registered successfully" }), { status: 200, headers: { "Content-Type": "application/json" } });
    
  } catch (err) {
    console.error("Error in registration:", err); // Log detailed error
    return new NextResponse(JSON.stringify({ message: "Internal Server Error" }), { status: 500, headers: { "Content-Type": "application/json" } });
  }
};
