import { mongooseConnect } from "@/lib/mongoose";
import { Category } from "@/models/category";
import mongoose, { HydratedDocument } from "mongoose";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { AuthOptions } from "../auth/[...nextauth]/route";

// Get all categories
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
    const session = await getServerSession(AuthOptions);
    if (!session)
        return NextResponse.json({ message: 'Not Authorized' }, { status: 401 });

    try {
        await mongooseConnect();
        const category: Category = await req.json();
        if (category.parent)
            category.parent = new mongoose.Types.ObjectId(category.parent);

        const newCategory: HydratedDocument<Category> = new Category(category);
        await newCategory.save();
        await newCategory.populate({ path: 'parent', model: Category});
        return NextResponse.json(newCategory);
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}

// Edit
export async function PATCH(req: NextRequest) {
    const session = await getServerSession(AuthOptions);
    if (!session)
        return NextResponse.json({ message: 'Not Authorized' }, { status: 401 });

    try {
        await mongooseConnect();
        const category: Category = await req.json();
        const updatedCategory: Category | null = await Category.findOneAndUpdate({ _id: category._id }, category, { returnDocument: 'after'})
            .populate({ path: 'parent', model: Category }).exec();

        if(!updatedCategory) throw Error("Couldn't find product in database");
        console.log(updatedCategory);
        return NextResponse.json(updatedCategory);
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}

// Delete
export async function PUT(req: NextRequest) {
    const session = await getServerSession(AuthOptions);
    if(!session)
        return NextResponse.json({ message: 'NotAuthorized' }, { status: 401 });

    await mongooseConnect();
    try {
        const _id = await req.json();
        const deletedCat = await Category.findOneAndDelete({ _id });
        console.log('deleted', deletedCat);
        if(!deletedCat) throw Error("Couldn't find category with this id");
        return NextResponse.json("Deleted Successfully");
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}