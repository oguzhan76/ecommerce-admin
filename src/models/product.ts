import { Schema, model, models } from "mongoose";

const ModelSchema = new Schema<IProduct>({
    title: {
        type: String,
        required: true
    },
    description: String,
    price: {
        type: Number,
        required: true
    },
    images: [{
        type: String,
    }]
});

export const Product = models.Product || model<IProduct>('Product', ModelSchema)