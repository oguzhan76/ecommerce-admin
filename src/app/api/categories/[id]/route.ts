import { mongooseConnect } from "@/lib/mongoose";
import { NextRequest, NextResponse } from "next/server";
import { Category } from "@/models/category";
import { UpdateResult } from "mongodb";

type Params = {
    params: {
        id: string
    }
}

export async function GET(req: NextRequest, { params: { id }}: Params ) {
    await mongooseConnect();
    try {
        const query: Category | null = await Category.findOne({ _id: id});
        console.log(query);
        if(!query) throw Error("Couldn't find product with this id");
        return NextResponse.json(query);
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}

export async function PATCH(req: NextRequest, { params: { id }}: Params) {
    try {
        await mongooseConnect();
        const childToAdd = await req.json();
        const result: UpdateResult = await Category.updateOne({ _id: id }, { $push: { children: childToAdd._id }});
        if(!result.acknowledged)
            throw Error('Error when updating parent');
        return NextResponse.json(result);
    } catch (error) {
        return NextResponse.json({ message: error.message}, { status: 500 });
    }
}