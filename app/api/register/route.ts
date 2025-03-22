import {connect} from "@/utils/config/dbConfig";
import User from "@/models/Users";
import bcyrptjs from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    await connect();

    try{
        const {email, password, name} = await req.json();

        const ifUserExists = await User.findOne({email});

        if(ifUserExists) {
            return NextResponse.json({error: "User already exists"}, {status: 400});
        }

        const salt = await bcyrptjs.genSalt(10);
        const hashedPassword = await bcyrptjs.hash(password, salt);
        const savedUser = new User({email, password: hashedPassword, name});

        
        return NextResponse.json({message: "User created successfully"}, {status: 201});

    }catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500});
    }
    
}