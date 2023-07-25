import { mongooseConnect } from '@/lib/mongoose';
import { HydratedDocument } from 'mongoose';
import { NextRequest, NextResponse } from "next/server";
import { Product } from '@/models/product';
import { utapi } from 'uploadthing/server';

// Create product
export async function POST(req: NextRequest) {
    await mongooseConnect();
    try {
        const product: Product = await req.json();
        const newProduct: HydratedDocument<ProductDoc> = new Product(product)
        await newProduct.save();
        return NextResponse.json(newProduct);        
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}

// Get all products
export async function GET() {
    try {
        mongooseConnect();
        const products: ProductDoc[] = await Product.find({});
        return NextResponse.json(products);
    } catch (error) {
        return NextResponse.json({ message: 'Error fetching products' }, { status: 500 });
    }
}

// Edit product
export async function PATCH(req: NextRequest) {
    await mongooseConnect();
    try {
        const data: ProductDoc = await req.json();
        const updatedProduct: ProductDoc | null = await Product.findOneAndUpdate({ _id: data._id }, data, { returnDocument: 'after' });
        
        if(!updatedProduct) throw Error("Couldn't find product in database");
        
        return NextResponse.json(updatedProduct);
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}

// Instead of DELETE; DELETE() has a bug: req.json() doesn't work in DELETE
export async function PUT(req: NextRequest) {
    const files = await req.json();
    try {
        await utapi.deleteFiles(files);
        return NextResponse.json('Product images have been deleted successfully');
    } catch (error) {
        return NextResponse.json({message: 'Utapi Error when deleting product images'}, {status: 500});
    }   
}