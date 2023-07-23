import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/product";

export async function GetAllProducts(): Promise<ProductDoc[]> {
    await mongooseConnect();
    return Product.find({});
}

export async function GetProductById(_id: string): Promise<ProductDoc | null> {
    await mongooseConnect();
    const product: ProductDoc | null = await Product.findOne({ _id });
    return product
}