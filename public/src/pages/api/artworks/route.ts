import clientPromise from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest){
    try{
        const client  = await clientPromise;
        const db= client.db("sample_mflix")
        const sample= await db.collection("users").find({}).toArray()
        return NextResponse.json(sample)
    }catch(e){
        console.log(e);
        
    }
}