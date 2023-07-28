import { ObjectId } from "mongodb";
import { Schema, model, models } from "mongoose";

const ModelSchema = new Schema<Product>({
    title: {
        type: String,
        required: true
    },
    description: String,
    price: {
        type: Number,
        required: true
    },
    images: [
        {
            _id: false,
            fileKey: {
                type: String,
                required: true
            },
            fileUrl: String
        }
    ]
});

export const Product = models?.Product || model<Product>('Product', ModelSchema)