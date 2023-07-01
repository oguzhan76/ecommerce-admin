import { Schema, model } from "mongoose";

const ModelSchema = new Schema<IProduct>({
    title: {
        type: String,
        required: true
    },
    description: String,
    price: {
        type: Number,
        required: true
    }
});

export const Product = model<IProduct>('Product', ModelSchema)