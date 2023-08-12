import { mongooseConnect } from "@/lib/mongoose";
import { Category } from "@/models/category";
import mongoose, { HydratedDocument } from "mongoose";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { AuthOptions } from "../auth/[...nextauth]/route";

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
        if (category.parent)
            category.parent = new mongoose.Types.ObjectId(category.parent);

        const newCategory: HydratedDocument<Category> = new Category(category);
        await newCategory.save();
        return NextResponse.json(newCategory);
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}

export async function PATCH(req: NextRequest) {
    // Authorize.
    const session = await getServerSession(AuthOptions);
    if (!session)
        return NextResponse.json({ message: 'Not Authorized' }, { status: 401 });

    await mongooseConnect();
    try {
        const category: Category = await req.json();
        console.log(category);
        const updatedCategory: Category | null = await Category.findOneAndUpdate({ _id: category._id }, category, { returnDocument: 'after'});

        if(!updatedCategory) throw Error("Couldn't find product in database");
        return NextResponse.json(updatedCategory);
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }

}