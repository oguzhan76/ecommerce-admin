import { mongooseConnect } from "@/lib/mongoose";
import { NextRequest, NextResponse } from "next/server";
import { Category } from "@/models/category";
import { ICategoryDocument } from "@/interfaces/ICategory";
import { UpdateResult } from "mongodb";
import { getServerSession } from "next-auth";
import { AuthOptions } from "../../auth/[...nextauth]/route";

type Params = {
    params: {
        id: string
    }
}

export async function GET(req: NextRequest, { params: { id }}: Params ) {
    await mongooseConnect();
    try {
        const query: ICategoryDocument | null = await Category.findOne({ _id: id});
        console.log(query);
        if(!query) throw Error("Couldn't find product with this id");
        return NextResponse.json(query);
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}

// Update a category
export async function PATCH(req: NextRequest, { params: { id }}: Params) {
    const session = await getServerSession(AuthOptions);
    if(!session)
        return NextResponse.json({ message: 'Not Authorized' }, { status: 401 });

    try {
        await mongooseConnect();
        const { name, values, properties } = await req.json();
        console.log(name, values, properties);
        const result: ICategoryDocument | null = await Category.findOneAndUpdate({ _id: id }, { name, values, properties });
        if(!result)
            throw Error('Error when updating category');
        return NextResponse.json(result);
    } catch (error) {
        return NextResponse.json({ message: error.message}, { status: 500 });
    }
}

// Delete
export async function PUT(req: NextRequest, { params: { id }}: Params) {
    const session = await getServerSession(AuthOptions);
    if(!session)
        return NextResponse.json({ message: 'Not Authorized' }, { status: 401 });

    await mongooseConnect();
    try {
        const deletedCat = await Category.findOneAndDelete({ _id: id });
        console.log('deleted', deletedCat);
        if(!deletedCat) throw Error("Couldn't find category with this id");
        return NextResponse.json("Deleted Successfully");
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}