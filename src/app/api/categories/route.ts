import { mongooseConnect } from "@/lib/mongoose";
import { Category } from "@/models/category";
import { HydratedDocument } from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    try {
        await mongooseConnect();
        const categories = await Category.find().populate({ path: 'parent', model: Category }).exec();
        return NextResponse.json(categories);
    } catch (error) {
        return NextResponse.json({ message: 'Error fetching products' }, { status: 500 });
    }
}

// Create
export async function POST(req: NextRequest) {
    try {
        await mongooseConnect();
        const category: Category = await req.json();
        console.log(category);
        const newCategory: HydratedDocument<Category> = new Category(category);
        await newCategory.save();
        return NextResponse.json(newCategory);
    } catch (error) {
        return NextResponse.json({ message: error.message}, { status: 500 });
    }
}