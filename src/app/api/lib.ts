import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/product";

export async function GetAllProducts(): Promise<ProductDoc[]> {
    await mongooseConnect();
    return Product.find({});
}