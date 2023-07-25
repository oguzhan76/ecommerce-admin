import { mongooseConnect } from "@/lib/mongoose";
import { Category } from "@/models/category";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    try {
        await mongooseConnect();
        const query = await Category.find();
        // const categories: CategoryDoc[] = query.map(cat => ({...cat.toObject(), _id: cat._id.toString()}));
        // const categories: CategoryDoc[]
        // return NextResponse.json(categories);
    } catch (error) {
        return NextResponse.json({ message: 'Error fetching products' }, { status: 500 });
    }
    return NextResponse.json(['anan1', 'anan2']);
}