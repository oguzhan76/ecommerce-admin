import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/product";

export async function GetAllProducts(): Promise<ProductDoc[]> {
    return new Promise(async (resolve, reject) => {
        try {
            await mongooseConnect();
            const query = await Product.find();
            const products: ProductDoc[] = query.map(product => ({ ...product.toObject(), _id: product._id.toString() }));
            resolve(products);
        } catch (error) {
            reject(error);
        }
    });
}

export async function GetProductById(_id: string): Promise<ProductDoc> {
    return new Promise(async(resolve, reject) => {
        try {
            await mongooseConnect();
            const query = await Product.findOne({ _id });   
            const product: ProductDoc = {...query.toObject(), _id: query._id.toString()};
            resolve(product);
        } catch (error) {
            reject(error);
        }
    });
}