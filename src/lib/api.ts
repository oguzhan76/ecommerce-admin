import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/product";
import { NextResponse } from "next/server";

// Reason for returning a NextResponse is that it converts mongoose to js object in the process.

export async function GetAllProducts(): Promise<NextResponse> {
    return new Promise(async (resolve, reject) => {
        try {
            await mongooseConnect();
            const products: ProductDoc[] = await Product.find();
            resolve(NextResponse.json(products));
        } catch (error) {
            reject(error);
        }
    });
}

export async function GetProductById(_id: string): Promise<NextResponse> {
    return new Promise(async(resolve, reject) => {
        try {
            await mongooseConnect();
            const query = await Product.findOne({ _id });  
            resolve(NextResponse.json(query));
        } catch (error) {
            reject(error);
        }
    });
}