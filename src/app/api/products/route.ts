import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const { title, description, price }: Product = await req.json(); 
    console.log(title, description, price);
    return NextResponse.json('Aferin');
}