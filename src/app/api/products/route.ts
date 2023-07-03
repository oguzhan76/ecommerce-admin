import { HydratedDocument } from 'mongoose';
import { NextRequest, NextResponse } from "next/server";
import { Product } from '@/models/product';
import { mongooseConnect } from '@/lib/mongoose';


// Create product
export async function POST(req: NextRequest) {
    const product: IProduct = await req.json(); 
    await mongooseConnect();
    const newProduct: HydratedDocument<IProductDoc> = new Product(product)
    await newProduct.save();

    return NextResponse.json(newProduct);
}

// Get all products
export async function GET() {
    await mongooseConnect();
    const products: IProductDoc[] = await Product.find({});
    return NextResponse.json(products);
}

// Edit product
export async function PATCH(req: NextRequest) {
    await mongooseConnect();
    const data: IProductDoc = await req.json();
    const updatedProduct: IProductDoc | null = await Product.findOneAndUpdate({ _id: data._id }, data, { returnDocument: 'after' });
    
    if(!updatedProduct)
        return NextResponse.json({ error: 'Database Error'}, { status: 500});

    return NextResponse.json(updatedProduct);
}