import { HydratedDocument } from 'mongoose';
import { NextRequest, NextResponse } from "next/server";
import { Product } from '@/models/product';
import { mongooseConnect } from '@/lib/mongoose';

export async function POST(req: NextRequest) {
    const product: IProduct = await req.json(); 
    await mongooseConnect();
    const newProduct: HydratedDocument<IProduct> = new Product(product)
    await newProduct.save();
    console.log(newProduct);

    return NextResponse.json(newProduct);
}