import { HydratedDocument } from 'mongoose';
import { NextRequest, NextResponse } from "next/server";
import { Product } from '@/models/product';
import { mongooseConnect } from '@/lib/mongoose';
import { utapi } from 'uploadthing/server';

// Create product
export async function POST(req: NextRequest) {
    const product: Product = await req.json();
    await mongooseConnect();
    const newProduct: HydratedDocument<ProductDoc> = new Product(product)
    await newProduct.save();

    return NextResponse.json(newProduct);
}

// Get all products
export async function GET() {
    await mongooseConnect();
    const products: ProductDoc[] = await Product.find({});
    return NextResponse.json(products);
}

// Edit product
export async function PATCH(req: NextRequest) {
    await mongooseConnect();
    const data: ProductDoc = await req.json();
    const updatedProduct: ProductDoc | null = await Product.findOneAndUpdate({ _id: data._id }, data, { returnDocument: 'after' });
    
    if(!updatedProduct)
        return NextResponse.json({ error: 'Database Error'}, { status: 500});

    return NextResponse.json(updatedProduct);
}

// Instead of DELETE; It has a bug: json() doesn't work in DELETE
export async function PUT(req: NextRequest) {
    const files = await req.json();
    console.log(files);
    const res = await utapi.deleteFiles(files);
    if(res.success)
        return NextResponse.json('Deleted successfully');
    return NextResponse.json('delete was unsuccessful');
}