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
    const product: ProductDoc | null = await Product.findOne({ _id: id});
    
    if(!product)
        return NextResponse.json({ error: 'Could not find product item.'}, { status: 500 });
    
    return NextResponse.json(product);
}


export async function DELETE(req: NextRequest, { params: { id }}: Params) {
    await mongooseConnect();
    console.log('wants to delete');
    try {
        await Product.findOneAndDelete({ _id: id });
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }

    return new NextResponse();
}