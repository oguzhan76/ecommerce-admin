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
    const product: IProductDoc | null = await Product.findOne({ _id: id});
    
    if(!product)
        return NextResponse.json({ error: 'Could not find product item.'}, { status: 500 });
    
    return NextResponse.json(product);
}