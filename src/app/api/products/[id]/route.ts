import { mongooseConnect } from '@/lib/mongoose';
import { NextRequest, NextResponse } from "next/server";
import { Product } from '@/models/product';

type Params = {
    params: {
        id: string
    }
}

export async function GET(req: NextRequest, { params: { id }}: Params ) {
    await mongooseConnect();
    try {
        const product: ProductDoc | null = await Product.findOne({ _id: id});
        if(!product) throw Error("Couldn't find product with this id");
        return NextResponse.json(product);
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest, { params: { id }}: Params) {
    await mongooseConnect();
    try {
        const doc = await Product.findOneAndDelete({ _id: id});
        if(!doc) throw Error("Couldn't find product with this id");
        return NextResponse.json('deleted successfully');
    } catch (error) {
        return NextResponse.json({ message: error.message  }, { status: 500 });
    }
}