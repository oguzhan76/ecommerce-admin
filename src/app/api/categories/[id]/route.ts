import { mongooseConnect } from "@/lib/mongoose";
import { NextRequest, NextResponse } from "next/server";
import { Category } from "@/models/category";

type Params = {
    params: {
        id: string
    }
}

export async function GET(req: NextRequest, { params: { id }}: Params ) {
    await mongooseConnect();
    try {
        const query: Category | null = await Category.findOne({ _id: id});
        console.log();

        // if(!product) throw Error("Couldn't find product with this id");
        // return NextResponse.json(product);
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}