import { ObjectId } from "mongodb";
import { Schema, model, models } from "mongoose";

const CategorySchema = new Schema<Category>({
    name: {
        type: String,
        required: true
    },
    parent: {
        type: ObjectId
    }
});

export const Category = models?.Category || model<Category>('Category', CategorySchema)