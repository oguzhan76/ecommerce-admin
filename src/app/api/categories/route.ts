import { mongooseConnect } from "@/lib/mongoose";
import { Category } from "@/models/category";
import { ICategoryDocument, ICategoryModel } from "@/interfaces/ICategory";
import mongoose, { HydratedDocument, ObjectId } from "mongoose";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { AuthOptions } from "../auth/[...nextauth]/route";
import { UpdateResult } from "mongodb";

// Get all categories
export async function GET() {
    try {
        await mongooseConnect();
        const categories = await Category.find();
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
        const { name, parent } = await req.json();
        const newCategory: ICategoryDocument = await Category.create({ name, parent });
        return NextResponse.json(newCategory);
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}

// Edit single category
export async function PATCH(req: NextRequest) {
    const session = await getServerSession(AuthOptions);
    if (!session)
        return NextResponse.json({ message: 'Not Authorized' }, { status: 401 });

    try {
        await mongooseConnect();
        const category: Category = await req.json();
        const updatedCategory: ICategoryDocument | null = await Category.findOneAndUpdate({ _id: category._id }, category, { returnDocument: 'after'});

        if(!updatedCategory) throw Error("Couldn't find product in database");
        console.log(updatedCategory);
        return NextResponse.json(updatedCategory);
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}

// Delete many
export async function PUT(req: NextRequest) {
    const session = await getServerSession(AuthOptions);
    if(!session)
        return NextResponse.json({ message: 'Not Authorized' }, { status: 401 });

    await mongooseConnect();
    try {
        const { ids }: { ids: string[] } = await req.json();
        console.log(ids);
        const res = await Category.deleteMany({ _id: { $in: ids }});
        if(res.deletedCount !== ids.length)
            throw Error('Some categories may not be deleted');

        console.log('deleted', res.deletedCount);
        return NextResponse.json("Deleted Successfully");
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}