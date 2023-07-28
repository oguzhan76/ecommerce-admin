import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/product";
import { NextResponse } from "next/server";

export async function GetAllProducts(): Promise<NextResponse> {
    return new Promise(async (resolve, reject) => {
        try {
            await mongooseConnect();
            const products: ProductDoc[] = await Product.find();
            // Reason for returning a NextResponse is that it converts mongoose to js object in the process.
            resolve(NextResponse.json(products));
        } catch (error) {
            reject(error);
        }
    });
}

export async function GetProductById(_id: string): Promise<NextResponse> {
    console.log('request to get productById');
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