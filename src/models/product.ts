import { Schema, model, models } from "mongoose";

const ModelSchema = new Schema<IProduct>({
    title: {
        type: String,
        required: true
    },
    description: String,
    price: {
        type: String,
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

export const Product = models.Product || model<IProduct>('Product', ModelSchema)